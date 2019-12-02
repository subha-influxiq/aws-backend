import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ResetpasswordComponent = class ResetpasswordComponent {
    constructor(commonFunction) {
        this.commonFunction = commonFunction;
        this.fromTitleName = 'Change Your Password Here';
        this.logo = './assets/images/logo.png';
        this.serverUrl = 'https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/';
        this.addEndpoint = {
            endpoint: 'resetpassword',
            source: 'users'
        };
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
    }
    ngOnInit() {
    }
};
ResetpasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-resetpassword',
        templateUrl: './resetpassword.component.html',
        styleUrls: ['./resetpassword.component.css']
    })
], ResetpasswordComponent);
export { ResetpasswordComponent };
//# sourceMappingURL=resetpassword.component.js.map