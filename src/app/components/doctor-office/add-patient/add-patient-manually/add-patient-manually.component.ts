import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {HttpServiceService} from '../../../../services/http-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {DialogBoxComponent} from '../../../common/dialog-box/dialog-box.component';
import {CommonFunction} from '../../../../class/common/common-function';
import {environment} from 'src/environments/environment';
import moment from 'moment-es6';

@Component({
  selector: 'app-add-patient-manually',
  templateUrl: './add-patient-manually.component.html',
  styleUrls: ['./add-patient-manually.component.css']
})
export class AddPatientManuallyComponent implements OnInit {

  // today = moment().format('L');
  // doctorOfficeChangePasswordForm: FormGroup;
  // loader: boolean = false;
  // headerFlag: any;
  // jwtToken: any;
  // cookiesData: any;
  // cookies_id: string;
  // formTag: boolean = false;
  //
  // parent_type: any = '';
  // parent_id: any = '';
  //
  // states: any = [];
  // // lib
  // emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //
  // insuranceData: any = [];
  // insuranceTypeData: any = [];
  // temtdata: any = '';
  // // formdata
  // formfieldrefresh: boolean = false;
  // updatetable: boolean = false;
  // formfieldrefreshdata: any = null;
  // formdata: any = {
  //   successmessage: "Added Successfully !!",
  //   submittext: "Submit",
  //   canceltext: "Cancel Now",
  //   resettext: "reset This",
  //   redirectpath: "/doctor-office/dashboard",
  //   submitactive: true, //optional, default true
  //   apiUrl: environment.calendarApi,
  //   endpoint: 'add-to-calendar-manually',
  //   jwttoken: "",
  //   //hidereset:true,
  //   //hidecancel:true,
  //   cancelroute: '/doctor-office/dashboard',
  //   fields: [
  //     {
  //       heading: "<h2>Patient General Information</h2>",
  //       type: 'text',
  //       name: 'practice_name',
  //       placeholder: 'Practice Name',
  //       label: 'Practice Name',
  //       value: '',
  //       validators: { rule: 'required' },
  //       error: 'Enter practice name',
  //       caption: 'Patient General Information'
  //     },
  //     { type: 'textarea', name: 'address', placeholder: 'Address', label: 'Address', value: '' },
  //     {
  //       label: "State",
  //       name: "state",
  //       type: 'select',
  //       val: this.states,
  //       value: [],
  //       multiple: false,
  //       validations: [
  //         { rule: 'required' }
  //       ],
  //       prefix: "",
  //       suffix: ""
  //     },
  //     { type: 'text', name: 'city', placeholder: 'City', label: 'City', value: '' },
  //     { type: 'text', name: 'zip', placeholder: 'ZIP', label: 'ZIP', value: '' },
  //     {
  //       type: 'text',
  //       name: 'patient_name',
  //       placeholder: 'Patient Name',
  //       label: 'Patient Name',
  //       value: '',
  //       validators: { rule: 'required' },
  //       error: 'Enter patient name'
  //     },
  //     {
  //       type: 'date',
  //       name: 'dob',
  //       placeholder: 'Date of Birth',
  //       label: 'Date of Birth',
  //       value: '',
  //       validators: { rule: 'required' },
  //       error: 'Enter date of birth of the patient'
  //     },
  //     {
  //       type: 'select',
  //       name: 'gender',
  //       placeholder: 'Gender',
  //       label: 'Gender',
  //       val: [
  //         { name: 'Male', val: 'male' },
  //         { name: 'Female', val: 'female' }
  //       ],
  //       validators: { rule: 'required' }, error: 'Select gender'
  //     },
  //     {
  //       type: 'text',
  //       name: 'patient_email',
  //       placeholder: 'Patient Email',
  //       label: 'Patient Email',
  //       value: '',
  //       validators: [Validators.required, Validators.email],
  //       error: 'Enter patient email'
  //     },
  //     {
  //       type: 'text',
  //       name: 'height',
  //       placeholder: 'Ex. 6\'10"',
  //       label: 'Height',
  //       value: '',
  //       validators: { rule: 'required' },
  //       error: 'Enter patient height'
  //     },
  //     {
  //       type: 'text',
  //       name: 'weight',
  //       placeholder: 'Ex. 210 lbs',
  //       label: 'Weight',
  //       value: '',
  //       validators: { rule: 'required' },
  //       error: 'Enter patient weight'
  //     },
  //     { type: 'text', name: 'booking_date', placeholder: 'Date', label: 'Booking date', value: this.today, disabled: true },
  //
  //     {
  //       heading: '<h2>Insurance Information</h2>',
  //       label: "Insurance name",
  //       name: 'insurance_id',
  //       hint: '',
  //       type: 'select',
  //       val: this.insuranceData,
  //       value: [],
  //       multiple: false,
  //       validations: [
  //         { rule: 'required' }
  //       ],
  //       prefix: "",
  //       suffix: ""
  //     },
  //
  //     {
  //       name: "parent_type",
  //       type: 'hidden',
  //       value: this.parent_type
  //     },
  //     {
  //       name: "parent_id",
  //       type: 'hidden',
  //       value: this.parent_id
  //     },
  //     {
  //       type: 'date',
  //       name: 'startdate',
  //       placeholder: 'Appointment Date',
  //       label: 'Appointment Date',
  //       value: '',
  //       validators: { rule: 'required' },
  //       error: 'Enter Appointment Date'
  //     },
  //     {
  //       type: 'select',
  //       label: "Time Zone",
  //       name: 'reqTimezone',
  //       val: [
  //         { name: 'Alaska Standard Time', val: '-08:00|America/Anchorage' },
  //         { name: 'Pacific Standard Time', val: '-07:00|America/Los_Angeles' },
  //         { name: 'Mountain Standard Time(GMT-06:00)', val: '-06:00|America/Denver' },
  //         { name: 'Mountain Standard Time(GMT-07:00) (no DST)', val: '-07:00|America/Phoenix' },
  //         { name: 'Central Standard Time', val: '-05:00|America/Chicago' },
  //         { name: 'Eastern Standard Time', val: '-04:00|America/New_York' },
  //         { name: 'Hawaii Standard Time', val: '-10:00|Pacific/Honolulu' }
  //       ],
  //       validations: [
  //         { rule: 'required' }
  //       ],
  //       prefix: "",
  //       suffix: ""
  //     },
  //     {
  //       type: 'select',
  //       label: "Appointment Time",
  //       name: 'appointment_time',
  //       val: [
  //         { name: '6.00 AM to 6.30 AM', val: '6.00 AM to 6.30 AM' },
  //         { name: '6.30 AM to 7.00 AM', val: '6.30 AM to 7.00 AM' },
  //         { name: '7.00 AM to 7.30 AM', val: '7.00 AM to 7.30 AM' },
  //         { name: '7.30 AM to 8.00 AM', val: '7.30 AM to 8.00 AM' },
  //         { name: '8.00 AM to 8.30 AM', val: '8.00 AM to 8.30 AM' },
  //         { name: '8.30 AM to 9.00 AM', val: '8.30 AM to 9.00 AM' },
  //         { name: '9.00 AM to 9.30 AM', val: '9.00 AM to 9.30 AM' },
  //         { name: '9.30 AM to 10.00 AM', val: '9.30 AM to 10.00 AM' },
  //         { name: '10.00 AM to 10.30 AM', val: '10.00 AM to 10.30 AM' },
  //         { name: '10.30 AM to 11.00 AM', val: '10.30 AM to 11.00 AM' },
  //         { name: '11.00 AM to 11.30 AM', val: '11.00 AM to 11.30 AM' },
  //         { name: '11.30 AM to 12.00 AM', val: '11.30 AM to 12.00 AM' },
  //         { name: '12.00 PM to 12.30 PM', val: '12.00 PM to 12.30 PM' },
  //         { name: '1.00 PM to 1.30 PM', val: '1.00 PM to 1.30 PM' },
  //         { name: '1.30 PM to 2.00 PM', val: '1.30 PM to 2.00 PM' },
  //         { name: '2.00 PM to 2.30 PM', val: '2.00 PM to 2.30 PM' },
  //         { name: '2.30 PM to 3.00 PM', val: '2.30 PM to 3.00 PM' },
  //         { name: '3.00 PM to 3.30 PM', val: '3.00 PM to 3.30 PM' },
  //         { name: '3.30 PM to 4.00 PM', val: '3.30 PM to 4.00 PM' },
  //         { name: '4.00 PM to 4.30 PM', val: '4.00 PM to 4.30 PM' },
  //         { name: '4.30 PM to 5.00 PM', val: '4.30 PM to 5.00 PM' },
  //         { name: '5.00 PM to 5.30 PM', val: '5.00 PM to 5.30 PM' },
  //         { name: '5.30 PM to 6.00 PM', val: '5.30 PM to 6.00 PM' },
  //         { name: '6.00 PM to 6.30 PM', val: '6.00 PM to 6.30 PM' },
  //         { name: '6.30 PM to 7.00 PM', val: '6.30 PM to 7.00 PM' },
  //         { name: '7.00 PM to 7.30 PM', val: '7.00 PM to 7.30 PM' },
  //         { name: '7.30 PM to 8.00 PM', val: '7.30 PM to 8.00 PM' },
  //         { name: '8.00 PM to 8.30 PM', val: '8.00 PM to 8.30 PM' },
  //         { name: '8.30 PM to 9.00 PM', val: '8.30 PM to 9.00 PM' },
  //         { name: '9.00 PM to 9.00 PM', val: '9.00 PM to 9.00 PM' },
  //         { name: '9.30 PM to 10.00 PM', val: '9.30 PM to 10.00 PM' }
  //       ],
  //       validations: [
  //         { rule: 'required' }
  //       ],
  //       prefix: "",
  //       suffix: ""
  //     },
  //
  //     {
  //       heading: "<h2>Autonomic Nervous System Dysfunction (ANSD)</h2>"
  //     },
  //     {
  //       heading: 'Blurred Vision',
  //       type: 'checkbox',
  //       name: 'bv_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'bv_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Elevated Blood Sugar',
  //       type: 'checkbox',
  //       name: 'ebs_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ebs_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Extreme Thirst',
  //       type: 'checkbox',
  //       name: 'et_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'et_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Frequent Urination',
  //       type: 'checkbox',
  //       name: 'fu_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'fu_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Fatigue (Tiredness)',
  //       type: 'checkbox',
  //       name: 'ft_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ft_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Heartburn',
  //       type: 'checkbox',
  //       name: 'hb_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'hb_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Increased Hunger',
  //       type: 'checkbox',
  //       name: 'ih_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ih_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Nausea',
  //       type: 'checkbox',
  //       name: 'nau_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'nau_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Numbness & Tingling in Hands or Feet',
  //       type: 'checkbox',
  //       name: 'nthf_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'nthf_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Vomiting',
  //       type: 'checkbox',
  //       name: 'vomiting_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'vomiting_six_months',
  //       label: '6 Months',
  //     },
  //
  //     { heading: '<h2>Sudomotor Dysfunction (SUDOD)</h2>' },
  //     {
  //       heading: 'Burning Sensations',
  //       type: 'checkbox',
  //       name: 'bs_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'bs_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Difficulty Digesting Food',
  //       type: 'checkbox',
  //       name: 'ddf_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ddf_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Dizziness or Fainting',
  //       type: 'checkbox',
  //       name: 'dof_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'dof_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Exercise Intolerance',
  //       type: 'checkbox',
  //       name: 'ei_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ei_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Sexual Difficulties',
  //       type: 'checkbox',
  //       name: 'sd_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'sd_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Sweat Abnormalities',
  //       type: 'checkbox',
  //       name: 'sa_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'sa_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Tingling Hands & Feet',
  //       type: 'checkbox',
  //       name: 'thf_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'thf_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Urinary Problems',
  //       type: 'checkbox',
  //       name: 'up_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'up_six_months',
  //       label: '6 Months',
  //     },
  //
  //     { heading: '<h2>ENDOTHELIAL DYSFUNCTION (ENDOD)<h2>' },
  //     {
  //       heading: 'Angina (severe chest pain, often spreading to shoulder, arm, back, neck, or jaw)',
  //       type: 'checkbox',
  //       name: 'angina_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'angina_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Chest Pain that goes away with rest',
  //       type: 'checkbox',
  //       name: 'cptgawr_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'cptgawr_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Heartburn',
  //       type: 'checkbox',
  //       name: 'hrtbn_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'hrtbn_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Pain In Calves',
  //       type: 'checkbox',
  //       name: 'pic_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'pic_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Shortness of Breath',
  //       type: 'checkbox',
  //       name: 'sob_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'sob_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Stroke',
  //       type: 'checkbox',
  //       name: 'stroke_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'stroke_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'TIA (mini stroke)',
  //       type: 'checkbox',
  //       name: 'tia_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'tia_six_months',
  //       label: '6 Months',
  //     },
  //
  //     { heading: '<h2>CARDIOMETABOLIC RISK (CMR)</h2>' },
  //     {
  //       heading: 'Headaches',
  //       type: 'checkbox',
  //       name: 'headaches_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'headaches_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Dizziness',
  //       type: 'checkbox',
  //       name: 'dizziness_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'dizziness_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Swelling of Ankles',
  //       type: 'checkbox',
  //       name: 'soa_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'soa_six_months',
  //       label: '6 Months',
  //     },
  //
  //     { heading: '<h2>INSULIN RESISTANCE (IR)</h2>' },
  //     {
  //       heading: 'Blurred Vision',
  //       type: 'checkbox',
  //       name: 'blv_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'blv_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Elevated Blood Sugar',
  //       type: 'checkbox',
  //       name: 'ebsr_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ebsr_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Extreme Thirst',
  //       type: 'checkbox',
  //       name: 'ext_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ext_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Fatigue (Tiredness)',
  //       type: 'checkbox',
  //       name: 'ftd_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ftd_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Increased Hunger',
  //       type: 'checkbox',
  //       name: 'ihr_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ihr_six_months',
  //       label: '6 Months',
  //     },
  //
  //     { heading: '<h2>SMALL FIBER SENSORY NEUROPATHY (SFN)</h2>' },
  //     {
  //       heading: 'Burning Sensations',
  //       type: 'checkbox',
  //       name: 'burns_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'burns_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Painful Contact With Socks or Bed Sheets',
  //       type: 'checkbox',
  //       name: 'pcwsbs_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'pcwsbs_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Pebble or Sandlike Sensation In Shoes',
  //       type: 'checkbox',
  //       name: 'psss_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'psss_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Pebble or Sandlike Sensation In Shoes',
  //       type: 'checkbox',
  //       name: 'psss_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'psss_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Stabbing or Electrical Shock Sensation',
  //       type: 'checkbox',
  //       name: 'sess_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'sess_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Pins And Needles Sensation In Feet',
  //       type: 'checkbox',
  //       name: 'pnsf_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'pnsf_six_months',
  //       label: '6 Months',
  //     },
  //
  //     { heading: '<h2>CARDIOMETABOLIC AUTONOMIC NEUROPATHY (CAN)</h2>' },
  //     {
  //       heading: 'Blurred Vision',
  //       type: 'checkbox',
  //       name: 'bldv_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'bldv_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Cold, Clammy, Pale Skin',
  //       type: 'checkbox',
  //       name: 'ccps_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ccps_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Depression',
  //       type: 'checkbox',
  //       name: 'depression_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'depression_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Dizziness or Lightheadedness',
  //       type: 'checkbox',
  //       name: 'dol_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'dol_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Thirst',
  //       type: 'checkbox',
  //       name: 'thirst_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'thirst_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Fainting',
  //       type: 'checkbox',
  //       name: 'fainting_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'fainting_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Fatigue (Tiredness)',
  //       type: 'checkbox',
  //       name: 'fatt_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'fatt_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Lack of Concentration',
  //       type: 'checkbox',
  //       name: 'loc_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'loc_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Lack of Energy',
  //       type: 'checkbox',
  //       name: 'loe_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'loe_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Nausea',
  //       type: 'checkbox',
  //       name: 'nausea_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'nausea_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Rapid, Shallow Breathing',
  //       type: 'checkbox',
  //       name: 'rsb_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'rsb_six_months',
  //       label: '6 Months',
  //     },
  //
  //     { heading: '<h2>PLETHYSMOGRAPHY CARDIOVASCULAR DISEASE (PTG CVD)</h2>' },
  //     {
  //       heading: 'Blood clot in a vein (Venous Thrombosis)',
  //       type: 'checkbox',
  //       name: 'bciv_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'bciv_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Heart Attack',
  //       type: 'checkbox',
  //       name: 'hattk_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'hattk_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Irregular heartbeat, too fast/slow (Atrial Fibrillation)',
  //       type: 'checkbox',
  //       name: 'iftfs_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'ihtfs_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: 'Stroke',
  //       type: 'checkbox',
  //       name: 'strk_today',
  //       label: 'Today',
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'strk_six_months',
  //       label: '6 Months',
  //     },
  //     {
  //       heading: '<h2>Notes</h2>',
  //       type: 'textarea',
  //       name: 'notes',
  //       placeholder: '',
  //       label: 'Notes',
  //       value: '',
  //       validators: {  }
  //     },
  //     {
  //       name: "add_to_google",
  //       type: 'hidden',
  //       value: true
  //     },
  //
  //     { type: 'input', name: 'username', placeholder: 'Organizer Name', label: 'Organizer Name', value: '', disabled: true },
  //     { type: 'input', name: 'useremail', placeholder: 'Organizer Email', label: 'Organizer Email', value: '', disabled: true },
  //     { type: 'input', name: 'attendees', placeholder: 'Attendee Email', label: 'Attendee Email', value: '', disabled: true },
  //     { type: 'input', name: 'additional_notes', placeholder: 'Additional Notes', label: 'Additional Notes', value: '' }
  //   ]
  // };
  //
  // public resolveData;
  //
  // constructor(private formBuilder: FormBuilder, private httpService: HttpServiceService,
  //   private snackBar: MatSnackBar, private commonFunction: CommonFunction, private activatedRoute: ActivatedRoute,
  //   private cookieService: CookieService, private router: Router) {
  //
  //   this.getStates();
  //
  //   this.headerFlag = this.activatedRoute.snapshot.url[0].path;
  //   this.jwtToken = cookieService.get('jwtToken');
  //   this.formdata.jwttoken = this.jwtToken;
  //   let allcookies: any;
  //   allcookies = cookieService.getAll();
  //   this.cookiesData = JSON.parse(allcookies.user_details);
  //   this.cookies_id = this.cookiesData._id;
  //
  //   this.formfieldrefreshdata = {
  //     field: 'addfromcontrol',
  //     value: {
  //       name: "doctor_office_id",
  //       type: 'hidden',
  //       value: this.cookiesData._id
  //     }
  //   };
  //
  //   var data: any = {
  //     "source": "data_pece",
  //     "condition": {
  //       _id_object: this.cookiesData.doctor_id
  //     },
  //     "token": this.jwtToken,
  //   };
  //
  //   this.httpService.httpViaPost("datalist", data).subscribe(response => {
  //     if(response.status == true) {
  //       var doctorDetails = [];
  //       for (let i = 0; i < response.res.length; i++) {
  //         let temp = {};
  //         temp['name'] = response.res[i].firstname + ' ' + response.res[i].lastname;
  //         temp['val'] = response.res[i]._id;
  //         doctorDetails.push(temp);
  //       }
  //
  //       this.parent_type = response.res[0].parent_type;
  //       this.parent_id = response.res[0].parent_id;
  //
  //       setTimeout(() => {
  //         this.formfieldrefreshdata = {
  //           field: 'addfromcontrol',
  //           value: {
  //             heading: "<h2>Appointment Details</h2>",
  //             label: "Select Doctor",
  //             name: "doctor_id",
  //             hint: '',
  //             type: 'select',
  //             val: doctorDetails,
  //             multiple: false,
  //             validations: [
  //               { rule: 'required' }
  //             ],
  //             prefix: "",
  //             suffix: "",
  //             after: 'insurance_id'
  //           }
  //         };
  //       }, 300);
  //     }
  //   });
  // }
  //
  // ngOnInit() {
  //   if (this.cookieService.check('jwtToken')) {
  //     this.activatedRoute.data.forEach((data) => {
  //       this.resolveData = data.eventdayarrData;
  //
  //       var otherFieldsData: any = [];
  //       for (let i = this.resolveData.others.patient_information.length - 1; i >= 0; i--) {
  //         let fieldData: any;
  //         switch (this.resolveData.others.patient_information[i].type) {
  //           case 'checkbox':
  //             otherFieldsData.push({
  //               type: 'checkbox',
  //               label: this.resolveData.others.patient_information[i].description,
  //               name: this.resolveData.others.patient_information[i].label,
  //               after: 'appointment_time'
  //             });
  //             break;
  //           case 'textfield':
  //             otherFieldsData.push({
  //               type: 'text',
  //               name: this.resolveData.others.patient_information[i].label,
  //               label: this.resolveData.others.patient_information[i].description,
  //               value: '',
  //               validators: { rule: 'required' },
  //               after: 'appointment_time'
  //             });
  //             break;
  //           case 'dropdown':
  //             var temp: any = [];
  //             for (let j = 0; j < this.resolveData.others.patient_information[i].addfield.length; j++) {
  //               let json = {
  //                 name: this.resolveData.others.patient_information[i].addfield[j],
  //                 val: this.resolveData.others.patient_information[i].addfield[j]
  //               }
  //               temp.push(json);
  //             }
  //
  //             otherFieldsData.push({
  //               label: this.resolveData.others.patient_information[i].description,
  //               name: this.resolveData.others.patient_information[i].label,
  //               type: 'select',
  //               val: temp,
  //               validations: [
  //                 { rule: 'required' }
  //               ],
  //               after: 'appointment_time'
  //             });
  //             break;
  //         }
  //       }
  //
  //       otherFieldsData[otherFieldsData.length - 1].heading = "<h2>Others Details</h2>";
  //
  //       this.formfieldrefreshdata = {
  //         field: 'addfromcontrol',
  //         value: otherFieldsData
  //       }
  //
  //       console.log('Loop finished.');
  //       console.log("Hello World: ", otherFieldsData);
  //     });
  //   } else {
  //     this.openSnackBar('Token not found');
  //   }
  // }
  //
  // getStates(): any {
  //   /* ****************** Get states value from assets/states.json ****************** */
  //   this.httpService.get('assets/data/states.json').subscribe(res => {
  //     var state: any = res;
  //     for (let loop = 0; loop < state.length; loop++) {
  //       this.states.push({ name: state[loop].text, val: state[loop].value });
  //     }
  //
  //     for (let i = 0; i < this.resolveData.others.insurance.length; i++) {
  //       let temp = {};
  //       temp['name'] = this.resolveData.others.insurance[i].insurancename;
  //       temp['val'] = this.resolveData.others.insurance[i]._id;
  //       this.insuranceData.push(temp);
  //     }
  //     this.insuranceData.push({ name: 'Others', val: 0 });
  //   }, error => {
  //     console.log('Oooops! Cannot get states.');
  //   });
  // }
  //
  // openSnackBar(message: string, action: string = null) {
  //   this.snackBar.open(message, action, {
  //     duration: 3000,
  //   });
  // }
  //
  // listenFormFieldChange(val: any) {
  //   switch(val.field.name) {
  //     case 'insurance_id':
  //       if(val.fieldval != 0) {
  //         var countFlag: number = 0;
  //         for (let i = 0; i < this.resolveData.others.insurance_type.length; i++) {
  //           for(let j = 0; j < this.resolveData.others.insurance_type[i].insurance_id.length; j++) {
  //             if(val.fieldval == this.resolveData.others.insurance_type[i].insurance_id[j]) {
  //               countFlag++;
  //               let temp: any = {};
  //               temp['name'] = this.resolveData.others.insurance_type[i].insurancetype_name;
  //               temp['val'] = this.resolveData.others.insurance_type[i]._id;
  //               this.insuranceTypeData.push(temp);
  //             }
  //           }
  //         }
  //
  //         if(countFlag == 0) {
  //           this.insuranceTypeData.push({});
  //         }
  //
  //         this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'insurance_name_input' } };
  //         this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'insurance_type_input' } };
  //         this.formfieldrefreshdata = {
  //           field: 'addfromcontrol',
  //           value: {
  //             label: "Insurance type",
  //             name: "insurance_type",
  //             hint: '',
  //             type: 'select',
  //             val: this.insuranceTypeData,
  //             multiple: false,
  //             validations: [
  //               { rule: 'required' }
  //             ],
  //             prefix: "",
  //             suffix: "",
  //             after: 'insurance_id'
  //           }
  //         };
  //       } else {
  //         this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'insurance_type' } };
  //
  //         setTimeout(() => {
  //           this.formfieldrefreshdata = {
  //             field: 'addfromcontrol',
  //             value: {
  //               label: 'Name of the insurance',
  //               name: 'insurance_name_input',
  //               type: 'text',
  //               val: '',
  //               validators: [
  //                 { rule: 'required' }
  //               ],
  //               prefix: "",
  //               suffix: "",
  //               after: 'insurance_id'
  //             }
  //           };
  //         }, 1000);
  //
  //         setTimeout(() => {
  //           this.formfieldrefreshdata = {
  //             field: 'addfromcontrol',
  //             value: {
  //               type: 'text',
  //               name: 'insurance_type_input',
  //               placeholder: 'Insurance type',
  //               label: 'Insurance type',
  //               value: '',
  //               validators: [
  //                 { rule: 'required' }
  //               ],
  //               prefix: "",
  //               suffix: "",
  //               after: 'insurance_name_input'
  //             }
  //           };
  //         }, 2000);
  //       }
  //       break;this.cookiesData
  //     case 'doctor_id':
  //       let data: any = {
  //         "source": "tech_by_doctor_id",
  //         "condition": {
  //           _id_object: val.fieldval
  //         },
  //         "token": this.jwtToken,
  //       };
  //
  //       this.httpService.httpViaPost("datalist", data).subscribe(response => {
  //         // this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'doctor_id' } };
  //         // this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'parent_type' } };
  //         // this.formfieldrefreshdata = { field: 'removefromcontrol', value: { name: 'parent_id' } };
  //
  //         if(response.status == true) {
  //           var techDetails = [];
  //           for (let i = 0; i < response.res.length; i++) {
  //             let temp = {};
  //             temp['name'] = response.res[i].firstname + ' ' + response.res[i].lastname;
  //             temp['val'] = response.res[i]._id;
  //             techDetails.push(temp);
  //           }
  //         }
  //
  //         // set doctor dropdown
  //         setTimeout(() => {
  //           this.formfieldrefreshdata = {
  //             field: 'addfromcontrol',
  //             value: {
  //               label: "Select Tech",
  //               name: "tech_id",
  //               hint: '',
  //               type: 'select',
  //               val: techDetails,
  //               validations: [
  //                 { rule: 'required' }
  //               ],
  //               after: 'doctor_id'
  //             }
  //           };
  //         }, 100);
  //       });
  //       break;
  //     case 'doctor_id':
  //       let data2: any = {
  //         "source": "data_pece",
  //         "condition": {
  //           "_id_object": val.fieldval
  //         },
  //         "token": this.jwtToken,
  //       };
  //
  //       this.httpService.httpViaPost("datalist", data2).subscribe(response => {
  //         if(response.status == true) {
  //           // set parent id and type
  //           let parentData: any = {
  //             "source": "data_pece",
  //             "condition": {
  //               _id_object: val.fieldval
  //             },
  //             "token": this.jwtToken,
  //           };
  //
  //           this.httpService.httpViaPost("datalist", parentData).subscribe(response => {
  //             if(response.status == true) {
  //               if(typeof(response.res[0].parent_type) != 'undefined') {
  //                 setTimeout(() => {
  //                   this.formfieldrefreshdata = {
  //                     field: 'addfromcontrol',
  //                     value: {
  //                       name: "parent_type",
  //                       type: 'hidden',
  //                       value: response.res[0].parent_type
  //                     }
  //                   };
  //                 }, 200);
  //
  //                 setTimeout(() => {
  //                   this.formfieldrefreshdata = {
  //                     field: 'addfromcontrol',
  //                     value: {
  //                       name: "parent_id",
  //                       type: 'hidden',
  //                       value: response.res[0].parent_id
  //                     }
  //                   };
  //                 }, 300);
  //               }
  //             }
  //           });
  //         }
  //       });
  //       break;
  //   }
  // }


