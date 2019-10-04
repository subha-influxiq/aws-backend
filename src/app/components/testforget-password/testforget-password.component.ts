import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testforget-password',
  templateUrl: './testforget-password.component.html',
  styleUrls: ['./testforget-password.component.css']
})
export class TestforgetPasswordComponent implements OnInit {
  public logo: any = '../../assets/favicon.ico';
  public signUpRouteingUrl: any = 'Signup';
  public formTitle: any = 'Forget Password';
  public serverUrl:any = 'http://166.62.39.137:5050/';
  public addEndpoint: any = {
    endpoint:'forgetpassword'
  };
  public domanUrl: any = 'http://localhost:4200/reset-password';
  constructor() { }

  ngOnInit() {
  }

}
