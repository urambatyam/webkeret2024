import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {
  @Input() aholVagyunk: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() selected: EventEmitter<string> = new EventEmitter;
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  menuMagic(){
    this.selected.emit(this.aholVagyunk);
  }
  close(logout?: boolean) {
    this.onCloseSidenav.emit(true);
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }

}
