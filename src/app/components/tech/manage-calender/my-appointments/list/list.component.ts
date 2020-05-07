import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public configData: any = {
    appName: 'Calendar-Management',
    jwtToken: "",
    baseUrl: environment.calendarApi,
    endPoint: {
      add: "add-or-update-event-data",
      datalist: "datalist",
      deleteEvent: "delete-single-event",
      viewEventSlots: "view-event-eventdayarr",
      search: "search",
      countSlot: "count-slot",
      listBookedEvents: "list-booked-events",
      deleteBookedEvent: "delete-booked-event",
      rescheduleBookedEvent: "reschedule"
    },
    urls: [],
    timeZone: [
      {text: 'Alaska Standard Time', value: '-08:00|America/Anchorage'},
      {text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles'},
      {text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver'},
      {text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix'},
      {text: 'Central Standard Time', value: '-05:00|America/Chicago'},
      {text: 'Eastern Standard Time', value: '-04:00|America/New_York'},
      {text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu'}
    ],
    eventType: [
      {text: 'Admin Meetings', value: 1},
      {text: 'Type 2', value: 2},
      {text: 'Type 3', value: 3},
      {text: 'Type 3', value: 4}
    ],
    responseData: '',
    primaryCondition: {$or: [{event_type: 1}, {event_type: 2}]},

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
      updateendpoint:'statusupdate',
      hideeditbutton:true,// all these button options are optional not mandatory
      tableheaders:['patient_name', 'closeremail', 'useremail', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName'], //not required
      custombuttons:[]
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
      datesearch: [{startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at"}],

      // this is use for  select search
      selectsearch: [{
        label: 'Search By Status',
        field: 'status',
        values: [{val: 1, 'name': 'Active'}, {val: 0, 'name': 'Inactive'}]
      }],

      // this is use for  text search
      textsearch: [{label: "Search By Title", field: 'blogtitle_search'}, {
        label: "Search by auther",
        field: "author_search"
      }],

      // this is use for  Autocomplete search
      search: [{
        label: "Search By Author", field: 'author_search', values: [
          {val: 'YmattZ', 'name': 'YmattZ A'},
          {val: 'YmattZ', 'name': 'YmattZ A'},
          {val: 'Ymatt', 'name': 'YmattZ AB'},
          {val: 'Jessica', 'name': 'A Jessica'}
        ]
      }]
    },
    statusarray: [{val: 1, name: 'Approve'}, {val: 4, name: 'Decline'}, {val: 3, name: 'Lock'}]
  };

  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      this.activatedRoute.data.forEach((data) => {
        this.configData.responseData = data.bookedEventList.data;

        this.configData.skipFields = Object.keys(data.bookedEventList.data[0]);
        let requiredFields = ['patient_name', 'closeremail', 'useremail', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName'];
        for (let i = 0; i < requiredFields.length; i++) {
          this.configData.skipFields.splice(this.configData.skipFields.indexOf(requiredFields[i]), 1)
        }

      });
      // Merge logged in user details with the config data
      let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
      this.configData = Object.assign(this.configData, userDetails);


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