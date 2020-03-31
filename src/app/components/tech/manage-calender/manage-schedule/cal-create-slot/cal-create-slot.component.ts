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
    baseUrl: environment.apiBaseUrl,
    endPoint: { 
      add: 'cal-add-or-update-event-data', 
      edit: 'cal-add-or-update-event-data'
    },
    urls: {
      view: 'tech/manage-calender/manage-sehedule',
      viewSlotUser: 'tech/manage-calender/manage-sehedule/view-slot-user',
      eventListing: 'tech/manage-calender/manage-sehedule/event-listing',
      add: 'tech/manage-calender/manage-sehedule/create-slot',
      edit: '',
      googleSync: environment.googleSyncApi
    },
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
      { text: "Patient's Appointment for RM - 3A Testing", value: 1 }
    ]
  };

  constructor(private router: Router, private cookieService: CookieService) {

  }

  ngOnInit() {
    this.configData.jwtToken = this.cookieService.get('jwtToken');
  }

}
