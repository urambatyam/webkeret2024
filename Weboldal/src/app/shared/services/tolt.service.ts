import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToltService {

  constructor() { }

  loadingWithPromise(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      setTimeout(() => {
        if (email === 'test@gmail.com' && password === 'testpw') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 6000);
    });
  }

  loadingWithObservable(email: string, password: string): Observable<boolean> {
    
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 3) {
          if (email === 'test@gmail.com' && password === 'testpw') {
            subscriber.next(true);
            subscriber.complete();
          } else {
            console.error("hinás jelszó vagy email")
            subscriber.error(false);
          }
        }
      }, 1000);
    });
  }
}
