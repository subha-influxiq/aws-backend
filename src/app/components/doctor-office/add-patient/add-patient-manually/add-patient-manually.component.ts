import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { CommonFunction } from '../../../../class/common/common-function';
import { environment } from 'src/environments/environment';
import moment from 'moment-es6';

@Component({
  selector: 'app-add-patient-manually',
  templateUrl: './add-patient-manually.component.html',
  styleUrls: ['./add-patient-manually.component.css']
})
export class AddPatientManuallyComponent implements OnInit {

  today = moment().format('L');
  doctorOfficeChangePasswordForm: FormGroup;
  loader: boolean = false;
  headerFlag: any;
  jwtToken: any;
  cookiesData: any;
  cookies_id: string;
  formTag: boolean = false;


  states: any = [];
  // lib
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  insuranceData: any = [];
  insuranceTypeData: any = [];
  temtdata: any = '';
  // formdata
  formfieldrefresh: boolean = false;
  updatetable: boolean = false;
  formfieldrefreshdata: any = null;
  formdata: any = {
    successmessage: "Added Successfully !!",
    submittext: "Submit",
    canceltext: "Cancel Now",
    resettext: "reset This",
    redirectpath: "/doctor-office/dashboard",
    submitactive: true, //optional, default true
    apiUrl: environment.apiBaseUrl,
    endpoint: 'addorupdatedata',
    jwttoken: "",
    //hidereset:true,
    //hidecancel:true,
    cancelroute: '/doctor-office/dashboard',
    fields: [
      {
        type: 'input',
        name: 'practice_name',
        placeholder: 'Practice Name',
        label: 'Practice Name',
        value: '',
        validators: { rule: 'required' },
        error: 'Enter practice name',
        caption: 'Patient General Information'
      },
      { type: 'input', name: 'address', placeholder: 'Address', label: 'Address', value: '' },
      // {type: 'input', name: 'state', placeholder: 'State', label: 'State', value: ''},
      {
        label: "State",
        name: "state",
        hint: 'Select state',
        type: 'select',
        val: this.states,
        value: [],
        multiple: false,
        validations: [
          { rule: 'required' }
        ],
        prefix: "",
        suffix: ""
      },
      { type: 'input', name: 'city', placeholder: 'City', label: 'City', value: '' },
      { type: 'input', name: 'zip', placeholder: 'ZIP', label: 'ZIP', value: '' },
      {
        type: 'input',
        name: 'patient_name',
        placeholder: 'Patient Name',
        label: 'Patient Name',
        value: '',
        validators: { rule: 'required' },
        error: 'Enter patient name'
      },
      {
        type: 'date',
        name: 'dob',
        placeholder: 'Date of Birth',
        label: 'Date of Birth',
        value: '',
        validators: { rule: 'required' },
        error: 'Enter date of birth of the patient'
      },
      {
        type: 'select', name: 'gender', placeholder: 'Gender', label: 'Gender',
        options: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' }
        ],
        validators: { rule: 'required' }, error: 'Select gender'
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
        validators: { rule: 'required' },
        error: 'Enter patient height'
      },
      {
        type: 'input',
        name: 'weight',
        placeholder: 'Ex. 210 lbs',
        label: 'Weight',
        value: '',
        validators: { rule: 'required' },
        error: 'Enter patient weight'
      },
      { type: 'input', name: 'booking_date', placeholder: 'Date', label: 'Booking date', value: this.today, disabled: true },
      {
        type: 'checkbox',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        label: 'Blurred Vision',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox',
        label: 'Elevated Blood Sugar',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox',
        label: 'Extreme Thirst',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Frequent Urination',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Fatigue (Tiredness)',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Heartburn',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Increased Hunger',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Nausea',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Numbness & Tingling in Hands or Feet',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Vomiting',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', caption: 'Sudomotor Dysfunction (SUDOD)',
        label: 'Burning Sensations',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Difficulty Digesting Food',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Dizziness or Fainting',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Exercise Intolerance',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Sexual Difficulties',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Sweat Abnormalities',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Tingling Hands & Feet',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Urinary Problems',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', caption: 'ENDOTHELIAL DYSFUNCTION (ENDOD)',
        label: 'Angina (severe chest pain, often spreading to shoulder, arm, back, neck, or jaw)',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Chest Pain that goes away with rest',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Heartburn',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Pain In Calves',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Shortness of Breath',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Stroke',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'TIA (mini stroke)',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', caption: 'CARDIOMETABOLIC RISK (CMR)',
        label: 'Headaches',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Dizziness',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Swelling of Ankles',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', caption: 'INSULIN RESISTANCE (IR)',
        label: 'Blurred Vision',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Elevated Blood Sugar',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Extreme Thirst',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Fatigue (Tiredness)',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Increased Hunger',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', caption: 'SMALL FIBER SENSORY NEUROPATHY (SFN)',
        label: 'Burning Sensations',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Painful Contact With Socks or Bed Sheets',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Pebble or Sandlike Sensation In Shoes',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Stabbing or Electrical Shock Sensation',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Pins And Needles Sensation In Feet',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', caption: 'CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)',
        label: 'Blurred Vision',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Cold, Clammy, Pale Skin',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Depression',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Dizziness or Lightheadedness',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Thirst',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Fainting',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Fatigue (Tiredness)',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Lack of Concentration',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Lack of Energy',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Nausea',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Rapid, Shallow Breathing',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', caption: 'PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)',
        label: 'Blood clot in a vein (Venous Thrombosis)',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Heart Attack',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Irregular heartbeat, too fast/slow (Atrial Fibrillation)',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        type: 'checkbox', label: 'Stroke',
        name: 'Autonomic Nervous System Dysfunction (ANSD)',
        multiple: true,
        val: [
          { key: 0, val: '6 Months' },
          { key: 1, val: 'Today' }
        ],
        value: [true, true]
      },
      {
        label: "Insurance name",
        name: 'insurance_id',
        hint: '',
        type: 'select',
        val: this.insuranceData,
        value: [],
        multiple: false,
        validations: [
          { rule: 'required' }
        ],
        prefix: "",
        suffix: ""
      },
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
    ]
  };

  public resolveData;

  constructor(private formBuilder: FormBuilder, private httpService: HttpServiceService,
    private snackBar: MatSnackBar, private commonFunction: CommonFunction, private activatedRoute: ActivatedRoute,
    private cookieService: CookieService, private router: Router) {

    this.getStates();

    this.headerFlag = this.activatedRoute.snapshot.url[0].path;
    this.jwtToken = cookieService.get('jwtToken');
    this.formdata.jwttoken = this.jwtToken;
    let allcookies: any;
    allcookies = cookieService.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;
  }

  ngOnInit() {
    if (this.cookieService.check('jwtToken')) {
      this.activatedRoute.data.forEach((data) => {
        this.resolveData = data.eventdayarrData;
      });
    } else {
      this.openSnackBar('Token not found');
    }
  }

  getStates(): any {
    /* ****************** Get states value from assets/states.json ****************** */
    this.httpService.get('assets/data/states.json').subscribe(res => {
      console.log("State >> ", res);
      var state: any = res;
      for (let loop = 0; loop < state.length; loop++) {
        this.states.push({ name: state[loop].text, val: state[loop].value });
      }

      for (let i = 0; i < this.resolveData.others.insurance.length; i++) {
        let temp = {};
        temp['name'] = this.resolveData.others.insurance[i].insurancename;
        temp['val'] = this.resolveData.others.insurance[i]._id;
        this.insuranceData.push(temp);
      }
      this.insuranceData.push({ name: 'Others', val: 0 });
    }, error => {
      console.log('Oooops! Cannot get states.');
    });
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  listenFormFieldChange(val: any) {
    console.log("Subha >>> ", val.fieldval);
    switch(val.field.name) {
      case 'insurance_id':
        if(val.fieldval != 0) {
          var countFlag: number = 0;
          for (let i = 0; i < this.resolveData.others.insurance_type.length; i++) {
            for(let j = 0; j < this.resolveData.others.insurance_type[i].insurance_id.length; j++) {
              if(val.fieldval == this.resolveData.others.insurance_type[i].insurance_id[j]) {
                countFlag++;
                let temp: any = {};
                temp['name'] = this.resolveData.others.insurance_type[i].insurancetype_name;
                temp['val'] = this.resolveData.others.insurance_type[i]._id;
                this.insuranceTypeData.push(temp);
              }
            }
          }

          if(countFlag == 0) {
            this.insuranceTypeData.push({});
          }

          this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'insurance_name_input' } };
          this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'insurance_type_input' } };
          this.formfieldrefreshdata = {
            field: 'addfromcontrol',
            value: {
              label: "Insurance type",
              name: "insurance_type",
              hint: '',
              type: 'select',
              val: this.insuranceTypeData,
              multiple: false,
              validations: [
                { rule: 'required' }
              ],
              prefix: "",
              suffix: "",
              after: 'insurance_id'
            }
          };
        } else {
          console.log("Working...");
          this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'insurance_type' } };
          
          setTimeout(() => {
            this.formfieldrefreshdata = {
              field: 'addfromcontrol',
              value: {
                label: 'Name of the insurance',
                name: 'insurance_name_input',
                type: 'text',
                val: '',
                validators: [
                  { rule: 'required' }
                ],
                prefix: "",
                suffix: "",
                after: 'insurance_id'
              }
            };
          }, 1000);

          setTimeout(() => {
            this.formfieldrefreshdata = {
              field: 'addfromcontrol',
              value: {
                type: 'text',
                name: 'insurance_type_input',
                placeholder: 'Insurance type',
                label: 'Insurance type',
                value: '',
                validators: [
                  { rule: 'required' }
                ],
                prefix: "",
                suffix: "",
                after: 'insurance_name_input'
              }
            };
          }, 2000);
        }
        break;
    }
  }

}
