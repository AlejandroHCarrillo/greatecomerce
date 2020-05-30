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
  
  // Promise<AngularFirebaseObject<ShoppingCart>>
  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
                  .snapshotChanges()
                  .pipe( 
                    map ( x => {
                      if(x.payload.val() === null){
                        console.log("no existe el cart en la base de datos");
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

  private async updateItem(product : Product, increment:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
   
    let refSubs = item$.snapshotChanges()
            .subscribe( resp => {
              
              let currenrQty = 0;      
              if(resp.payload.val()) {
                currenrQty = ((resp.payload.val() as ShoppingCartItem).quantity || 0);
              } 
              if( currenrQty === 1 && increment < 0 ){
                item$.remove();
              } else {
                item$.update({
                                title: product.title, 
                                imageUrl: product.imageUrl, 
                                price: product.price, 
                                quantity: (currenrQty || 0) + increment }); 
              }
              refSubs.unsubscribe();
            });
  }


}
