import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dia } from '../model/diagnosztika';


@Injectable({
  providedIn: 'root'
})
export class diagnosztikaService {

  collectionName = 'uzenetek';

  constructor(private afs: AngularFirestore) { }

  /*create(comment: Dia) {
    return this.afs.collection<Comment>(this.collectionName).add(comment);
  }*/

  getAll() {
    return this.afs.collection<Dia>(this.collectionName).valueChanges();
  }

  /*update(comment: Dia) {
    return this.afs.collection<Dia>(this.collectionName).doc(comment.tb).set(comment);
  }

  delete(id: number) {
    return this.afs.collection<Dia>(this.collectionName).doc(id).delete();
  }*/

 
}