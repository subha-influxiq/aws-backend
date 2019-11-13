import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-doctor-office-dashboard',
  templateUrl: './doctor-office-dashboard.component.html',
  styleUrls: ['./doctor-office-dashboard.component.css']
})
export class DoctorOfficeDashboardComponent implements OnInit {

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute, public commonFunction: CommonFunction) {

  }

  ngOnInit() {
  }

}
