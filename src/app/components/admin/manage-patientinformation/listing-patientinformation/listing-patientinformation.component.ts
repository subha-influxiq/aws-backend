import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-listing-patientinformation',
  templateUrl: './listing-patientinformation.component.html',
  styleUrls: ['./listing-patientinformation.component.css']
})
export class ListingPatientinformationComponent implements OnInit {


  public allUserData: any = [];
  public insuranceData_count:any=0;
  public datasource: any;
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
    "name_search",
    "label_search",
    "addfield"
  ];
  public editUrl: any = "admin/patientinformation-management/edit";
  public allUserData_modify_header: any = {
    "type": "Type",
    "label": "Label",
    "description": "Description",
    "status": "Status",
  };
  public previewModal_detail_skip: any = [
    "_id",
    "user_type",
    "password",
    "created_at",
    "id",
    "updated_at",
    "diagnostic_admin_id",
    "label_search"
  ];

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "users";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public type: any = [{ val: "checkbox", 'name': 'Checkbox' }, { val: "numberfield", 'name': 'Number Field' },{ val: "textfield", 'name': ' Text Field' },{ val: "dropdown", 'name': ' Dropdown' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_tech_list";
  public datacollection: any='getpatientinformationlistdata';
  public sortdata:any={
    "type":'desc',
    "field":'label',
    "options":['label']
 };
 public limitcond:any={
  "limit":10,
  "skip":0,
  "pagecount":1
};
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status },{ label: 'Search By Type', field: 'type', values: this.type }],
      textsearch: [{ label: "Search By Label", field: 'label_search' }],

    };
  public user_cookie: any;
  public userData: any;
  public InsuranceAllData: any = [];

  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_cookie = cookie.get('jwtToken');
    this.userData = JSON.parse(this.cookie.get('user_details'));
    
    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/tech-management/edit';
    }

    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/tech-management/edit';
    }

    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getpatientinformationlistdata';
    let endpointc='getpatientinformationlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'label'
    }
 
    }
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.insuranceData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.InsuranceAllData =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  }

}
