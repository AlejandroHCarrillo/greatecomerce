import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent  {

  appUser: Usuario;

  constructor(private router: Router, private _authService: AuthService) {
    // Setteamos la variable local appUser con el observable appUser$ para evitar el uso del pipe async 
    _authService.appUser$.subscribe( fireUser => this.appUser = fireUser )
   }

  logout(){
    this._authService.logout();
    this.router.navigate(['/home']);
  }

}
