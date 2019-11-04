import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-listing-biller',
  templateUrl: './listing-biller.component.html',
  styleUrls: ['./listing-biller.component.css']
})
export class ListingBillerComponent implements OnInit {
public allBillerData:any=[];
public allUserData_skip: any = ["confirmpassword", "password", 
"created_at","id","updated_at", "_id","type","phoneno","taxo_list"];
  public editUrl: any = "admin/biller-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "phone": "Phone Number", "date": "Date Added",
    "status": "Status","address" : "Address","zip" : "Zip","companyname":"Company Name",
    "city":"City","state" : "State","fullName":"Name"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzExMTYzNDMsImlhdCI6MTU3MTAyOTk0M30.m7kRTmIwvk-G0qYmr0zJ9qXoFJea8fBwnIOt8d7n3bc";
  public apiUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  public tableName: any = "users";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any="users_view_biller";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullName' },
      { label: "Search By E-Mail", field: 'email' }],

    };
public user_cookie:any;
  constructor(public activeRoute :ActivatedRoute, public cookie :CookieService, public commonFunction: CommonFunction) {
    this.user_cookie = cookie.get('jwtToken');

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

   }

  ngOnInit() {
    this.getAllBillerData();
  }
  getAllBillerData(){
    this.activeRoute.data.forEach((data) => {
      this.allBillerData = data.Billerdata.res;
    })
  }
}
