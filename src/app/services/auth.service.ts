import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth){
    this.user$ = this.afAuth.authState;
  }

  login(proveedor:string) {
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

}
