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
import { Validators } from '@angular/forms';
import moment from 'moment-es6';

@Component({
  selector: 'app-booked-events',
  templateUrl: './booked-events.component.html',
  styleUrls: ['./booked-events.component.css']
})
export class BookedEventsComponent implements OnInit {

  today = moment().format('L');
  states: any = [];

  public configData: any = {
    appName: 'Calendar Management',
    jwtToken: '',
    baseUrl: environment.calendarApi,
    endPoint: {
      add: 'add-or-update-event-data',
      datalist: 'datalist',
      deleteEvent: 'delete-single-event',
      viewEventSlots: 'view-event-eventdayarr',
      search: 'search',
      countSlot: 'count-slot',
      addToCalendar: 'add-to-calendar',
      getRefreshToken: 'get-refresh-token'
    },
    urls: [
      { pathUrl: 'tech/manage-calender/manage-sehedule', text: 'View Slot', color: 'primary', active: false, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/event-listing', text: 'Event Listing', color: 'accent', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/create-slot', text: 'Create Availability', color: 'warn', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/booked-events', text: 'Booked Events', color: 'accent', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/sync-with-google', text: 'Sync with Google', color: 'warn', active: true, isExternalLink: false },
      {
        pathUrl: environment.googleSyncApi,
        text: 'Add or Update Google Calendar', color: 'primary',
        active: true, isExternalLink: true
      }
    ],
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
      { text: "Patient's Appointment for RM - 3A Testing", value: 1 }
    ],
    responseData: '',
    patientInfoFormFields: {},
    calendarInfoFormFields: {},
    primaryCondition: { $or: [{ event_type: 1 }, { event_type: 2 }] },
  };

  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      this.activatedRoute.data.forEach((data) => {
        this.configData.responseData = data.eventListData.data;
      });

      // Merge logged in user details with the config data
      let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
      this.configData = Object.assign(this.configData, userDetails);
    } else {
      this.openSnackBar("Token not found", null);
    }
    console.log('this.configData', this.configData);
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
