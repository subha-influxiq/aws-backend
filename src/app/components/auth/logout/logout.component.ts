import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  status: boolean = true;
  public user_data: any = {};
  public loader: boolean = true;
  public user_cookie:any;

  constructor(public cookies: CookieService, public router: Router, public commonFunction: CommonFunction) { 
  }

  ngOnInit() {
    this.cookies.delete('jwtToken');
    this.cookies.delete('user_details');
    this.cookies.deleteAll();
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 1500);
  }
  
}

