import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styles: []
})
export class MyOrdersComponent implements OnInit {
  orders;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 
  }

  async ngOnInit() {
    let user = await this.authService.user$.pipe( 
      switchMap(u => this.orderService.getOrdersByUser(u.uid))
     ).subscribe(ordersDB => {
       let orders: any[] = [];
       for (const key in ordersDB) {
         if (ordersDB.hasOwnProperty(key)) {
           const order = ordersDB[key];
           orders.push(order.payload.val());
         }
        };
        this.orders = orders;
     }) ;
    //  console.log("user: ", user);

    // this.orders$ = this.orderService.getOrdersByUser((user as any).uid);
  }


}
