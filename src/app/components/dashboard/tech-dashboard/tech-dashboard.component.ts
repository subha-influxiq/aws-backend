import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})
export class TechDashboardComponent implements OnInit {
public user_data:any = {};
  constructor(public cookie: CookieService) {
    let allData:any = {};
    allData = cookie.getAll()
    this.user_data = JSON.parse(allData.user_details);
    console.log(this.user_data)
   }

  ngOnInit() {
  }

}
