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
import { environment } from '../../../../environments/environment';
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




  // list *********
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
    basecondition: {
      status: { "$gt": 10 }
    },
    updateendpoint: '',
    custombuttons: [
      {
        label: "View Report",
        route: "tech/view-patient-record/",
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
        label: "View Codes",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-codes-details',
        datafields: ['Additional Potential Health Risks', 'CPT Codes', 'ICD Codes'],
        param: 'id',
        headermessage: 'Associated Codes'
      },
      {
        label: "Doctor Details",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-doctor-details',
        datafields: ['firstname', 'lastname', 'email', 'fax', 'Practice Name', 'NPI', 'phone', 'address', 'city', 'state', 'zip'],
        param: 'id',
        headermessage: 'Doctor Information',
      },
      {
        label: "Doctor Office Details",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-doctor-office-details',
        datafields: ['center name', 'first name', 'last name', 'email', 'phone', 'address', 'city', 'state', 'zip'],
        param: 'id',
        headermessage: 'Doctor Office Info',
      },
      {
        label: "Parent Details",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-parent-details',
        datafields: ['Parent Name', 'Contact Person', 'email', 'phone', 'address', 'city', 'state', 'zip'],
        param: 'id',
        headermessage: 'Parent Information',
      },
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidestatustogglebutton: true,
    hidedeletemany: true,
    hidemultipleselectbutton: true,
    hideupdatemany: true,
    hideviewbutton: true,
    tableheaders: [
      "patient_name",
      "status_text",
      "created_at_datetime",
      "cpt_addl",
      "general_details"
    ]
  }
  public allUserData_modify_header: any = {
    "general_details": "Related Info",
    "patient_name": "Patient Name",
    "status_text": "Status",
    "created_at_datetime": "Report Added",
    "cpt_addl": "CPT/ Addl Hrisk C",
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any = environment.apiBaseUrl1;
  public tableName: any = "data_pece";
  public datacollection: any = 'getPatientlistdata';

  public sortdata: any = {
    "type": 'desc',
    "field": 'patient_name',
    "options": ['patient_name', 'created_at_datetime']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };

  public previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];
  public status: any = [];
  public status_search: any = [
    { val: "Biller Admin Approved", 'name': 'Biller Admin Approved' }, 
    { val: "Biller Admin Not Approved", 'name': 'Biller Admin Not Approved' }, 
    { val: "Biller Admin Hold", 'name': "Biller Admin Hold" }, 
    { val: "Doctor Sign", 'name': "Doctor Sign" }, 
    { val: "Send to Biller", 'name': "Send to Biller" },
    { val: "Downloaded", "name": "Report Downloaded" }
  ];
  public cptcodes: any = [
    { val: "95923", 'name': '95923' }, 
    { val: "95943", 'name': '95943' }, 
    { val: "95921", 'name': "95921" }, 
    { val: "93923", 'name': "93923" }, 
    { val: "93922", 'name': "93922" }
  ];
  public parent_type: any = [
    { val: "admin", 'name': 'Admin' }, 
    { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, 
    { val: "distributors", 'name': 'Distributor' }, 
    { val: "doctor_group", 'name': 'Doctor Group' }
  ];
  public report_type: any = [
    { val: "RM-3A", 'name': 'RM-3A' }, 
    { val: "TM FLOW V3", 'name': 'TM FLOW V3' }, 
    { val: "TM FLOW V4", 'name': 'TM FLOW V4' }, 
    { val: "CMAT with BP Cuffs", 'name': "CMAT with BP Cuffs" }
  ];
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
  public search_settings: any = {
    selectsearch: [
      { label: 'Search By Report Type', field: 'report_file_type', values: this.report_type }, 
      { label: "Search By Status", field: 'status_text', values: this.status_search }, 
      { label: "Search By Doctor", field: 'doc_name_search', values: this.authval }, 
      { label: "Search By Doctor Office", field: 'doctor_ofiice_name_search', values: this.docofficeval }, 
      { label: "Search By Doctor City", field: 'doctor_city_search', values: this.doctorcity }, 
      { label: "Search By Doctor State", field: 'doctor_state_search', values: this.doctorstate }, 
      { label: "Search By Patient City", field: 'patient_state_search', values: this.patientcity }, 
      { label: "Search By Patient State", field: 'patient_city_search', values: this.patientstate }
    ],
    datesearch: [
      { startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at_datetime" }
    ],
    textsearch: [
      { label: "Search By Patient Name", field: 'patient_name_search' }
    ],
    search: [
      { label: 'Search By CPT Codes', field: 'cpt_codes_search', values: this.cptcodes }
    ]
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
    if(this.activatedRoute.snapshot.params._id) {
      this.authData["userData"] = {_id:this.activatedRoute.snapshot.params._id};
      // this.authData["parent_type"] = this.activatedRoute.snapshot.params.parent_type;
    }
    else {
      console.log('************************')
      this.authData["userData"] = JSON.parse(allData.user_details);
    }

    this.libdata.basecondition.tech_id = this.authData.userData._id;

    /* Get Auth Token */
    this.jwtToken = cookie.get('jwtToken');

    this.activatedRoute.data.forEach((data) => {
      this.allResolveData = data.techDashboardData.data;
      this.allResolveData["totalRemainToProcessCount"] = this.allResolveData.totalReportCount - this.allResolveData.processedReportCount;
      let allDashboardData: AllDataElement[] = this.allResolveData.totalReportData;
      this.allDataSource = new MatTableDataSource(allDashboardData);
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
      },
      status: { "$gt": 10 },
      tech_id: this.authData.userData._id
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
    let data: any = {
      "source": "patient_data_desc_patient_name",
      "condition": {
        status: { "$gt": 10 },
        tech_id_object: this.authData.userData._id
      },
      "token": this.jwtToken
    }
    this.httpService.httpViaPost("datalist", data).subscribe((response: any) => {
      var start = false;
      var count = 0;
      for (var i in response.res) {
        if (response.res[i].doc_name_search != "") {
          for (var j in this.authval) {
            if (response.res[i].doc_name == this.authval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.authval.push({ name: response.res[i].doc_name, val: response.res[i].doc_name_search });
          }
          start = false;
          count = 0;

        }
      }
      for (var i in response.res) {
        if (response.res[i].tech_name_search != "") {
          for (var j in this.techval) {
            if (response.res[i].tech_namesearch == this.techval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.techval.push({ name: response.res[i].tech_namesearch, val: response.res[i].tech_name_search })
          }
          start = false;
          count = 0;
        }
      }
      for (var i in response.res) {
        if (response.res[i].parent_name_search != "") {
          for (var j in this.parentnameval) {
            if (response.res[i].parent_namesearch == this.parentnameval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.parentnameval.push({ name: response.res[i].parent_namesearch, val: response.res[i].parent_name_search })
          }
          start = false;
          count = 0;

        }
      }
      for (var i in response.res) {
        if (response.res[i].doctor_state_search != "") {
          for (var j in this.doctorstate) {
            if (response.res[i].doctor_state == this.doctorstate[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.doctorstate.push({ name: response.res[i].doctor_state, val: response.res[i].doctor_state_search })
          }
          start = false;
          count = 0;


        }
      }
      for (var i in response.res) {
        if (response.res[i].doctor_city_search != "") {
          for (var j in this.doctorcity) {
            if (response.res[i].doctor_city == this.doctorcity[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.doctorcity.push({ name: response.res[i].doctor_city, val: response.res[i].doctor_city_search })
          }
          start = false;
          count = 0;


        }
      }
      for (var i in response.res) {
        if (response.res[i].patient_city_search != "") {
          for (var j in this.patientcity) {
            if (response.res[i].patient_city == this.patientcity[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.patientcity.push({ name: response.res[i].patient_city, val: response.res[i].patient_city_search })
          }
          start = false;
          count = 0;


        }
      }
      for (var i in response.res) {
        if (response.res[i].patient_state_search != "") {
          for (var j in this.patientstate) {
            if (response.res[i].patient_state == this.patientstate[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.patientstate.push({ name: response.res[i].patient_state, val: response.res[i].patient_state_search })
          }
          start = false;
          count = 0;


        }
      }
      for (var i in response.res) {
        if (response.res[i].doctor_ofiice_name_search != "") {
          for (var j in this.docofficeval) {
            if (response.res[i].doctor_ofiice_namesearch == this.docofficeval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) {
            this.docofficeval.push({ name: response.res[i].doctor_ofiice_namesearch, val: response.res[i].doctor_ofiice_name_search })
          }
          start = false;
          count = 0;
        }
      }
    }, error => {
      console.log('Oooops!');
    });
  }

  ngAfterViewInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  viewDetailsData(flag: any) {
    var condition: any = {}

    this.htmlText.headerText = flag;

    if (this.searchJson.dateRange != '') {
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
    public httpService: HttpServiceService,) {

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
