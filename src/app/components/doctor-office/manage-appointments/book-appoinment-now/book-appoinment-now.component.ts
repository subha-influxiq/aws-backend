import {Component, Inject, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpServiceService} from '../../../../services/http-service.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonFunction} from '../../../../class/common/common-function';
import {MatTableDataSource} from '@angular/material/table';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../../environments/environment';
import {FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective} from '@angular/forms';
import moment from 'moment-es6';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

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
      getRefreshToken: 'get-refresh-token',
      getTokenInfo: 'getauthorization-pece-getuserdata',
      syncWithGoogle: 'get-events-from-google',
      insuranceDataManage: 'insurance-data-manage'
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
    patientInfoFormFields: {},
    calendarInfoFormFields: {},
    primaryCondition: {
      $or: [{event_type: 1}, {event_type: 2}],
      userid: {$in: JSON.parse(this.cookieService.get('user_details')).tech_id}
    }
  };

  public resolveData;
  public userDetails: any;

  constructor(public activatedRoute: ActivatedRoute, public cookieService: CookieService,
              public snackBar: MatSnackBar, public httpRequestService: HttpServiceService,
              public dialog: MatDialog) {

    // this.openDialog();
  }


  ngOnInit() {

    this.getStates();

    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      this.activatedRoute.data.forEach((data) => {
        this.resolveData = data.eventdayarrData;
        this.configData.responseData = data.eventdayarrData.data;
      });
    } else {
      this.openSnackBar('Token not found');
    }

    /******* Get user details from cookies ******/
    this.userDetails = JSON.parse(this.cookieService.get('user_details'));
    this.configData = Object.assign(this.configData, this.userDetails);

    // this.configData.primaryCondition = Object.assign(this.configData.primaryCondition, {userid: {$in: [this.userDetails._id]}});
    this.httpRequestService.postRequest('get-doctor-list', {_id: {$in: [this.userDetails.doctor_id]}}).subscribe((result: any) => {
      console.info('result', result);
    })

    this.updateUser();
  }


  updateUser() {
    // let userDetails: any = JSON.parse(this.cookieService.get('user_details'));
    if (this.activatedRoute.snapshot.params.refresh && this.cookieService.check('user_details')) {
      let data = {
        token: this.cookieService.get('jwtToken'),
        id: this.userDetails._id,
        data: {
          access_token: this.activatedRoute.snapshot.params.access_t,
          refresh_token: this.activatedRoute.snapshot.params.refresh
        }
      };
      this.httpRequestService.postRequest('update-user', data).subscribe((response: any) => {
        console.log('response', response);
        if (response.status == 'success') {
          this.openSnackBar('Calendar added successfully...')
        }
      });

      let urlSendEmail = this.configData.baseUrl + 'send-confirmation-email?id=' + this.userDetails._id;
      this.httpRequestService.getRequest(urlSendEmail, {}).subscribe((response: any) => {
        if (response.status == 'success') {
          console.log('Mail sent ', response.msg_id);
          this.openSnackBar('Confirmation email sent to your email - ' + this.userDetails.email, 'Ok');
        }
      });

      // Update user_details in cookie
      this.cookieService.set('user_details', JSON.stringify(Object.assign(this.userDetails, data.data)));
    }
  }

  getStates(): any {
    /* ****************** Get states value from assets/states.json ****************** */
    this.httpRequestService.get('assets/data/states.json')
      .subscribe(res => {
        this.states = res;

        let insuranceData = [];
        for (let i = 0; i < this.resolveData.others.insurance.length; i++) {
          let temp = {};
          temp['text'] = this.resolveData.others.insurance[i].insurancename;
          temp['value'] = this.resolveData.others.insurance[i]._id;
          insuranceData.push(temp);
        }
        insuranceData.push({text: 'Others', value: 0});

        let insuranceTypeData = [];
        for (let i = 0; i < this.resolveData.others.insurance_type.length; i++) {
          let temp = {};
          temp['text'] = this.resolveData.others.insurance_type[i].insurancetype_name;
          temp['value'] = this.resolveData.others.insurance_type[i]._id;
          temp['child_of'] = this.resolveData.others.insurance_type[i].insurance_id;
          insuranceTypeData.push(temp);
        }
        console.log('insuranceTypeData', insuranceTypeData);

        let otherFieldsData = [];
        for (let i = 0; i < this.resolveData.others.patient_information.length; i++) {
          let fieldData: any;
          switch (this.resolveData.others.patient_information[i].type) {

            case 'checkbox':
              fieldData = {
                type: 'checkbox',
                label: this.resolveData.others.patient_information[i].description,
                checkItems: [
                  {
                    name: this.resolveData.others.patient_information[i].label,
                    value: false,
                    label: '',
                    labelPosition: 'before'
                  }
                ]
              };
              break;

            case 'textfield':
              fieldData = {
                type: 'input',
                name: this.resolveData.others.patient_information[i].label,
                placeholder: this.resolveData.others.patient_information[i].description,
                label: this.resolveData.others.patient_information[i].description,
                value: ''}
              break;

            case 'dropdown':
              for (let j = 0; j < this.resolveData.others.patient_information[i].addfield.length; j++) {
                this.resolveData.others.patient_information[i].addfield[j] = {
                  text: this.resolveData.others.patient_information[i].addfield[j],
                  value: this.resolveData.others.patient_information[i].addfield[j]
                }
              }
              fieldData = {
                type: 'select',
                name: this.resolveData.others.patient_information[i].label,
                placeholder: this.resolveData.others.patient_information[i].description,
                label: this.resolveData.others.patient_information[i].description,
                options: this.resolveData.others.patient_information[i].addfield
              }
              break;
          }


          if (fieldData != undefined) {
            if (otherFieldsData.length == 0) {
              fieldData['caption'] = 'Others Details';
            }
            otherFieldsData.push(fieldData);
          }
        }
        console.log('otherFieldsData', otherFieldsData);

        let patientInfoFormFields: any = [
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
          {type: 'input', name: 'address', placeholder: 'Address', label: 'Address', value: ''},
          // {type: 'input', name: 'state', placeholder: 'State', label: 'State', value: ''},
          {
            type: 'select', name: 'state', placeholder: 'Select State', label: 'State',
            options: this.states,
            validators: [Validators.required], error: 'Select state'
          },
          {type: 'input', name: 'city', placeholder: 'City', label: 'City', value: ''},
          {type: 'input', name: 'zip', placeholder: 'ZIP', label: 'ZIP', value: ''},
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
              {text: 'Male', value: 'male'},
              {text: 'Female', value: 'female'}
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
          {
            type: 'input',
            name: 'booking_date',
            placeholder: 'Date',
            label: 'Booking date',
            value: this.today,
            disabled: true
          },
        ];

        let checkboxFields: any = [
          {
            type: 'checkbox', caption: 'Autonomic Nervous System Dysfunction (ANSD)',
            label: 'Blurred Vision',
            checkItems: [
              {name: 'bv_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'bv_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Elevated Blood Sugar',
            checkItems: [
              {name: 'ebs_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ebs_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Extreme Thirst',
            checkItems: [
              {name: 'et_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'et_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Frequent Urination',
            checkItems: [
              {name: 'fu_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'fu_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Fatigue (Tiredness)',
            checkItems: [
              {name: 'ft_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ft_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Heartburn',
            checkItems: [
              {name: 'hb_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'hb_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Increased Hunger',
            checkItems: [
              {name: 'ih_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ih_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Nausea',
            checkItems: [
              {name: 'nau_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'nau_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Numbness & Tingling in Hands or Feet',
            checkItems: [
              {name: 'nthf_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'nthf_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Vomiting',
            checkItems: [
              {name: 'vomiting_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'vomiting_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', caption: 'Sudomotor Dysfunction (SUDOD)',
            label: 'Burning Sensations',
            checkItems: [
              {name: 'bs_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'bs_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Difficulty Digesting Food',
            checkItems: [
              {name: 'ddf_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ddf_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Dizziness or Fainting',
            checkItems: [
              {name: 'dof_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'dof_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Exercise Intolerance',
            checkItems: [
              {name: 'ei_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ei_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Sexual Difficulties',
            checkItems: [
              {name: 'sd_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'sd_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Sweat Abnormalities',
            checkItems: [
              {name: 'sa_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'sa_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Tingling Hands & Feet',
            checkItems: [
              {name: 'thf_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'thf_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', label: 'Urinary Problems',
            checkItems: [
              {name: 'up_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'up_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'Autonomic Nervous System Dysfunction (ANSD)'
          },
          {
            type: 'checkbox', caption: 'ENDOTHELIAL DYSFUNCTION (ENDOD)',
            label: 'Angina (severe chest pain, often spreading to shoulder, arm, back, neck, or jaw)',
            checkItems: [
              {name: 'angina_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'angina_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
          },
          {
            type: 'checkbox', label: 'Chest Pain that goes away with rest',
            checkItems: [
              {name: 'cptgawr_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'cptgawr_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
          },
          {
            type: 'checkbox', label: 'Heartburn',
            checkItems: [
              {name: 'hrtbn_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'hrtbn_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
          },
          {
            type: 'checkbox', label: 'Pain In Calves',
            checkItems: [
              {name: 'pic_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'pic_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
          },
          {
            type: 'checkbox', label: 'Shortness of Breath',
            checkItems: [
              {name: 'sob_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'sob_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
          },
          {
            type: 'checkbox', label: 'Stroke',
            checkItems: [
              {name: 'stroke_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'stroke_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
          },
          {
            type: 'checkbox', label: 'TIA (mini stroke)',
            checkItems: [
              {name: 'tia_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'tia_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'ENDOTHELIAL DYSFUNCTION (ENDOD)'
          },
          {
            type: 'checkbox', caption: 'CARDIOMETABOLIC RISK (CMR)',
            label: 'Headaches',
            checkItems: [
              {name: 'headaches_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'headaches_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC RISK (CMR)'
          },
          {
            type: 'checkbox', label: 'Dizziness',
            checkItems: [
              {name: 'dizziness_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'dizziness_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC RISK (CMR)'
          },
          {
            type: 'checkbox', label: 'Swelling of Ankles',
            checkItems: [
              {name: 'soa_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'soa_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC RISK (CMR)'
          },
          {
            type: 'checkbox', caption: 'INSULIN RESISTANCE (IR)',
            label: 'Blurred Vision',
            checkItems: [
              {name: 'blv_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'blv_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
          },
          {
            type: 'checkbox', label: 'Elevated Blood Sugar',
            checkItems: [
              {name: 'ebsr_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ebsr_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
          },
          {
            type: 'checkbox', label: 'Extreme Thirst',
            checkItems: [
              {name: 'ext_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ext_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
          },
          {
            type: 'checkbox', label: 'Fatigue (Tiredness)',
            checkItems: [
              {name: 'ftd_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ftd_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
          },
          {
            type: 'checkbox', label: 'Increased Hunger',
            checkItems: [
              {name: 'ihr_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ihr_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'INSULIN RESISTANCE (IR)'
          },
          {
            type: 'checkbox', caption: 'SMALL FIBER SENSORY NEUROPATHY (SFN)',
            label: 'Burning Sensations',
            checkItems: [
              {name: 'burns_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'burns_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
          },
          {
            type: 'checkbox', label: 'Painful Contact With Socks or Bed Sheets',
            checkItems: [
              {name: 'pcwsbs_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'pcwsbs_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
          },
          {
            type: 'checkbox', label: 'Pebble or Sandlike Sensation In Shoes',
            checkItems: [
              {name: 'psss_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'psss_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
          },
          {
            type: 'checkbox', label: 'Stabbing or Electrical Shock Sensation',
            checkItems: [
              {name: 'sess_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'sess_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
          },
          {
            type: 'checkbox', label: 'Pins And Needles Sensation In Feet',
            checkItems: [
              {name: 'pnsf_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'pnsf_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'SMALL FIBER SENSORY NEUROPATHY (SFN)'
          },
          {
            type: 'checkbox', caption: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)',
            label: 'Blurred Vision',
            checkItems: [
              {name: 'bldv_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'bldv_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Cold, Clammy, Pale Skin',
            checkItems: [
              {name: 'ccps_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'ccps_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Depression',
            checkItems: [
              {name: 'depression_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'depression_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Dizziness or Lightheadedness',
            checkItems: [
              {name: 'dol_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'dol_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Thirst',
            checkItems: [
              {name: 'thirst_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'thirst_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Fainting',
            checkItems: [
              {name: 'fainting_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'fainting_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Fatigue (Tiredness)',
            checkItems: [
              {name: 'fatt_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'fatt_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Lack of Concentration',
            checkItems: [
              {name: 'loc_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'loc_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Lack of Energy',
            checkItems: [
              {name: 'loe_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'loe_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Nausea',
            checkItems: [
              {name: 'nausea_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'nausea_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', label: 'Rapid, Shallow Breathing',
            checkItems: [
              {name: 'rsb_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'rsb_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)'
          },
          {
            type: 'checkbox', caption: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)',
            label: 'Blood clot in a vein (Venous Thrombosis)',
            checkItems: [
              {name: 'bciv_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'bciv_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
          },
          {
            type: 'checkbox', label: 'Heart Attack',
            checkItems: [
              {name: 'hattk_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'hattk_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
          },
          {
            type: 'checkbox', label: 'Irregular heartbeat, too fast/slow (Atrial Fibrillation)',
            checkItems: [
              {name: 'ihtfs_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'iftfs_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
          },
          {
            type: 'checkbox', label: 'Stroke',
            checkItems: [
              {name: 'strk_six_months', value: false, label: '6 Months', labelPosition: 'before'},
              {name: 'strk_today', value: false, label: 'Today', labelPosition: 'before'}
            ],
            isSymptomChecklist: true, block: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)'
          }
        ];

        let autocompleteFields: any = [
          {
            type: 'select',
            name: 'insurance_id', // name must be insurance_id
            placeholder: 'Insurance name',
            label: 'Insurance name',
            value: '',
            options: insuranceData,
            caption: 'Insurance Information'
          },
          {
            type: 'select',
            name: 'insurance_type', // name must be insurance_type
            placeholder: 'Insurance type',
            label: 'Insurance type',
            value: '',
            isDependent: true,
            dependentOn: 'insurance_id',
            options: insuranceTypeData
          },
          {
            type: 'input',
            name: 'insurance_name_input', // name must be insurance_name_input
            placeholder: 'Name of the insurance',
            label: 'Name of the insurance',
            value: '',
            isDependent: true,
            dependentOn: 'insurance_id',
            condition: 0
          },
          {
            type: 'input',
            name: 'insurance_type_input', // name must be insurance_type_input
            placeholder: 'Insurance type',
            label: 'Insurance type',
            value: '',
            isDependent: true,
            dependentOn: 'insurance_id',
            condition: 0
          }
        ];

        let calendarInfoFormFields = [
          {
            type: 'input',
            name: 'event_title',
            placeholder: 'Event Title',
            label: 'Event Title',
            value: '',
            disabled: true
          },
          {
            type: 'input',
            name: 'description',
            placeholder: 'Event Description',
            label: 'Event Description',
            value: '',
            disabled: true
          },
          {
            type: 'input',
            name: 'startdate',
            placeholder: 'Date of Appointment',
            label: 'Date of Appointment',
            value: '',
            disabled: true
          },
          {
            type: 'input',
            name: 'slot',
            placeholder: 'Time of Appointment',
            label: 'Time of Appointment',
            value: '',
            disabled: true
          },
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
            value: '-05:00|America/Chicago', disabled: true
          },
          {
            type: 'input',
            name: 'username',
            placeholder: 'Organizer Name',
            label: 'Organizer Name',
            value: '',
            disabled: true
          },
          {
            type: 'input',
            name: 'useremail',
            placeholder: 'Organizer Email',
            label: 'Organizer Email',
            value: '',
            disabled: true
          },
          {
            type: 'input',
            name: 'attendees',
            placeholder: 'Attendee Email',
            label: 'Attendee Email',
            value: '',
            disabled: true
          },
          {
            type: 'input',
            name: 'additional_notes',
            placeholder: 'Additional Notes',
            label: 'Additional Notes',
            value: ''
          }
        ];

        this.httpRequestService.postRequest('get-doctor-info', {condition: {_id: this.userDetails.doctor_id}}).subscribe((response: any) => {

          let hiddenFields: any = [
            {type: 'input', name: 'doctor_id', value: response.data._id, hidden: true},
            {type: 'input', name: 'doctor_office_id', value: this.userDetails._id, hidden: true},
            // {type: 'input', name: 'tech_id', value: response.data.tech_id, hidden: true},
            {type: 'input', name: 'parent_type', value: response.data.parent_type, hidden: true},
            {type: 'input', name: 'parent_id', value: response.data.parent_id, hidden: true},
          ]
          this.configData = Object.assign(this.configData, {patientInfoFormFields: patientInfoFormFields.concat(autocompleteFields, otherFieldsData, checkboxFields, hiddenFields)}, {calendarInfoFormFields: calendarInfoFormFields});

        });
      }, error => {
        console.log('Oooops! Cannot get states.');
      });
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChooseDoctorDialog, {
      width: '500px',
      data: 'abc'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

    });
  }

}



// Choose doctor modal
@Component({
  selector: 'choose-doctor',
  templateUrl: 'choose-doctor.html',
})
export class ChooseDoctorDialog {

  public selectedDoctor;

  foods = []
  constructor(public dialogRef: MatDialogRef<ChooseDoctorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
