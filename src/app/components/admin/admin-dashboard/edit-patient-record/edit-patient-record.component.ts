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
  
  public allPatientDataArray: any;
  public htmlText: any = { 
    nav: 'Add Patient',
    header:"Add Report Manually",
    buttonText: "Submit",
  };
  public allCookies: any;
  public patientAddEditForm : FormGroup;
  public dialogRef: any;
  public ImageData = [];
  public paramsId: any;

  public startDate: any;
  public endDate: any;
  public dateOfBirth: any;
  public dateFormat: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {

    this.paramsId = this.activeRoute.snapshot.params._id;

    this.allCookies = this.cookie.getAll();
    this.allCookies.user_details =  JSON.parse(this.allCookies.user_details);

    setTimeout(() => {
      this.getAllDoctorData();
    }, 2000);
      
    this.patientAddEditForm = this.fb.group({
      id                 :  [this.paramsId, [Validators.required]],
      patientName        :  ['', [Validators.required, Validators.maxLength(30)]],
      gender             :  ['', [Validators.required]],
      birthDate          :  ['', [Validators.required]],
      doctor_id          :  ['', [Validators.required]],
      tech_id            :  ['', [Validators.required]],
      testDate           :  ['', [Validators.required]],
      testCompletedDate  :  ['', [Validators.required]],

      PTGPT              :  ['', [Validators.required]],
      PTGPT_value        :  ['', []],
      PTGVLFI            :  ['', [Validators.required]],
      PTGVLFI_value      :  ['', []],
      IR                 :  ['', [Validators.required]],
      IR_value           :  ['', []],
      ESRNO              :  ['', [Validators.required]],
      ESRNO_value        :  ['', []],
      ESRL               :  ['', [Validators.required]],
      ESRL_value         :  ['', []],
      peakC              :  ['', [Validators.required]],
      peakC_value        :  ['', []],
      PTGtype            :  ['', [Validators.required]],
      PTGtype_value      :  ['', []],
      PTGCVD             :  ['', [Validators.required]],
      PTGCVD_value       :  ['', []],
      stressI            :  ['', [Validators.required]],
      stressI_value      :  ['', []],
      RI                 :  ['', [Validators.required]],
      RI_value           :  ['', []],
      AIPTG              :  ['', [Validators.required]],
      AIPTG_value        :  ['', []],
      CIsCI              :  ['', [Validators.required]],
      CIsCI_value        :  ['', []],
      pNN50              :  ['', [Validators.required]],
      pNN50_value        :  ['', []],
      RMSSD              :  ['', [Validators.required]],
      RMSSD_value        :  ['', []],
      SDba               :  ['', [Validators.required]],
      SDba_value         :  ['', []],
      SDda               :  ['', [Validators.required]],
      SDda_value         :  ['', []],
      DPRS               :  ['', [Validators.required]],
      DPRS_value         :  ['', []],
      ValsR              :  ['', [Validators.required]],
      ValsR_value        :  ['', []],
      BMI                :  ['', [Validators.required]],
      BMI_value          :  ['', []],
      bloodPressure      :  ['', [Validators.required]],
      bloodPressure_value:  ['', []],

      leaveNotes         :  ['', [Validators.required]],
      systolic_value     :  ['', []],
      diastolic_value    :  ['', []],
      status             :  [1, []],
      report_type        :  ['mannual', []],
      added_by           :  [this.allCookies.user_details._id, []]
    });
  }

  ngOnInit() {
    this.getAllPatientData();
  }

  getAllDoctorData() {
    var data = {
      "source": "users_view_doctor_list",
      "token": this.allCookies.jwtToken
    }
    this.httpService.httpViaPost('datalist', data).subscribe(response => {
      this.htmlText.allDoctor = response.res;
    });
  }

  getTechList(doctorID: string) {
    var data = {
      "source": "users_view_doctor",
      "condition": {
          "_id_object": doctorID
      },
      "token": this.allCookies.jwtToken
    }
    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
      this.htmlText.allTech = response.res;
    });
  }

  getAllPatientData() {
    this.activeRoute.data.forEach((data) => {
      this.allPatientDataArray = data.patientData.res;
      let patientDetails: any = data.patientData.res;

      this.ImageData = patientDetails[0].images;
      setTimeout(() => {
        this.getTechList(patientDetails[0].doctor_id);
      }, 4000);

      this.patientAddEditForm.controls['patientName'].patchValue(patientDetails[0].patientName);
      this.patientAddEditForm.controls['gender'].patchValue(patientDetails[0].gender);
      this.patientAddEditForm.controls['doctor_id'].patchValue(patientDetails[0].doctor_id);
      this.patientAddEditForm.controls['tech_id'].patchValue(patientDetails[0].tech_id);

      this.patientAddEditForm.controls['report_type'].patchValue(patientDetails[0].report_type);
      
      /* Date marge */
      var date: any = patientDetails[0].birthDate.split('-');
      this.patientAddEditForm.controls['birthDate'].patchValue(moment([date[2], date[0] - 1, date[1]]));
      
      date = patientDetails[0].testDate.split('-');
      this.patientAddEditForm.controls['testDate'].patchValue(moment([date[2], date[0] - 1, date[1]]));
      
      if(patientDetails[0].testCompletedDate != '' && typeof(patientDetails[0].testCompletedDate) != 'undefined') {
        date = patientDetails[0].testCompletedDate.split('-');
        this.patientAddEditForm.controls['testCompletedDate'].patchValue(moment([date[2], date[0] - 1, date[1]]));
      }

      this.patientAddEditForm.controls['PTGPT'].patchValue(patientDetails[0].PTGPT); 
      this.patientAddEditForm.controls['PTGPT_value'].patchValue(patientDetails[0].PTGPT_value); 
      this.patientAddEditForm.controls['PTGVLFI'].patchValue(patientDetails[0].PTGVLFI);
      this.patientAddEditForm.controls['PTGVLFI_value'].patchValue(patientDetails[0].PTGVLFI_value);
      this.patientAddEditForm.controls['IR'].patchValue(patientDetails[0].IR);
      this.patientAddEditForm.controls['IR_value'].patchValue(patientDetails[0].IR_value);
      this.patientAddEditForm.controls['ESRNO'].patchValue(patientDetails[0].ESRNO);
      this.patientAddEditForm.controls['ESRNO_value'].patchValue(patientDetails[0].ESRNO_value);
      this.patientAddEditForm.controls['ESRL'].patchValue(patientDetails[0].ESRL);
      this.patientAddEditForm.controls['ESRL_value'].patchValue(patientDetails[0].ESRL_value);
      this.patientAddEditForm.controls['peakC'].patchValue(patientDetails[0].peakC);
      this.patientAddEditForm.controls['peakC_value'].patchValue(patientDetails[0].peakC_value);
      this.patientAddEditForm.controls['PTGtype'].patchValue(patientDetails[0].PTGtype);
      this.patientAddEditForm.controls['PTGtype_value'].patchValue(patientDetails[0].PTGtype_value);
      this.patientAddEditForm.controls['PTGCVD'].patchValue(patientDetails[0].PTGCVD);
      this.patientAddEditForm.controls['PTGCVD_value'].patchValue(patientDetails[0].PTGCVD_value);
      this.patientAddEditForm.controls['stressI'].patchValue(patientDetails[0].stressI);
      this.patientAddEditForm.controls['stressI_value'].patchValue(patientDetails[0].stressI_value);
      this.patientAddEditForm.controls['RI'].patchValue(patientDetails[0].RI);
      this.patientAddEditForm.controls['RI_value'].patchValue(patientDetails[0].RI_value);
      this.patientAddEditForm.controls['AIPTG'].patchValue(patientDetails[0].AIPTG);
      this.patientAddEditForm.controls['AIPTG_value'].patchValue(patientDetails[0].AIPTG_value);
      this.patientAddEditForm.controls['CIsCI'].patchValue(patientDetails[0].CIsCI);
      this.patientAddEditForm.controls['CIsCI_value'].patchValue(patientDetails[0].CIsCI_value);
      this.patientAddEditForm.controls['pNN50'].patchValue(patientDetails[0].pNN50);
      this.patientAddEditForm.controls['pNN50_value'].patchValue(patientDetails[0].pNN50_value);
      this.patientAddEditForm.controls['RMSSD'].patchValue(patientDetails[0].RMSSD);
      this.patientAddEditForm.controls['RMSSD_value'].patchValue(patientDetails[0].RMSSD_value);
      this.patientAddEditForm.controls['RMSSD'].patchValue(patientDetails[0].RMSSD);
      this.patientAddEditForm.controls['RMSSD_value'].patchValue(patientDetails[0].RMSSD_value);
      this.patientAddEditForm.controls['SDba'].patchValue(patientDetails[0].SDba);
      this.patientAddEditForm.controls['SDba_value'].patchValue(patientDetails[0].SDba_value);
      this.patientAddEditForm.controls['SDda'].patchValue(patientDetails[0].SDda);
      this.patientAddEditForm.controls['SDda_value'].patchValue(patientDetails[0].SDda_value);
      this.patientAddEditForm.controls['DPRS'].patchValue(patientDetails[0].DPRS);
      this.patientAddEditForm.controls['DPRS_value'].patchValue(patientDetails[0].DPRS_value);
      this.patientAddEditForm.controls['ValsR'].patchValue(patientDetails[0].ValsR);
      this.patientAddEditForm.controls['ValsR_value'].patchValue(patientDetails[0].ValsR_value);
      this.patientAddEditForm.controls['BMI'].patchValue(patientDetails[0].BMI);
      this.patientAddEditForm.controls['BMI_value'].patchValue(patientDetails[0].BMI_value);
      this.patientAddEditForm.controls['bloodPressure'].patchValue(patientDetails[0].bloodPressure);
      this.patientAddEditForm.controls['bloodPressure_value'].patchValue(patientDetails[0].systolic_value + "/" + patientDetails[0].diastolic_value);
      this.patientAddEditForm.controls['leaveNotes'].patchValue(patientDetails[0].leaveNotes);
    });
  }

  patientAddEditFormSubmit() {
    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }
 
    if(this.patientAddEditForm.valid) {
      this.patientAddEditForm.value.birthDate = this.datePipe.transform(this.patientAddEditForm.value.birthDate, "MM-dd-yyyy");
      this.patientAddEditForm.value.testDate = this.datePipe.transform(this.patientAddEditForm.value.testDate, "MM-dd-yyyy");
      this.patientAddEditForm.value.testCompletedDate = this.datePipe.transform(this.patientAddEditForm.value.testCompletedDate, "MM-dd-yyyy");
      this.patientAddEditForm.value.date = this.datePipe.transform(this.patientAddEditForm.value.date, "MM-dd-yyyy");

      /* Setup Blood Pressure (systolic, diastolic) */
      const bloodPressure = this.patientAddEditForm.controls.bloodPressure_value.value;
      const systolicDiastolic = bloodPressure.split('/');
      this.patientAddEditForm.controls['systolic_value'].patchValue(systolicDiastolic[0]);
      this.patientAddEditForm.controls['diastolic_value'].patchValue(systolicDiastolic[1]);
      delete this.patientAddEditForm.value.bloodPressure_value;
      
      var data: any = {
        "source" : "patient_management",
        "data" : this.patientAddEditForm.value,
        "sourceobj": ["doctor_id","tech_id"],
        "token" : this.allCookies.jwtToken
      }

      this.httpService.httpViaPost("addorupdatedata",data).subscribe(response=>{
        if(response.status="success") {
          this.formDirective.resetForm();
          /* Open modal */
          let data: any = {
            width: '250px',
            data: { 
              header: "Success",
              message: "Record Saved Updated.",
              button1: { text: "OK" },
              button2: { text: "" },
            }
          }
          this.openDialog(data);
        }  
      });
    }
  }

  openDialog(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch(result) {
        case "OK":
          this.router.navigateByUrl('/tech/dashboard');
          break;
      }
    });
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

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

}
