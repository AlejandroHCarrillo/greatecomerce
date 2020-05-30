import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styles: []
})
export class AdminOrdersComponent {
  orders;

  constructor(private orderService: OrderService) { 
    // this.orders = orderService.getOrders();

    this.orderService.getOrders().snapshotChanges()
    .subscribe(ordersDB => {
      let orders: any[] = [];
      for (const key in ordersDB) {
        if (ordersDB.hasOwnProperty(key)) {
          const order = ordersDB[key];
          orders.push(order.payload.val());
        }
       };
       this.orders = orders;
    }) ;

  }
}
