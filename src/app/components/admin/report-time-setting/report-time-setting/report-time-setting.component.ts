import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';
@Component({
  selector: 'app-report-time-setting',
  templateUrl: './report-time-setting.component.html',
  styleUrls: ['./report-time-setting.component.css']
})
export class ReportTimeSettingComponent implements OnInit {

  public allUserData: any = [];
  public datasource: any;
  public field: any;
  public data: any;
  public fetch: any;
  public salesData_count: any = 0;
  public allUserData_skip: any = [
    "_id",
    "address",
    "zip",
    "city",
    "state",
    "user_type",
    "password",
    "created_at",
    "id",
    "updated_at",
    "diagnostic_admin_id",
    "admin_id",
    "distributor_id",
    "doctorgroup_id"
  ];
  public editUrl: any = "admin/setting-management/edit";
  public allUserData_modify_header: any = {
    "time_setting_percentage": "Report Setting(%)",
  };
  public previewModal_detail_skip: any = [
    "_id",
    "user_type",
    "password",
    "created_at",
    "id",
    "updated_at",
    "diagnostic_admin_id"
  ];

  libdata: any = {
    basecondition: "",
    updateendpoint: 'statusupdate',
    hidemultipleselectbutton:true,
    // hideeditbutton:true,// all these button options are optional not mandatory
    hidedeletebutton:true,
    hideviewbutton:true,
    hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders: ['time_setting_percentage'], //not required
  }

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "data_pece";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributor' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_sales_person_list";
  public datacollection: any = 'getreportsettinglistdata';
  public sortdata: any = {
    "type": 'desc',
    "field": 'time_setting_percentage',
    "options": ['time_setting_percentage']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  public search_settings: any =
    {
      // selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status },],
      // textsearch: [{ label: "Search By Name", field: 'name_search' },
      // { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;
  public userData: any;
  public salesPersonDashboardAllData: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_cookie = cookie.get('jwtToken');
    this.userData = JSON.parse(this.cookie.get('user_details'));


    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint = 'getreportsettinglistdata';
    let endpointc = 'getreportsettinglistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'time_setting_percentage'
      },
    }
    this.httpService.httpViaPost(endpointc, data).subscribe((res: any) => {
      // console.log('in constructor');
      // console.log(result);
      this.salesData_count = res.count;
      //console.warn('blogData c',res);

    }, error => {
      console.log('Oooops!');
    });

    this.httpService.httpViaPost(endpoint, data).subscribe((res: any) => {

      this.salesPersonDashboardAllData = res.results.res;

    }, error => {
      console.log('Oooops!');
    });
  }
}
