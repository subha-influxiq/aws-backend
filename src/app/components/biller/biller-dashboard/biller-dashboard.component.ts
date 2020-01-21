import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonFunction } from '../../../class/common/common-function';
import { Router, ActivatedRoute ,ActivatedRouteSnapshot} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-biller-dashboard',
  templateUrl: './biller-dashboard.component.html',
  styleUrls: ['./biller-dashboard.component.css']
})

export class BillerDashboardComponent implements OnInit {

  public htmlText: any = {
    tableHeaderText: "Patient Reports",
    ip: ''
  };
  public loginUserData: any = {};
  public allResolveData: any;
  public dialogRef: any;

  displayedColumns: string[] = ['Patient Name', 'Doctor Name', 'Tech Name', 'Bill Sent Date', 'Bill Generation Date', 'Status','report_type', 'Action'];
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
      
      /* Fetching the data into table */
      this.dataSource = new MatTableDataSource(this.allResolveData.reportData);
      /* Adding the paginator options */
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  viewReportData(flug: string = "Patient Reports") {
    this.htmlText.tableHeaderText = flug;
    var data: any;
    switch(flug) {
      case 'Total Downloaded':
        data = {
          "source": "Patient-Record-Report_view",
          "token": this.loginUserData.jwtToken,
          "condition": {
            "biller_id_object": this.loginUserData.user_details._id,
            "download_count": { $exists: true }
          }
        }
        break;
      case 'Not Downloaded':
        data = {
          "source": "Patient-Record-Report_view",
          "token": this.loginUserData.jwtToken,
          "condition": {
            "biller_id_object": this.loginUserData.user_details._id,
            "download_count": { $exists: false }
          }
        }
        break;
      default:
        data = {
          "source": "Patient-Record-Report_view",
          "token": this.loginUserData.jwtToken,
          "condition": {
            "biller_id_object": this.loginUserData.user_details._id
          }
        }
        break;
    }

    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
      /* Fetching the data into table */
      this.dataSource = new MatTableDataSource(response.res);
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
      source: "Patient-Record-Report_view",
      condition: {
        biller_id: this.loginUserData.user_details._id
      }
    };
    this.httpService.httpViaPost("biller-dashboard", postData).subscribe(response => {
      if(response.status == 'success') {
        this.allResolveData = response.data;
        this.viewReportData(this.htmlText.tableHeaderText);
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

}
