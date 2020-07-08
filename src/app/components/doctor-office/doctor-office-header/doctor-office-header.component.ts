import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';

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
  
  constructor(public cookies: CookieService, public router: Router, public commonFunction: CommonFunction,public activate: ActivatedRoute) {
    let allData: any = {};
    allData = cookies.getAll()
    this.user_data = JSON.parse(allData.user_details);
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

}
