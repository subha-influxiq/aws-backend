import { Component, OnInit } from '@angular/core';
import { UploadDialogBoxComponent } from '../../common/upload-dialog-box/upload-dialog-box.component';
import { MatDialog } from '@angular/material';
import { CommonFunction } from 'src/app/class/common/common-function';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-signature-management',
  templateUrl: './signature-management.component.html',
  styleUrls: ['./signature-management.component.css']
})
export class SignatureManagementComponent implements OnInit {

  public cookiesData: any;
  public cookies_id: any;
  public user_token: any;
  public DoctorSignedData: any = [];
  public buttonText :any="Add One";

  constructor(public dialog: MatDialog, public commonFunction: CommonFunction,
     public cookie: CookieService, public http: HttpServiceService) {
    let allcookies: any;
    allcookies = cookie.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);
    
    this.cookies_id = this.cookiesData._id;
    this.user_token = cookie.get('jwtToken');
    this.getDoctorSignedData();

    


    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
      width: '1000px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getDoctorSignedData() {
    var data = {
      "source": "doctor_signature",
      "condition": {
        "user_id_object": this.cookies_id
      },
      "token": this.user_token
    }
    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.DoctorSignedData =response.res; 
        if(this.DoctorSignedData.length ==1){
          this.buttonText = "Edit" ;
        }

      })
  }

}


 