import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-sales-person-dashboard',
  templateUrl: './sales-person-dashboard.component.html',
  styleUrls: ['./sales-person-dashboard.component.css']
})
export class SalesPersonDashboardComponent implements OnInit {
  displayedColumns: string[] = ['no', 'doctors_name', 'email', 'phone', 'NPI', 'addon', 'address'];

  public userData: any = {
  };
  public shareDetails: any = {};
  // public cookieUserallData: any = JSON.parse(this.cookieService.get('user_details'))
  public docData_count: any = 0;
  public docData: any = [];
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
    "distributor_id",
    "diagnostic_admin_id",
    "doctorgroup_id"
  ];
  public docData_modify_header: any = {
    firstname: "First Name",
    lastname: "Last Name",
    practice_name: "Practice Name",
    parent_name: "Parent Name",
    parent_type: "Parent Type",
    npi: "NPI#",
    email: "Email",
    phone: "Phone Number",
    status: "Status",
    created_date: "Created Date"
  };

  public previewModal_skip: any = [
    "_id",
    "user_type",
    "tech_id",
    "biller_id",
    "doctors_office_id",
    "taxo_list",
    "password",
    "created_at",
    "id",
    "name_search",
    "updated_at"
  ];
  public tableName: any = 'users';
  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public user_cookie: any;
  public searchingEndpoint: any = "datalist";
  public searchSourceName: any = "data_doctor_list"
  public editUrl: any = 'sales-person/edit-doctor';
  public apiUrl: any;
  public datacollection: any = 'getdoctorlistdata';
  public data: any;
  public field: any;
  public fetch: any;
  public libdata: any = {
    basecondition: "",
    updateendpoint: 'statusupdate',
    hidedeletemany: true,
    hideeditbutton: false,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hideviewbutton: false,
    hidestatustogglebutton: true,
    hideaction: false,
    tableheaders: ['firstname', 'lastname', 'email', 'phone', 'practice_name', 'npi', 'status', 'created_date',], //not required
  }
  public sortdata: any = {
    "type": 'desc',
    "field": 'firstname',
    "options": ['firstname', 'email', 'practice_name', 'npi', 'status', 'created_date']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      // {label:"Search by Taxonomy",field:'taxo_list'},
      { label: "Search By E-Mail", field: 'email' }, { label: "Search By NPI", field: 'npi' }]
    };
  // ====================================================================


  public allResolveData: any = {};

  constructor(private http: HttpServiceService, private cookieService: CookieService,
    private router: Router, public activatedRoute: ActivatedRoute) {

    this.user_cookie = cookieService.get('jwtToken');
    let allData = cookieService.getAll();
    this.userData = JSON.parse(allData.user_details);

    console.log("Data: ", this.userData);

    this.libdata.basecondition = { parent_id: this.userData._id };
    this.shareDetails = {
      baseUrl: environment.doctorSignUpBaseUrl,
      userId: this.userData._id
    };
    // console.log('libdata',this.libdata);

    this.apiUrl = http.baseUrl;


    /* Get resolve data */
    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.dataCount.data;
    });
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint = 'getdoctorlistdata';
    let endpointc = 'getdoctorlistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'firstname'
      },
      data: {}
    };

    if(this.userData.parent_type != 'admin') {
      data.data.parent_id = this.userData._id;
      data.data.parent_type = this.userData.parent_type;
    } else {
      data.data.parent_id = this.userData.parent_id;
      data.data.parent_type = this.userData.parent_type;
    }

    this.http.httpViaPost(endpointc, data).subscribe((res: any) => {
      // console.log('in constructor');
      // console.log(result);
      this.docData_count = res.count;
      //console.warn('blogData c',res);

    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint, data).subscribe((res: any) => {

      this.docData = res.results.res;

    }, error => {
      console.log('Oooops!');
    });
  }

}
