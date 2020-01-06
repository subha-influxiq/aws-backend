import { Component, OnInit, Inject, ViewChild, HostListener} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormGroupDirective } from '@angular/forms';
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
    public cookie: CookieService, public snakBar : MatSnackBar,public dialog: MatDialog,
     public commonFunction: CommonFunction) {
      
      this.allCookies = this.cookie.getAll();
      this.allCookies.user_details =  JSON.parse(this.allCookies.user_details);
      
      this.getAllDoctorData();
      this.patientAddEditForm = this.fb.group({
        patientName        :  ['', [Validators.required, Validators.maxLength(30)]],
        gender             :  ['', [Validators.required]],
        birthDate          :  ['', [Validators.required]],
        doctor_id          :  ['', []],
        tech_id            :  ['', []],
        testDate           :  ['', [Validators.required]],
        date               :  ['', [Validators.required]],
        testCompletedDate  :  ['', [Validators.required]],

        PTGPT              :  ['', [Validators.required]],
        PTGPT_value        :  ['', [Validators.required]],
        PTGVLFI            :  ['', [Validators.required]],
        PTGVLFI_value      :  ['', [Validators.required]],
        IR                 :  ['', [Validators.required]],
        IR_value           :  ['', [Validators.required]],
        ESRNO              :  ['', [Validators.required]],
        ESRNO_value        :  ['', [Validators.required]],
        ESRL               :  ['', [Validators.required]],
        ESRL_value         :  ['', [Validators.required]],
        peakC              :  ['', [Validators.required]],
        peakC_value        :  ['', [Validators.required]],
        PTGtype            :  ['', [Validators.required]],
        PTGtype_value      :  ['', [Validators.required]],
        PTGCVD             :  ['', [Validators.required]],
        PTGCVD_value       :  ['', [Validators.required]],
        stressI            :  ['', [Validators.required]],
        stressI_value      :  ['', [Validators.required]],
        RI                 :  ['', [Validators.required]],
        RI_value           :  ['', [Validators.required]],
        AIPTG              :  ['', [Validators.required]],
        AIPTG_value        :  ['', [Validators.required]],
        CIsCI              :  ['', [Validators.required]],
        CIsCI_value        :  ['', [Validators.required]],
        pNN50              :  ['', [Validators.required]],
        pNN50_value        :  ['', [Validators.required]],
        RMSSD              :  ['', [Validators.required]],
        RMSSD_value        :  ['', [Validators.required]],
        SDba               :  ['', [Validators.required]],
        SDba_value         :  ['', [Validators.required]],
        SDda               :  ['', [Validators.required]],
        SDda_value         :  ['', [Validators.required]],
        DPRS               :  ['', [Validators.required]],
        DPRS_value         :  ['', [Validators.required]],
        ValsR              :  ['', [Validators.required]],
        ValsR_value        :  ['', [Validators.required]],
        BMI                :  ['', [Validators.required]],
        BMI_value          :  ['', [Validators.required]],
        bloodPressure      :  ['', [Validators.required]],
        bloodPressure_value:  ['', [Validators.required]],

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

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  patientAddEditFormSubmit(){
    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }

  
    var startDate = this.datePipe.transform("this.startdate", "MM-dd-yyyy");
    var endDate = this.datePipe.transform("this.enddate", "MM-dd-yyyy");
    var dateOfBirth = this.datePipe.transform("this.dateofbirth","MM-dd-yyyy");
    var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    
    this.patientAddEditForm.value.testDate = startDate;
    this.patientAddEditForm.value.testCompletedDate = endDate;
    this.patientAddEditForm.value.birthDate = dateOfBirth;
    this.patientAddEditForm.controls['testDate'].patchValue(startDate);
    this.patientAddEditForm.controls['testCompletedDate'].patchValue(endDate);
    this.patientAddEditForm.controls['birthDate'].patchValue(dateOfBirth);
    this.patientAddEditForm.controls['date'].patchValue(dateformat);

    /* Setup Blood Pressure (systolic, diastolic) */
    const bloodPressure = this.patientAddEditForm.controls.bloodPressure_value.value;
    const systolicDiastolic = bloodPressure.split('/');
    this.patientAddEditForm.controls['systolic'].patchValue(systolicDiastolic[0]);
    this.patientAddEditForm.controls['diastolic'].patchValue(systolicDiastolic[1]);
    delete this.patientAddEditForm.value.bloodPressure_value;
 
    if(this.patientAddEditForm.valid) {  
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

}

