import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ForgetpasswordComponent = class ForgetpasswordComponent {
    // public domainUrl: any = 'http://localhost:4201/reset-password';  
    constructor(commonFunction) {
        this.commonFunction = commonFunction;
        // public formTitle : "resetttt forrmm";
        this.logo = '../../assets/favicon.ico';
        // public signUpRouteingUrl: any = 'sign-up';
        this.serverUrl = 'https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/';
        this.addEndpoint = {
            endpoint: 'forgetpassword'
        };
        this.loginRouteingUrl = {
            // "path":"login",
            "path": "",
            "buttonName": "login",
            "customLink": "/login",
            "customURl": ""
        };
        this.signUpRouteingUrl = {
            // "path":"sign-up",
            "path": "",
            // "buttonName":"sign-up",
            "customLink": "",
        };
        this.buttonName = 'Reset Password';
        this.domainUrl = 'http://testbedpece.influxiq.com/reset-password';
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
    }
    ngOnInit() {
    }
};
ForgetpasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-forgetpassword',
        templateUrl: './forgetpassword.component.html',
        styleUrls: ['./forgetpassword.component.css']
    })
], ForgetpasswordComponent);
export { ForgetpasswordComponent };
//# sourceMappingURL=forgetpassword.component.js.map