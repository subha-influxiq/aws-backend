import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  public ChangePasswordForm: FormGroup;
  public user_token: any;
  public params_id: any;
  public states: any;
  public allCities: any;
  public cities: any;
  public cookiesData: any;
  public cookies_id: any;
  public adminHeader: any = AdminHeaderComponent;
  public loader: any = false;

  constructor(public fb: FormBuilder, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public httpService: HttpServiceService) {

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

  ResetForm() {
    this.ChangePasswordForm.reset();
  }

  CancelRedirectToDashboard() {
    this.router.navigateByUrl('/dashboard/admin');
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
        oldPassword: this.ChangePasswordForm.value.oldPassword,
        newPassword: this.ChangePasswordForm.value.newPassword
      }
      this.httpService.httpViaPost('changepassword', data)
        .subscribe((response) => {
          this.ResetForm();
          this.loader = false;
          if (response.status == true) {
            
            this.snackBar.open(response.message, "OK", {
              duration: 1500
            });
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
