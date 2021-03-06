import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
// import { DownloadDetailsComponent } from '../download-details/download-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-approved-patient-reports-billeradmin',
  templateUrl: './approved-patient-reports-billeradmin.component.html',
  styleUrls: ['./approved-patient-reports-billeradmin.component.css']
})
export class ApprovedPatientReportsBilleradminComponent implements OnInit {
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
    "created_at", "doctor_name"
  ];
  public editUrl: any = "admin/biller-management/edit";
  public userData: any;
  public libdata: any = {
    basecondition: { status: { $gt: 10, $lt: 14 } },
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
        link: environment.s3bucket + "reports",
        type: 'externallink',
        paramtype: 'angular',
        param: ['download_file_name']
      },
      {
        label: "Tech Details",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-tech-details',
        datafields: ['firstname', 'lastname', 'email', 'phone', 'address', 'city', 'state', 'zip'],
        param: 'id',
        headermessage: 'Tech Info',
      },
      {
        label: "View Codes",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-codes-details',
        datafields: ['additional_potential_health_risks', 'cpt_codes', 'icd_codes'],
        param: 'id',
        headermessage: 'Codes Info',
      },
      {
        label: "Doctor Details",
        type: 'action',
        datatype: 'api',
        endpoint: 'get-doctor-details',
        datafields: ['firstname', 'lastname', 'email', 'fax', 'practice_name', 'npi', 'phone', 'address', 'city', 'state', 'zip'],
        param: 'id',
        headermessage: 'Doctor Info',
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
        cond: 'parent_details_check',
        condval: 1,
        param: 'id',
        headermessage: 'Parent Info',
      },
      {
        label: "View Jobticket",
        route: "admin-biller/report-jobtickets/",
        type: 'internallink',
        param: ['_id'],
        cond: 'status',
        condval: 13
      },
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidestatustogglebutton: true,
    hideviewbutton: true,
    tableheaders: [
      "patient_name",
      "status_text",
      "created_at_datetime",
      "status_datetime",
      "cpt_addl",
      "general_details",
    ]
  }
  public allUserData_modify_header: any = {
    "general_details": "Related Info",
    "patient_name": "Patient Name",
    "status_text": "Status",
    "created_at_datetime": "Report Added",
    "status_datetime": "Last Status Time",
    "cpt_addl": "CPT/ Addl Hrisk C",
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any = environment.apiBaseUrl1;
  public tableName: any = "data_pece";
  public datacollection: any = 'getPatientlistdata-approved';

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
    { val: 1, 'name': 'Active' },
    { val: 0, 'name': 'Inactive' }
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
    { val: "TM FLOW V4", 'name': 'TM FLOW V4' }
  ];
  public report: any = [
    { val: "Biller Admin Approved", 'name': 'Biller Admin Approved' },
    { val: "Biller Admin Not Approved", 'name': 'Biller Admin Not Approved' },
    { val: "Biller Admin Hold", 'name': "Biller Admin Hold" }
  ];
  public cptcodes: any = [
    { val: "95923", 'name': '95923' },
    { val: "95943", 'name': '95943' },
    { val: "95921", 'name': "95921" },
    { val: "93923", 'name': "93923" },
    { val: "93922", 'name': "93922" }
  ];
  public status_search: any = [
    { val: 10, 'name': 'Biller Admin Approved' },
    { val: 11, 'name': 'Biller Admin Not Approved' },
    { val: 12, 'name': "Biller Admin Hold" }
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
      { label: 'Search By Parent Type', field: 'parent_type', values: this.parent_type },
      { label: "Search By Reports", field: 'status_text', values: this.report },
      { label: 'Search By Status', field: 'status_search', values: this.status_search },
      { label: 'Search By CPT Codes', field: 'cpt_codes_search', values: this.cptcodes },
      { label: "Search By Doctor", field: 'doc_name_search', values: this.authval },
      { label: "Search By Tech", field: 'tech_name_search', values: this.techval },
      { label: "Search By Doctor Office", field: 'author_search', values: this.docofficeval },
      { label: "Search By Parent Name", field: 'patient_name', values: this.parentnameval },
      { label: "Search By Doctor City", field: 'author_search', values: this.doctorcity },
      { label: "Search By Doctor State", field: 'author_search', values: this.doctorstate },
      { label: "Search By Parent City", field: 'author_search', values: this.patientcity },
      { label: "Search By Parent State", field: 'author_search', values: this.patientstate }
    ],
    textsearch: [
      { label: "Search By Patient Name", field: 'patient_name_search' }
    ]
  };
  // lib list end

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public deviceService: DeviceDetectorService, private matSnackBar: MatSnackBar) {

    this.loginUserData["user_details"] = cookieService.getAll();
    this.loginUserData["jwtToken"] = cookieService.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');

    // lib list
    let endpoint = 'getPatientlistdata-approved';
    let endpointc = 'getPatientlistdata-approved-count';
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
      // console.log(res);
      this.allBillerData = res.results.res;
    }, error => {
      console.log('Oooops!');
    });
  }

  ngOnInit() {
    let data: any = {
      "source": "patient_data_desc_patient_name",
      "condition": {},
      "token": this.jwtToken
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

  ngAfterViewInit() {
  }

  viewReportProcessData(flag) {
    console.log(flag);
  }


}
