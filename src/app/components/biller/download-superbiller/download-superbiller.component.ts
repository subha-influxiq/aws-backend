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
    failedPassword: 0,
    ip: '',
  };
  public dialogRef: any;
  public reportData: any = [];

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute, public dialog: MatDialog, public commonFunction: CommonFunction, public deviceService: DeviceDetectorService) {
    let check: boolean = cookieService.check('downloadCount');
    if(check == true) {
      this.htmlText.notBotText = this.commonFunction.randomNumber(6);
      this.htmlText.failedPassword = this.cookieService.get('downloadCount');
    }
    
    if (this.activatedRoute.snapshot.params._id) {
      this.getData(this.activatedRoute.snapshot.params._id);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    this.http.httpViaGetExt("http://api.ipify.org/?format=json", {}).subscribe(response => {
      this.htmlText.ip = response.ip;
      this.epicFunction();
    });
  }

  downloadPDF() {
    if(this.htmlText.password == this.reportData.download_password) {
      /* Right password */
      this.cookieService.delete('downloadCount');
      this.htmlText.password = "";
      window.open(this.reportData.file_path);
    } else {
      /* Wrong Password */
      var modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Invalid Password.",
          button1: { text: "" },
          button2: { text: "OK" },
        }
      }

      this.htmlText.failedPassword++;
      this.cookieService.set('downloadCount', this.htmlText.failedPassword);
      this.htmlText.password = "";

      if(this.htmlText.failedPassword >= 3) {
        modalData.message = "Invalid Password. You’ve reached the maximum attempts.",
        this.htmlText.notBotText = this.commonFunction.randomNumber(6);
      }

      this.openModal(modalData);
    }
  }
  
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

  deviceInfo = null;
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

}
