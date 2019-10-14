import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})
export class TechDashboardComponent implements OnInit {
  public user_data: any = {};

  /**lib-listing start here**/

  public allUserData: any = [];
  public allUserData_skip: any = ["_id", "created_at"];
  public editUrl:any="user-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "city": "City", "address": "Address", "state": "State", "phone": "Phone", "zip": "Zip",
    "status": "Status"
  };
<<<<<<< HEAD
  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzA4NjQxODUsImlhdCI6MTU3MDc3Nzc4NX0.jfiN4pHviHFa_uMPgX6CfZfsfAC22ocB_jvCa7g6GlY";
  public apiUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  public tableName: any = "user_management";
=======
  public UpdateEndpoint:any="addorupdatedata";
  public deleteEndpoint:any="deletesingledata";
  public token:any="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzA4NjQxODUsImlhdCI6MTU3MDc3Nzc4NX0.jfiN4pHviHFa_uMPgX6CfZfsfAC22ocB_jvCa7g6GlY";
  public apiUrl:any="https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  public tableName:any="usermanagement";
>>>>>>> d12d4397a418c75cc452c345934364d1e2f90b0e
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: "user_management";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Firstname", field: 'firstname' }],

    };

  /**lib listing end here**/

  public user_cookie: any;
  constructor(public cookie: CookieService, public http: HttpClient, public httpService: HttpServiceService) {
    let allData: any = {};
    allData = cookie.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.user_cookie = cookie.get('jwtToken');

  }

  ngOnInit() {
    this.getallUserData();
  }

  getallUserData() {
<<<<<<< HEAD
    var data = {
      "source": "user_management",
=======
    let link = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/datalist";
    var data = {
      "source": "usermanagement",
>>>>>>> d12d4397a418c75cc452c345934364d1e2f90b0e
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzA4NjQxODUsImlhdCI6MTU3MDc3Nzc4NX0.jfiN4pHviHFa_uMPgX6CfZfsfAC22ocB_jvCa7g6GlY"
    }
    this.httpService.httpViaPost("datalist", data)
      .subscribe(res => {
        let result: any;
        result = res;
        this.allUserData = result.res;
     
      })
  }
}
