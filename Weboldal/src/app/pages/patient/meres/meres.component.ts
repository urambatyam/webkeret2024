import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Blood } from 'src/app/shared/model/blood';
import {provideNativeDateAdapter} from '@angular/material/core';
import { BloodService } from 'src/app/shared/services/blood.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './dialog.component'; // Előzetesen létrehozott dialog komponens


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
  constructor(private fb: FormBuilder, private bl: BloodService, private bloodservice: BloodService, private dialog: MatDialog,) { }
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
    console.log("torol "+bloodid)
    this.bloodservice.delete(this.userData.uid,bloodid);
    const index = this.patients.findIndex(blood => blood.id === bloodid);
    if (index !== -1) {
      this.patients.splice(index, 1);
    }

  }
  update(id:string){
    this.bloodservice.update(this.userData.uid,id,this.updateFrom.value as Blood);
    const index = this.patients.findIndex(blood => blood.id === id);
    this.updateFrom.value.id = id;
    this.patients[index] = this.updateFrom.value as Blood;
    console.log("vadfafdhjhj "+this.patients[index]);

  }
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { id: id }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  
  }
