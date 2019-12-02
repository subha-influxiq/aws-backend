import { Component, OnInit, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

export class AdminHeaderComponent implements OnInit {

  status: boolean = true;
  public user_data: any = {};
  public loader: boolean = true;
  public user_cookie:any;

  constructor(public cookies: CookieService, public router: Router, public commonFunction: CommonFunction) {
    window.scroll(0, 0);
    let allData: any = {};
    allData = this.cookies.getAll();
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

}
