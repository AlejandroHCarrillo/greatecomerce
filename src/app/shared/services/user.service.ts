import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  loggedUserId: string;
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, 
              private db:AngularFireDatabase) 
  {
  }
  ngOnInit() {
    // this.saveUserIdInLocalStorage();
    this.getIdUserLogged.subscribe(id => { 
      this.loggedUserId = id;
    });
  }

  save(user: firebase.User){
    let usuario = new User(this.loggedUserId);

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
    // console.log('Guardando el usuario');
    return this.db.list('/users/').push( user );
  }

  update(userId:string, user:User){
    // console.log('Actualizando el usuario', user);
    return this.db.object('/users/' + userId).update( user );
  }

  delete(uid:string){
    return this.db.object('/users/' + uid).remove();
  }

  // Roles section
  getAllroles(){
    return this.db.object('/roles/').snapshotChanges()
                  .pipe(
                    map(item => ({ ...(item.payload.val() as any) }))                    
                  );
  }

  saveUserIdInLocalStorage(){
    this.afAuth.authState
    .pipe(
      map( user => {
        console.log("user: ", user);
        localStorage.setItem("ecuser", (user as any ).uid);
        this.loggedUserId = (user as any ).uid; 
      })
    );
  }

  getUserId(){
   return this.afAuth.authState
    .pipe(
      map( user => {
        this.loggedUserId = (user as any ).uid;
        return (user as any ).uid;
      })
    ).subscribe(uid => {
      this.loggedUserId = uid;
      return uid;
    })
    ;
  }
  
  get getIdUserLogged(){
   return this.afAuth.authState 
   .pipe(
    map( user => { return (user as any ).uid } )
   );
  }
}
