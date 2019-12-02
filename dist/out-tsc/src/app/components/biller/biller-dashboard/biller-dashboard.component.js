import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
let BillerDashboardComponent = class BillerDashboardComponent {
    constructor(http, commonFunction, activatedRoute) {
        this.http = http;
        this.commonFunction = commonFunction;
        this.activatedRoute = activatedRoute;
        /* declarations */
        this.patientReportArray = [];
        this.displayedColumns = ['Patient Name', 'Doctor Name', 'Bill Sent Date', 'Bill Generation Date', 'Tech Name', 'Status', 'report_type', 'Action'];
        /* Initializing the datasource to null */
        this.dataSource = null;
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe(resolveData => {
            this.patientReportArray = resolveData.billerData.res;
        });
        /* Fetching the data into table */
        this.dataSource = new MatTableDataSource(this.patientReportArray);
        /* Adding the paginator options */
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], BillerDashboardComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], BillerDashboardComponent.prototype, "sort", void 0);
BillerDashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-biller-dashboard',
        templateUrl: './biller-dashboard.component.html',
        styleUrls: ['./biller-dashboard.component.css']
    })
], BillerDashboardComponent);
export { BillerDashboardComponent };
//# sourceMappingURL=biller-dashboard.component.js.map