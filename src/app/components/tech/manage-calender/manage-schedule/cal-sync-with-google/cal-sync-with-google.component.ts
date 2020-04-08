import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cal-sync-with-google',
  templateUrl: './cal-sync-with-google.component.html',
  styleUrls: ['./cal-sync-with-google.component.css']
})
export class CalSyncWithGoogleComponent implements OnInit {

  constructor(public httpRequestService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public cookieService: CookieService) {
  }

  ngOnInit() {
    console.log('ngOnInit() executing');
    console.log('this.activatedRoute.snapshot', this.activatedRoute.snapshot.params);
    let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
    if (this.activatedRoute.snapshot.params.refresh && this.cookieService.check('user_details')) {
      let data = {
        token: this.cookieService.get('jwtToken'),
        id: userDetails._id,
        data: {
          access_token: this.activatedRoute.snapshot.params.access_t,
          refresh_token: this.activatedRoute.snapshot.params.refresh
        }
      }
      this.httpRequestService.httpViaPost('cal-update-user', data).subscribe((response) => {
        console.log('response', response);
      });
    }
  }

  connectGoogleCalendar() {
    console.log("connecting to google calendar...");
    this.httpRequestService.httpViaPost("https://gapi.betoparedes.com/connect-calendar-pece.php", null).subscribe((response) => {
      console.log("response", response);
    })
  }

}
