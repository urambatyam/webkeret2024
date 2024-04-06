import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dia } from 'src/app/shared/model/diagnosztika';

@Component({
  selector: 'app-uzenet',
  templateUrl: './uzenet.component.html',
  styleUrl: './uzenet.component.sass'
})
export class UzenetComponent {
  UzenetForm = this.createForm({
    tab: 0,
    orvosTab: 0,
    text: '',
    date: new Date()
  })
  createForm(model: Dia){
    let formGroup = this.fb.group(model);
    return formGroup;
  }
  uzenetek: Dia[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Példa adatok betöltése
    this.uzenetek.push({
      tab: 0,
      orvosTab: 0,
      text: 'valami',
      date: new Date()
    });
  }

  onAdd(): void {
    const ujuzent: Dia = {
      tab: this.UzenetForm.get('tab')?.value || 0,
      orvosTab: this.UzenetForm.get('orvosTab')?.value || 0,
      text: this.UzenetForm.get('text')?.value || '',
      date: this.UzenetForm.get('date')?.value || new Date()
    };
  
    if (ujuzent.tab !== null && ujuzent.orvosTab !== null && ujuzent.text !== null && ujuzent.date !== null) {
      console.log(ujuzent);
      this.uzenetek.push(ujuzent);
    }
    this.UzenetForm.reset({ tab: 0,
      orvosTab: 0,
      text: '',
      date: new Date() });
  }

  onDelete(patient: Dia): void {
    // Beteg törlése
    this.uzenetek = this.uzenetek.filter(p => p !== patient);
  }


}
