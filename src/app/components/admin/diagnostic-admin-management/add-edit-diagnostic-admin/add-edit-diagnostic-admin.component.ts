import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
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
  selector: 'app-add-edit-diagnostic-admin',
  templateUrl: './add-edit-diagnostic-admin.component.html',
  styleUrls: ['./add-edit-diagnostic-admin.component.css']
})

export class AddEditDiagnosticAdminComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public DiagnosticAdminManagementAddEditForm: FormGroup;
  public dialogRef: any;

  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add Diagnostic Admin', 
    nav: 'Add Diagnostic Admin', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    states: "",
    allCities: "",
    cities: ""
  };
  public contactPerson: any = new FormArray([]);

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snackBar: MatSnackBar, public commonFunction: CommonFunction,
    public dialog: MatDialog) {
    
    this.htmlText.userData = cookie.getAll();
    this.allStateCityData();

    if (this.activeRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.message     = "Updated Successfully";
      this.htmlText.header      = 'Edit Diagnostic Admin';
      this.htmlText.nav         = 'Edit Diagnostic Admin';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:               ['', []],
      center_name:      ['', [ Validators.required, Validators.maxLength(50) ]],
      email:            ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:            ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      fax:              ['', [ Validators.minLength(7), Validators.maxLength(16) ]],
      address:          ['', [ Validators.required, Validators.maxLength(200) ]],
      zip:              ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ]],
      city:             ['', [ Validators.required ]],
      state:            ['', [ Validators.required ]],
      user_type:        ['diagnostic_admin', []],
      status:           ['', []],
      password:         ['', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ]],
      confirmpassword:  ['', [ Validators.required ]],

      // Contact person
      contact_person_1_name:            ['', [ Validators.maxLength(50) ]],
      contact_person_1_email:           ['', [ Validators.email, Validators.maxLength(100) ]],
      contact_person_1_phone:           ['', [ Validators.minLength(7), Validators.maxLength(16) ]],
      contact_person_2_name:            ['', [ Validators.maxLength(50) ]],
      contact_person_2_email:           ['', [ Validators.email, Validators.maxLength(100) ]],
      contact_person_2_phone:           ['', [ Validators.minLength(7), Validators.maxLength(16) ]],
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.DiagnosticAdminManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          console.log(data);
          let diagnosticAdmin :any = data.data.res[0];
          setTimeout(() => {
            this.getCity(diagnosticAdmin.state);
          }, 1000);

          this.DiagnosticAdminManagementAddEditForm.controls['id'].patchValue(diagnosticAdmin._id);
          this.DiagnosticAdminManagementAddEditForm.controls['center_name'].patchValue(diagnosticAdmin.center_name);
          this.DiagnosticAdminManagementAddEditForm.controls['email'].patchValue(diagnosticAdmin.email);
          this.DiagnosticAdminManagementAddEditForm.controls['phone'].patchValue(diagnosticAdmin.phone);
          this.DiagnosticAdminManagementAddEditForm.controls['fax'].patchValue(diagnosticAdmin.phone);
          this.DiagnosticAdminManagementAddEditForm.controls['address'].patchValue(diagnosticAdmin.address);
          this.DiagnosticAdminManagementAddEditForm.controls['zip'].patchValue(diagnosticAdmin.zip);
          this.DiagnosticAdminManagementAddEditForm.controls['city'].patchValue(diagnosticAdmin.city);
          this.DiagnosticAdminManagementAddEditForm.controls['state'].patchValue(diagnosticAdmin.state);
          this.DiagnosticAdminManagementAddEditForm.controls['status'].patchValue(diagnosticAdmin.status);

          this.DiagnosticAdminManagementAddEditForm.controls['contact_person_1_name'].patchValue(diagnosticAdmin.contact_person[0].name);
          this.DiagnosticAdminManagementAddEditForm.controls['contact_person_1_email'].patchValue(diagnosticAdmin.contact_person[0].email);
          this.DiagnosticAdminManagementAddEditForm.controls['contact_person_1_phone'].patchValue(diagnosticAdmin.contact_person[0].phone);
          this.DiagnosticAdminManagementAddEditForm.controls['contact_person_2_name'].patchValue(diagnosticAdmin.contact_person[1].name);
          this.DiagnosticAdminManagementAddEditForm.controls['contact_person_2_email'].patchValue(diagnosticAdmin.contact_person[1].email);
          this.DiagnosticAdminManagementAddEditForm.controls['contact_person_2_phone'].patchValue(diagnosticAdmin.contact_person[1].phone);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.DiagnosticAdminManagementAddEditForm = this.fb.group(validateRule);
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
    this.dialogRef = this.dialog.open(DiagnosticAdminPasswordChange, {
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
    for (let x in this.DiagnosticAdminManagementAddEditForm.controls) {
      this.DiagnosticAdminManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.DiagnosticAdminManagementAddEditForm.valid) {
      delete this.DiagnosticAdminManagementAddEditForm.value.confirmpassword;

      if (this.DiagnosticAdminManagementAddEditForm.value.status) {
        this.DiagnosticAdminManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.DiagnosticAdminManagementAddEditForm.value.status = parseInt("0");
      }

      // data structure
      this.DiagnosticAdminManagementAddEditForm.value.contact_person = [
        { 
          "name": this.DiagnosticAdminManagementAddEditForm.value.contact_person_1_name,
          "email": this.DiagnosticAdminManagementAddEditForm.value.contact_person_1_email,
          "phone": this.DiagnosticAdminManagementAddEditForm.value.contact_person_1_phone
        },
        { 
          "name": this.DiagnosticAdminManagementAddEditForm.value.contact_person_2_name,
          "email": this.DiagnosticAdminManagementAddEditForm.value.contact_person_2_email,
          "phone": this.DiagnosticAdminManagementAddEditForm.value.contact_person_2_phone
        }
      ];
      delete this.DiagnosticAdminManagementAddEditForm.value.contact_person_1_name;
      delete this.DiagnosticAdminManagementAddEditForm.value.contact_person_1_email;
      delete this.DiagnosticAdminManagementAddEditForm.value.contact_person_1_phone;
      delete this.DiagnosticAdminManagementAddEditForm.value.contact_person_2_name;
      delete this.DiagnosticAdminManagementAddEditForm.value.contact_person_2_email;
      delete this.DiagnosticAdminManagementAddEditForm.value.contact_person_2_phone;

      var data: any = {
        "source": "data_pece",
        "data": this.DiagnosticAdminManagementAddEditForm.value,
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
            this.router.navigateByUrl("admin/diagnostic-admin-management");
          }, 2000);
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
  selector: 'diagnostic-admin-password-change',
  templateUrl: 'modal.html',
})

export class DiagnosticAdminPasswordChange {
  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<DiagnosticAdminPasswordChange>,
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
