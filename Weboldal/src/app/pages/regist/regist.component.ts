import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { Observable, Subscription } from 'rxjs';
import { ToltService } from 'src/app/shared/services/tolt.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.sass'
})
export class RegistComponent implements OnDestroy{
  loading: boolean = false;
  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;
  regForm = new FormGroup({
    email: new FormControl(''),
    jelszo: new FormControl(''),
    rejelszo: new FormControl(''),
    veznev: new FormControl(''),
    kernev: new FormControl(''),
    orvos: new FormControl(false),
    tab: new FormControl(0)
  });
  constructor(private router: Router, private loadingService: ToltService, private location: Location, private authService: AuthService, private userservice: UserService){}
  vissza(){
    this.location.back();
  }
  async registral() {
    this.loading = true
    if (this.regForm.valid && this.regForm.get('jelszo')?.value === this.regForm.get('rejelszo')?.value) {
      this.authService.reg(this.regForm.get('email')?.value as string, this.regForm.get('jelszo')?.value as string).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.regForm.get('email')?.value as string,
          veznev: this.regForm.get('veznev')?.value as string,
          kernev: this.regForm.get('kernev')?.value as string,
          orvos: this.regForm.get('orvos')?.value as boolean,
          tb: this.regForm.get('tab')?.value as number,
        };
        this.userservice.create(user).then(_ => {
          console.log('User added successfully.');
        }).catch(error => {
          console.error(error);
        })
        this.loading = false;
        this.router.navigateByUrl('/main');
      }).catch( error => {
        console.error(error);
        this.loading = false;
      });
    } else {
      console.error('Hibák:', this.regForm.errors);
      this.loading = false;
    }
  }
  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
