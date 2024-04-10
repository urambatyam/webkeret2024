import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    tb: 0,
    disztoles: 0,
    szisztoles: 0,
    date: new Date()
  })
  createForm(model: Blood){
    let formGroup = this.fb.group(model);
    return formGroup;
  }
  //userData = JSON.parse(localStorage.getItem('user') as string);
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
      });
    } else {
      console.error('No user data found in localStorage');
    }
    console.log(this.patients)
  }

 
  
    /*this.patients.push({
      tb: 0,
      disztoles: 70,
      szisztoles: 120,
      date: new Date()
    });
    this.patients.push({
      tb: 0,
      disztoles: 78,
      szisztoles: 132,
      date: new Date()
    });
    this.patients.push({
      tb: 0,
      disztoles: 80,
      szisztoles: 137,
      date: new Date()
    });
    this.patients.push({
      tb: 0,
      disztoles: 90,
      szisztoles: 140,
      date: new Date()
    });*/
    onAdd(){
      
    }
  }
