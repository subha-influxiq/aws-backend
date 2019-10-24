import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tech-header',
  templateUrl: './tech-header.component.html',
  styleUrls: ['./tech-header.component.css']
})

export class TechHeaderComponent implements OnInit {

  public user_data: any = {};

  public loader: boolean = true;
  public user_cookie:any;
  constructor(public cookies: CookieService, public router: Router) {
    let allData: any = {};
    allData = cookies.getAll()
    this.user_data = JSON.parse(allData.user_details);
    console.log("okkkkk",this.user_data)
    this.user_cookie = cookies.get('jwtToken');
   }

  ngOnInit() {
  }
  
  /**logout function start here**/
  logout() {
    this.cookies.deleteAll();
    this.router.navigateByUrl('/login');
  }
  /**logout function end here**/

}
