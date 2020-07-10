import { Component, OnInit, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: 'app-diagnostic-admin-header',
  templateUrl: './diagnostic-admin-header.component.html',
  styleUrls: ['./diagnostic-admin-header.component.css']
})
export class DiagnosticAdminHeaderComponent implements OnInit {

  status: boolean = true;
  public user_data: any = {};
  public loader: boolean = true;
  public user_cookie:any;
  public dialogRef: any;
  public main_user: any = {
    flag: false,
    data: {},
    buttonText: "Rerurn to Admin"
  };

  constructor(public cookies: CookieService, public router: Router, public commonFunction: CommonFunction, public dialog: MatDialog) {
    window.scroll(0, 0);
    let allData: any = {};
    allData = this.cookies.getAll();
    if(typeof(allData.main_user) != 'undefined') {
      this.main_user.data = allData.main_user;
      this.main_user.flag = true;
    }
    this.user_data = JSON.parse(allData.user_details);
    this.user_cookie = cookies.get('jwtToken');
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
    setTimeout(() => {
      this.router.navigateByUrl('logout');
    }, 1000);
  }
  /**logout function end here**/

  // don't remove it's for menu toggleing
  menuFunction(){
    this.status = !this.status;

  }

   // sticky section
   isSticky: boolean = false;

  //  @HostListener('window:scroll', ['$event'])
  //  checkScroll() {
  //    this.isSticky = window.pageYOffset >= 20;
  //  }

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
          this.cookies.deleteAll('/diagnostic_admin');

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
