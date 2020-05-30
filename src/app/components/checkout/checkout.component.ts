import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  
  constructor (
      private shoppingCartService: ShoppingCartService) {    
  }

  async ngOnInit()  {
    this.cart$ = await this.shoppingCartService.getCart();
  }
  
}
