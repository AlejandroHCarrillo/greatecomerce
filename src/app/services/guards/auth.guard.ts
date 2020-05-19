import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean;
  checkService:boolean;

  constructor( private router : Router,
               private authService : AuthService) {
      
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('can activate???');
    
    let url: string = state.url;
  
      return this.checkLogin(url);
  }
  
  
  checkLogin(urlRet: string):Observable<boolean> {
      return this.authService.user$.pipe(        
        map(res=>{
          console.log("res: ", res);
          if (res)  { return true; }
          else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: urlRet }});
            return false;
          }
        })

      );
    }
    
}
