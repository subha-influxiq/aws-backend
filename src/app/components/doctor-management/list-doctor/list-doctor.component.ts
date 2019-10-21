import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
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
   "taxonomies","password","confirmpassword","practicename","address"];
  docData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name", "email": "Email", "phone": "Phone",
    "practicename": "Practice name", "npm": "NPM#", "address": "Address", "city": "City", "state": "State",
    "zip": "ZIP", "status": "Status", "taxo list": "Taxonomies","fullname":"Fullname"
  };
  tableName: any = 'doctors_view';
  UpdateEndpoint: any = "addorupdatedata";
  deleteEndpoint: any = "deletesingledata";
  user_cookie: any;
  searchingEndpoint:any="datalist";
  editUrl:any = 'doctor-management/edit';
  apiUrl: any = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
  status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Fullname", field: 'fullname' },{label:"Search by taxonomy",field:'taxo_list'}]
    };
  // ====================================================================

  constructor(private http: HttpServiceService, private cookieService: CookieService, 
    private router: Router,public activatedRoute : ActivatedRoute) {
    this.user_cookie = cookieService.get('jwtToken');
  }


  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.docData = resolveData.data.res;
    });
  }


}
