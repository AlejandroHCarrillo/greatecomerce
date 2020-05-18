import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(){}

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doGoogleLogin(){
    console.log("Autenticar con google");
    
    // return new Promise<any>((resolve, reject) => {
    //   let provider = new firebase.auth.GoogleAuthProvider();
    //   provider.addScope('profile');
    //   provider.addScope('email');
    //   this.afAuth.auth
    //   .signInWithPopup(provider)
    //   .then(res => {
    //     resolve(res);
    //   })
    // })
  }

  doFacebookLogin(){
    // return new Promise<any>((resolve, reject) => {
    //   let provider = new firebase.auth.FacebookAuthProvider();
    //   this.afAuth.auth
    //   .signInWithPopup(provider)
    //   .then(res => {
    //     resolve(res);
    //   }, err => {
    //     console.log(err);
    //     reject(err);
    //   })
    // })
  }

}
