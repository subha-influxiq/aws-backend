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
  selector: 'app-download-superbiller',
  templateUrl: './download-superbiller.component.html',
  styleUrls: ['./download-superbiller.component.css']
})
export class DownloadSuperbillerComponent implements OnInit {

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

    let loginCHeck: any = this.cookieService.getAll();
    if(Object.keys(loginCHeck).length > 0) {
      let userDetails = JSON.parse(loginCHeck.user_details);
      console.log("User Details >>>----->",  userDetails);
    }

    /* Check Route ID */
    if (typeof(this.activatedRoute.snapshot.params._id) != "undefined") {
      this.getData(this.activatedRoute.snapshot.params._id);
    } else {
      this.router.navigateByUrl('/login');
    }
    
    /* Check Password Attempts Count */
    let check: boolean = cookieService.check('passwordAttemptsCount');
    if(check == true) {
      this.htmlText.notBotText = this.commonFunction.randomNumber(6);
      this.htmlText.passwordAttemptsCount = this.cookieService.get('passwordAttemptsCount');
    }

    /* Get IP Address */
    this.http.httpViaGetExt("http://api.ipify.org/?format=json", {}).subscribe(response => {
      this.htmlText.ip = response.ip;
    });

    /* Get Temp Token */
    this.http.httpViaGet("gettemptoken", {}).subscribe(response => {
      this.htmlText.tempToken = response.token;
    });
  }

  ngOnInit() {
  }

  downloadPDF() {
    if((this.htmlText.password == this.reportData.download_password && this.reportData.passwordAttemptsCount <= 3) ||
    (this.htmlText.password == this.reportData.download_password && this.htmlText.notBotText == this.htmlText.notBotInput)) {
      this.htmlText.passwordAttemptsCount++;

      /* Right password */
      this.cookieService.delete('passwordAttemptsCount');
      this.htmlText.password = "";
      this.htmlText.notBotText = "";
      this.htmlText.notBotInput = "";

      /* Collect User Information for Download record */
      let deviceInfo: any = this.deviceService.getDeviceInfo();
      deviceInfo["isMobile"] = this.deviceService.isMobile();
      deviceInfo["isTablet"] = this.deviceService.isTablet();
      deviceInfo["isDesktop"] = this.deviceService.isDesktop();
      
      /* Set downloader information */
      var userDetails: any = {};
      let loginCheck: any = this.cookieService.getAll();
      if(Object.keys(loginCheck).length > 0) {
        let user_details = JSON.parse(loginCheck.user_details);
        userDetails["id"] = user_details._id;
        userDetails["type"] = user_details.type;
      } else {
        userDetails["id"] = this.reportData.biller_id;
        userDetails["type"] = "biller";
      }

      let postData: any = {
        "source": "report_download",
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
        "sourceobj": ["report_id", "biller_id", "tech_id", "doctor_id"],
        "token": this.htmlText.tempToken
      };

      this.http.httpViaPost("addorupdatedata", postData).subscribe(response => {
        if(response.status == 'success') {
          this.htmlText.downloadFlug = true;
          this.htmlText.hraderText = "Thank you for downloading.";
          window.open(this.reportData.file_path);
        } else {
          this.matSnackBar.open("Some error occord. Please try again.", "Ok", {
            duration: 3000
          });
        }
      });
    } else {
      /* Wrong Password */
      if(this.htmlText.password == '' || this.htmlText.password != this.reportData.download_password) {
        this.matSnackBar.open("Password is not valid.", "Ok", {
          duration: 3000
        });
      } else {
        if((this.htmlText.notBotInput == '' || this.htmlText.notBotText != this.htmlText.notBotInput) && 
        this.htmlText.passwordAttemptsCount >= 3) {
          this.matSnackBar.open("Chapcha is not valid.", "Ok", {
            duration: 3000
          });
        }
      }

      /* Make field numm */
      this.htmlText.password = "";
      this.htmlText.notBotInput = "";
      this.htmlText.passwordAttemptsCount++;
      this.cookieService.set('passwordAttemptsCount', this.htmlText.passwordAttemptsCount);

      /* Create New Chapcha */
      if(this.htmlText.passwordAttemptsCount >= 3) {
        this.htmlText.notBotText = this.commonFunction.randomNumber(6);
      }
      return false;
    }
  }
 
  /* Get Report Data */
  getData(reportID) {
    var data = {
      "source": "patient_management",
      "condition": {
        "_id": reportID
      }
    }

    this.http.httpViaPost("datalistwithouttoken", data).subscribe(response => {
      if(response.res.length > 0) {
        this.reportData = response.res[0];
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  changeChapcha(length) {
    this.htmlText.notBotText = this.commonFunction.randomNumber(length);
    this.htmlText.notBotInput = "";
  }

}
