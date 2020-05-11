import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cal-sync-with-google',
  templateUrl: './cal-sync-with-google.component.html',
  styleUrls: ['./cal-sync-with-google.component.css']
})
export class CalSyncWithGoogleComponent implements OnInit {

  public displayMessage: string = "Please wait...";
  public secCount: number = 5;

  constructor(public httpRequestService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public cookieService: CookieService, public router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
    if (this.activatedRoute.snapshot.params.refresh && this.cookieService.check('user_details')) {
      let data = {
        token: this.cookieService.get('jwtToken'),
        id: userDetails._id,
        data: {
          access_token: this.activatedRoute.snapshot.params.access_token,
          refresh_token: this.activatedRoute.snapshot.params.refresh
        }
      }
      this.httpRequestService.httpViaPost('cal-update-user', data).subscribe((response) => {
        if(response.status == 'success') {
          setInterval(() => {
            this.secCount = this.secCount - 1;
            this.displayMessage = "Synchronize Complete. You will be redirected in " + this.secCount + " sec.";
            if(this.secCount == 0) {
              this.secCount = 1;
              this.router.navigateByUrl('/tech/manage-calender/manage-sehedule');
            }
          }, 1000);

          this.snackBar.open("Successfully updated.", "Ok", {
            duration: 2000,
          });
        } else {
          this.snackBar.open("SuccessfAn error occord. Please try again.", "Ok", {
            duration: 2000,
          });

          setTimeout(() => {
            this.router.navigateByUrl('/tech/manage-calender/manage-sehedule');
          }, 4000);
        }
      });
    }
  }

  connectGoogleCalendar() {
    this.httpRequestService.httpViaPost("https://gapi.betoparedes.com/connect-calendar-pece.php", null).subscribe((response) => {
      console.log("response", response);
    })
  }

}
