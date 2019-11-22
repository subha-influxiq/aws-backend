import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,FormGroupDirective } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

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
  date = new FormControl(new Date());
  public ddmmyy: any;
  serializedDate = new FormControl((new Date()).toISOString());
  public adminManagementAddEditForm: FormGroup;
  public user_token: any;
  public params_id: any;
  public htmlText: any = { header: 'Add New Admin', nav: 'Add Admin', buttonText: 'Save' };
  public message: any = "Submitted Successfully";
  public taxo_array:any=[];
  
  constructor(public fb: FormBuilder, private datePipe: DatePipe, public httpService: HttpServiceService, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.user_token = cookie.get('jwtToken');
    if(this.params_id){
      this.generateEditForm();
    }else{
      this.generateAddForm();
    }
    
  }

  ngOnInit() {
    if (this.activeRoute.snapshot.params._id) {
      this.message = "Updated Successfully";
      this.htmlText.header = 'Edit Admin Record';
      this.htmlText.nav = 'Edit Admin';
      this.htmlText.buttonText = 'Update';
      this.params_id = this.activeRoute.snapshot.params._id;
      this.getSingleResolveData();
    }

  }

  generateAddForm(){
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.adminManagementAddEditForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      date: [dateformat],
      type: ['admin'],
      taxo_list : [],
      status: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, { validator: this.machpassword('password', 'confirmpassword') })
  }

  generateEditForm(){
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.adminManagementAddEditForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      date: [dateformat],
      type: ['admin'],
      taxo_list : [],
      status: ['', Validators.required],
    })

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

  /**Resolve data for edit */
  getSingleResolveData() {
    this.activeRoute.data.forEach((data) => {
      let AdminSingleData: any
      AdminSingleData = data.adminsingleData.res;
      this.adminManagementAddEditForm.controls['firstname'].patchValue(AdminSingleData[0].firstname);
      this.adminManagementAddEditForm.controls['lastname'].patchValue(AdminSingleData[0].lastname);
      this.adminManagementAddEditForm.controls['email'].patchValue(AdminSingleData[0].email);
      this.adminManagementAddEditForm.controls['phone'].patchValue(AdminSingleData[0].phone);
      this.adminManagementAddEditForm.controls['status'].patchValue(AdminSingleData[0].status);
      this.adminManagementAddEditForm.controls['password'].patchValue(AdminSingleData[0].password);
    }
    )
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  /**for validation purpose**/
  ResetAddEditForm() {
    this.formDirective.resetForm();
  }

  backToManagePage(){
    this.router.navigateByUrl('/admin/admin-management');
  }

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(ChangePasswordAdminModal, {

      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  AdminManagementAddFormSubmit() {
    let x: any;
    for (x in this.adminManagementAddEditForm.controls) {
      this.adminManagementAddEditForm.controls[x].markAsTouched();
    }
    if (this.adminManagementAddEditForm.valid) {
      if (this.adminManagementAddEditForm.value.status)
        this.adminManagementAddEditForm.value.status = parseInt("1");
      else
        this.adminManagementAddEditForm.value.status = parseInt("0");
        this.adminManagementAddEditForm.value.taxo_list=this.taxo_array;
      /**delete confirmpassword  field before submitted the form */
      delete this.adminManagementAddEditForm.value.confirmpassword;
      /**end */
      var data
      if (this.params_id) {
        data = {
          "source": "users",
          "data": {
            id: this.params_id,
            firstname: this.adminManagementAddEditForm.value.firstname,
            lastname: this.adminManagementAddEditForm.value.lastname,
            phone: this.adminManagementAddEditForm.value.phone,
            email: this.adminManagementAddEditForm.value.email,
            date: this.adminManagementAddEditForm.value.data,
            password: this.adminManagementAddEditForm.value.password,
            status: this.adminManagementAddEditForm.value.status,
          },
          "token": this.user_token
        }
      } else {
        data = {
          "source": "users",
          "data": this.adminManagementAddEditForm.value,
          "token": this.user_token,
          "domainurl" : 'http://testbedpece.influxiq.com/reset-password'
        }
        

      }

      this.httpService.httpViaPost("addorupdatedata", data)
        .subscribe(response => {
          let action = "Ok";
          this.snackBar.open(this.message, action, {
            duration: 2000,
          });
          this.formDirective.resetForm();
        })

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

