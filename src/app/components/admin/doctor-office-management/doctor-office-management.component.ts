import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-doctor-office-management',
  templateUrl: './doctor-office-management.component.html',
  styleUrls: ['./doctor-office-management.component.css']
})
export class DoctorOfficeManagementComponent implements OnInit {

  public doctorOfficeAllData: any = [];
  public doctorOfficeData_count:any=0;
  public datasource: any;

  public user_cookie: any;

  public doctorOfficeAllData_skip: any = [
    "_id",
    "address",
    "zip",
    "city",
    "tech_id",
    "doctor_id",
    "state",
    "user_type",
    "password",
    "id",
    "created_at",
    "updated_at",
    "refresh_token",
    "lastGoogleCalendarUpdateOn",
    "name_search"
  ];
  public editUrl: any = "admin/doctor-office-management/edit";
  public doctorOfficeAllData_modify_header: any = {
    "center name": "Center Name",
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "phone": "Phone Number",
    "status": "Status"
  };
  public previewModal_skip: any = [
    "_id",
    "tech_id",
    "state",
    "user_type"
  ];

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "users";
  public userData: any;

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_doctor_office_list";
  public datacollection: any='getdoctorofficelistdata';
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
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Center Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }],

    };

  constructor(public activatedRoute: ActivatedRoute,
    public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService) {

    this.user_cookie = cookie.get('jwtToken');
    this.userData = JSON.parse(this.cookie.get('user_details'));
    this.apiUrl = httpService.baseUrl;

    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/doctor-office-management/edit';
    }
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getdoctorofficelistdata';
    let endpointc='getdoctorofficelistdata-count';
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
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.doctorOfficeData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.doctorOfficeAllData =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  }

}
