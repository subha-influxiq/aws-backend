import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../../../environments/environment';
import { CommonFunction } from '../../../class/common/common-function';

@Component({
  selector: 'app-download-superbiller',
  templateUrl: './download-superbiller.component.html',
  styleUrls: ['./download-superbiller.component.css']
})
export class DownloadSuperbillerComponent implements OnInit {

  public htmlText: any = {
    notBotText: '',
    notBotInput: '',
    password: '',
    passwordAttemptsCount: 0,
    ip: '',
    tempToken: ''
  };

  public dialogRef: any;
  public reportData: any = [];

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute, public dialog: MatDialog, public commonFunction: CommonFunction, public deviceService: DeviceDetectorService) {
    /* CHeck Route ID */
    if (this.activatedRoute.snapshot.params._id) {
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
      /* Right password */
      this.cookieService.delete('passwordAttemptsCount');
      this.htmlText.password = "";
      this.htmlText.notBotText = "";
      this.htmlText.notBotInput = "";
      this.htmlText.passwordAttemptsCount = 0;

      /* Collect User Information for Download record */
      let deviceInfo: any = this.deviceService.getDeviceInfo();
      deviceInfo["isMobile"] = this.deviceService.isMobile();
      deviceInfo["isTablet"] = this.deviceService.isTablet();
      deviceInfo["isDesktop"] = this.deviceService.isDesktop();
      
      let postData: any = {
        "source": "report_download",
        "data": {
          "biller_id": this.reportData.biller_id,
          "tech_id": this.reportData.tech_id,
          "doctor_id": this.reportData.doctor_id,
          "ip": this.htmlText.ip,
          "device_information": deviceInfo
        },
        "sourceobj": ["biller_id", "tech_id", "doctor_id"],
        "token": this.htmlText.tempToken
      };

      this.http.httpViaPost("addorupdatedata", postData).subscribe(response => {
        if(response.status == 'success') {
          window.open(this.reportData.file_path);
        } else {
          var modalData: any = {
            panelClass: 'bulkupload-dialog',
            data: {
              header: "Message",
              message: "Some error occord. Please try again.",
              button1: { text: "" },
              button2: { text: "OK" },
            }
          }

          this.openModal(modalData);
        }
      });
    } else {
      /* Wrong Password */
      var modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Password is not valid.",
          button1: { text: "" },
          button2: { text: "OK" },
        }
      }

      this.htmlText.passwordAttemptsCount++;
      this.cookieService.set('passwordAttemptsCount', this.htmlText.passwordAttemptsCount);
      this.htmlText.password = "";

      if(this.htmlText.passwordAttemptsCount >= 3) {
        modalData.data.message = "Password is not valid. You’ve reached the maximum attempts.",
        this.htmlText.notBotText = this.commonFunction.randomNumber(6);
      }

      this.openModal(modalData);
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
      this.reportData = response.res[0];
    });
  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
  }

  changeChapcha(length) {
    this.htmlText.notBotText = this.commonFunction.randomNumber(length);
  }

}
