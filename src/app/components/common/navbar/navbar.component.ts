import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit  {
  appUser: Usuario;
  cart$: Observable<ShoppingCart>;
  shoppingCartItemCount: number=0;
  shoppingCartItemSum: number=0;

  constructor(private router: Router, 
              private authService: AuthService,
              private shoppingCartService: ShoppingCartService ) {
    
  }
  
  async ngOnInit() {
    this.authService.appUser$.subscribe( fireUser => this.appUser = fireUser );
    this.cart$ = await this.shoppingCartService.getCart();
    console.log(this.cart$);

    this.cart$.subscribe(cart => {
        let shoppingCartItemCount = cart.totalItemsCount;
    })
    
    console.log("Nav bar on init");
    
    // cart.snapshotChanges().subscribe( cartFO => {
    //   console.log("inside cart subscribe");

    //   let cart = (cartFO.payload.val() as ShoppingCart);
    //   console.log("cart", cart );
    //   console.log("cuenta de items", cart.totalItemsCount );

    //   this.shoppingCartItemCount = cart.totalItemsCount;
    //   // for (let productId in cart.items) {
    //   //   if (cart.items.hasOwnProperty(productId) && cart.items[productId].quantity>0 ) {
    //   //     this.shoppingCartItemCount += cart.items[productId].quantity;
    //   //   }
    //   // }

    //   console.log("counter: ", this.shoppingCartItemCount);
    //   console.log("Sum: ", this.shoppingCartItemSum);
      

    // })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
