import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent  {

  constructor(private router: Router, public _authService: AuthService) { }

  logout(){
    this._authService.logout();
    this.router.navigate(['/home']);
  }

}
