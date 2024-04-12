import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'users';

  constructor(private afs: AngularFirestore) { }

  // CRUD (Create, Read, Update, Delete)

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
  notMe(id: string): Observable<User[]> {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '!=', id)).valueChanges();
  }
 
}