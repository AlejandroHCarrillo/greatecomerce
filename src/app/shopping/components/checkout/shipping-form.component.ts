import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Order } from 'shared/models/order.model';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styles: [
  ]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  userId;
  subsAuthRef : Subscription;
  shipping: any = {}; 
  @Input('cart') cart: ShoppingCart;

  constructor( 
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService ) { }
  ngOnInit(): void {
    this.subsAuthRef = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  
  ngOnDestroy(): void {
    this.subsAuthRef.unsubscribe();
  }


  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  } 

}
