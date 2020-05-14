import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../../../class/common/common-function';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public logo: any = './assets/images/logo.png';
  public ipinfoid = '9797c42b93078a';
  public fromTitle: any = "Login Here";    // This is a From Title
  public fullUrl: any = environment.apiBaseUrl;  // server url
  public endpoint: any = "login";
  public buttonName: any = 'Login Button';
  public defaultLoginUrl = '/login';

  public signUpRouteingUrl: any = {
    "path": "",
    // "buttonName": "",
    "customLink": "",
    // "customURl": ""
  };
  public forgetRouteingUrl: any = {
    "path": "",
    "buttonName": "Forget Password",
    "customLink": "/forget-password",
  };

  public routerStatus: any;

  constructor(public cookies: CookieService, public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.routerStatus = {           // this is use for if login succcess then navigate which page
      "data": [
        {
          "user_type": "admin",
          "routerNav": "admin/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken',firstname: 'firstname',lastname: 'lastname',user_details:'user_details'}
        },
        {
          "user_type": "doctor",
          "routerNav": "doctor/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken',tech_id:"tech_id",parent_type:"parent_type",firstname: 'firstname',lastname: 'lastname',user_details:"user_details"}
        },
        {
          "user_type": "tech",
          "routerNav": "tech/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        },
        {
          "user_type": "biller",
          "routerNav": "biller/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        },
        {
          "user_type": "doctor_office",
          "routerNav": "doctor-office/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        },
        {
          "user_type": "diagnostic_admin",
          "routerNav": "diagnostic-admin/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        },
        {
          "user_type": "doctor_group",
          "routerNav": "doctor-group/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwttoken:'jwttoken'}
        },
        {
          "user_type": "sales_person",
          "routerNav": "sales-person/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        },
        {
          "user_type": "doctor_group",
          "routerNav": "doctor-group/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        },
        {
          "user_type": "distributors",
          "routerNav": "distributors/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        },
        {
          "user_type": "admin_biller",
          "routerNav": "admin-biller/dashboard",
          cookies: {_id:'_id',user_type:"user_type", useremail:'email',jwtToken:'jwttoken'}
        }
      ]
    }
  }
  ngOnInit() {
  }

}
