import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-doctor-office-dashboard',
  templateUrl: './doctor-office-dashboard.component.html',
  styleUrls: ['./doctor-office-dashboard.component.css']
})
export class DoctorOfficeDashboardComponent implements OnInit {

  public configData: any = {
    appName: 'Calendar-Management',
    jwtToken: "",
    baseUrl: environment.calendarApi,
    endPoint: {
      add: 'add-or-update-event-data',
      datalist: 'datalist',
      deleteEvent: 'delete-single-event',
      viewEventSlots: 'view-event-eventdayarr',
      search: 'search',
      countSlot: 'count-slot',
      listBookedEvents: 'list-booked-events',
      listBookedEventsCount: 'list-booked-events-count',
      deleteBookedEvent: 'delete-booked-event',
      rescheduleBookedEvent: 'reschedule',
      getTokenInfo: 'getauthorization-pece-getuserdata'
    },
    urls: [],
    timeZone: [
      { text: 'Alaska Standard Time', value: '-08:00|America/Anchorage' },
      { text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles' },
      { text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver' },
      { text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix' },
      { text: 'Central Standard Time', value: '-05:00|America/Chicago' },
      { text: 'Eastern Standard Time', value: '-04:00|America/New_York' },
      { text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu' }
    ],
    eventType: [
      { text: "Admin Meetings", value: 1 },
      { text: "Type 2", value: 2 },
      { text: "Type 3", value: 3 },
      { text: "Type 3", value: 4 }
    ],
    responseData: "",
    primaryCondition: { $or: [{ event_type: 1 }, { event_type: 2 }] }
  };

  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');

      this.activatedRoute.data.forEach((data) => {
        this.configData.responseData = data.bookedEventList.data;
      });

      // Merge logged in user details with the config data
      let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
      this.configData = Object.assign(this.configData, userDetails);
    } else {
      this.openSnackBar("Token not found", null);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  viewReportProcessData(string: any = null) {

  }

}
