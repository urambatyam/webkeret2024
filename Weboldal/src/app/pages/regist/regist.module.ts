import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistRoutingModule } from './regist-routing.module';
import { RegistComponent } from './regist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    RegistComponent
  ],
  imports: [
    CommonModule,
    RegistRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class RegistModule { }
