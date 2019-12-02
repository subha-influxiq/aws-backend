import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
let BookedAppoinmentsComponent = class BookedAppoinmentsComponent {
    constructor(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.displayedColumns = ['no', 'organizerName', 'organizerEmail', 'appoinmentDate', 'appoinmentTime', 'timeZone', 'doctorName',
            'patientName', 'manage'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        /* Get Auth Token */
        this.userToken = cookieService.get('jwtToken');
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }
    filerByReports(key, value) {
        let searchJson = {};
        searchJson[key] = value.toLowerCase();
        var data = {
            "source": "patient_management_view_count",
            "condition": searchJson,
            "token": this.userToken
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(Response => {
            let result = Response.res;
            this.dataSource = result;
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], BookedAppoinmentsComponent.prototype, "paginator", void 0);
BookedAppoinmentsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-booked-appoinments',
        templateUrl: './booked-appoinments.component.html',
        styleUrls: ['./booked-appoinments.component.css']
    })
], BookedAppoinmentsComponent);
export { BookedAppoinmentsComponent };
const ELEMENT_DATA = [
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
];
//# sourceMappingURL=booked-appoinments.component.js.map