import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import * as momentImported from 'moment';
const moment = momentImported;
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-appoinments-listing',
  templateUrl: './appoinments-listing.component.html',
  styleUrls: ['./appoinments-listing.component.css']
})

export class AppoinmentsListingComponent implements OnInit {

  public configData: any = {
    appName: 'Calendar Management',
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
    primaryCondition: { $or: [{ event_type: 1 }, { event_type: 2 }] },


    // lib-listing inputs
    skipFields: [],
    modify_header_array: {
      patient_name: 'Patient Name',
      closeremail: 'Booked by',
      useremail: 'Organizer Email',
      booking_date: 'Booked On',
      startdate: 'Event Date',
      slot: "Start Time",
      slot_end_time: 'End Time',
      timezoneName: 'Timezone'
    },
    source: 'google-events',
    date_search_source_count: 0,
    libdata: {
      detailview_override: [],
      updateendpoint: 'statusupdate',
      hideeditbutton: true,// all these button options are optional not mandatory
      tableheaders: ['patient_name', 'closeremail', 'useremail', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName'], //not required
      custombuttons: []
    },
    updatetable: false,
    limitcond: {
      "limit": 10,
      "skip": 0,
      "pagecount": 1
    },
    sortdata: {
      "type": 'asc',
      "field": 'patient_name',
      "options": ['patient_name', 'booking_date', 'startdate', 'slot', 'slot_end_time']
    },
    custom_link: [],
    search_settings: {
      // this is use for  date search
      datesearch: [{startdatelabel: "Events After", enddatelabel: "Events Before", submit: "Search", field: "startdate_unix"}],

      // this is use for  select search
      selectsearch: [{
        label: 'Search By Status',
        field: 'status',
        values: [{val: 0, 'name': 'Pending'}, {val: 1, 'name': 'Approved'}, {val: 2, 'name': 'Canceled'}]
      }],

      // this is use for  text search
      textsearch: [{label: "Search By Patient Name", field: 'patient_name'}],

      // this is use for  Autocomplete search
      search: [
        {
          label: "Search By Doctor", field: 'doctor_id', values: [
            {val: 'example_doctor_id', name: 'YmattZ A'},
            {val: 'YmattZ', name: 'YmattZ A'},
            {val: 'Ymatt', name: 'YmattZ AB'},
            {val: 'Jessica', name: 'A Jessica'}
          ]
        },
        {
          label: "Search By Doctor Office", field: 'doctor_office_id', values: [
            {val: 'example_doctor_office_id', name: 'YmattZ A'},
            {val: 'YmattZ', name: 'YmattZ A'},
            {val: 'Ymatt', name: 'YmattZ AB'},
            {val: 'Jessica', name: 'A Jessica'}
          ]
        }
      ]
    },
    statusarray: [{val: 0, 'name': 'Pending'}, {val: 1, 'name': 'Approved'}, {val: 2, 'name': 'Canceled'}]
  };

  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };

  public allResolveData: any = {};
  public htmlText: any = {
    headerText: "Patient Report Record"
  }
  public authData: any = {};
  public dialogRef: any;

  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction, public dialog: MatDialog, public snackBar: MatSnackBar) {

    let allData: any = cookie.getAll();
    this.authData["userData"] = JSON.parse(allData.user_details);

    this.authData["jwtToken"] = cookie.get('jwtToken');

    if (this.cookie.check('jwtToken')) {
      this.configData.jwtToken = this.cookie.get('jwtToken');

      this.activatedRoute.data.forEach((data) => {
        this.configData.responseData = data.bookedEventList.data;
      });

      // Merge logged in user details with the config data
      // let userDetails: any = JSON.parse(this.cookie.get('user_details'));
      // this.configData = Object.assign(this.configData, userDetails);
    } else {
      this.openSnackBar("Token not found", null);
    }
  }

  ngOnInit() {
    if (this.cookie.check('jwtToken')) {
      this.configData.jwtToken = this.cookie.get('jwtToken');
      this.activatedRoute.data.forEach((data) => {
        this.configData.responseData = data.bookedEventList.results.res;

        this.configData.skipFields = Object.keys(data.bookedEventList.results.res[0]);
        let requiredFields = ['patient_name', 'closeremail', 'useremail', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName'];
        for (let i = 0; i < requiredFields.length; i++) {
          this.configData.skipFields.splice(this.configData.skipFields.indexOf(requiredFields[i]), 1)
        }

      });

      // Merge logged in user details with the config data
      let userDetails: any = JSON.parse(this.cookie.get('user_details'));
      this.configData = Object.assign(this.configData, userDetails);

      let data = {
        source: 'google-events',
        condition: {},
        sort: {type: 'asc', field: 'patient_name'}
      };
      // this.httpRequest.postRequest(this.configData.endPoint.listBookedEvents, data).subscribe((response: any) => {
      //   this.configData.responseData = response.data;
      //   this.configData.skipFields = Object.keys(response.data[0]);
      //   let requiredFields = ['patient_name', 'closeremail', 'useremail', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName'];
      //   for (let i = 0; i < requiredFields.length; i++) {
      //     this.configData.skipFields.splice(this.configData.skipFields.indexOf(requiredFields[i]), 1)
      //   }
      // });
      this.httpService.postRequest(this.configData.endPoint.listBookedEventsCount, data).subscribe((response: any) => {
        this.configData.date_search_source_count = response.count;
      });


    } else {
      this.openSnackBar('Token not found', null);
    }
    console.log('this.configData', this.configData);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
