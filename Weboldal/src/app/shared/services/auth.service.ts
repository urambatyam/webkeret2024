import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}
  Login(email: string, password: string){
    return  this.auth.signInWithEmailAndPassword(email, password)
  }
  reg(email: string, password: string){
    return  this.auth.createUserWithEmailAndPassword(email, password)
  } 
}
