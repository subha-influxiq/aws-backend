import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonFunction } from '../../../class/common/common-function';

@Component({
  selector: 'app-biller-dashboard',
  templateUrl: './biller-dashboard.component.html',
  styleUrls: ['./biller-dashboard.component.css']
})
export class BillerDashboardComponent implements OnInit {

  constructor(public http:HttpClient, public commonFunction: CommonFunction) {
    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
  }

  ngOnInit() {
  }

}
