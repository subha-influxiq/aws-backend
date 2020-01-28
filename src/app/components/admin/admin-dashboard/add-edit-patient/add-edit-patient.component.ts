import { Component, OnInit, Inject, ViewChild, HostListener} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service'
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonFunction } from '../../../../class/common/common-function';
import * as moment from 'moment';
<<<<<<< HEAD
import 'moment/locale/pt-br';
=======
>>>>>>> a4e1f4a4fe211f5d3a735106b30e90ce8b9aec38

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.css']
})

@HostListener('window:scroll', ['$event'])

export class AddEditPatientComponent implements OnInit {
  
  @ViewChild(FormGroupDirective,{static: false}) formDirective: FormGroupDirective;
  
  public htmlText: any = { 
    nav: 'Add Patient',
    header:"Add Report Manually",
    buttonText: "Submit",
  };
  public allCookies: any;
  public patientAddEditForm : FormGroup;
  public dialogRef: any;

  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2016, 11, 31);

  public startDate: any;
  public endDate: any;
  public dateOfBirth: any;
  public dateFormat: any;
  
  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snakBar : MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {
      
      this.allCookies = this.cookie.getAll();
      this.allCookies.user_details =  JSON.parse(this.allCookies.user_details);
      
      this.getAllDoctorData();
      this.patientAddEditForm = this.fb.group({
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

  patientAddEditFormSubmit() {
    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }
 
    if(this.patientAddEditForm.valid) {
<<<<<<< HEAD
      // this.patientAddEditForm.value.birthDate = this.datePipe.transform(this.patientAddEditForm.value.birthDate, "MM-dd-yyyy");
      // this.patientAddEditForm.value.testDate = this.datePipe.transform(this.patientAddEditForm.value.testDate, "MM-dd-yyyy");
      // this.patientAddEditForm.value.testCompletedDate = this.datePipe.transform(this.patientAddEditForm.value.testCompletedDate, "MM-dd-yyyy");
      // this.patientAddEditForm.value.date = this.datePipe.transform(this.patientAddEditForm.value.date, "MM-dd-yyyy");

      /****** Format date with moment.js ******/
      this.patientAddEditForm.value.birthDate = moment().format('L');
      console.log('this.patientAddEditForm.value.birthDate', this.patientAddEditForm.value.birthDate);
=======
      this.patientAddEditForm.value.birthDate         = new Date(this.patientAddEditForm.value.birthDate).getTime();
      this.patientAddEditForm.value.testDate          = new Date(this.patientAddEditForm.value.testDate).getTime();
      this.patientAddEditForm.value.testCompletedDate = new Date(this.patientAddEditForm.value.testCompletedDate).getTime();
      this.patientAddEditForm.value.date              = new Date(this.patientAddEditForm.value.date).getTime();

>>>>>>> a4e1f4a4fe211f5d3a735106b30e90ce8b9aec38
      /* Setup Blood Pressure (systolic, diastolic) */
      const bloodPressure     = this.patientAddEditForm.controls.bloodPressure_value.value;
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
        if(response.status="success"){
          this.formDirective.resetForm();
          /* Open modal */
          let data: any = {
            width: '250px',
            data: { 
              header: "Success",
              message: "Record Saved Successfully",
              button1: { text: "Cancel" },
              button2: { text: "Add Next" },
            }
          }
          this.openDialog(data);
        }  
      });
    } else {
      console.log(this.patientAddEditForm);
    }
  }

  openDialog(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch(result) {
        case "Cancel":
          this.router.navigateByUrl('/tech/dashboard');
          break;
        case "Add Next":
          this.formDirective.resetForm();
          break;
      }
    });
  }

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

}