  today = moment().format('L');
  states: any = [];

  public configData: any = {
    appName: 'Calendar-Management',
    jwtToken: '',
    baseUrl: 'https://m9mkuic6o9.execute-api.us-east-1.amazonaws.com/dev/api/',
    endPoint: {
      add: 'add-or-update-event-data',
      datalist: 'datalist',
      deleteEvent: 'delete-single-event',
      viewEventSlots: 'view-event-eventdayarr',
      search: 'search',
      countSlot: 'count-slot',
      addToCalendar: 'add-to-calendar-manually',
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
      {text: 'Admin Meetings', value: 1}
    ],
    responseData: '',
    submitAnotherRecord: 'Add New Record',
    patientInfoFormFields: [],
    calendarInfoFormFields: {},
    primaryCondition: {}
  };

  public resolveData;
  public userDetails: any;
  public headerFlag: any;
  public loader: boolean = false;

  public timeslots: any = [];

  constructor(public activatedRoute: ActivatedRoute, public cookieService: CookieService,
              public snackBar: MatSnackBar, public httpRequestService: HttpServiceService) {
    this.headerFlag = this.activatedRoute.snapshot.url[0].path;
  }


  ngOnInit() {
    /******* Get user details from cookies ******/
    this.userDetails = JSON.parse(this.cookieService.get('user_details'));
    this.configData = Object.assign(this.configData, this.userDetails);

    console.log('this.userDetails', this.userDetails);
    this.populateFormFields();

    if (this.cookieService.check('jwtToken')) {
      this.configData.jwtToken = this.cookieService.get('jwtToken');
      this.activatedRoute.data.forEach((data) => {
        this.resolveData = data.eventdayarrData;
        this.configData.responseData = data.eventdayarrData.data;
      });
    } else {
      this.openSnackBar('Token not found');
    }



    // this.configData.primaryCondition = Object.assign(this.configData.primaryCondition, {userid: {$in: [this.userDetails._id]}});

  }

