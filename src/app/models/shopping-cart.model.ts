import { ShoppingCartItem } from './shopping-cart-item.model';

export class ShoppingCart {
  // items: ShoppingCartItem[];

  constructor(public items: ShoppingCartItem[]){
    // items = items;
  }

  get totalItemsCount(){
    let counter = 0;
    for (let productId in this.items) {
      counter += this.items[productId].quantity;
      }
    return counter;
  }

}