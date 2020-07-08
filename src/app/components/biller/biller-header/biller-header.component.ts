import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-biller-header',
  templateUrl: './biller-header.component.html',
  styleUrls: ['./biller-header.component.css']
})

export class BillerHeaderComponent implements OnInit {

  public toggleStatus:boolean = false;
  public user_data: any = {};
  public flag:any=0;

  public loader: boolean = true;
  public user_cookie:any;
  status: boolean = true;
  isSticky: boolean = false;

  constructor(public cookies: CookieService, public router: Router,public activate: ActivatedRoute) {
    let allData: any = cookies.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.user_cookie = cookies.get('jwtToken');
    this.user_data["headerFlag"] = typeof(this.user_data.diagnostic_admin_id);
    if(this.activate.snapshot.routeConfig.path == "admin/biller-dashboard/:_id") {
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

}
