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
  selector: 'app-add-edit-distributors',
  templateUrl: './add-edit-distributors.component.html',
  styleUrls: ['./add-edit-distributors.component.css']
})
export class AddEditDistributorsComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public DistributorsManagementAddEditForm: FormGroup;
  public dialogRef: any;

  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New Distributors', 
    nav: 'Add Distributors', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    states: "",
    allCities: "",
    cities: ""
  };

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snackBar: MatSnackBar, public commonFunction: CommonFunction,
    public dialog: MatDialog) {
    
    this.htmlText.userData = cookie.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);
    this.allStateCityData();

    if (this.activeRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.message     = "Updated Successfully";
      this.htmlText.header      = 'Edit Distributors Record';
      this.htmlText.nav         = 'Edit Distributors';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:               ['', []],
      distributorname:        ['', [ Validators.required, Validators.maxLength(50) ]],
      contactperson:         ['', [ Validators.required, Validators.maxLength(50) ]],
      email:            ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:            ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      address:          ['', [ Validators.required, Validators.maxLength(200) ]],
      zip:              ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ]],
      city:             ['', [ Validators.required ]],
      state:            ['', [ Validators.required ]],
      user_type:        ['distributors', []],
      status:           ['', []],
      password:         ['', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ]],
      confirmpassword:  ['', [ Validators.required ]]
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.DistributorsManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          let distributorsDetails :any = data.distributorsData.res;
          setTimeout(() => {
            this.getCity(distributorsDetails[0].state);
          }, 1000);

          this.DistributorsManagementAddEditForm.controls['id'].patchValue(distributorsDetails[0]._id);
          this.DistributorsManagementAddEditForm.controls['firstname'].patchValue(distributorsDetails[0].distributorname);
          this.DistributorsManagementAddEditForm.controls['lastname'].patchValue(distributorsDetails[0].contactperson);
          this.DistributorsManagementAddEditForm.controls['email'].patchValue(distributorsDetails[0].email);
          this.DistributorsManagementAddEditForm.controls['phone'].patchValue(distributorsDetails[0].phone);
          this.DistributorsManagementAddEditForm.controls['address'].patchValue(distributorsDetails[0].address);
          this.DistributorsManagementAddEditForm.controls['zip'].patchValue(distributorsDetails[0].zip);
          this.DistributorsManagementAddEditForm.controls['city'].patchValue(distributorsDetails[0].city);
          this.DistributorsManagementAddEditForm.controls['state'].patchValue(distributorsDetails[0].state);
          this.DistributorsManagementAddEditForm.controls['status'].patchValue(distributorsDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.DistributorsManagementAddEditForm = this.fb.group(validateRule);
        break;
    }
  }

  ngOnInit() {
  }

  matchpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      } else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.htmlText.states = response;
      // this.getResolveData();
    });

    this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.htmlText.allCities = response;  
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event) {
    var val = event;
    this.htmlText.cities = this.htmlText.allCities[val];
  }

  getCityByName(stateName) {
    this.htmlText.cities = this.htmlText.allCities[stateName];
  }

  DistributorsManagementAddEditFormSubmit() {
    for (let x in this.DistributorsManagementAddEditForm.controls) {
      this.DistributorsManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.DistributorsManagementAddEditForm.valid) {
      delete this.DistributorsManagementAddEditForm.value.confirmpassword;

      if (this.DistributorsManagementAddEditForm.value.status) {
        this.DistributorsManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.DistributorsManagementAddEditForm.value.status = parseInt("0");
      }
      
      var data: any = {
        "source": "data_pece",
        "data": this.DistributorsManagementAddEditForm.value,
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
                this.router.navigateByUrl("admin/distributors-management");
                break;
              case 'admin':
                this.router.navigateByUrl("admin/distributors-management");
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
