import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistRoutingModule } from './regist-routing.module';
import { RegistComponent } from './regist.component';


@NgModule({
  declarations: [
    RegistComponent
  ],
  imports: [
    CommonModule,
    RegistRoutingModule
  ]
})
export class RegistModule { }
