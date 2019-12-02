import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let DoctorOfficeChangePasswordComponent = class DoctorOfficeChangePasswordComponent {
    constructor(formBuilder, httpService, snackBar, commonFunction, activatedRoute, cookieService, router) {
        this.formBuilder = formBuilder;
        this.httpService = httpService;
        this.snackBar = snackBar;
        this.commonFunction = commonFunction;
        this.activatedRoute = activatedRoute;
        this.cookieService = cookieService;
        this.router = router;
        this.loader = false;
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        this.headerFlag = this.activatedRoute.snapshot.url[0].path;
        this.jwtToken = cookieService.get('jwtToken');
        let allcookies;
        allcookies = cookieService.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        this.cookies_id = this.cookiesData._id;
    }
    ngOnInit() {
        //generating the form
        this.generateForm();
    }
    generateForm() {
        this.doctorOfficeChangePasswordForm = this.formBuilder.group({
            old_pwd: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            new_pwd: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirm_new_pwd: [],
        }, { validator: this.matchpassword('new_pwd', 'confirm_new_pwd') });
    }
    /**for validation purpose**/
    matchpassword(newPasswordkye, confirmPasswordkye) {
        return (group) => {
            let passwordInput = group.controls[newPasswordkye], confirmpasswordInput = group.controls[confirmPasswordkye];
            if (passwordInput.value !== confirmpasswordInput.value) {
                return confirmpasswordInput.setErrors({ notEquivalent: true });
            }
            else {
                return confirmpasswordInput.setErrors(null);
            }
        };
    }
    changePassword() {
        this.loader = true;
        if (this.doctorOfficeChangePasswordForm.valid) {
            delete this.doctorOfficeChangePasswordForm.value.confirm_new_pwd;
            var data = {
                _id: this.cookies_id,
                adminflag: 0,
                oldPassword: this.doctorOfficeChangePasswordForm.value.old_pwd,
                newPassword: this.doctorOfficeChangePasswordForm.value.new_pwd
            };
            this.httpService.httpViaPost('changepassword', data)
                .subscribe((response) => {
                // this.formDirective.resetForm();
                this.loader = false;
                if (response.Status == true) {
                    this.snackBar.open(response.message, "OK", {
                        duration: 1500
                    });
                    this.router.navigateByUrl('doctor-office/dashboard');
                }
                else {
                    this.snackBar.open(response.message, "OK", {
                        duration: 1500
                    });
                }
            }, (error => {
                this.loader = false;
                alert("Some error occurred. Please try later.");
            }));
        }
    }
};
DoctorOfficeChangePasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-doctor-office-change-password',
        templateUrl: './doctor-office-change-password.component.html',
        styleUrls: ['./doctor-office-change-password.component.css']
    })
], DoctorOfficeChangePasswordComponent);
export { DoctorOfficeChangePasswordComponent };
//# sourceMappingURL=doctor-office-change-password.component.js.map