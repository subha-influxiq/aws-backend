import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-listing-tech',
  templateUrl: './listing-tech.component.html',
  styleUrls: ['./listing-tech.component.css']
})
export class ListingTechComponent implements OnInit {
  public allUserData: any = [];
  public allUserData_skip: any = ["_id", "created_at","password","id",
  "updated_at","type","phoneno","taxo_list","fullName"];
  public editUrl: any = "admin/tech-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "city": "City", "address": "Address", "state": "State", "zip": "Zip",
    "status": "Status","phone":"Phone Number","date":"Data Added","fullNamecopy" :"Name"
  };
  previewModal_detail_skip: any = ['_id','fullNamecopy'];

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl:any;
  public tableName: any = "users";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  SearchingSourceName:any = "users_view_tech";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullName' },
      { label: "Search By E-Mail", field: 'email' }],

    };
    public user_cookie: any;
  public TechDashboardAllData: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
     public commonFunction: CommonFunction) {
      
      /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

      this.user_cookie = cookie.get('jwtToken');
      this.apiUrl = httpService.baseUrl ; 

    }

  ngOnInit() {
    this.activatedRoute.data.forEach((data) => {
      this.TechDashboardAllData = data.techDashboardData.res;
     
    })
  }

}
