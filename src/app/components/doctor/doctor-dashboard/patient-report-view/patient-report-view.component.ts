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
import { environment } from '../../../../../environments/environment';

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
  public BMIFlug: number = 0;

  public sliderCount: number = 0;
  public ImageData = [];
  public biller: any = [];
  public selectBiller: any;
  public reportID: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {

    this.userToken = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();

    this.cookiesData = JSON.parse(allcookies.user_details);
    if(typeof this.cookiesData.doctor_signature === 'undefined' && this.cookiesData.type == 'doctor') {
      /* Open modal */
      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Please upload your signature first.",
          button1: { text: "Upload" },
          button2: { text: "Close" },
        }
      }
      this.openModal(modalData);

      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "Upload":
            this.dialogRef.close();
            this.router.navigateByUrl('/doctor/signature-management?view=' + activeRoute.snapshot.params._id);
            break;
          case "Close":
            this.dialogRef.close();
            this.router.navigateByUrl('/doctor/dashboard');
            break;
        }
      });
    }
    this.cookies_id = this.cookiesData._id;
    this.cookies_name = this.cookiesData.firstname;
    this.cookies_lastname = this.cookiesData.lastname;
    this.paramsId = activeRoute.snapshot.params._id;
    // var dateOfBirth = this.datePipe.transform(this.dateofbirth, "dd-MM-yyyy");
    // var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.patientAddEditForm = this.fb.group({
      patientName:        ['', [ Validators.required, Validators.maxLength(30) ]],
      gender:             ['', [ Validators.required ]],
      birthDate:          ['', []],
      physicalOrdering:   ['', []],
      testDate:           ['', []],
      date:               ['', [ Validators.required ]],
      testCompletedDate:  ['', [ Validators.required ]],
      PTGPT:              ['', [ Validators.required ]],
      PTGVLFI:            ['', [ Validators.required ]],
      IR:                 ['', [ Validators.required ]],
      ESRNO:              ['', [ Validators.required ]],
      ESRL:               ['', [ Validators.required ]],
      peakC:              ['', [ Validators.required ]],
      PTGtype:            ['', [ Validators.required ]],
      PTGCVD:             ['', [ Validators.required ]],
      stressI:            ['', [ Validators.required ]],
      RI:                 ['', [ Validators.required ]],
      AIPTG:              ['', [ Validators.required ]],
      CIsCI:              ['', [ Validators.required ]],
      pNN50:              ['', [ Validators.required ]],
      RMSSD:              ['', [ Validators.required ]],
      SDba:               ['', [ Validators.required ]],
      SDda:               ['', [ Validators.required ]],
      DPRS:               ['', [ Validators.required ]],
      ValsR:              ['', [ Validators.required ]],
      BMI:                ['', [ Validators.required ]],
      bloodPressure:      ['', [ Validators.required ]],
      leaveNotes:         ['', [ Validators.required ]],
      systolic:           ['', []],
      diastolic:          ['', []],
      report_type:        ['', []],
      status:             [1, []],
    });
    
    if(this.cookiesData.type == 'admin'){
      this.patientAddEditForm.disable();
    }


    /* Get biller data */
    var data: any = {
      "source": "doctor_to_biller",
      "condition": {
        "_id_object": this.cookies_id
      },
      "token": this.userToken
    };
    this.httpService.httpViaPost("datalist", data).subscribe((response) => {
      if (response.status = "success") {
        this.biller = response.res;
      }
    });
  }

  ngOnInit() {
    if(this.activeRoute.snapshot == null || this.activeRoute.snapshot.url ==null || this.activeRoute.snapshot.url[3]==null || this.activeRoute.snapshot.url[3].path != 'file' ) {
      this.setDefaultValue();
      this.getAllDoctorData();
    } else {
      this.activeRoute.data.forEach((data) => {
        this.ImageData = data.data.res[0].data;
      });
    }
    
  }

  setDefaultValue() {
    this.activeRoute.data.forEach((data) => {
      let reportDetails: any = data.data.res;
      this.techId = reportDetails[0].user_id;
      this.allPatientReportData = reportDetails[0];
      this.BMIFlug = Math.round(reportDetails[0].BMI);
     
      this.ImageData = reportDetails[0].images_url;
     
      this.reportID = reportDetails[0]._id;
      this.patientAddEditForm.controls['patientName'].patchValue(reportDetails[0].patientName);
      this.patientAddEditForm.controls['gender'].patchValue(reportDetails[0].gender);
      this.patientAddEditForm.controls['physicalOrdering'].patchValue(reportDetails[0].doctor_id);
      this.patientAddEditForm.controls['birthDate'].patchValue(reportDetails[0].birthDate);

      //let sDateArr: any = reportDetails[0].testDate.split("-");
      this.patientAddEditForm.controls['testDate'].patchValue(reportDetails[0].testDate);

      // let eDateArr: any = reportDetails[0].testCompletedDate.split("-");
      this.patientAddEditForm.controls['testCompletedDate'].patchValue(reportDetails[0].testCompletedDate);

      this.patientAddEditForm.controls['PTGPT'].patchValue(reportDetails[0].PTGPT);
      this.patientAddEditForm.controls['PTGVLFI'].patchValue(reportDetails[0].PTGVLFI);
      this.patientAddEditForm.controls['IR'].patchValue(reportDetails[0].IR);
      
      // let dateOfBirth: any = reportDetails[0].birthDate;
      // let dobArr: any = dateOfBirth.split("-");
      // this.patientAddEditForm.controls['birthDate'].patchValue(moment([dobArr[2], dobArr[1], dobArr[0]]));

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


      /* Disable fied */
      this.patientAddEditForm.controls['patientName'].disable();
      this.patientAddEditForm.controls['gender'].disable();
      this.patientAddEditForm.controls['physicalOrdering'].disable();
      this.patientAddEditForm.controls['birthDate'].disable();
      this.patientAddEditForm.controls['testDate'].disable();
      this.patientAddEditForm.controls['testCompletedDate'].disable();
      this.patientAddEditForm.controls['PTGPT'].disable();
      this.patientAddEditForm.controls['PTGVLFI'].disable();
      this.patientAddEditForm.controls['IR'].disable();
      this.patientAddEditForm.controls['ESRNO'].disable();
      this.patientAddEditForm.controls['ESRL'].disable();
      this.patientAddEditForm.controls['peakC'].disable();
      this.patientAddEditForm.controls['PTGtype'].disable();
      this.patientAddEditForm.controls['PTGCVD'].disable();
      this.patientAddEditForm.controls['stressI'].disable();
      this.patientAddEditForm.controls['RI'].disable();
      this.patientAddEditForm.controls['AIPTG'].disable();
      this.patientAddEditForm.controls['CIsCI'].disable();
      this.patientAddEditForm.controls['pNN50'].disable();
      this.patientAddEditForm.controls['RMSSD'].disable();
      this.patientAddEditForm.controls['SDba'].disable();
      this.patientAddEditForm.controls['SDda'].disable();
      this.patientAddEditForm.controls['DPRS'].disable();
      this.patientAddEditForm.controls['ValsR'].disable();
      this.patientAddEditForm.controls['BMI'].disable();
      this.patientAddEditForm.controls['bloodPressure'].disable();
      this.patientAddEditForm.controls['leaveNotes'].disable();
      this.patientAddEditForm.controls['status'].disable();
    })
  }

  getAllDoctorData() {
    var data: any = {
      "source": "users_view_doctor",
      "condition": {
        "tech_id_object": this.techId
      },
      "token": this.userToken
    }

    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
      this.allDoctorDataArray = response.res;
    });
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/


  patientAddEditFormSubmit() {
    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }

    const myString  = this.patientAddEditForm.controls.bloodPressure.value;
    const splits    = myString.split('/');
    var startDate   = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
    var dateOfBirth = this.datePipe.transform(this.dateofbirth, "dd-MM-yyyy");
    var endDate     = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
    var dateformat  = this.datePipe.transform(new Date(), "dd-MM-yyyy");

    this.patientAddEditForm.value.testDate = startDate;
    this.patientAddEditForm.value.testCompletedDate = endDate;
    this.patientAddEditForm.value.birthDate = dateOfBirth;
    this.patientAddEditForm.controls['testDate'].patchValue(startDate);
    this.patientAddEditForm.controls['testCompletedDate'].patchValue(endDate);
    this.patientAddEditForm.controls['birthDate'].patchValue(dateOfBirth);
    this.patientAddEditForm.controls['date'].patchValue(dateformat);
    this.patientAddEditForm.controls['systolic'].patchValue(splits[0]);
    this.patientAddEditForm.controls['diastolic'].patchValue(splits[1]);

    delete this.patientAddEditForm.value.bloodPressure;

    if (this.patientAddEditForm.valid) {
      var data: any = {
        "source": "patient_management",
        "data": this.patientAddEditForm.value,
        "sourceobj": ["user_id", "physicalOrdering"],
        "token": this.userToken
      }
      data.data["id"] = this.paramsId;
      this.httpService.httpViaPost("addorupdatedata", data).subscribe((response) => {
        if (response.status = "success") {
          this.formDirective.resetForm();
        }
      });
    }
  }

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
    }
  }

  reportSign(flug: any = 'default') {
    if(typeof this.selectBiller !== 'undefined' && this.selectBiller != '') {
      for(var loop = 0; loop <= this.biller.length - 1; loop++) {
        if(this.biller[loop].biller_id == this.selectBiller) {
          var fullname = this.biller[loop].firstname + ' ' + this.biller[loop].lastname;
        }
      }

      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Do you want to send this report to biller: " + fullname + " ?",
          button1: { text: "Yes" },
          button2: { text: "No" },
        }
      };
      this.openModal(modalData);

      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "Yes":
            var data: any = {
              "source": "patient_management",
              "data": { 
                "doctor_signature": this.cookiesData.doctor_signature, 
                "biller_id": this.selectBiller,
                "download_link" : environment.siteBaseUrl + 'download/super-bill/' + this.reportID,
                "file_path": "",
                "download_password": "",
                "status": 2
              },
              "report_id": this.reportID
            }
            data.data["id"] = this.paramsId;
            this.httpService.httpViaPost("report-sign-send-to-biller", data).subscribe((response) => {
              if (response.status = "success") {
                switch(flug) {
                  case 'back':
                    this.dialogRef.close();
                    this.router.navigateByUrl('/doctor/dashboard');
                    break;
                  case 'next':
                    this.dialogRef.close();
                    this.router.navigateByUrl('/doctor/dashboard');
                    break;
                  default:
                    break;
                }
              }
            });
            break;
          case "No":
            this.dialogRef.close();
            break;
        }
      });
    } else {
      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Select a biller first.",
          button1: { text: "" },
          button2: { text: "OK" },
        }
      }
      this.openModal(modalData);
    }
  }

  setSendBiller() {

  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
  }

  downloadReport(link) {
    window.open(link, "_blank");
  }

}
