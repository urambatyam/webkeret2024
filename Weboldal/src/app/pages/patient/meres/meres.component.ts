import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Blood } from 'src/app/shared/model/blood';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-meres',
  templateUrl: './meres.component.html',
  styleUrl: './meres.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class MeresComponent {
  TableForm = this.createForm({
    tab: 0,
    disztoles: 0,
    szisztoles: 0,
    date: new Date()
  })
  createForm(model: Blood){
    let formGroup = this.fb.group(model);
    return formGroup;
  }
  patients: Blood[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  
    this.patients.push({
      tab: 0,
      disztoles: 70,
      szisztoles: 120,
      date: new Date()
    });
    this.patients.push({
      tab: 0,
      disztoles: 78,
      szisztoles: 132,
      date: new Date()
    });
    this.patients.push({
      tab: 0,
      disztoles: 80,
      szisztoles: 137,
      date: new Date()
    });
    this.patients.push({
      tab: 0,
      disztoles: 90,
      szisztoles: 140,
      date: new Date()
    });
  }

  onAdd(): void {
    const newPatient: Blood = {
      tab: this.TableForm.get('tab')?.value || 0,
      disztoles: this.TableForm.get('disztoles')?.value || 0,
      szisztoles: this.TableForm.get('szisztoles')?.value || 0,
      date: this.TableForm.get('date')?.value || new Date()
    };
  
    if (newPatient.tab !== null && newPatient.disztoles !== null && newPatient.szisztoles !== null && newPatient.date !== null) {
      this.patients.push(newPatient);
    }
    this.TableForm.reset({ tab: 0, disztoles: 0, szisztoles: 0, date: new Date() });
  }

  onDelete(patient: Blood): void {
    // Beteg törlése
    this.patients = this.patients.filter(p => p !== patient);
  }

}
