import { Component } from '@angular/core';
import { Blood } from 'src/app/shared/model/blood';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.sass'
})
export class ListaComponent {
  tabs: User[] = [];
  meresek: Blood[] = [];
  gomb: boolean = false;
  constructor(){}
  reszletek(tab:number){
    this.gomb = true;
  }
  bezar(){
    this.gomb = false;
  }

}
