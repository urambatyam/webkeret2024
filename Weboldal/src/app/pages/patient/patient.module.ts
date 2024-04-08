import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { MeresComponent } from './meres/meres.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UzenetComponent } from './uzenet/uzenet.component';
import { StatisztikaComponent } from './statisztika/statisztika.component';
import { KozosModule } from 'src/app/shared/kozos/kozos.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';





@NgModule({
  declarations: [
    PatientComponent,
    MeresComponent,
    UzenetComponent,
    StatisztikaComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PatientRoutingModule,
    KozosModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ]
})
export class PatientModule { }
