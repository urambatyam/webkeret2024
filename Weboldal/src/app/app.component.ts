import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  routes: Array<string> = [];
  title = 'Orvosi vérnyomásmérő oldal';
  page = '';
  constructor(private router: Router){}
  ngOnInit(){
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( (events: any) => {
            const currentPage = (events.urlAfterRedirects as string).split('/')[1] as string;
            if(this.routes.includes(currentPage)){
              this.page = currentPage;
            }
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
}
