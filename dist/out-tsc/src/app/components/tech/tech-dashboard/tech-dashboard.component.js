import * as tslib_1 from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
let TechDashboardComponent = class TechDashboardComponent {
    constructor(cookie, http, httpService, activatedRoute, commonFunction, dialog) {
        this.cookie = cookie;
        this.http = http;
        this.httpService = httpService;
        this.activatedRoute = activatedRoute;
        this.commonFunction = commonFunction;
        this.dialog = dialog;
        this.commonArray = [];
        this.displayedColumns = ['no', 'patientName', 'record_type', 'doctorName', 'techName', 'date_added', 'status'];
        this.user_data = {};
        this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'billerName', 'recordType', 'billGenerationData', 'billsendDate', 'status'];
        /**lib-listing start here**/
        this.allUserData = [];
        this.techDashboardAllData = [];
        this.techSingleData = [];
        this.allDoctorData = [];
        this.reportUploadedArray = [];
        this.reportProcessedArray = [];
        this.reportRemainingArray = [];
        this.headerText = "Patient record report";
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        let allData = {};
        allData = cookie.getAll();
        this.user_data = JSON.parse(allData.user_details);
        this.userToken = cookie.get('jwtToken');
        this.user_id = this.user_data.id;
        this.user_token = cookie.get('jwtToken');
        this.getTechData();
        this.getTechCountData();
        this.activatedRoute.data.forEach((data) => {
            console.log("dataaaaaaaaaa", data);
            let allDashboardData = data.techDashboardData.res;
            this.techDashboardAllData = new MatTableDataSource(allDashboardData);
        });
    }
    ngOnInit() {
        this.techDashboardAllData.paginator = this.paginator;
        this.techDashboardAllData.sort = this.sortAll;
    }
    ngAfterViewInit() {
        this.techDashboardAllData.paginator = this.paginator;
    }
    getTechData() {
        var data = {
            "source": "users_view_doctor",
            "condition": {
                "tech_id_object": this.user_id
            },
            "token": this.user_token
        };
        this.httpService.httpViaPost('datalist', data)
            .subscribe(response => {
            let result = {};
            result = response.res;
            this.allDoctorData = response.res;
            this.userSingleDataName = result[0].fullName;
            this.userSingleDataEmail = result[0].email;
            this.userSingleDataFax = result[0].fax;
            this.userSingleDataPhone = result[0].phone;
            this.userSingleDataTaxo = result[0].taxo_list[0];
            this.totalDoctor = response.resc;
        });
    }
    getTechCountData() {
        var data = {
            "condition": {
                "condition": {
                    "status": "1",
                    "type": "tech"
                },
                "condition1": {
                    "status": "2",
                    "type": "tech"
                },
                "condition2": {
                    "status": "3"
                },
                "condition3": {
                    "status": "error"
                },
                "condition4": {
                    "status": "4"
                },
                "condition5": {
                    "record_type": "file"
                },
                "condition6": {
                    "type": "tech"
                },
            },
            "token": this.user_token
        };
        this.httpService.httpViaPost('statuscount', data)
            .subscribe(response => {
            this.processedStatusCount = response["status-count1"];
            this.signedStatusCount = response["status-count2"];
            this.uploadedStatusCount = response["status-count7"];
            this.reportUploadedArray = response.data.status7;
            this.reportRemainingArray = response.data.status2;
            this.reportProcessedArray = response.data.status1;
        });
    }
    filterByName(key, value) {
        let searchJson = {};
        searchJson[key] = value.toLowerCase();
        searchJson["user_id_object"] = this.user_id;
        var data = {
            "source": "patient_management_view_tech",
            "condition": searchJson,
            "token": this.userToken
        };
        this.httpService.httpViaPost('datalist', data)
            .subscribe((Response) => {
            this.techDashboardAllData = Response.res;
        });
    }
    filerByReports(key, value) {
        let searchJson = {};
        searchJson[key] = value.toLowerCase();
        var data = {
            "source": "patient_management_view_tech",
            "condition": searchJson,
            "token": this.userToken
        };
        this.httpService.httpViaPost('datalist', data)
            .subscribe((Response) => {
            // this.techDashboardAllData = Response.res;
        });
    }
    modalData() {
    }
    viewDetailsData(flag) {
        /* Open modal */
        let modalData = {
            panelClass: 'bulkupload-dialog',
            data: {
                header: "Message",
                message: "No Records Found",
                button1: { text: "" },
                button2: { text: "Ok" },
            }
        };
        switch (flag) {
            case 'upload':
                if (this.reportUploadedArray.length > 0) {
                    this.headerText = "Reports Uploaded";
                    this.commonArray = this.reportUploadedArray;
                    this.dataSource = new MatTableDataSource(this.commonArray);
                    this.dataSource.paginator = this.paginatorAll;
                    this.dataSource.sort = this.sort;
                }
                else {
                    this.openDialog(modalData);
                }
                break;
            case 'processed':
                if (this.reportProcessedArray > 0) {
                    this.headerText = "Reports Processed";
                    this.commonArray = this.reportProcessedArray;
                    this.dataSource = new MatTableDataSource(this.commonArray);
                    this.dataSource.paginator = this.paginatorAll;
                    this.dataSource.sort = this.sort;
                }
                else {
                    this.openDialog(modalData);
                }
                break;
            case 'remainProcess':
                if (this, this.reportRemainingArray > 0) {
                    this.headerText = "Reports Remain to Process";
                    this.commonArray = this.reportRemainingArray;
                    this.dataSource = new MatTableDataSource(this.commonArray);
                    this.dataSource.paginator = this.paginatorAll;
                    this.dataSource.sort = this.sort;
                }
                else {
                    this.openDialog(modalData);
                }
                break;
            default:
                break;
        }
    }
    openDialog(data) {
        this.dialogRef = this.dialog.open(DialogBoxComponent, data);
        this.dialogRef.afterClosed().subscribe(result => {
            switch (result) {
                case "Ok":
                    this.dialogRef.close();
                    break;
            }
        });
    }
    /**All doctor deatls view in modal */
    allDoctorViewModal() {
        //dialog function
        const dialogGenreRef = this.dialog.open(DoctorViewDialogComponent, {
            panelClass: ['modal-sm', 'infomodal'],
            disableClose: true,
        });
        dialogGenreRef.afterClosed().subscribe(result => {
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], TechDashboardComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], TechDashboardComponent.prototype, "paginatorAll", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false })
], TechDashboardComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false })
], TechDashboardComponent.prototype, "sortAll", void 0);
TechDashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tech-dashboard',
        templateUrl: './tech-dashboard.component.html',
        styleUrls: ['./tech-dashboard.component.css']
    })
], TechDashboardComponent);
export { TechDashboardComponent };
// Doctor View dialog component
let DoctorViewDialogComponent = class DoctorViewDialogComponent {
    constructor(dialogRef, data, cookie, http, httpService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.cookie = cookie;
        this.http = http;
        this.httpService = httpService;
        this.allData = {};
        this.loader = true;
        this.allData = cookie.getAll();
        this.user_data = JSON.parse(this.allData.user_details);
        this.user_token = cookie.get('jwtToken');
        var dta = {
            "source": "users_view_doctor",
            "condition": {
                tech_id_object: this.user_data._id
            },
            "token": this.user_token
        };
        this.httpService.httpViaPost('datalist', dta)
            .subscribe((response) => {
            let result = {};
            result = response.res;
            if (response.resc > 0) {
                this.loader = false;
                this.allDoctorData = response.res;
            }
        });
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
DoctorViewDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'doctor-dialog',
        templateUrl: 'doctorview.component.html',
        styleUrls: ['./tech-dashboard.component.css']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], DoctorViewDialogComponent);
export { DoctorViewDialogComponent };
//# sourceMappingURL=tech-dashboard.component.js.map