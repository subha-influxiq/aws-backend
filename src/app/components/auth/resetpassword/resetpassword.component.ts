import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../../../class/common/common-function';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit {

  public fromTitleName: any = 'Reset From';
  public logo: any = './assets/images/logo.png';
  public serverUrl: any = 'https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/';
  public addEndpoint: any = {
    endpoint:'resetpassword',
    source:'users'
  };

  constructor(public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
  }

  ngOnInit() {
  }

}
