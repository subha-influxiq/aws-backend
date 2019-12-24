import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
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
  selector: 'app-edit-patient-record',
  templateUrl: './edit-patient-record.component.html',
  styleUrls: ['./edit-patient-record.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})

export class EditPatientRecordComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  public htmlText: any = { nav: 'Add Patient', header: "Physician Report" };
  public patientAddEditForm: FormGroup;
  public user_token: any;
  date = new FormControl(new Date());
  public testDate: any;
  public startdate: any;
  enddate: any;
  dateofbirth: any;
  public dialogRef: any;
  public cookiesData: any = {};
  public cookies_id: any;
  public allDoctorDataArray: any = [];
  public tech_id: any;
  public cookies_name: any;
  public cookies_lastname: any;
  public doctorNameId: any;
  public allTechArray: any = [];
  public userToken: any;
  public allPatientDataArray: any = [];
  public paramsId: any;
  // sticky section
  isSticky: boolean = false;
  stickyRight: boolean = false;

  public ImageData = [];

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 50;
  // }
  public testArray:any=[];

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {

    this.paramsId = this.activeRoute.snapshot.params._id

    this.userToken = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();

    this.cookiesData = JSON.parse(allcookies.user_details);

    this.cookies_id = this.cookiesData._id;
    this.getAllDoctorData();
    this.commonFunction.setTitleMetaTags();

    this.patientAddEditForm = this.fb.group({
      id :[this.paramsId, []],
      patientName: ['', [Validators.required, Validators.maxLength(30)]],
      gender: ['', [Validators.required]],
      birthDate: ['', []],
      doctor_id: ['', []],
      tech_id: ['', []],
      testDate: ['', []],
      date: ['', []],
      testCompletedDate: ['', []],
      PTGPT: ['', [Validators.required]],
      PTGVLFI: ['', []],
      IR: ['', [Validators.required]],
      ESRNO: ['', [Validators.required]],
      ESRL: ['', [Validators.required]],
      peakC: ['', [Validators.required]],
      PTGtype: ['', [Validators.required]],
      PTGCVD: ['', [Validators.required]],
      stressI: ['', [Validators.required]],
      RI: ['', [Validators.required]],
      AIPTG: ['', [Validators.required]],
      CIsCI: ['', [Validators.required]],
      pNN50: ['', [Validators.required]],
      RMSSD: ['', [Validators.required]],
      SDba: ['', [Validators.required]],
      SDda: ['', [Validators.required]],
      DPRS: ['', [Validators.required]],
      ValsR: ['', [Validators.required]],
      BMI: ['', [Validators.required]],
      bloodPressure: ['', []],
      leaveNotes: ['', [Validators.required]],
      systolic: ['', []],
      diastolic: ['', []],
      status: [1, []],
      report_type:['mannual',[]],
      updated_by: [this.cookies_id, []]
    });
  }

  ngOnInit() {
    this.getAllPatientData();
  }
  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  getAllDoctorData() {
    var data = {
      "source": "users_view_doctor_list",
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        let result: any = {};
        result = response.res;
        this.allDoctorDataArray = result;
        // this.getAllPatientData();
      })
  }

  getDoctorId(value: string) {
    this.doctorNameId = value;
    this.getAllTechData();

  }

  getAllTechData() {
    var data = {
      "source": "users_view_doctor",
      "condition": {
        "_id_object": this.doctorNameId
      },
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
        this.allTechArray = response.res;
      });
  }

  getAllPatientData() {
    this.activeRoute.data.forEach((data) => {
      this.allPatientDataArray = data.patientData.res;

      console.log("Array: ", this.allPatientDataArray);
      let patientDetails : any=data.patientData.res;
      console.log("Images: ", patientDetails[0].images);
        this.ImageData = patientDetails[0].images;
        this.getDoctorId(patientDetails[0].doctor_id);

        this.patientAddEditForm.controls['patientName'].patchValue(patientDetails[0].patientName);
        this.patientAddEditForm.controls['gender'].patchValue(patientDetails[0].gender);
        this.patientAddEditForm.controls['doctor_id'].patchValue(patientDetails[0].doctor_id);
        this.patientAddEditForm.controls['tech_id'].patchValue(patientDetails[0].tech_id);
  
        /* Date of birth */
        let dateArr: any = patientDetails[0].birthDate.split("-");
        this.dateofbirth = moment([dateArr[2], dateArr[1] - 1, dateArr[0]]);

        /* Test Date */
        dateArr = patientDetails[0].testDate.split("-");
        this.startdate = moment([dateArr[2], dateArr[1] - 1, dateArr[0]]);
        
        /* Test complete date */
        dateArr = patientDetails[0].testCompletedDate.split("-");
        this.enddate = moment([dateArr[2], dateArr[1] - 1, dateArr[0]]);

        this.patientAddEditForm.controls['report_type'].patchValue(patientDetails[0].report_type);
        this.patientAddEditForm.controls['PTGPT'].patchValue(patientDetails[0].PTGPT); 
        this.patientAddEditForm.controls['PTGVLFI'].patchValue(patientDetails[0].PTGVLFI);
        this.patientAddEditForm.controls['IR'].patchValue(patientDetails[0].IR);
        this.patientAddEditForm.controls['ESRNO'].patchValue(patientDetails[0].ESRNO);
        this.patientAddEditForm.controls['ESRL'].patchValue(patientDetails[0].ESRL);
        this.patientAddEditForm.controls['peakC'].patchValue(patientDetails[0].peakC);
        this.patientAddEditForm.controls['PTGtype'].patchValue(patientDetails[0].PTGtype);
        this.patientAddEditForm.controls['PTGCVD'].patchValue(patientDetails[0].PTGCVD);
        this.patientAddEditForm.controls['stressI'].patchValue(patientDetails[0].stressI);
        this.patientAddEditForm.controls['RI'].patchValue(patientDetails[0].RI);
        this.patientAddEditForm.controls['AIPTG'].patchValue(patientDetails[0].AIPTG);
        this.patientAddEditForm.controls['CIsCI'].patchValue(patientDetails[0].CIsCI);
        this.patientAddEditForm.controls['pNN50'].patchValue(patientDetails[0].pNN50);
        this.patientAddEditForm.controls['RMSSD'].patchValue(patientDetails[0].RMSSD);
        this.patientAddEditForm.controls['RMSSD'].patchValue(patientDetails[0].RMSSD);
        this.patientAddEditForm.controls['SDba'].patchValue(patientDetails[0].SDba);
        this.patientAddEditForm.controls['SDda'].patchValue(patientDetails[0].SDda);
        this.patientAddEditForm.controls['DPRS'].patchValue(patientDetails[0].DPRS);
        this.patientAddEditForm.controls['ValsR'].patchValue(patientDetails[0].ValsR);
        this.patientAddEditForm.controls['BMI'].patchValue(patientDetails[0].BMI);
        this.patientAddEditForm.controls['bloodPressure'].patchValue(patientDetails[0].systolic+"/"+patientDetails[0].diastolic);
        this.patientAddEditForm.controls['leaveNotes'].patchValue(patientDetails[0].leaveNotes);
    });
  }


  patientAddEditFormSubmit() {
    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }
    const myString = this.patientAddEditForm.controls.bloodPressure.value;
    const splits = myString.split('/');
    var startDate = this.datePipe.transform(this.startdate, "MM-dd-yyyy");
    var endDate = this.datePipe.transform(this.enddate, "MM-dd-yyyy");
    var dateOfBirth = this.datePipe.transform(this.dateofbirth, "MM-dd-yyyy");
    var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
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
        "sourceobj": ["doctor_id", "tech_id"],
        "token": this.userToken
      }

      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if (response.status = "success") {
          this.router.navigateByUrl('/admin/dashboard');
        }
      });
    } else {
      console.log("Not submited: ", this.patientAddEditForm.value);
    }
  }

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
    }
  }

}
