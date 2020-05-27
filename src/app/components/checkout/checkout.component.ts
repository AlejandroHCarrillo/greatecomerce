import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
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
