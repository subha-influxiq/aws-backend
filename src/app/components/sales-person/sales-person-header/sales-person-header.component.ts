import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sales-person-header',
  templateUrl: './sales-person-header.component.html',
  styleUrls: ['./sales-person-header.component.css']
})
export class SalesPersonHeaderComponent implements OnInit {

  public toggleStatus:boolean = false;
  public user_data: any = {};

  public loader: boolean = true;
  public user_cookie:any;
  status: boolean = true;
  isSticky: boolean = false;

  constructor(public cookies: CookieService, public router: Router) {
    let allData: any = cookies.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.user_cookie = cookies.get('jwtToken');
    this.user_data["headerFlag"] = typeof(this.user_data.diagnostic_admin_id);
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
