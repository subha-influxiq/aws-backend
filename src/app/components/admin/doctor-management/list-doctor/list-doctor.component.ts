import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  // ===============================Declarations=========================
  public  docData: any = [];
  public docData_skip: any = ["_id", "created_at", "password", "confirmpassword",
   "taxonomies","password","confirmpassword","practicename","address","type","fullName","tech_id",
   "biller_id","doctorsOfficeName", "city", "state", "zip"];
  public docData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name", "email": "Email", "phone": "Phone",
    "practicename": "Practice name", "npm": "NPI#", "status": "Status", "taxo list": "Taxonomies",
    "fullNamecopy":"Doctor Name","biller" : "Biller Name",
    "tech" :"Tech Name","date" : "Date"
  };

  public previewModal_skip: any = ["_id", "tech_id", "biller_id","created_at","fullNamecopy"];
  public tableName: any = 'users';
  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public user_cookie: any;
  public searchingEndpoint:any="datalist";
  public searchSourceName:any="users_view_doctor_list"
  public editUrl:any = 'admin/doctor-management/edit';
  public apiUrl:any;
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullName' },
      // {label:"Search by Taxonomy",field:'taxo_list'},
      { label: "Search By E-Mail", field: 'email' }]
    };
  // ====================================================================

  constructor(private http: HttpServiceService, private cookieService: CookieService, 
    private router: Router,public activatedRoute : ActivatedRoute) {

    this.user_cookie = cookieService.get('jwtToken');
    this.apiUrl = http.baseUrl;
  }


  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.docData = resolveData.data.res;
    });
  }


}
