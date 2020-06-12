import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-cal-create-slot',
  templateUrl: './cal-create-slot.component.html',
  styleUrls: ['./cal-create-slot.component.css']
})

export class CalCreateSlotComponent implements OnInit {

  public configData: any = {
    appName: 'Calendar Management',
    jwtToken: '',
    baseUrl: environment.calendarApi,
    endPoint: {
      add: 'add-or-update-event-data',
      edit: 'add-or-update-event-data',
      getTokenInfo: 'getauthorization-pece-getuserdata',
      syncWithGoogle: 'get-events-from-google'
    },
    urls: [
      { pathUrl: 'tech/manage-calender/manage-sehedule', text: 'View Slot', color: 'primary', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/event-listing', text: 'Event Listing', color: 'accent', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/create-availability', text: 'Create Availability', color: 'warn', active: true, isExternalLink: false },
      { pathUrl: 'tech/manage-calender/manage-sehedule/booked-events', text: 'Booked Events', color: 'accent', active: true, isExternalLink: false },
      // { pathUrl: 'tech/manage-calender/manage-sehedule/sync-with-google', text: 'Sync with Google', color: 'warn', active: true, isExternalLink: false },
      {
        type: 'syncGoogleCalendar',
        text: 'Sync with google', color: 'warn', spinnerColor: 'primary',
        active: true, isExternalLink: false
      },
      {
        pathUrl: environment.googleSyncApi,
        text: 'Add or Update Google Calendar', color: 'primary',
        active: true, isExternalLink: true
      }
    ],
    redirectUrl: 'tech/manage-calender/manage-sehedule',
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
      { text: '30 Min', value: 30 },
      { text: '60 Min', value: 60 },
      { text: '90 Min', value: 90 },
      { text: '120 Min', value: 120 }
    ],
    eventType: [
      { text: 'Admin Meetings', value: 1 }
    ]
  };

  constructor(private router: Router, private cookieService: CookieService) {

  }

  ngOnInit() {
    if (this.cookieService.check('user_details')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      // Merge logged in user details with the config data
      let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
      this.configData = Object.assign(this.configData, userDetails);
    }
  }

 



}
