import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-listing-tech',
  templateUrl: './listing-tech.component.html',
  styleUrls: ['./listing-tech.component.css']
})
export class ListingTechComponent implements OnInit {
  public allUserData: any = [];
  public allUserData_skip: any = ["_id", "created_at","password","id","updated_at"];
  public editUrl: any = "tech-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "city": "City", "address": "Address", "state": "State", "phone": "Phone", "zip": "Zip",
    "status": "Status","phoneno":"Phone Number","date":"Data Added"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzExMTYzNDMsImlhdCI6MTU3MTAyOTk0M30.m7kRTmIwvk-G0qYmr0zJ9qXoFJea8fBwnIOt8d7n3bc";
  public apiUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  public tableName: any = "tech_management";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: "tech_management";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Firstname", field: 'firstname' }],

    };
    public user_cookie: any;
  public TechDashboardAllData: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute) { 
      this.user_cookie = cookie.get('jwtToken');

    }

  ngOnInit() {
    this.activatedRoute.data.forEach((data) => {
      this.TechDashboardAllData = data.techDashboardData.res;
      console.log(this.TechDashboardAllData);
    })
  }

}
