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
public doctorOfficeAllData : any=[];
public user_cookie:any;

public doctorOfficeAllData_skip: any = ["password","_id","type","techId","centerName","techCount"];
  public editUrl: any = "admin/doctor-office-management/edit";
  public doctorOfficeAllData_modify_header: any = {
    "centerNamecopy":"Center Name","email":"E-Mail","phone":"Phone","address":"Address","city":"City",
    "state":"State","date":"Date Added","status":"Status","techName":"Tech Name","zip" :"Zip", "techCount": "Tech Count"
  };
  public previewModal_skip : any=['_id','techId','centerNamecopy'];

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl:any;
  public tableName: any = "users";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName:any = "users_view_doctoroffice";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Center Name", field: 'centerName' },
      { label: "Search By E-Mail", field: 'email' }],

    };

  constructor(public activatedRoute : ActivatedRoute,
    public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService) {

    this.user_cookie = cookie.get('jwtToken');
    this.apiUrl = httpService.baseUrl ; 
      }

  ngOnInit() {
    this.activatedRoute.data.forEach((data) => {
      this.doctorOfficeAllData = data.data.res;
    })
  }

}
