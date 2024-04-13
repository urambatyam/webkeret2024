import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { ListaComponent } from './lista/lista.component';
import { TanacsComponent } from './tanacs/tanacs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReszletekComponent } from './reszletek/reszletek.component';
import { KozosModule } from 'src/app/shared/kozos/kozos.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';





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
    KozosModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class DoctorModule { }
