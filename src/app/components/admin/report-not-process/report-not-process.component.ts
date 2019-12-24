import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-report-not-process',
  templateUrl: './report-not-process.component.html',
  styleUrls: ['./report-not-process.component.css']
})

export class ReportNotProcessComponent implements OnInit {

  public allResloveData: any = [];
  public allUserData_skip: any = ["doctor_id", "tech_id", "report_type", "status", "patientName", "_id", "patientName_search", "record", "billGenerationDate", "billSentDate", "superBill", "status_text", "note", "file_upload_server_id"];
  public editUrl: any = "admin/admin-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name", "lastname": "Last Name",
    "email": "E-Mail", "phone": "Phone Number", "date": "Date",
    "status": "Status","address": "Address",
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
    this.activatedRoute.data.forEach((resolveData) => {
      console.log("Data: ", resolveData.data);
      this.allResloveData = resolveData.data.res;
    });
  }
}

