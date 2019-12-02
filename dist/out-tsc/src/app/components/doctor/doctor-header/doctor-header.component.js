import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DoctorHeaderComponent = class DoctorHeaderComponent {
    constructor(cookies, router) {
        this.cookies = cookies;
        this.router = router;
        this.user_data = {};
        this.loader = true;
        let allData = {};
        allData = cookies.getAll();
        this.user_data = JSON.parse(allData.user_details);
        this.user_cookie = cookies.get('jwtToken');
    }
    ngOnInit() {
    }
    /**logout function start here**/
    logout() {
        this.cookies.delete('jwtToken');
        this.cookies.delete('user_details');
        this.cookies.deleteAll();
        this.router.navigateByUrl('logout');
    }
};
DoctorHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-doctor-header',
        templateUrl: './doctor-header.component.html',
        styleUrls: ['./doctor-header.component.css']
    })
], DoctorHeaderComponent);
export { DoctorHeaderComponent };
//# sourceMappingURL=doctor-header.component.js.map