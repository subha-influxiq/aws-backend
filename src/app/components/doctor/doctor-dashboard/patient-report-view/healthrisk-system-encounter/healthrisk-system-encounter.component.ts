import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-healthrisk-system-encounter',
  templateUrl: './healthrisk-system-encounter.component.html',
  styleUrls: ['./healthrisk-system-encounter.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class HealthriskSystemEncounterComponent implements OnInit {

  public userToken: any;
  public patientSingleData: any = [];
  public patientEncounterForm: FormGroup;
  date = new FormControl(new Date());
  public testDate: any;
  startdate: any;
  enddate: any;
  dateofbirth: any;
  public dialogRef: any;
  public cookiesData: any = {};
  public cookies_id: any;
  public allDoctorDataArray: any = [];
  public tech_id: any;
  public cookies_name: any;
  public cookies_lastname: any;
  public allPatientReportData: any = [];
  public paramsId: any;
  public techId: any;
  public pdata: any = null;

  public R000Text: string = "R00.0 Tachycardia, unspecified Abnormal Heart Rhythm & Electrical Stability";
  // sticky section
  isSticky: boolean = false;
  stickyRight: boolean = false;

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 50;
  // }

  constructor(public activatedRoute: ActivatedRoute, public httpService: HttpServiceService, public cookie: CookieService, public fb: FormBuilder, public router: Router, public datePipe: DatePipe) {
    this.userToken = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);

    this.getAllDoctorData();
    var dateformat = datePipe.transform(new Date(), "MM-dd-yyyy");
    this.patientEncounterForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.maxLength(30)]],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      physicalOrdering: [''],
      doctor_signature: ['', Validators.required],
      prefix_95923: [true],
      prefix_95943: [true],
      prefix_95921: [true],
      prefix_93923: [true],
      prefix_93922: [true],
      no_diagnosis_detected: [false],

      //old
      E1040: [false],
      E854: [false],
      E1041: [false],
      E858: [false],
      E1042: [false],
      E859: [false],
      E1043: [false],
      G230: [false],
      E1044: [false],
      G231: [false],
      E1049: [false],
      G232: [false],
      E1065: [false],
      G238: [false],
      E10610: [false],
      G603: [false],
      E119: [false],
      G608: [false],
      E1141: [false],
      G609: [false],
      E1142: [false],
      R7301: [false],
      R202: [false],
      E1143: [false],
      R7303: [false],
      G9009: [false],
      E1144: [false],
      G9050: [false],
      E1149: [false],
      G9059: [false],
      E1159: [false],
      G903: [false],
      E1165: [false],
      R733: [false],
      E1340: [false],
      G90511: [false],
      E1341: [false],
      G90512: [false],
      E1342: [false],
      G90513: [false],
      E1343: [false],
      G90519: [false],
      E1344: [false],
      G90521: [false],
      E1349: [false],
      G90522: [false],
      E13610: [false],
      G90523: [false],
      E850: [false],
      G90529: [false],
      E851: [false],
      R61: [false],
      E852: [false],
      E853: [false],

      I700: [false],
      I7025: [false],
      I70209: [false],
      I0269: [false],
      I70219: [false],
      I70399: [false],
      I7022: [false],
      I70499: [false],
      R000: [false],
      I70599: [false],
      R55: [false],
      I519: [false],
      I251: [false],
      I721: [false],
      healthRisk: [''],
      I723: [false],
      I724: [false],
      I739: [false],
      Z139: [false],
      I10: [false],
      prefix_1951: [false],

      //new
      E0840: [false],
      R0889: [false],
      I70213: [false],
      G629: [false],
      I70212: [false],
      G200: [false],
      I7389: [false],
      I70211: [false],
      E1059: [false],
      I70222: [false],
      I2510: [false],
      I70268: [false],
      I70223: [false],
      G458: [false],
      I70228: [false],

      additional_chart_notes: [],

      testDate: ['', Validators.required],

      signDate: [dateformat],

      AIPTG_H: [''],
    });
    if (this.cookiesData.type == 'admin') {
      this.patientEncounterForm.disable();
    }
    this.getPatientData(this.activatedRoute.snapshot.params._id);
  }

  ngOnInit() {
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  getAllDoctorData() {
    var data: any = {
      "source": "users_view_doctor",
      "condition": {
        "tech_id_object": this.techId
      },
      "token": this.userToken
    }

    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        let result: any = {};
        result = response.res;
        this.allDoctorDataArray = result;

      })
  }

  getPatientData(id: any) {
    var data = {
      "source": "patient_management_condition_view",
      "condition": {
        "_id_object": id
      },
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe((response) => {
        let patientDetails: any = {};
        patientDetails = response.res[0];
        this.pdata = response.res[0];
        this.patientSingleData = response.res;
        console.log("encounter form dataaa", this.patientSingleData);
        this.patientEncounterForm.controls['patientName'].patchValue(patientDetails.patientName);
        this.patientEncounterForm.controls['physicalOrdering'].patchValue(patientDetails.doctor_name);
        this.patientEncounterForm.controls['doctor_signature'].patchValue(patientDetails.doctor_signature);
        this.patientEncounterForm.controls['gender'].patchValue(patientDetails.gender);
        this.patientEncounterForm.controls['testDate'].patchValue(patientDetails.testDate);
        this.patientEncounterForm.controls['birthDate'].patchValue(patientDetails.birthDate);

        let fieldText: string = '';
        console.log('patientDetails', patientDetails);
        if (patientDetails.AIPTG_H != 0)
          fieldText += '** ' + patientDetails.AIPTG_H + '\n\n';
        if (patientDetails.AIPTGis_A != 0)
          fieldText += '** ' + patientDetails.AIPTGis_A + '\n\n';
        if (patientDetails.Cl_H != 0)
          fieldText += '** ' + patientDetails.Cl_H + '\n\n';
        if (patientDetails.DPRS_H != 0)
          fieldText += '** ' + patientDetails.DPRS_H + '\n\n';
        if (patientDetails.ValsR_A != 0)
          fieldText += '** ' + patientDetails.ValsR_A + '\n\n';
        if (patientDetails.ValsR_H != 0)
          fieldText += '** ' + patientDetails.ValsR_H + '\n\n';
        if (patientDetails.Cl_A != 0)
          fieldText += '** ' + patientDetails.Cl_A + '\n\n';
        if (patientDetails.StressI_A != 0)
          fieldText += '** ' + patientDetails.StressI_A + '\n\n';
        if (patientDetails.DPRS_A != 0)
          fieldText += '** ' + patientDetails.DPRS_A + '\n\n';
        // if (patientDetails.R000 != 0) {
        //   // fieldText += '** ' + this.pdata.R000 + '\n\n';
        //   // console.log('fieldText', fieldText);
        // }
        if (patientDetails.StressI_H != 0)
          fieldText += '** ' + patientDetails.StressI_H + '\n\n';

        if (patientDetails.SDbais_A_H != 0)
          fieldText += '** ' + patientDetails.SDbais_A_H + '\n\n';

        if (patientDetails.SDda_H != 0)
          fieldText += '** ' + patientDetails.SDda_H + '\n\n';

        if (patientDetails.SDdais_A != 0)
          fieldText += '** ' + patientDetails.SDdais_A + '\n\n';

        // console.log('this.pdata.AIPTG_H', fieldText);

        this.patientEncounterForm.controls['healthRisk'].patchValue(fieldText);

      if (this.pdata.I10 == 1)
        this.patientEncounterForm.controls['I10'].patchValue(true);

      if (this.pdata.I739 == 1)
        this.patientEncounterForm.controls['I739'].patchValue(true);

      if (this.pdata.I70209 == 1)
        this.patientEncounterForm.controls['I70209'].patchValue(true);

      if (this.pdata.R733 == 1)
        this.patientEncounterForm.controls['R733'].patchValue(true);

      if (this.pdata.E119 == 1)
        this.patientEncounterForm.controls['E119'].patchValue(true);

      if (this.pdata.E1142 == 1)
        this.patientEncounterForm.controls['E1142'].patchValue(true);

      if (this.pdata.E1149 == 1)
        this.patientEncounterForm.controls['E1149'].patchValue(true);

      if (this.pdata.E1159 == 1)
        this.patientEncounterForm.controls['E1159'].patchValue(true);

      if (this.pdata.G603 == 1)
        this.patientEncounterForm.controls['G603'].patchValue(true);

        if (this.pdata.I519 == 1)
          this.patientEncounterForm.controls['I519'].patchValue(true);

        if (this.pdata.E1041 == 1)
          this.patientEncounterForm.controls['E1041'].patchValue(true);

        if (this.pdata.E858 == 1)
          this.patientEncounterForm.controls['E858'].patchValue(true);

        if (this.pdata.E1042 == 1)
          this.patientEncounterForm.controls['E1042'].patchValue(true);

        if (this.pdata.E859 == 1)
          this.patientEncounterForm.controls['E859'].patchValue(true);

        if (this.pdata.E1043 == 1)
          this.patientEncounterForm.controls['E1043'].patchValue(true);

        if (this.pdata.G230 == 1)
          this.patientEncounterForm.controls['G230'].patchValue(true);

        if (this.pdata.E1044 == 1)
          this.patientEncounterForm.controls['E1044'].patchValue(true);

        if (this.pdata.G231 == 1)
          this.patientEncounterForm.controls['G231'].patchValue(true);

        if (this.pdata.E1049 == 1)
          this.patientEncounterForm.controls['E1049'].patchValue(true);

        if (this.pdata.G232 == 1)
          this.patientEncounterForm.controls['G232'].patchValue(true);

        if (this.pdata.E1065 == 1)
          this.patientEncounterForm.controls['E1065'].patchValue(true);

        if (this.pdata.G238 == 1)
          this.patientEncounterForm.controls['G238'].patchValue(true);

        if (this.pdata.I251 == 1)
          this.patientEncounterForm.controls['I251'].patchValue(true);

        if (this.pdata.R000 != 0) {
          this.patientEncounterForm.controls['R000'].patchValue(true);
          this.R000Text = "R00.0 Tachycardia, unspecified " + this.pdata.R000;
          console.log(this.R000Text);
        }

        if (this.pdata.E0840 == 1) {
          this.patientEncounterForm.controls['E0840'].patchValue(true);
          
        }
        if (this.pdata.R0889 == 1)
          this.patientEncounterForm.controls['E0840'].patchValue(true);

        if (this.pdata.I70213 == 1)
          this.patientEncounterForm.controls['I70213'].patchValue(true);

        if (this.pdata.G629 == 1)
          this.patientEncounterForm.controls['G629'].patchValue(true);

        if (this.pdata.I70212 == 1)
          this.patientEncounterForm.controls['I70212'].patchValue(true);

        if (this.pdata.G200 == 1)
          this.patientEncounterForm.controls['G200'].patchValue(true);

        if (this.pdata.I7389 == 1)
          this.patientEncounterForm.controls['E0840'].patchValue(true);

        if (this.pdata.I70211 == 1)
          this.patientEncounterForm.controls['I70211'].patchValue(true);

        if (this.pdata.E1059 == 1)
          this.patientEncounterForm.controls['E1059'].patchValue(true);

        if (this.pdata.I70222 == 1)
          this.patientEncounterForm.controls['I70222'].patchValue(true);

        if (this.pdata.I2510 == 1)
          this.patientEncounterForm.controls['I2510'].patchValue(true);

        if (this.pdata.I70268 == 1)
          this.patientEncounterForm.controls['I70268'].patchValue(true);

        if (this.pdata.I70223 == 1)
          this.patientEncounterForm.controls['I70223'].patchValue(true);

        if (this.pdata.G458 == 1)
          this.patientEncounterForm.controls['G458'].patchValue(true);

        if (this.pdata.I70228 == 1)
          this.patientEncounterForm.controls['I70228'].patchValue(true);

        /* After complete all patch value */
        if (this.patientEncounterForm.value.E1040 == false &&
          this.patientEncounterForm.value.E854 == false &&
          this.patientEncounterForm.value.E1041 == false &&
          this.patientEncounterForm.value.E858 == false &&
          this.patientEncounterForm.value.E1042 == false &&
          this.patientEncounterForm.value.E859 == false &&
          this.patientEncounterForm.value.E1043 == false &&
          this.patientEncounterForm.value.G230 == false &&
          this.patientEncounterForm.value.E1044 == false &&
          this.patientEncounterForm.value.G231 == false &&
          this.patientEncounterForm.value.E1049 == false &&
          this.patientEncounterForm.value.G232 == false &&
          this.patientEncounterForm.value.E1065 == false &&
          this.patientEncounterForm.value.G238 == false &&
          this.patientEncounterForm.value.E10610 == false &&
          this.patientEncounterForm.value.G603 == false &&
          this.patientEncounterForm.value.E119 == false &&
          this.patientEncounterForm.value.G608 == false &&
          this.patientEncounterForm.value.E1141 == false &&
          this.patientEncounterForm.value.G609 == false &&
          this.patientEncounterForm.value.E1142 == false &&
          this.patientEncounterForm.value.R202 == false &&
          this.patientEncounterForm.value.E1143 == false &&
          this.patientEncounterForm.value.G9009 == false &&
          this.patientEncounterForm.value.E1144 == false &&
          this.patientEncounterForm.value.G9050 == false &&
          this.patientEncounterForm.value.E1149 == false &&
          this.patientEncounterForm.value.G9059 == false &&
          this.patientEncounterForm.value.E1159 == false &&
          this.patientEncounterForm.value.G903 == false &&
          this.patientEncounterForm.value.E1165 == false &&
          this.patientEncounterForm.value.R733 == false &&
          this.patientEncounterForm.value.E1340 == false &&
          this.patientEncounterForm.value.G90511 == false &&
          this.patientEncounterForm.value.E1341 == false &&
          this.patientEncounterForm.value.G90512 == false &&
          this.patientEncounterForm.value.E1342 == false &&
          this.patientEncounterForm.value.G90513 == false &&
          this.patientEncounterForm.value.E1343 == false &&
          this.patientEncounterForm.value.G90519 == false &&
          this.patientEncounterForm.value.E1344 == false &&
          this.patientEncounterForm.value.G90521 == false &&
          this.patientEncounterForm.value.E1349 == false &&
          this.patientEncounterForm.value.G90522 == false &&
          this.patientEncounterForm.value.E13610 == false &&
          this.patientEncounterForm.value.G90523 == false &&
          this.patientEncounterForm.value.E850 == false &&
          this.patientEncounterForm.value.G90529 == false &&
          this.patientEncounterForm.value.E851 == false &&
          this.patientEncounterForm.value.R61 == false &&
          this.patientEncounterForm.value.E852 == false &&
          this.patientEncounterForm.value.E853 == false) {
          // Set false value
          this.patientEncounterForm.controls['prefix_95923'].patchValue(false);
          this.patientEncounterForm.controls['prefix_95921'].patchValue(false);
        }

        if (this.patientEncounterForm.value.I700 == false &&
          this.patientEncounterForm.value.I7025 == false &&
          this.patientEncounterForm.value.I70209 == false &&
          this.patientEncounterForm.value.I0269 == false &&
          this.patientEncounterForm.value.I70219 == false &&
          this.patientEncounterForm.value.I70399 == false &&
          this.patientEncounterForm.value.I7022 == false &&
          this.patientEncounterForm.value.I70499 == false &&
          this.patientEncounterForm.value.R000 == false &&
          this.patientEncounterForm.value.I70599 == false &&
          this.patientEncounterForm.value.R55 == false &&
          this.patientEncounterForm.value.I519 == false &&
          this.patientEncounterForm.value.I251 == false &&
          this.patientEncounterForm.value.I721 == false &&
          this.patientEncounterForm.value.I723 == false &&
          this.patientEncounterForm.value.I724 == false &&
          this.patientEncounterForm.value.I739 == false &&
          this.patientEncounterForm.value.Z139 == false &&
          this.patientEncounterForm.value.I10 == false &&
          this.patientEncounterForm.value.prefix_1951 == false) {
          // Set false value
          this.patientEncounterForm.controls['prefix_93923'].patchValue(false);
        }

        if (this.patientEncounterForm.controls['prefix_95923'].value == false && 
            this.patientEncounterForm.controls['prefix_95921'].value == false && 
            this.patientEncounterForm.controls['prefix_93923'].value == false) {
          this.patientEncounterForm.controls['no_diagnosis_detected'].patchValue(true);
        }
      }

    //   if (this.pdata.E1041 == 1)
    //     this.patientEncounterForm.controls['E1041'].patchValue(true);

    //   if (this.pdata.E858 == 1)
    //     this.patientEncounterForm.controls['E858'].patchValue(true);

    //   if (this.pdata.E1042 == 1)
    //     this.patientEncounterForm.controls['E1042'].patchValue(true);

    //   if (this.pdata.E859 == 1)
    //     this.patientEncounterForm.controls['E859'].patchValue(true);

    //   if (this.pdata.E1043 == 1)
    //     this.patientEncounterForm.controls['E1043'].patchValue(true);

    //   if (this.pdata.G230 == 1)
    //     this.patientEncounterForm.controls['G230'].patchValue(true);

    //   if (this.pdata.E1044 == 1)
    //     this.patientEncounterForm.controls['E1044'].patchValue(true);

    //   if (this.pdata.G231 == 1)
    //     this.patientEncounterForm.controls['G231'].patchValue(true);

    //   if (this.pdata.E1049 == 1)
    //     this.patientEncounterForm.controls['E1049'].patchValue(true);

    //   if (this.pdata.G232 == 1)
    //     this.patientEncounterForm.controls['G232'].patchValue(true);

    //   if (this.pdata.E1065 == 1)
    //     this.patientEncounterForm.controls['E1065'].patchValue(true);

    //   if (this.pdata.G238 == 1)
    //     this.patientEncounterForm.controls['G238'].patchValue(true);

    //   if (this.pdata.I251 == 1)
    //     this.patientEncounterForm.controls['I251'].patchValue(true);

    //   if (this.pdata.R000 != 0) {
    //     this.patientEncounterForm.controls['R000'].patchValue(true);
    //     this.R000Text = "R00.0 Tachycardia, unspecified " + this.pdata.R000;
    //     console.log(this.R000Text);
    //   }

    //   if (this.pdata.E0840 == 1)
    //     this.patientEncounterForm.controls['E0840'].patchValue(true);

    //   if (this.pdata.R0889 == 1)
    //     this.patientEncounterForm.controls['E0840'].patchValue(true);

    //   if (this.pdata.I70213 == 1)
    //     this.patientEncounterForm.controls['I70213'].patchValue(true);

    //   if (this.pdata.G629 == 1)
    //     this.patientEncounterForm.controls['G629'].patchValue(true);

    //   if (this.pdata.I70212 == 1)
    //     this.patientEncounterForm.controls['I70212'].patchValue(true);

    //   if (this.pdata.G200 == 1)
    //     this.patientEncounterForm.controls['G200'].patchValue(true);

    //   if (this.pdata.I7389 == 1)
    //     this.patientEncounterForm.controls['E0840'].patchValue(true);

    //   if (this.pdata.I70211 == 1)
    //     this.patientEncounterForm.controls['I70211'].patchValue(true);

    //   if (this.pdata.E1059 == 1)
    //     this.patientEncounterForm.controls['E1059'].patchValue(true);

    //   if (this.pdata.I70222 == 1)
    //     this.patientEncounterForm.controls['I70222'].patchValue(true);

    //   if (this.pdata.I2510 == 1)
    //     this.patientEncounterForm.controls['I2510'].patchValue(true);

    //   if (this.pdata.I70268 == 1)
    //     this.patientEncounterForm.controls['I70268'].patchValue(true);

    //   if (this.pdata.I70223 == 1)
    //     this.patientEncounterForm.controls['I70223'].patchValue(true);

    //   if (this.pdata.G458 == 1)
    //     this.patientEncounterForm.controls['G458'].patchValue(true);

    //   if (this.pdata.I70228 == 1)
    //     this.patientEncounterForm.controls['I70228'].patchValue(true);

    //   /* After complete all patch value */
    //   if (this.patientEncounterForm.value.E1040 == false ||
    //     this.patientEncounterForm.value.E854 == false ||
    //     this.patientEncounterForm.value.E1041 == false ||
    //     this.patientEncounterForm.value.E858 == false ||
    //     this.patientEncounterForm.value.E1042 == false ||
    //     this.patientEncounterForm.value.E859 == false ||
    //     this.patientEncounterForm.value.E1043 == false ||
    //     this.patientEncounterForm.value.G230 == false ||
    //     this.patientEncounterForm.value.E1044 == false ||
    //     this.patientEncounterForm.value.G231 == false ||
    //     this.patientEncounterForm.value.E1049 == false ||
    //     this.patientEncounterForm.value.G232 == false ||
    //     this.patientEncounterForm.value.E1065 == false ||
    //     this.patientEncounterForm.value.G238 == false ||
    //     this.patientEncounterForm.value.E10610 == false ||
    //     this.patientEncounterForm.value.G603 == false ||
    //     this.patientEncounterForm.value.E119 == false ||
    //     this.patientEncounterForm.value.G608 == false ||
    //     this.patientEncounterForm.value.E1141 == false ||
    //     this.patientEncounterForm.value.G609 == false ||
    //     this.patientEncounterForm.value.E1142 == false ||
    //     this.patientEncounterForm.value.R202 == false ||
    //     this.patientEncounterForm.value.E1143 == false ||
    //     this.patientEncounterForm.value.G9009 == false ||
    //     this.patientEncounterForm.value.E1144 == false ||
    //     this.patientEncounterForm.value.G9050 == false ||
    //     this.patientEncounterForm.value.E1149 == false ||
    //     this.patientEncounterForm.value.G9059 == false ||
    //     this.patientEncounterForm.value.E1159 == false ||
    //     this.patientEncounterForm.value.G903 == false ||
    //     this.patientEncounterForm.value.E1165 == false ||
    //     this.patientEncounterForm.value.R733 == false ||
    //     this.patientEncounterForm.value.E1340 == false ||
    //     this.patientEncounterForm.value.G90511 == false ||
    //     this.patientEncounterForm.value.E1341 == false ||
    //     this.patientEncounterForm.value.G90512 == false ||
    //     this.patientEncounterForm.value.E1342 == false ||
    //     this.patientEncounterForm.value.G90513 == false ||
    //     this.patientEncounterForm.value.E1343 == false ||
    //     this.patientEncounterForm.value.G90519 == false ||
    //     this.patientEncounterForm.value.E1344 == false ||
    //     this.patientEncounterForm.value.G90521 == false ||
    //     this.patientEncounterForm.value.E1349 == false ||
    //     this.patientEncounterForm.value.G90522 == false ||
    //     this.patientEncounterForm.value.E13610 == false ||
    //     this.patientEncounterForm.value.G90523 == false ||
    //     this.patientEncounterForm.value.E850 == false ||
    //     this.patientEncounterForm.value.G90529 == false ||
    //     this.patientEncounterForm.value.E851 == false ||
    //     this.patientEncounterForm.value.R61 == false ||
    //     this.patientEncounterForm.value.E852 == false ||
    //     this.patientEncounterForm.value.E853 == false) {
    //     // Set false value
    //     this.patientEncounterForm.value.prefix_95923 = false;
    //     this.patientEncounterForm.value.prefix_95921 = false;
    //   }

    //   if (this.patientEncounterForm.value.I700 == false ||
    //     this.patientEncounterForm.value.I7025 == false ||
    //     this.patientEncounterForm.value.I70209 == false ||
    //     this.patientEncounterForm.value.I0269 == false ||
    //     this.patientEncounterForm.value.I70219 == false ||
    //     this.patientEncounterForm.value.I70399 == false ||
    //     this.patientEncounterForm.value.I7022 == false ||
    //     this.patientEncounterForm.value.I70499 == false ||
    //     this.patientEncounterForm.value.R000 == false ||
    //     this.patientEncounterForm.value.I70599 == false ||
    //     this.patientEncounterForm.value.R55 == false ||
    //     this.patientEncounterForm.value.I519 == false ||
    //     this.patientEncounterForm.value.I251 == false ||
    //     this.patientEncounterForm.value.I721 == false ||
    //     this.patientEncounterForm.value.I723 == false ||
    //     this.patientEncounterForm.value.I724 == false ||
    //     this.patientEncounterForm.value.I739 == false ||
    //     this.patientEncounterForm.value.Z139 == false ||
    //     this.patientEncounterForm.value.I10 == false ||
    //     this.patientEncounterForm.value.prefix_1951 == false) {
    //     // Set false value
    //     this.patientEncounterForm.value.prefix_93923 = false;
    //   }

    //   if (this.patientEncounterForm.value.prefix_95923 == false || this.patientEncounterForm.value.prefix_95921 == false || this.patientEncounterForm.value.prefix_93923 == false) {
    //     this.patientEncounterForm.value.no_diagnosis_detected = true;
    //   }
    // });
  }
  
}
