import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user: firebase.User){

    let usuario = new Usuario();

    usuario.uid = user.uid;
    usuario.displayName = user.displayName;
    usuario.email = user.email;
    usuario.photoURL = user.photoURL;

    this.db.object('/users/' + user.uid )
           .update( usuario );          
  } 

  get(uid: string): AngularFireObject<Usuario> {
    return this.db.object('/users/' + uid );
  }
}
