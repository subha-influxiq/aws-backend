import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DownloadDetailsComponent } from '../../admin/admin-dashboard/download-details/download-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../environments/environment';

import * as momentImported from 'moment';
const moment = momentImported;

@Component({
  selector: 'app-doctor-group-dashboard',
  templateUrl: './doctor-group-dashboard.component.html',
  styleUrls: ['./doctor-group-dashboard.component.css']
})
export class DoctorGroupDashboardComponent implements OnInit {

  public loginUserData: any = {};
  public jwtToken: string = "";
  public htmlText: any = {
    headerText: "Patient Reports"
  };

  public shareDetails: any = {
    baseUrl: environment.doctorSignUpBaseUrl,
    userId: ""
  };

  public allResolveData: any = {};
  public uploadedStatusArray: any = [];
  public processedStatusArray: any = [];
  public signedStatusArray: any = [];
  public billerStatusArray: any = [];
  public allDataColumns: string[];
  public dialogRef: any;

  allDataSource: MatTableDataSource<any>;

  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };



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
        datafields: ['first name','last name','email','phone','address','city','state','zip'],
        param:'id',
        headermessage: 'Tech Information',
        // refreshdata:true
    } ,
    {
      label:"View Codes",
      type:'action',
      datatype:'api',
      endpoint:'get-codes-details',
      datafields: ['Additional Potential Health Risks','CPT Codes','ICD Codes'],
      // otherparam:["patient_name"],
      //cond:'status',
      //condval:0,
      param:'id',
      headermessage: 'Associated Codes',
      // refreshdata:true
  } ,
    {
      label:"Doctor Details",
      type:'action',
      datatype:'api',
      endpoint:'get-doctor-details',
      datafields: ['firstname','lastname','email','fax','Practice Name','NPI','phone','address','city','state','zip'],
      // otherparam:["patient_name"],
      //cond:'status',
      //condval:0,
      param:'id',
      headermessage: 'Doctor Information',
      // refreshdata:true
  } ,
  {
    label:"Doctor Office Details",
    type:'action',
    datatype:'api',
    endpoint:'get-doctor-office-details',
    datafields: ['centername','firstname','lastname','email','phone','address','city','state','zip'],
    // otherparam:["patient_name"],
    //cond:'status',
    //condval:0,
    param:'id',
    headermessage: 'Doctor Office Info',
    // refreshdata:true
} ,
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
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
    "field": 'firstname',
    "options": ['firstname', 'email', 'created_date']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };

  public previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];

  public status: any = [{ val: "Biller Admin Approved", 'name': 'Biller Admin Approved' }, { val: "Biller Admin Not Approved", 'name': 'Biller Admin Not Approved' }, {val:"Biller Admin Hold" , 'name' :"Biller Admin Hold"}];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributor' }, { val: "doctor_group", 'name': 'Doctor Group' }];
  public report_type: any = [{ val: "RM-3A", 'name': 'RM-3A' }, { val: "TM FLOW V3", 'name': 'TM FLOW V3' }, { val: "TM FLOW V4", 'name': 'TM FLOW V4' }];
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
      
      selectsearch: [{ label: 'Search By Report Type', field: 'report_file_type', values: this.report_type } ,{label: "Search By Doctor", field: 'doc_name_search', values:this.authval },{label: "Search By Tech", field: 'tech_name_search', values:this.techval },{label: "Search By Doctor Office", field: 'doctor_ofiice_name_search', values:this.docofficeval },{label: "Search By Doctor City", field: 'doctor_city_search', values:this.doctorcity },{label: "Search By Doctor State", field: 'doctor_state_search', values:this.doctorstate },{label: "Search By Patient City", field: 'patient_state_search', values:this.patientcity },{label: "Search By Patient State", field: 'patient_city_search', values:this.patientstate }],
      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at_datetime" }], 
      // textsearch: [{ label: "Search By Name", field: 'name_search' },
      // { label: "Search By E-Mail", field: 'email' }, { label: "Search By Parent Name", field: 'parent_search' }, { label: "Search By Company Name", field: 'company_search' }],
      // search:[,
      // ]
    };
  // lib list end




  public allDataList: any = [];
  @ViewChild(MatPaginator, { static: false }) paginatorAll: MatPaginator;

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public deviceService: DeviceDetectorService, private matSnackBar: MatSnackBar) {

    this.loginUserData["user_details"] = JSON.parse(cookieService.get('user_details'));
    this.loginUserData["jwtToken"] = cookieService.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');

    this.libdata.basecondition.parent_id = this.loginUserData.user_details._id;
    this.shareDetails.userId = this.loginUserData.user_details._id;
    
    /* Get resolve data */
    // this.activatedRoute.data.subscribe(resolveData => {
    //   this.allResolveData = resolveData.dataCount.data.dashboardCount[0];
    // });

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
      parent_id: this.loginUserData.user_details._id
    }

    this.http.httpViaPost(endpointc, data).subscribe((res: any) => {
      this.billerData_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint, data).subscribe((res: any) => {
      this.allBillerData = res.results.res;
    }, error => {
      console.log('Oooops!');
    });
  }

  ngOnInit() {
    let data:any= {
      "source":"patient_data_desc_patient_name",
      "condition":{
        status:{"$gt":10},
        parent_id_object : this.loginUserData.user_details._id
      },
      "token":this.jwtToken
    }
    this.http.httpViaPost("datalist", data).subscribe((response: any) => {
      var start = false;
      var count = 0;
      for(var i in response.res) {
        if(response.res[i].doc_name_search !="") {
          for(var j in this.authval) {
            if(response.res[i].doc_name == this.authval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) { 
            this.authval.push({name:response.res[i].doc_name,val:response.res[i].doc_name_search}); 
        } 
        start = false; 
        count = 0;
          
        }
      }
      for(var i in response.res) {
        if(response.res[i].tech_name_search !="") {
          for(var j in this.techval) {
          if(response.res[i].tech_namesearch == this.techval[j].name) {
            start = true;
          }
        }
        count ++;
        if(count == 1 && start ==false) {
          this.techval.push({name:response.res[i].tech_namesearch,val:response.res[i].tech_name_search})
        }
        start = false;
        count = 0;
      }
      }
      for(var i in response.res) {
        if(response.res[i].parent_name_search !="") {
          for(var j in this.parentnameval) {
            if(response.res[i].parent_namesearch == this.parentnameval[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.parentnameval.push({name:response.res[i].parent_namesearch,val:response.res[i].parent_name_search})
          }
          start = false;
          count = 0;
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].doctor_state_search !="") {
          for(var j in this.doctorstate) {
            if(response.res[i].doctor_state == this.doctorstate[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.doctorstate.push({name:response.res[i].doctor_state,val:response.res[i].doctor_state_search})
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].doctor_city_search !="") {
          for(var j in this.doctorcity) {
            if(response.res[i].doctor_city == this.doctorcity[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.doctorcity.push({name:response.res[i].doctor_city,val:response.res[i].doctor_city_search})
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].patient_city_search !="") {
          for(var j in this.patientcity) {
            if(response.res[i].patient_city == this.patientcity[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.patientcity.push({name:response.res[i].patient_city,val:response.res[i].patient_city_search})
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].patient_state_search !="") {
          for(var j in this.patientstate) {
            if(response.res[i].patient_state == this.patientstate[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.patientstate.push({name:response.res[i].patient_state,val:response.res[i].patient_state_search })
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].doctor_ofiice_name_search !="") {
          for(var j in this.docofficeval) {
            if(response.res[i].doctor_ofiice_namesearch == this.docofficeval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) { 
            this.docofficeval.push({name:response.res[i].doctor_ofiice_namesearch,val:response.res[i].doctor_ofiice_name_search }) 
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

  downloadReport(report: any) {
    if (typeof (report.download_count) == "undefined") {
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
      user_type: this.loginUserData.user_details.user_type
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

    this.http.httpViaPost("addorupdatedata", postData).subscribe(response => {
      if (response.status == 'success') {
        this.matSnackBar.open("Start downloading.", "Ok", {
          duration: 3000
        });
        window.open(report.file_path, "_blank");

        this.viewReportProcessData(this.htmlText.headerText);
      } else {
        this.matSnackBar.open("Some error occord. Please try again.", "Ok", {
          duration: 3000
        });
      }
    });
  }

  viewReportProcessData(flag = null) {

  }

}
