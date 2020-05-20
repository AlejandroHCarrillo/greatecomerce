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
        this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());        
        break;
      case 'twitter':
          this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());        
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
