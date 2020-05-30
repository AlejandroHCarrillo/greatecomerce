import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'shared/models/usuario.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit  {
  appUser: Usuario;
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

  showMenu;
  toggleMenu(){
    this.showMenu = !this.showMenu; 
    console.log("showMenu: ", this.showMenu);
  }

}
