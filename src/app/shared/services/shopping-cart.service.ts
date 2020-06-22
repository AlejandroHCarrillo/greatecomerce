import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';
import { ShoppingCartItem } from '../models/shopping-cart-item.model';
import { ShoppingCart } from '../models/shopping-cart.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }
  
  private async getOrCreateCartId() : Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;   
    }
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key );
    return result.key;
    
  }
  
  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
                  .snapshotChanges()
                  .pipe( 
                    map ( x => {
                      if(x.payload.val() === null){
                        // console.log("no existe el cart en la base de datos");
                        localStorage.removeItem('cartId');
                      }
                      return new ShoppingCart( ((x.payload.val()as any).items  as { [ productId : string ]: ShoppingCartItem }) ); 
                    } )                    
                  ); 
  }
  
  async addToCart (product: Product){
    this.updateItem(product, 1);
  }
  
  async removeFromCart(product : Product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId  + '/items' ).remove();
  }
  
  private create(){
    return this.db.list('/shopping-carts/')
                  .push( { dateCreated : new Date().getTime() } );
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId );
  }

  async removeProductFromCart(product : Product){
    let cartId = await this.getOrCreateCartId();
    this.getItem(cartId, product.key).remove();
  }

  private async updateItem(product : Product, increment:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
   
    let refSubs = item$.snapshotChanges()
            .subscribe( resp => {
              
              let currentQty = 0;      
              if(resp.payload.val()) {
                currentQty = ((resp.payload.val() as ShoppingCartItem).quantity || 0);
              } 
              if( currentQty === 1 && increment < 0 ){
                item$.remove();
              } else {
                item$.update({
                                title: product.title, 
                                imageUrl: product.imageUrl, 
                                price: product.price, 
                                quantity: (currentQty || 0) + increment }); 
              }
              refSubs.unsubscribe();
            });
  }

  setProductLike(productId: string, userId: string, likeDislike: number){
    // console.log(productId, " like:", likeDislike);
    
    let prod = this.db.object('/stats/'+productId);
    let totalLikes = 0;

    this.db.object('/users/' + userId + '/my-products-stats/' + productId + '/like').set(likeDislike<0?0:1);
    
    if (!prod){
      this.db.list('/stats/').push( { productId: { likes: 1 } } );      
      prod = this.db.object('/stats/' + productId );      
    } 
        
    let subscription = prod.snapshotChanges().subscribe(x => {
      let data = (x.payload.val() as any);        
      
      if (!data){
        this.db.object('/stats/'+ productId + '/' + userId + '/like').set(1);
        this.db.object('/stats/'+ productId + '/likes').set(1);

        subscription.unsubscribe();
        return;
      } 

      if (!data.hasOwnProperty(userId) ){
        this.db.object('/stats/'+ productId + '/' + userId + '/like').set(1);
        // this.db.object('/stats/'+ productId + '/likes').set( 1 );
      }

      if (data.likes !== undefined ){
        totalLikes = (x.payload.val() as any).likes;
      }
                  
      this.db.object('/stats/'+ productId + '/' + userId + '/like').set( likeDislike<0?0:1 );      
      this.db.object('/stats/'+ productId + '/likes').set(totalLikes + likeDislike);
      subscription.unsubscribe();
    });

  }

  setProductRank(productId: string, userId: string, rank: number){
    let prod = this.db.object('/stats/' + productId);
    let totalCounter = 0;
    let globlaRank = 0;

    this.db.object('/users/' + userId + '/my-products-stats/' + productId + '/rank').set(rank);
    
    if (!prod){
      this.db.list('/stats/').push( { productId: { userId: { rank: rank } } } );
      prod = this.db.object('/stats/' + productId );
    } 
    
    let subscription = prod.snapshotChanges().subscribe(x => {
      let data = (x.payload.val() as any);

      if (!data){
        console.log("No habia datos");
        
        this.db.object('/stats/'+ productId + '/' + userId + '/rank').set(rank);
        this.db.object('/stats/'+ productId + '/totalCounter').set(1);
        this.db.object('/stats/'+ productId + '/globalRank').set(rank);

        subscription.unsubscribe();
        return;
      } 

      if (!data.hasOwnProperty(userId) ){
        this.db.object('/stats/'+ productId + '/' + userId + '/rank').set(rank);
      }

      let rankdiff = rank;
      
      if(data[userId].rank !== undefined){
        rankdiff =  rank - data[userId].rank;
      }
    
      if (data.totalCounter !== undefined){
        totalCounter = data.totalCounter;
      }

      if (data.globalRank !== undefined){
        globlaRank = data.globalRank;
      }

      this.db.object('/stats/'+ productId + '/' + userId + '/rank').set(rank);
      this.db.object('/stats/'+ productId + '/globalRank').set(globlaRank + rankdiff);

      subscription.unsubscribe();
    });

  }

}