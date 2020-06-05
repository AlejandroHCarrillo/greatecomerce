import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'shared/models/user.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Observable } from 'rxjs';
// import { faUser, faHome, faShoppingCart, faGifts, faDoorOpen, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit  {
  showMenu = true;
  // faHome = faHome;
  // faShoppingCart = faShoppingCart;
  // faGifts = faGifts;
  // faDoorOpen = faDoorOpen;
  // faSignIn = faSignInAlt;
  // faUser = faUser;

  appUser: User;
  cart$: Observable<ShoppingCart>;

  constructor(private router: Router,
              private authService: AuthService,
              private shoppingCartService: ShoppingCartService ) {

  }

  async ngOnInit() {
    this.authService.appUser$.subscribe( fireUser => this.appUser = fireUser );
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
