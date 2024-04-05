import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {
  @Input() aholVagyunk: string = '';
  @Output() selected: EventEmitter<string> = new EventEmitter;
  menuMagic(){
    this.selected.emit(this.aholVagyunk);
  }

}
