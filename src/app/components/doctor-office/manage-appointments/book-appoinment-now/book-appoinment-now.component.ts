import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import moment from 'moment-es6';

@Component({
  selector: 'app-book-appoinment-now',
  templateUrl: './book-appoinment-now.component.html',
  styleUrls: ['./book-appoinment-now.component.css']
})
export class BookAppoinmentNowComponent implements OnInit {

  today = moment().format('L');
  states: any = [];

  public configData: any = {
    appName: 'Calendar-Management',
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
      { text: 'Admin Meetings', value: 1 }
    ],
    responseData: '',
    patientInfoFormFields: {},
    calendarInfoFormFields: {},
    primaryCondition: { $or: [{ event_type: 1 }] },
  };


  constructor(public activatedRoute: ActivatedRoute, public cookieService: CookieService,
    public snackBar: MatSnackBar, public httpRequestService: HttpServiceService) {
  }


  ngOnInit() {

    this.getStates();

    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      this.activatedRoute.data.forEach((data) => {
        this.configData.responseData = data.eventdayarrData.data;
      });
    } else {
      this.openSnackBar('Token not found');
    }

    /******* Get user details from cookies ******/
    let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
    console.log(">>>", userDetails);
    this.configData = Object.assign(this.configData, userDetails);

    this.configData.primaryCondition = Object.assign(this.configData.primaryCondition, { userid: { $in: userDetails.tech_id } });

    this.updateUser();
  }


  updateUser() {
    let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
    if (this.activatedRoute.snapshot.params.refresh && this.cookieService.check('user_details')) {
      let data = {
        token: this.cookieService.get('jwtToken'),
        id: userDetails._id,
        data: {
          access_token: this.activatedRoute.snapshot.params.access_t,
          refresh_token: this.activatedRoute.snapshot.params.refresh
        }
      };
      this.httpRequestService.httpViaPost('update-user', data).subscribe((response) => {
        console.log('response', response);
      });

      // Update user_details in cookie
      this.cookieService.set('user_details', JSON.stringify(Object.assign(userDetails, data.data)));
    }
  }

  getStates(): any {
    /* ****************** Get states value from assets/states.json ****************** */
    this.httpRequestService.get('assets/data/states.json')
      .subscribe(res => {
        this.states = res;

        let patientInfoFormFields = [
          {
            type: 'input',
            name: 'practice_name',
            placeholder: 'Practice Name',
            label: 'Practice Name',
            value: '',
            validators: [Validators.required],
            error: 'Enter practice name',
            caption: 'Patient General Information'
          },
          { type: 'input', name: 'address', placeholder: 'Address', label: 'Address', value: '' },
          // {type: 'input', name: 'state', placeholder: 'State', label: 'State', value: ''},
          {
            type: 'select', name: 'state', placeholder: 'Select State', label: 'State',
            options: this.states,
            validators: [Validators.required], error: 'Select state'
          },
          { type: 'input', name: 'city', placeholder: 'City', label: 'City', value: '' },
          { type: 'input', name: 'zip', placeholder: 'ZIP', label: 'ZIP', value: '' },
          {
            type: 'input',
            name: 'patient_name',
            placeholder: 'Patient Name',
            label: 'Patient Name',
            value: '',
            validators: [Validators.required],
            error: 'Enter patient name'
          },
          {
            type: 'date',
            name: 'dob',
            placeholder: 'Date of Birth',
            label: 'Date of Birth',
            value: '',
            validators: [Validators.required],
            error: 'Enter date of birth of the patient'
          },
          {
            type: 'select', name: 'gender', placeholder: 'Gender', label: 'Gender',
            options: [
              { text: 'Male', value: 'male' },
              { text: 'Female', value: 'female' }
            ],
            validators: [Validators.required], error: 'Select gender'
          },
          {
            type: 'input',
            name: 'patient_email',
            placeholder: 'Patient Email',
            label: 'Patient Email',
            value: '',
            validators: [Validators.required, Validators.email],
            error: 'Enter patient email'
          },
          {
            type: 'input',
            name: 'height',
            placeholder: 'Ex. 6\'10"',
            label: 'Height',
            value: '',
            validators: [Validators.required],
            error: 'Enter patient height'
          },
          {
            type: 'input',
            name: 'weight',
            placeholder: 'Ex. 210 lbs',
            label: 'Weight',
            value: '',
            validators: [Validators.required],
            error: 'Enter patient weight'
          },
          { type: 'input', name: 'booking_date', placeholder: 'Date', label: 'Booking date', value: this.today, disabled: true },

          {
            type: 'checkbox', caption: 'Other Details',
            label: 'Patient has diabetics',
            checkItems: [
              { name: 'has_diabetics', value: false, label: '', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Patient has PVT(Peripheral Vascular Disease)',
            checkItems: [
              { name: 'has_pvt', value: false, label: '', labelPosition: 'before' }
            ]
          },

          {
            type: 'checkbox', caption: 'Autonomic Nervous System Dysfunction (ANSD)',
            label: 'Blurred Vision',
            checkItems: [
              { name: 'bv_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'bv_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Elevated Blood Sugar',
            checkItems: [
              { name: 'ebs_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ebs_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Extreme Thirst',
            checkItems: [
              { name: 'et_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'et_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Frequent Urination',
            checkItems: [
              { name: 'fu_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'fu_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Fatigue (Tiredness)',
            checkItems: [
              { name: 'ft_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ft_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Heartburn',
            checkItems: [
              { name: 'hb_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'hb_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Increased Hunger',
            checkItems: [
              { name: 'ih_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ih_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Nausea',
            checkItems: [
              { name: 'nau_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'nau_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Numbness & Tingling in Hands or Feet',
            checkItems: [
              { name: 'nthf_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'nthf_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Vomiting',
            checkItems: [
              { name: 'vomiting_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'vomiting_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', caption: 'Sudomotor Dysfunction (SUDOD)',
            label: 'Burning Sensations',
            checkItems: [
              { name: 'bs_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'bs_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Difficulty Digesting Food',
            checkItems: [
              { name: 'ddf_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ddf_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Dizziness or Fainting',
            checkItems: [
              { name: 'dof_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'dof_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Exercise Intolerance',
            checkItems: [
              { name: 'ei_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ei_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Sexual Difficulties',
            checkItems: [
              { name: 'sd_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'sd_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Sweat Abnormalities',
            checkItems: [
              { name: 'sa_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'sa_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Tingling Hands & Feet',
            checkItems: [
              { name: 'thf_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'thf_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Urinary Problems',
            checkItems: [
              { name: 'up_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'up_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', caption: 'ENDOTHELIAL DYSFUNCTION (ENDOD)',
            label: 'Angina (severe chest pain, often spreading to shoulder, arm, back, neck, or jaw)',
            checkItems: [
              { name: 'angina_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'angina_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Chest Pain that goes away with rest',
            checkItems: [
              { name: 'cptgawr_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'cptgawr_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Heartburn',
            checkItems: [
              { name: 'hrtbn_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'hrtbn_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Pain In Calves',
            checkItems: [
              { name: 'pic_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'pic_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Shortness of Breath',
            checkItems: [
              { name: 'sob_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'sob_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Stroke',
            checkItems: [
              { name: 'stroke_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'stroke_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'TIA (mini stroke)',
            checkItems: [
              { name: 'tia_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'tia_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', caption: 'CARDIOMETABOLIC RISK (CMR)',
            label: 'Headaches',
            checkItems: [
              { name: 'headaches_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'headaches_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Dizziness',
            checkItems: [
              { name: 'dizziness_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'dizziness_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Swelling of Ankles',
            checkItems: [
              { name: 'soa_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'soa_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', caption: 'INSULIN RESISTANCE (IR)',
            label: 'Blurred Vision',
            checkItems: [
              { name: 'blv_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'blv_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Elevated Blood Sugar',
            checkItems: [
              { name: 'ebsr_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ebsr_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Extreme Thirst',
            checkItems: [
              { name: 'ext_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ext_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Fatigue (Tiredness)',
            checkItems: [
              { name: 'ftd_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ftd_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Increased Hunger',
            checkItems: [
              { name: 'ihr_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ihr_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', caption: 'SMALL FIBER SENSORY NEUROPATHY (SFN)',
            label: 'Burning Sensations',
            checkItems: [
              { name: 'burns_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'burns_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Painful Contact With Socks or Bed Sheets',
            checkItems: [
              { name: 'pcwsbs_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'pcwsbs_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Pebble or Sandlike Sensation In Shoes',
            checkItems: [
              { name: 'psss_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'psss_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Stabbing or Electrical Shock Sensation',
            checkItems: [
              { name: 'sess_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'sess_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Pins And Needles Sensation In Feet',
            checkItems: [
              { name: 'pnsf_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'pnsf_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', caption: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)',
            label: 'Blurred Vision',
            checkItems: [
              { name: 'bldv_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'bldv_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Cold, Clammy, Pale Skin',
            checkItems: [
              { name: 'ccps_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'ccps_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Depression',
            checkItems: [
              { name: 'depression_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'depression_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Dizziness or Lightheadedness',
            checkItems: [
              { name: 'dol_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'dol_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Thirst',
            checkItems: [
              { name: 'thirst_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'thirst_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Fainting',
            checkItems: [
              { name: 'fainting_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'fainting_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Fatigue (Tiredness)',
            checkItems: [
              { name: 'fatt_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'fatt_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Lack of Concentration',
            checkItems: [
              { name: 'loc_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'loc_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Lack of Energy',
            checkItems: [
              { name: 'loe_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'loe_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Nausea',
            checkItems: [
              { name: 'nausea_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'nausea_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Rapid, Shallow Breathing',
            checkItems: [
              { name: 'rsb_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'rsb_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', caption: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)',
            label: 'Blood clot in a vein (Venous Thrombosis)',
            checkItems: [
              { name: 'bciv_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'bciv_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Heart Attack',
            checkItems: [
              { name: 'hattk_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'hattk_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Irregular heartbeat, too fast/slow (Atrial Fibrillation)',
            checkItems: [
              { name: 'ihtfs_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'iftfs_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },
          {
            type: 'checkbox', label: 'Stroke',
            checkItems: [
              { name: 'strk_six_months', value: false, label: '6 Months', labelPosition: 'before' },
              { name: 'strk_today', value: false, label: 'Today', labelPosition: 'before' }
            ]
          },


          {
            type: 'autocomplete',
            name: 'insurance_name',
            placeholder: 'Insurance name',
            label: 'Insurance name',
            value: '',
            options: [{ text: 'One', value: 1 }, { text: 'Two', value: 2 }, { text: 'Three', value: 3 }],
            caption: 'Insurance Information'
          },
          {
            type: 'autocomplete',
            name: 'insurance_type',
            placeholder: 'Insurance type',
            label: 'Insurance type',
            value: '',
            options: [{ text: 'Type One', value: 'type1' }, { text: 'Type Two', value: 'type2' }, { text: 'Type Three', value: 'type3' }]
          }
        ];

        let calendarInfoFormFields = [
          { type: 'input', name: 'event_title', placeholder: 'Event Title', label: 'Event Title', value: '', disabled: true },
          { type: 'input', name: 'description', placeholder: 'Event Description', label: 'Event Description', value: '', disabled: true },
          { type: 'input', name: 'startdate', placeholder: 'Date of Appointment', label: 'Date of Appointment', value: '', disabled: true },
          { type: 'input', name: 'slot', placeholder: 'Time of Appointment', label: 'Time of Appointment', value: '', disabled: true },
          {
            type: 'select', name: 'reqTimezone',
            options: [
              { text: 'Alaska Standard Time', value: '-08:00|America/Anchorage' },
              { text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles' },
              { text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver' },
              { text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix' },
              { text: 'Central Standard Time', value: '-05:00|America/Chicago' },
              { text: 'Eastern Standard Time', value: '-04:00|America/New_York' },
              { text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu' }
            ],
            value: '-05:00|America/Chicago', disabled: true
          },
          { type: 'input', name: 'username', placeholder: 'Organizer Name', label: 'Organizer Name', value: '', disabled: true },
          { type: 'input', name: 'useremail', placeholder: 'Organizer Email', label: 'Organizer Email', value: '', disabled: true },
          { type: 'input', name: 'attendees', placeholder: 'Attendee Email', label: 'Attendee Email', value: '', disabled: true },
          { type: 'input', name: 'additional_notes', placeholder: 'Additional Notes', label: 'Additional Notes', value: '' }
        ];

        this.configData = Object.assign(this.configData, { patientInfoFormFields: patientInfoFormFields }, { calendarInfoFormFields: calendarInfoFormFields });

      }, error => {
        console.log('Oooops! Cannot get states.');
      });
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
