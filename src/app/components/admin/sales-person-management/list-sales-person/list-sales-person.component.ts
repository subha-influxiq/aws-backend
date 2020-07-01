import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-list-sales-person',
  templateUrl: './list-sales-person.component.html',
  styleUrls: ['./list-sales-person.component.css']
})
export class ListSalesPersonComponent implements OnInit {

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
  public editUrl: any = "admin/sales-person-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "status": "Status",
    "phone": "Phone Number"
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
    notes: {
      label: "Notes",
      addendpoint: "addnotedata",
      deleteendpoint: "deletenotedata",
      listendpoint: "listnotedata",
      user: "",
      currentuserfullname: " ",
      header: 'fullname',
  },
    // hideeditbutton:true,// all these button options are optional not mandatory
    //hidedeletebutton:true,
    //hideviewbutton:false,
    //hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders: ['firstname', 'lastname', 'email', 'phone', 'status', 'created_date',], //not required
  }

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "data_pece";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributor' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_sales_person_list";
  public datacollection: any = 'getsaleslistdata';
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
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status },],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }],

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
    this.libdata.notes.user = this.userData._id;
    this.libdata.notes.currentuserfullname = this.userData.firstname +this.userData.lastname;
    if (this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/sales-person-management/edit';
      this.field = { 'parent_id': this.userData._id };
      this.data = this.userData._id;
    }
    if (this.userData.user_type == 'distributors') {
      this.editUrl = 'distributors/sales-person-management/edit';
      this.field = { 'parent_id': this.userData._id };
      this.data = this.userData._id;
    }
    if (this.userData.user_type == 'admin') {
      this.search_settings.textsearch.push({ label: "Search By Parent Name", field: 'parent_name_search' });
      this.search_settings.selectsearch.push({ label: 'Search By Parent Type', field: 'parent_type_search', values: this.parent_type });
      this.libdata.tableheaders.splice(3, 0, "parent_name");
      this.libdata.tableheaders.splice(4, 0, "parent_type");
    }

    this.libdata.basecondition = this.field;


    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint = 'getsaleslistdata';
    let endpointc = 'getsaleslistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'firstname'
      },
      data: this.fetch

    }
    if (this.userData.user_type == 'diagnostic_admin') {
      this.fetch = { 'parent_id': this.data }
    }
    if (this.userData.user_type == 'distributors') {
      this.fetch = { 'parent_id': this.data }
    }
    data.data = this.fetch;
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
