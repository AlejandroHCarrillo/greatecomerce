import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styles: [ `
              .card-footer{ padding: 0; }
              .card { margin-bottom: 1.875rem; }
            `]
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean=true;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product){
    // console.log('addToCart: ', product);    
    this.cartService.addToCart(product);
  }

}
