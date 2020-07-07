import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonFunction } from '../../../class/common/common-function';
import { Router, ActivatedRoute ,ActivatedRouteSnapshot} from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import * as momentImported from 'moment';
import { environment } from '../../../../environments/environment';
const moment = momentImported;

@Component({
  selector: 'app-biller-dashboard',
  templateUrl: './biller-dashboard.component.html',
  styleUrls: ['./biller-dashboard.component.css']
})

export class BillerDashboardComponent implements OnInit {

  public htmlText: any = {
    tableHeaderText: "Patient Reports"
  };
  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };
  public loginUserData: any = {};
  public allResolveData: any;
  public dialogRef: any;
  public jwtToken: string = "";

  displayedColumns: string[] = ['no', 'Patient Name', 'Doctor Name', 'Tech Name', 'Bill Sent Date', 'Bill Generation Date', 'Status','report_type', 'Action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  /* Initializing the datasource to null */
  dataSource = null;

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
    basecondition: "",
    updateendpoint: 'status-update-doctor',
    custombuttons: [
      {
        label: "Download Report",
        route: "direct-Download-Reports/super-bill",
        type: 'internallink',
        param: ['_id'],
      },
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidestatustogglebutton: true,
    hidemultipleselectbutton: true,
    hidedeletemany:true,
    hideupdatemany:true,
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

  public status: any = [{ val: "Send to Biller", 'name': 'Send to Biller' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributor' }, { val: "doctor_group", 'name': 'Doctor Group' }];
  public report_type: any = [{ val: "RM-3A", 'name': 'RM-3A' }, { val: "TM FLOW V3", 'name': 'TM FLOW V3' }, { val: "TM FLOW V4", 'name': 'TM FLOW V4' }, { val: "CMAT with BP Cuffs", 'name': "CMAT with BP Cuffs" }];
  public statussearch: any = [
    { val: 15, 'name': 'Send to Biller' }, 
    { val: 16, 'name': 'Report Downloded' }
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
  public search_settings: any =
    {

      selectsearch: [{ label: 'Search By Report Type', field: 'report_file_type', values: this.report_type }, { label: 'Search By Status', field: 'status_search', values: this.statussearch },{ label: "Search By Doctor", field: 'doc_name_search', values: this.authval }, { label: "Search By Tech", field: 'tech_name_search', values: this.techval }, { label: "Search By Doctor Office", field: 'doctor_ofiice_name_search', values: this.docofficeval }, { label: "Search By Doctor City", field: 'doctor_city_search', values: this.doctorcity }, { label: "Search By Doctor State", field: 'doctor_state_search', values: this.doctorstate }, { label: "Search By Patient City", field: 'patient_state_search', values: this.patientcity }, { label: "Search By Patient State", field: 'patient_city_search', values: this.patientstate }],
      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at_datetime" }],
      textsearch: [{ label: "Search By Patient Name", field: 'patient_name_search' }],
      // { label: "Search By E-Mail", field: 'email' }, { label: "Search By Parent Name", field: 'parent_search' }, { label: "Search By Company Name", field: 'company_search' }],
      
    };
  // lib list end


  constructor(public http: HttpClient, public commonFunction: CommonFunction, public activatedRoute: ActivatedRoute, 
    public cookieService: CookieService, public httpService: HttpServiceService, public deviceService: DeviceDetectorService,
    public matSnackBar: MatSnackBar) {
    
      /* Get and set login User Data */
    // this.loginUserData["user_details"] = JSON.parse(this.cookieService.get('user_details'));
    if(this.activatedRoute.snapshot.params._id) {
      this.loginUserData["user_details"] = {_id:this.activatedRoute.snapshot.params._id};
      // this.authData["parent_type"] = this.activatedRoute.snapshot.params.parent_type;
    }
    else {
      console.log('************************')
      this.loginUserData["user_details"] = JSON.parse(this.cookieService.get('user_details'));
    }
    this.loginUserData["jwtToken"] = this.cookieService.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');
    /* Get IP Address */
    this.httpService.httpViaGetExt("http://api.ipify.org/?format=json", {}).subscribe(response => {
      this.htmlText.ip = response.ip;
    });
    this.libdata.basecondition = {biller_id:this.loginUserData.user_details._id,status: {"$in":[15,16]} }
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
      biller_id: this.loginUserData.user_details._id
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
    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.billerData.data;
      
      this.viewReportData();
    });
    let data: any = {
      "source": "patient_data_desc_patient_name",
      "condition": {
        status: { "$gt": 10 },
        biller_id_object: this.loginUserData.user_details._id
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

  viewReportData(flug: string = "Patient Reports", paginationOption: any = null) {
    this.htmlText.tableHeaderText = flug;

    if(this.searchJson.dateRange != '') {
      this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
    }

    // Request Condition
    var repostSignCond: any = {
      "source": "data_pece",
      "token": this.loginUserData.jwtToken,
      "search": this.searchJson,
      "condition": {
        "report_type": { $exists: true },
        "biller_id": this.loginUserData.user_details._id,
      },
      "pagination": {
        "skip": 0,
        "limit": 50
      }
    };

    switch(flug) {
      case 'Total Downloaded':
        repostSignCond.condition.download_count = { $exists: true };
        break;
      case 'Not Downloaded':
        repostSignCond.condition.download_count = { $exists: false };
        break;
      default:
        break;
    }

    this.httpService.httpViaPost('dashboard-datalist', repostSignCond).subscribe((response) => {
      /* Fetching the data into table */
      this.dataSource = new MatTableDataSource(response.data);
      /* Adding the paginator options */
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  downloadReport(report: any) {
    if(typeof(report.download_count) == "undefined") {
      report.download_count = 1;
    } else {
      report.download_count = report.download_count + 1;
    }

    /* Collect User Information for Download record */
    let deviceInfo: any = this.deviceService.getDeviceInfo();
    deviceInfo["isMobile"] = this.deviceService.isMobile();
    deviceInfo["isTablet"] = this.deviceService.isTablet();
    deviceInfo["isDesktop"] = this.deviceService.isDesktop();
    
    /* Set downloader information */
    var userDetails = {
      id: this.loginUserData.user_details._id,
      type: this.loginUserData.user_details.type
    };

    let postData: any = {
      "source": "report_download",
      "data": {
        "report_id": report._id,
        "biller_id": this.loginUserData.user_details._id,
        "tech_id": report.tech_id,
        "doctor_id": report.doctor_id,
        "ip": this.htmlText.ip,
        "download_attempt": 1,
        "downloader_information": userDetails,
        "device_information": deviceInfo
      },
      "sourceobj": ["report_id", "biller_id", "tech_id", "doctor_id"],
      "download_count": report.download_count,
      "token": this.loginUserData.jwtToken
    };

    this.httpService.httpViaPost("addorupdatedata", postData).subscribe(response => {
      if(response.status == 'success') {
        this.matSnackBar.open("Start downloading.", "Ok", {
          duration: 3000
        });
        window.open(report.file_basepath + report.file_name, "_blank");

        let postData: any = {
          "source": "data_pece",
          "data": {
            "id": report._id,
            "download_count": report.download_count,
          },
          "token": this.loginUserData.jwtToken
        };
    
        this.httpService.httpViaPost("addorupdatedata", postData).subscribe(response => {
          // code here
        });
      } else {
        this.matSnackBar.open("Some error occord. Please try again.", "Ok", {
          duration: 3000
        });
      }
    });
  }

}
