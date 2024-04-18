import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Blood } from 'src/app/shared/model/blood';
import { BloodService } from 'src/app/shared/services/blood.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html'
})
export class AlertDialogComponent {
  updateForm = this.createForm({
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
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogComponent>, private fb: FormBuilder, private b: BloodService) {
    if (data) {
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('30vw','30vw')
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  userData = JSON.parse(localStorage.getItem('user') as string);

  update(){
    this.b.update(this.userData.uid,this.data.id,this.updateForm.value as Blood);
  }

}