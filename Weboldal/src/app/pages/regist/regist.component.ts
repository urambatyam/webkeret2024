import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.sass'
})
export class RegistComponent {
  loading: boolean = false;
  rejelszo = new FormControl<string>('', Validators.required);
  regForm: FormGroup;
 
  createForm(model: User){
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators([Validators.required,Validators.email]);
    formGroup.get('jelszo')?.addValidators([Validators.required,Validators.minLength(6)]);
    formGroup.get('tab')?.addValidators([Validators.required,Validators.minLength(9)]);

    return formGroup;
  }
 
  
 
  constructor(private location: Location, private fb: FormBuilder){
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

  registral() {
    this.loading = true
    console.log("regiszt:\n");
    console.log(this.regForm.value);
    console.log("rejelszo:\n");
    console.log(this.rejelszo.value)
    if (this.regForm.valid && this.regForm.get('jelszo')?.value === this.rejelszo.value) {
      console.log("sikerült");
    } else {
      console.error('Hibák:', this.regForm.errors);
    }
  }

}
