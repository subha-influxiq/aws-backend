import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import * as momentImported from 'moment';
const moment = momentImported;


export interface PeriodicElement {
  no: number;
  patientName: string;
  doctorName: string;
  record_type: string;
  date_added: string;
  status: string;
}
export interface AllDataElement {
  no: number;
  patientName: string;
  doctorName: string;
  record: string;
  billSentDate: string;
  created_at: string;
  status: string;
}

export interface DialogData {
}

@Component({
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})

export class TechDashboardComponent implements OnInit {

  public jwtToken: any;
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
    "created_at"
  ];
  public editUrl: any = "admin/biller-management/edit";
  public userData: any;
  public libdata: any = {
    basecondition: {},
    updateendpoint: '',
    custombuttons: [
      {
        label: "View Report",
        route: "admin/patient-record/",
        type: 'internallink',
        param: ['_id'],
      },
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidestatustogglebutton: true,
    hideviewbutton: true,
    tableheaders: [
      "doctor_name",
      "tech_name",
      "patient_name",
      "status_text",
      "created_at_datetime",
      "cpt_code_count",
      "addl_hlth_risk"
    ]
  }
  public allUserData_modify_header: any = {
    "doctor_name": "Doctor Name",
    "tech_name": "Tech Name",
    "patient_name": "Patient Name",
    "status_text": "Status",
    "created_at_datetime": "Report Added",
    "cpt_code_count": "CPT Code Count",
    "addl_hlth_risk": "Addl Hlth Risk"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "data_pece";
  public datacollection: any = 'getbillerlistdata';

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
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }, { label: "Search By Parent Name", field: 'parent_search' }, { label: "Search By Company Name", field: 'company_search' }]

    };
  // lib list end

  public commonArray: PeriodicElement[] = [];
  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };

  displayedColumns: string[] = ['no', 'patientName', 'record_type', 'doctorName', 'techName', 'date_added', 'status', 'created_at'];
  allDataColumns: string[] = ['no', 'patientName', 'doctorName', 'techName', 'billerName', 'recordType', 'billGenerationData', 'billsendDate', 'status', 'created_at'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginatorAll: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatSort, { static: false }) sortAll: MatSort;

  dataSource: MatTableDataSource<PeriodicElement>;
  allDataSource: MatTableDataSource<AllDataElement>;

  public allResolveData: any;
  public htmlText: any = {
    headerText: "Patient Report Record"
  }
  public authData: any = {};
  public dialogRef: any;

  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction, public dialog: MatDialog) {

    let allData: any = cookie.getAll();
    this.authData["userData"] = JSON.parse(allData.user_details);
    this.authData["jwtToken"] = cookie.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookie.get('jwtToken');

    this.activatedRoute.data.forEach((data) => {
      this.allResolveData = data.techDashboardData.data;
      this.allResolveData["totalRemainToProcessCount"] = this.allResolveData.totalReportCount - this.allResolveData.processedReportCount;
      let allDashboardData: AllDataElement[] = this.allResolveData.totalReportData;
      this.allDataSource = new MatTableDataSource(allDashboardData);
    });


    // lib list
    this.libdata.basecondition.tech_id = this.authData.userData._id;
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
      },
      basecondition: {
        "tech_id": this.authData.userData._id
      }
    }

    this.httpService.httpViaPost(endpointc, data).subscribe((res: any) => {
      this.billerData_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.httpService.httpViaPost(endpoint, data).subscribe((res: any) => {
      this.allBillerData = res.results.res;
    }, error => {
      console.log('Oooops!');
    });
  }

  ngOnInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  ngAfterViewInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  viewDetailsData(flag: any) {
    var condition: any = {}
    
    this.htmlText.headerText = flag;

    if(this.searchJson.dateRange != '') {
      this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
    }

    switch (flag) {
      case 'Reports Uploaded':
        condition = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "tech_id": this.authData.userData._id
          },
          "token": this.authData.jwtToken
        }
        break;
      case 'Reports Processed':
        condition = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "tech_id": this.authData.userData._id,
            "page_1": { $exists: true },
            "page_2": { $exists: true },
            "page_3": { $exists: true },
            "page_4": { $exists: true },
            "page_5": { $exists: true },
            "page_6": { $exists: true },
            "page_7": { $exists: true },
          },
          "token": this.authData.jwtToken
        };
        break;
      case 'Remain Process':
        condition = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "tech_id": this.authData.userData._id,
            $or: [
              { "page_1": { $exists: false } },
              { "page_2": { $exists: false } },
              { "page_3": { $exists: false } },
              { "page_4": { $exists: false } },
              { "page_5": { $exists: false } },
              { "page_6": { $exists: false } },
              { "page_7": { $exists: false } }
            ]
          },
          "token": this.authData.jwtToken
        };
        break;
      default:
        condition = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "tech_id": this.authData.userData._id
          },
          "token": this.authData.jwtToken
        };
        break;
    }
    this.httpService.httpViaPost('dashboard-datalist', condition).subscribe((response) => {
      let allDashboardData: AllDataElement[] = response.data;
      this.allDataSource = new MatTableDataSource(allDashboardData);
      this.allDataSource.paginator = this.paginator;
      this.allDataSource.sort = this.sortAll;
    });
  }

  openDialog(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Ok":
          this.dialogRef.close();
          break;
      }
    });
  }

  /**All doctor deatls view in modal */
  allDoctorViewModal() {
    const dialogGenreRef = this.dialog.open(DoctorViewDialogComponent, {
      panelClass: ['modal-sm', 'infomodal'],
      disableClose: true,
    });

    dialogGenreRef.afterClosed().subscribe(result => {
      console.log('Modal Close');
    });
  }

  resetSearch() {
    this.searchJson = {
      doctorName: "",
      patientName: "",
      status: "",
      dateRange: ""
    };
    this.viewDetailsData(this.htmlText.headerText);
  }

}


// Doctor View dialog component
@Component({
  selector: 'doctor-dialog',
  templateUrl: 'doctorview.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})
export class DoctorViewDialogComponent {
  public user_token: any;
  public allDoctorData: any;
  public user_data: any;
  public allData: any = {};
  public userToken: any;
  public loader: boolean = true;

  constructor(public dialogRef: MatDialogRef<DoctorViewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, ) {

    this.allData = cookie.getAll()
    this.user_data = JSON.parse(this.allData.user_details);
    this.user_token = cookie.get('jwtToken');
    var dta: any = {
      "source": "data_pece",
      "condition": {
        "tech_id_object": this.user_data._id
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('datalist', dta).subscribe((response: any) => {
      let result: any = response.res;
      if (response.resc > 0) {
        this.loader = false;
        this.allDoctorData = response.res;
      }
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
