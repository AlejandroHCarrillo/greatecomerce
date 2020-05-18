import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  login(){
    
  }

  doGoogleLogin(){
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
  

}
