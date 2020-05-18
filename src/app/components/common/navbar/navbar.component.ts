import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent  {

  constructor(public _authService: AuthService) { }

  logout(){
    this._authService.logout();
  }

}
