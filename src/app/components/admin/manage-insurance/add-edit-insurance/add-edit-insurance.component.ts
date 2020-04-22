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

export interface DialogData {
  message: string;
  id: any;
}
@Component({
  selector: 'app-add-edit-insurance',
  templateUrl: './add-edit-insurance.component.html',
  styleUrls: ['./add-edit-insurance.component.css']
})
export class AddEditInsuranceComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public InsuranceAddEditForm: FormGroup;
  public dialogRef: any;

  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New Insurance', 
    nav: 'Add Insurance', 
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
      this.htmlText.header      = 'Edit Insurance Record';
      this.htmlText.nav         = 'Edit Insurance';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
    }

    generateAddEditForm(flag: string = null) {
      let validateRule: any = {
        id:               ['', []],
        insurancename:        ['', [ Validators.required, Validators.maxLength(50) ]],
        description:         ['', [ Validators.required, Validators.maxLength(5000) ]],
        priority:            ['', []],
        user_type:        ['insurance', []],
        status:           ['', []]
      };
  
      switch(flag) {
        case 'edit':
          this.InsuranceAddEditForm = this.fb.group(validateRule);
  
          this.activeRoute.data.forEach((data) => {
            let insuranceDetails :any = data.insuranceData.res;
  
            this.InsuranceAddEditForm.controls['id'].patchValue(insuranceDetails[0]._id);
            this.InsuranceAddEditForm.controls['insurancename'].patchValue(insuranceDetails[0].insurancename);
            this.InsuranceAddEditForm.controls['description'].patchValue(insuranceDetails[0].description);
            this.InsuranceAddEditForm.controls['priority'].patchValue(insuranceDetails[0].priority);
            this.InsuranceAddEditForm.controls['status'].patchValue(insuranceDetails[0].status);
          });
          break;
        case 'add':
          delete validateRule.id;
          this.InsuranceAddEditForm = this.fb.group(validateRule);
          break;
      }
    }

  ngOnInit() {
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  InsuranceManagementAddFormFormSubmit() {
    for (let x in this.InsuranceAddEditForm.controls) {
      this.InsuranceAddEditForm.controls[x].markAsTouched();
    }

    if (this.InsuranceAddEditForm.valid) {
      delete this.InsuranceAddEditForm.value.confirmpassword;

      if (this.InsuranceAddEditForm.value.status) {
        this.InsuranceAddEditForm.value.status = parseInt("1");
      } else {
        this.InsuranceAddEditForm.value.status = parseInt("0");
      }
      
      var data: any = {
        "source": "data_pece",
        "data": this.InsuranceAddEditForm.value,
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
                this.router.navigateByUrl("admin/insurance-management");
                break;
              case 'admin':
                this.router.navigateByUrl("admin/insurance-management");
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
