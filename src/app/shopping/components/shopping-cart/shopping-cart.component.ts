import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: [ `
              .thumbnail { 
                height:3rem; 
                width:3rem; 
                border-radius:100%; 
                background-size: cover;
              }
            `
  ]
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  removeProduct(product: Product){
    if(confirm(`Are you sure about removing the product ${product.title}?`)){
      this.shoppingCartService.removeProductFromCart(product);
    }
  }
}
