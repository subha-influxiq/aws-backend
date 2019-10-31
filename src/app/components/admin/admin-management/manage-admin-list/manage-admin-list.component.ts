import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-manage-admin-list',
  templateUrl: './manage-admin-list.component.html',
  styleUrls: ['./manage-admin-list.component.css']
})
export class ManageAdminListComponent implements OnInit {
  
  public TechDashboardAllData: any = [];
  public allUserData_skip: any = ["confirmpassword","accesscode", "password", "created_at", "_id","id","updated_at","phoneno","type","taxo_list","state","city","zip","address"];
  public editUrl: any = "admin/admin-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "phone": "Phone Number", "date": "Date",
    "status": "Status","zip":"Zip","city":"City","state":"State","address":"Address",
    "fullName":"Name"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzExMTYzNDMsImlhdCI6MTU3MTAyOTk0M30.m7kRTmIwvk-G0qYmr0zJ9qXoFJea8fBwnIOt8d7n3bc";
  public apiUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  public tableName: any = "users";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: "users";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullname' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;
  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService, public commonFunction: CommonFunction) {
    
    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
    this.user_cookie = cookie.get('jwtToken');
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data) => {
      this.TechDashboardAllData = data.adminManagementdData.res;
    })


  }


}
