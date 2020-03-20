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
  selector: 'app-add-edit-sales-person',
  templateUrl: './add-edit-sales-person.component.html',
  styleUrls: ['./add-edit-sales-person.component.css']
})
export class AddEditSalesPersonComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public SalesPersonManagementAddEditForm: FormGroup;
  public dialogRef: any;

  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New Sales Person', 
    nav: 'Add Sales Person', 
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
      this.htmlText.header      = 'Edit Sales Person Record';
      this.htmlText.nav         = 'Edit Sales Person';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:               ['', []],
      firstname:        ['', [ Validators.required, Validators.maxLength(50) ]],
      lastname:         ['', [ Validators.required, Validators.maxLength(50) ]],
      email:            ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:            ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      address:          ['', [ Validators.required, Validators.maxLength(200) ]],
      zip:              ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ]],
      city:             ['', [ Validators.required ]],
      state:            ['', [ Validators.required ]],
      user_type:        ['sales_person', []],
      status:           ['', []],
      password:         ['', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ]],
      confirmpassword:  ['', [ Validators.required ]]
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.SalesPersonManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          let billerDetails :any = data.techData.res;
          setTimeout(() => {
            this.getCity(billerDetails[0].state);
          }, 1000);

          this.SalesPersonManagementAddEditForm.controls['id'].patchValue(billerDetails[0]._id);
          this.SalesPersonManagementAddEditForm.controls['firstname'].patchValue(billerDetails[0].firstname);
          this.SalesPersonManagementAddEditForm.controls['lastname'].patchValue(billerDetails[0].lastname);
          this.SalesPersonManagementAddEditForm.controls['email'].patchValue(billerDetails[0].email);
          this.SalesPersonManagementAddEditForm.controls['phone'].patchValue(billerDetails[0].phone);
          this.SalesPersonManagementAddEditForm.controls['address'].patchValue(billerDetails[0].address);
          this.SalesPersonManagementAddEditForm.controls['zip'].patchValue(billerDetails[0].zip);
          this.SalesPersonManagementAddEditForm.controls['city'].patchValue(billerDetails[0].city);
          this.SalesPersonManagementAddEditForm.controls['state'].patchValue(billerDetails[0].state);
          this.SalesPersonManagementAddEditForm.controls['status'].patchValue(billerDetails[0].status);
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

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(SRDialogtest, {
      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
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

  TechManagementAddFormFormSubmit() {
    for (let x in this.SalesPersonManagementAddEditForm.controls) {
      this.SalesPersonManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.SalesPersonManagementAddEditForm.valid) {
      delete this.SalesPersonManagementAddEditForm.value.confirmpassword;

      if (this.SalesPersonManagementAddEditForm.value.status) {
        this.SalesPersonManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.SalesPersonManagementAddEditForm.value.status = parseInt("0");
      }
      
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
            this.router.navigateByUrl("admin/sales-person-management");
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
/**this is only for the Change Password modal in the edit page**/
@Component({
  selector: 'SRDialogtest',
  templateUrl: 'modal.html',
})

export class SRDialogtest {
  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<SRDialogtest>,
    public fb: FormBuilder, public httpService: HttpServiceService, public cookie: CookieService,
    public activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.params_id = data.id;

    this.user_token = cookie.get('jwtToken');
    this.changePwdForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, { validators: this.matchpassword('password', 'confirmpassword') })

  }

  matchpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      }
      else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

  changePasswordFormSubmit() {
    let x: any;
    for (x in this.changePwdForm.controls) {
      this.changePwdForm.controls[x].markAsTouched();
    }
    if (this.changePwdForm.valid) {
      delete this.changePwdForm.value.confirmpassword
      var data = {
        "_id": this.params_id,
        "adminflag": 1,
        "newPassword": this.changePwdForm.value.password,
      }
      this.httpService.httpViaPost('changepassword',data).subscribe(response=>{
        console.log("response",response);
      });
    }

  }
}