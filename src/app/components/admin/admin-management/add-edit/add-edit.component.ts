import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,FormGroupDirective } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent implements OnInit {
  @ViewChild(FormGroupDirective,{static: false}) formDirective: FormGroupDirective;

  date = new FormControl(new Date());
  public ddmmyy: any;
  serializedDate = new FormControl((new Date()).toISOString());
  public adminManagementAddEditForm: FormGroup;
  public user_token: any;
  public params_id: any;
  public textTitle: any = { header: 'Add New admin', nav: 'Add Admin', buttonText: 'Submit' };
  public message: any = "Submitted Successfully";

  constructor(public fb: FormBuilder, private datePipe: DatePipe,
    public httpService: HttpServiceService, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_token = cookie.get('jwtToken');

    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');

    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.adminManagementAddEditForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      date: [dateformat],
      type: ['admin'],
      status: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, { validator: this.machpassword('password', 'confirmpassword') })
  }


  ngOnInit() {
    if (this.activeRoute.snapshot.params._id) {
      this.message = "Updated Successfully";
      this.textTitle.header = 'Update admin record';
      this.textTitle.nav = 'Update Admin';
      this.textTitle.buttonText = 'Update';
      this.params_id = this.activeRoute.snapshot.params._id;
      this.getSingleResolveData();
    }

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
          "token": this.user_token
        }

      }

      this.httpService.httpViaPost("addorupdatedata", data)
        .subscribe(response => {
          let action = "Ok";
          this.snackBar.open(this.message, action, {
            duration: 2000,
          });
          this.formDirective.resetForm();
          setTimeout(() => {
            this.router.navigateByUrl('admin/admin-management');
          }, 2200);

        })

    }
  }


}
