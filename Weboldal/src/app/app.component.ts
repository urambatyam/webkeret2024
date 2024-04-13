import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  routes: Array<string> = [];
  title = 'Orvosi vérnyomásmérő oldal';
  page = '';
  loggedInUser?: firebase.default.User | null;
  constructor(private router: Router, private authService: AuthService){}
  ngOnInit(){
    localStorage.setItem('id', 'null');
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( (events: any) => {
            const currentPage = (events.urlAfterRedirects as string).split('/')[1] as string;
            if(this.routes.includes(currentPage)){
              this.page = currentPage;
            }
          });
    this.authService.isUserLoggedIn().subscribe(user => {
            this.loggedInUser = user;
            localStorage.setItem('user', JSON.stringify(this.loggedInUser));
          }, error => {
            console.error(error);
            localStorage.setItem('user', JSON.stringify('null'));
          });
    
  }
  nav(selected: string){this.router.navigateByUrl(selected);}
  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Sikeres  kijelentkezés');
    }).catch(error => {
      console.error(error);
    });
  }
}
