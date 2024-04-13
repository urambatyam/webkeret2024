import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Blood } from 'src/app/shared/model/blood';
import { BloodService } from 'src/app/shared/services/blood.service';

@Component({
  selector: 'app-reszletek',
  templateUrl: './reszletek.component.html',
  styleUrl: './reszletek.component.sass'
})
export class ReszletekComponent implements OnChanges{
  @Input() input: Blood[] | null = null;;
  
  meresek: Blood[] = [];
  constructor( private bl: BloodService){}
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['input'] && changes['input'].currentValue) {
      this.meresek = changes['input'].currentValue;
    }
  }
  }
  

