import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonFunction } from '../../../class/common/common-function';
import { Router, ActivatedRoute ,ActivatedRouteSnapshot} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-biller-dashboard',
  templateUrl: './biller-dashboard.component.html',
  styleUrls: ['./biller-dashboard.component.css']
})
export class BillerDashboardComponent implements OnInit {

  /* declarations */
  patientReportArray: any = [];
  displayedColumns: string[] = ['Patient Name', 'Doctor Name', 'Bill Sent Date', 'Bill Generation Date', 'Tech Name', 'Status','report_type', 'Action'];
  // -----------------------

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  

  /* Initializing the datasource to null */
  dataSource = null;


  constructor(public http: HttpClient,public commonFunction: CommonFunction, 
    public activatedRoute: ActivatedRoute) {
    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.patientReportArray = resolveData.billerData.res;
      
    });

    /* Fetching the data into table */
    this.dataSource = new MatTableDataSource(this.patientReportArray);
    /* Adding the paginator options */
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

}
