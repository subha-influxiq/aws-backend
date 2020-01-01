import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../../../class/common/common-function';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  // public formTitle : "resetttt forrmm";

  public logo: any = '../../assets/favicon.ico';
  // public signUpRouteingUrl: any = 'sign-up';
  public serverUrl:any = environment.apiBaseUrl;
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
    "path":"",
    "customLink":"",
  };

  public buttonName: any = 'Reset Password';

  public domainUrl: any =  environment.siteBaseUrl + 'reset-password';

  constructor(public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
  }

  ngOnInit() {
  }

}
