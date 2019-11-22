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
  docData: any = [];
  docData_skip: any = ["_id", "created_at", "password", "confirmpassword",
   "taxonomies","password","confirmpassword","practicename","address","type","fullName","tech_id",
   "biller_id","doctorsOfficeName", "city", "state", "zip"];
  docData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name", "email": "Email", "phone": "Phone",
    "practicename": "Practice name", "npm": "NPI#", "status": "Status", "taxo list": "Taxonomies","fullNamecopy":"Doctor Name","biller" : "Biller Name","tech" :"Tech Name"
  };

  modal_skip: any = ["_id", "tech_id", "biller_id"];
  tableName: any = 'users';
  UpdateEndpoint: any = "addorupdatedata";
  deleteEndpoint: any = "deletesingledata";
  user_cookie: any;
  searchingEndpoint:any="datalist";
  searchSourceName:any="users_view_doctor_list"
  editUrl:any = 'admin/doctor-management/edit';
  apiUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'fullName' },
      {label:"Search by Taxonomy",field:'taxo_list'},
      { label: "Search By E-Mail", field: 'email' }]
    };
  // ====================================================================

  constructor(private http: HttpServiceService, private cookieService: CookieService, 
    private router: Router,public activatedRoute : ActivatedRoute) {

    this.user_cookie = cookieService.get('jwtToken');
  }


  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.docData = resolveData.data.res;
      console.log("DATALIST",this.docData);
    });
  }


}
