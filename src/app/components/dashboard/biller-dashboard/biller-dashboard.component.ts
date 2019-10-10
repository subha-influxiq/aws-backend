import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-biller-dashboard',
  templateUrl: './biller-dashboard.component.html',
  styleUrls: ['./biller-dashboard.component.css']
})
export class BillerDashboardComponent implements OnInit {

  constructor(public http:HttpClient) { }

  ngOnInit() {
  }

}
