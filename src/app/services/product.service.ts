import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product:Product){
    // console.log('Guardando el producto');
    return this.db.list('/products/').push( product );
  }
}
