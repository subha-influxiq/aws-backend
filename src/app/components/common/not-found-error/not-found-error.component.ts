import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { type } from 'os';

@Component({
  selector: 'app-not-found-error',
  templateUrl: './not-found-error.component.html',
  styleUrls: ['./not-found-error.component.css']
})
export class NotFoundErrorComponent implements OnInit {

  public userData: any = {};
  public jwtToken: any = '';
  public htmlData: any = {};
  
  constructor(public cookie : CookieService, public activatedRoute: ActivatedRoute, public router: Router) { 
    this.htmlData["year"] = new Date().getFullYear();
    let allcookies: any = cookie.getAll();

    if(typeof allcookies.user_details != 'undefined') {
      this.userData = JSON.parse(allcookies.user_details);
      this.jwtToken = allcookies.jwtToken;
    } else {
      this.userData = { user_type: "" };
      this.jwtToken = "";
    }
  }

  ngOnInit() {
  }

  gotoHome() {
    this.router.navigateByUrl('/login');
  }

}
