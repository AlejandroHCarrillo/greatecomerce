import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getAll(){
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges()
    .pipe( // Este map elimina el payload y asigna directamente el key y el name en el mismo objeto para cada elemento
            map(changes => 
              // se hace el casteo a un objeto { name:string } para poder usar el spread (...)
              // de lo contrario se tendria que hacer como en el metodo largo de abajo 
              changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as { name:string }) }))
            )
            
            // Esta es la forma larga de hacer el anterior mapeo.
            // map((data) => {
            //   let categorias: any[] = [];
            //   data.forEach( item => {
            //     let name = (item.payload.val() as {name:string}).name; 
            //     categorias.push({
            //       key: item.key,
            //       name
            //     });

            //   });
            //   console.log('categorias: ', categorias);
            //   return categorias;
            // })

    )
  }


}
