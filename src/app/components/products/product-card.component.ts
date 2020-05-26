import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styles: [ `
              .card-footer{ padding: 0; }
              .card { margin-bottom: 1.875rem; }
            `]
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean=true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }
  
  addToCart(){ 
    this.cartService.addToCart(this.product);
  }

}
