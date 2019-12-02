import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
let ListComponent = class ListComponent {
    constructor() {
        this.displayedColumns = ['no', 'organizerName', 'organizerEmail', 'appoinmentDate', 'appoinmentTime', 'timeZone', 'doctorName',
            'patientName', 'manage'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], ListComponent.prototype, "paginator", void 0);
ListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.css']
    })
], ListComponent);
export { ListComponent };
const ELEMENT_DATA = [
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
    { no: 1, organizerName: 'Hydrogen', organizerEmail: "s@gmail.com", appoinmentDate: '11.10.19', appoinmentTime: 'adf', timeZone: 'fs', doctorName: 'sfg', patientName: 'fgasd', manage: '' },
];
//# sourceMappingURL=list.component.js.map