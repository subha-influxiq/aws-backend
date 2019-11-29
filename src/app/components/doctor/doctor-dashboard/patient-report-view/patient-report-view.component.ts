import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service'
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { CommonFunction } from '../../../../class/common/common-function';

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
export interface DialogData {
  message: string;
}

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
  selector: 'app-patient-report-view',
  templateUrl: './patient-report-view.component.html',
  styleUrls: ['./patient-report-view.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})

export class PatientReportViewComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  public htmlText: any = { nav: 'Add Patient', header: "Physician Report" };
  public buttonText: any = "Update";
  public patientAddEditForm: FormGroup;
  public userToken: any;
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


  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {

    this.userToken = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();

    this.cookiesData = JSON.parse(allcookies.user_details);

    this.cookies_id = this.cookiesData._id;
    this.cookies_name = this.cookiesData.firstname;
    this.cookies_lastname = this.cookiesData.lastname;
    this.paramsId = activeRoute.snapshot.params._id;
    // var dateOfBirth = this.datePipe.transform(this.dateofbirth, "dd-MM-yyyy");
    // var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.patientAddEditForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.maxLength(30)]],
      gender: ['', Validators.required],
      birthDate: [''],
      physicalOrdering: [''],
      testDate: [''],
      date: ['', Validators.required],
      testCompletedDate: ['', Validators.required],
      PTGPT: ['', Validators.required],
      PTGVLFI: ['', Validators.required],
      IR: ['', Validators.required],
      ESRNO: ['', Validators.required],
      ESRL: ['', Validators.required],
      peakC: ['', Validators.required],
      PTGtype: ['', Validators.required],
      PTGCVD: ['', Validators.required],
      stressI: ['', Validators.required],
      RI: ['', Validators.required],
      AIPTG: ['', Validators.required],
      CIsCI: ['', Validators.required],
      pNN50: ['', Validators.required],
      RMSSD: ['', Validators.required],
      SDba: ['', Validators.required],
      SDda: ['', Validators.required],
      DPRS: ['', Validators.required],
      ValsR: ['', Validators.required],
      BMI: ['', Validators.required],
      bloodPressure: ['', Validators.required],
      leaveNotes: ['', Validators.required],
      systolic: [''],
      diastolic: [''],
      report_type: ['', []],
      status: [1],
    });

    console.log('==================', this.router.url);

  }

  ngOnInit() {
    this.setDefaultValue();
    this.getAllDoctorData();
  }


  setDefaultValue() {
    this.activeRoute.data.forEach((data) => {
      let reportDetails: any = data.data.res;
      this.techId = reportDetails[0].user_id;
      this.allPatientReportData = reportDetails[0];
      this.patientAddEditForm.controls['patientName'].patchValue(reportDetails[0].patientName);
      this.patientAddEditForm.controls['gender'].patchValue(reportDetails[0].gender);
      this.patientAddEditForm.controls['physicalOrdering'].patchValue(reportDetails[0].physicalOrdering);

      let sDateArr: any = reportDetails[0].testDate.split("-");
      this.patientAddEditForm.controls['testDate'].patchValue(moment([sDateArr[2], sDateArr[1] - 1, sDateArr[0]]));

      let eDateArr: any = reportDetails[0].testCompletedDate.split("-");
      this.patientAddEditForm.controls['testCompletedDate'].patchValue(moment([eDateArr[2], eDateArr[1] - 1, eDateArr[0]]));

      this.patientAddEditForm.controls['PTGPT'].patchValue(reportDetails[0].PTGPT);
      this.patientAddEditForm.controls['PTGVLFI'].patchValue(reportDetails[0].PTGVLFI);
      this.patientAddEditForm.controls['IR'].patchValue(reportDetails[0].IR);

      let dateOfBirth: any = reportDetails[0].birthDate;
      let dobArr: any = dateOfBirth.split("-");
      this.patientAddEditForm.controls['birthDate'].patchValue(moment([dobArr[2], dobArr[1], dobArr[0]]));

      this.patientAddEditForm.controls['ESRNO'].patchValue(reportDetails[0].ESRNO);
      this.patientAddEditForm.controls['ESRL'].patchValue(reportDetails[0].ESRL);
      this.patientAddEditForm.controls['peakC'].patchValue(reportDetails[0].peakC);
      this.patientAddEditForm.controls['PTGtype'].patchValue(reportDetails[0].PTGtype);
      this.patientAddEditForm.controls['PTGCVD'].patchValue(reportDetails[0].PTGCVD);
      this.patientAddEditForm.controls['stressI'].patchValue(reportDetails[0].stressI);
      this.patientAddEditForm.controls['RI'].patchValue(reportDetails[0].RI);
      this.patientAddEditForm.controls['AIPTG'].patchValue(reportDetails[0].AIPTG);
      this.patientAddEditForm.controls['CIsCI'].patchValue(reportDetails[0].CIsCI);
      this.patientAddEditForm.controls['pNN50'].patchValue(reportDetails[0].pNN50);
      this.patientAddEditForm.controls['RMSSD'].patchValue(reportDetails[0].RMSSD);
      this.patientAddEditForm.controls['SDba'].patchValue(reportDetails[0].SDba);
      this.patientAddEditForm.controls['SDda'].patchValue(reportDetails[0].SDda);
      this.patientAddEditForm.controls['DPRS'].patchValue(reportDetails[0].DPRS);
      this.patientAddEditForm.controls['ValsR'].patchValue(reportDetails[0].ValsR);
      this.patientAddEditForm.controls['BMI'].patchValue(reportDetails[0].BMI);
      this.patientAddEditForm.controls['bloodPressure'].patchValue(reportDetails[0].systolic + "/" + reportDetails[0].diastolic);
      this.patientAddEditForm.controls['leaveNotes'].patchValue(reportDetails[0].leaveNotes);
      this.patientAddEditForm.controls['status'].patchValue(reportDetails[0].status);
    })
  }

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

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/


  // patientAddEditFormSubmit() {

  //   let x: any;
  //   for (x in this.patientAddEditForm.controls) {
  //     this.patientAddEditForm.controls[x].markAsTouched();
  //   }
  //   const myString = this.patientAddEditForm.controls.bloodPressure.value;
  //   const splits = myString.split('/');
  //   var startDate = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
  //   var dateOfBirth = this.datePipe.transform(this.dateofbirth, "dd-MM-yyyy");
  //   var endDate = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
  //   var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
  //   this.patientAddEditForm.value.testDate = startDate;
  //   this.patientAddEditForm.value.testCompletedDate = endDate;
  //   this.patientAddEditForm.value.birthDate = dateOfBirth;
  //   this.patientAddEditForm.controls['testDate'].patchValue(startDate);
  //   this.patientAddEditForm.controls['testCompletedDate'].patchValue(endDate);
  //   this.patientAddEditForm.controls['birthDate'].patchValue(dateOfBirth);
  //   this.patientAddEditForm.controls['date'].patchValue(dateformat);
  //   this.patientAddEditForm.controls['systolic'].patchValue(splits[0]);
  //   this.patientAddEditForm.controls['diastolic'].patchValue(splits[1]);

  //   delete this.patientAddEditForm.value.bloodPressure;

  //   if (this.patientAddEditForm.valid) {
  //     var data: any = {
  //       "source": "patient_management",
  //       "data": this.patientAddEditForm.value,
  //       "sourceobj": ["user_id", "physicalOrdering"],
  //       "token": this.userToken
  //     }
  //     data.data["id"] = this.paramsId;
  //     this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
  //       if (response.status = "success") {
  //         this.formDirective.resetForm();
  //       }
  //     });
  //   }
  // }


  ImageData = [
    "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/10/29232033/report.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMZ4V1jLsEEqFkSvRlnKctb7SDysjaWlyS1GwnHYKCQ4BIKrz3",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRaioLbnw0bnKVx6GL3cae8Sfo-T3Ti1mxKWuyfQPEGarcdXLYZ",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbTiY2TqpRfr-gsyxua6SEOkOuVnOfEPVsrQekzQPS-ilnrXsD",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTE1jjEKgBi-H0qoortELsM8aFLHkoGzOUUw0uOI87_0bj73lpP",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTS06uDfeb32Pfk7GexL0F2nRrwV5_VP1b0J0EGfEnvDFH7zWW1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzySxWg6z-oAeqyRsfjo93588EQHj0l9HOaFOHINdQxwvn_7Aa",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR5zdI98vcz_kFEfxuToukqUOk9lB5asndrt4yKvHxv4WXZ4aGM"
  ]
  public sliderCount: number = 0;

  playSlider(action: string) {

    switch (action) {
      case 'preview':
        if (this.sliderCount == 0) {
          this.sliderCount = this.ImageData.length - 1;
        } else {
          this.sliderCount--;
        }
        break;
      case 'next':
        if (this.sliderCount + 1 == this.ImageData.length) {
          this.sliderCount = 0;
        } else {
          this.sliderCount++;
        }
        break;
      // case 'play':
      //   setTimeout(() => {
      //     if(this.sliderCount + 1 == this.Imagesdelatils.length) {
      //       this.sliderCount = 0;
      //     } else {
      //       this.sliderCount++;
      //     }

      //     this.playSlider('play');
      //   }, 1000);
      //   break;
    }
  }




}
