import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-listing-biller',
  templateUrl: './listing-biller.component.html',
  styleUrls: ['./listing-biller.component.css']
})

export class ListingBillerComponent implements OnInit {

  public allBillerData: any = [];
  public billerData_count:any=0;
  public datasource: any;
  public field:any;
  public data:any;
  public fetch:any;
  public allUserData_skip: any = [
    "_id", 
    "address", 
    "zip", 
    "city", 
    "state", 
    "user_type", 
    "password", 
    "created_at", 
    "diagnostic_admin_id", 
    "doctor_id",
    "id",
    "updated_at",
    "name_search",
    "company_search",
    "diagnostic_admin_id",
    "distributor_id",
    "doctorgroup_id"
  ];
  public editUrl: any = "admin/biller-management/edit";
  public userData: any;
  libdata:any={
    basecondition: "",
    updateendpoint:'statusupdate',
    // hideeditbutton:true,// all these button options are optional not mandatory
    //hidedeletebutton:true,
    //hideviewbutton:false,
    //hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders:['firstname','lastname','email','parent_name','parent_type','phone','company_name','status','created_date',], //not required
}
  public allUserData_modify_header: any = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "phone": "Phone",
    "company_name": "Company Name",
    "status": "Status",
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "users";
  public datacollection: any='getbillerlistdata';
  public sortdata:any={
    "type":'desc',
    "field":'firstname',
    "options":['firstname','email','created_date']
 };
 public limitcond:any={
  "limit":10,
  "skip":0,
  "pagecount":1
};
  previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' },{ val: "distributors", 'name': 'Distributor' },{ val: "doctor_group", 'name': 'Doctor Group' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_biller_list";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status },{ label: 'Search By Parent Type', field: 'parent_type', values: this.parent_type }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' },{ label: "Search By Parent Name", field: 'parent_search' },{ label: "Search By Company Name", field: 'company_search' }]

    };
  public user_cookie: any;
  constructor(public activeRoute: ActivatedRoute, public cookie: CookieService,
    public httpService: HttpServiceService) {

    this.user_cookie = cookie.get('jwtToken');
    this.userData = JSON.parse(this.cookie.get('user_details'));

    
    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/biller-management/edit';
      this.field = {'diagnostic_admin_id':this.userData._id};
      this.data = this.userData._id;
    }
    if(this.userData.user_type == 'doctor_group') {
      this.editUrl = 'doctor-group/biller-management/edit';
      this.field = {'doctorgroup_id':this.userData._id};
      this.data = this.userData._id;
    }
    if(this.userData.user_type == 'distributors') {
      this.editUrl = 'distributors/biller-management/edit';
      this.field = {'distributors_id':this.userData._id};
      this.data = this.userData._id;
    }

    this.libdata.basecondition = this.field;

    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/biller-management/edit';
    }

    this.apiUrl = httpService.baseUrl;
    }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getbillerlistdata';
    let endpointc='getbillerlistdata-count';
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
      this.fetch={'diagnostic_admin_id':  this.data}
    }
    if(this.userData.user_type == 'doctor_group') {
      this.fetch={'doctorgroup_id':  this.data}
    }
    if(this.userData.user_type == 'distributors') {
      this.fetch={'distributor_id':  this.data}
    }
    data.data = this.fetch;
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.billerData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.allBillerData =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  
  }
  getAllBillerData() {
    this.activeRoute.data.forEach((data) => {
      this.allBillerData = data.Billerdata.res;
    })
  }
}
