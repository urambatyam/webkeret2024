import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsoPipe } from '../pipes/cso.pipe';



@NgModule({
  declarations: [CsoPipe],
  imports: [CommonModule],
  exports: [CsoPipe],
  providers: [CsoPipe] 
})
export class KozosModule { }
