import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [ './product-card.component.scss' ]
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean=true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('userId') userId: string;

  stars=['*','*','*','*','*'];
  
  constructor(private cartService: ShoppingCartService, 
              private prodService: ProductService) { }
  
  addToCart(){ 
    this.cartService.addToCart(this.product);
  }

  toggleLike(){
    this.product.like = !this.product.like;
    this.prodService.setProductLike(this.product.key, this.userId, this.product.like ? 1 : -1);
  }

  setMyRank(rank: number){
    let rankChange = 0;
    if(this.product.rank)
      rankChange = rank - this.product.rank;

    this.product.rank = rank;
    this.prodService.setProductRank(this.product.key, this.userId, rank);
  }
}
