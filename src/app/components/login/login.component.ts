import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(public _authService: AuthService) { }

  login(){
    
  }

  doGoogleLogin(){
    console.log("login component google login");
    this._authService.login("google");

    // console.log(this._authService.usuario);
    
    // this._authService.doGoogleLogin();

    
    // return new Promise<any>((resolve, reject) => {
    //   let provider = new firebase.auth.GoogleAuthProvider();
    //   provider.addScope('profile');
    //   provider.addScope('email');
    //   this.afAuth. 
    //   .signInWithPopup(provider)
    //   .then(res => {
    //     resolve(res);
    //   })
    // })

  }

  logout(){
    this._authService.logout();
  }

}
