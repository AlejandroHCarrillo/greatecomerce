import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styles: [
  ]
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){ 
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){ 
    this.cartService.removeFromCart(this.product);
  }

}
