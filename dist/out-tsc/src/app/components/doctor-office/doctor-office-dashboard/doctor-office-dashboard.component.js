import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
let DoctorOfficeDashboardComponent = class DoctorOfficeDashboardComponent {
    constructor(router, cookieService, http, activatedRoute, commonFunction) {
        this.router = router;
        this.cookieService = cookieService;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.commonFunction = commonFunction;
        /**************declaration**************/
        this.doctorData = [];
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe(resolveData => {
            this.doctorData = resolveData.data.res;
            console.log("8888888888888", this.doctorData);
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], DoctorOfficeDashboardComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], DoctorOfficeDashboardComponent.prototype, "sort", void 0);
DoctorOfficeDashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-doctor-office-dashboard',
        templateUrl: './doctor-office-dashboard.component.html',
        styleUrls: ['./doctor-office-dashboard.component.css']
    })
], DoctorOfficeDashboardComponent);
export { DoctorOfficeDashboardComponent };
//# sourceMappingURL=doctor-office-dashboard.component.js.map