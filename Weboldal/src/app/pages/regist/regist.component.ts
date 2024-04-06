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
  regForm = this.createForm({
    email: '',
    jelszo: '',
    veznev: '',
    kernev: '',
    tab: 0,
    orvos: false
  });
  createForm(model: User){
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators([Validators.required,Validators.email]);
    formGroup.get('jelszo')?.addValidators([Validators.required,Validators.minLength(6)]);
    formGroup.get('tab')?.addValidators([Validators.required,Validators.minLength(9)]);

    return formGroup;
  }
 
  
 
  constructor(private location: Location, private fb: FormBuilder){}

  vissza(){
    this.location.back();
  }

  registral(){
    console.log("regiszt:\n")
    console.log(this.regForm.value)
    if(this.regForm.valid){
      console.log("sikerült");
    }else {
      console.error('Hibák:', this.regForm.errors);
    }

  }

}
