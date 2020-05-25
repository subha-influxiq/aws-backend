import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpServiceService} from "../../../services/http-service.service";

@Component({
  selector: 'app-upcoming-appoinments',
  templateUrl: './upcoming-appoinments.component.html',
  styleUrls: ['./upcoming-appoinments.component.css']
})
export class UpcomingAppoinmentsComponent implements OnInit {

  public searchByDoctor: any = {label: "Search By Doctor", field: 'doctor_id', values: []};

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
      // listBookedEvents: 'list-booked-events',
      // listBookedEventsCount: 'list-booked-events-count',
      listUpcomingBookedEvents: 'list-upcoming-booked-events',
      listUpcomingBookedEventsCount: 'list-upcoming-booked-events-count',
      deleteBookedEvent: 'delete-booked-event',
      rescheduleBookedEvent: 'reschedule',
      getTokenInfo: 'getauthorization-pece-getuserdata'
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
      {text: "Admin Meetings", value: 1}
    ],
    responseData: [],
    // primaryCondition: {$or: [{event_type: 1}, {event_type: 2}]},
    primaryCondition: {userid: {$in: JSON.parse(this.cookie.get('user_details')).tech_id}},


    // lib-listing inputs
    skipFields: [],
    modify_header_array: {
      patient_name: 'Patient Name',
      doctor_name: 'Doctor Name',
      booking_date: 'Booked On',
      startdate: 'Event Date',
      slot: "Start Time",
      slot_end_time: 'End Time',
      timezoneName: 'Timezone',
      status: 'Status',
      // doctors_office_name: 'Doctors office name',
      username: 'Tech Name'
    },
    source: 'google_events',
    date_search_source_count: 0,
    libdata: {
      basecondition: {},
      detailview_override: [],
      updateendpoint: 'statusupdate',
      hidedeletebutton: true,
      hideeditbutton: true,// all these button options are optional not mandatory
      tableheaders: ['patient_name', 'doctor_name', 'username', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName', 'status'], //not required
      custombuttons: [
        {
          label: "Cancel", type: 'action', datatype: 'api',
          endpoint: 'delete-booked-event', otherparam: [],
          // cond:'status', condval:0,
          param: '_id', refreshdata: true,
        },
        {
          label: "Reschedule",
          route: "doctor-office/reschedule-appointment",
          type: 'internallink',
          //cond:'status',
          //condval:0,
          param: ['_id', 'doctor_id'],
        }
      ]
    },
    updatetable: false,
    limitcond: {
      "limit": 10,
      "skip": 0,
      "pagecount": 1
    },
    sortdata: {
      "type": 'asc',
      "field": 'booking_date',
      "options": ['patient_name', 'booking_date', 'startdate', 'slot', 'slot_end_time']
    },
    custom_link: [],
    search_settings: {
      // this is use for  date search
      datesearch: [{
        startdatelabel: "Events After",
        enddatelabel: "Events Before",
        submit: "Search",
        field: "startdate_unix"
      }],

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
        // {
        //   label: "Search By Doctor", field: 'doctor_id', values: [
        //     {val: 'example_doctor_id', name: 'YmattZ A'},
        //     {val: 'YmattZ', name: 'YmattZ A'},
        //     {val: 'Ymatt', name: 'YmattZ AB'},
        //     {val: 'Jessica', name: 'A Jessica'}
        //   ]
        // },
        this.searchByDoctor
      ]
    },
    statusarray: [{val: 0, 'name': 'Pending'}, {val: 1, 'name': 'Approved'}, {val: 2, 'name': 'Canceled'}],
    detail_skip_array: ['_id']
  };

  constructor(public cookie: CookieService, public snackBar: MatSnackBar,
              public httpService: HttpServiceService) { }

  ngOnInit() {
    // load doctor search dynamically
    this.httpService.postRequest('get-doctor-info', {condition: {doctors_office_id: JSON.parse(this.cookie.get('user_details'))._id}}).subscribe((response: any) => {
      for (let i=0; i<response.data.length; i++) {
        let temp: any = {};
        temp['val'] = response.data[i]._id;
        temp['name']= response.data[i].firstname + ' ' + response.data[i].lastname;
        this.searchByDoctor.values.push(temp);
      }
    })


    if (this.cookie.check('jwtToken')) {
      this.configData.jwtToken = this.cookie.get('jwtToken');
      let data: any = {
        token: this.configData.jwtToken,
        condition: {},
        sort: {type: 'asc', field: 'booking_date'}
      }
      /* Create condition with respect to the user_type */
      if (this.cookie.check('user_details')) {
        switch (JSON.parse(this.cookie.get('user_details')).user_type) {
          case 'admin':
            // do nothing. all records will be loaded...
            break;

          case 'doctor_office':
            data.condition = Object.assign(
              data.condition, {doctors_office_id: JSON.parse(this.cookie.get('user_details'))._id}
            );

            // store the basecondition for the lib-listing
            this.configData.libdata.basecondition = {
              doctors_office_id: JSON.parse(this.cookie.get('user_details'))._id
            }
            break;

          case 'doctor':
            data.condition = Object.assign(
              data.condition, {doctor_id: JSON.parse(this.cookie.get('user_details'))._id}
            );

            // store the basecondition for the lib-listing
            this.configData.libdata.basecondition = {
              doctor_id: JSON.parse(this.cookie.get('user_details'))._id
            }
            break;

          default: // for tech
            data.condition = Object.assign(
              data.condition, {userid: {$in: [JSON.parse(this.cookie.get('user_details'))._id]}}
            );
            // store the basecondition for the lib-listing
            this.configData.libdata.basecondition = {
              userid: {$in: [JSON.parse(this.cookie.get('user_details'))._id]}
            }
            break;
        }
      }

      this.httpService.postRequest(this.configData.endPoint.listUpcomingBookedEvents, data).subscribe((response: any) => {
        // Set dataset in responseData
        this.configData.responseData = response.results.res;

        // Create skipFields array(first save all the keys from the dataset)
        if (response.results.res > 0)
          this.configData.skipFields = Object.keys(response.results.res[0]);
        let requiredFields = ['patient_name', 'doctor_name', 'username', 'booking_date', 'startdate', 'slot', 'slot_end_time', 'timezoneName', 'status'];
        // Modify the skipFields array(splicing the keys which is in the requiredFields)
        for (let i = 0; i < requiredFields.length; i++) {
          this.configData.skipFields.splice(this.configData.skipFields.indexOf(requiredFields[i]), 1)
        }
      });

      // Merge logged in user details with the config data
      // let userDetails: any = JSON.parse(this.cookie.get('user_details'));
      // this.configData = Object.assign(this.configData, userDetails);

      /* ****************** Get total booked events count ****************** */
      this.httpService.postRequest(this.configData.endPoint.listUpcomingBookedEventsCount, data).subscribe((response: any) => {
        this.configData.date_search_source_count = response.count;
      });
      /* ******************************************************************* */

    } else {
      this.openSnackBar('Token not found', null);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
