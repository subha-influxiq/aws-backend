import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(public cookies: CookieService, public router: Router) { 
    let allData: any = {};
    allData = this.cookies.getAll();
    this.user_data = JSON.parse(allData.user_details);
    this.user_cookie = cookies.get('jwtToken');
  }

  ngOnInit() {
  }

  myFunction() {
  }
  
  /**logout function start here**/
  logout() {
    this.cookies.delete('jwtToken');
    this.cookies.delete('user_details');
    this.cookies.deleteAll();
    this.router.navigateByUrl('login');
  }
  /**logout function end here**/

  menuFunction() {
    console.log('Working on it.');
    this.status = !this.status;  
  }
  
  
}
