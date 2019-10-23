import { OnInit, Input, Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<div *ngIf="loading" class="mainOverlayLoader"><mat-spinner color="warn"></mat-spinner> </div><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'aws-backend';
  public loading: boolean = false;
  public testJsonData: any = { "data": "test", "others": "others test" };

  constructor(private cookieService: CookieService, private router: Router) {
    /* Universal Loader for Reslove */
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          console.log('loading start');
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          console.log('loading end');
          break;
        }
        default: {
          break;
        }
      }
    });
  }

}
