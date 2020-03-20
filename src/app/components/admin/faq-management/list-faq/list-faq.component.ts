import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.css']
})
export class ListFaqComponent implements OnInit {

  public allUserData: any = [];
  public allUserData_skip: any = [
    "_id",
    "answer",
    "created_at"
  ];
  public editUrl: any = "admin/faq-management/edit";
  public allUserData_modify_header: any = {
    "users": "Users",
    "question": "Question",
    "answer": "Answer",
    "priority": "Priority",
    "status": "Status"
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

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "users";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_sales_person_list";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;
  public userData: any;
  public FaqManagementAddEditForm: any = [];
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
    this.activatedRoute.data.forEach((data) => {
      this.FaqManagementAddEditForm = data.techDashboardData.res;
    });
  }

}
