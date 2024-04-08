import { Component } from '@angular/core';
import { Blood } from 'src/app/shared/model/blood';

@Component({
  selector: 'app-reszletek',
  templateUrl: './reszletek.component.html',
  styleUrl: './reszletek.component.sass'
})
export class ReszletekComponent {
  meresek: Blood[] = [];
  constructor(){}
}
