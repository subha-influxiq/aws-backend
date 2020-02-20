import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  public allDataColumns: string[] = ['patientName', 'doctorName', 'techName', 'billerName', 'billGenerationDate', 'billSentDate', 'reportType', 'status', 'superBill', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public dialogRef: any;
  public allDataSource: any;
  public start_date: any;
  public end_date: any;
  
  constructor(public dialog: MatDialog, public commonFunction: CommonFunction, public cookie: CookieService,
    public http: HttpServiceService, public activatedRoute: ActivatedRoute, public matSnackBar: MatSnackBar,
    public deviceService: DeviceDetectorService) {

    this.authData["user_details"] = JSON.parse(cookie.get('user_details'));
    this.authData["jwtToken"] = cookie.get('jwtToken');
    
    this.activatedRoute.data.forEach(resolveData => {
      this.allResolveData = resolveData.doctordata;
      this.allDataSource = new MatTableDataSource(this.allResolveData.data.allReportData);
      this.allDataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  getBillerData() {
    var data = {
      "source": "users_view_doctor",
      "condition": {
        "_id_object": this.authData.to
      },
      "token": this.authData
    }

    this.http.httpViaPost('datalist', data).subscribe((response) => {
      this.htmlText.billerData = response.res;
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getDoctorSignedData() {
    var data = {
      "source": "doctor_signature",
      "condition": {
        "user_id_object": this.authData
      },
      "token": this.authData
    }
    this.http.httpViaPost('datalist', data).subscribe(response => {
      console.log("doctor signature: ", response.res);
    });
  }

  viewReportProcessData(flag: string = null) {
    this.allDataColumns = ['billGenerationDate', 'billSentDate', 'doctorName','patientName', 'billerName','report_type','status','superBill','techName', 'action'];
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

    if(this.searchJson.dateRange != '') {
      this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
    }

    switch (flag) {
      case 'Report Signed':
        data = {
          "source": "Patient-Record-Report_view",
          "search": this.searchJson,
          "condition": {
            "doctor_signature": { $exists: true },
            "doctor_id": this.authData.user_details._id
          },
          "token": this.authData.jwtToken
        };
        break;
      case 'Report unSigned':
        this.allDataColumns = ['doctorName','patientName', 'report_type','status','techName', 'action'];
        data = {
          "source": "Patient-Record-Report_view",
          "search": this.searchJson,
          "condition": {
            "doctor_signature": { $exists: false },
            "doctor_id": this.authData.user_details._id
          },
          "token": this.authData.jwtToken
        };
        break;
      default:
        data = {
          "source": "Patient-Record-Report_view",
          "search": this.searchJson,
          "condition": {
            "doctor_id": this.authData.user_details._id
          },
          "token": this.authData.jwtToken
        };
        break;
    }
    this.http.httpViaPost('dashboard-datalist', data).subscribe(response => {
      if(response.data.length > 0) {
        this.allResolveData.data = response.data;
        this.allDataSource = new MatTableDataSource(this.allResolveData.data);
        this.allDataSource.paginator = this.paginator;
      } else {
        this.openModal(modalData);
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

  public sendToBillerJson: any = {};
  public billerFlug: number;

  setSendBiller(index: number, event: any) {
    this.billerFlug = event.value + 1;
    this.sendToBillerJson[index] = event.value;
  }

  allSendToBiller(index: number) {
    if(typeof this.sendToBillerJson[index] !== 'undefined') {
      for(var loop = 0; loop <= this.allResolveData.data.allBillerList.length - 1; loop++) {
        if(this.allResolveData.data.allBillerList[loop].biller_id == this.sendToBillerJson[index]) {
          var fullname = this.allResolveData.data.allBillerList[loop].firstname + ' ' + this.allResolveData.data.allBillerList[loop].lastname;
        }
      }


      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Do you want to send this report to biller: " + fullname + " ?",
          button1: { text: "Yes" },
          button2: { text: "No" },
        }
      };
      this.openModal(modalData);

      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "Yes":
            var data: any = {
              "source": "patient_management",
              "data": {
                "id": this.allDataSource[index]._id,
                "biller_id": this.sendToBillerJson[index],
                "status": 2
              },
              "sourceobj": ["biller_id"],
              "token": this.authData
            };

            console.log("ooooooooooooooooo");

            this.http.httpViaPost('addorupdatedata', data).subscribe((response) => {
              if (response.status = "success") {
                let message = "Successfully Send";
                let action = "OK";
                this.matSnackBar.open(message, action, {
                  duration: 2000,
                });
              }
            });
            break;
          case "No":
            this.dialogRef.close();
            break;
        }
      });
    } else {
      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Please select a biller.",
          button1: { text: "" },
          button2: { text: "OK" },
        }
      };
      this.openModal(modalData);
    }
  }

  viewButton(index: number) {
    console.log("View Button...", this.allDataSource[index]);
  }

  downloadReport(report: any) {
    if(typeof(report.download_count) == "undefined") {
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
      if(response.status == 'success') {
        this.matSnackBar.open("Start downloading.", "Ok", {
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
      source: "Patient-Record-Report_view",
      condition: {
        biller_id: this.authData.user_details._id
      }
    };
    this.http.httpViaPost("biller-dashboard", postData).subscribe(response => {
      if(response.status == 'success') {
        this.allResolveData = response.data;
        //this.viewReportProcessData(this.htmlText.tableHeaderText);
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

}