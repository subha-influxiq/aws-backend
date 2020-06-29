import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadDialogBoxComponent } from '../../common/upload-dialog-box/upload-dialog-box.component';
import { CommonFunction } from '../../../class/common/common-function';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import * as momentImported from 'moment';
import { environment } from '../../../../environments/environment';

const moment = momentImported;

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})

export class DoctorDashboardComponent implements OnInit {

  public jwtToken: any;

  public shareDetails: any = {
    baseUrl: environment.doctorSignUpBaseUrl,
    userId: ""
  };

  // Lib list
  public allDocData: any = [];
  public docData_count: any = 0;
  public datasource: any;
  public field: any;
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
    basecondition: "",
    updateendpoint: 'status-update-doctor',
    updateendpointmany: 'status-update-doctor',
    custombuttons: [
      {
        label: "View Report",
        route: "doctor/view-patient-record/",
        type: 'internallink',
        param: ['_id'],
      },
      {
        label: "Tech Details",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-tech-details',
        datafields: ['first name', 'last name', 'email', 'phone', 'address', 'city', 'state', 'zip'],
        param: 'id',
        headermessage: 'Tech Information',
      },
      {
        label: "View Codes",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-codes-details',
        datafields: ['Additional Potential Health Risks', 'CPT Codes', 'ICD Codes'],
        param: 'id',
        headermessage: 'Associated Codes',
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
        cond: 'parent_check_flag',
        condval: 1,
        param: 'id',
        headermessage: 'Parent Information',
      },
      {
        label: "Download Report",
        link: "https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/reports",
        type: 'externallink',
        paramtype: 'angular',
        param: ['download_file_name']
      },
      {
        label: "Doctor Signed",
        type: 'action',
        datatype: 'api',
        endpoint: 'status-doctor-signed',
        otherparam: ["patient_name"],
        cond: 'status',
        condval: 11,
        param: 'id',
        headermessage: 'Status Update',
      },
      {
        label: "View Jobticket",
        route: "doctor/report-jobtickets/",
        type: 'internallink',
        param: ['_id'],
        cond: 'status',
        condval: 13
      }
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidedeletemany: true,
    hidestatustogglebutton: true,
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

  public status: any = [
    { val: "Doctor Sign and Send To Biller", 'name': 'Doctor Sign and Send To Biller' },
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
      { label: "Search By Tech", field: 'tech_name_search', values: this.techval },
      { label: "Search By Doctor Office", field: 'doctor_ofiice_name_search', values: this.docofficeval },
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

  public authData: any = {
  };
  public allResolveData: any = {};
  public htmlText: any = {
    buttonText: "Add One",
    headerText: "Reports Processed",
    billerData: [],
    signFlag: true
  };
  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };

  public allDataColumns: string[] = ['no', 'patient_name', 'doctor_name', 'tech_name', 'biller_name', 'bill_generation_date', 'bill_sent_date', 'report_type', 'status', 'super_bill', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public dialogRef: any;
  public allDataSource: any;
  public start_date: any;
  public end_date: any;
  public viewstatus: boolean = false;
  public btnName: any = 'view more';
  public data: any;
  public otherData: any = {
    all_details: { user_type: "" }
  };
  public header: any;
  public allData: any;

  constructor(public dialog: MatDialog, public commonFunction: CommonFunction, public cookie: CookieService, public http: HttpServiceService, public activatedRoute: ActivatedRoute, public matSnackBar: MatSnackBar, public deviceService: DeviceDetectorService) {
    this.allData = cookie.getAll();
    this.authData = JSON.parse(this.allData.user_details);
    if (typeof (this.allData.doctor_signature) == 'undefined' && typeof (this.authData.doctor_signature) != 'undefined') {
      this.cookie.set('doctor_signature', this.authData.doctor_signature);
    }

    this.authData["jwtToken"] = cookie.get('jwtToken');
    this.jwtToken = this.authData.jwtToken;
    this.libdata.basecondition = {
      status: { "$gt": 10 }, doctor_id: this.authData._id
    };
    if (this.authData.parent_type != "admin") {
      this.status[0].val = "Doctor Signed";
      this.status[0].name = "Doctor Signed";
    }
    if (this.authData.status_text == "Doctor Signed") {
      this.status[0].val = "Send to Biller";
      this.status[0].name = "Doctor Signed";

    }
    if (typeof (this.authData.diagnostic_admin_id) != 'undefined') {
      this.htmlText.signFlag = false;
      this.data = { _id_object: this.authData.diagnostic_admin_id };
      this.header = { name: "Diagnostic Admin Name" };
    }

    if (typeof (this.authData.distributor_id) != 'undefined') {
      this.htmlText.signFlag = false;
      this.data = { _id_object: this.authData.distributor_id };
      this.header = { name: "Distributor Name" };
    }

    if (typeof (this.authData.doctorgroup_id) != 'undefined') {
      this.htmlText.signFlag = false;
      this.data = { _id_object: this.authData.doctorgroup_id };
      this.header = { name: "Doctor Group Name" };
    }

    this.activatedRoute.data.forEach(resolveData => {
      this.allResolveData.dashboardData = resolveData.doctordata.data;

      this.viewReportProcessData(this.htmlText.headerText);
    });
  }


  ngOnInit() {
    let data: any = {
      "source": "patient_data_desc_patient_name",
      "condition": {
        status: { "$gt": 10 },
        doctor_id_object: this.authData._id
      },
      "token": this.authData.jwtToken
    }
    this.http.httpViaPost("datalist", data).subscribe((response: any) => {
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

  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewReportProcessData(flag: string = null) {
    this.htmlText.headerText = flag;
    this.allDocData = [];
    this.docData_count = 0;

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
      doctor_id: this.authData._id
    }

    switch (flag) {
      case 'Reports Processed':
        data.status = {
          "$in": [11, 12, 13, 14, 15]
        };
        break;
      case 'Reports Pending Signature':
        data.doctor_signature = { $exists: false };
        break;
      case 'Reports Asked for Review':
        data.job_tickets_details = { $exists: true };
        break;
      case 'Reports Sent to Biller':
        data.status = 15;
        break;
      case 'Reports Downloaded by Biller':
        data.status = 16;
        break;
      default:
        break;
    }
    this.http.httpViaPost(endpointc, data).subscribe((res: any) => {
      this.docData_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint, data).subscribe((res: any) => {
      this.allDocData = res.results.res;
    }, error => {
      console.log('Oooops!');
    });
  }

  openModal(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Ok":
          this.dialogRef.close();
          break;
      }
    });
  }

  viewMore() {
    this.viewstatus = !this.viewstatus;

    if (this.viewstatus)
      this.btnName = "view less";
    else
      this.btnName = "view more";
  }

}