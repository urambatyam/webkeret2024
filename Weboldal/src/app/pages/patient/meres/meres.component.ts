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
  updateFrom = this.createForm({
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
  constructor(private fb: FormBuilder, private bl: BloodService, private bloodservice: BloodService) { }
  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user') as string); 

    if (userData) {
      const userId = userData.uid; 
      this.bloodservice.getAll(userId).subscribe(data => {
        this.patients = data; 
        
      });
    } 
  }
  onAdd(){
      if(this.TableForm.valid){
        this.bloodservice.create(this.userData.uid, this.TableForm.value as Blood)
      }
    }
  torol(bloodid: string){
    this.bloodservice.delete(this.userData.uid,bloodid);
  }
  update(id:string){
    this.bloodservice.update(this.userData.uid,id,this.updateFrom.value as Blood);
  }
  }
