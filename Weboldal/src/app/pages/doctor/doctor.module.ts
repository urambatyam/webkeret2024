import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { ListaComponent } from './lista/lista.component';
import { TanacsComponent } from './tanacs/tanacs.component';
import { CsoPipe } from 'src/app/shared/pipes/cso.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DoctorComponent,
    ListaComponent,
    TanacsComponent,
    CsoPipe
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule
  ]
})
export class DoctorModule { }
