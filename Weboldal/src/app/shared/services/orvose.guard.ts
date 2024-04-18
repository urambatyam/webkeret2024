import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrvosGuard {
  constructor(private u: AuthService,private us: UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const user = JSON.parse(localStorage.getItem('user') as string);
      return this.us.getById(user.uid).pipe(map(user => !!user?.orvos));
   
      
  }
}
