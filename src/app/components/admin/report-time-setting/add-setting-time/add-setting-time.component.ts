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

@Component({
  selector: 'app-add-setting-time',
  templateUrl: './add-setting-time.component.html',
  styleUrls: ['./add-setting-time.component.css']
})
export class AddSettingTimeComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public SalesPersonManagementAddEditForm: FormGroup;
  public dialogRef: any;
  public selectionChangeValue:any;

  public params_id: any = '';
  public htmlText: any = {
    userData: "",
    header: 'Add New Time', 
    nav: 'Add Time Setting', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    states: "",
    allCities: "",
    cities: "",
    parent_type: [{
      name: "Distributor",value:"distributor"
    }, { name: "DiagnosticAdmin",value:"diagnostic_admin" }],
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
      this.htmlText.header      = 'Edit Report Setting';
      this.htmlText.nav         = 'Edit Report Setting';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:               ['', []],
      time_setting_percentage:        ['', [ Validators.required, Validators.maxLength(2) ]]
    };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.SalesPersonManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          let billerDetails :any = data.techData.res;
          this.SalesPersonManagementAddEditForm.controls['id'].patchValue(billerDetails[0]._id);
          this.SalesPersonManagementAddEditForm.controls['time_setting_percentage'].patchValue(billerDetails[0].time_setting_percentage);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.SalesPersonManagementAddEditForm = this.fb.group(validateRule);
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


  TechManagementAddFormFormSubmit() {
    for (let x in this.SalesPersonManagementAddEditForm.controls) {
      this.SalesPersonManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.SalesPersonManagementAddEditForm.valid) {
      delete this.SalesPersonManagementAddEditForm.value.confirmpassword;
      
      this.SalesPersonManagementAddEditForm.value.time_setting_percentage = parseInt(this.SalesPersonManagementAddEditForm.value.time_setting_percentage);
      var data: any = {
        "source": "data_pece",
        "data": this.SalesPersonManagementAddEditForm.value,
        "token": this.htmlText.userData.jwtToken,
        "domainurl" : environment.siteBaseUrl + 'reset-password'
      };

      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if (response.status == "success") {
          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          this.formDirective.resetForm();

          setTimeout(() => {
            switch(this.htmlText.userData.user_details.user_type) {
              case 'admin':
                this.router.navigateByUrl("admin/setting-management");
                break;
              case 'diagnostic_admin':
                this.router.navigateByUrl("diagnostic-admin/sales-person-management");
                break;
              case  'distributors':
                this.router.navigateByUrl("distributors/sales-person-management");
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
