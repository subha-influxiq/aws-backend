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
  public techData_count:any=0;
  public field:any;
  public data:any;
  public fetch:any;
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
    "diagnostic_admin_id",
    "distributor_id",
    "doctorgroup_id"
  ];
  public editUrl: any = "admin/tech-management/edit";
  libdata:any={
    basecondition: "",
    updateendpoint:'statusupdate',
    // hideeditbutton:true,// all these button options are optional not mandatory
    //hidedeletebutton:true,
    //hideviewbutton:false,
    //hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders:['firstname','lastname','email','parent_name','parent_type','phone','status','created_date',], //not required
}
  public allUserData_modify_header: any = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "status": "Status",
    "phone": "Phone Number",
    "parent_name" : "Parent Name",
    "parent_type" : "Parent Type"
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
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' },{ val: "distributors", 'name': 'Distributor' },{ val: "doctor_group", 'name': 'Doctor Group' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_tech_list";
  public datacollection: any='gettechlistdata';
  public sortdata:any={
    "type":'desc',
    "field":'firstname',
    "options":['firstname']
 };
 public limitcond:any={
  "limit":10,
  "skip":0,
  "pagecount":1
};
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status },{ label: 'Search By Parent Type', field: 'parent_type_search', values: this.parent_type }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' },{ label: "Search By Parent Name", field: 'parent_search' }],

    };
  public user_cookie: any;
  public userData: any;
  public TechDashboardAllData: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_cookie = cookie.get('jwtToken');
    this.userData = JSON.parse(this.cookie.get('user_details'));
    
    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/tech-management/edit';
      this.field = {'parent_id':this.userData._id};
      this.data = this.userData._id;
    }
    if(this.userData.user_type == 'doctor_group') {
      this.editUrl = 'doctor-group/tech-management/edit';
      this.field = {'parent_id':this.userData._id};
      this.data = this.userData._id;
    }
    if(this.userData.user_type == 'distributors') {
      this.editUrl = 'distributors/tech-management/edit';
      this.field = {'parent_id':this.userData._id};
      this.data = this.userData._id;
    }

    this.libdata.basecondition = this.field;

    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/tech-management/edit';
    }

    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='gettechlistdata';
    let endpointc='gettechlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'firstname'
    },
    data:this.fetch
 
    }

    if(this.userData.user_type == 'diagnostic_admin') {
      this.fetch={'parent_id':  this.data}
    }
    if(this.userData.user_type == 'doctor_group') {
      this.fetch={'parent_id':  this.data}
    }
    if(this.userData.user_type == 'distributors') {
      this.fetch={'parent_id':  this.data}
    }
    data.data = this.fetch;
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.techData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.TechDashboardAllData =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  }

}
