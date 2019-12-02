import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(cookies, commonFunction) {
        this.cookies = cookies;
        this.commonFunction = commonFunction;
        this.logo = './assets/images/logo.png';
        this.fromTitle = "Login Here"; // This is a From Title
        this.fullUrl = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/"; // server url
        this.endpoint = "login";
        this.buttonName = 'Login Button';
        this.signUpRouteingUrl = {
            "path": "",
            // "buttonName": "",
            "customLink": "",
        };
        this.forgetRouteingUrl = {
            "path": "",
            "buttonName": "Forget Password",
            "customLink": "/forget-password",
        };
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        this.routerStatus = {
            "data": [
                {
                    "type": "admin",
                    "routerNav": "admin/dashboard"
                },
                {
                    "type": "doctor",
                    "routerNav": "doctor/dashboard"
                },
                {
                    "type": "tech",
                    "routerNav": "tech/dashboard"
                },
                {
                    "type": "biller",
                    "routerNav": "biller/dashboard"
                },
                {
                    "type": "doctor_office",
                    "routerNav": "doctor-office/dashboard"
                },
            ]
        };
    }
    ngOnInit() {
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map