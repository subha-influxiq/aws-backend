import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonFunction } from '../../../class/common/common-function';
import { Router, ActivatedRoute ,ActivatedRouteSnapshot} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-biller-dashboard',
  templateUrl: './biller-dashboard.component.html',
  styleUrls: ['./biller-dashboard.component.css']
})
export class BillerDashboardComponent implements OnInit {

  public htmlText: any = { tableHeaderText: "Patient Reports" };
  public loginUserData: any = {};
  public allResolveData: any;

  displayedColumns: string[] = ['Patient Name', 'Doctor Name', 'Tech Name', 'Bill Sent Date', 'Bill Generation Date', 'Status','report_type', 'Action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  /* Initializing the datasource to null */
  dataSource = null;


  constructor(public http: HttpClient, public commonFunction: CommonFunction, public activatedRoute: ActivatedRoute, public cookieService: CookieService, public httpService: HttpServiceService) {
    /* Get and set login User Data */
    this.loginUserData["user_details"] = JSON.parse(this.cookieService.get('user_details'));
    this.loginUserData["jwtToken"] = this.cookieService.get('jwtToken');
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.billerData.data;
      
      /* Fetching the data into table */
      this.dataSource = new MatTableDataSource(this.allResolveData.reportData);
      /* Adding the paginator options */
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  viewReportData(flug: string = "default") {
    switch(flug) {
      case 'downloaded':
        this.htmlText.tableHeaderText = "Patient Reports Downloaded";
        var data: any = {
          "source": "Patient-Record-Report_view",
          "token": this.loginUserData.jwtToken,
          "condition": {
            "biller_id_object": this.loginUserData.user_details._id,
            "biller_downloaded": { $exists: true }
          }
        }
        this.httpService.httpViaPost('datalist', data).subscribe((response) => {
          this.dataSource = new MatTableDataSource(response.res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        break;
      case 'not_downloaded':
        this.htmlText.tableHeaderText = "Patient Reports Not Downloaded";
        var data: any = {
          "source": "Patient-Record-Report_view",
          "token": this.loginUserData.jwtToken,
          "condition": {
            "biller_id_object": this.loginUserData.user_details._id,
            "biller_downloaded": { $exists: false }
          }
        }
        this.httpService.httpViaPost('datalist', data).subscribe((response) => {
          this.dataSource = new MatTableDataSource(response.res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        break;
      default:
        this.htmlText.tableHeaderText = "Patient Reports";
        var data: any = {
          "source": "Patient-Record-Report_view",
          "token": this.loginUserData.jwtToken,
          "condition": {
            "biller_id": this.loginUserData.user_details._id
          }
        }
        this.httpService.httpViaPost('biller-dashboard', data).subscribe((response) => {
          this.allResolveData = response.data;
          console.log(">>>--->", response.data);
          
          /* Fetching the data into table */
          this.dataSource = new MatTableDataSource(this.allResolveData.reportData);
          /* Adding the paginator options */
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        break;
    }
  }

}
