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
        patient_name        :  ['', [Validators.required, Validators.maxLength(30)]],
        gender              :  ['', [Validators.required]],
        birth_date          :  ['', [Validators.required]],
        doctor_id           :  ['', [Validators.required]],
        doctor_name         :  ['', []],
        tech_id             :  ['', [Validators.required]],
        tech_name           :  ['', []],
        test_date           :  ['', [Validators.required]],
        test_completed_date :  ['', [Validators.required]],

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
        blood_pressure      :  ['', [Validators.required]],
        blood_pressure_value:  ['', []],

        leave_notes        :  ['', [Validators.required]],
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
      source: "data_pece",
      condition: {
        user_type: "doctor",
        status: 1
      },
      token: this.allCookies.jwtToken
    };

    this.httpService.httpViaPost('datalist', data).subscribe(response => {
      this.htmlText.allDoctor = response.res;
    });
  }

  getTechList(doctorID: string) {
    for(let loop = 0; loop < this.htmlText.allDoctor.length; loop++) {
      if(this.htmlText.allDoctor[loop]._id == doctorID) {
        this.patientAddEditForm.patchValue({
          doctor_name: this.htmlText.allDoctor[loop].firstname + ' ' + this.htmlText.allDoctor[loop].lastname
        });
      }
    }

    var data = {
      "source": "tech_by_doctor_id",
      "condition": {
          "_id_object": doctorID,
          "status": 1
      },
      "token": this.allCookies.jwtToken
    };

    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
      this.htmlText.allTech = response.res;
    });
  }

  selectTech(techID: string) {
    for(let loop = 0; loop < this.htmlText.allTech.length; loop++) {
      if(this.htmlText.allTech[loop].tech_id == techID) {
        this.patientAddEditForm.patchValue({
          tech_name: this.htmlText.allTech[loop].firstname + ' ' + this.htmlText.allTech[loop].lastname
        });
      }
    }
  }

  patientAddEditFormSubmit() {
    for (let x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }
 
    if(this.patientAddEditForm.valid) {
      this.patientAddEditForm.value.birth_date          = new Date(this.patientAddEditForm.value.birth_date).getTime();
      this.patientAddEditForm.value.test_date           = new Date(this.patientAddEditForm.value.test_date).getTime();
      this.patientAddEditForm.value.test_completed_date = new Date(this.patientAddEditForm.value.test_completed_date).getTime();
      
      /* Setup Blood Pressure (systolic, diastolic) */
      const bloodPressure     = this.patientAddEditForm.controls.blood_pressure_value.value;
      const systolicDiastolic = bloodPressure.split('/');
      this.patientAddEditForm.controls['systolic_value'].patchValue(systolicDiastolic[0]);
      this.patientAddEditForm.controls['diastolic_value'].patchValue(systolicDiastolic[1]);
      delete this.patientAddEditForm.value.blood_pressure_value;
      
      var data: any = {
        "source" : "data_pece",
        "data" : this.patientAddEditForm.value,
        "sourceobj": ["doctor_id","tech_id"],
        "token" : this.allCookies.jwtToken
      }

      this.httpService.httpViaPost("addorupdatedata",data).subscribe(response=>{
        if(response.status="success"){
          //this.formDirective.resetForm();
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

