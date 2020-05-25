import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';
import { itemProduct } from '../models/itemProduct.model';
import { promise } from 'protractor';

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
  
  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId );
  }

  async addToCart (product: Product){
    this.updateProductQuantity(product, 1);
  }

  async removeFromCart(product : Product){
    this.updateProductQuantity(product, -1);
  }

  private async updateProductQuantity(product : Product, increment:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    let refSubs = item$.snapshotChanges().subscribe( resp => {              
              if(resp.key) {
                let currenrQty = (resp.payload.val() as itemProduct).quantity;
                item$.update({ product: product, quantity: currenrQty + increment }); 
              } else {
                item$.set({ product: product, quantity: 1 });
              }              
              refSubs.unsubscribe();
            });
  }


  private create(){
    return this.db.list('/shopping-carts/')
                  .push( { dateCreated : new Date().getTime() } );
  }

}
