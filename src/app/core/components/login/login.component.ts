import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(public _authService: AuthService) {
    
   }

  login(){
    
  }

  signInWithEmail() {
    // this._authService.signInRegular(this.user.email, this.user.password)
    //    .then((res) => {
    //       console.log(res);    
    //       this.router.navigate(['dashboard']);
    //    })
    //    .catch((err) => console.log('error: ' + err));
 }

  doGoogleLogin(){
    console.log("login component google login");
    this._authService.login("google");
  }

  doTwitterLogin(){
    console.log("login component twitter login");
    this._authService.login("twitter");
  }


  logout(){
    this._authService.logout();
  }

}