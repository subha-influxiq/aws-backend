import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonFunction } from '../../../class/common/common-function';
import { Router, ActivatedRoute ,ActivatedRouteSnapshot} from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import * as momentImported from 'moment';
const moment = momentImported;

@Component({
  selector: 'app-biller-dashboard',
  templateUrl: './biller-dashboard.component.html',
  styleUrls: ['./biller-dashboard.component.css']
})

export class BillerDashboardComponent implements OnInit {

  public htmlText: any = {
    tableHeaderText: "Patient Reports"
  };
  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };
  public loginUserData: any = {};
  public allResolveData: any;
  public dialogRef: any;

  displayedColumns: string[] = ['no', 'Patient Name', 'Doctor Name', 'Tech Name', 'Bill Sent Date', 'Bill Generation Date', 'Status','report_type', 'Action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  /* Initializing the datasource to null */
  dataSource = null;

  constructor(public http: HttpClient, public commonFunction: CommonFunction, public activatedRoute: ActivatedRoute, 
    public cookieService: CookieService, public httpService: HttpServiceService, public deviceService: DeviceDetectorService,
    public matSnackBar: MatSnackBar) {
    
      /* Get and set login User Data */
    this.loginUserData["user_details"] = JSON.parse(this.cookieService.get('user_details'));
    this.loginUserData["jwtToken"] = this.cookieService.get('jwtToken');

    /* Get IP Address */
    this.httpService.httpViaGetExt("http://api.ipify.org/?format=json", {}).subscribe(response => {
      this.htmlText.ip = response.ip;
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.billerData.data;
      
      this.viewReportData();
    });
  }

  viewReportData(flug: string = "Patient Reports", paginationOption: any = null) {
    this.htmlText.tableHeaderText = flug;

    if(this.searchJson.dateRange != '') {
      this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
    }

    // Request Condition
    var repostSignCond: any = {
      "source": "data_pece",
      "token": this.loginUserData.jwtToken,
      "search": this.searchJson,
      "condition": {
        "report_type": { $exists: true },
        "biller_id": this.loginUserData.user_details._id,
      },
      "pagination": {
        "skip": 0,
        "limit": 50
      }
    };

    switch(flug) {
      case 'Total Downloaded':
        repostSignCond.condition.download_count = {
          "download_count": { $exists: true }
        };
        break;
      case 'Not Downloaded':
        repostSignCond.condition.download_count = {
          "download_count": { $exists: false }
        };
        break;
      default:
        break;
    }

    this.httpService.httpViaPost('dashboard-datalist', repostSignCond).subscribe((response) => {
      /* Fetching the data into table */
      this.dataSource = new MatTableDataSource(response.data);
      /* Adding the paginator options */
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
      id: this.loginUserData.user_details._id,
      type: this.loginUserData.user_details.type
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

    this.httpService.httpViaPost("addorupdatedata", postData).subscribe(response => {
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
      source: "data_pece",
      condition: {
        biller_id: this.loginUserData.user_details._id
      }
    };

    this.httpService.httpViaPost("biller-dashboard", postData).subscribe(response => {
      if(response.status == 'success') {
        this.viewReportData(this.htmlText.tableHeaderText);
        this.allResolveData = response.data;
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
    this.viewReportData(this.htmlText.tableHeaderText);
  }

}
