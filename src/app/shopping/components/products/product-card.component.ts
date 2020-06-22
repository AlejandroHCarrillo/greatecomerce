import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [ './product-card.component.scss' ]
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean=true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  stars=['*','*','*','*','*'];
  
  constructor(private cartService: ShoppingCartService) { }
  
  addToCart(){ 
    this.cartService.addToCart(this.product);
  }

  toggleLike(){
    let userId = "ZZZZ";

    this.product.like = !this.product.like;
    this.cartService.setProductLike(this.product.key, userId, this.product.like ? 1 : -1);
  }

  setMyRank(rank: number){
    let userId = "ZZZZ";

    let rankChange = 0;
    if(this.product.rank)
      rankChange = rank - this.product.rank;

    this.product.rank = rank;
    this.cartService.setProductRank(this.product.key, userId, rank);

  }
}
