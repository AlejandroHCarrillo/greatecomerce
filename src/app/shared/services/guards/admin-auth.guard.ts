import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of, observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { Usuario } from 'shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router){

  }

  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
      // Ejemplo de como encadenar la ejecucion de 2 observables encadenados
      // uno despues de otro usando switchMap usando los resultados del primero
      return this.auth.user$ // user$ Es el primer observable que queremos ejecutar
      .pipe( 
        // En este pipe es obtenemos usuario de Firebase 
        // Usando switchMap ejecutamos getUser u este toma el control de la subscripcion
        // fireUser es el valor obtenido de auth.user$, 
        // por eso podemos acceder al uid y mandarlo al segundo observable
          switchMap((fireUser) =>  this.getUser(fireUser.uid) ) 
      ).pipe(
        // En este pipe el usuario transfoma la salida y solo se envia el campo isAdmin 
        // del usuario recibido de la base de datos
        map(userDB => userDB.isAdmin )
      );
      // .subscribe( res => console.log(res) );
  }

  // La funcion getUser es el segundo observable que se va a disparar 
  // El parametro id depende del usuario auth.user$ que es otro observable.
  // Para disparar getUser en cuanto tengamos el resultado de auth.user$ usamos switchMap 
  // Esta funcion solo convierte el AngularFireObject<Usuario> a un observable usando el valueChanges 
  getUser (id: string ) : Observable<Usuario> {
    return this.userService.get(id).valueChanges();
  }
  
}
