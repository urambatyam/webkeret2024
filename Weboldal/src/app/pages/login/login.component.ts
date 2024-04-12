import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToltService } from '../../shared/services/tolt.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { error } from 'console';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit, OnDestroy{
  email = new FormControl<string>('');
  jelszo = new FormControl<string>('');
  
  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: ToltService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;
      this.authService.Login(this.email.value as string, this.jelszo.value as string).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch( error => {
        console.error(error);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
