import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private db:AngularFireDatabase, 
              private shoppingCartService: ShoppingCartService ) { }

  async placeOrder(order : any){
    // TODO: set a transaccion here
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    // TODO: NO ESTA FILTRANDO POR USUARIO    
    return this.db.list('/orders', ref => ref.equalTo(userId).orderByChild('name')).snapshotChanges();
    // return this.db.list('/orders').snapshotChanges();
  }
}
