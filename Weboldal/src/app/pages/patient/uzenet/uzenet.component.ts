import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dia } from 'src/app/shared/model/diagnosztika';

@Component({
  selector: 'app-uzenet',
  templateUrl: './uzenet.component.html',
  styleUrl: './uzenet.component.sass'
})
export class UzenetComponent {
  UzenetForm = this.createForm({
    id: '',
    kuldo: '',
    fogado: '',
    text: '',
    date: new Date()
  })
  createForm(model: Dia){
    let formGroup = this.fb.group(model);
    formGroup.get('text')?.addValidators([Validators.required,Validators.maxLength(200)]);
    return formGroup;
  }
  uzenetek: Dia[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  
 
  }

  onAdd() {
 
  }

  onDelete(patient: Dia): void {
   
  }


}
