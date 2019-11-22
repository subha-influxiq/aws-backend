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
  selector: 'app-system-superbill',
  templateUrl: './system-superbill.component.html',
  styleUrls: ['./system-superbill.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class SystemSuperbillComponent implements OnInit {
  public userToken: any;
  public patientSingleData: any = [];
  public patientBMIForm: FormGroup;
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
    var dateformat = datePipe.transform(new Date(), "MM-dd-yyyy");
    console.log("date format",dateformat);

    this.patientBMIForm = this.fb.group({

      patientName: ['', [Validators.required, Validators.maxLength(30)]],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      physicalOrdering: [''],
      testDate: ['', Validators.required],
      testCompletedDate: ['', Validators.required],
      signDate : [dateformat]

    })
    this.getPatientData(this.activatedRoute.snapshot.params._id);
  }

  ngOnInit() {
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  getPatientData(id: any) {
    var data = {
      "source": "patient_management_view_BMI",
      "condition": {
        "_id_object": id
      },
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        console.log(response);
        let patientDetails: any;
        patientDetails = response.res[0];
        this.patientSingleData = response.res;
        console.log("dataaa", patientDetails);
        this.patientBMIForm.controls['patientName'].patchValue(patientDetails.patientName);
        this.patientBMIForm.controls['physicalOrdering'].patchValue(patientDetails.physicalOrdering);
        this.patientBMIForm.controls['gender'].patchValue(patientDetails.gender);
        

        let dateOfBirth: any = this.datePipe.transform(patientDetails.birthDate, "dd-MM-yyyy");
        let dobArr: any = dateOfBirth.split("-");
        this.patientBMIForm.controls['birthDate'].patchValue(moment([dobArr[2], dobArr[1] - 1, dobArr[0]]));

        let sDateArr: any = patientDetails.testDate.split("-");
        this.patientBMIForm.controls['testDate'].patchValue(moment([sDateArr[2], sDateArr[1] - 1, sDateArr[0]]));
        //   let eDateArr: any = patientDetails.testCompletedDate.split("-");
        // this.patientReportViewForm.controls['testCompletedDate'].patchValue(moment([eDateArr[2], eDateArr[1] - 1, eDateArr[0]]));

      })
  }


}
