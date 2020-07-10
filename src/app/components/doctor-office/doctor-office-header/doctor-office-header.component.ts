import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: 'app-doctor-office-header',
  templateUrl: './doctor-office-header.component.html',
  styleUrls: ['./doctor-office-header.component.css']
})

export class DoctorOfficeHeaderComponent implements OnInit {

  public toggleStatus:boolean = false;
  isSticky: boolean = false;
  public user_data: any = {};
  public flag:any =0;

  public loader: boolean = true;
  public user_cookie:any;

  public dialogRef: any;
  public main_user: any = {
    flag: false,
    data: {},
    buttonText: "Rerurn to Admin"
  };
  
  constructor(public cookies: CookieService, public router: Router, public commonFunction: CommonFunction,public activate: ActivatedRoute,public dialog: MatDialog) {
    let allData: any = {};
    allData = cookies.getAll()
    this.user_data = JSON.parse(allData.user_details);
    if(typeof(allData.main_user) != 'undefined') {
      this.main_user.data = allData.main_user;
      this.main_user.flag = true;
    }
    this.user_cookie = cookies.get('jwtToken');
    if(this.activate.snapshot.routeConfig.path == "admin/biller-dashboard/:_id") {
      this.flag = 1;
    }

    console.log(">>>", this.user_data);
   }

  ngOnInit() {
    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
  }
  
  /**logout function start here**/
  logout() {
    this.cookies.delete('jwtToken');
    this.cookies.delete('user_details');
    this.cookies.deleteAll();
    this.router.navigateByUrl('logout');
  }
  /**logout function end here**/

  /* Dashboard redirect */
  toDashboard(){
    this.router.navigateByUrl('/doctor-office/dashboard');
  }

  menuFunction(){
    this.toggleStatus = !this.toggleStatus;
  }

  returnToAdmin() {
    let modalData: any = {
      panelClass: 'bulkupload-dialog',
      data: {
        header: "Alert",
        message: "Do you want to return to admin?",
        button1: { text: "Yes" },
        button2: { text: "No" },
      }
    }
    this.openModal(modalData);

    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Yes":
          let jwtToken = this.cookies.get('jwtToken');
          let allData = this.cookies.getAll();
          let main_user = JSON.parse(allData.main_user);
          let secret = this.cookies.get('secret');

          // Delete Cookie
          this.cookies.delete('user_details');
          this.cookies.delete('main_user');
          this.cookies.delete('doctor_signature');
          this.cookies.delete('secret');
          this.cookies.delete('jwtToken');
          this.cookies.deleteAll('/doctor_office');

          setTimeout(() => {
            // Reset again Cookie
            this.cookies.set('jwtToken', jwtToken);
            this.cookies.set('user_details', JSON.stringify(main_user));
            this.cookies.set('secret', JSON.stringify(secret));

            // Redirect to page
            this.router.navigateByUrl("admin/dashboard");
          }, 500);
          break;
        case "No":
          this.dialogRef.close();
          break;
      }
    });
  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
  }

}
