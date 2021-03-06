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
    this.authData["doctorSignature"] = cookie.get('doctor_signature');

    if(typeof this.authData.doctorSignature !== 'undefined') {
      this.htmlText.buttonText = "Update Signature";
      this.htmlText.viewSign = this.authData.doctorSignature;
    }
  }

  ngOnInit() {
  }

  updateSignature() {
    if(typeof this.htmlText.viewSign !== 'undefined' && this.htmlText.viewSign != '') {
      var data = {
        "source": "data_pece",
        "data": {
          "id": this.authData.user_details._id,
          "doctor_signature": this.htmlText.viewSign
        },
        "token": this.authData.jwtToken
      }
      this.http.httpViaPost('addorupdatedata', data).subscribe(response => {
          if(response.status == "success") {
            console.log("SIGN: ", this.htmlText.viewSign);
            this.cookie.set('doctor_signature', this.htmlText.viewSign);
            
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
      this.htmlText.errorMessage = "Please write your signature.";
    } else {
      this.htmlText.errorMessage = "";
    }
  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Ok":
          this.dialogRef.close();

          this.activatedRoute.queryParams.subscribe(getData => {
            this.router.navigateByUrl('/doctor/dashboard');
          });
          break;
      }
    });
  }

}


 