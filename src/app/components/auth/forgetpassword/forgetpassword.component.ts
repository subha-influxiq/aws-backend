import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../../../class/common/common-function';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  public logo: any = '../../assets/favicon.ico';
  // public signUpRouteingUrl: any = 'sign-up';
  public serverUrl:any = 'https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/';
  public addEndpoint: any = {
    endpoint:'forgetpassword'
  };

  public loginRouteingUrl: any = {
    // "path":"login",
    "path":"",
    "buttonName":"login",
    "customLink":"/login",
    "customURl":""
  };

  public signUpRouteingUrl: any = {
    // "path":"sign-up",
    "path":"",
    // "buttonName":"sign-up",
    "customLink":"",
    // "customURl":"https://advancedwellness.pro/"
  };

  public buttonName: any = 'Reset Password';

  public domainUrl: any = 'http://testbedpece.influxiq.com/reset-password';  
  // public domainUrl: any = 'http://localhost:4201/reset-password';  

  constructor(public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
  }

  ngOnInit() {
  }

}
