import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testreset-password',
  templateUrl: './testreset-password.component.html',
  styleUrls: ['./testreset-password.component.css']
})
export class TestresetPasswordComponent implements OnInit {
  public fromTitleName: any = 'Reset From';
  public logo: any = '../../assets/favicon.ico';
  public serverUrl: any = 'https://o820cv2lu8.execute-api.us-east-2.amazonaws.com/production/api/';
  public addEndpoint: any = {
    endpoint:'addorupdatedata',
    source:'usermanagement'
  };
  constructor() { }

  ngOnInit() {
  }

}
