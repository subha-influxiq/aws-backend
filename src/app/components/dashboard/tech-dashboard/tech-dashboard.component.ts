import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})
export class TechDashboardComponent implements OnInit {
  public user_data: any = {};
  /**lib-listing start here**/
  public allUserData: any = [];
  public allUserData_skip: any = ["_id","created_at"];
  public allUserData_modify_header: any = {"firstname":"First Name","lastname":"Last Name",
  "email":"E-Mail","city":"City","address":"Address","state":"State","phone":"Phone","zip":"Zip",
  "status":"Status"
  };
  public UpdateEndpoint:any="addorupdatedata";
  public deleteEndpoint:any="deletesingledata";
  public token:any="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzA3ODg4NTEsImlhdCI6MTU3MDcwMjQ1MX0.NBnhZY0WK0mf2TqnbFJXSHiUJbwQAp_6i41RTUevPuw";
  public apiUrl:any="https://jzvztvn4z8.execute-api.us-east-2.amazonaws.com/dev/api/";
  public tableName:any="usermanagement";
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint:any="datalist";
  public SearchingSourceName :"usermanagement";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Firstname", field: 'firstname' }],

    };
  /**lib listing end here**/
  public user_cookie: any;
  constructor(public cookie: CookieService, public http: HttpClient) {
    let allData: any = {};
    allData = cookie.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.user_cookie = cookie.get('jwtToken');

  }

  ngOnInit() {
    this.getallUserData();
  }

  getallUserData() {
    let link = "https://jzvztvn4z8.execute-api.us-east-2.amazonaws.com/dev/api/datalist";
    var data = {
      "source": "usermanagement",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzA3ODg4NTEsImlhdCI6MTU3MDcwMjQ1MX0.NBnhZY0WK0mf2TqnbFJXSHiUJbwQAp_6i41RTUevPuw"
    }
    this.http.post(link, data)
      .subscribe(res => {
        let result: any;
        result = res;
        this.allUserData = result.res;
        console.log("jhgiulfghd",this.allUserData);
      })

  }
}
