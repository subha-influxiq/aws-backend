import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
export interface DialogData {
  message: string;
}
@Component({
  selector: 'app-patient-report-view',
  templateUrl: './patient-report-view.component.html',
  styleUrls: ['./patient-report-view.component.css']
})
export class PatientReportViewComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  public htmlText: any = { nav: 'Add Patient', header: "Physician Report" };
  public buttonText: any = "Submit";
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
    this.paramsId = activeRoute.snapshot.params.id;

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.patientAddEditForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.maxLength(30)]],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      physicalOrdering: [''],
      testDate: ['', Validators.required],
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
      status: [1],
      user_id: []

    })

  }

  ngOnInit() {
    this.activeRoute.data.forEach((data) => {
      this.allPatientReportData = data.data.res;
      console.log("dataaa", this.allPatientReportData);
    })
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  /**modal end here */
  resetAddEditForm() {
    this.formDirective.resetForm();
  }

  patientAddEditFormSubmit() {

    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }
    const myString = this.patientAddEditForm.controls.bloodPressure.value;
    const splits = myString.split('/');
    var startDate = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
    var endDate = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
    var dateOfBirth = this.datePipe.transform(this.dateofbirth, "dd-MM-yyyy");
    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.patientAddEditForm.value.testDate = startDate;
    this.patientAddEditForm.value.testCompletedDate = endDate;
    this.patientAddEditForm.value.birthDate = dateOfBirth;
    this.patientAddEditForm.controls['testDate'].patchValue(startDate);
    this.patientAddEditForm.controls['testCompletedDate'].patchValue(endDate);
    this.patientAddEditForm.controls['birthDate'].patchValue(dateOfBirth);
    this.patientAddEditForm.controls['date'].patchValue(dateformat);
    this.patientAddEditForm.controls['systolic'].patchValue(splits[0]);
    this.patientAddEditForm.controls['diastolic'].patchValue(splits[1]);
    this.patientAddEditForm.controls['user_id'].patchValue(this.cookies_id);
    delete this.patientAddEditForm.value.bloodPressure;

    if (this.patientAddEditForm.valid) {
      var data: any = {
        "source": "patient_management",
        "data": this.patientAddEditForm.value,
        "sourceobj": ["user_id", "physicalOrdering"],
        "token": this.userToken
      }

      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if (response.status = "success") {
          this.formDirective.resetForm();


        }
      });
    }
  }

}
