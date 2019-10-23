import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../../../class/common/common-function';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public logo: any = './assets/images/logo.png';
  public fromTitle: any = "Login Here";    // This is a From Title
  public fullUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";  // server url
  public endpoint: any = "login";
  public buttonName: any = 'Login Button';

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

  constructor(public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.routerStatus = {           // this is use for if login succcess then navigate which page
      "data": [
        {
          "type": "admin",
          "routerNav": "admin/dashboard"
        },
        {
          "type": "doctor",
          "routerNav": "doctor/dashboard"
        },
        {
          "type": "tech",
          "routerNav": "tech/dashboard"
        },
        {
          "type": "biller",
          "routerNav": "biller/dashboard"
        }
      ]
    }
  }

  ngOnInit() {
  }

}
