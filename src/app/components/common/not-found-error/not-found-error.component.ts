import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found-error',
  templateUrl: './not-found-error.component.html',
  styleUrls: ['./not-found-error.component.css']
})
export class NotFoundErrorComponent implements OnInit {
public cookiesData : any;
public userToken : any;
  constructor(public cookie : CookieService, public activatedRoute: ActivatedRoute, public router: Router) { 
    this.userToken = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);
    console.log("token data",this.cookiesData.type);
  }

  ngOnInit() {
  }

  gotoHome() {
    this.router.navigateByUrl('/' + this.cookiesData.type + '/dashboard');
  }

}
