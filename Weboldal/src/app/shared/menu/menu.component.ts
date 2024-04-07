import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {
  @Input() aholVagyunk: string = '';
  @Output() selected: EventEmitter<string> = new EventEmitter;
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  menuMagic(){
    this.selected.emit(this.aholVagyunk);
  }
  close() {
    this.onCloseSidenav.emit(true);
  }

}
