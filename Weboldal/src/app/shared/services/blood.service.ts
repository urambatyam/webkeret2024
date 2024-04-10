import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Blood } from '../model/blood';

@Injectable({
  providedIn: 'root'
})
export class BloodService {

  constructor(private afs: AngularFirestore) { }

  // CRUD (Create, Read, Update, Delete)

  create(userId: string, blood: Blood) {
    return this.afs.collection('users').doc(userId).collection('bloods').add(blood);
  }

  getAll(userId: string): Observable<Blood[]> {
    return this.afs.collection('users').doc(userId).collection<Blood>('bloods', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getById(userId: string, bloodId: string): Observable<Blood | undefined> {
    return this.afs.collection('users').doc(userId).collection('bloods').doc<Blood>(bloodId).valueChanges();
  }

  update(userId: string, bloodId: string, blood: Blood): Promise<void> {
    return this.afs.collection('users').doc(userId).collection('bloods').doc(bloodId).update(blood);
  }

  delete(userId: string, bloodId: string): Promise<void> {
    return this.afs.collection('users').doc(userId).collection('bloods').doc(bloodId).delete();
  }
}
