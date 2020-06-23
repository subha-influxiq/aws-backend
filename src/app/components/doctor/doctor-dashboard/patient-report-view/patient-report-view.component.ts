import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service'
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { CommonFunction } from '../../../../class/common/common-function';
import { environment } from '../../../../../environments/environment';
import { type } from 'os';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-patient-report-view',
  templateUrl: './patient-report-view.component.html',
  styleUrls: ['./patient-report-view.component.css']
})

export class PatientReportViewComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  public htmlText: any = { 
    nav: 'Add Patient', 
    header: "Physician Report",
    allResolveData: "",
    sliderCount: 0,
    sendToBiller: true,
    sendButton: [ "Sign & Back", "Sign & Next" ],
    defaultLoadingImage: "https://www.drupal.org/files/issues/throbber_12.gif"
  };
  public cookiesData: any = {};

  public dialogRef: any;
  public reportID: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {

    this.cookiesData = this.cookie.getAll();
    this.cookiesData.user_details = JSON.parse(this.cookiesData.user_details);
    
    if(this.cookiesData.user_details.user_type == 'doctor' || this.cookiesData.user_details.user_type == 'diagnostic_admin') {
      this.getBiller(this.cookiesData.user_details._id);
    }

    if((typeof(this.cookiesData.doctor_signature) == 'undefined' || this.cookiesData.doctor_signature == '') && 
    this.cookiesData.user_details.user_type == 'doctor' && typeof(this.cookiesData.user_details.diagnostic_admin_id) == 'undefined') {
      /* Open modal */
      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Please upload your signature first.",
          button1: { text: "Upload" },
          button2: { text: "Close" },
        }
      }
      this.openModal(modalData);

      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "Upload":
            this.dialogRef.close();
            this.router.navigateByUrl('/doctor/signature-management?view=' + activeRoute.snapshot.params._id);
            break;
          case "Close":
            this.dialogRef.close();
            this.router.navigateByUrl('/doctor/dashboard');
            break;
        }
      });
    }
  }

  ngOnInit() {
    this.activeRoute.data.forEach((data) => {
      this.htmlText.allResolveData = data.data.data;
      
      for(let loopIndex in this.htmlText.allResolveData.reportData[0].images) {
        this.htmlText.allResolveData.reportData[0].images[loopIndex].image_url = this.htmlText.allResolveData.reportData[0].file_basepath + this.htmlText.allResolveData.reportData[0].images[loopIndex].name;
        this.htmlText.allResolveData.reportData[0].images[loopIndex].show = false;
      }
      
      this.htmlText.orginalData = data.data.data_2[0];

      if(typeof(this.cookiesData.doctor_signature) != 'undefined') {
        this.htmlText.orginalData.doctor_signature = this.cookiesData.doctor_signature;
      } else {
        this.htmlText.orginalData.doctor_signature = "";
      }

      if(typeof(this.htmlText.allResolveData.reportData[0].stressi) != 'undefined') {
        this.htmlText.allResolveData.reportData[0].stressI = this.htmlText.allResolveData.reportData[0].stressi;
      }

      var BMI_flag: number = this.htmlText.allResolveData.reportData[0].BMI * 10;
      this.htmlText.allResolveData.reportData[0].BMI_flag = BMI_flag;
    });

    if(typeof(this.cookiesData.user_details.diagnostic_admin_id) != 'undefined') {
      this.htmlText.sendToBiller = false;
    }
  }

  getBiller(id: any) {
    var data = {
      "source": "biller_by_doctor_id",
      "condition": {
        "_id_object": id
      },
      "token": this.cookiesData.jwtToken
    };

    if(this.cookiesData.user_details.user_type == 'diagnostic_admin') {
      data.condition["diagnostic_admin_id_object"] = this.cookiesData.user_details._id;
      delete data.condition._id_object;

      this.htmlText.sendButton[0] = "Send & Back";
      this.htmlText.sendButton[1] = "Send & Next";
    }

    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
      this.htmlText.billers = response.res;
    });
  }

  playSlider(action: string) {
    switch (action) {
      case 'preview':
        if (this.htmlText.sliderCount == 0) {
          this.htmlText.sliderCount = this.htmlText.allResolveData.reportData[0].images.length - 1;
        } else {
          this.htmlText.sliderCount--;
        }
        break;
      case 'next':
        if (this.htmlText.sliderCount + 1 == this.htmlText.allResolveData.reportData[0].images.length) {
          this.htmlText.sliderCount = 0;
        } else {
          this.htmlText.sliderCount++;
        }
        break;
    }
  }

  reportSign(flug: any = 'default') {
    if(typeof this.htmlText.billers !== 'undefined' && this.htmlText.billers != '') {
      var billerName = this.htmlText.billers[this.htmlText.billerArrayIndex].firstname + ' ' + this.htmlText.billers[this.htmlText.billerArrayIndex].lastname;
      var billerEmail = this.htmlText.billers[this.htmlText.billerArrayIndex].email;
      var billerID = this.htmlText.billers[this.htmlText.billerArrayIndex].biller_id;

      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Do you want to send this report to biller: " + billerName + " ?",
          button1: { text: "Yes" },
          button2: { text: "No" },
        }
      };
      this.openModal(modalData);

      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "Yes":
            var data: any = {
              "source": "data_pece",
              "data": { 
                "bill_generation_date": new Date(),
                "bill_sent_date": new Date(),
                "doctor_signature": this.cookiesData.doctor_signature, 
                "biller_id": billerID,
                "biller_name": billerName,
                "biller_email": billerEmail,
                "download_link" : environment.siteBaseUrl + 'download/super-bill/' + this.htmlText.allResolveData.reportData[0]._id,
                "file_path": "",
                "download_password": "",
                "details": this.htmlText.allResolveData.details,
                "provide_description": this.htmlText.allResolveData.provide_description,
                "status": "Send to Biller"
              },
              "report_id": this.htmlText.allResolveData.reportData[0]._id
            };

            data.data["id"] = this.activeRoute.snapshot.params._id;
            this.httpService.httpViaPost("report-sign-send-to-biller", data).subscribe((response) => {
              if (response.status = "success") {
                switch(flug) {
                  case 'back':
                    this.dialogRef.close();
                    this.router.navigateByUrl('/doctor/dashboard');
                    break;
                  case 'next':
                    this.dialogRef.close();
                    this.router.navigateByUrl('/doctor/dashboard');
                    break;
                  default:
                    break;
                }
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
          message: "Select a biller first.",
          button1: { text: "" },
          button2: { text: "OK" },
        }
      }
      this.openModal(modalData);
    }
  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
  }
// sticky scroll
isSticky: boolean = false;

@HostListener('window:scroll', ['$event'])
checkScroll() {
  this.isSticky = window.pageYOffset >= 250;
}
}
