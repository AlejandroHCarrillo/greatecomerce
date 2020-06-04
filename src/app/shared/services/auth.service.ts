import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, 
              private route: ActivatedRoute,
              private userService: UserService
              ){
    this.user$ = this.afAuth.authState;
  }

  login(proveedor:string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl); 

    switch (proveedor) {
      case 'google':
        this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());        
        break;
      case 'twitter':
          console.log("sending authentication request");
          firebase.auth().getRedirectResult()
                  .then(function(result) {
                    console.log("esto trajo", result);
                    if (result.credential) {
                      
                      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                      // You can use these server side with your app's credentials to access the Twitter API.
                      var token = (result as any).credential.accessToken;
                      var secret = (result as any).credential.secret;
                      // ...
                    }
                    // The signed-in user info.
                    var user = result.user;
                  }).catch(function(error) {
                    console.log("hubo error: ", error);
                    
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                  });
          break;      
      default:
        console.log('Autenticador desconocido');
        break;
    }
  }

  logout() {
    this.afAuth.signOut();
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  get appUser$(): Observable<Usuario>{
    return this.user$ 
    .pipe( 
        switchMap((fireUser) =>  {
          if (fireUser) return this.userService.get(fireUser.uid).valueChanges();
          return of(null);
          // return new Observable<null>();
        } ) 
    );
  } 
}
