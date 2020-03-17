import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadDialogBoxComponent } from '../../common/upload-dialog-box/upload-dialog-box.component';
import { CommonFunction } from '../../../class/common/common-function';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import * as momentImported from 'moment';
const moment = momentImported;

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})

export class DoctorDashboardComponent implements OnInit {

  public authData: any = {};
  public allResolveData: any;
  public htmlText: any = {
    buttonText: "Add One",
    headerText: "Patient Record Report",
    billerData: [],
  };
  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };

  public allDataColumns: string[] = ['no', 'patient_name', 'doctor_name', 'tech_name', 'biller_name', 'bill_generation_date', 'bill_sent_date', 'report_type', 'status', 'super_bill', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public dialogRef: any;
  public allDataSource: any;
  public start_date: any;
  public end_date: any;
  public viewstatus: boolean = false;
  public btnName: any = 'view more';

  constructor(public dialog: MatDialog, public commonFunction: CommonFunction, public cookie: CookieService,
    public http: HttpServiceService, public activatedRoute: ActivatedRoute, public matSnackBar: MatSnackBar,
    public deviceService: DeviceDetectorService) {

    this.authData["user_details"] = JSON.parse(cookie.get('user_details'));
    this.authData["jwtToken"] = cookie.get('jwtToken');

    this.activatedRoute.data.forEach(resolveData => {
      this.allResolveData = resolveData.doctordata.data;

      this.viewReportProcessData(this.htmlText.tableHeaderText);
    });
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewReportProcessData(flag: string = null) {
    this.allDataColumns = ['no', 'patient_name', 'tech_name', 'doctor_name', 'biller_name', 'bill_generation_date', 'bill_sent_date', 'report_type', 'status', 'super_bill', 'action'];
    this.htmlText.headerText = flag;
    var data: any = {};
    /* Open modal */
    let modalData: any = {
      panelClass: 'bulkupload-dialog',
      data: {
        header: "Message",
        message: "No Records Found",
        button1: { text: "" },
        button2: { text: "Ok" },
      }
    };

    if (this.searchJson.dateRange != '') {
      this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
    }

    switch (flag) {
      case 'Report Signed':
        data = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "report_type": { $exists: true },
            "doctor_signature": { $exists: true },
            "doctor_id": this.authData.user_details._id
          },
          "pagination": {
            "skip": 0,
            "limit": 50
          },
          "token": this.authData.jwtToken
        };
        break;
      case 'Report unSigned':
        this.allDataColumns = ['no', 'patient_name', 'tech_name', 'doctor_name', 'report_type', 'status', 'action'];
        data = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "report_type": { $exists: true },
            "doctor_signature": { $exists: false },
            "doctor_id": this.authData.user_details._id
          },
          "pagination": {
            "skip": 0,
            "limit": 50
          },
          "token": this.authData.jwtToken
        };
        break;
      default:
        data = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "report_type": { $exists: true },
            "doctor_id": this.authData.user_details._id
          },
          "pagination": {
            "skip": 0,
            "limit": 50
          },
          "token": this.authData.jwtToken
        };
        break;
    }
    this.http.httpViaPost('dashboard-datalist', data).subscribe(response => {
      if (response.data.length > 0) {
        this.allResolveData.recordData = response.data;
        this.allDataSource = new MatTableDataSource(this.allResolveData.recordData);
        this.allDataSource.paginator = this.paginator;
      }
    });
  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Ok":
          this.dialogRef.close();
          break;
      }
    });
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
      id: this.authData.user_details._id,
      type: this.authData.user_details.type
    };

    let postData: any = {
      "source": "report_download",
      "data": {
        "report_id": report._id,
        "biller_id": this.authData.user_details._id,
        "tech_id": report.tech_id,
        "doctor_id": report.doctor_id,
        "ip": this.htmlText.ip,
        "download_attempt": 1,
        "downloader_information": userDetails,
        "device_information": deviceInfo
      },
      "sourceobj": ["report_id", "biller_id", "tech_id", "doctor_id"],
      "download_count": report.download_count,
      "token": this.authData.jwtToken
    };

    this.http.httpViaPost("addorupdatedata", postData).subscribe(response => {
      if (response.status == 'success') {
        this.matSnackBar.open("Start downloading...", "", {
          duration: 3000
        });
        window.open(report.file_path, "_blank");

        this.refreshDashboard();
      } else {
        this.matSnackBar.open("Some error occord. Please try again.", "Ok", {
          duration: 3000
        });
      }
    });
  }

  refreshDashboard() {
    let postData: any = {
      source: "data_pece",
      condition: {
        doctor_id: this.authData.user_details._id
      }
    };

    this.http.httpViaPost("doctor-dashboard", postData).subscribe(response => {
      if (response.status == 'success') {
        this.allResolveData = response.data;
        this.viewReportProcessData(this.htmlText.tableHeaderText);
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

  resetSearch() {
    this.searchJson = {
      patientName: "",
      status: "",
      dateRange: ""
    };
    this.viewReportProcessData(this.htmlText.headerText);
  }

  viewMore() {
    this.viewstatus = !this.viewstatus;

    if (this.viewstatus)
      this.btnName = "view less";
    else
      this.btnName = "view more";
  }

}
