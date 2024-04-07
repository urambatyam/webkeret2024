import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { MeresComponent } from './meres/meres.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UzenetComponent } from './uzenet/uzenet.component';
import { CsoPipe } from 'src/app/shared/pipes/cso.pipe';


@NgModule({
  declarations: [
    PatientComponent,
    MeresComponent,
    UzenetComponent,
    CsoPipe
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
