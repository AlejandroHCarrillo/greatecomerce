import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Category } from 'shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  

  constructor(private db:AngularFireDatabase) { }

  getAll(){  
    return this.db.list('/categories', ref => ref.orderByChild("description") ).snapshotChanges()
    .pipe( // Este map elimina el payload y asigna directamente el key y el name en el mismo objeto para cada elemento
            map(items => {
              // se hace el casteo a un objeto { name:string } para poder usar el spread (...)
              // de lo contrario se tendria que hacer como en el metodo largo de abajo 
              return items.map(c => ({ key: c.payload.key, ...(c.payload.val() as Category ) }))

            })
    );
  }

  getById(id:string){
    return this.db.object('/categories/'+ id).snapshotChanges()
                    .pipe(
                      map(x => { return { key: x.key, ...(x.payload.val() as any)}  })
                    );
                    // .subscribe(resp => {
                    //   console.log("resp: ", resp);
                    //   return resp;
                    // });
  }

  setCategory(cat: Category){
    this.db.object('/categories/'+ cat.key).set(cat);    
  }
}
