import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LogoutComponent = class LogoutComponent {
    constructor(cookies, router, commonFunction) {
        this.cookies = cookies;
        this.router = router;
        this.commonFunction = commonFunction;
        this.status = true;
        this.user_data = {};
        this.loader = true;
        this.cookies.delete('jwtToken');
        this.cookies.delete('user_details');
        this.cookies.deleteAll();
        this.cookies.deleteAll('/');
    }
    ngOnInit() {
        this.cookies.delete('jwtToken');
        this.cookies.delete('user_details');
        this.cookies.deleteAll();
        this.cookies.deleteAll('/');
        setTimeout(() => {
            this.router.navigateByUrl('login');
            window.location.href = '/';
        }, 1500);
    }
};
LogoutComponent = tslib_1.__decorate([
    Component({
        selector: 'app-logout',
        templateUrl: './logout.component.html',
        styleUrls: ['./logout.component.css']
    })
], LogoutComponent);
export { LogoutComponent };
//# sourceMappingURL=logout.component.js.map