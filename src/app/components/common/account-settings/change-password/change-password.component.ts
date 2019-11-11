import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective} from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  @ViewChild(FormGroupDirective,{static: false}) formDirective: FormGroupDirective;

  public ChangePasswordForm: FormGroup;
  public user_token: any;
  public params_id: any;
  public states: any;
  public allCities: any;
  public cities: any;
  public cookiesData: any;
  public cookies_id: any;
  public loader: any = false;
  public headerFlag: string = null;

  constructor(public fb: FormBuilder, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public httpService: HttpServiceService, public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.headerFlag = this.activeRoute.snapshot.url[0].path;
    this.user_token = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;

    this.ChangePasswordForm = fb.group({
      oldPassword: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmPassword: [],
    }, { validator: this.machpassword('newPassword', 'confirmPassword') })
  }

  ngOnInit() {
  }
/**for validation purpose**/
inputUntouch(form: any, val: any) {
  form.controls[val].markAsUntouched();
}
/**for validation purpose**/
  machpassword(newPasswordkye: string, confirmPasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[newPasswordkye],
        confirmpasswordInput = group.controls[confirmPasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      }
      else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

 

  CancelRedirectToDashboard() {
    this.router.navigateByUrl('/admin/dashboard');
  }

  ChangePasswordFormSubmit() {
    this.loader = true;

    let x: any;
    for (x in this.ChangePasswordForm.controls) {
      this.ChangePasswordForm.controls[x].markAsTouched();
    }

    if (this.ChangePasswordForm.valid) {
      delete this.ChangePasswordForm.value.confirmPassword;
      var data = {
        _id: this.cookies_id,
        adminflag: 0,
        oldPassword: this.ChangePasswordForm.value.oldPassword,
        newPassword: this.ChangePasswordForm.value.newPassword
      }
      this.httpService.httpViaPost('changepassword', data)
        .subscribe((response) => {
          this.formDirective.resetForm();
          this.loader = false;
          if (response.status == true) {
            this.snackBar.open(response.message, "OK", {
              duration: 1500
            });
            setTimeout(() => {
              this.router.navigateByUrl('/admin/dashboard');
            }, 1550);
          } else {
            this.snackBar.open(response.message, "OK", {
              duration: 1500
            });
          }

        }, (error => {
          this.loader = false;
          alert("Some error occord. Please try later.");
        }))
    }

  }

}
