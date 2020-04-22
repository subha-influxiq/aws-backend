import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { ResolveService } from '../../../../../services/resolve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-cal-event-listing',
  templateUrl: './cal-event-listing.component.html',
  styleUrls: ['./cal-event-listing.component.css']
})
export class CalEventListingComponent implements OnInit {

  public eventData: any;

  public configData: any = {
    appName: 'Calendar-Management',
    jwtToken: "",
    baseUrl: environment.calendarApi,
    endPoint: {
      add: "add-or-update-event-data",
      datalist: "datalist",
      deleteEvent: "delete-single-event",
      search: "search"
    },
    responseData: "",
    timeZone: [
      { text: 'Alaska Standard Time', value: '-08:00|America/Anchorage' },
      { text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles' },
      { text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver' },
      { text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix' },
      { text: 'Central Standard Time', value: '-05:00|America/Chicago' },
      { text: 'Eastern Standard Time', value: '-04:00|America/New_York' },
      { text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu' }
    ],
    timeSpan: [
      { text: "30 Min", value: 30 },
      { text: "60 Min", value: 60 },
      { text: "90 Min", value: 90 },
      { text: "120 Min", value: 120 }
    ],
    eventType: [
      { text: "Admin Meetings", value: 1 }
    ],
    urls: [
      { pathUrl: 'tech/manage-calender/manage-sehedule', text: 'View Slot', color: 'primary', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/event-listing', text: 'Event Listing', color: 'accent', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/create-availability', text: 'Create Availability', color: 'warn', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/booked-events', text: 'Booked Events', color: 'accent', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/sync-with-google', text: 'Sync with Google', color: 'warn', active: true, isExternalLink: false },
      {
        pathUrl: environment.googleSyncApi,
        text: 'Add or Update Google Calendar', color: 'primary',
        active: true, isExternalLink: true
      }
    ],
    primaryCondition: {}
  };

  constructor(public http: HttpClient, private httpRequest: HttpServiceService,
              private router: Router, private cookieService: CookieService,
              private snackBar: MatSnackBar, private resolveService: ResolveService,
              public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      this.getEvents();
      // Merge logged in user details with the config data
      let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
      this.configData = Object.assign(this.configData, userDetails);

      this.configData.primaryCondition = Object.assign(this.configData.primaryCondition, {userid: {$in: [userDetails._id]}});
    }
    else {
      this.openSnackBar("Token not found", null);
    }
  }

  getEvents() {
    this.activatedRoute.data.forEach((data) => {
      this.configData.responseData = data.eventListData.data;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
