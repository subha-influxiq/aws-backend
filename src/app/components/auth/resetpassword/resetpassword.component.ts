import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../../../class/common/common-function';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit {

  public fromTitleName: any = 'Change Your Password Here';
  public logo: any = './assets/images/logo.png';
  public serverUrl: any = environment.apiBaseUrl;
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
