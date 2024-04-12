import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dia } from 'src/app/shared/model/diagnosztika';
import { DiagnosztikaService } from 'src/app/shared/services/diagnosztika.service';

@Component({
  selector: 'app-tanacs',
  templateUrl: './tanacs.component.html',
  styleUrl: './tanacs.component.sass'
})
export class TanacsComponent {
  
  @Input() id: string| null = null;
  bool:boolean = this.id!==null;
  ngOnChanges(changes: SimpleChanges): void {
    console.log("id ", this.id)
    if (changes['id'] && changes['id'].currentValue) {
      console.log(this.id)
      this.bool = changes['id'].currentValue!==null;
    }
  }
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

  constructor(private fb: FormBuilder, private diaservice: DiagnosztikaService) {}

  

  onAdd(): void {

    const userData = JSON.parse(localStorage.getItem('user') as string);
    const ujuzent: Dia = {
      id: '',
      fogado: this.id?this.id:'',
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
