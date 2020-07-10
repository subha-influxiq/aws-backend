import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";


@Component({
  selector: 'app-tech-header',
  templateUrl: './tech-header.component.html',
  styleUrls: ['./tech-header.component.css']
})

export class TechHeaderComponent implements OnInit {

  public user_data: any = {};

  public loader: boolean = true;
  public dialogRef: any;
  public main_user: any = {
    flag: false,
    data: {},
    buttonText: "Rerurn to Admin"
  };

  
  public user_cookie:any;
  isSticky: boolean = false;
  status: boolean = true;
  public flag:any = 0;

  constructor(public cookies: CookieService, public router: Router, public activate: ActivatedRoute,public dialog: MatDialog) {
    let allData: any = {};
    allData = cookies.getAll()
    this.user_data = JSON.parse(allData.user_details);
    if(typeof(allData.main_user) != 'undefined') {
      this.main_user.data = allData.main_user;
      this.main_user.flag = true;
    }
    this.user_cookie = cookies.get('jwtToken');
    if(this.activate.snapshot.routeConfig.path == "admin/tech-dashboard/:_id") {
      this.flag = 1;
    }
   }

  ngOnInit() {
  }

  /**logout function start here**/
  logout() {
    this.cookies.delete('jwtToken');
    this.cookies.delete('user_details');
    this.cookies.deleteAll();
    this.router.navigateByUrl('logout');
  }
  /**logout function end here**/

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
          this.cookies.deleteAll('/tech');

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

  menuFunction(){
    this.status = !this.status;

  }
  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
  }

}

