import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dia } from 'src/app/shared/model/diagnosztika';
import { DiagnosztikaService } from 'src/app/shared/services/diagnosztika.service';

@Component({
  selector: 'app-uzenet',
  templateUrl: './uzenet.component.html',
  styleUrl: './uzenet.component.sass'
})
export class UzenetComponent {
  UzenetForm = this.createForm({
    id: '',
    fogado: '',
    kuldo: '',
    text: '',
    date: new Date()
  })
  createForm(model: Dia){
    let formGroup = this.fb.group(model);
    formGroup.get('text')?.addValidators([Validators.required,Validators.maxLength(200)]);
    return formGroup;
  }
  uzenetek: Dia[] = [];
  constructor(private fb: FormBuilder, private diaservice: DiagnosztikaService) { }
  ngOnInit(): void {
    this.uzenetek = [];
    const userData = JSON.parse(localStorage.getItem('user') as string); 
    if (userData) {
      const userData = JSON.parse(localStorage.getItem('user') as string); 
      this.diaservice.getById(userData.uid).subscribe(data => {
        if (data) {
          this.uzenetek = data as unknown as Dia[]; 
        }
      });
    } else {
      console.error('No user data found in localStorage');
    }
  }
  onAdd(): void {
    const userData = JSON.parse(localStorage.getItem('user') as string);
    const ujuzent: Dia = {
      id: '',
      fogado: this.uzenetek[-1].kuldo,
      kuldo: userData.uid,
      text: this.UzenetForm.get('text')?.value as string,
      date: new Date()
    };
    if (this.UzenetForm.valid) {
      console.log(ujuzent);
      this.diaservice.create(ujuzent);
      this.uzenetek.push(ujuzent);
    }
    this.UzenetForm.reset({ 
      id: '',
      fogado: '',
      kuldo: '',
      text: '',
      date: new Date()});
  }
  onDelete(id: string): void {
    this.diaservice.delete(id);
  }
}