  populateFormFields(): any {
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
        // console.log('insuranceTypeData', insuranceTypeData);

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
                value: ''
              }
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
        // console.log('otherFieldsData', otherFieldsData);

        let patientInfoFormFields: any = [
          {
            type: 'input', name: 'practice_name', placeholder: 'Practice Name', label: 'Practice Name',
            value: '', validators: [Validators.required], error: 'Enter practice name',
            caption: 'Patient General Information'
          },
          {type: 'input', name: 'address', placeholder: 'Address', label: 'Address', value: ''},
          {
            type: 'select', name: 'state', placeholder: 'Select State', label: 'State',
            options: this.states,
            validators: [Validators.required], error: 'Select state'
          },
          {type: 'input', name: 'city', placeholder: 'City', label: 'City', value: ''},
          {type: 'input', name: 'zip', placeholder: 'ZIP', label: 'ZIP', value: ''},
          {
            type: 'input', name: 'patient_name', placeholder: 'Patient Name', label: 'Patient Name',
            value: '', validators: [Validators.required], error: 'Enter patient name'
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
            type: 'input', name: 'patient_email', placeholder: 'Patient Email', label: 'Patient Email',
            value: '', validators: [Validators.required, Validators.email], error: 'Enter patient email'
          },
          {
            type: 'input', name: 'height', placeholder: 'Ex. 6\'10"', label: 'Height',
            value: '', validators: [Validators.required], error: 'Enter patient height'
          },
          {
            type: 'input', name: 'weight', placeholder: 'Ex. 210 lbs', label: 'Weight',
            value: '', validators: [Validators.required], error: 'Enter patient weight'
          },
          {
            type: 'input', name: 'booking_date', placeholder: 'Date', label: 'Booking date',
            value: this.today, disabled: true
          },
          {
            type: 'date', name: 'dob', placeholder: 'Date of Birth', label: 'Date of Birth',
            value: '', validators: [Validators.required], error: 'Enter date of birth of the patient'
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
            caption: 'Insurance Information',
            validators: [Validators.required]
          },
          {
            type: 'select',
            name: 'insurance_type', // name must be insurance_type
            placeholder: 'Insurance type',
            label: 'Insurance type',
            value: '',
            isDependent: true,
            dependentOn: 'insurance_id',
            options: insuranceTypeData,
            validators: [Validators.required]
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

        let calendarInfoFormFields: any = [
          {
            type: 'date', name: 'startdate', placeholder: 'Date of Appointment',
            label: 'Date of Appointment', value: '', minToday: true,
            validators: [Validators.required],
            error: 'Enter Date of Appointment', caption: 'Appointment Schedule'
          },
          {
            type: 'select', name: 'slot', placeholder: 'Time of Appointment',
            label: 'Time of Appointment',
            options: [
              {text: '06:00 AM', value: '06:00 AM'}, {text: '06:30 AM', value: '06:30 AM'},
              {text: '07:00 AM', value: '07:00 AM'}, {text: '07:30 AM', value: '07:30 AM'},
              {text: '08:00 AM', value: '08:00 AM'}, {text: '08:30 AM', value: '08:30 AM'},
              {text: '09:00 AM', value: '09:00 AM'}, {text: '09:30 AM', value: '09:30 AM'},
              {text: '10:00 AM', value: '10:00 AM'}, {text: '10:30 AM', value: '10:30 AM'},
              {text: '11:00 AM', value: '11:00 AM'}, {text: '11:30 AM', value: '11:30 AM'},
              {text: '12:00 PM', value: '12:00 PM'}, {text: '12:30 PM', value: '12:30 PM'},
              {text: '01:00 PM', value: '01:00 PM'}, {text: '01:30 PM', value: '01:30 PM'},
              {text: '02:00 PM', value: '02:00 PM'}, {text: '02:30 PM', value: '02:30 PM'},
              {text: '03:00 PM', value: '03:00 PM'}, {text: '03:30 PM', value: '03:30 PM'},
              {text: '04:00 PM', value: '04:00 PM'}, {text: '04:30 PM', value: '04:30 PM'},
              {text: '05:00 PM', value: '05:00 PM'}, {text: '05:30 PM', value: '05:30 PM'},
              {text: '06:00 PM', value: '06:00 PM'}, {text: '06:30 PM', value: '06:30 PM'},
              {text: '07:00 PM', value: '07:00 PM'}, {text: '07:30 PM', value: '07:30 PM'},
              {text: '08:00 PM', value: '08:00 PM'}, {text: '08:30 PM', value: '08:30 PM'},
              {text: '09:00 PM', value: '09:00 PM'}, {text: '09:30 PM', value: '09:30 PM'},
              {text: '10:00 PM', value: '10:00 PM'}
            ]
          },
          {
            type: 'select', name: 'reqTimezone', label: 'Timezone',
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
          {
            type: 'input', name: 'attendees', placeholder: 'Attendee Email',
            label: 'Attendee Email', value: ''
          },
          {
            type: 'textarea', name: 'additional_notes', placeholder: 'Additional Notes',
            label: 'Additional Notes', value: ''
          }
        ];


        this.httpRequestService.postRequest('get-doctor-info', {condition: {doctors_office_id: this.userDetails._id}}).subscribe((response: any) => {
          let doctorArray = [];
          for (let i = 0; i < response.data.length; i++) {
            let temp = {};
            temp['text'] = response.data[i].firstname + ' ' + response.data[i].lastname;
            temp['value'] = response.data[i]._id;
            temp['parent_id'] = response.data[i].parent_id;
            temp['parent_type'] = response.data[i].parent_type;
            doctorArray.push(temp);
          }

          // console.log('doctorArray', doctorArray);
          calendarInfoFormFields.push(
            {
              type: 'select', name: 'doctor_id', placeholder: 'Select Doctor', label: 'Doctor Name',
              value: '', options: doctorArray, hasChildWithDynamicLoading: true,
              hasAdditionalFieldsWithValue: true,
              additionalFields: ['parent_id', 'parent_type'], // must have additionalFields if hasAdditionalFieldsWithValue is true
              childField: 'tech_id', endpoint: 'get-tech-info', caption: 'Select doctor and tech',
              validators: [Validators.required], error: 'Select doctor'
            },
            {
              type: 'select', name: 'tech_id', placeholder: 'Select Tech', label: 'Tech Name',
              value: '', isDependent: true, loadDynamically: true, options: [],
              validators: [Validators.required], error: 'Select tech'
            }
          );

          let hiddenFields: any = [
            {type: 'input', name: 'doctors_office_id', value: this.userDetails._id, hidden: true},
            {type: 'input', name: 'parent_type', value: response.data.parent_type, hidden: true},
            {type: 'input', name: 'parent_id', value: response.data.parent_id, hidden: true}
            // {type: 'input', name: 'userid', value: this.userDetails._id, hidden: true},
            // {type: 'input', name: 'username', value: this.userDetails.center_name, hidden: true},
            // {type: 'input', name: 'useremail', value: this.userDetails.email, hidden: true}
          ]
          this.configData = Object.assign(this.configData,
            {
              patientInfoFormFields: patientInfoFormFields.concat(autocompleteFields, otherFieldsData,
                checkboxFields, hiddenFields, calendarInfoFormFields)
            }
          );
          console.log('this.configData', this.configData);
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
}
