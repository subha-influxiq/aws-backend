import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DownloadDetailsComponent } from './download-details/download-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../environments/environment';

import * as momentImported from 'moment';
import { from } from 'rxjs';
const moment = momentImported;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  public loginUserData: any = {};
  public jwtToken: string = "";
  public htmlText: any = {
    headerText: "Patient Reports"
  };
  public allResolveData: any = {};

  // Lib list
  public allBillerData: any = [];
  public billerData_count: any = 0;
  public datasource: any;
  public field: any;
  public data: any;
  public allUserData_skip: any = [
    "_id",
    "report_file_type",
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
    "created_at","doctor_name"
  ];
  public editUrl: any = "admin/biller-management/edit";
  public userData: any;
  public libdata: any = {
    basecondition: "",
    updateendpoint: '',
    custombuttons: [
      {
        label: "View Report",
        route: "admin/patient-record/",
        type: 'internallink',
        param: ['_id'],
      },
      {
        label: "Download Report",
        link: "https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/reports",
        type: 'externallink',
        paramtype: 'angular',
        param: ['download_file_name']
      },
      {
        label:"Tech Details",
        type:'action',
        datatype:'api',
        endpoint:'get-tech-details',
        // otherparam:["patient_name"],
        //cond:'status',
        //condval:0,
        param:'id',
        refreshdata:true
    } ,
    {
      label:"View Codes",
      type:'action',
      datatype:'api',
      endpoint:'get-codes-details',
      // otherparam:["patient_name"],
      //cond:'status',
      //condval:0,
      param:'id',
      refreshdata:true
  } ,
    {
      label:"Doctor Details",
      type:'action',
      datatype:'api',
      endpoint:'get-doctor-details',
      // otherparam:["patient_name"],
      //cond:'status',
      //condval:0,
      param:'id',
      refreshdata:true
  } ,
  {
    label:"Doctor Office Details",
    type:'action',
    datatype:'api',
    endpoint:'get-doctor-office-details',
    // otherparam:["patient_name"],
    //cond:'status',
    //condval:0,
    param:'id',
    refreshdata:true
} ,
{
  label:"View Parent",
  type:'action',
  datatype:'api',
  endpoint:'get-doctor-office-details',
  // otherparam:["patient_name"],
  cond:'patient_details[0].parent_id',
  condval:"",
  param:'id',
  refreshdata:true
} ,
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
  public apiUrl: any = environment.apiBaseUrl1;
  public tableName: any = "data_pece";
  public datacollection: any = 'getPatientlistdata';

  public sortdata: any = {
    "type": 'desc',
    "field": 'patient_name',
    "options": ['patient_name', 'email', 'created_date']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };

  public previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributor' }, { val: "doctor_group", 'name': 'Doctor Group' }];
  public report_type: any = [{ val: "RM-3A", 'name': 'RM-3A' }, { val: "TM FLOW V3", 'name': 'TM FLOW V3' }, { val: "TM FLOW V4", 'name': 'TM FLOW V4' }];
  public SearchingEndpoint: any = "datalist";
  public authval: any = [
    { val: 'YmattZ', 'name': 'YmattZ A' },
    { val: 'YmattZ', 'name': 'YmattZ A' },
    { val: 'Ymatt', 'name': 'YmattZ AB' },
    { val: 'Jessica', 'name': 'A Jessica'}
];
  public SearchingSourceName: any = "data_biller_list";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }, { label: 'Search By Report Type', field: 'report_file_type', values: this.report_type } , { label: 'Search By Parent Type', field: 'parent_type', values: this.parent_type }],
      // datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at_datetime" }], 
      // textsearch: [{ label: "Search By Name", field: 'name_search' },
      // { label: "Search By E-Mail", field: 'email' }, { label: "Search By Parent Name", field: 'parent_search' }, { label: "Search By Company Name", field: 'company_search' }],
      search:[{label: "Search By Doctor", field: 'author_search', values:this.authval },
      {label: "Search By Tech", field: 'author_search', values:this.authval },{label: "Search By Doctor Office", field: 'author_search', values:this.authval },{label: "Search By Parent Name", field: 'author_search', values:this.authval },{label: "Search By Doctor City", field: 'author_search', values:this.authval },{label: "Search By Doctor State", field: 'author_search', values:this.authval },{label: "Search By Parent City", field: 'author_search', values:this.authval },{label: "Search By Parent State", field: 'author_search', values:this.authval }]
    };
  // lib list end

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public deviceService: DeviceDetectorService, private matSnackBar: MatSnackBar) {

    this.loginUserData["user_details"] = cookieService.getAll();
    this.loginUserData["jwtToken"] = cookieService.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');

    /* Get resolve data */
    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.dataCount.data.dashboardCount[0];
      //this.viewReportProcessData(this.htmlText.headerText);
    });

    // lib list
    let endpoint = 'getPatientlistdata';
    let endpointc = 'getPatientlistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'patient_name'
      }
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

  ngAfterViewInit() {
  }

  viewReportProcessData(flag) {
    console.log(flag);
  }

}
