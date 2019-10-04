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
export class LoginComponent {
    /**
     * @param {?} fb
     * @param {?} http
     * @param {?} router
     * @param {?} apiService
     * @param {?} cookieService
     */
    constructor(fb, http, router, apiService, cookieService) {
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
    /**
     * @param {?} fromTitleVal
     * @return {?}
     */
    set fromTitle(fromTitleVal) {
        this.fromTitleValue = (fromTitleVal) || '<no name set>';
        this.fromTitleValue = fromTitleVal;
    }
    /**
     * @param {?} logoVal
     * @return {?}
     */
    set logo(logoVal) {
        this.logoValue = logoVal;
    }
    /**
     * @param {?} fullUrlVal
     * @return {?}
     */
    set fullUrl(fullUrlVal) {
        this.serverURL = (fullUrlVal) || '<no name set>';
        this.serverURL = fullUrlVal;
    }
    /**
     * @param {?} endpointVal
     * @return {?}
     */
    set endpoint(endpointVal) {
        this.endpointValue = endpointVal;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set cookieSet(v) {
        this.cookieSetValue = v;
        console.log(this.cookieSetValue.cookie);
        // for (const key in this.cookieSetValue.cookie) {
        //   console.log(this.cookieSetValue.cookie[key]);
        // }
    }
    /**
     * @param {?} routeingUrlval
     * @return {?}
     */
    set signUpRouteingUrl(routeingUrlval) {
        this.signUpRouteingUrlValue = (routeingUrlval) || '<no name set>';
        this.signUpRouteingUrlValue = routeingUrlval;
    }
    /**
     * @param {?} routeingUrlval
     * @return {?}
     */
    set forgetRouteingUrl(routeingUrlval) {
        this.forgetRouteingUrlValue = (routeingUrlval) || '<no name set>';
        this.forgetRouteingUrlValue = routeingUrlval;
    }
    /**
     * @param {?} routerStatusval
     * @return {?}
     */
    set routerStatus(routerStatusval) {
        this.routerStatusValue = (routerStatusval) || '<no name set>';
        this.routerStatusValue = routerStatusval;
        console.log(this.routerStatusValue);
        console.log(this.routerStatusValue.data.length);
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
            this.apiService.setServerUrl(this.serverURL); // set the server url 
        }), 50);
        // console.log(this.serverURL);
        this.apiService.clearaddEndpoint(); // clear the endpoint 
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.apiService.setaddEndpoint(this.endpointValue); // set the endpoint
        }), 50);
        // console.log(this.addEndpointData.endpoint);
    }
    /**
     * ****** Login Form Submit start here********
     * @return {?}
     */
    loginFormSubmit() {
        /** @type {?} */
        let x;
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
            let data = this.loginForm.value;
            this.apiService.addLogin(data).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                // console.log(response);
                /** @type {?} */
                let result = {};
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
                    this.cookieService.set('user_details', JSON.stringify(result.item[0]));
                    this.cookieService.set('jwtToken', result.token);
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        console.log(this.cookieService.getAll());
                    }), 1000);
                    for (const key in this.routerStatusValue.data) {
                        // console.log(this.routerStatusValue.data[key].type);
                        if (result.type === this.routerStatusValue.data[key].type) {
                            this.router.navigateByUrl('/' + this.routerStatusValue.data[key].routerNav); // navigate to dashboard url 
                        }
                    }
                    // this is use for reset the from
                    this.formDirective.resetForm();
                }
                else {
                    // display error message on html
                    this.message = result.msg;
                }
            }));
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    inputUntouched(val) {
        this.loginForm.controls[val].markAsUntouched();
    }
    // This is use for navigate this component to forget component 
    /**
     * @return {?}
     */
    forgetpassword() {
        this.router.navigateByUrl('/' + this.forgetRouteingUrlValue);
    }
    // This is use for navigate this component to sign-Up component 
    /**
     * @return {?}
     */
    signup() {
        this.router.navigateByUrl('/' + this.signUpRouteingUrlValue);
    }
}
LoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-login',
                template: "<div class=\"main-div\">\n\n    <mat-card class=\"from\">\n            <span class=\"logowrapper\" *ngIf=\"logoValue != ''\" >\n                    <img  [src]=\"logoValue\">\n                </span>\n\n        <h2 *ngIf=\"fromTitleValue != ''\"> {{fromTitleValue}}</h2>\n\n        <form class=\"example-container\" [formGroup]=\"loginForm\" (ngSubmit)=\"loginFormSubmit()\" novalidate>\n<mat-error class=\"error\" *ngIf=\"message !=''\">{{message}}</mat-error>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Username\" formControlName=\"email\" (blur)=\"inputUntouched('email')\">\n                <mat-error\n                    *ngIf=\"!loginForm.controls['email'].valid && loginForm.controls['email'].errors.required && loginForm.controls['email'].touched\">\n                    Username field can not be blank</mat-error>\n            </mat-form-field>\n\n\n            <mat-form-field>\n                <input matInput placeholder=\"Password\" type=\"password\" formControlName=\"password\" (blur)=\"inputUntouched('password')\">\n                <mat-error\n                    *ngIf=\"!loginForm.controls['password'].valid && loginForm.controls['password'].errors.required && loginForm.controls['password'].touched\">\n                    Password field can not be blank</mat-error>\n            </mat-form-field>\n\n\n            <button mat-raised-button color=\"primary\">Login</button>\n            <span class=\"signupfooter\">\n                <a (click)=\"forgetpassword()\">Forgot password</a>\n                <a (click)=\"signup()\">Sign Up</a>\n            </span>\n        </form>\n\n    </mat-card>\n\n</div>",
                styles: [".example-container{display:flex;flex-direction:column}.example-container>*{width:100%}.from{width:30%;margin:0 auto}.from h2{text-align:center;background-color:#00f;color:#fff;padding:15px}.from a{padding-right:30px}.main-div{height:100vh;display:flex;justify-content:center;align-items:center}.signupfooter{margin-top:12px;display:flex;justify-content:space-between;align-items:center}.signupfooter a{cursor:pointer}.error{text-align:center}.logowrapper{margin:0 auto;display:block;text-align:center}"]
            }] }
];
/** @nocollapse */
LoginComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: HttpClient },
    { type: Router },
    { type: ApiService },
    { type: CookieService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvbG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFhLFdBQVcsRUFBYSxVQUFVLEVBQXNCLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU9uRCxNQUFNLE9BQU8sY0FBYzs7Ozs7Ozs7SUErRXpCLFlBQW1CLEVBQWUsRUFBUyxJQUFnQixFQUFTLE1BQWMsRUFBUyxVQUFzQixFQUFTLGFBQTRCO1FBQW5JLE9BQUUsR0FBRixFQUFFLENBQWE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQTlFL0ksWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUlsQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLDJCQUFzQixHQUFRLEVBQUUsQ0FBQztRQUNqQywyQkFBc0IsR0FBUSxFQUFFLENBQUM7UUFDakMsc0JBQWlCLEdBQVEsRUFBRSxDQUFDO1FBRTVCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFpRXpCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBRzVCLElBQUks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LENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7OztJQUdELE1BQU07UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0QsQ0FBQzs7O1lBMU1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsd3BEQUFxQzs7YUFFdEM7Ozs7WUFWbUIsV0FBVztZQUN0QixVQUFVO1lBQ1YsTUFBTTtZQUNOLFVBQVU7WUFDVixhQUFhOzs7NEJBVW5CLFNBQVMsU0FBQyxrQkFBa0I7d0JBVzVCLEtBQUs7bUJBTUwsS0FBSztzQkFNTCxLQUFLO3VCQU1MLEtBQUs7d0JBTVAsS0FBSztnQ0FjSCxLQUFLO2dDQU9MLEtBQUs7MkJBTUwsS0FBSzs7OztJQWhFTixpQ0FBeUI7O0lBRXpCLHVDQUFpRTs7SUFFakUsd0NBQWdDOztJQUNoQyxtQ0FBMkI7O0lBQzNCLGdEQUF3Qzs7SUFDeEMsZ0RBQXdDOztJQUN4QywyQ0FBbUM7O0lBQ25DLHVDQUEwQjs7SUFDMUIsbUNBQTJCOztJQUMzQix3Q0FBZ0M7O0lBZ0VoQyxtQ0FBNEI7O0lBQzVCLHNDQUE4Qjs7SUFFbEIsNEJBQXNCOztJQUFFLDhCQUF1Qjs7SUFBRSxnQ0FBcUI7O0lBQUUsb0NBQTZCOztJQUFFLHVDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIE1pbkxlbmd0aFZhbGlkYXRvciwgRm9ybUdyb3VwRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWxvZ2luJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIG1lc3NhZ2U6IGFueSA9ICcnO1xuICAvLyAgIEZvcm1Hcm91cERpcmVjdGl2ZTogSXQgaXMgYSBkaXJlY3RpdmUgdGhhdCBiaW5kcyBhbiBleGlzdGluZyBGb3JtR3JvdXAgdG8gYSBET00gZWxlbWVudC5cbiAgQFZpZXdDaGlsZChGb3JtR3JvdXBEaXJlY3RpdmUpIGZvcm1EaXJlY3RpdmU6IEZvcm1Hcm91cERpcmVjdGl2ZTtcblxuICBwdWJsaWMgZnJvbVRpdGxlVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgc2VydmVyVVJMOiBhbnkgPSAnJztcbiAgcHVibGljIHNpZ25VcFJvdXRlaW5nVXJsVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgZm9yZ2V0Um91dGVpbmdVcmxWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyByb3V0ZXJTdGF0dXNWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBlbmRwb2ludFZhbHVlOiBhbnk7XG4gIHB1YmxpYyBsb2dvVmFsdWU6IGFueSA9ICcnO1xuICBwdWJsaWMgY29va2llU2V0VmFsdWU6IGFueSA9ICcnO1xuXG4gIEBJbnB1dCgpICAgICAgICAgLy8gU2V0IHRoZSBwcm9qZWN0IG5hbWVcbiAgc2V0IGZyb21UaXRsZShmcm9tVGl0bGVWYWw6IGFueSkge1xuICAgIHRoaXMuZnJvbVRpdGxlVmFsdWUgPSAoZnJvbVRpdGxlVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5mcm9tVGl0bGVWYWx1ZSA9IGZyb21UaXRsZVZhbDtcblxuICB9XG4gIEBJbnB1dCgpICAgICAgLy8gc2V0IHRoZSBmcm9tIGxvZ29cblxuc2V0IGxvZ28obG9nb1ZhbCA6IGFueSkge1xuICB0aGlzLmxvZ29WYWx1ZSA9IGxvZ29WYWw7XG59XG5cbiAgQElucHV0KCkgICAgICAgIC8vIHNldHRpbmcgdGhlIHNlcnZlciB1cmwgZnJvbSBwcm9qZWN0XG4gIHNldCBmdWxsVXJsKGZ1bGxVcmxWYWw6IGFueSkge1xuICAgIHRoaXMuc2VydmVyVVJMID0gKGZ1bGxVcmxWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLnNlcnZlclVSTCA9IGZ1bGxVcmxWYWw7XG5cbiAgfVxuICBASW5wdXQoKVxuXG4gIHNldCBlbmRwb2ludChlbmRwb2ludFZhbDogYW55KSB7XG4gICAgdGhpcy5lbmRwb2ludFZhbHVlID0gZW5kcG9pbnRWYWw7XG4gIH1cblxuQElucHV0KClcblxucHVibGljIHNldCBjb29raWVTZXQodiA6IGFueSkge1xuICB0aGlzLmNvb2tpZVNldFZhbHVlID0gdjtcbiAgY29uc29sZS5sb2codGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWUpO1xuICAvLyBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZSkge1xuICAgICAgICAgICAgXG4gIC8vICAgY29uc29sZS5sb2codGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWVba2V5XSk7XG4gIC8vIH1cblxufVxuXG5cblxuICBASW5wdXQoKSAgICAgICAgICAvLyBzZXR0aW5nIHRoZSBuYXZpZ2F0ZSBCeSBTaWduIFVwIFVybCBmcm9tIHByb2plY3RcbiAgc2V0IHNpZ25VcFJvdXRlaW5nVXJsKHJvdXRlaW5nVXJsdmFsOiBhbnkpIHtcbiAgICB0aGlzLnNpZ25VcFJvdXRlaW5nVXJsVmFsdWUgPSAocm91dGVpbmdVcmx2YWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLnNpZ25VcFJvdXRlaW5nVXJsVmFsdWUgPSByb3V0ZWluZ1VybHZhbDtcbiAgfVxuXG5cbiAgQElucHV0KCkgICAgICAgICAgLy8gc2V0dGluZyB0aGUgbmF2aWdhdGUgQnkgRm9yZ2V0IFBhc3N3b3JkIFVybCBmcm9tIHByb2plY3RcbiAgc2V0IGZvcmdldFJvdXRlaW5nVXJsKHJvdXRlaW5nVXJsdmFsOiBhbnkpIHtcbiAgICB0aGlzLmZvcmdldFJvdXRlaW5nVXJsVmFsdWUgPSAocm91dGVpbmdVcmx2YWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLmZvcmdldFJvdXRlaW5nVXJsVmFsdWUgPSByb3V0ZWluZ1VybHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IEZvcmdldCBQYXNzd29yZCBVcmwgZnJvbSBwcm9qZWN0XG4gIHNldCByb3V0ZXJTdGF0dXMocm91dGVyU3RhdHVzdmFsOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlclN0YXR1c1ZhbHVlID0gKHJvdXRlclN0YXR1c3ZhbCkgfHwgJzxubyBuYW1lIHNldD4nO1xuICAgIHRoaXMucm91dGVyU3RhdHVzVmFsdWUgPSByb3V0ZXJTdGF0dXN2YWw7XG4gICAgY29uc29sZS5sb2codGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZSk7XG4gICAgY29uc29sZS5sb2codGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZS5kYXRhLmxlbmd0aCk7XG4gIH1cblxuXG5cblxuICBwdWJsaWMgbG9naW5Gb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyBwcm9qZWN0X25hbWU6IGFueSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmYjogRm9ybUJ1aWxkZXIsIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLCBwdWJsaWMgY29va2llU2VydmljZTogQ29va2llU2VydmljZSkge1xuICAgIHRoaXMubG9naW5Gb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybigvXlxccypbXFx3XFwtXFwrX10rKFxcLltcXHdcXC1cXCtfXSspKlxcQFtcXHdcXC1cXCtfXStcXC5bXFx3XFwtXFwrX10rKFxcLltcXHdcXC1cXCtfXSspKlxccyokLyldKV0sXG4gICAgICBwYXNzd29yZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFwaVNlcnZpY2UuY2xlYXJTZXJ2ZXJVcmwoKTsgICAgICAgLy8gQ2xlYXIgdGhlIHNlcnZlciB1cmxcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5zZXRTZXJ2ZXJVcmwodGhpcy5zZXJ2ZXJVUkwpOyAgICAgICAvLyBzZXQgdGhlIHNlcnZlciB1cmwgXG4gICAgfSwgNTApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VydmVyVVJMKTtcblxuXG4gICAgdGhpcy5hcGlTZXJ2aWNlLmNsZWFyYWRkRW5kcG9pbnQoKTsgICAgICAgLy8gY2xlYXIgdGhlIGVuZHBvaW50IFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hcGlTZXJ2aWNlLnNldGFkZEVuZHBvaW50KHRoaXMuZW5kcG9pbnRWYWx1ZSk7ICAgICAgIC8vIHNldCB0aGUgZW5kcG9pbnRcbiAgICB9LCA1MCk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5hZGRFbmRwb2ludERhdGEuZW5kcG9pbnQpO1xuXG4gIH1cblxuLyoqKioqKioqKiBMb2dpbiBGb3JtIFN1Ym1pdCBzdGFydCBoZXJlKioqKioqKioqLyBcbiAgbG9naW5Gb3JtU3VibWl0KCkge1xuICAgIGxldCB4OiBhbnk7XG4vKioqKioqKioqKioqKioqKioqIHRlc3QqKioqKioqKioqKioqKioqKioqLyBcbi8vIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29va2llU2V0VmFsdWUuY29va2llKSB7XG4vLyAgIGNvbnNvbGUubG9nKHRoaXMuY29va2llU2V0VmFsdWUuY29va2llW2tleV0udHlwZSk7XG4vLyAgIGlmIChyZXN1bHQudG9rZW4gPT0gdGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWVba2V5XS50eXBlKSB7XG4vLyAgICAgY29uc29sZS5sb2coJysrKysrKysrKysrKysrKycpO1xuLy8gICB9XG4vLyB9XG5cblxuICAgIC8vIHVzZSBmb3IgdmFsaWRhdGlvbiBjaGVja2luZ1xuXG4gICAgZm9yICh4IGluIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzKSB7XG4gICAgICB0aGlzLmxvZ2luRm9ybS5jb250cm9sc1t4XS5tYXJrQXNUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9naW5Gb3JtLnZhbGlkKSB7XG4gICAgICBsZXQgZGF0YTogYW55ID0gdGhpcy5sb2dpbkZvcm0udmFsdWU7XG4gICAgICB0aGlzLmFwaVNlcnZpY2UuYWRkTG9naW4oZGF0YSkuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgICByZXN1bHQgPSByZXNwb25zZTtcbiAgICAgIC8vICAgbGV0IGNvb2tpZWtleWFycjphbnkgPSBbXTtcbiAgICAgIC8vICAgbGV0IGNvb2tpZXZhbHVlYXJyOmFueSA9IFtdO1xuICAgICAgLy8gICBmb3IobGV0IGogaW4gcmVzdWx0Lml0ZW0pe1xuICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKE9iamVjdC52YWx1ZXMocmVzdWx0Lml0ZW1bal0pKTtcbiAgICAgIC8vICAgICAvLyBjb29raWVrZXlhcnIgPSBPYmplY3Qua2V5cyhyZXN1bHQuaXRlbVtqXSk7XG4gICAgICAvLyAgICAgLy8gY29va2lldmFsdWVhcnIgPSBPYmplY3QudmFsdWVzKHJlc3VsdC5pdGVtW2pdKTtcbiAgICAgIC8vICAgICBjb29raWV2YWx1ZWFyci5wdXNoKE9iamVjdC5rZXlzKHJlc3VsdC5pdGVtW2pdKSwgT2JqZWN0LnZhbHVlcyhyZXN1bHQuaXRlbVtqXSkpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyAgIC8vIGNvbnNvbGUubG9nKCdjb29raWVrZXlhcnInK2Nvb2tpZWtleWFycik7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGNvb2tpZXZhbHVlYXJyKTtcbiAgICAgIC8vIC8vICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgLy8gICAvLyBmb3IgKGxldCBrZXkgaW4gY29va2lla2V5YXJyKXtcbiAgICAgIC8vICAgICBmb3IobGV0IHZhbHVlIGluIGNvb2tpZXZhbHVlYXJyWzBdKXtcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdoaScrdmFsdWUpO1xuICAgICAgLy8gICAgICAgLy8gdGhpcy5jb29raWVTZXJ2aWNlLnNldChjb29raWVrZXlhcnJba2V5XSxjb29raWV2YWx1ZWFyclt2YWx1ZV0pO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgLy8gfVxuICAgICAgLy8gLy8gfSwyMDAwKTtcbiAgICAgIC8vICAgLy8gc2V0VGltZW91dCgoKT0+e1xuICAgICAgLy8gICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuY29va2llU2VydmljZS5nZXRBbGwoKSk7XG4gICAgICAvLyAgIC8vIH0sNDAwMCk7XG4gICAgICAgIFxuXG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgLy8gZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWUpIHtcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuY29va2llU2V0VmFsdWUuY29va2llW2tleV0udHlwZSk7XG4gICAgICAgICAgLy8gICBpZiAocmVzdWx0ID09IHRoaXMuY29va2llU2V0VmFsdWUuY29va2llW2tleV0udHlwZSkge1xuICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnKysrKysrKysrKysrKysrJyk7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ3VzZXJfZGV0YWlscycsIEpTT04uc3RyaW5naWZ5KHJlc3VsdC5pdGVtWzBdKSk7XG4gICAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnand0VG9rZW4nLCByZXN1bHQudG9rZW4pO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0QWxsKCkpO1xuICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZS5kYXRhKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvdXRlclN0YXR1c1ZhbHVlLmRhdGFba2V5XS50eXBlKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdC50eXBlID09PSB0aGlzLnJvdXRlclN0YXR1c1ZhbHVlLmRhdGFba2V5XS50eXBlKSB7XG4gICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nICsgdGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZS5kYXRhW2tleV0ucm91dGVyTmF2KSAgICAgLy8gbmF2aWdhdGUgdG8gZGFzaGJvYXJkIHVybCBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIC8vIHRoaXMgaXMgdXNlIGZvciByZXNldCB0aGUgZnJvbVxuICAgICAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5yZXNldEZvcm0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkaXNwbGF5IGVycm9yIG1lc3NhZ2Ugb24gaHRtbFxuICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3VsdC5tc2c7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cblxuICBpbnB1dFVudG91Y2hlZCh2YWw6IGFueSkge1xuICAgIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzW3ZhbF0ubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cblxuICAvLyBUaGlzIGlzIHVzZSBmb3IgbmF2aWdhdGUgdGhpcyBjb21wb25lbnQgdG8gZm9yZ2V0IGNvbXBvbmVudCBcbiAgZm9yZ2V0cGFzc3dvcmQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgnLycgKyB0aGlzLmZvcmdldFJvdXRlaW5nVXJsVmFsdWUpO1xuICB9XG5cbiAgLy8gVGhpcyBpcyB1c2UgZm9yIG5hdmlnYXRlIHRoaXMgY29tcG9uZW50IHRvIHNpZ24tVXAgY29tcG9uZW50IFxuICBzaWdudXAoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgnLycgKyB0aGlzLnNpZ25VcFJvdXRlaW5nVXJsVmFsdWUpO1xuICB9XG5cbn1cbiJdfQ==