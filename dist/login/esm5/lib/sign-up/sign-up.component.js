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
    DialogData.prototype.value;
    /** @type {?} */
    DialogData.prototype.Url;
}
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(fb, http, router, dialog, apiService) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.dialog = dialog;
        this.apiService = apiService;
        this.value = '';
        this.link = '';
        this.Url = '';
        this.message = '';
        this.formTitleValue = '';
        this.serverUrlValue = '';
        this.forgetRouteingUrlValue = '';
        this.loginRouteingUrlValue = '';
        this.addEndpointValue = '';
        this.logoValue = '';
        this.typevalue = '';
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
    Object.defineProperty(SignUpComponent.prototype, "modaleLogo", {
        set: /**
         * @param {?} modaleLogoVal
         * @return {?}
         */
        function (modaleLogoVal) {
            this.link = modaleLogoVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpComponent.prototype, "userType", {
        set: /**
         * @param {?} typeval
         * @return {?}
         */
        function (typeval) {
            this.typevalue = typeval;
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
            var allData = this.signUpForm.value;
            allData.type = this.typevalue;
            console.log(allData);
            /** @type {?} */
            var data = {
                'data': allData,
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
                    /** @type {?} */
                    var dialogRef = _this.dialog.open(successModalComponent, {
                        width: '250px',
                        data: { value: result.status, Url: _this.link }
                    });
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
        modaleLogo: [{ type: Input }],
        userType: [{ type: Input }],
        addEndpoint: [{ type: Input }],
        forgetRouteingUrl: [{ type: Input }],
        loginRouteingUrl: [{ type: Input }]
    };
    return SignUpComponent;
}());
export { SignUpComponent };
if (false) {
    /** @type {?} */
    SignUpComponent.prototype.value;
    /** @type {?} */
    SignUpComponent.prototype.link;
    /** @type {?} */
    SignUpComponent.prototype.Url;
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
    SignUpComponent.prototype.typevalue;
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
var successModalComponent = /** @class */ (function () {
    function successModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        console.log(data);
    }
    /**
     * @return {?}
     */
    successModalComponent.prototype.onNoClick = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    successModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'successModal',
                    template: "\n<span style=\"text-align: center\"  *ngIf=\"data.Url != ''\" >\n  <img style=\"max-width: 100%; text-align: center\" [src]=\"data.Url\">\n</span>\n\n<div mat-dialog-content>\n  <p *ngIf=\"data.value.length <= 7\">Thanks! your account has been successfully created</p>\n  <p *ngIf=\"data.value.length >= 8\">{{data.value}}</p>\n  \n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"\" cdkFocusInitial>Ok</button>\n</div>"
                }] }
    ];
    /** @nocollapse */
    successModalComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return successModalComponent;
}());
export { successModalComponent };
if (false) {
    /** @type {?} */
    successModalComponent.prototype.dialogRef;
    /** @type {?} */
    successModalComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2dpbi8iLCJzb3VyY2VzIjpbImxpYi9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBYSxXQUFXLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJNUMsZ0NBR0M7OztJQUZDLDJCQUFjOztJQUNkLHlCQUFTOztBQUdYO0lBZ0ZFLHlCQUFtQixFQUFlLEVBQVMsSUFBZ0IsRUFBUyxNQUFjLEVBQVMsTUFBaUIsRUFBUyxVQUFzQjtRQUF4SCxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTFFcEksVUFBSyxHQUFNLEVBQUUsQ0FBQztRQUNkLFNBQUksR0FBTSxFQUFFLENBQUM7UUFDYixRQUFHLEdBQU0sRUFBRSxDQUFDO1FBQ1osWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUtsQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QiwyQkFBc0IsR0FBUSxFQUFFLENBQUM7UUFDakMsMEJBQXFC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LEtBQUs7O0lBNkZSLHNCQUFDO0NBQUEsQUFsS0QsSUFrS0M7U0E3SlksZUFBZTs7O0lBQzFCLGdDQUFxQjs7SUFDckIsK0JBQW9COztJQUNwQiw4QkFBbUI7O0lBQ25CLGtDQUF5Qjs7SUFHekIsd0NBQWlFOztJQUVqRSx5Q0FBZ0M7O0lBQ2hDLHlDQUFnQzs7SUFDaEMsaURBQXdDOztJQUN4QyxnREFBdUM7O0lBQ3ZDLDJDQUFrQzs7SUFDbEMsb0NBQTJCOztJQUMzQixvQ0FBMkI7O0lBMEQzQixxQ0FBNkI7O0lBRWpCLDZCQUFzQjs7SUFBRSwrQkFBdUI7O0lBQUUsaUNBQXFCOztJQUFFLGlDQUF3Qjs7SUFBRSxxQ0FBNkI7O0FBcUY3STtJQU9FLCtCQUNTLFNBQThDLEVBQ3JCLElBQWdCO1FBRHpDLGNBQVMsR0FBVCxTQUFTLENBQXFDO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQixDQUFDOzs7O0lBR0oseUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOztnQkFoQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QiwyY0FBbUM7aUJBRXBDOzs7O2dCQW5MeUIsWUFBWTtnREF3TGpDLE1BQU0sU0FBQyxlQUFlOztJQVMzQiw0QkFBQztDQUFBLEFBbEJELElBa0JDO1NBYlkscUJBQXFCOzs7SUFHOUIsMENBQXFEOztJQUNyRCxxQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmLCBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5cblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgVXJsOiBhbnk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1zaWduLXVwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZ24tdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaWduLXVwLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaWduVXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgdmFsdWU6IGFueT0nJztcbiAgcHVibGljIGxpbms6IGFueT0nJztcbiAgcHVibGljIFVybDogYW55PScnO1xuICBwdWJsaWMgbWVzc2FnZTogYW55ID0gJyc7XG5cbiAgLy8gICBGb3JtR3JvdXBEaXJlY3RpdmU6IEl0IGlzIGEgZGlyZWN0aXZlIHRoYXQgYmluZHMgYW4gZXhpc3RpbmcgRm9ybUdyb3VwIHRvIGEgRE9NIGVsZW1lbnQuXG4gIEBWaWV3Q2hpbGQoRm9ybUdyb3VwRGlyZWN0aXZlKSBmb3JtRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmU7XG5cbiAgcHVibGljIGZvcm1UaXRsZVZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIHNlcnZlclVybFZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIGZvcmdldFJvdXRlaW5nVXJsVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgbG9naW5Sb3V0ZWluZ1VybFZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIGFkZEVuZHBvaW50VmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgbG9nb1ZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIHR5cGV2YWx1ZTogYW55ID0gJyc7XG5cbiAgQElucHV0KCkgICAgICAgICAvLyBTZXQgdGhlIEZvcm0gbmFtZVxuICBzZXQgZm9ybVRpdGxlKGZvcm1UaXRsZVZhbDogYW55KSB7XG4gICAgdGhpcy5mb3JtVGl0bGVWYWx1ZSA9IChmb3JtVGl0bGVWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLmZvcm1UaXRsZVZhbHVlID0gZm9ybVRpdGxlVmFsO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybVRpdGxlVmFsdWUpO1xuXG4gIH1cblxuICBASW5wdXQoKSAgICAgICAgLy8gc2V0dGluZyB0aGUgc2VydmVyIHVybCBmcm9tIHByb2plY3RcbiAgc2V0IHNlcnZlclVybChzZXJ2ZXJVcmxWYWw6IGFueSkge1xuICAgIHRoaXMuc2VydmVyVXJsVmFsdWUgPSAoc2VydmVyVXJsVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5zZXJ2ZXJVcmxWYWx1ZSA9IHNlcnZlclVybFZhbDtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVybFZhbHVlKTtcblxuICB9XG5ASW5wdXQoKSAgICAgIC8vIHNldCB0aGUgZnJvbSBsb2dvXG5cbnNldCBsb2dvKGxvZ29WYWwgOiBhbnkpIHtcbiAgdGhpcy5sb2dvVmFsdWUgPSBsb2dvVmFsO1xufVxuXG5ASW5wdXQoKSAgICAgIC8vIHNldCB0aGUgZnJvbSBsb2dvXG5cbnNldCBtb2RhbGVMb2dvKG1vZGFsZUxvZ29WYWwgOiBhbnkpIHtcbiAgdGhpcy5saW5rID0gbW9kYWxlTG9nb1ZhbDtcbn1cblxuQElucHV0KClcbnNldCB1c2VyVHlwZSh0eXBldmFsOiBhbnkpIHtcbiAgdGhpcy50eXBldmFsdWUgPSB0eXBldmFsO1xufVxuXG5cbiAgQElucHV0KCkgICAgICAgIC8vIHNldCB0aGUgZW5kcG9pbnQgQW5kIHNvdXJjZVxuICBwdWJsaWMgc2V0IGFkZEVuZHBvaW50KGFkZEVuZHBvaW50VmFsOiBhbnkpIHtcbiAgICB0aGlzLmFkZEVuZHBvaW50VmFsdWUgPSBhZGRFbmRwb2ludFZhbDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmFkZEVuZHBvaW50VmFsdWUpXG4gIH1cblxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IEZvcmdldCBQYXNzd29yZCBVcmwgZnJvbSBwcm9qZWN0XG4gIHNldCBmb3JnZXRSb3V0ZWluZ1VybChyb3V0ZWluZ1VybHZhbDogYW55KSB7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gcm91dGVpbmdVcmx2YWw7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IGxvZ2luIFVybCBmcm9tIHByb2plY3RcbiAgc2V0IGxvZ2luUm91dGVpbmdVcmwocm91dGVpbmdVcmx2YWw6IGFueSkge1xuICAgIHRoaXMubG9naW5Sb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5sb2dpblJvdXRlaW5nVXJsVmFsdWUgPSByb3V0ZWluZ1VybHZhbDtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmxvZ2luUm91dGVpbmdVcmxWYWx1ZSk7XG4gIH1cblxuXG5cbiAgcHVibGljIHNpZ25VcEZvcm06IEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyLCBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csIHB1YmxpYyBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlKSB7XG4gICAgdGhpcy5zaWduVXBGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybigvXlxccypbXFx3XFwtXFwrX10rKFxcLltcXHdcXC1cXCtfXSspKlxcQFtcXHdcXC1cXCtfXStcXC5bXFx3XFwtXFwrX10rKFxcLltcXHdcXC1cXCtfXSspKlxccyokLyldKV0sXG4gICAgICBmaXJzdG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBsYXN0bmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBpU2VydmljZS5jbGVhclNlcnZlclVybCgpOyAgICAgICAvLyAgQ2xlYXIgdGhlIHNlcnZlciB1cmxcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5zZXRTZXJ2ZXJVcmwodGhpcy5zZXJ2ZXJVcmxWYWx1ZSk7ICAgICAgICAvLyAgc2V0IHRoZSBzZXJ2ZXIgdXJsXG4gICAgfSwgNTApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VydmVyVVJMKTtcblxuXG4gICAgdGhpcy5hcGlTZXJ2aWNlLmNsZWFyYWRkRW5kcG9pbnQoKTsgICAgICAgLy8gIENsZWFyIHRoZSBlbmRwb2ludFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hcGlTZXJ2aWNlLnNldGFkZEVuZHBvaW50KHRoaXMuYWRkRW5kcG9pbnRWYWx1ZS5lbmRwb2ludCk7ICAgLy8gIHNldCB0aGUgZW5kcG9pbnRcbiAgICB9LCA1MCk7XG4gIH1cblxuXG4vKioqKioqKioqIFNpZ24gVXAgRm9ybSBTdWJtaXQgc3RhcnQgaGVyZSoqKioqKioqKi8gXG4gIHNpZ25VcEZvcm1TdWJtaXQoKSB7XG4gICAgLy8gdXNlIGZvciB2YWxpZGF0aW9uIGNoZWNraW5nXG4gICAgZm9yIChsZXQgeCBpbiB0aGlzLnNpZ25VcEZvcm0uY29udHJvbHMpIHtcbiAgICAgIHRoaXMuc2lnblVwRm9ybS5jb250cm9sc1t4XS5tYXJrQXNUb3VjaGVkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpZ25VcEZvcm0udmFsaWQpIHtcbiAgICAgIC8vIGxldCBsaW5rOiBhbnkgPSB0aGlzLmZ1bGxVcmxWYWx1ZTtcbiAgICAgIGxldCBhbGxEYXRhOiBhbnkgPSB0aGlzLnNpZ25VcEZvcm0udmFsdWU7XG4gICAgICBhbGxEYXRhLnR5cGUgPSB0aGlzLnR5cGV2YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGFsbERhdGEpO1xuXG4gICAgICBsZXQgZGF0YTogYW55ID0ge1xuICAgICAgICAnZGF0YSc6IGFsbERhdGEsXG4gICAgICAgIFwic291cmNlXCI6IHRoaXMuYWRkRW5kcG9pbnRWYWx1ZS5zb3VyY2VcbiAgICAgIH07XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5hZGREYXRhKGRhdGEpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihzdWNjZXNzTW9kYWxDb21wb25lbnQsIHtcbiAgICAgICAgICAgIHdpZHRoOiAnMjUwcHgnLFxuICAgICAgICAgICAgZGF0YToge3ZhbHVlOiByZXN1bHQuc3RhdHVzLCBVcmw6IHRoaXMubGlua31cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJyArICkgICAgIC8vIG5hdmlnYXRlIHRvIGRhc2hib2FyZCB1cmwgXG5cblxuICAgICAgICAgIC8vIHRoaXMgaXMgdXNlIGZvciByZXNldCB0aGUgZnJvbVxuICAgICAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5yZXNldEZvcm0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkaXNwbGF5IGVycm9yIG1lc3NhZ2Ugb24gaHRtbFxuICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3VsdC5tc2c7XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICB9XG4gIH1cblxuXG4vKioqKioqKioqIFNpZ24gVXAgRm9ybSBTdWJtaXQgZW5kIGhlcmUqKioqKioqKiovIFxuXG4gIC8vIFRoaXMgaXMgdXNlIGZvciBuYXZpZ2F0ZSB0aGlzIGNvbXBvbmVudCB0byBmb3JnZXQgY29tcG9uZW50IFxuICBmb3JnZXRwYXNzd29yZCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJyArIHRoaXMuZm9yZ2V0Um91dGVpbmdVcmxWYWx1ZSk7XG4gIH1cblxuXG4gIC8vIFRoaXMgaXMgdXNlIGZvciBuYXZpZ2F0ZSB0aGlzIGNvbXBvbmVudCB0byBmb3JnZXQgY29tcG9uZW50IFxuICBsb2dpbigpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJyArIHRoaXMubG9naW5Sb3V0ZWluZ1VybFZhbHVlKTtcbiAgfVxuXG4gIGlucHV0VW50b3VjaGVkKHZhbDogYW55KSB7XG4gICAgdGhpcy5zaWduVXBGb3JtLmNvbnRyb2xzW3ZhbF0ubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdWNjZXNzTW9kYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4uL3N1Y2Nlc3NNb2RhbC5odG1sJyxcblxufSlcbmV4cG9ydCBjbGFzcyBzdWNjZXNzTW9kYWxDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxzdWNjZXNzTW9kYWxDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogRGlhbG9nRGF0YSkge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgfVxuXG4gICAgXG4gIG9uTm9DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbn1cblxuXG4iXX0=