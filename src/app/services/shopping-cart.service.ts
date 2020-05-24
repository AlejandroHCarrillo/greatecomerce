import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';
import { itemProduct } from '../models/itemProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;   
    }

    let result = await this.create();
    localStorage.setItem('cartId', result.key );
    return result.key;
    
  }

  async addToCart (product: Product){
    console.log('addToCart: ', product);
    let cartId = await this.getOrCreateCartId();
    console.log('cartId',cartId);
    console.log('product.$key', product.key);
    
    // let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key );

    let refSubs = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key + "/" )
            .snapshotChanges().subscribe( data => {
              console.log("DATA FOUND: ", data);
              
              if(data.key) {

                let quantity = data.payload.val().quantity;
                console.log("Cantidad actual data.quantity: ", quantity );

                console.log('producto encontrado se actualiza la cantidad');
                // return item$.update({ quantity : data.quantity + 1 });
                this.db.object('/shopping-carts/' + cartId + '/items/'+ product.key).update({ product: product, quantity: quantity + 1 });
                
                refSubs.unsubscribe();
              } else {
                console.log('producto NO encontrado SE CREA y la cantidad es UNO');
                
                this.db.list('/shopping-carts/' + cartId + '/items/'+ product.key).push({ product: product, quantity: 1 });
                // item$.set({ product: product, quantity: 1 });
              }

            });

    // console.log("item$: ", item$);
    
      // item$.valueChanges().subscribe((data : itemProduct ) => {
      //   console.log('data:', data);
      //     if(data) {
      //       console.log('producto encontrado se actualiza la cantidad');                        
      //       // return item$.update({ quantity : data.quantity + 1 });
      //     } else {
      //       console.log('producto NO encontrado SE CREA y la cantidad es UNO');

      //       // this.db.list('/shopping-carts/' + cartId + '/items/').push({ product: product, quantity: 1 });
      //       // return item$.set({ product: product, quantity: 1 });
      //     }
      // });
  }

  private getCart(cartId: string){
    return this.db.object('/shopping-carts/' + cartId);
  }

  private create(){
    console.log('Guardando el cart');
    return this.db.list('/shopping-carts/')
                  .push( { dateCreated : new Date().getTime() } );
  }

}
