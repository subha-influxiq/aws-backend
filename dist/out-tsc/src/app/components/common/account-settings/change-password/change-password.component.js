import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective } from '@angular/forms';
let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(fb, cookie, router, snackBar, activeRoute, httpService, commonFunction) {
        this.fb = fb;
        this.cookie = cookie;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.httpService = httpService;
        this.commonFunction = commonFunction;
        this.loader = false;
        this.headerFlag = null;
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        this.headerFlag = this.activeRoute.snapshot.url[0].path;
        this.user_token = cookie.get('jwtToken');
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        this.cookies_id = this.cookiesData._id;
        this.ChangePasswordForm = fb.group({
            oldPassword: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            newPassword: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirmPassword: [],
        }, { validator: this.machpassword('newPassword', 'confirmPassword') });
    }
    ngOnInit() {
    }
    /**for validation purpose**/
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /**for validation purpose**/
    machpassword(newPasswordkye, confirmPasswordkye) {
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
    CancelRedirectToDashboard() {
        this.router.navigateByUrl('/admin/dashboard');
    }
    ChangePasswordFormSubmit() {
        this.loader = true;
        let x;
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
            };
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
                }
                else {
                    this.snackBar.open(response.message, "OK", {
                        duration: 1500
                    });
                }
            }, (error => {
                this.loader = false;
                alert("Some error occord. Please try later.");
            }));
        }
    }
};
tslib_1.__decorate([
    ViewChild(FormGroupDirective, { static: false })
], ChangePasswordComponent.prototype, "formDirective", void 0);
ChangePasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-change-password',
        templateUrl: './change-password.component.html',
        styleUrls: ['./change-password.component.css']
    })
], ChangePasswordComponent);
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map