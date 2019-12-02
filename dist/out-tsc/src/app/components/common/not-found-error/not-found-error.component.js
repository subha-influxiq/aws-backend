import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NotFoundErrorComponent = class NotFoundErrorComponent {
    constructor(cookie) {
        this.cookie = cookie;
        this.userToken = cookie.get('jwtToken');
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        console.log("token data", this.cookiesData.type);
    }
    ngOnInit() {
    }
};
NotFoundErrorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-not-found-error',
        templateUrl: './not-found-error.component.html',
        styleUrls: ['./not-found-error.component.css']
    })
], NotFoundErrorComponent);
export { NotFoundErrorComponent };
//# sourceMappingURL=not-found-error.component.js.map