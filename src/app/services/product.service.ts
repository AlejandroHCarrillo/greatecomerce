import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }
  
  getAll(){
    return this.db.list('/products', ref => ref.orderByChild('name')).snapshotChanges()
    .pipe( 
            map(data => 
              data.map(item => ({ key: item.payload.key, ...(item.payload.val() as Product) }))
            )

    )
  }

  getById(uid: string) {
    return this.db.object('/products/' + uid);
  }


  create(product:Product){
    // console.log('Guardando el producto');
    return this.db.list('/products/').push( product );
  }

  update(productId:string, product:Product){
    console.log('Actualizando el producto', product);
    return this.db.object('/products/'+productId).update( product );
  }

  delete(uid:string){
    return this.db.object('/products/' + uid).remove();

  }

}
