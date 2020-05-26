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

}
