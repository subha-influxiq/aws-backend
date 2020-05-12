import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpServiceService} from '../../../../../services/http-service.service';
import {ResolveService} from '../../../../../services/resolve.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonFunction} from '../../../../../class/common/common-function';
import {MatTableDataSource} from '@angular/material/table';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../../../environments/environment';
import {Validators} from '@angular/forms';
import moment from 'moment-es6';

@Component({
  selector: 'app-booked-events',
  templateUrl: './booked-events.component.html',
  styleUrls: ['./booked-events.component.css']
})
export class BookedEventsComponent implements OnInit {

  // public configData: any = {
  //   appName: 'Calendar-Management',
  //   jwtToken: '',
  //   baseUrl: environment.calendarApi,
  //   endPoint: {
  //     add: 'add-or-update-event-data',
  //     datalist: 'datalist',
  //     deleteEvent: 'delete-single-event',
  //     viewEventSlots: 'view-event-eventdayarr',
  //     search: 'search',
  //     countSlot: 'count-slot',
  //     listBookedEvents: 'list-booked-events',
  //     listBookedEventsCount: 'list-booked-events-count',
  //     deleteBookedEvent: 'delete-booked-event',
  //     rescheduleBookedEvent: 'reschedule',
  //     getTokenInfo: 'getauthorization-pece-getuserdata'
  //   },
  //   urls: [
  //     {
  //       pathUrl: 'tech/manage-calender/manage-sehedule',
  //       text: 'View Slot',
  //       color: 'primary',
  //       active: true,
  //       isExternalLink: false
  //     },
  //     {
  //       pathUrl: 'tech/manage-calender/manage-sehedule/event-listing',
  //       text: 'Event Listing',
  //       color: 'accent',
  //       active: true,
  //       isExternalLink: false
  //     },
  //     {
  //       pathUrl: 'tech/manage-calender/manage-sehedule/create-availability',
  //       text: 'Create Availability',
  //       color: 'warn',
  //       active: true,
  //       isExternalLink: false
  //     },
  //     {
  //       pathUrl: 'tech/manage-calender/manage-sehedule/booked-events',
  //       text: 'Booked Events',
  //       color: 'accent',
  //       active: true,
  //       isExternalLink: false
  //     },
  //     {
  //       pathUrl: 'tech/manage-calender/manage-sehedule/sync-with-google',
  //       text: 'Sync with Google',
  //       color: 'warn',
  //       active: true,
  //       isExternalLink: false
  //     },
  //     {
  //       pathUrl: environment.googleSyncApi,
  //       text: 'Add or Update Google Calendar', color: 'primary',
  //       active: true, isExternalLink: true
  //     }
  //   ],
  //   timeZone: [
  //     {text: 'Alaska Standard Time', value: '-08:00|America/Anchorage'},
  //     {text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles'},
  //     {text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver'},
  //     {text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix'},
  //     {text: 'Central Standard Time', value: '-05:00|America/Chicago'},
  //     {text: 'Eastern Standard Time', value: '-04:00|America/New_York'},
  //     {text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu'}
  //   ],
  //   eventType: [
  //     {text: 'Admin Meetings', value: 1}
  //   ],
  //   responseData: '',
  //   primaryCondition: {$or: [{event_type: 1}, {event_type: 2}]},
  //
  //   // lib-listing inputs
  //   skipFields: [],
  //   modify_header_array: {
  //     patient_name: 'Patient Name',
  //     doctor_name: 'Doctor Name',
  //     doctor_office_name: 'Doctor Office Name',
  //     booking_date: 'Booked On',
  //     startdate: 'Event Date',
  //     slot: "Start Time",
  //     slot_end_time: 'End Time',
  //     timezoneName: 'Timezone'
  //   },
  //   source: 'google-events',
  //   date_search_source_count: 0,
  //   libdata: {
  //     detailview_override: [],
  //     updateendpoint: 'statusupdate',
  //     hideeditbutton: true,// all these button options are optional not mandatory
  //     tableheaders: ['patient_name', 'doctor_name', 'doctor_office_name', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName'], //not required
  //     custombuttons: []
  //   },
  //   updatetable: false,
  //   limitcond: {
  //     "limit": 10,
  //     "skip": 0,
  //     "pagecount": 1
  //   },
  //   sortdata: {
  //     "type": 'asc',
  //     "field": 'booking_date',
  //     "options": ['patient_name', 'booking_date', 'startdate', 'slot', 'slot_end_time']
  //   },
  //   custom_link: [],
  //   search_settings: {
  //     // this is use for  date search
  //     datesearch: [{
  //       startdatelabel: "Events After",
  //       enddatelabel: "Events Before",
  //       submit: "Search",
  //       field: "startdate_unix"
  //     }],
  //
  //     // this is use for  select search
  //     selectsearch: [{
  //       label: 'Search By Status',
  //       field: 'status',
  //       values: [{val: 0, 'name': 'Pending'}, {val: 1, 'name': 'Approved'}, {val: 2, 'name': 'Canceled'}]
  //     }],
  //
  //     // this is use for  text search
  //     textsearch: [{label: "Search By Patient Name", field: 'patient_name'}],
  //
  //     // this is use for  Autocomplete search
  //     search: [
  //       {
  //         label: "Search By Doctor", field: 'doctor_id', values: [
  //           {val: 'example_doctor_id', name: 'YmattZ A'},
  //           {val: 'YmattZ', name: 'YmattZ A'},
  //           {val: 'Ymatt', name: 'YmattZ AB'},
  //           {val: 'Jessica', name: 'A Jessica'}
  //         ]
  //       },
  //       {
  //         label: "Search By Doctor Office", field: 'doctor_office_id', values: [
  //           {val: 'example_doctor_office_id', name: 'YmattZ A'},
  //           {val: 'YmattZ', name: 'YmattZ A'},
  //           {val: 'Ymatt', name: 'YmattZ AB'},
  //           {val: 'Jessica', name: 'A Jessica'}
  //         ]
  //       }
  //     ]
  //   },
  //   statusarray: [{val: 0, 'name': 'Pending'}, {val: 1, 'name': 'Approved'}, {val: 2, 'name': 'Canceled'}]
  // };

  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute,
              public snackBar: MatSnackBar, public httpRequest: HttpServiceService) {
  }

  ngOnInit() {
    // if (this.cookieService.check('jwtToken')) {
    //   this.configData.jwtToken = this.cookieService.get('jwtToken');
    //   this.activatedRoute.data.forEach((data) => {
    //     // Set dataset in responseData
    //     this.configData.responseData = data.eventListData.results.res;
    //     // Create skipFields array(first save all the keys from the dataset)
    //     this.configData.skipFields = Object.keys(data.eventListData.results.res[0]);
    //     let requiredFields = ['patient_name', 'doctor_name', 'doctor_office_name', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName'];
    //     // Modify the skipFields array(splicing the keys which is in the requiredFields)
    //     for (let i = 0; i < requiredFields.length; i++) {
    //       this.configData.skipFields.splice(this.configData.skipFields.indexOf(requiredFields[i]), 1)
    //     }
    //   });
    //
    //   // Merge logged in user details with the config data
    //   let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
    //   this.configData = Object.assign(this.configData, userDetails);
    //
    //   /* ****************** Get total booked events count ****************** */
    //   let data = {
    //     condition: {}, token: this.configData.jwtToken,
    //     sort: {type: 'asc', field: 'patient_name'}
    //   };
    //
    //   this.httpRequest.postRequest(this.configData.endPoint.listBookedEventsCount, data).subscribe((response: any) => {
    //     this.configData.date_search_source_count = response.count;
    //   });
    //   /* ******************************************************************* */
    //
    // } else {
    //   this.openSnackBar('Token not found', null);
    // }
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
