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
  public user_cookie: any;

  public doctorOfficeAllData_skip: any = [
    "_id",
    "address",
    "zip",
    "city",
    "tech_id",
    "state",
    "user_type",
    "password",
    "created_at"
  ];
  public editUrl: any = "admin/doctor-office-management/edit";
  public doctorOfficeAllData_modify_header: any = {
    center_name: "Center Name",
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    phone: "Phone Number",
    status: "Status"
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
  public SearchingSourceName: any = "users_view_doctoroffice";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Center Name", field: 'centerName' },
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
    this.activatedRoute.data.forEach((data) => {
      this.doctorOfficeAllData = data.data.res;
    })
  }

}
