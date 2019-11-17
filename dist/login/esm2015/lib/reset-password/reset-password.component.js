/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';
export class ResetPasswordComponent {
    /**
     * @param {?} fb
     * @param {?} http
     * @param {?} router
     * @param {?} route
     * @param {?} apiService
     * @param {?} snackBar
     */
    constructor(fb, http, router, route, apiService, snackBar) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.route = route;
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.fromTitleNameValue = '';
        this.serverUrlValue = '';
        this.message = '';
        this.addEndpointValue = '';
        this.logoValue = '';
        // public signUpRouteingUrlValue: any = '';
        this.durationInSeconds = 5; // This is SnackBar set time
        this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        params => {
            this.accesscode = params['token'];
            console.log(this.accesscode);
        }));
        this.resetPasswordForm = this.fb.group({
            // password: ['',  Validators.compose([Validators.required, Validators.minLength(4)])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {
            validator: this.machpassword('password', 'confirmPassword')
        });
    }
    // This is SnackBar set time
    /**
     * @param {?} fromTitleNameVal
     * @return {?}
     */
    set fromTitleName(fromTitleNameVal) {
        this.fromTitleNameValue = (fromTitleNameVal) || '<no name set>';
        this.fromTitleNameValue = fromTitleNameVal;
        console.log(this.fromTitleNameValue);
    }
    /**
     * @param {?} serverUrlVal
     * @return {?}
     */
    set serverUrl(serverUrlVal) {
        this.serverUrlValue = (serverUrlVal) || '<no name set>';
        this.serverUrlValue = serverUrlVal;
        console.log(this.serverUrlValue);
    }
    /**
     * @param {?} addEndpointVal
     * @return {?}
     */
    set addEndpoint(addEndpointVal) {
        this.addEndpointValue = addEndpointVal;
    }
    /**
     * @param {?} logoVal
     * @return {?}
     */
    set logo(logoVal) {
        this.logoValue = logoVal;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.apiService.clearServerUrl(); // Clear the server url
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.apiService.setServerUrl(this.serverUrlValue); // set the server url 
        }), 50);
        // console.log(this.serverURL);
        this.apiService.clearaddEndpoint(); // clear the endpoint 
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.apiService.setaddEndpoint(this.addEndpointValue.endpoint); // set the endpoint
        }), 50);
        // console.log(this.addEndpointData.endpoint);
    }
    //  this function is use for mach password and confirm Password 
    /**
     * @param {?} passwordkye
     * @param {?} confirmpasswordkye
     * @return {?}
     */
    machpassword(passwordkye, confirmpasswordkye) {
        return (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            /** @type {?} */
            let passwordInput = group.controls[passwordkye];
            /** @type {?} */
            let confirmpasswordInput = group.controls[confirmpasswordkye];
            if (passwordInput.value !== confirmpasswordInput.value) {
                return confirmpasswordInput.setErrors({ notEquivalent: true });
            }
            else {
                return confirmpasswordInput.setErrors(null);
            }
        });
    }
    /**
     * ****** Reset Password Form Submit start here********
     * @return {?}
     */
    resetPasswordSubmit() {
        console.log(this.resetPasswordForm.value);
        /** @type {?} */
        let x;
        for (x in this.resetPasswordForm.controls) {
            this.resetPasswordForm.controls[x].markAsTouched();
        }
        if (this.resetPasswordForm.valid) {
            /** @type {?} */
            let data1 = { "password": this.resetPasswordForm.value.password, "accesscode": this.accesscode };
            /** @type {?} */
            let data = {
                'data': data1,
                "source": this.addEndpointValue.source
            }
            // data.accesscode = this.accesscode;
            ;
            // data.accesscode = this.accesscode;
            this.apiService.addData(data).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                /** @type {?} */
                let result = {};
                result = response;
                console.log(result);
                if (result.status == "success") {
                    this.openSnackBar();
                    this.formDirective.resetForm(); // Use for reset the form
                    this.message = '';
                }
                else {
                    this.message = result.msg;
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    openSnackBar() {
        this.snackBar.openFromComponent(snackBarResetComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }
    /**
     * ****** Reset Password Form Submit end here********
     * @param {?} val
     * @return {?}
     */
    inputUntouched(val) {
        this.resetPasswordForm.controls[val].markAsUntouched();
    }
}
ResetPasswordComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-reset-password',
                template: "<div class=\"main-div\">\n\n  <mat-card class=\"from\">\n      <span class=\"logowrapper\" *ngIf=\"logoValue != ''\" >\n          <img  [src]=\"logoValue\">\n      </span>\n\n    <h2 *ngIf=\"fromTitleNameValue != ''\"> {{fromTitleNameValue}}</h2>\n\n\n    <form class=\"example-container\" [formGroup]=\"resetPasswordForm\" (ngSubmit)=\"resetPasswordSubmit()\" novalidate>\n<mat-error class=\"error\" *ngIf=\"message !=''\">{{message}}</mat-error>\n\n      <mat-form-field>\n        <input matInput placeholder=\"Enter New Password\" type=\"password\" formControlName=\"password\" \n        (blur)=\"inputUntouched('password')\">\n        <mat-error\n          *ngIf=\"!resetPasswordForm.controls['password'].valid && resetPasswordForm.controls['password'].errors.required && resetPasswordForm.controls['password'].touched\">\n          Password field can not be blank</mat-error>\n          <!-- <mat-error  *ngIf=\"!resetPasswordForm.controls['password'].errors.required  && resetPasswordForm.controls['password'].touched\">Minimum length for password is 4!</mat-error> -->\n      </mat-form-field>\n\n      <mat-form-field>\n        <input matInput placeholder=\"Confirm New Password\" type=\"password\"  formControlName=\"confirmPassword\" (blur)=\"inputUntouched('confirmPassword')\">\n        <mat-error\n          *ngIf=\"!resetPasswordForm.controls['confirmPassword'].valid && resetPasswordForm.controls['confirmPassword'].errors.required && resetPasswordForm.controls['confirmPassword'].touched\">\n          Confirm Password field can not be blank</mat-error>\n        <!-- <mat-error *ngIf=\"f.confirmPassword.errors.mustMatch\">Confirm Password is not valid</mat-error> -->\n        <mat-error *ngIf=\"!resetPasswordForm.controls['confirmPassword'].valid && resetPasswordForm.controls['confirmPassword'].touched\">Password does not match </mat-error>\n      </mat-form-field>\n\n      <button mat-raised-button color=\"primary\">Update Password</button>\n\n    </form>\n  </mat-card>\n</div>\n\n<!-- <button (click)=\"openSnackBar('succes', 'ok')\"> ok</button> -->",
                styles: [".example-container{display:flex;flex-direction:column}.example-container>*{width:100%}.from{width:30%;margin:0 auto}.from h2{text-align:center;background-color:#00f;color:#fff;padding:15px}.from a{padding-right:30px}.main-div{height:100vh;display:flex;justify-content:center;align-items:center}.signupfooter{margin-top:12px;display:flex;justify-content:space-between;align-items:center}.signupfooter a{cursor:pointer}.error{text-align:center}.logowrapper{margin:0 auto;display:block;text-align:center}"]
            }] }
];
/** @nocollapse */
ResetPasswordComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: HttpClient },
    { type: Router },
    { type: ActivatedRoute },
    { type: ApiService },
    { type: MatSnackBar }
];
ResetPasswordComponent.propDecorators = {
    formDirective: [{ type: ViewChild, args: [FormGroupDirective,] }],
    fromTitleName: [{ type: Input }],
    serverUrl: [{ type: Input }],
    addEndpoint: [{ type: Input }],
    logo: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ResetPasswordComponent.prototype.formDirective;
    /** @type {?} */
    ResetPasswordComponent.prototype.resetPasswordForm;
    /** @type {?} */
    ResetPasswordComponent.prototype.fromTitleNameValue;
    /** @type {?} */
    ResetPasswordComponent.prototype.serverUrlValue;
    /** @type {?} */
    ResetPasswordComponent.prototype.message;
    /** @type {?} */
    ResetPasswordComponent.prototype.addEndpointValue;
    /** @type {?} */
    ResetPasswordComponent.prototype.logoValue;
    /** @type {?} */
    ResetPasswordComponent.prototype.durationInSeconds;
    /** @type {?} */
    ResetPasswordComponent.prototype.accesscode;
    /** @type {?} */
    ResetPasswordComponent.prototype.fb;
    /** @type {?} */
    ResetPasswordComponent.prototype.http;
    /** @type {?} */
    ResetPasswordComponent.prototype.router;
    /** @type {?} */
    ResetPasswordComponent.prototype.route;
    /** @type {?} */
    ResetPasswordComponent.prototype.apiService;
    /**
     * @type {?}
     * @private
     */
    ResetPasswordComponent.prototype.snackBar;
}
export class snackBarResetComponent {
}
snackBarResetComponent.decorators = [
    { type: Component, args: [{
                selector: 'snack-bar-modale',
                template: `Password changed successfully`,
                styles: [`
    .example {
      color: aliceblue;
      background-color: yellowgreen;
    }
  `]
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQWEsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBVWhELE1BQU0sT0FBTyxzQkFBc0I7Ozs7Ozs7OztJQW9EakMsWUFBbUIsRUFBZSxFQUFTLElBQWdCLEVBQVMsTUFBYyxFQUFTLEtBQXFCLEVBQVMsVUFBc0IsRUFBVyxRQUFxQjtRQUE1SixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVyxhQUFRLEdBQVIsUUFBUSxDQUFhO1FBaER4Syx1QkFBa0IsR0FBUSxFQUFFLENBQUM7UUFDN0IsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFDekIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFFM0IsY0FBUyxHQUFRLEVBQUUsQ0FBQzs7UUFFcEIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQWEsNEJB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QUFBO1NBQ0g7SUFDSCxDQUFDOzs7O0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUU7WUFDdEQsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQU1ELGNBQWMsQ0FBQyxHQUFRO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekQsQ0FBQzs7O1lBM0pGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qix5aUVBQThDOzthQUUvQzs7OztZQVZRLFdBQVc7WUFDWCxVQUFVO1lBQ1YsTUFBTTtZQUFFLGNBQWM7WUFDdEIsVUFBVTtZQUNWLFdBQVc7Ozs0QkFZakIsU0FBUyxTQUFDLGtCQUFrQjs0QkFZNUIsS0FBSzt3QkFTTCxLQUFLOzBCQVFMLEtBQUs7bUJBTUwsS0FBSzs7OztJQW5DTiwrQ0FBaUU7O0lBQ2pFLG1EQUFvQzs7SUFDcEMsb0RBQW9DOztJQUNwQyxnREFBZ0M7O0lBQ2hDLHlDQUF5Qjs7SUFDekIsa0RBQWtDOztJQUVsQywyQ0FBMkI7O0lBRTNCLG1EQUE2Qjs7SUF1QzdCLDRDQUEwQjs7SUFFZCxvQ0FBc0I7O0lBQUUsc0NBQXVCOztJQUFFLHdDQUFxQjs7SUFBRSx1Q0FBNEI7O0lBQUUsNENBQTZCOzs7OztJQUFHLDBDQUE2Qjs7QUFnSGpMLE1BQU0sT0FBTyxzQkFBc0I7OztZQVZsQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFLCtCQUErQjt5QkFDaEM7Ozs7O0dBS1I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1Hcm91cERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLXJlc2V0LXBhc3N3b3JkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmNzcyddXG59KVxuXG5cblxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyAgIEZvcm1Hcm91cERpcmVjdGl2ZTogSXQgaXMgYSBkaXJlY3RpdmUgdGhhdCBiaW5kcyBhbiBleGlzdGluZyBGb3JtR3JvdXAgdG8gYSBET00gZWxlbWVudC5cbiAgQFZpZXdDaGlsZChGb3JtR3JvdXBEaXJlY3RpdmUpIGZvcm1EaXJlY3RpdmU6IEZvcm1Hcm91cERpcmVjdGl2ZTtcbiAgcHVibGljIHJlc2V0UGFzc3dvcmRGb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyBmcm9tVGl0bGVOYW1lVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgc2VydmVyVXJsVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgbWVzc2FnZTogYW55ID0gJyc7XG4gIHB1YmxpYyBhZGRFbmRwb2ludFZhbHVlOiBhbnkgPSAnJztcblxuICBwdWJsaWMgbG9nb1ZhbHVlOiBhbnkgPSAnJztcbiAgLy8gcHVibGljIHNpZ25VcFJvdXRlaW5nVXJsVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgZHVyYXRpb25JblNlY29uZHMgPSA1OyAgICAgICAgICAgICAvLyBUaGlzIGlzIFNuYWNrQmFyIHNldCB0aW1lXG5cblxuICBASW5wdXQoKSAgICAgICAgIC8vIFNldCB0aGUgRm9ybSBuYW1lXG4gIHNldCBmcm9tVGl0bGVOYW1lKGZyb21UaXRsZU5hbWVWYWw6IGFueSkge1xuICAgIHRoaXMuZnJvbVRpdGxlTmFtZVZhbHVlID0gKGZyb21UaXRsZU5hbWVWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLmZyb21UaXRsZU5hbWVWYWx1ZSA9IGZyb21UaXRsZU5hbWVWYWw7XG4gICAgY29uc29sZS5sb2codGhpcy5mcm9tVGl0bGVOYW1lVmFsdWUpO1xuXG4gIH1cblxuXG4gIEBJbnB1dCgpICAgICAgICAvLyBzZXR0aW5nIHRoZSBzZXJ2ZXIgdXJsIGZyb20gcHJvamVjdFxuICBzZXQgc2VydmVyVXJsKHNlcnZlclVybFZhbDogYW55KSB7XG4gICAgdGhpcy5zZXJ2ZXJVcmxWYWx1ZSA9IChzZXJ2ZXJVcmxWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLnNlcnZlclVybFZhbHVlID0gc2VydmVyVXJsVmFsO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VydmVyVXJsVmFsdWUpO1xuXG4gIH1cblxuICBASW5wdXQoKSAgICAgICAgLy8gc2V0IHRoZSBlbmRwb2ludCBhbmQgc291cmNlXG5cbiAgcHVibGljIHNldCBhZGRFbmRwb2ludChhZGRFbmRwb2ludFZhbDogYW55KSB7XG4gICAgdGhpcy5hZGRFbmRwb2ludFZhbHVlID0gYWRkRW5kcG9pbnRWYWw7XG4gIH1cblxuICBASW5wdXQoKSAgICAgIC8vIHNldCB0aGUgZnJvbSBsb2dvXG5cbnNldCBsb2dvKGxvZ29WYWwgOiBhbnkpIHtcbiAgdGhpcy5sb2dvVmFsdWUgPSBsb2dvVmFsO1xufVxuXG5cbiAgLy8gQElucHV0KCkgICAgICAgICAgLy8gc2V0dGluZyB0aGUgbmF2aWdhdGUgQnkgU2lnbiBVcCBVcmwgZnJvbSBwcm9qZWN0XG4gIC8vIHNldCBzaWduVXBSb3V0ZWluZ1VybChyb3V0ZWluZ1VybHZhbDogYW55KSB7XG4gIC8vICAgdGhpcy5zaWduVXBSb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gIC8vICAgdGhpcy5zaWduVXBSb3V0ZWluZ1VybFZhbHVlID0gcm91dGVpbmdVcmx2YWw7XG4gIC8vICAgY29uc29sZS5sb2codGhpcy5zaWduVXBSb3V0ZWluZ1VybFZhbHVlKTtcbiAgLy8gfVxuICBwdWJsaWMgYWNjZXNzY29kZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmYjogRm9ybUJ1aWxkZXIsIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHB1YmxpYyBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLCAgcHJpdmF0ZSBzbmFja0JhcjogTWF0U25hY2tCYXIpIHtcblxuICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuXG4gICAgICB0aGlzLmFjY2Vzc2NvZGUgPSBwYXJhbXNbJ3Rva2VuJ107XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmFjY2Vzc2NvZGUpO1xuICAgIH0pXG5cbiAgICB0aGlzLnJlc2V0UGFzc3dvcmRGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAvLyBwYXNzd29yZDogWycnLCAgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1pbkxlbmd0aCg0KV0pXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgY29uZmlybVBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgIH0sIHtcbiAgICAgIHZhbGlkYXRvcjogdGhpcy5tYWNocGFzc3dvcmQoJ3Bhc3N3b3JkJywgJ2NvbmZpcm1QYXNzd29yZCcpXG4gICAgfSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBpU2VydmljZS5jbGVhclNlcnZlclVybCgpOyAgICAgICAvLyBDbGVhciB0aGUgc2VydmVyIHVybFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hcGlTZXJ2aWNlLnNldFNlcnZlclVybCh0aGlzLnNlcnZlclVybFZhbHVlKTsgICAgICAgLy8gc2V0IHRoZSBzZXJ2ZXIgdXJsIFxuICAgIH0sIDUwKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVSTCk7XG5cblxuICAgIHRoaXMuYXBpU2VydmljZS5jbGVhcmFkZEVuZHBvaW50KCk7ICAgICAgIC8vIGNsZWFyIHRoZSBlbmRwb2ludCBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5zZXRhZGRFbmRwb2ludCh0aGlzLmFkZEVuZHBvaW50VmFsdWUuZW5kcG9pbnQpOyAgICAgICAvLyBzZXQgdGhlIGVuZHBvaW50XG4gICAgfSwgNTApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWRkRW5kcG9pbnREYXRhLmVuZHBvaW50KTtcblxuICB9XG4gIC8vICB0aGlzIGZ1bmN0aW9uIGlzIHVzZSBmb3IgbWFjaCBwYXNzd29yZCBhbmQgY29uZmlybSBQYXNzd29yZCBcblxuICBtYWNocGFzc3dvcmQocGFzc3dvcmRreWU6IHN0cmluZywgY29uZmlybXBhc3N3b3Jka3llOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKGdyb3VwOiBGb3JtR3JvdXApID0+IHtcbiAgICAgIGxldCBwYXNzd29yZElucHV0ID0gZ3JvdXAuY29udHJvbHNbcGFzc3dvcmRreWVdLFxuICAgICAgICBjb25maXJtcGFzc3dvcmRJbnB1dCA9IGdyb3VwLmNvbnRyb2xzW2NvbmZpcm1wYXNzd29yZGt5ZV07XG4gICAgICBpZiAocGFzc3dvcmRJbnB1dC52YWx1ZSAhPT0gY29uZmlybXBhc3N3b3JkSW5wdXQudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpcm1wYXNzd29yZElucHV0LnNldEVycm9ycyh7IG5vdEVxdWl2YWxlbnQ6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpcm1wYXNzd29yZElucHV0LnNldEVycm9ycyhudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cblxuXG4vKioqKioqKioqIFJlc2V0IFBhc3N3b3JkIEZvcm0gU3VibWl0IHN0YXJ0IGhlcmUqKioqKioqKiovIFxuICByZXNldFBhc3N3b3JkU3VibWl0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucmVzZXRQYXNzd29yZEZvcm0udmFsdWUpO1xuICAgIGxldCB4OiBhbnk7XG4gICAgZm9yICh4IGluIHRoaXMucmVzZXRQYXNzd29yZEZvcm0uY29udHJvbHMpIHtcbiAgICAgIHRoaXMucmVzZXRQYXNzd29yZEZvcm0uY29udHJvbHNbeF0ubWFya0FzVG91Y2hlZCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXNldFBhc3N3b3JkRm9ybS52YWxpZCkge1xuICAgICAgbGV0IGRhdGExOiBhbnkgPSB7IFwicGFzc3dvcmRcIjogdGhpcy5yZXNldFBhc3N3b3JkRm9ybS52YWx1ZS5wYXNzd29yZCwgXCJhY2Nlc3Njb2RlXCI6IHRoaXMuYWNjZXNzY29kZSB9XG4gICAgICBsZXQgZGF0YTogYW55ID0ge1xuICAgICAgICAnZGF0YSc6IGRhdGExLFxuICAgICAgICBcInNvdXJjZVwiOiB0aGlzLmFkZEVuZHBvaW50VmFsdWUuc291cmNlXG4gICAgICB9XG5cblxuICAgICAgLy8gZGF0YS5hY2Nlc3Njb2RlID0gdGhpcy5hY2Nlc3Njb2RlO1xuXG4gICAgICB0aGlzLmFwaVNlcnZpY2UuYWRkRGF0YShkYXRhKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgICByZXN1bHQgPSByZXNwb25zZTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgICB0aGlzLm9wZW5TbmFja0JhcigpO1xuICAgICAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5yZXNldEZvcm0oKTsgICAgICAgLy8gVXNlIGZvciByZXNldCB0aGUgZm9ybVxuICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3VsdC5tc2c7XG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuXG4gIG9wZW5TbmFja0JhcigpIHtcbiAgICB0aGlzLnNuYWNrQmFyLm9wZW5Gcm9tQ29tcG9uZW50KHNuYWNrQmFyUmVzZXRDb21wb25lbnQsIHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmR1cmF0aW9uSW5TZWNvbmRzICogMTAwMCxcbiAgICB9KTtcbiAgfVxuXG5cbi8qKioqKioqKiogUmVzZXQgUGFzc3dvcmQgRm9ybSBTdWJtaXQgZW5kIGhlcmUqKioqKioqKiovIFxuXG5cbiAgaW5wdXRVbnRvdWNoZWQodmFsOiBhbnkpIHtcbiAgICB0aGlzLnJlc2V0UGFzc3dvcmRGb3JtLmNvbnRyb2xzW3ZhbF0ubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cblxuXG5cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbmFjay1iYXItbW9kYWxlJyxcbiAgdGVtcGxhdGU6IGBQYXNzd29yZCBjaGFuZ2VkIHN1Y2Nlc3NmdWxseWAsXG4gIHN0eWxlczogW2BcbiAgICAuZXhhbXBsZSB7XG4gICAgICBjb2xvcjogYWxpY2VibHVlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93Z3JlZW47XG4gICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3Mgc25hY2tCYXJSZXNldENvbXBvbmVudCB7IH1cbiJdfQ==