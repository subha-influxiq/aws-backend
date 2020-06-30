import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing-adminbiller',
  templateUrl: './listing-adminbiller.component.html',
  styleUrls: ['./listing-adminbiller.component.css']
})
export class ListingAdminbillerComponent implements OnInit {

  public userData: any = {
  };
  public docData_count:any=0;
  public  docData: any = [];
  public datasource: any;
  public docData_skip: any = [
    "_id",
    "fax",
    "address",
    "zip",
    "city",
    "state",
    "user_type",
    "tech_id",
    "biller_id",
    "doctors_office_id",
    "diagnostic_admin_id",
    "taxo_list",
    "password",
    "created_at",
    "id",
    "name_search",
    "updated_at",
    "doctor_signature",
    "name_search"
  ];
  public docData_modify_header: any = {
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    phone: "Phone Number",
    status: "Status",
    "logincounts": "No Of Login",
    "last_login_datetime": "Last Login",
    "last login datetime": "Last Login"
  };

  public previewModal_skip: any = [
    "_id",
    "user_type",
    "tech_id",
    "biller_id",
    "doctors_office_id",
    "taxo_list",
    "created_date"
  ];
   public libdata:any={
    // basecondition: {report_type:"file"},
    updateendpoint:'statusupdate',
    notes: {
      label: "Notes",
      addendpoint: "addnotedata",
      deleteendpoint: "deletenotedata",
      listendpoint: "listnotedata",
      user: "",
      currentuserfullname: " ",
      header: 'User',
  },
    // hideeditbutton:true,// all these button options are optional not mandatory
    // hidedeletebutton:true,
    // hideviewbutton:true,
    //hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders:['firstname','lastname','email','phone','status','logincounts','last_login_datetime'] //not required
   
}
  public tableName: any = 'data_pece';
  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public user_cookie: any;
  public searchingEndpoint:any="datalist";
  public searchSourceName:any="data_doctor_list"
  public editUrl:any = 'admin/adminbiller-management/edit';
  public apiUrl:any;
  public datacollection: any='getbilleradminlistdata';
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
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      // {label:"Search by Taxonomy",field:'taxo_list'},
      { label: "Search By E-Mail", field: 'email' }]
    };
  // ====================================================================

  constructor(private http: HttpServiceService, private cookieService: CookieService, 
    private router: Router,public activatedRoute : ActivatedRoute) {

    this.user_cookie = cookieService.get('jwtToken');
    let allData = cookieService.getAll();
    this.userData = JSON.parse(allData.user_details);
    this.libdata.notes.user = this.userData._id;
    this.libdata.notes.currentuserfullname = this.userData.firstname +this.userData.lastname;
    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/doctor-management/edit';
    }

    this.apiUrl = http.baseUrl;
    this.http.getclientip().subscribe((res: any) => {
      console.log(res);
        })
  }


  ngOnInit() {
    this.datasource = '';
    let endpoint='getbilleradminlistdata';
    let endpointc='getbilleradminlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'firstname'
    }
 
    }
        this.http.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.docData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.http.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.docData =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  }


}
