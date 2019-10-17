import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logo: any = './assets/images/logo.png';
  public fromTitle: any = "Login Form";    // This is a From Title
  public fullUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";  // server url
  public endpoint: any = "login";
  public buttonName:any= 'Login Button';

  public signUpRouteingUrl: any = {
    "path": "",
    "buttonName": "Sign-Up",
    "customLink": "",
    "customURl": "https://advancedwellness.pro/"
  };
  public forgetRouteingUrl: any = {
    "path": "",
    "buttonName": "Forget Password",
    "customLink": "/forget-password",
  };

  public routerStatus: any;

  constructor() {
    this.routerStatus = {           // this is use for if login succcess then navigate which page
      "data": [
        {
          "type": "admin",
          "routerNav": "dashboard/admin"
        },
        {
          "type": "user",
          "routerNav": "dashboard/user"
        },
        {
          "type": "model",
          "routerNav": "modelDashbord"
        }
      ]
    }
  }

  ngOnInit() {


  }

}
