/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ApiService } from '../api.service';
/**
 * @record
 */
export function DialogData() { }
if (false) {
    /** @type {?} */
    DialogData.prototype.name;
}
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(fb, http, router, dialog, apiService) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.dialog = dialog;
        this.apiService = apiService;
        this.message = '';
        this.formTitleValue = '';
        this.serverUrlValue = '';
        this.forgetRouteingUrlValue = '';
        this.loginRouteingUrlValue = '';
        this.addEndpointValue = '';
        this.logoValue = '';
        this.signUpForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    Object.defineProperty(SignUpComponent.prototype, "formTitle", {
        set: /**
         * @param {?} formTitleVal
         * @return {?}
         */
        function (formTitleVal) {
            this.formTitleValue = (formTitleVal) || '<no name set>';
            this.formTitleValue = formTitleVal;
            // console.log(this.formTitleValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpComponent.prototype, "serverUrl", {
        set: /**
         * @param {?} serverUrlVal
         * @return {?}
         */
        function (serverUrlVal) {
            this.serverUrlValue = (serverUrlVal) || '<no name set>';
            this.serverUrlValue = serverUrlVal;
            // console.log(this.serverUrlValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpComponent.prototype, "logo", {
        set: /**
         * @param {?} logoVal
         * @return {?}
         */
        function (logoVal) {
            this.logoValue = logoVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpComponent.prototype, "addEndpoint", {
        set: /**
         * @param {?} addEndpointVal
         * @return {?}
         */
        function (addEndpointVal) {
            this.addEndpointValue = addEndpointVal;
            console.log(this.addEndpointValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpComponent.prototype, "forgetRouteingUrl", {
        set: /**
         * @param {?} routeingUrlval
         * @return {?}
         */
        function (routeingUrlval) {
            this.forgetRouteingUrlValue = (routeingUrlval) || '<no name set>';
            this.forgetRouteingUrlValue = routeingUrlval;
            // console.log(this.forgetRouteingUrlValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpComponent.prototype, "loginRouteingUrl", {
        set: /**
         * @param {?} routeingUrlval
         * @return {?}
         */
        function (routeingUrlval) {
            this.loginRouteingUrlValue = (routeingUrlval) || '<no name set>';
            this.loginRouteingUrlValue = routeingUrlval;
            // console.log(this.loginRouteingUrlValue);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SignUpComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.apiService.clearServerUrl(); //  Clear the server url
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.apiService.setServerUrl(_this.serverUrlValue); //  set the server url
        }), 50);
        // console.log(this.serverURL);
        this.apiService.clearaddEndpoint(); //  Clear the endpoint
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.apiService.setaddEndpoint(_this.addEndpointValue.endpoint); //  set the endpoint
        }), 50);
    };
    /********* Sign Up Form Submit start here*********/
    /**
     * ****** Sign Up Form Submit start here********
     * @return {?}
     */
    SignUpComponent.prototype.signUpFormSubmit = /**
     * ****** Sign Up Form Submit start here********
     * @return {?}
     */
    function () {
        var _this = this;
        // use for validation checking
        for (var x in this.signUpForm.controls) {
            this.signUpForm.controls[x].markAsTouched();
        }
        if (this.signUpForm.valid) {
            // let link: any = this.fullUrlValue;
            /** @type {?} */
            var data = {
                'data': this.signUpForm.value,
                "source": this.addEndpointValue.source
            };
            console.log(data);
            this.apiService.addData(data).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                /** @type {?} */
                var result = {};
                result = response;
                console.log(result);
                if (result.status == "success") {
                    // this.router.navigateByUrl('/' + )     // navigate to dashboard url 
                    // this is use for reset the from
                    _this.formDirective.resetForm();
                }
                else {
                    // display error message on html
                    _this.message = result.msg;
                }
            }));
        }
    };
    /********* Sign Up Form Submit end here*********/
    // This is use for navigate this component to forget component 
    /**
     * ****** Sign Up Form Submit end here********
     * @return {?}
     */
    // This is use for navigate this component to forget component 
    SignUpComponent.prototype.forgetpassword = /**
     * ****** Sign Up Form Submit end here********
     * @return {?}
     */
    // This is use for navigate this component to forget component 
    function () {
        this.router.navigateByUrl('/' + this.forgetRouteingUrlValue);
    };
    // This is use for navigate this component to forget component 
    // This is use for navigate this component to forget component 
    /**
     * @return {?}
     */
    SignUpComponent.prototype.login = 
    // This is use for navigate this component to forget component 
    /**
     * @return {?}
     */
    function () {
        this.router.navigateByUrl('/' + this.loginRouteingUrlValue);
    };
    /**
     * @param {?} val
     * @return {?}
     */
    SignUpComponent.prototype.inputUntouched = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.signUpForm.controls[val].markAsUntouched();
    };
    SignUpComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-sign-up',
                    template: "<div class=\"main-div\">\n\n    \n\n  <mat-card class=\"from\">\n      <span class=\"logowrapper\" *ngIf=\"logoValue != ''\" >\n          <img  [src]=\"logoValue\">\n      </span>\n\n    <h2 *ngIf=\"formTitleValue != ''\"> {{formTitleValue}}</h2>\n\n\n    <form class=\"example-container\" [formGroup]=\"signUpForm\" (ngSubmit)=\"signUpFormSubmit()\" novalidate>\n\n\n      <mat-error class=\"error\" *ngIf=\"message != ''\">{{message}}</mat-error>\n      <mat-form-field>\n        <input matInput type=\"text\" placeholder=\"First Name\" formControlName=\"firstname\" (blur)=\"inputUntouched('firstname')\">\n        <mat-error\n          *ngIf=\"!signUpForm.controls['firstname'].valid && signUpForm.controls['firstname'].errors.required && signUpForm.controls['firstname'].touched\">\n          First Name field can not be blank</mat-error>\n      </mat-form-field>\n\n\n      <mat-form-field>\n        <input matInput type=\"text\" placeholder=\"Last Name\" formControlName=\"lastname\" (blur)=\"inputUntouched('lastname')\">\n        <mat-error\n          *ngIf=\"!signUpForm.controls['lastname'].valid && signUpForm.controls['lastname'].errors.required && signUpForm.controls['lastname'].touched\">\n          Last Name field can not be blank</mat-error>\n      </mat-form-field>\n\n      <mat-form-field>\n        <input matInput type=\"text\" placeholder=\"Email\" formControlName=\"email\" (blur)=\"inputUntouched('email')\">\n        <mat-error\n          *ngIf=\"!signUpForm.controls['email'].valid && signUpForm.controls['email'].errors.required && signUpForm.controls['email'].touched\">\n          Email field can not be blank</mat-error>\n        <mat-error *ngIf=\"!signUpForm.controls['email'].valid && !signUpForm.controls['email'].errors.required\">Email is\n          not valid</mat-error>\n      </mat-form-field>\n\n\n\n      <mat-form-field>\n        <input matInput placeholder=\"Password\" type=\"password\" formControlName=\"password\" (blur)=\"inputUntouched('password')\">\n        <mat-error\n          *ngIf=\"!signUpForm.controls['password'].valid && signUpForm.controls['password'].errors.required && signUpForm.controls['password'].touched\">\n          Password field can not be blank</mat-error>\n      </mat-form-field>\n\n      <button mat-raised-button color=\"primary\">Sign Up</button>\n      <span class=\"signupfooter\">\n        <a (click)=\"forgetpassword()\">Forget Password</a>\n        <a (click)=\"login()\">Login</a>\n      </span>\n    </form>\n  </mat-card>\n</div>",
                    styles: [".example-container{display:flex;flex-direction:column}.example-container>*{width:100%}.from{width:30%;margin:0 auto}.from h2{text-align:center;background-color:#00f;color:#fff;padding:15px}.from a{padding-right:30px}.main-div{height:100vh;display:flex;justify-content:center;align-items:center}.signupfooter{margin-top:12px;display:flex;justify-content:space-between;align-items:center}.signupfooter a{cursor:pointer}.error{text-align:center}.logowrapper{margin:0 auto;display:block;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    SignUpComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: HttpClient },
        { type: Router },
        { type: MatDialog },
        { type: ApiService }
    ]; };
    SignUpComponent.propDecorators = {
        formDirective: [{ type: ViewChild, args: [FormGroupDirective,] }],
        formTitle: [{ type: Input }],
        serverUrl: [{ type: Input }],
        logo: [{ type: Input }],
        addEndpoint: [{ type: Input }],
        forgetRouteingUrl: [{ type: Input }],
        loginRouteingUrl: [{ type: Input }]
    };
    return SignUpComponent;
}());
export { SignUpComponent };
if (false) {
    /** @type {?} */
    SignUpComponent.prototype.message;
    /** @type {?} */
    SignUpComponent.prototype.formDirective;
    /** @type {?} */
    SignUpComponent.prototype.formTitleValue;
    /** @type {?} */
    SignUpComponent.prototype.serverUrlValue;
    /** @type {?} */
    SignUpComponent.prototype.forgetRouteingUrlValue;
    /** @type {?} */
    SignUpComponent.prototype.loginRouteingUrlValue;
    /** @type {?} */
    SignUpComponent.prototype.addEndpointValue;
    /** @type {?} */
    SignUpComponent.prototype.logoValue;
    /** @type {?} */
    SignUpComponent.prototype.signUpForm;
    /** @type {?} */
    SignUpComponent.prototype.fb;
    /** @type {?} */
    SignUpComponent.prototype.http;
    /** @type {?} */
    SignUpComponent.prototype.router;
    /** @type {?} */
    SignUpComponent.prototype.dialog;
    /** @type {?} */
    SignUpComponent.prototype.apiService;
}
var commonModalComponent = /** @class */ (function () {
    function commonModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    /**
     * @return {?}
     */
    commonModalComponent.prototype.onNoClick = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    commonModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'commonModal',
                    template: "<!-- <h1 mat-dialog-title>Hi {{data.name}}</h1> -->\n<div mat-dialog-content>\n  <h2>{{data.name}}</h2>\n \n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button >Ok</button>\n</div>"
                }] }
    ];
    /** @nocollapse */
    commonModalComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return commonModalComponent;
}());
export { commonModalComponent };
if (false) {
    /** @type {?} */
    commonModalComponent.prototype.dialogRef;
    /** @type {?} */
    commonModalComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2dpbi8iLCJzb3VyY2VzIjpbImxpYi9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBYSxXQUFXLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJNUMsZ0NBRUM7OztJQURDLDBCQUFhOztBQUdmO0lBaUVFLHlCQUFtQixFQUFlLEVBQVMsSUFBZ0IsRUFBUyxNQUFjLEVBQVMsTUFBaUIsRUFBUyxVQUFzQjtRQUF4SCxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTNEcEksWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUtsQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QiwyQkFBc0IsR0FBUSxFQUFFLENBQUM7UUFDakMsMEJBQXFCLEdBQVEsRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUMzQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBa0R6QixJQUFJLENBQUMs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WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmLCBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5cblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItc2lnbi11cCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWduLXVwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lnbi11cC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2lnblVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIG1lc3NhZ2U6IGFueSA9ICcnO1xuXG4gIC8vICAgRm9ybUdyb3VwRGlyZWN0aXZlOiBJdCBpcyBhIGRpcmVjdGl2ZSB0aGF0IGJpbmRzIGFuIGV4aXN0aW5nIEZvcm1Hcm91cCB0byBhIERPTSBlbGVtZW50LlxuICBAVmlld0NoaWxkKEZvcm1Hcm91cERpcmVjdGl2ZSkgZm9ybURpcmVjdGl2ZTogRm9ybUdyb3VwRGlyZWN0aXZlO1xuXG4gIHB1YmxpYyBmb3JtVGl0bGVWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBzZXJ2ZXJVcmxWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBmb3JnZXRSb3V0ZWluZ1VybFZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIGxvZ2luUm91dGVpbmdVcmxWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBhZGRFbmRwb2ludFZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIGxvZ29WYWx1ZTogYW55ID0gJyc7XG5cbiAgQElucHV0KCkgICAgICAgICAvLyBTZXQgdGhlIEZvcm0gbmFtZVxuICBzZXQgZm9ybVRpdGxlKGZvcm1UaXRsZVZhbDogYW55KSB7XG4gICAgdGhpcy5mb3JtVGl0bGVWYWx1ZSA9IChmb3JtVGl0bGVWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLmZvcm1UaXRsZVZhbHVlID0gZm9ybVRpdGxlVmFsO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybVRpdGxlVmFsdWUpO1xuXG4gIH1cblxuICBASW5wdXQoKSAgICAgICAgLy8gc2V0dGluZyB0aGUgc2VydmVyIHVybCBmcm9tIHByb2plY3RcbiAgc2V0IHNlcnZlclVybChzZXJ2ZXJVcmxWYWw6IGFueSkge1xuICAgIHRoaXMuc2VydmVyVXJsVmFsdWUgPSAoc2VydmVyVXJsVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5zZXJ2ZXJVcmxWYWx1ZSA9IHNlcnZlclVybFZhbDtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVybFZhbHVlKTtcblxuICB9XG5ASW5wdXQoKSAgICAgIC8vIHNldCB0aGUgZnJvbSBsb2dvXG5cbnNldCBsb2dvKGxvZ29WYWwgOiBhbnkpIHtcbiAgdGhpcy5sb2dvVmFsdWUgPSBsb2dvVmFsO1xufVxuXG5cbiAgQElucHV0KCkgICAgICAgIC8vIHNldCB0aGUgZW5kcG9pbnQgQW5kIHNvdXJjZVxuICBwdWJsaWMgc2V0IGFkZEVuZHBvaW50KGFkZEVuZHBvaW50VmFsOiBhbnkpIHtcbiAgICB0aGlzLmFkZEVuZHBvaW50VmFsdWUgPSBhZGRFbmRwb2ludFZhbDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmFkZEVuZHBvaW50VmFsdWUpXG4gIH1cblxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IEZvcmdldCBQYXNzd29yZCBVcmwgZnJvbSBwcm9qZWN0XG4gIHNldCBmb3JnZXRSb3V0ZWluZ1VybChyb3V0ZWluZ1VybHZhbDogYW55KSB7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gcm91dGVpbmdVcmx2YWw7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IGxvZ2luIFVybCBmcm9tIHByb2plY3RcbiAgc2V0IGxvZ2luUm91dGVpbmdVcmwocm91dGVpbmdVcmx2YWw6IGFueSkge1xuICAgIHRoaXMubG9naW5Sb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5sb2dpblJvdXRlaW5nVXJsVmFsdWUgPSByb3V0ZWluZ1VybHZhbDtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmxvZ2luUm91dGVpbmdVcmxWYWx1ZSk7XG4gIH1cblxuXG5cbiAgcHVibGljIHNpZ25VcEZvcm06IEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyLCBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csIHB1YmxpYyBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlKSB7XG4gICAgdGhpcy5zaWduVXBGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybigvXlxccypbXFx3XFwtXFwrX10rKFxcLltcXHdcXC1cXCtfXSspKlxcQFtcXHdcXC1cXCtfXStcXC5bXFx3XFwtXFwrX10rKFxcLltcXHdcXC1cXCtfXSspKlxccyokLyldKV0sXG4gICAgICBmaXJzdG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBsYXN0bmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBpU2VydmljZS5jbGVhclNlcnZlclVybCgpOyAgICAgICAvLyAgQ2xlYXIgdGhlIHNlcnZlciB1cmxcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5zZXRTZXJ2ZXJVcmwodGhpcy5zZXJ2ZXJVcmxWYWx1ZSk7ICAgICAgICAvLyAgc2V0IHRoZSBzZXJ2ZXIgdXJsXG4gICAgfSwgNTApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VydmVyVVJMKTtcblxuXG4gICAgdGhpcy5hcGlTZXJ2aWNlLmNsZWFyYWRkRW5kcG9pbnQoKTsgICAgICAgLy8gIENsZWFyIHRoZSBlbmRwb2ludFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hcGlTZXJ2aWNlLnNldGFkZEVuZHBvaW50KHRoaXMuYWRkRW5kcG9pbnRWYWx1ZS5lbmRwb2ludCk7ICAgLy8gIHNldCB0aGUgZW5kcG9pbnRcbiAgICB9LCA1MCk7XG4gIH1cblxuXG4vKioqKioqKioqIFNpZ24gVXAgRm9ybSBTdWJtaXQgc3RhcnQgaGVyZSoqKioqKioqKi8gXG4gIHNpZ25VcEZvcm1TdWJtaXQoKSB7XG4gICAgLy8gdXNlIGZvciB2YWxpZGF0aW9uIGNoZWNraW5nXG4gICAgZm9yIChsZXQgeCBpbiB0aGlzLnNpZ25VcEZvcm0uY29udHJvbHMpIHtcbiAgICAgIHRoaXMuc2lnblVwRm9ybS5jb250cm9sc1t4XS5tYXJrQXNUb3VjaGVkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpZ25VcEZvcm0udmFsaWQpIHtcbiAgICAgIC8vIGxldCBsaW5rOiBhbnkgPSB0aGlzLmZ1bGxVcmxWYWx1ZTtcbiAgICAgIGxldCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICdkYXRhJzogdGhpcy5zaWduVXBGb3JtLnZhbHVlLFxuICAgICAgICBcInNvdXJjZVwiOiB0aGlzLmFkZEVuZHBvaW50VmFsdWUuc291cmNlXG4gICAgICB9O1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB0aGlzLmFwaVNlcnZpY2UuYWRkRGF0YShkYXRhKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgICByZXN1bHQgPSByZXNwb25zZTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nICsgKSAgICAgLy8gbmF2aWdhdGUgdG8gZGFzaGJvYXJkIHVybCBcblxuXG4gICAgICAgICAgLy8gdGhpcyBpcyB1c2UgZm9yIHJlc2V0IHRoZSBmcm9tXG4gICAgICAgICAgdGhpcy5mb3JtRGlyZWN0aXZlLnJlc2V0Rm9ybSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRpc3BsYXkgZXJyb3IgbWVzc2FnZSBvbiBodG1sXG4gICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzdWx0Lm1zZztcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIH1cbiAgfVxuXG5cbi8qKioqKioqKiogU2lnbiBVcCBGb3JtIFN1Ym1pdCBlbmQgaGVyZSoqKioqKioqKi8gXG5cbiAgLy8gVGhpcyBpcyB1c2UgZm9yIG5hdmlnYXRlIHRoaXMgY29tcG9uZW50IHRvIGZvcmdldCBjb21wb25lbnQgXG4gIGZvcmdldHBhc3N3b3JkKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nICsgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlKTtcbiAgfVxuXG5cbiAgLy8gVGhpcyBpcyB1c2UgZm9yIG5hdmlnYXRlIHRoaXMgY29tcG9uZW50IHRvIGZvcmdldCBjb21wb25lbnQgXG4gIGxvZ2luKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nICsgdGhpcy5sb2dpblJvdXRlaW5nVXJsVmFsdWUpO1xuICB9XG5cbiAgaW5wdXRVbnRvdWNoZWQodmFsOiBhbnkpIHtcbiAgICB0aGlzLnNpZ25VcEZvcm0uY29udHJvbHNbdmFsXS5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvbW1vbk1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuLi9jb21tb25Nb2RhbC9jb21tb25Nb2RhbC5odG1sJyxcblxufSlcbmV4cG9ydCBjbGFzcyBjb21tb25Nb2RhbENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPGNvbW1vbk1vZGFsQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IERpYWxvZ0RhdGEpIHsgfVxuXG4gIG9uTm9DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbn1cblxuXG4iXX0=