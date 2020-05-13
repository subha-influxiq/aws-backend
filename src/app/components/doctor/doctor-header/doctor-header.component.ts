import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})

export class DoctorHeaderComponent implements OnInit {

  public toggleStatus:boolean = false;
  public user_data: any = {
    diagnostic_admin_id:"",
    firstname:"",
    lastname:""
  };

  public loader: boolean = true;
  public user_cookie:any;
  status: boolean = true;
  isSticky: boolean = false;

  constructor(public cookies: CookieService, public router: Router) {
    let allData: any = cookies.getAll()
    this.user_data.firstname = JSON.parse(allData.firstname);
    this.user_data.lastname = JSON.parse(allData.lastname);
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
