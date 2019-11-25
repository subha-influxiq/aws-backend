import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-manage-admin-list',
  templateUrl: './manage-admin-list.component.html',
  styleUrls: ['./manage-admin-list.component.css']
})
export class ManageAdminListComponent implements OnInit {

  public TechDashboardAllData: any = [];
  public allUserData_skip: any = ["confirmpassword", "accesscode", "password",
    "created_at", "_id", "id", "updated_at", "phoneno", "type", "taxo_list",
    "state", "city", "zip", "address", "fullName"];
  public editUrl: any = "admin/admin-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "phone": "Phone Number", "date": "Date",
    "status": "Status", "zip": "Zip", "city": "City", "state": "State", "address": "Address",
    "fullNamecopy": "Name"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public previewModal_skip : any=['_id','fullNamecopy'];
  public tableName: any = "users";
  public apiUrl: any;
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "users_view_admin";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullName' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;


  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService,
    public httpService: HttpServiceService) {

    this.user_cookie = cookie.get('jwtToken');
    this.apiUrl = httpService.baseUrl;
    
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data) => {
      this.TechDashboardAllData = data.adminManagementdData.res;
    })


  }


}
