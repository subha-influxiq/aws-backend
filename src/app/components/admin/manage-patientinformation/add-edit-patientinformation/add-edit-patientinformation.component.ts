import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { environment } from '../../../../../environments/environment';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface DialogData {
  message: string;
  id: any;
}

@Component({
  selector: 'app-add-edit-patientinformation',
  templateUrl: './add-edit-patientinformation.component.html',
  styleUrls: ['./add-edit-patientinformation.component.css']
})
export class AddEditPatientinformationComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  public patientinformationAddEditForm: FormGroup;
  public dialogRef: any;
  public addfieldFlage:boolean=false;
  public addfieldArray:any =[];
  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New PatientInformation', 
    nav: 'Add PatientInformation', 
    buttonText: 'Save',
    message: "Submitted Successfully"
  };

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snackBar: MatSnackBar, public commonFunction: CommonFunction,
    public dialog: MatDialog) {


    this.htmlText.userData = cookie.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);

    if (this.activeRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.message     = "Updated Successfully";
      this.htmlText.header      = 'Edit PatientInformation Record';
      this.htmlText.nav         = 'Edit PatientInformation';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
     }

     generateAddEditForm(flag: string = null) {
      let validateRule: any = {
        id:               ['', []],
        type:        ['', []],
        addfield:    ['',[]],
        label:        ['', [ Validators.required, Validators.maxLength(50) ]],
        description:         ['', [ Validators.required, Validators.maxLength(5000) ]],
        user_type:        ['patient_information', []],
        status:           ['', []]
      };
  
      switch(flag) {
        case 'edit':
          this.patientinformationAddEditForm = this.fb.group(validateRule);
  
          this.activeRoute.data.forEach((data) => {
            let patientinformationDetails :any = data.patientinformationData.res;
  
            this.patientinformationAddEditForm.controls['id'].patchValue(patientinformationDetails [0]._id);
            this.patientinformationAddEditForm.controls['type'].patchValue(patientinformationDetails [0].type);
            this.patientinformationAddEditForm.controls['addfield'].patchValue(patientinformationDetails [0].addfield);
            this.patientinformationAddEditForm.controls['label'].patchValue(patientinformationDetails [0].label);
            this.patientinformationAddEditForm.controls['description'].patchValue(patientinformationDetails [0].description);
            this.patientinformationAddEditForm.controls['status'].patchValue(patientinformationDetails [0].status);
          });
          break;
        case 'add':
          delete validateRule.id;
          this.patientinformationAddEditForm = this.fb.group(validateRule);
          break;
      }
    }

  ngOnInit() {
  }
  openType(){
    // console.warn( this.patientinformationAddEditForm.controls['type'].value);
    if(this.patientinformationAddEditForm.controls['type'].value=='dropdown') {
      this.addfieldFlage=true;
    } else {
      this.addfieldFlage=false;
    }
  }

  //keyUp event for email
  collect_field(event: MatChipInputEvent):void{
    const input=event.input;
    const value = event.value;
      this.addfieldArray.push(value);
      if(input){
        input.value='';
      }
  }
//delete mass email
  clearField(index) {
    this.addfieldArray.splice(index, 1);
  }
    /**for validation purpose**/
    inputUntouch(form: any, val: any) {
      form.controls[val].markAsUntouched();
    }
  
    patientinformationAddEditFormSubmit() {
      for (let x in this.patientinformationAddEditForm.controls) {
        this.patientinformationAddEditForm.controls[x].markAsTouched();
      }
  
      if (this.patientinformationAddEditForm.valid) {
        delete this.patientinformationAddEditForm.value.confirmpassword;
  
        if (this.patientinformationAddEditForm.value.status) {
          this.patientinformationAddEditForm.value.status = parseInt("1");
        } else {
          this.patientinformationAddEditForm.value.status = parseInt("0");
        }
        this.patientinformationAddEditForm.value.addfield=this.addfieldArray;
        var data: any = {
          "source": "data_pece",
          "data": this.patientinformationAddEditForm.value,
          "token": this.htmlText.userData.jwtToken,
          "domainurl" : environment.siteBaseUrl + 'reset-password'
        };
  
        if(this.htmlText.userData.user_details.user_type == 'diagnostic_admin') {
          data.data["diagnostic_admin_id"] = this.htmlText.userData.user_details._id;
          data["sourceobj"] = ["diagnostic_admin_id"];
        }
  
        if(this.htmlText.userData.user_details.user_type == 'doctor') {
          data.data["doctor_id"] = this.htmlText.userData.user_details._id;
          data["sourceobj"] = ["doctor_id"];
        }
  
        this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
          if (response.status == "success") {
            this.snackBar.open(this.htmlText.message, 'Ok', {
              duration: 2000,
            });
  
            this.formDirective.resetForm();
  
            setTimeout(() => {
              switch(this.htmlText.userData.user_details.user_type) {
                case 'diagnostic_admin':
                  this.router.navigateByUrl("admin/patientinformation-management");
                  break;
                case 'admin':
                  this.router.navigateByUrl("admin/patientinformation-management");
                  break;
              }
            }, 1000);
          } else {
            this.snackBar.open(response.msg, '', {
              duration: 2000,
            });
          }
        });
      }
    }

}
