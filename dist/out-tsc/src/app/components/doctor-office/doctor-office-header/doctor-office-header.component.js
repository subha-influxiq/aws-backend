import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DoctorOfficeHeaderComponent = class DoctorOfficeHeaderComponent {
    constructor(cookies, router, commonFunction) {
        this.cookies = cookies;
        this.router = router;
        this.commonFunction = commonFunction;
        this.user_data = {};
        this.loader = true;
        let allData = {};
        allData = cookies.getAll();
        this.user_data = JSON.parse(allData.user_details);
        console.log("UserData >>-->", this.user_data);
        this.user_cookie = cookies.get('jwtToken');
    }
    ngOnInit() {
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
    }
    /**logout function start here**/
    logout() {
        this.cookies.delete('jwtToken');
        this.cookies.delete('user_details');
        this.cookies.deleteAll();
        this.router.navigateByUrl('logout');
    }
    /**logout function end here**/
    /* Dashboard redirect */
    toDashboard() {
        this.router.navigateByUrl('/doctor-office/dashboard');
    }
};
DoctorOfficeHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-doctor-office-header',
        templateUrl: './doctor-office-header.component.html',
        styleUrls: ['./doctor-office-header.component.css']
    })
], DoctorOfficeHeaderComponent);
export { DoctorOfficeHeaderComponent };
//# sourceMappingURL=doctor-office-header.component.js.map