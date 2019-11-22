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

  // sticky section
  isSticky: boolean = false;
  stickyRight: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }

  constructor(public activatedRoute: ActivatedRoute, public httpService: HttpServiceService,
    public cookie: CookieService, public fb: FormBuilder, public router: Router, public datePipe: DatePipe) {
    console.log('route:: ', this.activatedRoute.snapshot.params._id);
    this.userToken = cookie.get('jwtToken');
    this.getAllDoctorData();
    var dateformat = datePipe.transform(new Date(), "MM-dd-yyyy");
    console.log("date format", dateformat);
    this.patientEncounterForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.maxLength(30)]],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      physicalOrdering: [''],
      healthRisk: [''],
      testDate: ['', Validators.required],
      testCompletedDate: ['', Validators.required],
      signDate: [dateformat],
      I10: [false],
      I739: [false],
      I70209: [false],
      R733: [false],
      E119: [false],
      E1142: [false],
      E1149: [false],
      E1159: [false],
      G603: [false],
      I519: [false],
      AIPTG_H: [''],
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
    })
    this.getPatientData(this.activatedRoute.snapshot.params._id);
    console.log(this.patientEncounterForm.value.I10);
  }

  ngOnInit() {
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  getAllDoctorData() {
    var data = {

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
      "source": "patient_management_view_view_view",
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
        console.log("dataaa", patientDetails);
        this.patientEncounterForm.controls['patientName'].patchValue(patientDetails.patientName);
        this.patientEncounterForm.controls['physicalOrdering'].patchValue(patientDetails.physicalOrdering);
        this.patientEncounterForm.controls['gender'].patchValue(patientDetails.gender);

        this.patientEncounterForm.controls['healthRisk'].patchValue(patientDetails.AIPTG_H + ','
          + patientDetails.AIPTGis_A + ',' + patientDetails.Cl_H + ',' + patientDetails.DPRS_H + ','
          + patientDetails.ValsR_A + ',' + patientDetails.ValsR_H + ',' + patientDetails.cl_A + ','
          + patientDetails.StressI_A + ',' + patientDetails.DPRS_A + ',' + patientDetails.R000
          + ',' + patientDetails.StressI_H);

        if (this.pdata.I10 == 1)
          this.patientEncounterForm.controls['I10'].patchValue(true);
        else
          this.patientEncounterForm.controls['I10'].patchValue(false);


        if (this.pdata.I739 == 1)
          this.patientEncounterForm.controls['I739'].patchValue(true);
        else
          this.patientEncounterForm.controls['I739'].patchValue(false);

        if (this.pdata.I70209 == 1)
          this.patientEncounterForm.controls['I70209'].patchValue(true);
        else
          this.patientEncounterForm.controls['I70209'].patchValue(false);

        if (this.pdata.R733 == 1)
          this.patientEncounterForm.controls['R733'].patchValue(true);
        else
          this.patientEncounterForm.controls['R733'].patchValue(false);

        if (this.pdata.E119 == 1)
          this.patientEncounterForm.controls['E119'].patchValue(true);
        else
          this.patientEncounterForm.controls['E119'].patchValue(false);

        if (this.pdata.E1142 == 1)
          this.patientEncounterForm.controls['E1142'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1142'].patchValue(false);

        if (this.pdata.E1149 == 1)
          this.patientEncounterForm.controls['E1149'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1149'].patchValue(false);

        if (this.pdata.E1159 == 1)
          this.patientEncounterForm.controls['E1159'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1159'].patchValue(false);

        if (this.pdata.G603 == 1)
          this.patientEncounterForm.controls['G603'].patchValue(true);
        else
          this.patientEncounterForm.controls['G603'].patchValue(false);

        if (this.pdata.I519 == 1)
          this.patientEncounterForm.controls['I519'].patchValue(true);
        else
          this.patientEncounterForm.controls['I519'].patchValue(false);

        if (this.pdata.E1041 == 1)
          this.patientEncounterForm.controls['E1041'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1041'].patchValue(false);

        if (this.pdata.E858 == 1)
          this.patientEncounterForm.controls['E858'].patchValue(true);
        else
          this.patientEncounterForm.controls['E858'].patchValue(false);

        if (this.pdata.E1042 == 1)
          this.patientEncounterForm.controls['E1042'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1042'].patchValue(false);

        if (this.pdata.E859 == 1)
          this.patientEncounterForm.controls['E859'].patchValue(true);
        else
          this.patientEncounterForm.controls['E859'].patchValue(false);

        if (this.pdata.E1043 == 1)
          this.patientEncounterForm.controls['E1043'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1043'].patchValue(false);

        if (this.pdata.G230 == 1)
          this.patientEncounterForm.controls['G230'].patchValue(true);
        else
          this.patientEncounterForm.controls['G230'].patchValue(false);

        if (this.pdata.E1044 == 1)
          this.patientEncounterForm.controls['E1044'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1044'].patchValue(false);

        if (this.pdata.G231 == 1)
          this.patientEncounterForm.controls['G231'].patchValue(true);
        else
          this.patientEncounterForm.controls['G231'].patchValue(false);

        if (this.pdata.E1049 == 1)
          this.patientEncounterForm.controls['E1049'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1049'].patchValue(false);

        if (this.pdata.G232 == 1)
          this.patientEncounterForm.controls['G232'].patchValue(true);
        else
          this.patientEncounterForm.controls['G232'].patchValue(false);

        if (this.pdata.E1065 == 1)
          this.patientEncounterForm.controls['E1065'].patchValue(true);
        else
          this.patientEncounterForm.controls['E1065'].patchValue(false);

        if (this.pdata.G238 == 1)
          this.patientEncounterForm.controls['G238'].patchValue(true);
        else
          this.patientEncounterForm.controls['G238'].patchValue(false);




        // this.patientEncounterForm.controls['healthRisk'].patchValue(patientDetails.AIPTG_H);


        let dateOfBirth: any = this.datePipe.transform(patientDetails.birthDate, "dd-MM-yyyy");
        let dobArr: any = dateOfBirth.split("-");
        this.patientEncounterForm.controls['birthDate'].patchValue(moment([dobArr[2], dobArr[1] - 1, dobArr[0]]));

        // let sDateArr: any = patientDetails.testDate.split("-");
        // this.patientBMIForm.controls['testDate'].patchValue(moment([sDateArr[2], sDateArr[1] - 1, sDateArr[0]]));
        //   let eDateArr: any = patientDetails.testCompletedDate.split("-");
        // this.patientReportViewForm.controls['testCompletedDate'].patchValue(moment([eDateArr[2], eDateArr[1] - 1, eDateArr[0]]));

      })
  }

  encounterFormSubmit() {

  }

}
