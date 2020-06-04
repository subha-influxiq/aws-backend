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
  public allBillerData: any = [];
  public billerData_count: any = 0;
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
      },{
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
        datafields: ['firstname','lastname','email','phone','address','city','state','zip'],
        param:'id',
        headermessage: 'Tech Info',
        // refreshdata:true
    } ,
    {
      label:"View Codes",
      type:'action',
      datatype:'api',
      endpoint:'get-codes-details',
      datafields: ['additional_potential_health_risks','cpt_codes','icd_codes'],
      // otherparam:["patient_name"],
      //cond:'status',
      //condval:0,
      param:'id',
      headermessage: 'Codes Info',
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
{
  label:"Parent Details",
  type:'action',
  datatype:'api',
  endpoint:'get-parent-details',
  // otherparam:["patient_name"],
  cond:'parent_details_check',
  condval:1,
  param:'id',
  headermessage: 'Parent Info',
  // refreshdata:true
} ,
    ],
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidestatustogglebutton: true,
    hideviewbutton: true,
    tableheaders: [
      "tech_name",
      "patient_name",
      "status_text",
      "created_at_datetime",
      "cpt_code_count",
      "addl_hlth_risk"
    ]
  }
  public allUserData_modify_header: any = {
    "tech_name": "Tech Name",
    "patient_name": "Patient Name",
    "status_text": "Status",
    "created_at_datetime": "Report Added",
    "cpt_code_count": "CPT Code Count",
    "addl_hlth_risk": "Addl Hlth Risk"
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

  public authData: any = {
  };
  public allResolveData: any;
  public htmlText: any = {
    buttonText: "Add One",
    headerText: "Patient Record Report",
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
  public data:any;
  public otherData:any ={
    all_details: { user_type: "" }
  };
  public header:any;
  public allData:any;

  constructor(public dialog: MatDialog, public commonFunction: CommonFunction, public cookie: CookieService,
    public http: HttpServiceService, public activatedRoute: ActivatedRoute, public matSnackBar: MatSnackBar,
    public deviceService: DeviceDetectorService) {
    this.allData = cookie.getAll();
    this.authData = JSON.parse(this.allData.user_details);
    this.authData["jwtToken"] = cookie.get('jwtToken');

    if(typeof(this.authData.diagnostic_admin_id) != 'undefined') {
      this.htmlText.signFlag = false;
      this.data={_id_object:this.authData.diagnostic_admin_id};
      this.header={name:"Diagnostic Admin Name"};
    }

    if(typeof(this.authData.distributor_id) != 'undefined') {
      this.htmlText.signFlag = false;
      this.data={_id_object:this.authData.distributor_id};
      this.header={name:"Distributor Name"};
    }

    if(typeof(this.authData.doctorgroup_id) != 'undefined') {
      this.htmlText.signFlag = false;
      this.data={_id_object:this.authData.doctorgroup_id};
      this.header={name:"Doctor Group Name"};
    }

    this.activatedRoute.data.forEach(resolveData => {
      this.allResolveData = resolveData.doctordata.data;

      this.viewReportProcessData(this.htmlText.tableHeaderText);
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
      doctor_id: this.authData._id
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
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewReportProcessData(flag: string = null) {
    this.allDataColumns = ['no', 'patient_name', 'tech_name', 'doctor_name', 'biller_name', 'bill_generation_date', 'bill_sent_date', 'report_type', 'status', 'super_bill', 'action'];
    this.htmlText.headerText = flag;
    var data: any = {};
    /* Open modal */
    let modalData: any = {
      panelClass: 'bulkupload-dialog',
      data: {
        header: "Message",
        message: "No Records Found",
        button1: { text: "" },
        button2: { text: "Ok" },
      }
    };

    if (this.searchJson.dateRange != '') {
      this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
    }

    switch (flag) {
      case 'Report Signed':
        data = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "report_type": { $exists: true },
            "doctor_signature": { $exists: true },
            "doctor_id": this.authData._id
          },
          "pagination": {
            "skip": 0,
            "limit": 50
          },
          "token": this.authData.jwtToken
        };
        break;
      case 'Report unSigned':
        this.allDataColumns = ['no', 'patient_name', 'tech_name', 'doctor_name', 'report_type', 'status', 'action'];
        data = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "report_type": { $exists: true },
            "doctor_signature": { $exists: false },
            "doctor_id": this.authData._id
          },
          "pagination": {
            "skip": 0,
            "limit": 50
          },
          "token": this.authData.jwtToken
        };
        break;
      default:
        data = {
          "source": "data_pece",
          "search": this.searchJson,
          "condition": {
            "report_type": { $exists: true },
            "doctor_id": this.authData._id
          },
          "pagination": {
            "skip": 0,
            "limit": 50
          },
          "token": this.authData.jwtToken
        };
        break;
    }
    this.http.httpViaPost('dashboard-datalist', data).subscribe(response => {
      if (response.data.length > 0) {
        this.allResolveData.recordData = response.data;
        this.allDataSource = new MatTableDataSource(this.allResolveData.recordData);
        this.allDataSource.paginator = this.paginator;
      }
    });

    let sectionData :any={
        "source":"data_pece",
        "condition":this.data,
        "token":this.authData.jwtToken
    }
    this.http.httpViaPost('datalist', sectionData).subscribe(response => {
      // if (response.data.length > 0) {
        this.otherData["all_details"]= response.res[0];
      // }
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
      id: this.authData._id,
      type: this.authData.type
    };

    let postData: any = {
      "source": "report_download",
      "data": {
        "report_id": report._id,
        "biller_id": this.authData._id,
        "tech_id": report.tech_id,
        "doctor_id": report.doctor_id,
        "ip": this.htmlText.ip,
        "download_attempt": 1,
        "downloader_information": userDetails,
        "device_information": deviceInfo
      },
      "sourceobj": ["report_id", "biller_id", "tech_id", "doctor_id"],
      "download_count": report.download_count,
      "token": this.authData.jwtToken
    };

    this.http.httpViaPost("addorupdatedata", postData).subscribe(response => {
      if (response.status == 'success') {
        this.matSnackBar.open("Start downloading...", "", {
          duration: 3000
        });
        window.open(report.file_path, "_blank");

        this.refreshDashboard();
      } else {
        this.matSnackBar.open("Some error occord. Please try again.", "Ok", {
          duration: 3000
        });
      }
    });
  }

  refreshDashboard() {
    let postData: any = {
      source: "data_pece",
      condition: {
        doctor_id: this.authData._id
      }
    };

    this.http.httpViaPost("doctor-dashboard", postData).subscribe(response => {
      if (response.status == 'success') {
        this.allResolveData = response.data;
        this.viewReportProcessData(this.htmlText.tableHeaderText);
      } else {
        this.matSnackBar.open("Please wait...", "", {
          duration: 1000
        });

        setTimeout(() => {
          this.refreshDashboard();
        }, 1000);
      }
    });
  }

  resetSearch() {
    this.searchJson = {
      patientName: "",
      status: "",
      dateRange: ""
    };
    this.viewReportProcessData(this.htmlText.headerText);
  }

  viewMore() {
    this.viewstatus = !this.viewstatus;

    if (this.viewstatus)
      this.btnName = "view less";
    else
      this.btnName = "view more";
  }

}
