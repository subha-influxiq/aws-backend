import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public logo: any = '../../assets/favicon.ico';
  public signUpRouteingUrl: any = 'sign-up';
  public serverUrl:any = 'http://166.62.39.137:5050/';
  public addEndpoint: any = {
    endpoint:'forgetpassword'
  };
  public domanUrl: any = 'http://localhost:4200/resetpassword';
  constructor() { }

  ngOnInit() {
  }

}
