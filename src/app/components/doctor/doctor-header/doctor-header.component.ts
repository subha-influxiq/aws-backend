import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { type } from 'os';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})

export class DoctorHeaderComponent implements OnInit {

  public toggleStatus:boolean = false;
  public user_data: any = {
  };

  public dialogRef: any;
  public main_user: any = {
    flag: false,
    data: {},
    buttonText: "Rerurn to Admin"
  };

  public loader: boolean = true;
  public flag: any = 0;
  public user_cookie:any;
  status: boolean = true;
  isSticky: boolean = false;

  constructor(public cookies: CookieService, public router: Router, public activate: ActivatedRoute, public dialog: MatDialog) {
    let allData: any = cookies.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.user_cookie = cookies.get('jwtToken');

    if(typeof(allData.main_user) != 'undefined') {
      this.main_user.data = allData.main_user;
      this.main_user.flag = true;
    }

    this.user_data["headerFlag"] = typeof(this.user_data.diagnostic_admin_id);
    if(this.activate.snapshot.routeConfig.path == "admin/doctor-dashboard/:_id") {
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

          // Delete Cookie
          this.cookies.delete('user_details');
          this.cookies.delete('main_user');
          this.cookies.delete('jwtToken');
          this.cookies.deleteAll('/');

          setTimeout(() => {
            // Reset again Cookie
            this.cookies.set('jwtToken', jwtToken);
            this.cookies.set('user_details', JSON.stringify(main_user));

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
