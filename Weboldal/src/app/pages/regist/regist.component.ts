import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.sass'
})
export class RegistComponent {
  constructor(private location: Location){

  }
  regForm = new FormGroup({
    nev: new FormGroup({
      veznev: new FormControl(''),
      kernev: new FormControl('')

    }),
    email: new FormControl(''),
    jelszo: new FormControl(''),
    rejelszo: new FormControl(''),
    tab: new FormControl(''),
    szerep: new FormControl('')
  });
  vissza(){
    this.location.back();
  }
  registral(){
    console.log("regiszt:\n")
    console.log(this.regForm.value)

  }

}
