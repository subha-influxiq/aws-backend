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

  /**************declaration**************/
  doctorData:any=[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute, public commonFunction: CommonFunction) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.doctorData = resolveData.data.res;
      console.log("8888888888888",this.doctorData);
    });
  }

}
