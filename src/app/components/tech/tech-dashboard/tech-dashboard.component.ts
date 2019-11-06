import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  no: number;
  patientName: string;
  record_type: string;
  date_added: string;
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

  dataSource = new MatTableDataSource(this.commonArray);
  /**lib-listing start here**/

  public allUserData: any = [];
  public allUserData_skip: any = ["_id", "created_at"];
  public editUrl: any = "user-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "city": "City", "address": "Address", "state": "State", "phone": "Phone", "zip": "Zip",
    "status": "Status"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzExMTYzNDMsImlhdCI6MTU3MTAyOTk0M30.m7kRTmIwvk-G0qYmr0zJ9qXoFJea8fBwnIOt8d7n3bc";
  public apiUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  public tableName: any = "user_management";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: "user_management";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Firstname", field: 'firstname' }],

    };

  /**lib listing end here**/
  public user_id: any;
  public user_token: any;
  public techDashboardAllData: any = [];
  public techSingleData: any = [];
  public userSingleData: any = {};
  public uploadedStatusCount: any;
  public processedStatusCount: any;
  public signedStatusCount: any;
  public reportUploadedArray: any = [];
  public reportProcessedArray: any = [];
  public reportRemainingArray: any = [];

  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute, public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    let allData: any = {};
    allData = cookie.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.user_id = this.user_data.id;
    this.user_token = cookie.get('jwtToken');
    this.getTechData();
    this.getTechCountData();

  }

  ngOnInit() {

    this.activatedRoute.data.forEach((data) => {
      this.techDashboardAllData = data.techDashboardData.res;
      console.log("soiureshhhhhh",this.techDashboardAllData);
    })

  }
  getAllDashboardData(){

  }

  getTechData() {
    var data = {
      "source": "users",
      "condition": {
        "tech_object": this.user_id
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        let result: any = {};
        result = response.res;
        this.userSingleData = result[0];
        console.log(this.userSingleData);
      })
  }
  getTechCountData() {
    var data = {
      "source": "users",
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
  viewDetailsData(flag: any) {
    switch (flag) {
      case 'upload':
        this.commonArray = this.reportUploadedArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        console.log("datasource",this.dataSource);

        break;
      case 'processed':
          this.commonArray = this.reportProcessedArray;
          this.dataSource = new MatTableDataSource(this.commonArray);
        break;
      case 'remainProcess':
         this.commonArray = this.reportRemainingArray;
         this.dataSource = new MatTableDataSource(this.commonArray);
        break;
      default:
        break;
    }
  }
}



