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
  public allUserData_skip: any = [
    "_id", "address", "zip", "city", "state", "user_type", "password", "created_at", "diagnostic_admin_id",
  ];
  public editUrl: any = "admin/biller-management/edit";
  public userData: any;
  
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
  previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "users_view_biller";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullName' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;
  constructor(public activeRoute: ActivatedRoute, public cookie: CookieService,
    public httpService: HttpServiceService) {

    this.user_cookie = cookie.get('jwtToken');
    this.userData = JSON.parse(this.cookie.get('user_details'));

    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/biller-management/edit';
    }

    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/biller-management/edit';
    }

    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.getAllBillerData();
  }
  getAllBillerData() {
    this.activeRoute.data.forEach((data) => {
      this.allBillerData = data.Billerdata.res;
    })
  }
}
