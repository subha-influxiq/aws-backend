import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public logo: any = '../../assets/favicon.ico';
  public fromTitle: any = "Login Form";    // This is a From Title 
  public fullUrl: any = "https://o820cv2lu8.execute-api.us-east-2.amazonaws.com/production/api/";  // server url
  public endpoint: any = "login";
  public signUpRouteingUrl: any = 'Signup';
  public forgetRouteingUrl: any = 'forget-password';
  public routerStatus: any;
  constructor() { 
    this.routerStatus = {           // this is use for if login succcess then navigate which page 
      "data": [
        {
          "type": "admin",
          "routerNav": "forget-password"
        },
        {
          "type": "user",
          "routerNav": "userDashbord"
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
