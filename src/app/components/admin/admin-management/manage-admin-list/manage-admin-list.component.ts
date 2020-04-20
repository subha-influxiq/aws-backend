import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-manage-admin-list',
  templateUrl: './manage-admin-list.component.html',
  styleUrls: ['./manage-admin-list.component.css']
})
export class ManageAdminListComponent implements OnInit {

  public TechDashboardAllData: any = [];
  public adminData_count: any = 0;
  public datasource: any;
  public allUserData_skip: any = [
    "_id",
    "user_type",
    "password",
    "created_at",
    "access_code",
    "address",
    "city",
    "state",
    "updated_at",
    "zip",
    "name_search"
  ];
  public editUrl: any = "admin/admin-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "phone": "Phone Number",
    "status": "Status",
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public previewModal_skip: any = [
    "_id",
    "user_type",
    "password",
    "created_at",
    "access_code",
    "updated_at",
  ];
  public tableName: any = "data_pece";
  public apiUrl: any;
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_admin_list";
  public datacollection: any = 'getadminlistdata';
  public sortdata: any = {
    "type": 'desc',
    "field": 'firstname',
    "options": ['firstname']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;


  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService,
    public httpService: HttpServiceService) {

    this.user_cookie = cookie.get('jwtToken');
    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint = 'getadminlistdata';
    let endpointc = 'getadminlistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'firstname'
      }

    }
    this.httpService.httpViaPost(endpointc, data).subscribe((res: any) => {
      // console.log('in constructor');
      // console.log(result);
      this.adminData_count = res.count;
      //console.warn('blogData c',res);

    }, error => {
      console.log('Oooops!');
    });

    this.httpService.httpViaPost(endpoint, data).subscribe((res: any) => {

      this.TechDashboardAllData = res.results.res;

    }, error => {
      console.log('Oooops!');
    });


  }


}
