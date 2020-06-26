import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../../../environments/environment';
import { CommonFunction } from '../../../class/common/common-function';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-direct-download-reports',
  templateUrl: './direct-download-reports.component.html',
  styleUrls: ['./direct-download-reports.component.css']
})
export class DirectDownloadReportsComponent implements OnInit {

  public htmlText: any = {
    hraderText: 'Enter Password to Download the Report',
    notBotText: '',
    notBotInput: '',
    password: '',
    passwordAttemptsCount: 0,
    ip: '',
    tempToken: '',
    downloadFlug: false
  };

  public dialogRef: any;
  public reportData: any = [];

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService,
    public activatedRoute: ActivatedRoute, public dialog: MatDialog, public commonFunction: CommonFunction,
    public deviceService: DeviceDetectorService, public matSnackBar: MatSnackBar) {

    let loginCheck: any = this.cookieService.getAll();
    if (typeof (loginCheck.user_details) != 'undefined') {
      let userDetails = JSON.parse(loginCheck.user_details);
    }
    this.htmlText.tempToken = loginCheck.jwtToken;

    /* Check Route ID */
    if (typeof (this.activatedRoute.snapshot.params._id) != "undefined") {
      this.getData(this.activatedRoute.snapshot.params._id);
    } else {
      this.router.navigateByUrl('/login');
    }

    /* Get IP Address */
    this.http.httpViaGetExt("http://api.ipify.org/?format=json", {}).subscribe(response => {
      this.htmlText.ip = response.ip;
    });
  }

  ngOnInit() {
  }

  downloadPDF() {
    /* Collect User Information for Download record */
    let deviceInfo: any = this.deviceService.getDeviceInfo();
    deviceInfo["isMobile"] = this.deviceService.isMobile();
    deviceInfo["isTablet"] = this.deviceService.isTablet();
    deviceInfo["isDesktop"] = this.deviceService.isDesktop();

    /* Set downloader information */
    var userDetails: any = {};
    let loginCheck: any = this.cookieService.getAll();
    if (typeof (loginCheck.user_details) != 'undefined') {
      let user_details = JSON.parse(loginCheck.user_details);
      userDetails["id"] = user_details._id;
      userDetails["type"] = user_details.type;
    } else {
      userDetails["id"] = this.reportData.biller_id;
      userDetails["type"] = "biller";
    }

    if (typeof (this.reportData.download_count) == "undefined") {
      this.reportData.download_count = 1;
    } else {
      this.reportData.download_count = this.reportData.download_count + 1;
    }

    let postData: any = {
      "source": "data_report_download_details",
      "data": {
        "report_id": this.activatedRoute.snapshot.params._id,
        "biller_id": this.reportData.biller_id,
        "tech_id": this.reportData.tech_id,
        "doctor_id": this.reportData.doctor_id,
        "ip": this.htmlText.ip,
        "download_attempt": this.htmlText.passwordAttemptsCount,
        "downloader_information": userDetails,
        "device_information": deviceInfo
      },
      "download_count": this.reportData.download_count,
      "sourceobj": ["report_id", "biller_id", "tech_id", "doctor_id"],
      "token": this.htmlText.tempToken
    };

    this.http.httpViaPost("addorupdatedata", postData).subscribe(response => {
      if (response.status == 'success') {
        // Update Status
        let postData: any = {
          "source": "data_pece",
          "report_id": this.activatedRoute.snapshot.params._id,
          "token": this.htmlText.tempToken
        };
        this.http.httpViaPost("direct-download-report", postData).subscribe(response => {
          if(response.status == true) {
            this.matSnackBar.open("Downloading...", "", {
              duration: 2000
            });

            console.log("Link: ", this.reportData.report_download_link);
            // Open download link into the new tab
            window.open(this.reportData.report_download_link);

            setTimeout(() => {
              this.router.navigateByUrl('/biller/dashboard');
            }, 100);
          }
        });
      } else {
        this.matSnackBar.open("Some error occord. Please try again.", "Ok", {
          duration: 3000
        });
      }
    });
  }

  /* Get Report Data */
  getData(reportID) {
    var data = {
      "source": "data_pece",
      "condition": {
        "_id": reportID
      }
    }

    this.http.httpViaPost("datalistwithouttoken", data).subscribe(response => {
      if (response.res.length > 0) {
        this.reportData = response.res[0];

        // Process Download
        this.downloadPDF();
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

}
