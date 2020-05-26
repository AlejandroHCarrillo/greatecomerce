import { ShoppingCartItem } from './shopping-cart-item.model';
import { Product } from './product.model';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [ productId : string ]: ShoppingCartItem }){    
    this.itemsMap = itemsMap || {};
    
    for (let productId in this.itemsMap) {

      if(itemsMap[productId].quantity > 0 ){

        let item = (itemsMap[productId] as any);

        let x = new ShoppingCartItem( {
          ...item,
          key : productId,        
          quantity : item.quantity
        });
        Object.assign( x, item);

        this.items.push(x);
      }
      // console.log("this.items:", this.items);
      
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
      // sum += (this.itemsMap[productId] as ShoppingCartItem).totalPrice;
      sum += this.itemsMap[productId].price * this.itemsMap[productId].quantity ;
    }
    return sum;
  }

  getQuantity(product: Product){
    if ((product as any).quantity){
      return (product as any).quantity;
    }
     let item = this.itemsMap[product.key];    
     return item ? item.quantity : 0;
  }
  
}