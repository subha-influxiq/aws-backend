import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testsignup',
  templateUrl: './testsignup.component.html',
  styleUrls: ['./testsignup.component.css']
})
export class TestsignupComponent implements OnInit {
  public forgetRouteingUrl: any = 'forgetpassword';
  public loginRouteingUrl: any = 'login';
  public logo: any = '../../assets/favicon.ico';
  public modaleLogo: any = '../../assets/favicon.ico';
  public formTitle: any = 'Sign Up';
  public serverUrl: any = 'https://o820cv2lu8.execute-api.us-east-2.amazonaws.com/production/api/';
  public addEndpoint: any = {
    endpoint:'addorupdatedata',
    // source:'usermanagement'
    source:'user'
  };
  constructor() { }

  ngOnInit() {
  }

}
