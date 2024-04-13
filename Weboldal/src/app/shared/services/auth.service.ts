import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../model/user';
import { Observable, map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firestore: any;

  constructor(private auth: AngularFireAuth) {}
  Login(email: string, password: string){
    return  this.auth.signInWithEmailAndPassword(email, password)
  }
  reg(email: string, password: string){
    return  this.auth.createUserWithEmailAndPassword(email, password)
  }

  isUserLoggedIn() {
    return this.auth.user;
  }
  isorvos(): boolean{
    let User:User = JSON.parse(localStorage.getItem('user') as string);
    return User.orvos;
  }

  ispatient(){
    this.auth.currentUser
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUserID(): Observable<string | null> {
    return this.auth.user.pipe(
      map(user => user ? user.uid : null)
    );
  }

 

}
