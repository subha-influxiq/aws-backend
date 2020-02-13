import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DownloadDetailsComponent } from './download-details/download-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';

import * as momentImported from 'moment';
const moment = momentImported;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  public loginUserData: any = {};
  public jwtToken: string = "";
  public htmlText: any = {
    headerText: "Patient Reports"
  };

  public allResolveData: any = {};
  public uploadedStatusArray: any = [];
  public processedStatusArray: any = [];
  public signedStatusArray: any = [];
  public billerStatusArray: any = [];
  public allDataColumns: string[];
  public dialogRef: any;

  allDataSource: MatTableDataSource<any>;

  public searchJson: any = {
    doctor_name: "",
    patientName: "",
    status: "",
    dateRange: ""
  };

  public allDataList: any = [];
  @ViewChild(MatPaginator, { static: false }) paginatorAll: MatPaginator;

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public deviceService: DeviceDetectorService, private matSnackBar: MatSnackBar) {

    this.loginUserData["user_details"] = JSON.parse(cookieService.get('user_details'));
    this.loginUserData["jwtToken"] = cookieService.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');
    
    /* Get resolve data */
    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.dataCount.data;
      this.viewReportProcessData(this.htmlText.headerText);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  viewReportProcessData(flag: string) {
    if(this.searchJson.dateRange != '') {
      this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
    }

    this.htmlText.headerText = flag;
    var repostSignCond: any = {
      "search": this.searchJson,
      "token": this.jwtToken,
    };

    this.allDataColumns = ['no', 'tech_name', 'report_type', 'doctor_name', 'patientNamecopy', 'status', 'created_at', 'editRecord'];
    /* Set Table Header */

    switch (flag) {
      /* Report Status Section */
      case 'Total Mannual Reports':
        repostSignCond["condition"] = {
          "report_type": "mannual"
        };
        break;
      case 'Total File Reports':
        repostSignCond["condition"] = {
          "report_type": "file"
        };
        break;
      /* Report Status Section */
      case 'Reports Uploaded':
        repostSignCond["condition"] = {};
        break;
      case 'Report Processed':
        repostSignCond["condition"] = {
          "page_1": { $exists: true },
          "page_2": { $exists: true },
          "page_3": { $exists: true },
          "page_4": { $exists: true },
          "page_5": { $exists: true },
          "page_6": { $exists: true },
          "page_7": { $exists: true }
        };
        break;
      case 'Report Signed':
        this.allDataColumns = ['no', 'billGenerationDate', 'tech_name', 'billSentDate', 'biller_name', 'report_type', 'doctor_name', 'superBill', 'patientNamecopy', 'status', 'created_at', 'editRecord'];

        repostSignCond["condition"] = {
          "doctor_signature": { $exists: true }
        };
        break;
      case 'Super Bill':
        this.allDataColumns = ['no', 'billGenerationDate', 'tech_name', 'billSentDate', 'biller_name', 'report_type', 'doctor_name', 'superBill', 'patientNamecopy', 'status', 'created_at', 'editRecord'];

        /////////////////////////////////////////
        //////////////// Pending ////////////////
        /////////////////////////////////////////
        repostSignCond["condition"] = {
          "doctor_signature": { $exists: false }
        };
        break;
      case 'Download Bill':
        this.allDataColumns = ['no', 'billGenerationDate', 'tech_name', 'billSentDate', 'biller_name', 'report_type', 'doctor_name', 'superBill', 'patientNamecopy', 'status', 'created_at', 'editRecord'];

        repostSignCond["condition"] = {
          "download_count": { $exists: true }
        };
        break;
      case 'Reports Pending Sing':
        repostSignCond["condition"] = {
          "doctor_signature": { $exists: false }
        };
        break;
      default:
        repostSignCond["condition"] = {};
        break;
    }

    this.http.httpViaPost('dashboard-datalist', repostSignCond).subscribe((response) => {
      if(response.status == true) {
        this.allDataSource = new MatTableDataSource(response.data);
        this.allDataSource.paginator = this.paginatorAll;
      } else {
        this.allDataColumns = [];
      }
    });
  }

  myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  /*Doctor's List*/
  toDocList() {
    this.router.navigateByUrl('admin/doctor-management/list');
  }

  downloadReport(report: any) {
    if (typeof (report.download_count) == "undefined") {
      report.download_count = 1;
    } else {
      report.download_count = report.download_count + 1;
    }

    /* Collect User Information for Download record */
    let deviceInfo: any = this.deviceService.getDeviceInfo();
    deviceInfo["isMobile"] = this.deviceService.isMobile();
    deviceInfo["isTablet"] = this.deviceService.isTablet();
    deviceInfo["isDesktop"] = this.deviceService.isDesktop();

    /* Set downloader information */
    var userDetails = {
      id: this.loginUserData.user_details._id,
      user_type: this.loginUserData.user_details.user_type
    };

    let postData: any = {
      "source": "report_download",
      "data": {
        "report_id": report._id,
        "biller_id": this.loginUserData.user_details._id,
        "tech_id": report.tech_id,
        "doctor_id": report.doctor_id,
        "ip": this.htmlText.ip,
        "download_attempt": 1,
        "downloader_information": userDetails,
        "device_information": deviceInfo
      },
      "sourceobj": ["report_id", "biller_id", "tech_id", "doctor_id"],
      "download_count": report.download_count,
      "token": this.loginUserData.jwtToken
    };

    this.http.httpViaPost("addorupdatedata", postData).subscribe(response => {
      if (response.status == 'success') {
        this.matSnackBar.open("Start downloading.", "Ok", {
          duration: 3000
        });
        window.open(report.file_path, "_blank");

        this.refreshDashboard();
        this.viewReportProcessData('Download Bill');
      } else {
        this.matSnackBar.open("Some error occord. Please try again.", "Ok", {
          duration: 3000
        });
      }
    });
  }

  refreshDashboard() {
    let postData: any = {
      source: "Patient-Record-Report_view",
      condition: {
        biller_id: this.loginUserData.user_details._id
      }
    };
    this.http.httpViaPost("admin-dashboard", postData).subscribe(response => {
      if (response.status == 'success') {
        this.allResolveData = response.data;
        let allData = this.allResolveData.totalReportData;
        this.allDataSource = new MatTableDataSource(allData);
        this.allDataSource.paginator = this.paginatorAll;
      } else {
        this.matSnackBar.open("Please wait...", "", {
          duration: 1000
        });

        setTimeout(() => {
          this.refreshDashboard();
        }, 1000);
      }
    });
  }

  /* Delete record Start */
  deleteReport(pk_id: any, index: number) {
    let data: any = {
      width: '250px',
      data: {
        header: "Alert",
        message: "Do you want to delete this record ?",
        button1: { text: "No" },
        button2: { text: "Yes" },
      }
    }

    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "No":
          break;
        case "Yes":
          this.deleteProcess(pk_id, index);
          break;
      }
    });
  }

  deleteProcess(pk_id: any, index: number) {
    var repostSignCond = {
      "source": "patient_management",
      "id": pk_id,
      "token": this.jwtToken,
    }
    this.http.httpViaPost('deletesingledata', repostSignCond).subscribe((response) => {
      if (response.status == 'success') {
        this.allResolveData.totalReportData.splice(index, 1);
        let allData = this.allResolveData.totalReportData;
        this.allDataSource = new MatTableDataSource(allData);

        let data: any = {
          width: '250px',
          data: {
            header: "Success",
            message: "Successfully delete.",
            button1: { text: "OK" },
            button2: { text: "" },
          }
        }

        this.dialogRef = this.dialog.open(DialogBoxComponent, data);
      } else {
        let data: any = {
          width: '250px',
          data: {
            header: "Error",
            message: "An error occord. Please try again.",
            button1: { text: "Re-Try" },
            button2: { text: "Close" },
          }
        }

        this.dialogRef = this.dialog.open(DialogBoxComponent, data);
        this.dialogRef.afterClosed().subscribe(result => {
          switch (result) {
            case "Close":
              break;
            case "Re-Try":
              this.deleteProcess(pk_id, index);
              break;
          }
        });
      }
    });
  }
  /* Delete record End */

  viewDownloadDetails(id: any) {
    let data: any = {
      width: '700px',
      data: {
        report_id: id
      }
    };
    this.dialogRef = this.dialog.open(DownloadDetailsComponent, data);
  }

  resetSearch() {
    this.searchJson = {
      doctor_name: "",
      patientName: "",
      status: "",
      dateRange: ""
    };
    this.viewReportProcessData(this.htmlText.headerText);
  }

}
