import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,FormGroupDirective } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
  id: any;
}

@Component({
  selector: 'app-add-edit-biller',
  templateUrl: './add-edit-biller.component.html',
  styleUrls: ['./add-edit-biller.component.css']
})

export class AddEditBillerComponent implements OnInit {
  
  @ViewChild(FormGroupDirective,{static: true}) formDirective: FormGroupDirective;
  public dialogRef: any;

  public billerManagementAddEditForm: FormGroup;
  public states: any;
  public allCities: any;
  public cities: any;
  public htmlText: any = { 
    header: 'Add New Biller', 
    nav: 'Add Biller', 
    buttonText: 'Save',
    userData: ''
  };
  public params_id: any;
  public message: any = "Submitted Successfully";
  public taxo_array: any = [];

  constructor(public fb: FormBuilder, private datePipe: DatePipe, public httpService: HttpServiceService, public cookie: CookieService, public router: Router,
     public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public dialog: MatDialog) {

    this.htmlText.userData = cookie.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);
    this.allStateCityData();

    console.log(">>>>>", this.htmlText.userData.user_details.user_type);

    if (this.activeRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.header = 'Edit Biller Record';
      this.htmlText.nav = 'Edit Biller';
      this.htmlText.buttonText = 'Update';
      this.message = "Updated Successfully";
      this.params_id = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  ngOnInit() {
  }

  generateAddEditForm(flag: string) {
    var validateRule: any = {
      id:             ['', []],
      firstname:      ['', [ Validators.required, Validators.maxLength(50) ]],
      lastname:       ['', [ Validators.required, Validators.maxLength(50) ]],
      email:          ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:          ['', [ Validators.minLength(7), Validators.maxLength(16) ]],
      company_name:   ['', [ Validators.required, Validators.maxLength(100) ]],
      address:        ['', [ Validators.required, Validators.maxLength(200) ]],
      zip:            ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ]],
      city:           ['', [ Validators.required ]],
      state:          ['', [ Validators.required ]],
      user_type:      ['biller', []],
      status:         ['', []],
      password:       ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: ['', []],
    };
    var passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.billerManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          let billerDetails :any = data.billersingleData.res;
          setTimeout(() => {
            this.getCity(billerDetails[0].state);
          }, 1000);

          this.billerManagementAddEditForm.controls['id'].patchValue(billerDetails[0]._id);
          this.billerManagementAddEditForm.controls['firstname'].patchValue(billerDetails[0].firstname);
          this.billerManagementAddEditForm.controls['lastname'].patchValue(billerDetails[0].lastname);
          this.billerManagementAddEditForm.controls['email'].patchValue(billerDetails[0].email);
          this.billerManagementAddEditForm.controls['phone'].patchValue(billerDetails[0].phone);
          this.billerManagementAddEditForm.controls['company_name'].patchValue(billerDetails[0].company_name);
          this.billerManagementAddEditForm.controls['address'].patchValue(billerDetails[0].address);
          this.billerManagementAddEditForm.controls['zip'].patchValue(billerDetails[0].zip);
          this.billerManagementAddEditForm.controls['city'].patchValue(billerDetails[0].city);
          this.billerManagementAddEditForm.controls['state'].patchValue(billerDetails[0].state);
          this.billerManagementAddEditForm.controls['status'].patchValue(billerDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.billerManagementAddEditForm = this.fb.group(validateRule, passwordRule);
        break;
    }
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

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  /**for validation purpose**/
  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.states = response;
    });

    this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.allCities = response;    
    });
  }

  /**for getting all states & cities  function end here**/
  getCity(event) {
    var val = event;
    this.cities = this.allCities[val];
  }

  getCityByName(stateName) {
    this.cities = this.allCities[stateName];
  }

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(ChangePasswordModal, {
      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  BillerManagementAddFormSubmit() {
    for (let x in this.billerManagementAddEditForm.controls) {
      this.billerManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.billerManagementAddEditForm.valid) {
      delete this.billerManagementAddEditForm.value.confirmpassword;
      if (this.billerManagementAddEditForm.value.status) {
        this.billerManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.billerManagementAddEditForm.value.status = parseInt("0");
      }

      var data: any = {
        "source": "data_pece",
        "data": this.billerManagementAddEditForm.value,
        "token": this.htmlText.userData.jwtToken,
        "domainurl" : environment.siteBaseUrl + 'reset-password'
      };

      if(this.htmlText.userData.user_details.user_type == 'diagnostic_admin') {
        data.data["diagnostic_admin_id"] = this.htmlText.userData.user_details._id;
        data["sourceobj"] = ["diagnostic_admin_id"];
      }
    
      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if(response.status == 'success') {
          this.snackBar.open(this.message, 'Ok', {
            duration: 2000,
          });
          this.formDirective.resetForm();
          
          setTimeout(() => {
            this.router.navigateByUrl("admin/biller-management");
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

@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})

export class ChangePasswordModal {

  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<ChangePasswordModal>,
    public fb: FormBuilder, public httpService: HttpServiceService, public cookie: CookieService,
    public activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData, public snackBar: MatSnackBar) {
    
    this.params_id = data.id;
    this.user_token = cookie.get('jwtToken');
    this.changePwdForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, { validators: this.matchpassword('password', 'confirmpassword') });

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
    for (let x in this.changePwdForm.controls) {
      this.changePwdForm.controls[x].markAsTouched();
    }
    if (this.changePwdForm.valid) {
      delete this.changePwdForm.value.confirmpassword
      var data = {
        "_id": this.params_id,
        "adminflag": 1,
        "newPassword": this.changePwdForm.value.password,
      }
      this.httpService.httpViaPost('changepassword',data).subscribe(response => {
        if(response.status == true) {
          this.snackBar.open('Successfully changed.', '', {
            duration: 2000,
          });
        } else {
          this.snackBar.open(response.message, '', {
            duration: 2000,
          });
        }
      });
    }

  }
}

