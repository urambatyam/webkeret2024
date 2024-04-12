import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Blood } from 'src/app/shared/model/blood';
import {provideNativeDateAdapter} from '@angular/material/core';
import { BloodService } from 'src/app/shared/services/blood.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-meres',
  templateUrl: './meres.component.html',
  styleUrl: './meres.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class MeresComponent {
  TableForm = this.createForm({
    id: '',
    disztoles: 0,
    szisztoles: 0,
    date: new Date()
  })
  createForm(model: Blood){
    let formGroup = this.fb.group(model);
    formGroup.get("disztoles")?.addValidators([Validators.required,Validators.min(0),Validators.max(300)])
    formGroup.get("szisztoles")?.addValidators([Validators.required,Validators.min(0),Validators.max(300)])
    return formGroup;
  }
  userData = JSON.parse(localStorage.getItem('user') as string);
  patients: Blood[] = [];
  
  

  constructor(private fb: FormBuilder, private bl: BloodService, private bloodservice: BloodService) { 
    console.log(localStorage.getItem('user'))
  }
  

  ngOnInit(): void {
    
    const userData = JSON.parse(localStorage.getItem('user') as string); // Felhasználó adatainak lekérése a localStorage-ból

    if (userData) {
      const userId = userData.uid; // Felhasználó azonosítója
      this.bloodservice.getAll(userId).subscribe(data => {
        this.patients = data; // Adatok mentése a patients tömbbe
        //localStorage.setItem('bloods', JSON.stringify(data));
      });
    } else {
      console.error('No user data found in localStorage');
    }
    console.log(this.patients)
  }

  onAdd(){
      if(this.TableForm.valid){
        this.bloodservice.create(this.userData.uid, this.TableForm.value as Blood)
      }
    }
  torol(bloodid: string){
    this.bloodservice.delete(this.userData.uid,bloodid);
  }
  }
