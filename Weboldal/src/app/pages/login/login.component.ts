import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  email = new FormControl('');
  jelszo = new FormControl('');
  login(){
    console.log("jjj")
    console.log("kkk")
  }

}
