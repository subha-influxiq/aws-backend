/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';
var ForgetPasswordComponent = /** @class */ (function () {
    function ForgetPasswordComponent(fb, router, apiService, snackBar) {
        this.fb = fb;
        this.router = router;
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.message = '';
        this.buttonNameValue = '';
        this.formTitleValue = ''; // This is From title
        // This is From title
        this.serverUrlValue = ''; //  This is Server url
        //  This is Server url
        this.signUpRouteingUrlValue = ''; // setting the navigate By Sign Up Url from project
        // setting the navigate By Sign Up Url from project
        this.loginRouteingUrlValue = ''; // setting the navigate By login Url from project
        // setting the navigate By login Url from project
        this.domainUrlValue = ''; // This is reset password url
        // This is reset password url
        this.addEndpointValue = ''; // This is endpoint url
        // This is endpoint url
        this.logoValue = ''; // This is from logo url
        // This is from logo url
        this.durationInSeconds = 5; // This is SnackBar set time
        this.forgetPasswordForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
        });
    }
    Object.defineProperty(ForgetPasswordComponent.prototype, "buttonName", {
        set: 
        // This is SnackBar set time
        /**
         * @param {?} buttonNameVal
         * @return {?}
         */
        function (buttonNameVal) {
            this.buttonNameValue = (buttonNameVal) || '<no name set>';
            this.buttonNameValue = buttonNameVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgetPasswordComponent.prototype, "domainUrl", {
        set: /**
         * @param {?} domainUrlVal
         * @return {?}
         */
        function (domainUrlVal) {
            this.domainUrlValue = (domainUrlVal) || '<no name set>';
            this.domainUrlValue = domainUrlVal;
            // console.log(this.domanUrlValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgetPasswordComponent.prototype, "formTitle", {
        set: /**
         * @param {?} formTitleVal
         * @return {?}
         */
        function (formTitleVal) {
            this.formTitleValue = (formTitleVal) || '<no name set>';
            this.formTitleValue = formTitleVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgetPasswordComponent.prototype, "serverUrl", {
        set: /**
         * @param {?} serverUrlVal
         * @return {?}
         */
        function (serverUrlVal) {
            this.serverUrlValue = (serverUrlVal) || '<no name set>';
            this.serverUrlValue = serverUrlVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgetPasswordComponent.prototype, "logo", {
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
    Object.defineProperty(ForgetPasswordComponent.prototype, "addEndpoint", {
        set: /**
         * @param {?} addEndpointval
         * @return {?}
         */
        function (addEndpointval) {
            this.addEndpointValue = addEndpointval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgetPasswordComponent.prototype, "signUpRouteingUrl", {
        set: /**
         * @param {?} routeingUrlval
         * @return {?}
         */
        function (routeingUrlval) {
            this.signUpRouteingUrlValue = (routeingUrlval) || '<no name set>';
            this.signUpRouteingUrlValue = routeingUrlval;
            // console.log(this.signUpRouteingUrlValue)
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForgetPasswordComponent.prototype, "loginRouteingUrl", {
        set: /**
         * @param {?} routeingUrlval
         * @return {?}
         */
        function (routeingUrlval) {
            this.loginRouteingUrlValue = (routeingUrlval) || '<no name set>';
            this.loginRouteingUrlValue = routeingUrlval;
            // console.log(this.loginRouteingUrlValue)
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ForgetPasswordComponent.prototype.ngOnInit = /**
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
    /********* Forget password  Form Submit start here*********/
    /**
     * ****** Forget password  Form Submit start here********
     * @return {?}
     */
    ForgetPasswordComponent.prototype.forgetPasswordSubmit = /**
     * ****** Forget password  Form Submit start here********
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var x;
        //  This for-loop use for from blank or properly validated checking  
        for (x in this.forgetPasswordForm.controls) {
            this.forgetPasswordForm.controls[x].markAsTouched();
        }
        if (this.forgetPasswordForm.valid) { //    validation checking
            //    validation checking
            // this.openSnackBar();              // open snack-bar function
            /** @type {?} */
            var link = this.serverUrlValue;
            /** @type {?} */
            var data = this.forgetPasswordForm.value;
            data.domainUrl = this.domainUrlValue;
            this.apiService.forgetPassword(data).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                // console.log(response);
                /** @type {?} */
                var result = {};
                result = response;
                if (result.status == "success") {
                    // this.openSnackBar();             // open snack-bar function
                    // this is use for reset the from
                    _this.formDirective.resetForm();
                    _this.message = ''; // clear the from
                }
                else {
                    // display error message on html
                    _this.message = result.msg; // show the error message
                }
            }));
        }
    };
    /********* Forget password  Form Submit end here*********/
    /********* openSnackBar function open start here*********/
    /********* Forget password  Form Submit end here*********/
    /**
     * ****** openSnackBar function open start here********
     * @return {?}
     */
    ForgetPasswordComponent.prototype.openSnackBar = /********* Forget password  Form Submit end here*********/
    /**
     * ****** openSnackBar function open start here********
     * @return {?}
     */
    function () {
        this.snackBar.openFromComponent(snackBarComponent, {
            duration: this.durationInSeconds * 1000,
        });
    };
    /********* openSnackBar function open end here*********/
    // This is use for navigate this component to sign-Up component 
    /**
     * ****** openSnackBar function open end here********
     * @return {?}
     */
    // This is use for navigate this component to sign-Up component 
    ForgetPasswordComponent.prototype.signup = /**
     * ****** openSnackBar function open end here********
     * @return {?}
     */
    // This is use for navigate this component to sign-Up component 
    function () {
        this.router.navigateByUrl('/' + this.signUpRouteingUrlValue);
    };
    // This is use for navigate this component to login component 
    // This is use for navigate this component to login component 
    /**
     * @return {?}
     */
    ForgetPasswordComponent.prototype.login = 
    // This is use for navigate this component to login component 
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
    ForgetPasswordComponent.prototype.inputUntouched = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.forgetPasswordForm.controls[val].markAsUntouched();
    };
    /**
     * @param {?} link
     * @return {?}
     */
    ForgetPasswordComponent.prototype.customFunction = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        this.router.navigateByUrl('/' + link);
    };
    ForgetPasswordComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-forget-password',
                    template: "<div class=\"main-div\">\n\n  <mat-card class=\"from\">\n      <span class=\"logowrapper\" *ngIf=\"logoValue != ''\" >\n          <img  [src]=\"logoValue\">\n      </span>\n\n    <h2 *ngIf=\"formTitleValue != ''\"> {{formTitleValue}}</h2>\n\n\n    <form class=\"example-container\" [formGroup]=\"forgetPasswordForm\" (ngSubmit)=\"forgetPasswordSubmit()\" novalidate>\n<mat-error class=\"error\" *ngIf=\"message !=''\">{{message}}</mat-error>\n\n      <mat-form-field>\n        <input matInput type=\"text\" placeholder=\"Email\"  formControlName=\"email\" (blur)=\"inputUntouched('email')\">\n        <mat-error\n          *ngIf=\"!forgetPasswordForm.controls['email'].valid && forgetPasswordForm.controls['email'].errors.required && forgetPasswordForm.controls['email'].touched\">\n          Email can not be blank</mat-error>\n        <mat-error\n          *ngIf=\"!forgetPasswordForm.controls['email'].valid && !forgetPasswordForm.controls['email'].errors.required\">\n          Please enter  a valid email</mat-error>\n      </mat-form-field>\n<button mat-raised-button *ngIf=\"buttonNameValue != ''\" color=\"primary\">{{buttonNameValue}}</button>\n            <button mat-raised-button *ngIf=\"buttonNameValue == ''\" color=\"primary\">Login</button>\n      <span class=\"signupfooter\">\n      <a *ngIf=\"loginRouteingUrlValue.buttonName !='' && loginRouteingUrlValue.customLink =='' && loginRouteingUrlValue.customURl ==''\" (click)=\"login()\">{{loginRouteingUrlValue.buttonName}}</a>\n\n      <a *ngIf=\"loginRouteingUrlValue.customURl !='' && loginRouteingUrlValue.customLink =='' && loginRouteingUrlValue.path ==''\" [href]=\"loginRouteingUrlValue.customURl\">{{loginRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"loginRouteingUrlValue.buttonName !='' && loginRouteingUrlValue.customLink !='' && loginRouteingUrlValue.path =='' \" (click)=\"customFunction(loginRouteingUrlValue.customLink)\">{{loginRouteingUrlValue.buttonName}}</a>\n\n <a *ngIf=\"loginRouteingUrlValue.buttonName =='' && loginRouteingUrlValue.customLink ==''\" (click)=\"login()\">Login</a>\n\n  <a *ngIf=\"signUpRouteingUrlValue.buttonName !='' && signUpRouteingUrlValue.customLink =='' && signUpRouteingUrlValue.customURl ==''\" (click)=\"signup()\">{{signUpRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"signUpRouteingUrlValue.buttonName !='' && signUpRouteingUrlValue.customLink !='' && signUpRouteingUrlValue.path =='' \" (click)=\"customFunction(signUpRouteingUrlValue.customLink)\">{{signUpRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"signUpRouteingUrlValue.customURl !='' && signUpRouteingUrlValue.customLink =='' && signUpRouteingUrlValue.path ==''\" [href]=\"signUpRouteingUrlValue.customURl\">{{signUpRouteingUrlValue.buttonName}}</a>\n\n\n                <a *ngIf=\"signUpRouteingUrlValue.buttonName =='' && signUpRouteingUrlValue.customLink ==''\" (click)=\"signup()\">Sign Up</a>\n\n\n\n\n                \n      </span>\n    </form>\n  </mat-card>\n</div>",
                    styles: [".example-container{display:flex;flex-direction:column}.example-container>*{width:100%}.from{width:30%;margin:0 auto}.from h2{text-align:center;background-color:#00f;color:#fff;padding:15px}.from a{padding-right:30px}.main-div{height:100vh;display:flex;justify-content:center;align-items:center}.signupfooter{margin-top:12px;display:flex;justify-content:space-between;align-items:center}.signupfooter a{cursor:pointer}.error{text-align:center}.logowrapper{margin:0 auto;display:block;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    ForgetPasswordComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: Router },
        { type: ApiService },
        { type: MatSnackBar }
    ]; };
    ForgetPasswordComponent.propDecorators = {
        formDirective: [{ type: ViewChild, args: [FormGroupDirective,] }],
        buttonName: [{ type: Input }],
        domainUrl: [{ type: Input }],
        formTitle: [{ type: Input }],
        serverUrl: [{ type: Input }],
        logo: [{ type: Input }],
        addEndpoint: [{ type: Input }],
        signUpRouteingUrl: [{ type: Input }],
        loginRouteingUrl: [{ type: Input }]
    };
    return ForgetPasswordComponent;
}());
export { ForgetPasswordComponent };
if (false) {
    /** @type {?} */
    ForgetPasswordComponent.prototype.message;
    /** @type {?} */
    ForgetPasswordComponent.prototype.buttonNameValue;
    /** @type {?} */
    ForgetPasswordComponent.prototype.formDirective;
    /** @type {?} */
    ForgetPasswordComponent.prototype.forgetPasswordForm;
    /** @type {?} */
    ForgetPasswordComponent.prototype.formTitleValue;
    /** @type {?} */
    ForgetPasswordComponent.prototype.serverUrlValue;
    /** @type {?} */
    ForgetPasswordComponent.prototype.signUpRouteingUrlValue;
    /** @type {?} */
    ForgetPasswordComponent.prototype.loginRouteingUrlValue;
    /**
     * @type {?}
     * @private
     */
    ForgetPasswordComponent.prototype.domainUrlValue;
    /** @type {?} */
    ForgetPasswordComponent.prototype.addEndpointValue;
    /** @type {?} */
    ForgetPasswordComponent.prototype.logoValue;
    /** @type {?} */
    ForgetPasswordComponent.prototype.durationInSeconds;
    /** @type {?} */
    ForgetPasswordComponent.prototype.fb;
    /** @type {?} */
    ForgetPasswordComponent.prototype.router;
    /** @type {?} */
    ForgetPasswordComponent.prototype.apiService;
    /**
     * @type {?}
     * @private
     */
    ForgetPasswordComponent.prototype.snackBar;
}
var snackBarComponent = /** @class */ (function () {
    function snackBarComponent() {
    }
    snackBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'snack-bar-modale',
                    template: "<span class=\"example\">\n    We have e-mailed your password reset link!\n  </span>",
                    styles: ["\n    .example {\n      color: aliceblue;\n      background-color: yellowgreen;\n    }\n  "]
                }] }
    ];
    return snackBarComponent;
}());
export { snackBarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ2V0LXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvZ2luLyIsInNvdXJjZXMiOlsibGliL2ZvcmdldC1wYXNzd29yZC9mb3JnZXQtcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFhLFdBQVcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RixPQUFPLEVBQUUsTUFBTSxFQUFrQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQ7SUE0RUUsaUNBQ1MsRUFBZSxFQUNmLE1BQWMsRUFDZCxVQUFzQixFQUNyQixRQUFxQjtRQUh0QixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQTFFeEIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQU0xQixtQkFBYyxHQUFRLEVBQUUsQ0FBQyxDQUFVLHFCQUFxQjs7UUFDeEQsbUJBQWMsR0FBUSxFQUFFLENBQUMsQ0FBVSxzQkFBc0I7O1FBQ3pELDJCQUFzQixHQUFRLEVBQUUsQ0FBQyxDQUFFLG1EQUFtRDs7UUFDdEYsMEJBQXFCLEdBQVEsRUFBRSxDQUFDLENBQUUsaURBQWlEOztRQUNsRixtQkFBYyxHQUFRLEVBQUUsQ0FBQyxDQUFVLDZCQUE2Qjs7UUFDakUscUJBQWdCLEdBQVEsRUFBRSxDQUFDLENBQVEsdUJBQXVCOztRQUMxRCxjQUFTLEdBQVEsRUFBRSxD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eURBQXdDOztJQUN4Qyx3REFBdUM7Ozs7O0lBQ3ZDLGlEQUFpQzs7SUFDakMsbURBQWtDOztJQUNsQyw0Q0FBMkI7O0lBQzNCLG9EQUE2Qjs7SUF5RDNCLHFDQUFzQjs7SUFDdEIseUNBQXFCOztJQUNyQiw2Q0FBNkI7Ozs7O0lBQzdCLDJDQUE2Qjs7QUF1R2pDO0lBQUE7SUFVaUMsQ0FBQzs7Z0JBVmpDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwrRkFBeUM7NkJBQ2hDLDRGQUtSO2lCQUNGOztJQUNnQyx3QkFBQztDQUFBLEFBVmxDLElBVWtDO1NBQXJCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1mb3JnZXQtcGFzc3dvcmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9yZ2V0LXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZm9yZ2V0LXBhc3N3b3JkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JnZXRQYXNzd29yZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBtZXNzYWdlOiBhbnkgPSAnJztcbiAgcHVibGljIGJ1dHRvbk5hbWVWYWx1ZTogYW55ID0gJyc7XG5cbiAgLy8gICBGb3JtR3JvdXBEaXJlY3RpdmU6IEl0IGlzIGEgZGlyZWN0aXZlIHRoYXQgYmluZHMgYW4gZXhpc3RpbmcgRm9ybUdyb3VwIHRvIGEgRE9NIGVsZW1lbnQuXG4gIEBWaWV3Q2hpbGQoRm9ybUdyb3VwRGlyZWN0aXZlKSBmb3JtRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmU7XG5cbiAgcHVibGljIGZvcmdldFBhc3N3b3JkRm9ybTogRm9ybUdyb3VwO1xuICBwdWJsaWMgZm9ybVRpdGxlVmFsdWU6IGFueSA9ICcnOyAgICAgICAgICAvLyBUaGlzIGlzIEZyb20gdGl0bGVcbiAgcHVibGljIHNlcnZlclVybFZhbHVlOiBhbnkgPSAnJzsgICAgICAgICAgLy8gIFRoaXMgaXMgU2VydmVyIHVybFxuICBwdWJsaWMgc2lnblVwUm91dGVpbmdVcmxWYWx1ZTogYW55ID0gJyc7ICAvLyBzZXR0aW5nIHRoZSBuYXZpZ2F0ZSBCeSBTaWduIFVwIFVybCBmcm9tIHByb2plY3RcbiAgcHVibGljIGxvZ2luUm91dGVpbmdVcmxWYWx1ZTogYW55ID0gJyc7ICAvLyBzZXR0aW5nIHRoZSBuYXZpZ2F0ZSBCeSBsb2dpbiBVcmwgZnJvbSBwcm9qZWN0XG4gIHByaXZhdGUgZG9tYWluVXJsVmFsdWU6IGFueSA9ICcnOyAgICAgICAgICAvLyBUaGlzIGlzIHJlc2V0IHBhc3N3b3JkIHVybFxuICBwdWJsaWMgYWRkRW5kcG9pbnRWYWx1ZTogYW55ID0gJyc7ICAgICAgICAvLyBUaGlzIGlzIGVuZHBvaW50IHVybFxuICBwdWJsaWMgbG9nb1ZhbHVlOiBhbnkgPSAnJzsgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGZyb20gbG9nbyB1cmxcbiAgcHVibGljIGR1cmF0aW9uSW5TZWNvbmRzID0gNTsgICAgICAgICAgICAgLy8gVGhpcyBpcyBTbmFja0JhciBzZXQgdGltZVxuXG5cbiAgQElucHV0KClcbnNldCBidXR0b25OYW1lIChidXR0b25OYW1lVmFsIDphbnkpe1xuICB0aGlzLmJ1dHRvbk5hbWVWYWx1ZSA9IChidXR0b25OYW1lVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gIHRoaXMuYnV0dG9uTmFtZVZhbHVlID0gYnV0dG9uTmFtZVZhbFxufVxuXG4gIEBJbnB1dCgpICAgICAgICAgLy8gU2V0IHRoZSBwcm9qZWN0IGVtYWlsIERvbWFuIFVSTFxuICBzZXQgZG9tYWluVXJsKGRvbWFpblVybFZhbDogYW55KSB7XG4gICAgdGhpcy5kb21haW5VcmxWYWx1ZSA9IChkb21haW5VcmxWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLmRvbWFpblVybFZhbHVlID0gZG9tYWluVXJsVmFsO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZG9tYW5VcmxWYWx1ZSk7XG4gIH1cbiAgQElucHV0KCkgICAgICAgICAvLyBTZXQgdGhlIHByb2plY3QgbmFtZVxuICBzZXQgZm9ybVRpdGxlKGZvcm1UaXRsZVZhbDogYW55KSB7XG4gICAgdGhpcy5mb3JtVGl0bGVWYWx1ZSA9IChmb3JtVGl0bGVWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLmZvcm1UaXRsZVZhbHVlID0gZm9ybVRpdGxlVmFsO1xuXG4gIH1cblxuICBASW5wdXQoKSAgICAgICAgLy8gc2V0dGluZyB0aGUgc2VydmVyIHVybCBmcm9tIHByb2plY3RcbiAgc2V0IHNlcnZlclVybChzZXJ2ZXJVcmxWYWw6IGFueSkge1xuICAgIHRoaXMuc2VydmVyVXJsVmFsdWUgPSAoc2VydmVyVXJsVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5zZXJ2ZXJVcmxWYWx1ZSA9IHNlcnZlclVybFZhbDtcblxuICB9XG5cbiAgQElucHV0KCkgICAgICAvLyBzZXQgdGhlIGZyb20gbG9nb1xuXG4gIHNldCBsb2dvKGxvZ29WYWw6IGFueSkge1xuICAgIHRoaXMubG9nb1ZhbHVlID0gbG9nb1ZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldCB0aGUgZW5kcG9pbnQgYW5kIHNvdXJjZVxuXG4gIHNldCBhZGRFbmRwb2ludChhZGRFbmRwb2ludHZhbDogYW55KSB7XG4gICAgdGhpcy5hZGRFbmRwb2ludFZhbHVlID0gYWRkRW5kcG9pbnR2YWw7XG4gIH1cblxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IFNpZ24gVXAgVXJsIGZyb20gcHJvamVjdFxuICBzZXQgc2lnblVwUm91dGVpbmdVcmwocm91dGVpbmdVcmx2YWw6IGFueSkge1xuICAgIHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZSA9IChyb3V0ZWluZ1VybHZhbCkgfHwgJzxubyBuYW1lIHNldD4nO1xuICAgIHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZSA9IHJvdXRlaW5nVXJsdmFsO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZSlcbiAgfVxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IFNpZ24gVXAgVXJsIGZyb20gcHJvamVjdFxuICBzZXQgbG9naW5Sb3V0ZWluZ1VybChyb3V0ZWluZ1VybHZhbDogYW55KSB7XG4gICAgdGhpcy5sb2dpblJvdXRlaW5nVXJsVmFsdWUgPSAocm91dGVpbmdVcmx2YWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLmxvZ2luUm91dGVpbmdVcmxWYWx1ZSA9IHJvdXRlaW5nVXJsdmFsO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubG9naW5Sb3V0ZWluZ1VybFZhbHVlKVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHVibGljIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzbmFja0JhcjogTWF0U25hY2tCYXJcbiAgKSB7XG5cblxuXG4gICAgdGhpcy5mb3JnZXRQYXNzd29yZEZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eXFxzKltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxAW1xcd1xcLVxcK19dK1xcLltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxzKiQvKV0pXSxcblxuICAgIH0pO1xuXG5cblxuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFwaVNlcnZpY2UuY2xlYXJTZXJ2ZXJVcmwoKTsgICAgICAgLy8gIENsZWFyIHRoZSBzZXJ2ZXIgdXJsXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFwaVNlcnZpY2Uuc2V0U2VydmVyVXJsKHRoaXMuc2VydmVyVXJsVmFsdWUpOyAgICAgICAgLy8gIHNldCB0aGUgc2VydmVyIHVybFxuICAgIH0sIDUwKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVSTCk7XG5cblxuICAgIHRoaXMuYXBpU2VydmljZS5jbGVhcmFkZEVuZHBvaW50KCk7ICAgICAgIC8vICBDbGVhciB0aGUgZW5kcG9pbnRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5zZXRhZGRFbmRwb2ludCh0aGlzLmFkZEVuZHBvaW50VmFsdWUuZW5kcG9pbnQpOyAgIC8vICBzZXQgdGhlIGVuZHBvaW50XG4gICAgfSwgNTApO1xuICB9XG5cbiAgLyoqKioqKioqKiBGb3JnZXQgcGFzc3dvcmQgIEZvcm0gU3VibWl0IHN0YXJ0IGhlcmUqKioqKioqKiovXG4gIGZvcmdldFBhc3N3b3JkU3VibWl0KCkge1xuICAgIGxldCB4OiBhbnk7XG5cbiAgICAvLyAgVGhpcyBmb3ItbG9vcCB1c2UgZm9yIGZyb20gYmxhbmsgb3IgcHJvcGVybHkgdmFsaWRhdGVkIGNoZWNraW5nICBcbiAgICBmb3IgKHggaW4gdGhpcy5mb3JnZXRQYXNzd29yZEZvcm0uY29udHJvbHMpIHtcbiAgICAgIHRoaXMuZm9yZ2V0UGFzc3dvcmRGb3JtLmNvbnRyb2xzW3hdLm1hcmtBc1RvdWNoZWQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9yZ2V0UGFzc3dvcmRGb3JtLnZhbGlkKSB7ICAgIC8vICAgIHZhbGlkYXRpb24gY2hlY2tpbmdcblxuICAgICAgLy8gdGhpcy5vcGVuU25hY2tCYXIoKTsgICAgICAgICAgICAgIC8vIG9wZW4gc25hY2stYmFyIGZ1bmN0aW9uXG5cbiAgICAgIGxldCBsaW5rOiBhbnkgPSB0aGlzLnNlcnZlclVybFZhbHVlO1xuICAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMuZm9yZ2V0UGFzc3dvcmRGb3JtLnZhbHVlO1xuXG4gICAgICBkYXRhLmRvbWFpblVybCA9IHRoaXMuZG9tYWluVXJsVmFsdWU7XG5cbiAgICAgIHRoaXMuYXBpU2VydmljZS5mb3JnZXRQYXNzd29yZChkYXRhKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlO1xuXG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgLy8gdGhpcy5vcGVuU25hY2tCYXIoKTsgICAgICAgICAgICAgLy8gb3BlbiBzbmFjay1iYXIgZnVuY3Rpb25cbiAgICAgICAgICAvLyB0aGlzIGlzIHVzZSBmb3IgcmVzZXQgdGhlIGZyb21cbiAgICAgICAgICB0aGlzLmZvcm1EaXJlY3RpdmUucmVzZXRGb3JtKCk7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7ICAgICAgICAgLy8gY2xlYXIgdGhlIGZyb21cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIC8vIGRpc3BsYXkgZXJyb3IgbWVzc2FnZSBvbiBodG1sXG4gICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzdWx0Lm1zZzsgICAgICAvLyBzaG93IHRoZSBlcnJvciBtZXNzYWdlXG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKiBGb3JnZXQgcGFzc3dvcmQgIEZvcm0gU3VibWl0IGVuZCBoZXJlKioqKioqKioqL1xuXG5cbiAgLyoqKioqKioqKiBvcGVuU25hY2tCYXIgZnVuY3Rpb24gb3BlbiBzdGFydCBoZXJlKioqKioqKioqL1xuXG5cbiAgb3BlblNuYWNrQmFyKCkge1xuICAgIHRoaXMuc25hY2tCYXIub3BlbkZyb21Db21wb25lbnQoc25hY2tCYXJDb21wb25lbnQsIHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmR1cmF0aW9uSW5TZWNvbmRzICogMTAwMCxcbiAgICB9KTtcbiAgfVxuIC8qKioqKioqKiogb3BlblNuYWNrQmFyIGZ1bmN0aW9uIG9wZW4gZW5kIGhlcmUqKioqKioqKiovXG5cblxuICAvLyBUaGlzIGlzIHVzZSBmb3IgbmF2aWdhdGUgdGhpcyBjb21wb25lbnQgdG8gc2lnbi1VcCBjb21wb25lbnQgXG4gIHNpZ251cCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJyArIHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZSk7XG4gIH1cblxuICAgIC8vIFRoaXMgaXMgdXNlIGZvciBuYXZpZ2F0ZSB0aGlzIGNvbXBvbmVudCB0byBsb2dpbiBjb21wb25lbnQgXG4gICAgbG9naW4oKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJyArIHRoaXMubG9naW5Sb3V0ZWluZ1VybFZhbHVlKTtcbiAgICB9XG5cbiAgaW5wdXRVbnRvdWNoZWQodmFsOiBhbnkpIHtcbiAgICB0aGlzLmZvcmdldFBhc3N3b3JkRm9ybS5jb250cm9sc1t2YWxdLm1hcmtBc1VudG91Y2hlZCgpO1xuICB9XG5cblxuICBjdXN0b21GdW5jdGlvbihsaW5rOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJysgbGluayk7XG4gIH1cblxuXG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc25hY2stYmFyLW1vZGFsZScsXG4gIHRlbXBsYXRlVXJsOiAnZm9yZ2V0LXBhc3N3b3JkTW9kYWxlLmh0bWwnLFxuICBzdHlsZXM6IFtgXG4gICAgLmV4YW1wbGUge1xuICAgICAgY29sb3I6IGFsaWNlYmx1ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvd2dyZWVuO1xuICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIHNuYWNrQmFyQ29tcG9uZW50IHsgfVxuIl19