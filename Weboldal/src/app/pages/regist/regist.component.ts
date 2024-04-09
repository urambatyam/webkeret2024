import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { Observable, Subscription } from 'rxjs';
import { ToltService } from 'src/app/shared/services/tolt.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.sass'
})
export class RegistComponent implements OnDestroy{
  loading: boolean = false;
  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;
  rejelszo = new FormControl<string>('', Validators.required);
  regForm: FormGroup;
 
  createForm(model: User){
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators([Validators.required,Validators.email]);
    formGroup.get('jelszo')?.addValidators([Validators.required,Validators.minLength(6)]);
    formGroup.get('tab')?.addValidators([Validators.required,Validators.minLength(9)]);

    return formGroup;
  }
 
  
 
  constructor(private router: Router, private loadingService: ToltService, private location: Location, private fb: FormBuilder,  private authService: AuthService){
    this.regForm = this.createForm({
      email: '',
      jelszo: '',
      veznev: '',
      kernev: '',
      tab: 0,
      orvos: false
    });
    this.regForm.addControl('rejelszo', this.rejelszo);
  }

  vissza(){
    this.location.back();
  }

  async registral() {
    this.loading = true
    console.log("regiszt:\n");
    console.log(this.regForm.value);
    console.log("rejelszo:\n");
    console.log(this.rejelszo.value)
    if (this.regForm.valid && this.regForm.get('jelszo')?.value === this.rejelszo.value) {
      this.authService.reg(this.regForm.get('email')?.value, this.regForm.get('jelszo')?.value).then(cred => {
        console.log(cred);
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
