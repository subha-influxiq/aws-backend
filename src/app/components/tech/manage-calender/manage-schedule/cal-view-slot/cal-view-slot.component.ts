import { HttpServiceService } from '../../../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cal-view-slot',
  templateUrl: './cal-view-slot.component.html',
  styleUrls: ['./cal-view-slot.component.css']
})
export class CalViewSlotComponent implements OnInit {

  public configData: any = {
    appName: 'Calendar-Management',
    jwtToken: '',
    baseUrl: environment.apiBaseUrl,
    endPoint: {
      add: 'cal-add-or-update-event-data',
      datalist: 'cal-datalist',
      deleteEvent: 'cal-delete-single-event',
      viewEventSlots: 'view-event-eventdayarr',
      search: 'cal-search',
      countSlot: 'cal-count-slot',
      addToCalendar: 'cal-add-to-calendar'
    },
    urls: {
      view: "tech/manage-calender/manage-sehedule/",
      viewSlotUser: "tech/manage-calender/manage-sehedule/view-slot-user",
      eventListing: "tech/manage-calender/manage-sehedule/event-listing",
      add: "tech/manage-calender/manage-sehedule/create-slot",
      edit: "",
      googleSync: environment.googleSyncApi
    },
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

    patientInfoFormFields: [
      {type: 'input', name: 'practice_name', placeholder: 'Practice Name', label: 'Practice Name', value: '', validators: [Validators.required], error: "Enter practice name"},
      {type: 'input', name: 'address', placeholder: 'Address', label: 'Address', value: ''},
      {type: 'input', name: 'patient_name', placeholder: 'Patient Name', label: 'Patient Name', value: '', validators: [Validators.required], error: "Enter patient name"},
      {type: 'date', name: 'dob', placeholder: 'Date of Birth', label: 'Date of Birth', value: '', validators: [Validators.required], error: "Enter date of birth of the patient"},
      {
        type: 'select', name: 'gender', placeholder: 'Gender', label: 'Gender',
        options: [
          {text: 'Male', value: 'male'},
          {text: 'Female', value: 'female'}
        ],
        validators: [Validators.required], error: "Select gender"
      },
      {type: 'input', name: 'patient_email', placeholder: 'Patient Email', label: 'Patient Email', value: '', validators: [Validators.required, Validators.email], error: "Enter patient email"},
      {type: 'input', name: 'current_date', placeholder: 'Date', label: 'Booking date', value: ''},
      {type: 'input', name: 'height', placeholder: 'Ex. 6\'10"', label: 'Height', value: '', validators: [Validators.required], error: "Enter patient height"},
      {type: 'input', name: 'weight', placeholder: 'Ex. 210 lbs', label: 'Weight', value: '', validators: [Validators.required], error: "Enter patient weight"},
      {
        type: 'checkbox', caption: 'Autonomic Nervous System Dysfunction (ANSD)',
        label: 'Blurred Vision',
        checkItems: [
          {name: 'bv_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'bv_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Elevated Blood Sugar',
        checkItems: [
          {name: 'ebs_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'ebs_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Extreme Thirst',
        checkItems: [
          {name: 'et_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'et_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Frequent Urination',
        checkItems: [
          {name: 'fu_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'fu_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Fatigue (Tiredness)',
        checkItems: [
          {name: 'ft_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'ft_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Heartburn',
        checkItems: [
          {name: 'hb_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'hb_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Increased Hunger',
        checkItems: [
          {name: 'ih_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'ih_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Nausea',
        checkItems: [
          {name: 'nau_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'nau_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Numbness & Tingling in Hands or Feet',
        checkItems: [
          {name: 'nthf_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'nthf_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
      {
        type: 'checkbox', label: 'Vomiting',
        checkItems: [
          {name: 'vomiting_six_months', value: false, label: '6 Months', labelPosition: 'before'},
          {name: 'vomiting_today', value: false, label: 'Today', labelPosition: 'before'}
        ]
      },
    ],

    calendarInfoFormFields: [
      {type: 'input', name: 'event_title', placeholder: 'Event Title', label: 'Event Title', value: ''},
      {type: 'input', name: 'description', placeholder: 'Event Description', label: 'Event Description', value: ''},
      {type: 'input', name: 'startdate', placeholder: 'Date of Appointment', label: 'Date of Appointment', value: ''},
      {type: 'input', name: 'slot', placeholder: 'Time of Appointment', label: 'Time of Appointment', value: ''},
      {
        type: 'select', name: 'reqTimezone',
        options: [
          {text: 'Alaska Standard Time', value: '-08:00|America/Anchorage'},
          {text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles'},
          {text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver'},
          {text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix'},
          {text: 'Central Standard Time', value: '-05:00|America/Chicago'},
          {text: 'Eastern Standard Time', value: '-04:00|America/New_York'},
          {text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu'}
        ],
        value: '-05:00|America/Chicago'
      },
      {type: 'input', name: 'username', placeholder: 'Organizer Name', label: 'Organizer Name', value: ''},
      {type: 'input', name: 'useremail', placeholder: 'Organizer Email', label: 'Organizer Email', value: ''},
      {type: 'input', name: 'attendees', placeholder: 'Attendee Email', label: 'Attendee Email', value: ''},
      {type: 'input', name: 'additional_notes', placeholder: 'Additional Notes', label: 'Additional Notes', value: ''}
    ]
  };

  constructor(public activatedRoute: ActivatedRoute, public cookieService: CookieService,
              public snackBar: MatSnackBar, public httpRequestService: HttpServiceService) {
  }

  ngOnInit() {
    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      this.activatedRoute.data.forEach((data) => {
        this.configData.responseData = data.eventdayarrData.data;
        console.log('responseData', this.configData.responseData);
      });
    } else {
      this.openSnackBar('Token not found');
    }

    /******* Get user details from cookies ******/
    let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
    this.configData = Object.assign(this.configData, userDetails);
    // this.configData.refresh_token = userDetails.refresh_token;
    // this.configData.access_token = userDetails.access_token;

    this.updateUser();
  }


  updateUser() {
    let userDetails:any = JSON.parse(this.cookieService.get('user_details'));
    if (this.activatedRoute.snapshot.params.refresh && this.cookieService.check('user_details')) {
      let data = {
        token: this.cookieService.get('jwtToken'),
        id: userDetails._id,
        data: {
          access_token: this.activatedRoute.snapshot.params.access_t,
          refresh_token: this.activatedRoute.snapshot.params.refresh
        }
      }
      this.httpRequestService.postRequest('update-user', data).subscribe((response) => {
        console.log('response',response);
      });
    }
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
