import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-techdashboard',
  templateUrl: './techdashboard.component.html',
  styleUrls: ['./techdashboard.component.css']
})
export class TechdashboardComponent implements OnInit {

  constructor(public cookie: CookieService) {
    console.log(cookie.getAll())
   }

  ngOnInit() {
  }

}
