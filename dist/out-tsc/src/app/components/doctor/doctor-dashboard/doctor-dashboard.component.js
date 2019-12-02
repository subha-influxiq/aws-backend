import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UploadDialogBoxComponent } from '../../common/upload-dialog-box/upload-dialog-box.component';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import * as momentImported from 'moment';
const moment = momentImported;
let DoctorDashboardComponent = class DoctorDashboardComponent {
    constructor(dialog, commonFunction, cookie, http, activatedRoute, snackBar) {
        this.dialog = dialog;
        this.commonFunction = commonFunction;
        this.cookie = cookie;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.DoctorSignedData = [];
        this.buttonText = "Add One";
        this.commonArray = [];
        this.allDataColumns = ['no', 'billGenerationDate', 'billSentDate', 'patientName', 'date',
            'doctorName', 'record', 'techName', 'superBill', 'status', 'billerDropDown', 'action'];
        this.headerText = " DOCTOR SIGNATURE RECORD REPORTS";
        this.doctorSignedArray = [];
        this.pendingArray = [];
        this.billerData = [];
        this.dataSource = new MatTableDataSource(this.allDataList);
        this.allDataSource_skip = ["patientName"];
        this.sendToBillerJson = {};
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        this.cookies_id = this.cookiesData._id;
        this.user_token = cookie.get('jwtToken');
        this.getDoctorSignedData();
        this.getBillerData();
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        let matDatepicker = moment();
        this.activatedRoute.data.forEach(resolveData => {
            this.allDataList = resolveData.alldata;
            this.allDataSource = new MatTableDataSource(this.allDataList);
            this.allDataSource.paginator = this.paginator;
        });
    }
    ngOnInit() {
        this.allDataSource.paginator = this.paginator;
        this.getData();
    }
    ngAfterViewInit() {
        // this.allDataSource.paginator = this.paginator;
    }
    getBillerData() {
        var data = {
            "source": "users_view_doctor",
            "condition": {
                "_id_object": this.cookies_id
            },
            "token": this.user_token
        };
        this.http.httpViaPost('datalist', data)
            .subscribe((response) => {
            this.billerData = response.res;
        });
    }
    dateSearch() {
        var data = {
            "source": "Patient-Record-Report_view",
            "condition": {
                "date": {
                    $lte: moment(this.end_date).format('DD-MM-YYYY'),
                    $gte: moment(this.start_date).format('DD-MM-YYYY')
                }
            },
            "token": this.user_token,
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.allDataSource = response.res;
        });
    }
    applyFilter(key, value) {
        let filterValue = {};
        filterValue[key] = value.toLowerCase();
        var data = {
            "source": "Patient-Record-Report_view",
            "condition": filterValue,
            "token": this.user_token,
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.allDataSource = response.res;
        });
    }
    applyStatusFilter(filterValue) {
        var data = {
            "source": "Patient-Record-Report_view",
            "condition": filterValue,
            "token": this.user_token,
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.allDataSource = response.res;
        });
    }
    openDialog() {
        const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
            width: '1000px',
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    getDoctorSignedData() {
        var data = {
            "source": "doctor_signature",
            "condition": {
                "user_id_object": this.cookies_id
            },
            "token": this.user_token
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.DoctorSignedData = response.res;
            if (this.DoctorSignedData.length == 1) {
                this.buttonText = "Edit";
            }
        });
    }
    getData() {
        this.dataSource = new MatTableDataSource(this.allDataList);
        this.DoctorSigned = this.allDataList["doctorsigned-count"];
        this.Pending = this.allDataList["pending-count"];
        console.log("Problem (Data not coming) >>--->", this.allDataList);
        this.doctorSignedArray = this.allDataList.data.doctorsigned;
        this.pendingArray = this.allDataList.data.pending;
        this.allDataSource = this.allDataList.dataFull;
        // this.allDataSource.paginator = this.paginator;
    }
    viewReportProcessData(flag) {
        switch (flag) {
            case 'Report Signed':
                this.headerText = "DOCTOR SIGNED REPORTS";
                this.commonArray = this.doctorSignedArray;
                this.allDataSource = new MatTableDataSource(this.commonArray);
                this.allDataSource.paginator = this.paginator;
                break;
            case 'Report unSigned':
                this.headerText = "DOCTOR UNSIGNED REPORTS";
                this.commonArray = this.pendingArray;
                this.allDataSource = new MatTableDataSource(this.commonArray);
                this.allDataSource.paginator = this.paginator;
                break;
            default:
                break;
        }
    }
    setSendBiller(index, event) {
        this.sendToBillerJson[index] = event.value;
    }
    allSendToBiller(index) {
        var data = {
            "source": "patient_management",
            "data": {
                "id": this.allDataSource[index]._id,
                "biller_id": this.sendToBillerJson[index],
                "status": 2
            },
            "sourceobj": ["biller_id"],
            "token": this.user_token
        };
        this.http.httpViaPost('addorupdatedata', data).subscribe((response) => {
            if (response.status = "success") {
                let message = "Successfully Send";
                let action = "ok";
                this.snackBar.open(message, action, {
                    duration: 2000,
                });
            }
        });
    }
    viewButton(index) {
        console.log("indexxxxx", this.allDataSource[index]);
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], DoctorDashboardComponent.prototype, "paginator", void 0);
DoctorDashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-doctor-dashboard',
        templateUrl: './doctor-dashboard.component.html',
        styleUrls: ['./doctor-dashboard.component.css']
    })
], DoctorDashboardComponent);
export { DoctorDashboardComponent };
//# sourceMappingURL=doctor-dashboard.component.js.map