import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
/** Constants used to fill up our data base. */
const COLORS = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
    'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
/**
 * @title Data table with sorting, pagination, and filtering.
 */
let TestComponent = class TestComponent {
    constructor(router, cookieService, http, activatedRoute, commonFunction) {
        this.router = router;
        this.cookieService = cookieService;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.commonFunction = commonFunction;
        this.allDataColumns = ['no', 'billGenerationDate', 'techName', 'billSentDate', 'billerName', 'doctorName', 'record', 'superBill', 'date', 'patientName', 'status'];
        this.displayedColumns = ['id', 'name', 'progress', 'color'];
        this.activatedRoute.data.subscribe(resolveData => {
            const allData = resolveData.dataCount.res;
            this.allDataSource = new MatTableDataSource(allData);
        });
        // Create 100 users
        const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
    }
    ngOnInit() {
        this.allDataSource.paginator = this.paginatorAll;
        this.allDataSource.sort = this.sortALl;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], TestComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], TestComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], TestComponent.prototype, "paginatorAll", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], TestComponent.prototype, "sortALl", void 0);
TestComponent = tslib_1.__decorate([
    Component({
        selector: 'app-test',
        templateUrl: './test.component.html',
        styleUrls: ['./test.component.css']
    })
], TestComponent);
export { TestComponent };
/** Builds and returns a new User. */
function createNewUser(id) {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    return {
        id: id.toString(),
        name: name,
        progress: Math.round(Math.random() * 100).toString(),
        color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
}
//# sourceMappingURL=test.component.js.map