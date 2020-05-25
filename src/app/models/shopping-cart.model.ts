import { ShoppingCartItem } from './shopping-cart-item.model';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [ productId : string ]: ShoppingCartItem }){    
    for (let productId in this.itemsMap) {
      if(itemsMap[productId].quantity > 0){
        let item = itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }

  }

  get productIds(){
    return Object.keys(this.itemsMap);
  }

  get totalItemsCount(){
    let counter = 0;
    for (let productId in this.itemsMap) {
      counter += this.itemsMap[productId].quantity;
      }
    return counter;
  }

  get totalPrice(){
    let sum = 0;
    for (let productId in this.itemsMap) {   
      // console.log(this.itemsMap[productId]);         
      // sum += this.itemsMap[productId].totalPrice;
      sum += this.itemsMap[productId].quantity * this.itemsMap[productId].product.price;

    }
    return sum;
  }


}