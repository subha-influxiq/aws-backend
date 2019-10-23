import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  public user_id :any;
  public user_token: any;
  public TechDashboardAllData: any = [];
  public techSingleData : any=[];
  public userSingleData : any={};
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute) {
    let allData: any = {};
    allData = cookie.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.user_id = this.user_data.id;
    this.user_token = cookie.get('jwtToken');
    this.getTechData();

  }

  ngOnInit() {

    this.activatedRoute.data.forEach((data) => {
      this.TechDashboardAllData = data.techDashboardData.res;
    })

  }

  getTechData(){
    var data={
      "source": "users",
      "condition": {
        "tech_object": this.user_id 
      },
    "token": this.user_token
    }
    this.httpService.httpViaPost('datalist',data)
    .subscribe(response=>{
      let result:any={};
      result = response.res; 
      this.userSingleData =result[0];
    })
  }

}
