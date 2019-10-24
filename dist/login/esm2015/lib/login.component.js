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
        this.buttonNameValue = '';
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
     * @param {?} buttonNameVal
     * @return {?}
     */
    set buttonName(buttonNameVal) {
        this.buttonNameValue = (buttonNameVal) || '<no name set>';
        this.buttonNameValue = buttonNameVal;
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
        // console.log(this.cookieSetValue.cookie);
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
        console.log(this.signUpRouteingUrlValue);
    }
    /**
     * @param {?} routeingUrlval
     * @return {?}
     */
    set forgetRouteingUrl(routeingUrlval) {
        this.forgetRouteingUrlValue = (routeingUrlval) || '<no name set>';
        this.forgetRouteingUrlValue = routeingUrlval;
        console.log(this.forgetRouteingUrlValue);
    }
    /**
     * @param {?} routerStatusval
     * @return {?}
     */
    set routerStatus(routerStatusval) {
        this.routerStatusValue = (routerStatusval) || '<no name set>';
        this.routerStatusValue = routerStatusval;
        // console.log(this.routerStatusValue);
        // console.log(this.routerStatusValue.data.length);
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
                        // console.log(this.cookieService.getAll());
                    }), 1000);
                    // console.log('result')
                    // console.log(result.item[0].type)
                    for (const key in this.routerStatusValue.data) {
                        // console.log(this.routerStatusValue.data[key].type);
                        if (result.item[0].type === this.routerStatusValue.data[key].type) {
                            this.router.navigateByUrl('/' + this.routerStatusValue.data[key].routerNav); // navigate to dashboard url 
                        }
                    }
                    // this is use for reset the from
                    this.formDirective.resetForm();
                    this.message = '';
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
        this.router.navigateByUrl('/' + this.forgetRouteingUrlValue.path);
    }
    // This is use for navigate this component to sign-Up component 
    /**
     * @return {?}
     */
    signup() {
        this.router.navigateByUrl('/' + this.signUpRouteingUrlValue.path);
    }
    /**
     * @param {?} link
     * @return {?}
     */
    customFunction(link) {
        this.router.navigateByUrl('/' + link);
    }
}
LoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-login',
                template: "<div class=\"main-div\">\n\n    <mat-card class=\"from\">\n        <span class=\"logowrapper\" *ngIf=\"logoValue != ''\">\n            <img [src]=\"logoValue\">\n        </span>\n\n        <h2 *ngIf=\"fromTitleValue != ''\"> {{fromTitleValue}}</h2>\n\n        <form class=\"example-container\" [formGroup]=\"loginForm\" (ngSubmit)=\"loginFormSubmit()\" novalidate>\n            <mat-error class=\"error\" *ngIf=\"message !=''\">{{message}}</mat-error>\n\n            <mat-form-field>\n                <input matInput type=\"text\" placeholder=\"Email\" formControlName=\"email\"\n                    (blur)=\"inputUntouched('email')\">\n                <mat-error\n                    *ngIf=\"!loginForm.controls['email'].valid && loginForm.controls['email'].errors.required && loginForm.controls['email'].touched\">\n                    Email can not be blank</mat-error>\n            </mat-form-field>\n            \n            <mat-error *ngIf=\"!loginForm.controls['email'].valid && !loginForm.controls['email'].errors.required\">\n                Please enter a valid email</mat-error>\n\n            <mat-form-field>\n                <input matInput placeholder=\"Password\" type=\"password\" formControlName=\"password\"\n                    (blur)=\"inputUntouched('password')\">\n                <mat-error\n                    *ngIf=\"!loginForm.controls['password'].valid && loginForm.controls['password'].errors.required && loginForm.controls['password'].touched\">\n                    Password can not be blank</mat-error>\n            </mat-form-field>\n\n\n\n            <button mat-raised-button *ngIf=\"buttonNameValue != ''\" color=\"primary\">{{buttonNameValue}}</button>\n            <button mat-raised-button *ngIf=\"buttonNameValue == ''\" color=\"primary\">Login</button>\n\n\n\n            <span class=\"signupfooter\">\n                <a *ngIf=\"signUpRouteingUrlValue.buttonName !='' && signUpRouteingUrlValue.customLink =='' && signUpRouteingUrlValue.customURl =='' \"\n                    (click)=\"signup()\">{{signUpRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"signUpRouteingUrlValue.buttonName !='' && signUpRouteingUrlValue.customLink !='' && signUpRouteingUrlValue.path =='' \"\n                    (click)=\"customFunction(signUpRouteingUrlValue.customLink)\">{{signUpRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"signUpRouteingUrlValue.customURl !='' && signUpRouteingUrlValue.buttonName !='' && signUpRouteingUrlValue.customLink ==''  && signUpRouteingUrlValue.path ==''\"\n                    [attr.href]=\"signUpRouteingUrlValue.customURl\">{{signUpRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"signUpRouteingUrlValue.buttonName =='' && signUpRouteingUrlValue.customLink ==''\"\n                    (click)=\"signup()\">Sign Up</a>\n\n                <a *ngIf=\"forgetRouteingUrlValue.buttonName !='' && forgetRouteingUrlValue.customLink =='' && forgetRouteingUrlValue.customURl ==''\"\n                    (click)=\"forgetpassword()\">{{forgetRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"forgetRouteingUrlValue.buttonName !='' && forgetRouteingUrlValue.customLink !='' && forgetRouteingUrlValue.path =='' \"\n                    (click)=\"customFunction(forgetRouteingUrlValue.customLink)\">{{forgetRouteingUrlValue.buttonName}}</a>\n\n                <a *ngIf=\"forgetRouteingUrlValue.customURl !='' && forgetRouteingUrlValue.customLink =='' && forgetRouteingUrlValue.path ==''\"\n                    [href]=\"forgetRouteingUrlValue.customURl\">{{forgetRouteingUrlValue.buttonName}}</a>\n\n\n                <a *ngIf=\"forgetRouteingUrlValue.buttonName =='' && forgetRouteingUrlValue.customLink ==''\"\n                    (click)=\"forgetpassword()\">Forget Password</a>\n\n            </span>\n        </form>\n\n    </mat-card>\n\n</div>",
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
    buttonName: [{ type: Input }],
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
    LoginComponent.prototype.buttonNameValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvbG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFhLFdBQVcsRUFBYSxVQUFVLEVBQXNCLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQVVuRCxNQUFNLE9BQU8sY0FBYzs7Ozs7Ozs7SUF1RnpCLFlBQW1CLEVBQWUsRUFBUyxJQUFnQixFQUFTLE1BQWMsRUFBUyxVQUFzQixFQUFTLGFBQTRCO1FBQW5JLE9BQUUsR0FBRixFQUFFLENBQWE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXRGL0ksWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUlsQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLDJCQUFzQixHQUFRLEVBQUUsQ0FBQztRQUNqQywyQkFBc0IsR0FBUSxFQUFFLENBQUM7UUFDakMsc0JBQWlCLEdBQVEsRUFBRSxDQUFDO1FBRTVCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFDekIsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUF3RTFCLGlCQUFZ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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgTWluTGVuZ3RoVmFsaWRhdG9yLCBGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuXG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbG9naW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgbWVzc2FnZTogYW55ID0gJyc7XG4gIC8vICAgRm9ybUdyb3VwRGlyZWN0aXZlOiBJdCBpcyBhIGRpcmVjdGl2ZSB0aGF0IGJpbmRzIGFuIGV4aXN0aW5nIEZvcm1Hcm91cCB0byBhIERPTSBlbGVtZW50LlxuICBAVmlld0NoaWxkKEZvcm1Hcm91cERpcmVjdGl2ZSkgZm9ybURpcmVjdGl2ZTogRm9ybUdyb3VwRGlyZWN0aXZlO1xuXG4gIHB1YmxpYyBmcm9tVGl0bGVWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBzZXJ2ZXJVUkw6IGFueSA9ICcnO1xuICBwdWJsaWMgc2lnblVwUm91dGVpbmdVcmxWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBmb3JnZXRSb3V0ZWluZ1VybFZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIHJvdXRlclN0YXR1c1ZhbHVlOiBhbnkgPSAnJztcbiAgcHVibGljIGVuZHBvaW50VmFsdWU6IGFueTtcbiAgcHVibGljIGxvZ29WYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBjb29raWVTZXRWYWx1ZTogYW55ID0gJyc7XG4gIHB1YmxpYyBidXR0b25OYW1lVmFsdWU6IGFueSA9ICcnO1xuXG4gIEBJbnB1dCgpICAgICAgICAgLy8gU2V0IHRoZSBwcm9qZWN0IG5hbWVcbiAgc2V0IGZyb21UaXRsZShmcm9tVGl0bGVWYWw6IGFueSkge1xuICAgIHRoaXMuZnJvbVRpdGxlVmFsdWUgPSAoZnJvbVRpdGxlVmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5mcm9tVGl0bGVWYWx1ZSA9IGZyb21UaXRsZVZhbDtcblxuICB9XG4gIEBJbnB1dCgpICAgICAgLy8gc2V0IHRoZSBmcm9tIGxvZ29cblxuc2V0IGxvZ28obG9nb1ZhbCA6IGFueSkge1xuICB0aGlzLmxvZ29WYWx1ZSA9IGxvZ29WYWw7XG59XG5ASW5wdXQoKVxuc2V0IGJ1dHRvbk5hbWUgKGJ1dHRvbk5hbWVWYWwgOmFueSl7XG4gIHRoaXMuYnV0dG9uTmFtZVZhbHVlID0gKGJ1dHRvbk5hbWVWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgdGhpcy5idXR0b25OYW1lVmFsdWUgPSBidXR0b25OYW1lVmFsXG59XG5cbiAgQElucHV0KCkgICAgICAgIC8vIHNldHRpbmcgdGhlIHNlcnZlciB1cmwgZnJvbSBwcm9qZWN0XG4gIHNldCBmdWxsVXJsKGZ1bGxVcmxWYWw6IGFueSkge1xuICAgIHRoaXMuc2VydmVyVVJMID0gKGZ1bGxVcmxWYWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLnNlcnZlclVSTCA9IGZ1bGxVcmxWYWw7XG5cbiAgfVxuICBASW5wdXQoKVxuXG4gIHNldCBlbmRwb2ludChlbmRwb2ludFZhbDogYW55KSB7XG4gICAgdGhpcy5lbmRwb2ludFZhbHVlID0gZW5kcG9pbnRWYWw7XG4gIH1cblxuQElucHV0KClcblxucHVibGljIHNldCBjb29raWVTZXQodiA6IGFueSkge1xuICB0aGlzLmNvb2tpZVNldFZhbHVlID0gdjtcbiAgLy8gY29uc29sZS5sb2codGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWUpO1xuICAvLyBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZSkge1xuICAgICAgICAgICAgXG4gIC8vICAgY29uc29sZS5sb2codGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWVba2V5XSk7XG4gIC8vIH1cblxufVxuXG5cblxuICBASW5wdXQoKSAgICAgICAgICAvLyBzZXR0aW5nIHRoZSBuYXZpZ2F0ZSBCeSBTaWduIFVwIFVybCBmcm9tIHByb2plY3RcbiAgc2V0IHNpZ25VcFJvdXRlaW5nVXJsKHJvdXRlaW5nVXJsdmFsOiBhbnkpIHtcbiAgICB0aGlzLnNpZ25VcFJvdXRlaW5nVXJsVmFsdWUgPSAocm91dGVpbmdVcmx2YWwpIHx8ICc8bm8gbmFtZSBzZXQ+JztcbiAgICB0aGlzLnNpZ25VcFJvdXRlaW5nVXJsVmFsdWUgPSByb3V0ZWluZ1VybHZhbDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNpZ25VcFJvdXRlaW5nVXJsVmFsdWUpXG4gIH1cblxuXG4gIEBJbnB1dCgpICAgICAgICAgIC8vIHNldHRpbmcgdGhlIG5hdmlnYXRlIEJ5IEZvcmdldCBQYXNzd29yZCBVcmwgZnJvbSBwcm9qZWN0XG4gIHNldCBmb3JnZXRSb3V0ZWluZ1VybChyb3V0ZWluZ1VybHZhbDogYW55KSB7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gKHJvdXRlaW5nVXJsdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlID0gcm91dGVpbmdVcmx2YWw7XG4gICAgY29uc29sZS5sb2codGhpcy5mb3JnZXRSb3V0ZWluZ1VybFZhbHVlKVxuICB9XG5cbiAgQElucHV0KCkgICAgICAgICAgLy8gc2V0dGluZyB0aGUgbmF2aWdhdGUgQnkgRm9yZ2V0IFBhc3N3b3JkIFVybCBmcm9tIHByb2plY3RcbiAgc2V0IHJvdXRlclN0YXR1cyhyb3V0ZXJTdGF0dXN2YWw6IGFueSkge1xuICAgIHRoaXMucm91dGVyU3RhdHVzVmFsdWUgPSAocm91dGVyU3RhdHVzdmFsKSB8fCAnPG5vIG5hbWUgc2V0Pic7XG4gICAgdGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZSA9IHJvdXRlclN0YXR1c3ZhbDtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvdXRlclN0YXR1c1ZhbHVlKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvdXRlclN0YXR1c1ZhbHVlLmRhdGEubGVuZ3RoKTtcbiAgfVxuXG5cblxuXG4gIHB1YmxpYyBsb2dpbkZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIHByb2plY3RfbmFtZTogYW55ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGZiOiBGb3JtQnVpbGRlciwgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsIHB1YmxpYyByb3V0ZXI6IFJvdXRlciwgcHVibGljIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsIHB1YmxpYyBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG4gICAgdGhpcy5sb2dpbkZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eXFxzKltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxAW1xcd1xcLVxcK19dK1xcLltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxzKiQvKV0pXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBpU2VydmljZS5jbGVhclNlcnZlclVybCgpOyAgICAgICAvLyBDbGVhciB0aGUgc2VydmVyIHVybFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hcGlTZXJ2aWNlLnNldFNlcnZlclVybCh0aGlzLnNlcnZlclVSTCk7ICAgICAgIC8vIHNldCB0aGUgc2VydmVyIHVybCBcbiAgICB9LCA1MCk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zZXJ2ZXJVUkwpO1xuXG5cbiAgICB0aGlzLmFwaVNlcnZpY2UuY2xlYXJhZGRFbmRwb2ludCgpOyAgICAgICAvLyBjbGVhciB0aGUgZW5kcG9pbnQgXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFwaVNlcnZpY2Uuc2V0YWRkRW5kcG9pbnQodGhpcy5lbmRwb2ludFZhbHVlKTsgICAgICAgLy8gc2V0IHRoZSBlbmRwb2ludFxuICAgIH0sIDUwKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFkZEVuZHBvaW50RGF0YS5lbmRwb2ludCk7XG5cbiAgfVxuXG4vKioqKioqKioqIExvZ2luIEZvcm0gU3VibWl0IHN0YXJ0IGhlcmUqKioqKioqKiovIFxuICBsb2dpbkZvcm1TdWJtaXQoKSB7XG4gICAgbGV0IHg6IGFueTtcbi8qKioqKioqKioqKioqKioqKiogdGVzdCoqKioqKioqKioqKioqKioqKiovIFxuLy8gZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWUpIHtcbi8vICAgY29uc29sZS5sb2codGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWVba2V5XS50eXBlKTtcbi8vICAgaWYgKHJlc3VsdC50b2tlbiA9PSB0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZVtrZXldLnR5cGUpIHtcbi8vICAgICBjb25zb2xlLmxvZygnKysrKysrKysrKysrKysrJyk7XG4vLyAgIH1cbi8vIH1cblxuXG4gICAgLy8gdXNlIGZvciB2YWxpZGF0aW9uIGNoZWNraW5nXG5cbiAgICBmb3IgKHggaW4gdGhpcy5sb2dpbkZvcm0uY29udHJvbHMpIHtcbiAgICAgIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzW3hdLm1hcmtBc1RvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2dpbkZvcm0udmFsaWQpIHtcbiAgICAgIGxldCBkYXRhOiBhbnkgPSB0aGlzLmxvZ2luRm9ybS52YWx1ZTtcbiAgICAgIHRoaXMuYXBpU2VydmljZS5hZGRMb2dpbihkYXRhKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlO1xuICAgICAgLy8gICBsZXQgY29va2lla2V5YXJyOmFueSA9IFtdO1xuICAgICAgLy8gICBsZXQgY29va2lldmFsdWVhcnI6YW55ID0gW107XG4gICAgICAvLyAgIGZvcihsZXQgaiBpbiByZXN1bHQuaXRlbSl7XG4gICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coT2JqZWN0LnZhbHVlcyhyZXN1bHQuaXRlbVtqXSkpO1xuICAgICAgLy8gICAgIC8vIGNvb2tpZWtleWFyciA9IE9iamVjdC5rZXlzKHJlc3VsdC5pdGVtW2pdKTtcbiAgICAgIC8vICAgICAvLyBjb29raWV2YWx1ZWFyciA9IE9iamVjdC52YWx1ZXMocmVzdWx0Lml0ZW1bal0pO1xuICAgICAgLy8gICAgIGNvb2tpZXZhbHVlYXJyLnB1c2goT2JqZWN0LmtleXMocmVzdWx0Lml0ZW1bal0pLCBPYmplY3QudmFsdWVzKHJlc3VsdC5pdGVtW2pdKSk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgLy8gY29uc29sZS5sb2coJ2Nvb2tpZWtleWFycicrY29va2lla2V5YXJyKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2coY29va2lldmFsdWVhcnIpO1xuICAgICAgLy8gLy8gICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAvLyAgIC8vIGZvciAobGV0IGtleSBpbiBjb29raWVrZXlhcnIpe1xuICAgICAgLy8gICAgIGZvcihsZXQgdmFsdWUgaW4gY29va2lldmFsdWVhcnJbMF0pe1xuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ2hpJyt2YWx1ZSk7XG4gICAgICAvLyAgICAgICAvLyB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KGNvb2tpZWtleWFycltrZXldLGNvb2tpZXZhbHVlYXJyW3ZhbHVlXSk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICAvLyB9XG4gICAgICAvLyAvLyB9LDIwMDApO1xuICAgICAgLy8gICAvLyBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAvLyAgIC8vICAgY29uc29sZS5sb2codGhpcy5jb29raWVTZXJ2aWNlLmdldEFsbCgpKTtcbiAgICAgIC8vICAgLy8gfSw0MDAwKTtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgICAvLyBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvb2tpZVNldFZhbHVlLmNvb2tpZSkge1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2codGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWVba2V5XS50eXBlKTtcbiAgICAgICAgICAvLyAgIGlmIChyZXN1bHQgPT0gdGhpcy5jb29raWVTZXRWYWx1ZS5jb29raWVba2V5XS50eXBlKSB7XG4gICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCcrKysrKysrKysrKysrKysnKTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgndXNlcl9kZXRhaWxzJywgSlNPTi5zdHJpbmdpZnkocmVzdWx0Lml0ZW1bMF0pKTtcbiAgICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdqd3RUb2tlbicsIHJlc3VsdC50b2tlbik7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29va2llU2VydmljZS5nZXRBbGwoKSk7XG4gICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzdWx0JylcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQuaXRlbVswXS50eXBlKVxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucm91dGVyU3RhdHVzVmFsdWUuZGF0YSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZS5kYXRhW2tleV0udHlwZSk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuaXRlbVswXS50eXBlID09PSB0aGlzLnJvdXRlclN0YXR1c1ZhbHVlLmRhdGFba2V5XS50eXBlKSB7XG4gICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nICsgdGhpcy5yb3V0ZXJTdGF0dXNWYWx1ZS5kYXRhW2tleV0ucm91dGVyTmF2KSAgICAgLy8gbmF2aWdhdGUgdG8gZGFzaGJvYXJkIHVybCBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIC8vIHRoaXMgaXMgdXNlIGZvciByZXNldCB0aGUgZnJvbVxuICAgICAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5yZXNldEZvcm0oKTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkaXNwbGF5IGVycm9yIG1lc3NhZ2Ugb24gaHRtbFxuICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3VsdC5tc2c7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cblxuICBpbnB1dFVudG91Y2hlZCh2YWw6IGFueSkge1xuICAgIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzW3ZhbF0ubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cblxuICAvLyBUaGlzIGlzIHVzZSBmb3IgbmF2aWdhdGUgdGhpcyBjb21wb25lbnQgdG8gZm9yZ2V0IGNvbXBvbmVudCBcbiAgZm9yZ2V0cGFzc3dvcmQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgnLycgKyB0aGlzLmZvcmdldFJvdXRlaW5nVXJsVmFsdWUucGF0aCk7XG4gIH1cblxuICAvLyBUaGlzIGlzIHVzZSBmb3IgbmF2aWdhdGUgdGhpcyBjb21wb25lbnQgdG8gc2lnbi1VcCBjb21wb25lbnQgXG4gIHNpZ251cCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvJyArIHRoaXMuc2lnblVwUm91dGVpbmdVcmxWYWx1ZS5wYXRoKTtcbiAgfVxuXG4gIGN1c3RvbUZ1bmN0aW9uKGxpbms6IGFueSkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nKyBsaW5rKTtcbiAgfVxuXG59XG4iXX0=