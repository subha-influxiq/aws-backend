import {Component, OnInit} from '@angular/core';
import {HttpServiceService} from '../../../../../services/http-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material';
import {environment} from "../../../../../../environments/environment.prod";

@Component({
  selector: 'app-cal-sync-with-google',
  templateUrl: './cal-sync-with-google.component.html',
  styleUrls: ['./cal-sync-with-google.component.css']
})
export class CalSyncWithGoogleComponent implements OnInit {

  public displayMessage: string = "Please wait...";
  public secCount: number = 5;
  public userDetails: any;

  constructor(public httpRequestService: HttpServiceService, public activatedRoute: ActivatedRoute,
              public cookieService: CookieService, public router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.cookieService.get('user_details'));
    if (this.activatedRoute.snapshot.params.refresh && this.cookieService.check('user_details')) {
      let url = environment.calendarApi + 'getauthorization-pece-getuserdata' +
        '?access_token=' + this.activatedRoute.snapshot.params.access_token;
      this.httpRequestService.get(url).subscribe((response: any) => {

        let data = {
          token: this.cookieService.get('jwtToken'),
          id: this.userDetails._id,
          data: {
            access_token: this.activatedRoute.snapshot.params.access_token,
            refresh_token: this.activatedRoute.snapshot.params.refresh,
            connected_gmail: response.id
          }
        };

        // Update user details in database
        this.httpRequestService.postRequest('update-user', data).subscribe((response: any) => {
          console.log('response', response);
          if (response.status == 'success') {
            this.openSnackBar('Calendar added successfully...');

            setInterval(() => {
              this.secCount = this.secCount - 1;
              this.displayMessage = "Synchronize Complete. You will be redirected in " + this.secCount + " sec.";
              if (this.secCount == 0) {
                this.secCount = 1;
                this.router.navigateByUrl('/tech/manage-calender/manage-sehedule');
              }
            }, 1000);
          } else {
            this.openSnackBar("An error occurs. Please try again.", "Ok");

            setTimeout(() => {
              this.router.navigateByUrl('/tech/manage-calender/manage-sehedule');
            }, 4000);
          }

        });

        // Send email to the logged in user
        let urlSendEmail = environment.calendarApi + 'send-confirmation-email?id=' + this.userDetails._id;
        this.httpRequestService.get(urlSendEmail).subscribe((response: any) => {
          if (response.status == 'success') {
            console.log('Mail sent ', response.msg_id);
            this.openSnackBar('Confirmation email sent to your email - ' + this.userDetails.email, 'Ok');
          }
        });

        // Update user_details in cookie
        this.cookieService.set('user_details', JSON.stringify(Object.assign(this.userDetails, data.data)));
      });

      /* **********************************************************************************
      this.httpRequestService.httpViaPost('cal-update-user', data).subscribe((response) => {
        if (response.status == 'success') {
          setInterval(() => {
            this.secCount = this.secCount - 1;
            this.displayMessage = "Synchronize Complete. You will be redirected in " + this.secCount + " sec.";
            if (this.secCount == 0) {
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
      ************************************************************************** */
    }
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  connectGoogleCalendar() {
    this.httpRequestService.httpViaPost("https://gapi.betoparedes.com/connect-calendar-pece.php", null).subscribe((response) => {
      console.log("response", response);
    })
  }

}
