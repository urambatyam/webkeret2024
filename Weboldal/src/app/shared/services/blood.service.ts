import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, map } from 'rxjs';
import { Blood } from '../model/blood';

@Injectable({
  providedIn: 'root'
})
export class BloodService {
  selectedId: string = 'null';

  constructor(private afs: AngularFirestore) { }

  // CRUD (Create, Read, Update, Delete)

  create(userId: string, blood: Blood) {
    const userDocRef = this.afs.collection('users').doc(userId);
    const bloodsCollectionRef = userDocRef.collection('bloods');
    blood.id = this.afs.createId();
    return bloodsCollectionRef.doc(blood.id).set(blood);
  }

  getAll(userId: string): Observable<Blood[]> {
    return this.afs.collection('users').doc(userId).collection<Blood>('bloods', ref => ref.orderBy('date', 'asc'))
      .valueChanges()
      .pipe(
        map(bloods => {
          return bloods.map(blood => {
            const bloodData = blood as any; 
            const timestamp = bloodData.date.toDate(); 
            return { ...bloodData, date: timestamp } as Blood; 
          });
        })
      );
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
