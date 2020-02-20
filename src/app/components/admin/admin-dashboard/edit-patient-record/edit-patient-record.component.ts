import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
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
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
};

@Component({
  selector: 'app-edit-patient-record',
  templateUrl: './edit-patient-record.component.html',
  styleUrls: ['./edit-patient-record.component.css'],
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
  public ImageData: any = [];
  public paramsId: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {

    this.paramsId = this.activeRoute.snapshot.params._id;

    this.allCookies = this.cookie.getAll();
    this.allCookies.user_details =  JSON.parse(this.allCookies.user_details);

    this.getAllDoctorData();
      
    this.patientAddEditForm = this.fb.group({
      id                  :  ['', [Validators.required]],
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
      BMI_value          :  ['', [Validators.required, Validators.pattern(environment.floatPattern)]],
      blood_pressure      :  ['', [Validators.required]],

      leave_notes        :  ['', [Validators.required]],
      systolic_value     :  ['', [Validators.required, Validators.pattern(environment.floatPattern)]],
      diastolic_value    :  ['', [Validators.required, Validators.pattern(environment.floatPattern)]],
      status             :  [1, []],
      report_type        :  ['mannual', []],
    });
  }

  ngOnInit() {
    this.getAllPatientData();
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

  getTechListByID(ID: string) {
    var data = {
      "source": "tech_by_doctor_id",
      "condition": {
          "_id_object": ID,
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
          tech_name: this.htmlText.allTech[loop].firstname + ' ' + this.htmlText.allTech[loop].lastname,
          tech_email: this.htmlText.allTech[loop].email
        });
      }
    }
  }

  getAllPatientData() {
    this.activeRoute.data.forEach((data) => {
      this.allPatientDataArray = data.patientData.res;
      this.ImageData =  this.allPatientDataArray[0].images;

      /* Date format */
      this.allPatientDataArray[0].birth_date          = new Date(this.allPatientDataArray[0].birth_date);
      this.allPatientDataArray[0].test_date           = new Date(this.allPatientDataArray[0].test_date);
      this.allPatientDataArray[0].test_completed_date = new Date(this.allPatientDataArray[0].test_completed_date);

      setTimeout(() => {
        this.getTechListByID(this.allPatientDataArray[0].doctor_id);
      }, 2000);

      this.patientAddEditForm.patchValue({
        id                  : this.allPatientDataArray[0]._id,
        patient_name        : this.allPatientDataArray[0].patient_name,
        gender              : this.allPatientDataArray[0].gender,
        birth_date          : this.allPatientDataArray[0].birth_date,
        doctor_id           : this.allPatientDataArray[0].doctor_id,
        doctor_name         : this.allPatientDataArray[0].doctor_name,
        doctor_details      : this.allPatientDataArray[0].doctor_details,
        tech_id             : this.allPatientDataArray[0].tech_id,
        tech_name           : this.allPatientDataArray[0].tech_name,
        test_date           : this.allPatientDataArray[0].test_date,
        test_completed_date : this.allPatientDataArray[0].test_completed_date,
  
        PTGTP              : this.allPatientDataArray[0].PTGTP,
        PTGTP_value        : this.allPatientDataArray[0].PTGTP_value,
        PTGVLFI            : this.allPatientDataArray[0].PTGVLFI,
        PTGVLFI_value      : this.allPatientDataArray[0].PTGVLFI_value,
        IR                 : this.allPatientDataArray[0].IR,
        IR_value           : this.allPatientDataArray[0].IR_value,
        ESRNO              : this.allPatientDataArray[0].ESRNO,
        ESRNO_value        : this.allPatientDataArray[0].ESRNO_value,
        ESRL               : this.allPatientDataArray[0].ESRL,
        ESRL_value         : this.allPatientDataArray[0].ESRL_value,
        peakC              : this.allPatientDataArray[0].peakC,
        peakC_value        : this.allPatientDataArray[0].peakC_value,
        PTGtype            : this.allPatientDataArray[0].PTGtype,
        PTGtype_value      : this.allPatientDataArray[0].PTGtype_value,
        PTGCVD             : this.allPatientDataArray[0].PTGCVD,
        PTGCVD_value       : this.allPatientDataArray[0].PTGCVD_value,
        stressI            : this.allPatientDataArray[0].stressI,
        stressI_value      : this.allPatientDataArray[0].stressI_value,
        RI                 : this.allPatientDataArray[0].RI,
        RI_value           : this.allPatientDataArray[0].RI_value,
        AIPTG              : this.allPatientDataArray[0].AIPTG,
        AIPTG_value        : this.allPatientDataArray[0].AIPTG_value,
        CIsCI              : this.allPatientDataArray[0].CIsCI,
        CIsCI_value        : this.allPatientDataArray[0].CIsCI_value,
        pNN50              : this.allPatientDataArray[0].pNN50,
        pNN50_value        : this.allPatientDataArray[0].pNN50_value,
        RMSSD              : this.allPatientDataArray[0].RMSSD,
        RMSSD_value        : this.allPatientDataArray[0].RMSSD_value,
        SDba               : this.allPatientDataArray[0].SDba,
        SDba_value         : this.allPatientDataArray[0].SDba_value,
        SDda               : this.allPatientDataArray[0].SDda,
        SDda_value         : this.allPatientDataArray[0].SDda_value,
        DPRS               : this.allPatientDataArray[0].DPRS,
        DPRS_value         : this.allPatientDataArray[0].DPRS_value,
        ValsR              : this.allPatientDataArray[0].ValsR,
        ValsR_value        : this.allPatientDataArray[0].ValsR_value,
        BMI                : this.allPatientDataArray[0].BMI,
        BMI_value          : this.allPatientDataArray[0].BMI_value,
        blood_pressure     : this.allPatientDataArray[0].blood_pressure,
        systolic_value     : this.allPatientDataArray[0].systolic_value,
        diastolic_value    : this.allPatientDataArray[0].diastolic_value,
        
        leave_notes        : this.allPatientDataArray[0].leave_notes,
        report_type        : this.allPatientDataArray[0].report_type,
      });
    });
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
        "token" : this.allCookies.jwtToken
      }

      this.httpService.httpViaPost("addorupdatedata",data).subscribe(response=>{
        if(response.status = "success") {
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
          };
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
          this.router.navigateByUrl('/admin/dashboard');
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
