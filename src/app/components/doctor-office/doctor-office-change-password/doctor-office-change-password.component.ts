import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , FormControl,Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { CommonFunction } from '../../../class/common/common-function';


@Component({
  selector: 'app-doctor-office-change-password',
  templateUrl: './doctor-office-change-password.component.html',
  styleUrls: ['./doctor-office-change-password.component.css']
})
export class DoctorOfficeChangePasswordComponent implements OnInit {


  doctorOfficeChangePasswordForm : FormGroup;
  loader:boolean=false;
  headerFlag:any;
  jwtToken:any;
  cookiesData:any;
  cookies_id:string;
  

  constructor( private formBuilder : FormBuilder ,private httpService : HttpServiceService ,
    private snackBar : MatSnackBar ,private commonFunction : CommonFunction , private activatedRoute : ActivatedRoute,
    private cookieService : CookieService , private router : Router) { 
       /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.headerFlag = this.activatedRoute.snapshot.url[0].path;
    this.jwtToken = cookieService.get('jwtToken');
    let allcookies: any;
    allcookies = cookieService.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;
    }

  ngOnInit() {

    //generating the form
    this.generateForm();
  }

  generateForm(){
    this.doctorOfficeChangePasswordForm = this.formBuilder.group({
      old_pwd:[ '',[Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      new_pwd:['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirm_new_pwd:[],
    }, { validator: this.matchpassword('new_pwd', 'confirm_new_pwd') });
  }
  

  /**for validation purpose**/
  matchpassword(newPasswordkye: string, confirmPasswordkye: string) {
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
  
  changePassword(){
    this.loader = true;
    if (this.doctorOfficeChangePasswordForm.valid) {
      delete this.doctorOfficeChangePasswordForm.value.confirm_new_pwd;
      var data = {
        _id: this.cookies_id,
        adminflag: 0,
        oldPassword: this.doctorOfficeChangePasswordForm.value.old_pwd,
        newPassword: this.doctorOfficeChangePasswordForm.value.new_pwd
      }
      this.httpService.httpViaPost('changepassword', data)
        .subscribe((response) => {
          // this.formDirective.resetForm();
          this.loader = false;
          if (response.Status == true) {
            this.snackBar.open(response.message, "OK", {
              duration: 1500
            });            
              this.router.navigateByUrl('doctor-office/dashboard');            
          } else {
            this.snackBar.open(response.message, "OK", {
              duration: 1500
            });            
          }

        }, (error => {
          this.loader = false;
          alert("Some error occurred. Please try later.");
        }))
    }


  }

}
