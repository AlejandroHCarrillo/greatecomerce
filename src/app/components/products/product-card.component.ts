import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { retry } from 'rxjs/operators';

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
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }
  

  ngOnInit(): void {
  }

  addToCart(){ 
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){ 
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
      
    let productIndex = this.getProductIndex(this.product.key);
    if(productIndex < 0 ) return 0;
    
    let item = this.shoppingCart.items[productIndex];
    return item ? item.quantity : 0;
  }

  private getProductIndex(productId: string){
    for (let i = 0; i < this.shoppingCart.items.length; i++) {
      const element = this.shoppingCart.items[i];
      if (element.product.key === productId){
        return i;
      }
    }
    return -1;
  }
}
