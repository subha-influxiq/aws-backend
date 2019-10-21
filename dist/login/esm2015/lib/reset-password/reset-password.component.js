/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
export class ResetPasswordComponent {
    /**
     * @param {?} fb
     * @param {?} http
     * @param {?} router
     * @param {?} route
     * @param {?} apiService
     */
    constructor(fb, http, router, route, apiService) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.route = route;
        this.apiService = apiService;
        this.fromTitleNameValue = '';
        this.serverUrlValue = '';
        this.message = '';
        this.addEndpointValue = '';
        this.logoValue = '';
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
    // public signUpRouteingUrlValue: any = '';
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
                    this.formDirective.resetForm(); // Use for reset the form
                }
                else {
                    this.message = result.msg;
                }
            }));
        }
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
                template: "<div class=\"main-div\">\n\n  <mat-card class=\"from\">\n      <span class=\"logowrapper\" *ngIf=\"logoValue != ''\" >\n          <img  [src]=\"logoValue\">\n      </span>\n\n    <h2 *ngIf=\"fromTitleNameValue != ''\"> {{fromTitleNameValue}}</h2>\n\n\n    <form class=\"example-container\" [formGroup]=\"resetPasswordForm\" (ngSubmit)=\"resetPasswordSubmit()\" novalidate>\n<mat-error class=\"error\" *ngIf=\"message !=''\">{{message}}</mat-error>\n\n      <mat-form-field>\n        <input matInput placeholder=\"Password\" type=\"password\" formControlName=\"password\" (blur)=\"inputUntouched('password')\">\n        <mat-error\n          *ngIf=\"!resetPasswordForm.controls['password'].valid && resetPasswordForm.controls['password'].errors.required && resetPasswordForm.controls['password'].touched\">\n          Password field can not be blank</mat-error>\n          <!-- <mat-error  *ngIf=\"!resetPasswordForm.controls['password'].errors.required  && resetPasswordForm.controls['password'].touched\">Minimum length for password is 4!</mat-error> -->\n      </mat-form-field>\n\n      <mat-form-field>\n        <input matInput placeholder=\"Confirm Password\" type=\"password\"  formControlName=\"confirmPassword\" (blur)=\"inputUntouched('confirmPassword')\">\n        <mat-error\n          *ngIf=\"!resetPasswordForm.controls['confirmPassword'].valid && resetPasswordForm.controls['confirmPassword'].errors.required && resetPasswordForm.controls['confirmPassword'].touched\">\n          Confirm Password field can not be blank</mat-error>\n        <!-- <mat-error *ngIf=\"f.confirmPassword.errors.mustMatch\">Confirm Password is not valid</mat-error> -->\n        <mat-error *ngIf=\"!resetPasswordForm.controls['confirmPassword'].valid && resetPasswordForm.controls['confirmPassword'].touched\">Password does not match </mat-error>\n      </mat-form-field>\n\n      <button mat-raised-button color=\"primary\">Reset Password</button>\n\n    </form>\n  </mat-card>\n</div>\n\n<!-- <button (click)=\"openSnackBar('succes', 'ok')\"> ok</button> -->",
                styles: [".example-container{display:flex;flex-direction:column}.example-container>*{width:100%}.from{width:30%;margin:0 auto}.from h2{text-align:center;background-color:#00f;color:#fff;padding:15px}.from a{padding-right:30px}.main-div{height:100vh;display:flex;justify-content:center;align-items:center}.signupfooter{margin-top:12px;display:flex;justify-content:space-between;align-items:center}.signupfooter a{cursor:pointer}.error{text-align:center}.logowrapper{margin:0 auto;display:block;text-align:center}"]
            }] }
];
/** @nocollapse */
ResetPasswordComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: HttpClient },
    { type: Router },
    { type: ActivatedRoute },
    { type: ApiService }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQWEsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVNUMsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7SUFtRGpDLFlBQW1CLEVBQWUsRUFBUyxJQUFnQixFQUFTLE1BQWMsRUFBUyxLQUFxQixFQUFTLFVBQXNCO1FBQTVILE9BQUUsR0FBRixFQUFFLENBQWE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQS9DeEksdUJBQWtCLEdBQVEsRUFBRSxDQUFDO1FBQzdCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBRTNCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUE0Q3pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTtZQUVuQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZ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QVRRLFdBQVc7WUFDWCxVQUFVO1lBQ1YsTUFBTTtZQUFFLGNBQWM7WUFDdEIsVUFBVTs7OzRCQVloQixTQUFTLFNBQUMsa0JBQWtCOzRCQVc1QixLQUFLO3dCQVNMLEtBQUs7MEJBUUwsS0FBSzttQkFNTCxLQUFLOzs7O0lBbENOLCtDQUFpRTs7SUFDakUsbURBQW9DOztJQUNwQyxvREFBb0M7O0lBQ3BDLGdEQUFnQzs7SUFDaEMseUNBQXlCOztJQUN6QixrREFBa0M7O0lBRWxDLDJDQUEyQjs7SUF3QzNCLDRDQUEwQjs7SUFFZCxvQ0FBc0I7O0lBQUUsc0NBQXVCOztJQUFFLHdDQUFxQjs7SUFBRSx1Q0FBNEI7O0lBQUUsNENBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUdyb3VwRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLXJlc2V0LXBhc3N3b3JkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmNzcyddXG59KVxuXG5cblxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyAgIEZvcm1Hcm91cERpcmVjdGl2ZTogSXQgaXMgYSBkaXJlY3RpdmUgdGhhdCBiaW5kcyBhbiBleGlzdGluZyBGb3JtR3JvdXAgdG8gYSBET00gZWxlbWVudC5cbiAgQFZpZXdDaGlsZChGb3JtR3JvdXBEaXJlY3RpdmUpIGZvcm1EaXJlY3RpdmU6IEZvcm1Hcm91cERpcmVjdGl2ZTtcbiAgcHVibGljIHJlc2V0UGFzc3dvcmRGb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyBmcm9tVGl0bGVOYW1lVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgc2VydmVyVXJsVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgbWVzc2FnZTogYW55ID0gJyc7XG4gIHB1YmxpYyBhZGRFbmRwb2ludFZhbHVlOiBhbnkgPSAnJztcblxuICBwdWJsaWMgbG9nb1ZhbHVlOiBhbnkgPSAnJztcbiAgLy8gcHVibGljIHNpZ25VcFJvdXRlaW5nVXJsVmFsdWU6IGFueSA9ICcnO1xuXG5cbiAgQElucHV0KCkgICAgICAgICAvLyBTZXQgdGhlIEZvcm0gbmFtZVxuICBzZXQgZnJvbVRpdGxlTmFtZShmcm9tVGl0bGVOYW1lVmFsOiBhbnkpIHtcbiAgICB0aGlzLmZyb21UaXRsZU5hbWVWYWx1ZSA9IChmcm9tVGl0bGVOYW1lVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5mcm9tVGl0bGVOYW1lVmFsdWUgPSBmcm9tVGl0bGVOYW1lVmFsO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZnJvbVRpdGxlTmFtZVZhbHVlKTtcblxuICB9XG5cblxuICBASW5wdXQoKSAgICAgICAgLy8gc2V0dGluZyB0aGUgc2VydmVyIHVybCBmcm9tIHByb2plY3RcbiAgc2V0IHNlcnZlclVybChzZXJ2ZXJVcmxWYWw6IGFueSkge1xuICAgIHRoaXMuc2VydmVyVXJsVmFsdWUgPSAoc2VydmVyVXJsVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5zZXJ2ZXJVcmxWYWx1ZSA9IHNlcnZlclVybFZhbDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVybFZhbHVlKTtcblxuICB9XG5cbiAgQElucHV0KCkgICAgICAgIC8vIHNldCB0aGUgZW5kcG9pbnQgYW5kIHNvdXJjZVxuXG4gIHB1YmxpYyBzZXQgYWRkRW5kcG9pbnQoYWRkRW5kcG9pbnRWYWw6IGFueSkge1xuICAgIHRoaXMuYWRkRW5kcG9pbnRWYWx1ZSA9IGFkZEVuZHBvaW50VmFsO1xuICB9XG5cbiAgQElucHV0KCkgICAgICAvLyBzZXQgdGhlIGZyb20gbG9nb1xuXG5zZXQgbG9nbyhsb2dvVmFsIDogYW55KSB7XG4gIHRoaXMubG9nb1ZhbHVlID0gbG9nb1ZhbDtcbn1cblxuXG4gIC8vIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IFNpZ24gVXAgVXJsIGZyb20gcHJvamVjdFxuICAvLyBzZXQgc2lnblVwUm91dGVpbmdVcmwocm91dGVpbmdVcmx2YWw6IGFueSkge1xuICAvLyAgIHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZSA9IChyb3V0ZWluZ1VybHZhbCkgfHwgJzxubyBuYW1lIHNldD4nO1xuICAvLyAgIHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZSA9IHJvdXRlaW5nVXJsdmFsO1xuICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZSk7XG4gIC8vIH1cbiAgcHVibGljIGFjY2Vzc2NvZGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyLCBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwdWJsaWMgYXBpU2VydmljZTogQXBpU2VydmljZSkge1xuXG4gICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG5cbiAgICAgIHRoaXMuYWNjZXNzY29kZSA9IHBhcmFtc1sndG9rZW4nXTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWNjZXNzY29kZSk7XG4gICAgfSlcblxuICAgIHRoaXMucmVzZXRQYXNzd29yZEZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIC8vIHBhc3N3b3JkOiBbJycsICBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMubWluTGVuZ3RoKDQpXSldLFxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBjb25maXJtUGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgfSwge1xuICAgICAgdmFsaWRhdG9yOiB0aGlzLm1hY2hwYXNzd29yZCgncGFzc3dvcmQnLCAnY29uZmlybVBhc3N3b3JkJylcbiAgICB9KVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hcGlTZXJ2aWNlLmNsZWFyU2VydmVyVXJsKCk7ICAgICAgIC8vIENsZWFyIHRoZSBzZXJ2ZXIgdXJsXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFwaVNlcnZpY2Uuc2V0U2VydmVyVXJsKHRoaXMuc2VydmVyVXJsVmFsdWUpOyAgICAgICAvLyBzZXQgdGhlIHNlcnZlciB1cmwgXG4gICAgfSwgNTApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VydmVyVVJMKTtcblxuXG4gICAgdGhpcy5hcGlTZXJ2aWNlLmNsZWFyYWRkRW5kcG9pbnQoKTsgICAgICAgLy8gY2xlYXIgdGhlIGVuZHBvaW50IFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hcGlTZXJ2aWNlLnNldGFkZEVuZHBvaW50KHRoaXMuYWRkRW5kcG9pbnRWYWx1ZS5lbmRwb2ludCk7ICAgICAgIC8vIHNldCB0aGUgZW5kcG9pbnRcbiAgICB9LCA1MCk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5hZGRFbmRwb2ludERhdGEuZW5kcG9pbnQpO1xuXG4gIH1cbiAgLy8gIHRoaXMgZnVuY3Rpb24gaXMgdXNlIGZvciBtYWNoIHBhc3N3b3JkIGFuZCBjb25maXJtIFBhc3N3b3JkIFxuXG4gIG1hY2hwYXNzd29yZChwYXNzd29yZGt5ZTogc3RyaW5nLCBjb25maXJtcGFzc3dvcmRreWU6IHN0cmluZykge1xuICAgIHJldHVybiAoZ3JvdXA6IEZvcm1Hcm91cCkgPT4ge1xuICAgICAgbGV0IHBhc3N3b3JkSW5wdXQgPSBncm91cC5jb250cm9sc1twYXNzd29yZGt5ZV0sXG4gICAgICAgIGNvbmZpcm1wYXNzd29yZElucHV0ID0gZ3JvdXAuY29udHJvbHNbY29uZmlybXBhc3N3b3Jka3llXTtcbiAgICAgIGlmIChwYXNzd29yZElucHV0LnZhbHVlICE9PSBjb25maXJtcGFzc3dvcmRJbnB1dC52YWx1ZSkge1xuICAgICAgICByZXR1cm4gY29uZmlybXBhc3N3b3JkSW5wdXQuc2V0RXJyb3JzKHsgbm90RXF1aXZhbGVudDogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZmlybXBhc3N3b3JkSW5wdXQuc2V0RXJyb3JzKG51bGwpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuXG5cbi8qKioqKioqKiogUmVzZXQgUGFzc3dvcmQgRm9ybSBTdWJtaXQgc3RhcnQgaGVyZSoqKioqKioqKi8gXG4gIHJlc2V0UGFzc3dvcmRTdWJtaXQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5yZXNldFBhc3N3b3JkRm9ybS52YWx1ZSk7XG4gICAgbGV0IHg6IGFueTtcbiAgICBmb3IgKHggaW4gdGhpcy5yZXNldFBhc3N3b3JkRm9ybS5jb250cm9scykge1xuICAgICAgdGhpcy5yZXNldFBhc3N3b3JkRm9ybS5jb250cm9sc1t4XS5tYXJrQXNUb3VjaGVkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnJlc2V0UGFzc3dvcmRGb3JtLnZhbGlkKSB7XG4gICAgICBsZXQgZGF0YTE6IGFueSA9IHsgXCJwYXNzd29yZFwiOiB0aGlzLnJlc2V0UGFzc3dvcmRGb3JtLnZhbHVlLnBhc3N3b3JkLCBcImFjY2Vzc2NvZGVcIjogdGhpcy5hY2Nlc3Njb2RlIH1cbiAgICAgIGxldCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICdkYXRhJzogZGF0YTEsXG4gICAgICAgIFwic291cmNlXCI6IHRoaXMuYWRkRW5kcG9pbnRWYWx1ZS5zb3VyY2VcbiAgICAgIH1cblxuXG4gICAgICAvLyBkYXRhLmFjY2Vzc2NvZGUgPSB0aGlzLmFjY2Vzc2NvZGU7XG5cbiAgICAgIHRoaXMuYXBpU2VydmljZS5hZGREYXRhKGRhdGEpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5yZXNldEZvcm0oKTsgICAgICAgLy8gVXNlIGZvciByZXNldCB0aGUgZm9ybVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3VsdC5tc2c7XG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuXG4vKioqKioqKioqIFJlc2V0IFBhc3N3b3JkIEZvcm0gU3VibWl0IGVuZCBoZXJlKioqKioqKioqLyBcblxuXG4gIGlucHV0VW50b3VjaGVkKHZhbDogYW55KSB7XG4gICAgdGhpcy5yZXNldFBhc3N3b3JkRm9ybS5jb250cm9sc1t2YWxdLm1hcmtBc1VudG91Y2hlZCgpO1xuICB9XG5cblxuXG5cbn1cbiJdfQ==