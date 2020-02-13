import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, AbstractControl } from '@angular/forms';
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
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent implements OnInit {
  
  @ViewChild(FormGroupDirective,{static: false}) formDirective: FormGroupDirective;
  public dialogRef: any;
  public adminManagementAddEditForm: FormGroup;
  public params_id: any = '';
  public htmlText: any = {
    userData: "",
    header: 'Add New Admin', 
    nav: 'Add Admin', 
    buttonText: 'Save',
    message: "Submitted Successfully"
  };
  public taxo_array: any = [];
  
  constructor(public fb: FormBuilder, private datePipe: DatePipe, public httpService: HttpServiceService, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    
    this.htmlText.userData = cookie.getAll();
    
    if (this.activeRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.message     = "Updated Successfully";
      this.htmlText.header      = 'Edit Admin Record';
      this.htmlText.nav         = 'Edit Admin';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  ngOnInit() {
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:               ['', []],
      firstname:        ['', [ Validators.required, Validators.maxLength(50) ]],
      lastname:         ['', [ Validators.required, Validators.maxLength(50) ]],
      email:            ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:            ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      user_type:        ['admin', []],
      status:           ['', [ Validators.required ]],
      password:         ['', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ]],
      confirmpassword:  [],
    };
    let passwordRule: any = { validator: this.machpassword('password', 'confirmpassword') };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.adminManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          let AdminSingleData: any = data.adminsingleData.res;
    
          this.adminManagementAddEditForm.controls['id'].patchValue(AdminSingleData[0]._id);
          this.adminManagementAddEditForm.controls['firstname'].patchValue(AdminSingleData[0].firstname);
          this.adminManagementAddEditForm.controls['lastname'].patchValue(AdminSingleData[0].lastname);
          this.adminManagementAddEditForm.controls['email'].patchValue(AdminSingleData[0].email);
          this.adminManagementAddEditForm.controls['phone'].patchValue(AdminSingleData[0].phone);
          this.adminManagementAddEditForm.controls['status'].patchValue(AdminSingleData[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;

        this.adminManagementAddEditForm = this.fb.group(validateRule, passwordRule);
        break;
    }
  }

  validateEmailNotTaken(control: AbstractControl) {  
    return (control: AbstractControl) => {
      return this.httpService.checkingDuplicateEmail(control.value).subscribe((res) => {
        if(res.data.length == 0) {
          return { emailTaken: false }; 
        } else {
          return { emailTaken: true };
        }
      });
    };
  }

  machpassword(passwordkye: string, confirmpasswordkye: string) {
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

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(ChangePasswordAdminModal, {
      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  AdminManagementAddFormSubmit() {
    for (let x in this.adminManagementAddEditForm.controls) {
      this.adminManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.adminManagementAddEditForm.valid) {
      delete this.adminManagementAddEditForm.value.confirmpassword;
      if (this.adminManagementAddEditForm.value.status) {
        this.adminManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.adminManagementAddEditForm.value.status = parseInt("0");
      }

      var data: any = {
        "source": "data_pece",
        "data": this.adminManagementAddEditForm.value,
        "token": this.htmlText.userData.jwtToken,
        "domainurl" : environment.siteBaseUrl + 'reset-password'
      };

      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if(response.status == 'success') {
          this.snackBar.open(this.htmlText.message, "Ok", {
            duration: 2000,
          });
          this.formDirective.resetForm();
          setTimeout(() => {
            this.router.navigateByUrl('/admin/admin-management');
          }, 1000);
        } else {
          this.snackBar.open("An error occoed. Error code: F-AEA-TS-164.", "Ok", {
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

export class ChangePasswordAdminModal {
  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<ChangePasswordAdminModal>,
    public fb: FormBuilder, public httpService: HttpServiceService, public cookie: CookieService,
    public activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.params_id = data.id;

    this.user_token = cookie.get('jwtToken');
    this.changePwdForm = this.fb.group({
      password: ['', Validators.required],
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
      this.httpService.httpViaPost('changepassword',data).subscribe((response)=>{
        console.log("response",response);
      });
    }
  }
}

