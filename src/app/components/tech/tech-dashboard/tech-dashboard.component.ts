import { Component, OnInit ,ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  no: number;
  patientName: string;
  record_type: string;
  date_added: string;
  status: string;
}
export interface AllDataElement {
  no: number;
  patientName: string;
  doctorName: string;
  record: string;
  billSentDate: string;
  created_at: string;
  status: string;
}

@Component({
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})

export class TechDashboardComponent implements OnInit {
  public commonArray: PeriodicElement[] = [];

  public user_data: any = {};
  displayedColumns: string[] = ['no', 'patientName', 'record_type', 'date_added', 'status'];
  allDataColumns: string[] = ['no','patientName', 'doctorName', 'record','created_at', 'billsendDate','status'];


   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.commonArray);
  allDataSource: MatTableDataSource<AllDataElement>;

  /**lib-listing start here**/

  public allUserData: any = [];
  
  public user_id: any;
  public user_token: any;
  public techDashboardAllData: any = [];
  public techSingleData: any = [];
  public userSingleData: any = [];
  public uploadedStatusCount: any;
  public processedStatusCount: any;
  public signedStatusCount: any;
  public reportUploadedArray: any = [];
  public reportProcessedArray: any = [];
  public reportRemainingArray: any = [];
  public headerText: any;
  public userToken : any;

  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute, public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    let allData: any = {};
    allData = cookie.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.userToken = cookie.get('jwtToken');

    this.user_id = this.user_data.id;
    this.user_token = cookie.get('jwtToken');
    this.getTechData();
    this.getTechCountData();

  }

  ngOnInit() {

    this.activatedRoute.data.forEach((data) => {
      let allDashboardData : any = data.techDashboardData.res;
      this.techDashboardAllData = new MatTableDataSource(allDashboardData);
      
    })

  }
  
  

  getTechData() {
    var data = {
      "source": "users_view_doctor",
      "condition": {
        tech: this.user_data.firstname + " " + this.user_data.lastname
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        let result: any = {};
        result = response.res;
        this.userSingleData = result;

      })
  }
  getTechCountData() {
    var data = {
      "source": "users",
      "condition": {
        "condition": {
          "status": "pending",
          "type": "tech"
        },
        "condition1": {
          "status": "waiting for doctor sign",
          "type": "tech"
        },
        "condition2": {
          "status": "doctor signed"
        },
        "condition3": {
          "status": "error"
        },
        "condition4": {
          "status": "send to biller"
        },
        "condition5": {
          "record_type": "file"
        },
        "condition6": {
          "type": "tech"
        },
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('statuscount', data)
      .subscribe(response => {
        this.processedStatusCount = response["status-count1"];
        this.signedStatusCount = response["status-count2"];
        this.uploadedStatusCount = response["status-count7"]
        this.reportUploadedArray = response.data.status7;
        this.reportRemainingArray = response.data.status2;
        this.reportProcessedArray = response.data.status1;

      })
  }
  filterByName(key: string, value: string) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();
    searchJson["user_id_object"] = this.user_id;
    var data = {
      "source": "patient_management_view_tech",
      "condition": searchJson,
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe((Response) => {
        this.techDashboardAllData = Response.res;
      });
  }

  filerByReports(key: string, value: any) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();
    var data = {
      "source": "patient_management_view_tech",
      "condition": searchJson,
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data)
    .subscribe((Response) => {
      // this.techDashboardAllData = Response.res;
    });

  }
  viewDetailsData(flag: any) {
    switch (flag) {
      case 'upload':
        this.headerText = "Reports Uploaded";
        this.commonArray = this.reportUploadedArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        break;
      case 'processed':
        this.headerText = "Reports Processed";
        this.commonArray = this.reportProcessedArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        break;
      case 'remainProcess':
        this.headerText = "Reports Remain to Process";
        this.commonArray = this.reportRemainingArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        break;
      default:
        break;
    }
  }
}



