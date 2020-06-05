import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user: firebase.User){

    let usuario = new User();

    usuario.uid = user.uid;
    usuario.displayName = user.displayName;
    usuario.email = user.email;
    usuario.photoURL = user.photoURL;

    this.db.object('/users/' + user.uid )
           .update( usuario );          
  } 

  get(uid: string): AngularFireObject<User> {
    return this.db.object('/users/' + uid );
  }

  getAll(){
    return this.db.list('/users', ref => ref.orderByChild('name')).snapshotChanges()
    .pipe( 
            map(data => 
              data.map(item => ({ key: item.payload.key, ...(item.payload.val() as User) }))
            )
    );
  }

  getById(uid: string) {
    return this.db.object('/users/' + uid);
  }

  create(user:User){
    // console.log('Guardando el usero');
    return this.db.list('/users/').push( user );
  }

  update(userId:string, user:User){
    console.log('Actualizando el usero', user);
    return this.db.object('/users/' + userId).update( user );
  }

  delete(uid:string){
    return this.db.object('/users/' + uid).remove();
  }
}
