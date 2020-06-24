import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
// import { DownloadDetailsComponent } from './download-details/download-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-report-process-time',
  templateUrl: './report-process-time.component.html',
  styleUrls: ['./report-process-time.component.css']
})
export class ReportProcessTimeComponent implements OnInit {
  public loginUserData: any = {};
  public jwtToken: string = "";
  public htmlText: any = {
    headerText: "Patient Reports",
    path : {}
  };
  public allResolveData: any = {};
  public shareDetails: any = {
    baseUrl: environment.doctorSignUpBaseUrl,
    userId: ""
  };
  public status: any = [];

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
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidedeletemany: true,
    hidestatustogglebutton: true,
    hideviewbutton: true,
    tableheaders: [
      "patient_name",
      // "tech_name",
      "report_uploaded_datetime",
      "report_process_datetime",
      "processing_time",
    ]
  }
  public allUserData_modify_header: any = {
    "patient_name": "Report Name",
    "report_uploaded_datetime": "Report Uploaded",
    "report_process_datetime": "Report Process",
    "processing_time": "Reports Processing Time(Minutes)"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any = environment.apiBaseUrl1;
  public tableName: any = "data_pece";
  public datacollection: any = 'getreportprocessdata';

  public sortdata: any = {
    "type": 'desc',
    "field": 'patient_name',
    "options": ['patient_name',]
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };

  public previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];
  public SearchingEndpoint: any = "datalist";
  public authval: any = [];
  public docofficeval: any = [];
  public techval: any = [];
  public parentnameval: any = [];
  public doctorcity: any = [];
  public doctorstate: any = [];
  public patientcity: any = [];
  public patientstate: any = [];
  public SearchingSourceName: any = "data_biller_list";
  public search_settings: any =
    {
      
      textsearch: [{label: "Search By Report Name", field: 'patient_name_search'}],
      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at_datetime" }], 
      // { label: "Search By E-Mail", field: 'email' }, { label: "Search By Parent Name", field: 'parent_search' }, { label: "Search By Company Name", field: 'company_search' }],
      // search:[,
      // ]
    };
  // lib list end

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public deviceService: DeviceDetectorService, private matSnackBar: MatSnackBar) {

    this.loginUserData["user_details"] = cookieService.getAll();
    this.loginUserData.user_details.user_details = JSON.parse(this.loginUserData.user_details.user_details);
    this.shareDetails.userId = this.loginUserData.user_details.user_details._id;
    this.shareDetails.user_type = this.loginUserData.user_details.user_details.user_type;

    this.loginUserData["jwtToken"] = cookieService.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');

    /* Get resolve data */
    // this.activatedRoute.data.subscribe(resolveData => {
      // this.allResolveData = resolveData.dataCount.data.dashboardCount[0];
      //this.viewReportProcessData(this.htmlText.headerText);
    // });
    // lib list
    let endpoint = 'getreportprocessdata';
    let endpointc = 'getreportprocessdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'patient_name'
      },
      data:this.htmlText.path
    }

    this.http.httpViaPostbyApi1(endpointc, data).subscribe((res: any) => {
      this.billerData_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPostbyApi1(endpoint, data).subscribe((res: any) => {
      // console.log(res);
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
