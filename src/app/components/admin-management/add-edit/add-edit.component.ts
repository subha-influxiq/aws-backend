import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  date = new FormControl(new Date());
  public ddmmyy: any;
  serializedDate = new FormControl((new Date()).toISOString());
  public adminManagementAddEditForm: FormGroup;
  public user_token: any;
  constructor(public fb: FormBuilder, private datePipe: DatePipe,
    public httpService: HttpServiceService, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar) {
    this.user_token = cookie.get('jwtToken');

    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');

    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.adminManagementAddEditForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phoneno: ['', Validators.required],
      date: [dateformat],
      status: ['', Validators.required],
      // password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [],
      confirmpassword: ['', Validators.required],

    }, { validator: this.machpassword('password', 'confirmpassword') })
  }


  ngOnInit() {

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
  /**for validation purpose**/
  ResetAddEditForm() {
    this.adminManagementAddEditForm.reset();
  }
  AdminManagementAddFormSubmit() {
    console.log(this.adminManagementAddEditForm.value);
    let x: any;
    for (x in this.adminManagementAddEditForm.controls) {
      this.adminManagementAddEditForm.controls[x].markAsTouched();
    }
    if (this.adminManagementAddEditForm.valid) {
      if (this.adminManagementAddEditForm.value.status)
        this.adminManagementAddEditForm.value.status = parseInt("1");
      else
        this.adminManagementAddEditForm.value.status = parseInt("0");
      var data = {
        "source": "admin_management",
        "data": this.adminManagementAddEditForm.value,
        "token": this.user_token
      }
      this.httpService.httpViaPost("addorupdatedata", data)
        .subscribe(response => {
          let message = "Submitted Successfully";
          let action = "Ok";
          this.snackBar.open(message, action, {
            duration: 2000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('/admin-management/list');
          }, 2200);

        })

    }
  }


}
