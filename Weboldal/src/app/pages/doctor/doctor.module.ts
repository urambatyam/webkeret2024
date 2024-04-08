import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { ListaComponent } from './lista/lista.component';
import { TanacsComponent } from './tanacs/tanacs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReszletekComponent } from './reszletek/reszletek.component';
import { KozosModule } from 'src/app/shared/kozos/kozos.module';





@NgModule({
  declarations: [
    DoctorComponent,
    ListaComponent,
    TanacsComponent,
    ReszletekComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule,
    KozosModule
  ]
})
export class DoctorModule { }
