import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dia } from '../model/diagnosztika';
import { Observable, combineLatest } from 'rxjs';


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

  getById(fogado: string) {
    //return this.afs.collection<Dia>(this.collectionName).doc(fogado).valueChanges();
    return this.afs.collection<Dia>(this.collectionName, ref => ref.where('fogado', '==', fogado)).valueChanges();
  }

  update(user: Dia) {
    return this.afs.collection<Dia>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<Dia>(this.collectionName).doc(id).delete();
  }

  getAllpast(fogado: string, kuldo: string){
    return this.afs.collection<Dia>(this.collectionName, ref => 
        ref.where('fogado', '==', fogado).where('kuldo', '==', kuldo)
    ).valueChanges();
}


}