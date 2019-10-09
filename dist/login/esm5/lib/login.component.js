/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, http, router, apiService, cookieService) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.apiService = apiService;
        this.cookieService = cookieService;
        this.message = '';
        this.fromTitleValue = '';
        this.serverURL = '';
        this.signUpRouteingUrlValue = '';
        this.forgetRouteingUrlValue = '';
        this.routerStatusValue = '';
        this.logoValue = '';
        this.cookieSetValue = '';
        this.project_name = '';
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
            password: ['', Validators.required]
        });
    }
    Object.defineProperty(LoginComponent.prototype, "fromTitle", {
        set: /**
         * @param {?} fromTitleVal
         * @return {?}
         */
        function (fromTitleVal) {
            this.fromTitleValue = (fromTitleVal) || '<no name set>';
            this.fromTitleValue = fromTitleVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "logo", {
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
    Object.defineProperty(LoginComponent.prototype, "fullUrl", {
        set: /**
         * @param {?} fullUrlVal
         * @return {?}
         */
        function (fullUrlVal) {
            this.serverURL = (fullUrlVal) || '<no name set>';
            this.serverURL = fullUrlVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "endpoint", {
        set: /**
         * @param {?} endpointVal
         * @return {?}
         */
        function (endpointVal) {
            this.endpointValue = endpointVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "cookieSet", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.cookieSetValue = v;
            console.log(this.cookieSetValue.cookie);
            // for (const key in this.cookieSetValue.cookie) {
            //   console.log(this.cookieSetValue.cookie[key]);
            // }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "signUpRouteingUrl", {
        set: /**
         * @param {?} routeingUrlval
         * @return {?}
         */
        function (routeingUrlval) {
            this.signUpRouteingUrlValue = (routeingUrlval) || '<no name set>';
            this.signUpRouteingUrlValue = routeingUrlval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "forgetRouteingUrl", {
        set: /**
         * @param {?} routeingUrlval
         * @return {?}
         */
        function (routeingUrlval) {
            this.forgetRouteingUrlValue = (routeingUrlval) || '<no name set>';
            this.forgetRouteingUrlValue = routeingUrlval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "routerStatus", {
        set: /**
         * @param {?} routerStatusval
         * @return {?}
         */
        function (routerStatusval) {
            this.routerStatusValue = (routerStatusval) || '<no name set>';
            this.routerStatusValue = routerStatusval;
            console.log(this.routerStatusValue);
            console.log(this.routerStatusValue.data.length);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LoginComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.apiService.clearServerUrl(); // Clear the server url
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.apiService.setServerUrl(_this.serverURL); // set the server url 
        }), 50);
        // console.log(this.serverURL);
        this.apiService.clearaddEndpoint(); // clear the endpoint 
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.apiService.setaddEndpoint(_this.endpointValue); // set the endpoint
        }), 50);
        // console.log(this.addEndpointData.endpoint);
    };
    /********* Login Form Submit start here*********/
    /**
     * ****** Login Form Submit start here********
     * @return {?}
     */
    LoginComponent.prototype.loginFormSubmit = /**
     * ****** Login Form Submit start here********
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var x;
        /****************** test*******************/
        // for (const key in this.cookieSetValue.cookie) {
        //   console.log(this.cookieSetValue.cookie[key].type);
        //   if (result.token == this.cookieSetValue.cookie[key].type) {
        //     console.log('+++++++++++++++');
        //   }
        // }
        // use for validation checking
        for (x in this.loginForm.controls) {
            this.loginForm.controls[x].markAsTouched();
        }
        if (this.loginForm.valid) {
            /** @type {?} */
            var data = this.loginForm.value;
            this.apiService.addLogin(data).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                // console.log(response);
                /** @type {?} */
                var result = {};
                result = response;
                //   let cookiekeyarr:any = [];
                //   let cookievaluearr:any = [];
                //   for(let j in result.item){
                //     // console.log(Object.values(result.item[j]));
                //     // cookiekeyarr = Object.keys(result.item[j]);
                //     // cookievaluearr = Object.values(result.item[j]);
                //     cookievaluearr.push(Object.keys(result.item[j]), Object.values(result.item[j]));
                //   }
                //   // console.log('cookiekeyarr'+cookiekeyarr);
                //   console.log(cookievaluearr);
                // //   setTimeout(()=>{
                //   // for (let key in cookiekeyarr){
                //     for(let value in cookievaluearr[0]){
                //       console.log('hi'+value);
                //       // this.cookieService.set(cookiekeyarr[key],cookievaluearr[value]);
                //     }
                //   // }
                // // },2000);
                //   // setTimeout(()=>{
                //   //   console.log(this.cookieService.getAll());
                //   // },4000);
                if (result.status == "success") {
                    // for (const key in this.cookieSetValue.cookie) {
                    //   console.log(this.cookieSetValue.cookie[key].type);
                    //   if (result == this.cookieSetValue.cookie[key].type) {
                    //     console.log('+++++++++++++++');
                    //   }
                    // }
                    _this.cookieService.set('user_details', JSON.stringify(result.item[0]));
                    _this.cookieService.set('jwtToken', result.token);
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        console.log(_this.cookieService.getAll());
                    }), 1000);
                    for (var key in _this.routerStatusValue.data) {
                        // console.log(this.routerStatusValue.data[key].type);
                        if (result.type === _this.routerStatusValue.data[key].type) {
                            _this.router.navigateByUrl('/' + _this.routerStatusValue.data[key].routerNav); // navigate to dashboard url 
                        }
                    }
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
    /**
     * @param {?} val
     * @return {?}
     */
    LoginComponent.prototype.inputUntouched = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.loginForm.controls[val].markAsUntouched();
    };
    // This is use for navigate this component to forget component 
    // This is use for navigate this component to forget component 
    /**
     * @return {?}
     */
    LoginComponent.prototype.forgetpassword = 
    // This is use for navigate this component to forget component 
    /**
     * @return {?}
     */
    function () {
        this.router.navigateByUrl('/' + this.forgetRouteingUrlValue);
    };
    // This is use for navigate this component to sign-Up component 
    // This is use for navigate this component to sign-Up component 
    /**
     * @return {?}
     */
    LoginComponent.prototype.signup = 
    // This is use for navigate this component to sign-Up component 
    /**
     * @return {?}
     */
    function () {
        this.router.navigateByUrl('/' + this.signUpRouteingUrlValue);
    };
    LoginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-login',
                    template: "<div class=\"main-div\">\n\n    <mat-card class=\"from\">\n            <span class=\"logowrapper\" *ngIf=\"logoValue != ''\" >\n                    <img  [src]=\"logoValue\">\n                </span>\n\n        <h2 *ngIf=\"fromTitleValue != ''\"> {{fromTitleValue}}</h2>\n\n        <form class=\"example-container\" [formGroup]=\"loginForm\" (ngSubmit)=\"loginFormSubmit()\" novalidate>\n<mat-error class=\"error\" *ngIf=\"message !=''\">{{message}}</mat-error>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Username\" formControlName=\"email\" (blur)=\"inputUntouched('email')\">\n                <mat-error\n                    *ngIf=\"!loginForm.controls['email'].valid && loginForm.controls['email'].errors.required && loginForm.controls['email'].touched\">\n                    Username field can not be blank</mat-error>\n            </mat-form-field>\n\n\n            <mat-form-field>\n                <input matInput placeholder=\"Password\" type=\"password\" formControlName=\"password\" (blur)=\"inputUntouched('password')\">\n                <mat-error\n                    *ngIf=\"!loginForm.controls['password'].valid && loginForm.controls['password'].errors.required && loginForm.controls['password'].touched\">\n                    Password field can not be blank</mat-error>\n            </mat-form-field>\n\n\n            <button mat-raised-button color=\"primary\">Login</button>\n            <span class=\"signupfooter\">\n                <a (click)=\"forgetpassword()\">Forgot password</a>\n                <a (click)=\"signup()\">Sign Up</a>\n            </span>\n        </form>\n\n    </mat-card>\n\n</div>",
                    styles: [".example-container{display:flex;flex-direction:column}.example-container>*{width:100%}.from{width:30%;margin:0 auto}.from h2{text-align:center;background-color:#00f;color:#fff;padding:15px}.from a{padding-right:30px}.main-div{height:100vh;display:flex;justify-content:center;align-items:center}.signupfooter{margin-top:12px;display:flex;justify-content:space-between;align-items:center}.signupfooter a{cursor:pointer}.error{text-align:center}.logowrapper{margin:0 auto;display:block;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    LoginComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: HttpClient },
        { type: Router },
        { type: ApiService },
        { type: CookieService }
    ]; };
    LoginComponent.propDecorators = {
        formDirective: [{ type: ViewChild, args: [FormGroupDirective,] }],
        fromTitle: [{ type: Input }],
        logo: [{ type: Input }],
        fullUrl: [{ type: Input }],
        endpoint: [{ type: Input }],
        cookieSet: [{ type: Input }],
        signUpRouteingUrl: [{ type: Input }],
        forgetRouteingUrl: [{ type: Input }],
        routerStatus: [{ type: Input }]
    };
    return LoginComponent;
}());
export { LoginComponent };
if (false) {
    /** @type {?} */
    LoginComponent.prototype.message;
    /** @type {?} */
    LoginComponent.prototype.formDirective;
    /** @type {?} */
    LoginComponent.prototype.fromTitleValue;
    /** @type {?} */
    LoginComponent.prototype.serverURL;
    /** @type {?} */
    LoginComponent.prototype.signUpRouteingUrlValue;
    /** @type {?} */
    LoginComponent.prototype.forgetRouteingUrlValue;
    /** @type {?} */
    LoginComponent.prototype.routerStatusValue;
    /** @type {?} */
    LoginComponent.prototype.endpointValue;
    /** @type {?} */
    LoginComponent.prototype.logoValue;
    /** @type {?} */
    LoginComponent.prototype.cookieSetValue;
    /** @type {?} */
    LoginComponent.prototype.loginForm;
    /** @type {?} */
    LoginComponent.prototype.project_name;
    /** @type {?} */
    LoginComponent.prototype.fb;
    /** @type {?} */
    LoginComponent.prototype.http;
    /** @type {?} */
    LoginComponent.prototype.router;
    /** @type {?} */
    LoginComponent.prototype.apiService;
    /** @type {?} */
    LoginComponent.prototype.cookieService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvbG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFhLFdBQVcsRUFBYSxVQUFVLEVBQXNCLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRDtJQW9GRSx3QkFBbUIsRUFBZSxFQUFTLElBQWdCLEVBQVMsTUFBYyxFQUFTLFVBQXNCLEVBQVMsYUFBNEI7UUFBbkksT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBOUUvSSxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBSWxCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsMkJBQXNCLEdBQVEsRUFBRSxDQUFDO1FBQ2pDLDJCQUFzQixHQUFRLEVBQUUsQ0FBQztRQUNqQyxzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFFNUIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQWlFekIsaUJBQVksR0FBUSxFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUM3QixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQywwRUFBMEUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SixRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNwQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBdEVELHNCQUNJLHFDQUFTOzs7OztRQURiLFVBQ2MsWUFBaUI7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLGVBQWUsQ0FBQztZQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztRQUVyQyxDQUFDOzs7T0FBQTtJQUNELHNCQUVFLGdDQUFJOzs7OztRQUZOLFVBRU8sT0FBYTtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVDLHNCQUNJLG1DQUFPOzs7OztRQURYLFVBQ1ksVUFBZTtZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksZUFBZSxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBRTlCLENBQUM7OztPQUFBO0lBQ0Qsc0JBRUksb0NBQVE7Ozs7O1FBRlosVUFFYSxXQUFnQjtZQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUVILHNCQUVXLHFDQUFTOzs7OztRQUZwQixVQUVxQixDQUFPO1lBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxrREFBa0Q7WUFFbEQsa0RBQWtEO1lBQ2xELElBQUk7UUFFTixDQUFDOzs7T0FBQTtJQUlDLHNCQUNJLDZDQUFpQjs7Ozs7UUFEckIsVUFDc0IsY0FBbUI7WUFDdkMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksZUFBZSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxjQUFjLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFHRCxzQkFDSSw2Q0FBaUI7Ozs7O1FBRHJCLFVBQ3NCLGNBQW1CO1lBQ3ZDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLGVBQWUsQ0FBQztZQUNsRSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsY0FBYyxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBRUQsc0JBQ0ksd0NBQVk7Ozs7O1FBRGhCLFVBQ2lCLGVBQW9CO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLGVBQWUsQ0FBQztZQUM5RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUFBOzs7O0lBZUQsaUNBQVE7OztJQUFSO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQU8sdUJBQXVCO1FBQy9ELFVBQVU7OztRQUFDO1lBQ1QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQU8sc0JBQXNCO1FBQzVFLENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztRQUNQLCtCQUErQjtRQUcvQixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBTyxzQkFBc0I7UUFDaEUsVUFBVTs7O1FBQUM7WUFDVCxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBTyxtQkFBbUI7UUFDL0UsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1AsOENBQThDO0lBRWhELENBQUM7SUFFSCxpREFBaUQ7Ozs7O0lBQy9DLHdDQUFlOzs7O0lBQWY7UUFBQSxpQkErRUM7O1lBOUVLLENBQU07UUFDZCw0Q0FBNEM7UUFDNUMsa0RBQWtEO1FBQ2xELHVEQUF1RDtRQUN2RCxnRUFBZ0U7UUFDaEUsc0NBQXNDO1FBQ3RDLE1BQU07UUFDTixJQUFJO1FBR0EsOEJBQThCO1FBRTlCLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVDO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTs7Z0JBQ3BCLElBQUksR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsUUFBUTs7O29CQUU1QyxNQUFNLEdBQVEsRUFBRTtnQkFDcEIsTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDcEIsK0JBQStCO2dCQUMvQixpQ0FBaUM7Z0JBQ2pDLCtCQUErQjtnQkFDL0IscURBQXFEO2dCQUNyRCxxREFBcUQ7Z0JBQ3JELHlEQUF5RDtnQkFDekQsdUZBQXVGO2dCQUN2RixNQUFNO2dCQUNOLGlEQUFpRDtnQkFDakQsaUNBQWlDO2dCQUNqQyx3QkFBd0I7Z0JBQ3hCLHNDQUFzQztnQkFDdEMsMkNBQTJDO2dCQUMzQyxpQ0FBaUM7Z0JBQ2pDLDRFQUE0RTtnQkFDNUUsUUFBUTtnQkFDUixTQUFTO2dCQUNULGNBQWM7Z0JBQ2Qsd0JBQXdCO2dCQUN4QixtREFBbUQ7Z0JBQ25ELGdCQUFnQjtnQkFHZCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO29CQUM5QixrREFBa0Q7b0JBQ2xELHVEQUF1RDtvQkFDdkQsMERBQTBEO29CQUMxRCxzQ0FBc0M7b0JBQ3RDLE1BQU07b0JBQ04sSUFBSTtvQkFDSixLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFakQsVUFBVTs7O29CQUFDO3dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUMzQyxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7b0JBR1QsS0FBSyxJQUFNLEdBQUcsSUFBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO3dCQUM3QyxzREFBc0Q7d0JBRXRELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs0QkFDekQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBSyw2QkFBNkI7eUJBQzlHO3FCQUNGO29CQUdELGlDQUFpQztvQkFDakMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0wsZ0NBQWdDO29CQUNoQyxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQzNCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUVILENBQUM7Ozs7O0lBR0QsdUNBQWM7Ozs7SUFBZCxVQUFlLEdBQVE7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELCtEQUErRDs7Ozs7SUFDL0QsdUNBQWM7Ozs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGdFQUFnRTs7Ozs7SUFDaEUsK0JBQU07Ozs7O0lBQU47UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Z0JBMU1GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsd3BEQUFxQzs7aUJBRXRDOzs7O2dCQVZtQixXQUFXO2dCQUN0QixVQUFVO2dCQUNWLE1BQU07Z0JBQ04sVUFBVTtnQkFDVixhQUFhOzs7Z0NBVW5CLFNBQVMsU0FBQyxrQkFBa0I7NEJBVzVCLEtBQUs7dUJBTUwsS0FBSzswQkFNTCxLQUFLOzJCQU1MLEtBQUs7NEJBTVAsS0FBSztvQ0FjSCxLQUFLO29DQU9MLEtBQUs7K0JBTUwsS0FBSzs7SUFzSVIscUJBQUM7Q0FBQSxBQTVNRCxJQTRNQztTQXZNWSxjQUFjOzs7SUFDekIsaUNBQXlCOztJQUV6Qix1Q0FBaUU7O0lBRWpFLHdDQUFnQzs7SUFDaEMsbUNBQTJCOztJQUMzQixnREFBd0M7O0lBQ3hDLGdEQUF3Qzs7SUFDeEMsMkNBQW1DOztJQUNuQyx1Q0FBMEI7O0lBQzFCLG1DQUEyQjs7SUFDM0Isd0NBQWdDOztJQWdFaEMsbUNBQTRCOztJQUM1QixzQ0FBOEI7O0lBRWxCLDRCQUFzQjs7SUFBRSw4QkFBdUI7O0lBQUUsZ0NBQXFCOztJQUFFLG9DQUE2Qjs7SUFBRSx1Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzLCBNaW5MZW5ndGhWYWxpZGF0b3IsIEZvcm1Hcm91cERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1sb2dpbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBtZXNzYWdlOiBhbnkgPSAnJztcbiAgLy8gICBGb3JtR3JvdXBEaXJlY3RpdmU6IEl0IGlzIGEgZGlyZWN0aXZlIHRoYXQgYmluZHMgYW4gZXhpc3RpbmcgRm9ybUdyb3VwIHRvIGEgRE9NIGVsZW1lbnQuXG4gIEBWaWV3Q2hpbGQoRm9ybUdyb3VwRGlyZWN0aXZlKSBmb3JtRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmU7XG5cbiAgcHVibGljIGZyb21UaXRsZVZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIHNlcnZlclVSTDogYW55ID0gJyc7XG4gIHB1YmxpYyBzaWduVXBSb3V0ZWluZ1VybFZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIGZvcmdldFJvdXRlaW5nVXJsVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgcm91dGVyU3RhdHVzVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgZW5kcG9pbnRWYWx1ZTogYW55O1xuICBwdWJsaWMgbG9nb1ZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIGNvb2tpZVNldFZhbHVlOiBhbnkgPSAnJztcblxuICBASW5wdXQoKSAgICAgICAgIC8vIFNldCB0aGUgcHJvamVjdCBuYW1lXG4gIHNldCBmcm9tVGl0bGUoZnJvbVRpdGxlVmFsOiBhbnkpIHtcbiAgICB0aGlzLmZyb21UaXRsZVZhbHVlID0gKGZyb21UaXRsZVZhbCkgfHwgJzxubyBuYW1lIHNldD4nO1xuICAgIHRoaXMuZnJvbVRpdGxlVmFsdWUgPSBmcm9tVGl0bGVWYWw7XG5cbiAgfVxuICBASW5wdXQoKSAgICAgIC8vIHNldCB0aGUgZnJvbSBsb2dvXG5cbnNldCBsb2dvKGxvZ29WYWwgOiBhbnkpIHtcbiAgdGhpcy5sb2dvVmFsdWUgPSBsb2dvVmFsO1xufVxuXG4gIEBJbnB1dCgpICAgICAgICAvLyBzZXR0aW5nIHRoZSBzZXJ2ZXIgdXJsIGZyb20gcHJvamVjdFxuICBzZXQgZnVsbFVybChmdWxsVXJsVmFsOiBhbnkpIHtcbiAgICB0aGlzLnNlcnZlclVSTCA9IChmdWxsVXJsVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5zZXJ2ZXJVUkwgPSBmdWxsVXJsVmFsO1xuXG4gIH1cbiAgQElucHV0KClcblxuICBzZXQgZW5kcG9pbnQoZW5kcG9pbnRWYWw6IGFueSkge1xuICAgIHRoaXMuZW5kcG9pbnRWYWx1ZSA9IGVuZHBvaW50VmFsO1xuICB9XG5cbkBJbnB1dCgpXG5cbnB1YmxpYyBzZXQgY29va2llU2V0KHYgOiBhbnkpIHtcbiAgdGhpcy5jb29raWVTZXRWYWx1ZSA9IHY7XG4gIGNvbnNvbGUubG9nKHRoaXMuY29va2llU2V0VmFsdWUuY29va2llKTtcbiAgLy8gZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWUpIHtcbiAgICAgICAgICAgIFxuICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuY29va2llU2V0VmFsdWUuY29va2llW2tleV0pO1xuICAvLyB9XG5cbn1cblxuXG5cbiAgQElucHV0KCkgICAgICAgICAgLy8gc2V0dGluZyB0aGUgbmF2aWdhdGUgQnkgU2lnbiBVcCBVcmwgZnJvbSBwcm9qZWN0XG4gIHNldCBzaWduVXBSb3V0ZWluZ1VybChyb3V0ZWluZ1VybHZhbDogYW55KSB7XG4gICAgdGhpcy5zaWduVXBSb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5zaWduVXBSb3V0ZWluZ1VybFZhbHVlID0gcm91dGVpbmdVcmx2YWw7XG4gIH1cblxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IEZvcmdldCBQYXNzd29yZCBVcmwgZnJvbSBwcm9qZWN0XG4gIHNldCBmb3JnZXRSb3V0ZWluZ1VybChyb3V0ZWluZ1VybHZhbDogYW55KSB7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gcm91dGVpbmdVcmx2YWw7XG4gIH1cblxuICBASW5wdXQoKSAgICAgICAgICAvLyBzZXR0aW5nIHRoZSBuYXZpZ2F0ZSBCeSBGb3JnZXQgUGFzc3dvcmQgVXJsIGZyb20gcHJvamVjdFxuICBzZXQgcm91dGVyU3RhdHVzKHJvdXRlclN0YXR1c3ZhbDogYW55KSB7XG4gICAgdGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZSA9IChyb3V0ZXJTdGF0dXN2YWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLnJvdXRlclN0YXR1c1ZhbHVlID0gcm91dGVyU3RhdHVzdmFsO1xuICAgIGNvbnNvbGUubG9nKHRoaXMucm91dGVyU3RhdHVzVmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMucm91dGVyU3RhdHVzVmFsdWUuZGF0YS5sZW5ndGgpO1xuICB9XG5cblxuXG5cbiAgcHVibGljIGxvZ2luRm9ybTogRm9ybUdyb3VwO1xuICBwdWJsaWMgcHJvamVjdF9uYW1lOiBhbnkgPSAnJztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyLCBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgYXBpU2VydmljZTogQXBpU2VydmljZSwgcHVibGljIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UpIHtcbiAgICB0aGlzLmxvZ2luRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLnBhdHRlcm4oL15cXHMqW1xcd1xcLVxcK19dKyhcXC5bXFx3XFwtXFwrX10rKSpcXEBbXFx3XFwtXFwrX10rXFwuW1xcd1xcLVxcK19dKyhcXC5bXFx3XFwtXFwrX10rKSpcXHMqJC8pXSldLFxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICB9KVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hcGlTZXJ2aWNlLmNsZWFyU2VydmVyVXJsKCk7ICAgICAgIC8vIENsZWFyIHRoZSBzZXJ2ZXIgdXJsXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFwaVNlcnZpY2Uuc2V0U2VydmVyVXJsKHRoaXMuc2VydmVyVVJMKTsgICAgICAgLy8gc2V0IHRoZSBzZXJ2ZXIgdXJsIFxuICAgIH0sIDUwKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVSTCk7XG5cblxuICAgIHRoaXMuYXBpU2VydmljZS5jbGVhcmFkZEVuZHBvaW50KCk7ICAgICAgIC8vIGNsZWFyIHRoZSBlbmRwb2ludCBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5zZXRhZGRFbmRwb2ludCh0aGlzLmVuZHBvaW50VmFsdWUpOyAgICAgICAvLyBzZXQgdGhlIGVuZHBvaW50XG4gICAgfSwgNTApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWRkRW5kcG9pbnREYXRhLmVuZHBvaW50KTtcblxuICB9XG5cbi8qKioqKioqKiogTG9naW4gRm9ybSBTdWJtaXQgc3RhcnQgaGVyZSoqKioqKioqKi8gXG4gIGxvZ2luRm9ybVN1Ym1pdCgpIHtcbiAgICBsZXQgeDogYW55O1xuLyoqKioqKioqKioqKioqKioqKiB0ZXN0KioqKioqKioqKioqKioqKioqKi8gXG4vLyBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZSkge1xuLy8gICBjb25zb2xlLmxvZyh0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZVtrZXldLnR5cGUpO1xuLy8gICBpZiAocmVzdWx0LnRva2VuID09IHRoaXMuY29va2llU2V0VmFsdWUuY29va2llW2tleV0udHlwZSkge1xuLy8gICAgIGNvbnNvbGUubG9nKCcrKysrKysrKysrKysrKysnKTtcbi8vICAgfVxuLy8gfVxuXG5cbiAgICAvLyB1c2UgZm9yIHZhbGlkYXRpb24gY2hlY2tpbmdcblxuICAgIGZvciAoeCBpbiB0aGlzLmxvZ2luRm9ybS5jb250cm9scykge1xuICAgICAgdGhpcy5sb2dpbkZvcm0uY29udHJvbHNbeF0ubWFya0FzVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvZ2luRm9ybS52YWxpZCkge1xuICAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMubG9naW5Gb3JtLnZhbHVlO1xuICAgICAgdGhpcy5hcGlTZXJ2aWNlLmFkZExvZ2luKGRhdGEpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2U7XG4gICAgICAvLyAgIGxldCBjb29raWVrZXlhcnI6YW55ID0gW107XG4gICAgICAvLyAgIGxldCBjb29raWV2YWx1ZWFycjphbnkgPSBbXTtcbiAgICAgIC8vICAgZm9yKGxldCBqIGluIHJlc3VsdC5pdGVtKXtcbiAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhPYmplY3QudmFsdWVzKHJlc3VsdC5pdGVtW2pdKSk7XG4gICAgICAvLyAgICAgLy8gY29va2lla2V5YXJyID0gT2JqZWN0LmtleXMocmVzdWx0Lml0ZW1bal0pO1xuICAgICAgLy8gICAgIC8vIGNvb2tpZXZhbHVlYXJyID0gT2JqZWN0LnZhbHVlcyhyZXN1bHQuaXRlbVtqXSk7XG4gICAgICAvLyAgICAgY29va2lldmFsdWVhcnIucHVzaChPYmplY3Qua2V5cyhyZXN1bHQuaXRlbVtqXSksIE9iamVjdC52YWx1ZXMocmVzdWx0Lml0ZW1bal0pKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICAvLyBjb25zb2xlLmxvZygnY29va2lla2V5YXJyJytjb29raWVrZXlhcnIpO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhjb29raWV2YWx1ZWFycik7XG4gICAgICAvLyAvLyAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIC8vICAgLy8gZm9yIChsZXQga2V5IGluIGNvb2tpZWtleWFycil7XG4gICAgICAvLyAgICAgZm9yKGxldCB2YWx1ZSBpbiBjb29raWV2YWx1ZWFyclswXSl7XG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnaGknK3ZhbHVlKTtcbiAgICAgIC8vICAgICAgIC8vIHRoaXMuY29va2llU2VydmljZS5zZXQoY29va2lla2V5YXJyW2tleV0sY29va2lldmFsdWVhcnJbdmFsdWVdKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIC8vIH1cbiAgICAgIC8vIC8vIH0sMjAwMCk7XG4gICAgICAvLyAgIC8vIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIC8vICAgLy8gICBjb25zb2xlLmxvZyh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0QWxsKCkpO1xuICAgICAgLy8gICAvLyB9LDQwMDApO1xuICAgICAgICBcblxuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgIC8vIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29va2llU2V0VmFsdWUuY29va2llKSB7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZyh0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZVtrZXldLnR5cGUpO1xuICAgICAgICAgIC8vICAgaWYgKHJlc3VsdCA9PSB0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZVtrZXldLnR5cGUpIHtcbiAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJysrKysrKysrKysrKysrKycpO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCd1c2VyX2RldGFpbHMnLCBKU09OLnN0cmluZ2lmeShyZXN1bHQuaXRlbVswXSkpO1xuICAgICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2p3dFRva2VuJywgcmVzdWx0LnRva2VuKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb29raWVTZXJ2aWNlLmdldEFsbCgpKTtcbiAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgIFxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucm91dGVyU3RhdHVzVmFsdWUuZGF0YSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZS5kYXRhW2tleV0udHlwZSk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gdGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZS5kYXRhW2tleV0udHlwZSkge1xuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJyArIHRoaXMucm91dGVyU3RhdHVzVmFsdWUuZGF0YVtrZXldLnJvdXRlck5hdikgICAgIC8vIG5hdmlnYXRlIHRvIGRhc2hib2FyZCB1cmwgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICAvLyB0aGlzIGlzIHVzZSBmb3IgcmVzZXQgdGhlIGZyb21cbiAgICAgICAgICB0aGlzLmZvcm1EaXJlY3RpdmUucmVzZXRGb3JtKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZGlzcGxheSBlcnJvciBtZXNzYWdlIG9uIGh0bWxcbiAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSByZXN1bHQubXNnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG5cbiAgaW5wdXRVbnRvdWNoZWQodmFsOiBhbnkpIHtcbiAgICB0aGlzLmxvZ2luRm9ybS5jb250cm9sc1t2YWxdLm1hcmtBc1VudG91Y2hlZCgpO1xuICB9XG5cbiAgLy8gVGhpcyBpcyB1c2UgZm9yIG5hdmlnYXRlIHRoaXMgY29tcG9uZW50IHRvIGZvcmdldCBjb21wb25lbnQgXG4gIGZvcmdldHBhc3N3b3JkKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nICsgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgdXNlIGZvciBuYXZpZ2F0ZSB0aGlzIGNvbXBvbmVudCB0byBzaWduLVVwIGNvbXBvbmVudCBcbiAgc2lnbnVwKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nICsgdGhpcy5zaWduVXBSb3V0ZWluZ1VybFZhbHVlKTtcbiAgfVxuXG59XG4iXX0=