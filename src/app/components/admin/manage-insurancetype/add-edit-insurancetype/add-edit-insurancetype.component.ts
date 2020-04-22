import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
  id: any;
}

@Component({
  selector: 'app-add-edit-insurancetype',
  templateUrl: './add-edit-insurancetype.component.html',
  styleUrls: ['./add-edit-insurancetype.component.css']
})
export class AddEditInsurancetypeComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public insuranceTypeAddEditForm: FormGroup;
  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New Insurancetype Office', 
    nav: 'Add Insurancetype Office', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    doctorOfficeData: "",
    insuranceData: ""
  };
  public dialogRef: any;

  constructor(public formBuilder: FormBuilder, public acivatedRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookieService: CookieService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    
      this.htmlText.userData = this.cookieService.getAll();
      this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);
      this.getAllinsuranceData();
      
      if (this.acivatedRoute.snapshot.params._id) {
        this.generateAddEditForm('edit');
  
        this.htmlText.message     = "Updated Successfully";
        this.htmlText.header      = 'Edit Insurancetype Record';
        this.htmlText.nav         = 'Edit Insurancetype Office';
        this.htmlText.buttonText  = 'Update';
        this.params_id            = this.acivatedRoute.snapshot.params._id;
      } else {
        this.generateAddEditForm('add');
      }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:                     ['', []],
      insurancetype_name:            ['', [ Validators.required, Validators.maxLength(50) ]],
      description:              ['', [ Validators.required, Validators.maxLength(500) ]],
      priority:               ['', []],
      insurance_id:           [null, [ Validators.required ]],
      user_type:              ['insurance_type', []],
      status:                 ['', []],
    };

    switch(flag) {
      case 'edit':
        this.insuranceTypeAddEditForm = this.formBuilder.group(validateRule);

        this.acivatedRoute.data.forEach((data) => {
          let doctorDetails: any = data.data.res;

          this.insuranceTypeAddEditForm.controls['id'].patchValue(doctorDetails[0]._id);
          this.insuranceTypeAddEditForm.controls['insurancetype_name'].patchValue(doctorDetails[0].insurancetype_name);
          this.insuranceTypeAddEditForm.controls['description'].patchValue(doctorDetails[0].description);
          this.insuranceTypeAddEditForm.controls['priority'].patchValue(doctorDetails[0].priority);
          this.insuranceTypeAddEditForm.controls['insurance_id'].patchValue(doctorDetails[0].insurance_id);
          this.insuranceTypeAddEditForm.controls['status'].patchValue(doctorDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.insuranceTypeAddEditForm = this.formBuilder.group(validateRule);
        break;
    }
  }

  ngOnInit() {
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  

  /**getting all the technician data**/
  getAllinsuranceData() {
    var data = {
      "source": "data_pece",
      "condition": {
        "user_type": "insurance"
      },
      "token": this.htmlText.userData.jwtToken
    };
    this.httpService.httpViaPost('datalist', data).subscribe(response => {
      this.htmlText.insuranceData = response.res;
    });
  }


  insuranceTypeAddEditFormFormSubmit() {
    for (let x in this.insuranceTypeAddEditForm.controls) {
      this.insuranceTypeAddEditForm.controls[x].markAsTouched();
    }

    /* stop here if form is invalid */
    if (this.insuranceTypeAddEditForm.valid) {
      delete this.insuranceTypeAddEditForm.value.confirmpassword;

      if (this.insuranceTypeAddEditForm.value.status) {
        this.insuranceTypeAddEditForm.value.status = parseInt("1");
      } else {
        this.insuranceTypeAddEditForm.value.status = parseInt("0");;
      }

      /* start process to submited data */
      let postData: any = {
        "source": "data_pece",
        "data": this.insuranceTypeAddEditForm.value,
        "domainurl": environment.siteBaseUrl + 'reset-password',
        "sourceobjArray": ["insurance_id"],
        "token": this.cookieService.get('jwtToken')
      };

      if(this.htmlText.userData.user_details.user_type == 'doctor') {
        postData.data["doctor_id"] = this.htmlText.userData.user_details._id;
        postData["sourceobj"] = ["doctor_id"];
      }

      this.httpService.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
        if (response.status == "success") {
          this.formDirective.resetForm();

          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          setTimeout(() => {
            switch(this.htmlText.userData.user_details.user_type) {
              case 'doctor':
                this.router.navigateByUrl("doctor/doctor-office-management");
                break;
              case 'admin':
                this.router.navigateByUrl("admin/insurance-type-management");
                break;
            }
          }, 2000);
        } else {
          this.snackBar.open(response.msg, '', {
            duration: 2000,
          });
        }
      }, (error) => {
        alert("Some error occurred. Please try again.");
      });
    }
  }

}
