import { Component, OnInit } from '@angular/core';
import { UploadDialogBoxComponent } from '../../common/upload-dialog-box/upload-dialog-box.component';
import { MatDialog , MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonFunction } from 'src/app/class/common/common-function';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signature-management',
  templateUrl: './signature-management.component.html',
  styleUrls: ['./signature-management.component.css']
})
export class SignatureManagementComponent implements OnInit {

  public authData: any = {};
  public DoctorSignedData: any = [];
  public htmlText: any = {
    buttonText: "Add Signature"
  };

  /* Modal */
  public dialogRef: any;

  constructor(public dialog: MatDialog, public commonFunction: CommonFunction,
     public cookie: CookieService, public http: HttpServiceService, public activatedRoute: ActivatedRoute, public router: Router) {
    let allcookies: any = cookie.getAll();
    this.authData["user_details"] = JSON.parse(cookie.get('user_details'));
    this.authData["jwtToken"] = cookie.get('jwtToken');

    console.log(this.authData.user_details.doctor_signature);
    if(typeof this.authData.user_details.doctor_signature !== 'undefined') {
      this.htmlText.buttonText = "Update Signature";
      this.htmlText.viewSign = this.authData.user_details.doctor_signature;
    }
  }

  ngOnInit() {
  }

  updateSignature() {
    if(typeof this.htmlText.viewSign !== 'undefined') {
      var data = {
        "source": "users",
        "data": {
          "id": this.authData.user_details._id,
          "doctor_signature": this.htmlText.viewSign
        },
        "token": this.authData.jwtToken
      }
      this.http.httpViaPost('addorupdatedata', data).subscribe(response => {
          if(response.status == "success") {
            console.log("cookie>>>", this.authData.user_details);
            this.authData.user_details.doctor_signature = this.htmlText.viewSign;
            let str = JSON.stringify(this.authData.user_details);
            this.cookie.set('user_details', str);

            /* Open modal */
            let modalData: any = {
              panelClass: 'bulkupload-dialog',
              data: {
                header: "Message",
                message: "Signature uploaded successfully.",
                button1: { text: "" },
                button2: { text: "Ok" },
              }
            }
            this.openModal(modalData);
          }
        });
    } else {
      this.htmlText.errorMessage = "Please write your signature."
    }
  }

  removeErrorMessage() {
    if(typeof this.htmlText.viewSign === 'undefined' || this.htmlText.viewSign.length == 0) {
      this.htmlText.errorMessage = "Please write your signature."
    } else {
      this.htmlText.errorMessage = ""
    }
  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Ok":
          this.dialogRef.close();

          this.activatedRoute.queryParams.subscribe(getData => {
            this.router.navigateByUrl('/doctor/patient-record-report/' + getData['view']);
          });
          break;
      }
    });
  }

}


 