import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.sass'
})
export class ListaComponent  implements OnInit {
  @Output() idChanged = new EventEmitter<string>();
  tbs: User[] = [];
  constructor(private router: Router,private users: UserService, private u:AuthService){}
  ngOnInit(): void {
    console.log(this.u.getCurrentUserID())
    
    const userData = JSON.parse(localStorage.getItem('user') as string); 

    if (userData) {
      const userId = userData.uid; 
      this.users.notMe(userId).subscribe(data => {
        this.tbs = data; 
      });
    } 
  }
  
  reszletek(id: string) {
    this.idChanged.emit(id);
  }
  
}
