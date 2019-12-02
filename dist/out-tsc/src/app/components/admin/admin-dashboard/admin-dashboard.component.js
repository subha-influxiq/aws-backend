import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as momentImported from 'moment';
const moment = momentImported;
let AdminDashboardComponent = class AdminDashboardComponent {
    constructor(router, cookieService, http, activatedRoute) {
        this.router = router;
        this.cookieService = cookieService;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.commonArray = [];
        this.uploadedStatusArray = [];
        this.processedStatusArray = [];
        this.signedStatusArray = [];
        this.billerStatusArray = [];
        this.displayedColumns = ['no', 'date_added', 'patientName', 'record_type', 'techName', 'record', 'status'];
        this.allDataColumns = ['no', 'billGenerationDate', 'techName', 'billSentDate', 'billerName', 'report_type', 'doctorName', 'record', 'superBill', 'date', 'patientNamecopy', 'status', 'editRecord'];
        this.allDataList = [];
        /* Get Auth Token */
        this.userToken = cookieService.get('jwtToken');
        this.activatedRoute.data.subscribe(resolveData => {
            let allData = resolveData.dataCount.res;
            this.allDataSource = new MatTableDataSource(allData);
        });
        this.getAllCountData();
        this.getStatusCountData();
    }
    ngOnInit() {
        this.allDataSource.paginator = this.paginatorAll;
    }
    ngAfterViewInit() {
        this.allDataSource.paginator = this.paginatorAll;
    }
    filterByName(key, value) {
        let searchJson = {};
        searchJson[key] = value.toLowerCase();
        var data = {
            "source": "Patient-Record-Report_view",
            "condition": searchJson,
            "token": this.userToken
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(Response => {
            this.allDataSource = Response.res;
        });
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
    dateRangeSearch() {
        var data = {
            "source": "Patient-Record-Report_view",
            "condition": {
                "date": {
                    $lte: moment(this.endDate).format('DD-MM-YYYY'),
                    $gte: moment(this.startDate).format('DD-MM-YYYY')
                }
            },
            "token": this.userToken,
        };
        this.http.httpViaPost('datalist', data)
            .subscribe((response) => {
            this.allDataSource = response.res;
        });
    }
    dateReportsRangeSearch() {
        var data = {
            "source": "patient_management_view_count",
            "condition": {
                "date_added": {
                    $lte: moment(this.endDate).format('DD-MM-YYYY'),
                    $gte: moment(this.startDate).format('DD-MM-YYYY')
                },
                status: this.statusFlag
            },
            "token": this.userToken,
        };
        this.http.httpViaPost('datalist', data)
            .subscribe((response) => {
            this.dataSource = response.res;
        });
    }
    getAllCountData() {
        var data = {
            "condition": {
                "condition": {
                    "type": "doctor"
                },
                "condition1": {
                    "type": "tech"
                },
                "condition2": {
                    "type": "biller"
                }
            }
        };
        this.http.httpViaPost('count', data).subscribe((response) => {
            this.billerCount = response["biller-count"];
            this.techCount = response["tech-count"];
            this.doctorCount = response["doctor-count"];
        });
    }
    getStatusCountData() {
        var data = {
            "condition": {
                "condition": {
                    "status": "pending"
                },
                "condition1": {
                    "status": "waiting for doctor sign"
                },
                "condition2": {
                    "status": "doctor signed"
                },
                "condition3": {
                    "status": "error"
                },
                "condition4": {
                    "status": "send to biller"
                },
                "condition5": {
                    "record_type": "file"
                }
            }
        };
        this.http.httpViaPost('statuscount', data)
            .subscribe(response => {
            let result;
            result = response;
            this.uploadedStatusCount = result["status-count1"];
            this.processedStatusCount = result["status-count2"];
            this.signedStatusCount = result["status-count3"];
            this.billerStatusCount = result["status-count5"];
            this.uploadedStatusArray = result.data.status1;
            this.processedStatusArray = result.data.status2;
            this.signedStatusArray = result.data.status3;
            this.billerStatusArray = result.data.status5;
        });
    }
    viewReportProcessData(flag) {
        this.statusFlag = flag;
        switch (flag) {
            case 'Reports Uploaded':
                this.headerText = "Reports Uploaded";
                this.commonArray = this.uploadedStatusArray;
                this.dataSource = new MatTableDataSource(this.commonArray);
                this.dataSource.paginator = this.paginator;
                break;
            case 'Report Processed':
                this.headerText = "Reports Processed";
                this.commonArray = this.processedStatusArray;
                this.dataSource = new MatTableDataSource(this.commonArray);
                this.dataSource.paginator = this.paginator;
                break;
            case 'Report Signed':
                this.headerText = "Reports Signed";
                this.commonArray = this.signedStatusArray;
                this.dataSource = new MatTableDataSource(this.commonArray);
                this.dataSource.paginator = this.paginator;
                break;
            case 'Super Bill':
                this.headerText = "Sent to Super Bill";
                this.commonArray = this.billerStatusArray;
                this.dataSource = new MatTableDataSource(this.commonArray);
                this.dataSource.paginator = this.paginator;
                break;
            default:
                break;
        }
    }
    myFunction() {
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
    }
    /*Doctor's List*/
    toDocList() {
        this.router.navigateByUrl('admin/doctor-management/list');
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], AdminDashboardComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], AdminDashboardComponent.prototype, "paginatorAll", void 0);
AdminDashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin-dashboard',
        templateUrl: './admin-dashboard.component.html',
        styleUrls: ['./admin-dashboard.component.css']
    })
], AdminDashboardComponent);
export { AdminDashboardComponent };
//# sourceMappingURL=admin-dashboard.component.js.map