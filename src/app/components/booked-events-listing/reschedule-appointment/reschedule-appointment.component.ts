import { Component, OnInit } from '@angular/core';
import moment from "moment-es6";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpServiceService} from "../../../services/http-service.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {
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
    primaryCondition: {},
  }

  public availableSlots: any = [];

  public progressSpinner: any = {
    mode: 'indeterminate',
    loading: true,
    bookingStatus: 'Finding available slots'
  };

  /* Search fields */
  public filterOptions: any = {
    availableDates: '',
    eventType: '',
    timezone: ''
  };

  today = new Date();

  public loading: boolean;

  public searchData: any;

  /* Variable for pagination */
  public page: any = {
    start: 1,
    end: 20,
    page_count: 20,
    page_no: 1,
    total_record: 0
  };
  public itemCount: any = 20;
  public arrPage: any = [];
  public jumpToPageNumber: any = 0;

  public bookingDetails: any;

  constructor(public snackBar: MatSnackBar, public activatedRoute: ActivatedRoute,
              public httpRequest: HttpServiceService, public cookieService: CookieService,
              public router: Router) {

  }


  ngOnInit(): void {
    if (this.cookieService.check('jwtToken')) {
      if (this.cookieService.check('timezone')) {
        this.filterOptions.timezone = this.cookieService.get('timezone');
      } else {
        this.filterOptions.timezone = '-05:00|America/Chicago';
      }

      let booking_id: any = this.activatedRoute.snapshot.params._id;
      let doctor_id: any = this.activatedRoute.snapshot.params.doctor_id;

      this.configData.jwtToken = this.cookieService.get('jwtToken');
      let data = {
        token: this.configData.jwtToken,
        condition: {
          _id: booking_id
        },
        source: 'google_events'
      }
      this.httpRequest.postRequest('get-data', data).subscribe((response: any) => {
        this.bookingDetails = response.res[0];
      })

      let data2 = {
        token: this.configData.jwtToken,
        condition: {
          _id: doctor_id
        }
      }

      this.httpRequest.postRequest('get-tech-info', data2).subscribe((response: any) => {
        let arrTech = response.data.map(tech => tech._id);
        this.configData.primaryCondition = {userid: {$in: arrTech}}

        this.loadAvailableSlots();

        this.getPageCount();
      })
    }
    else {
      this.openSnackBar('Token not found', 'Ok')
    }
  }



  /*
   * getPageCount() count total number of records found in the collection
   */
  getPageCount() {
    let data: any;
    if (this.searchData == null) {
      data = {
        token: this.configData.jwtToken,
        condition: this.configData.primaryCondition //{$and:[{event_type: 1}]}
      };
    } else {
      data = this.searchData;
    }

    /* If the user is not an admin then load events that created by him/her only */
    // if (this.data.libConfigData.user_type != 'admin') {
    //   data.condition = Object.assign(data.condition, {userid: this.data.libConfigData._id});
    // }

    this.httpRequest.postRequest(this.configData.endPoint.countSlot, data).subscribe((response) => {
      if (response.status == 'success') {
        /* Update value of this.page */
        this.page.total_record = response.data;
        if (this.page.total_record < this.page.page_count) {
          this.page.end = this.page.total_record;
        } else {
          this.page.end = this.page.page_count;
        }

        /* Create page array */
        this.arrPage = [];
        for (let i = 0; i < this.page.total_record / this.page.page_count; i++) {
          this.arrPage.push(i + 1);
        }
      } else {
        // console.log(response);
      }
    });
  }

  /*
   * pageStep is the function to step forward and backward the page
   * Load next or previous n(page.page_count) items
   */
  pageStep(flag: string = null) {
    let data: any;

    if (flag == 'prev' && this.page.page_no > 1) {
      this.loading = true;
      data = {
        token: this.configData.jwtToken,
        skip: this.page.start - this.page.page_count - 1,
        limit: this.page.page_count,
        timezone: this.filterOptions.timezone,
        condition: this.configData.primaryCondition
      };
    }

    if (flag == 'next' && (this.page.end < this.page.total_record)) {
      this.loading = true;
      data = {
        token: this.configData.jwtToken,
        skip: this.page.end,
        limit: this.page.page_count,
        timezone: this.filterOptions.timezone,
        condition: this.configData.primaryCondition
      };
    }

    /*
     * If the data variable is uninitialized there is no need to execute the httpRequest
     */
    if (data != null) {
      /* If there has a search value then it must be include the search condition with data */
      if (this.searchData != null) {
        data.condition = this.searchData.condition;
      }

      /* If the user is not an admin then load events that created by him/her only */
      // if (this.configData.user_type != 'admin') {
      //   data.condition = Object.assign(data.condition, {userid: this.configData._id});
      // }

      this.httpRequest.postRequest(this.configData.endPoint.viewEventSlots, data).subscribe((response) => {
        if (response.status == 'success') {
          this.availableSlots = response.data;
          this.changePage(flag);
        } else {
          // console.log('response', response);
        }
        this.loading = false;
      });
    }
  }

  /*
   * Function for changing page variables along with the pageStep
   */
  changePage(cflag) {
    switch (cflag) {
      /* case 'next' will execute when pageStep('next') execute or on click of forward button */
      case 'next':
        this.page.page_no++;
        this.jumpToPageNumber++;
        this.page.start = this.page.start + this.page.page_count;
        if (this.page.end + this.page.page_count <= this.page.total_record) {
          this.page.end = this.page.end + this.page.page_count;
        } else {
          this.page.end = this.page.total_record;
        }
        break;

      /* case 'prev' will execute when pageStep('prev') execute or on click of backward button */
      case 'prev':
        this.page.page_no--;
        this.jumpToPageNumber--;
        this.page.end = this.page.start - 1;
        this.page.start = this.page.start - this.page.page_count;
        break;
    }
  }


  /*
   * Change the page count value and reload items with the changed value
   */
  onChangePageCount() {
    this.loading = true;
    let data: any = {
      token: this.configData.jwtToken,
      skip: 0,
      limit: parseInt(this.itemCount),
      timezone: this.filterOptions.timezone,
      condition: {}
    };
    /* If there has a search value then it must be include the search condition with data */
    if (this.searchData != null) {
      data.condition = this.searchData.condition;
    } else {
      data.condition.$and = this.configData.primaryCondition.$and;
    }

    /* If the user is not an admin then load events that created by him/her only */
    // if (this.configData.user_type != 'admin') {
    //   data.condition = Object.assign(data.condition, {userid: this.data.libConfigData._id});
    // }

    this.httpRequest.postRequest(this.configData.endPoint.viewEventSlots, data).subscribe((response) => {
      if (response.status == 'success') {
        // this.ngOnInit();
        this.availableSlots = response.data;
        this.page.start = 1;
        if (parseInt(this.itemCount) < this.page.total_record) {
          this.page.end = parseInt(this.itemCount);
        } else {
          this.page.end = this.page.total_record;
        }
        this.page.page_count = parseInt(this.itemCount);
        this.page.page_no = 1;
        this.jumpToPageNumber = 0;

        /* Create page array */
        this.arrPage = [];
        for (let i = 0; i <= this.page.total_record / this.page.page_count; i++) {
          this.arrPage.push(i + 1);
        }
      } else {
        console.log('response', response);
      }
      this.loading = false;
    });
  }


  /*
   * jumpToPage() directly take into the page that calculates for the current page_count
   */
  jumpToPage() {
    this.loading = true;
    let data: any = {
      token: this.configData.jwtToken,
      skip: this.page.page_count * this.jumpToPageNumber,
      limit: this.page.page_count,
      timezone: this.filterOptions.timezone,
      condition: {}
    };
    /* If there has a search value then it must be include the search condition with data */
    if (this.searchData != null) {
      data.condition = this.searchData.condition;
    }
    data.condition.$and = this.configData.primaryCondition.$and;


    /* If the user is not an admin then load events that created by him/her only */
    // if (this.configData.user_type != 'admin') {
    //   data.condition = Object.assign(data.condition, {userid: this.data.libConfigData._id});
    // }

    this.httpRequest.postRequest(this.configData.endPoint.viewEventSlots, data).subscribe((response) => {
      if (response.status == 'success') {
        this.availableSlots = response.data;

        this.page.page_no = this.jumpToPageNumber + 1;
        this.page.start = (this.page.page_count * this.jumpToPageNumber) + 1;
        if ((this.page.page_count * this.jumpToPageNumber) + this.page.page_count < this.page.total_record) {
          this.page.end = (this.page.page_count * this.jumpToPageNumber) + this.page.page_count;
        } else {
          this.page.end = this.page.total_record;
        }
      } else {
        // console.log('response', response);
      }
      this.loading = false;
    });
  }


  search() {
    // const primaryCondition = this.data.libConfigData.primaryCondition;
    //let searchd:any=this.data.libConfigData.primaryCondition;
    this.searchData = {
      condition: {},
      token: this.configData.jwtToken,
      timezone: this.filterOptions.timezone
    };
    if (this.searchData.condition.$and == null) {
      this.searchData.condition.$and = [];
    }
    if (this.filterOptions.availableDates != '') {
      this.searchData.condition.$and.push({start_datetime_unix: {$gte: moment(this.filterOptions.availableDates.begin).subtract(12, 'hours').valueOf()}});
      this.searchData.condition.$and.push({start_datetime_unix: {$lte: moment(this.filterOptions.availableDates.end).add(12, 'hours').valueOf()}});

      // data.condition.end_date = {
      //   $lte: moment(this.availableDates.end).format('L')
      // };
    }
    this.searchData.condition.$and = this.searchData.condition.$and.concat(this.configData.primaryCondition);


    /* if (this.filterOptions.eventType != '') {
      this.searchData.condition.event_type = this.filterOptions.eventType;
    } */


    /* If the user is not an admin then load events that created by him/her only */
    // if (this.data.libConfigData.user_type != 'admin') {
    //   this.searchData.condition = Object.assign(this.searchData.condition, {userid: this.data.libConfigData._id});
    // }


    this.loading = true;
    this.httpRequest.postRequest(this.configData.endPoint.viewEventSlots, this.searchData).subscribe((response) => {
      if (response.data.length == 0) {
        this.openSnackBar('No event found', null);
      }
      if (response.status == 'success') {
        this.page.start = 1;
        if (response.data.length > this.page.page_count) {
          this.page.end = this.page.page_count;
        } else {
          this.page.end = response.data.length;
        }
        this.page.page_no = 1;
        this.jumpToPageNumber = 0;
      }
      this.availableSlots = response.data;
      this.loading = false;
    });

    this.getPageCount();
  }


  /*
   * resetFilter() reset the search fields and reloads data without any condition
   */
  resetFilter() {
    this.loading = true;

    /* Reset searchData value to 'null' and filterOptions value to blank('')*/
    this.searchData = null;
    this.filterOptions.availableDates = '';
    this.filterOptions.eventType = '';

    /* Create data object */
    let data: any = {
      token: this.configData.jwtToken,
      skip: 0,
      limit: this.page.page_count,
      timezone: this.filterOptions.timezone,
      condition: this.configData.primaryCondition
    };


    /* If the user is not an admin then load events that created by him/her only */
    // if (this.data.libConfigData.user_type != 'admin') {
    //   data.condition = Object.assign(data.condition, {userid: this.data.libConfigData._id});
    // }

    this.httpRequest.postRequest(this.configData.endPoint.viewEventSlots, data).subscribe((response) => {
      if (response.status == 'success') {
        this.page.start = 1;
        if (response.data.length > this.page.page_count) {
          this.page.end = this.page.page_count;
        } else {
          this.page.end = response.data.length;
        }
        this.page.page_no = 1;
        this.jumpToPageNumber = 0;
        this.availableSlots = response.data;
        this.loading = false;
      } else {
        this.openSnackBar('Something went wrong. Please try again.', null);
      }
    });

    this.getPageCount();
  }


  onChangeTimezone(event: any) {
    this.loading = true;
    this.cookieService.set('timezone', this.filterOptions.timezone);

    /* Create data object */
    let data: any = {
      token: this.configData.jwtToken,
      skip: this.page.start - 1,
      limit: this.page.page_count,
      timezone: this.filterOptions.timezone,
      condition: this.configData.primaryCondition
    };

    /* If there has a search value then it must be include the search condition with data */
    if (this.searchData != null) {
      data.condition = this.searchData.condition;
    }

    /* If the user is not an admin then load events that created by him/her only */
    // if (this.data.libConfigData.user_type != 'admin') {
    //   data.condition = Object.assign(data.condition, {userid: this.data.libConfigData._id});
    // }

    this.httpRequest.postRequest(this.configData.endPoint.viewEventSlots, data).subscribe((response) => {
      if (response.status == 'success') {
        this.availableSlots = response.data;
        this.loading = false;
      } else {
        this.openSnackBar('Something went wrong. Please try again.', null);
      }
    });
  }


  loadAvailableSlots() {
    /* ********************* Loader ****************** */
    this.progressSpinner.loading = true;
    let dot = ['.', '. .', '. . .'];
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        if (this.progressSpinner.loading) {
          this.progressSpinner.bookingStatus = 'Finding available slots ' + dot[i % 3];
        }
      }, 500 * (i + 1));
    }
    /* *********************************************** */

    /* Create data object */
    let data: any = {
      token: this.configData.jwtToken,
      timezone: this.filterOptions.timezone,
      condition: this.configData.primaryCondition
    };


    /* If the user is not an admin then load events that created by him/her only */
    // if (this.data.libConfigData.user_type != 'admin') {
    //   data.condition = Object.assign(data.condition, {useremail: this.data.libConfigData.email});
    // }

    this.httpRequest.postRequest(this.configData.endPoint.viewEventSlots, data).subscribe((response) => {
      if (response.status == 'success') {
        // console.log('response', response);
        this.availableSlots = response.data;
        this.progressSpinner.loading = false;
      } else {
        this.openSnackBar('Something went wrong. Please try again.', null);
      }
    });
  }


  rebook(item) {

    let data: any = {
      booked_slot_data: this.bookingDetails,
      reschedule_slot_data: item
    }


    /* ****************** Reschedule in google calendar ****************** */
    if (this.bookingDetails.googleevent != undefined) {
      let url = 'https://gapi.betoparedes.com/updateevent.php?event=' +
        this.bookingDetails.googleevent + '&refresh_token=' + this.bookingDetails.refresh_token +
        '&summary=' + item.event_title + '&start=' + item.startDateTime + '&end=' + item.endDateTime;
      this.httpRequest.get(url).subscribe((response) => {
        console.log('response from google', response);

      });
    }

    /* ****************** Reschedule in database ****************** */
    this.httpRequest.postRequest(this.configData.endPoint.rescheduleBookedEvent, data).subscribe((response) => {
      if (response.status == 'success') {
        console.log('response', response);
        this.progressSpinner.loading = false;
        // this.dialogRef.close(true);
        this.openSnackBar('Rescheduled successfully', 'Ok')
        this.router.navigateByUrl('doctor-office/dashboard');
      } else {
        this.openSnackBar('Something went wrong. Please try again.', null);
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
