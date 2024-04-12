import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dia } from '../model/diagnosztika';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DiagnosztikaService {

  collectionName = 'uzentek';

  constructor(private afs: AngularFirestore) { }

  // CRUD (Create, Read, Update, Delete)

  create(user: Dia) {
    user.id = this.afs.createId();
    return this.afs.collection<Dia>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.afs.collection<Dia>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Dia>(this.collectionName).doc(id).valueChanges();
  }

  update(user: Dia) {
    return this.afs.collection<Dia>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<Dia>(this.collectionName).doc(id).delete();
  }
}