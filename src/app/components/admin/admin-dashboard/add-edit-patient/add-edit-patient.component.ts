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
import { environment } from '../../../../../environments/environment';

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
        doctor_email        :  ['', []],
        doctor_details      :  ['', []],
        tech_id             :  ['', [Validators.required]],
        tech_name           :  ['', []],
        tech_email          :  ['', []],
        test_date           :  ['', [Validators.required]],
        test_completed_date :  ['', [Validators.required]],

        PTGTP              :  ['', [Validators.required]],
        PTGTP_value        :  ['', []],
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
        PTGtype_value      :  ['', [Validators.required, Validators.pattern(environment.floatPattern)]],
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
        blood_pressure      :  ['', [Validators.required]],

        leave_notes        :  ['', [Validators.required]],
        systolic_value     :  ['', [Validators.required, Validators.pattern(environment.floatPattern)]],
        diastolic_value    :  ['', [Validators.required, Validators.pattern(environment.floatPattern)]],
        status             :  ['Pending Signature', []],
        report_type        :  ['manual', []],
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

  getTechList(index: number) {
    var details = '<p class="doctor_name">';
    details += this.htmlText.allDoctor[index].firstname + ' ' + this.htmlText.allDoctor[index].lastname;
    details += '<p class="doctor_name"> <span> Email: </span>';
    details += this.htmlText.allDoctor[index].email;
    details += '</p><p class="doctor_name"> <span>NPI: </span>';
    details += this.htmlText.allDoctor[index].npi;
    details += '</p>';

    this.patientAddEditForm.patchValue({
      doctor_id:      this.htmlText.allDoctor[index]._id,
      doctor_name:    this.htmlText.allDoctor[index].firstname + ' ' + this.htmlText.allDoctor[index].lastname,
      doctor_email:   this.htmlText.allDoctor[index].email,
      doctor_details: details
    });

    var data = {
      "source": "tech_by_doctor_id",
      "condition": {
          "_id_object": this.htmlText.allDoctor[index]._id,
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
        this.htmlText.tech_details = this.htmlText.allTech[loop];
        this.patientAddEditForm.patchValue({
          tech_name: this.htmlText.allTech[loop].firstname + ' ' + this.htmlText.allTech[loop].lastname,
          tech_email: this.htmlText.allTech[loop].email
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
      
      var data: any = {
        "source" : "data_pece",
        "data" : this.patientAddEditForm.value,
        "sourceobj": ["doctor_id","tech_id"],
        "token" : this.allCookies.jwtToken,
        "login_url": environment.siteBaseUrl + "login",
        "tech_details" : this.htmlText.tech_details,
        "report_upload": true
      };

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

