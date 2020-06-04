import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { HttpServiceService } from '../../../services/http-service.service';


@Component({
  selector: 'app-doctor-office-dashboard',
  templateUrl: './doctor-office-dashboard.component.html',
  styleUrls: ['./doctor-office-dashboard.component.css']
})
export class DoctorOfficeDashboardComponent implements OnInit {


  // Lib list
  public allBillerData: any = [];
  public billerData_count: any = 0;
  public datasource: any;
  public field: any;
  public allUserData_skip: any = [
    "_id",
    "report_file_type",
    "doctor_name",
    "tech_id",
    "tech_email",
    "batch_name",
    "report_type",
    "status",
    "file_basepath",
    "file_bucketname",
    "file_name",
    "file_original_name",
    "file_type",
    "converted_image",
    "images",
    "patient_details",
    "patient_name_search",
    "report_life_circle",
    "note",
    "additional_potential_health_risks",
    "cpt_codes",
    "created_at"
  ];
  public editUrl: any = "admin/biller-management/edit";
  public userData: any;
  public libdata: any = {
    basecondition: { 
      status: { "$gt": 10 }
    },
    updateendpoint: '',
    custombuttons: [
      {
        label: "View Report",
        route: "doctor/patient-record-report/",
        type: 'internallink',
        param: ['_id'],
      },
      {
        label: "Download Report",
        link: "https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/reports",
        type: 'externallink',
        paramtype: 'angular',
        param: ['download_file_name']
      }
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidestatustogglebutton: true,
    hideviewbutton: true,
    tableheaders: [
      "patient_name",
      // "tech_name",
      "status_text",
      "created_at_datetime",
      "cpt_addl",
      "general_details",
      // "parent_type",
      // "parent_id",
      // "doctors_office_id",
    ]
  }
  public allUserData_modify_header: any = {
    "general_details": "Related Info",
    // "tech_name": "Tech Name",
    "patient_name": "Patient Name",
    "status_text": "Status",
    "created_at_datetime": "Report Added",
    "cpt_addl": "CPT/ Addl Hrisk C", 
    // "addl_hlth_risk": "Addl Hlth Risk"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any = environment.apiBaseUrl;
  public tableName: any = "data_pece";
  public datacollection: any = 'getpatientlistdata';

  public sortdata: any = {
    "type": 'desc',
    "field": 'firstname',
    "options": ['firstname', 'email', 'created_date']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };

  public previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributor' }, { val: "doctor_group", 'name': 'Doctor Group' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_biller_list";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }, { label: 'Search By Parent Type', field: 'parent_type_search', values: this.parent_type }],
      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at_datetime" }], 
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }, { label: "Search By Parent Name", field: 'parent_search' }, { label: "Search By Company Name", field: 'company_search' }]

    };
  // lib list end

  public allData: any;
  public authData: any;

  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar,public http: HttpServiceService, public matSnackBar: MatSnackBar) {

      this.allData = cookieService.getAll();
    this.authData = JSON.parse(this.allData.user_details);
    this.authData["jwtToken"] = cookieService.get('jwtToken');

      // lib list
    let endpoint = 'getpatientlistdata';
    let endpointc = 'getpatientlistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'patient_name'
      },
      searchcondition: {doc_id:this.authData._id},
      basecondition: {
        "doctor_office_id": this.authData._id
      },
      status: { "$gt": 10 },
      doctor_office_id: this.authData._id
    }

    this.http.httpViaPostbyApi1(endpointc, data).subscribe((res: any) => {
      this.billerData_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPostbyApi1(endpoint, data).subscribe((res: any) => {
      this.allBillerData = res.results.res;
    }, error => {
      console.log('Oooops!');
    });
    }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  viewReportProcessData(string: any = null) {

  }

}
