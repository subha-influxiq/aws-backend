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
  selector: 'app-diagnostic-admin-dashboard',
  templateUrl: './diagnostic-admin-dashboard.component.html',
  styleUrls: ['./diagnostic-admin-dashboard.component.css']
})
export class DiagnosticAdminDashboardComponent implements OnInit {

  public loginUserData: any = {};
  public jwtToken: string = "";
  public htmlText: any = {
    headerText: "Patient Reports"
  };

  public allResolveData: any = {
    "tableDataFlag": false,
    "total_reports": 0,
    "total_coce_exists": 0,
    "total_code_not_exists": 0,
    "total_sign_reports": 0,
    "total_not_sign_reports": 0,
    "total_send_to_supar_biller_reports": 0,
    "total_doctor": 0,
    "total_biller": 0,
    "total_tech": 0,
    "total_doctor_office": 0,
    "total_reports_download": 0,
    "total_pdf_to_images_not_process": 0,
    "total_basic_details_not_process": 0,
    "total_reports_type_manual": 0
  }
  public tableDataFlag: any = false;
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

  public allDataList: any = [];
@ViewChild(MatPaginator, { static: false }) paginatorAll: MatPaginator;


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
  basecondition: "",
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
public apiUrl: any = environment.apiBaseUrl;
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



constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
  public dialog: MatDialog, public deviceService: DeviceDetectorService, private matSnackBar: MatSnackBar) {

  this.loginUserData["user_details"] = JSON.parse(cookieService.get('user_details'));
  this.loginUserData["jwtToken"] = cookieService.get('jwtToken');
  console.log(this.loginUserData.user_details.user_type);

  /* Get Auth Token */
  this.jwtToken = cookieService.get('jwtToken');

  /* Get resolve data */
  this.activatedRoute.data.subscribe(resolveData => {
    if(resolveData.dataCount.data.dashboardCount.length > 0) {
      this.allResolveData = resolveData.dataCount.data.dashboardCount[0];
      this.allResolveData.tableDataFlag = true;
    }
    this.viewReportProcessData(this.htmlText.headerText);
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

ngAfterViewInit() {
}

refreshDashboard() {
  let repostSignCond: any = {
    "source": "data_pece",
    "condition": {
      "admin_id": this.loginUserData.user_details._id
    },
    "token": this.jwtToken
  };
  // get dashboard count
  this.http.httpViaPost('diagnostic-admin-dashboard', repostSignCond).subscribe((response) => {
    if (response.status == 'success') {
      this.allResolveData = response.data;
    } else {
      this.router.navigateByUrl('logout');
    }
  });

  // for listing
  this.viewReportProcessData(this.htmlText.headerText);
}

viewReportProcessData(flag: string = null) {
  // Set Header Flag
  this.htmlText.headerText = flag;

  // Date search
  if (this.searchJson.dateRange != '') {
    this.searchJson.dateRange.end = moment(this.searchJson.dateRange.end, "DD-MM-YYYY").add(1, 'days');
  }

  // search condition
  var repostSignCond: any = {
    "search": this.searchJson,
    "token": this.jwtToken,
    "pagination": {
      "skip": 0,
      "limit": 50
    }
  };

  switch (flag) {
    /* Report Status Section */
    case 'Total Mannual Reports':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'reportType', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "report_type": "manual"
      };
      break;
    case 'Total File Reports':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'reportType', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "report_type": "file"
      };
      break;
    /* Report Status Section */
    case 'Reports Uploaded':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'reportType', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "report_type": { $exists: true }
      };
      break;
    case 'Report Processed':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'reportType', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "report_type": { $exists: true },
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "page_1": { $exists: true },
        "page_2": { $exists: true },
        "page_3": { $exists: true },
        "page_4": { $exists: true },
        "page_5": { $exists: true },
        "page_6": { $exists: true },
        "page_7": { $exists: true }
      };
      break;
    case 'Report Signed':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'billerName', 'billGenerationDate', 'billSentDate', 'reportType', 'superBill', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "report_type": { $exists: true },
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "doctor_signature": { $exists: true }
      };
      break;
    case 'Super Bill':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'billerName', 'billGenerationDate', 'billSentDate', 'reportType', 'superBill', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "report_type": { $exists: true },
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "biller_name": { $exists: true },
      };
      break;
    case 'Download Bill':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'billerName', 'billGenerationDate', 'billSentDate', 'reportType', 'superBill', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "report_type": { $exists: true },
        "diagnostic_admin_id_object": this.loginUserData.user_details._id,
        "download_count": { $exists: true }
      };
      break;
    case 'Reports Pending Sing':
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'reportType', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "report_type": { $exists: true },
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "doctor_signature": { $exists: false }
      };
      break;
    default:
      this.allDataColumns = ['no', 'patientName', 'doctorName', 'techName', 'reportType', 'status', 'createdAt', 'editRecord'];

      repostSignCond["condition"] = {
        "doctor_signature": { $exists: false },
        "diagnostic_admin_id": this.loginUserData.user_details._id,
        "report_type": { $exists: true },
      };
      break;
  }

  this.http.httpViaPost('dashboard-datalist', repostSignCond).subscribe((response) => {
    if (response.status == true) {
      this.allResolveData.tableDataFlag = true;
      this.allResolveData.tableData = response.data;

      this.allDataSource = new MatTableDataSource(this.allResolveData.tableData);
      this.allDataSource.paginator = this.paginatorAll;
    }
  });
}

pagination(flag: string = null) {
  switch (flag) {
    case "prev":
      if (this.allResolveData.tableDataPagination.skip > 0) {
        this.allResolveData.tableDataPagination.skip = 0;
        this.allResolveData.tableDataPaginationlimit = 50;
      }
      break;
    case "next":
      this.allResolveData.tableDataPagination.skip = 0;
      this.allResolveData.tableDataPaginationlimit = 50;
      break;
    default:
      break;
  }
  this.allResolveData.tableDataPagination = null;
}

myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

/*Doctor's List*/
toDocList() {
  this.router.navigateByUrl('admin/doctor-management/list');
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

/* Delete record Start */
deleteReport(pk_id: any, index: number) {
  let data: any = {
    width: '250px',
    data: {
      header: "Alert",
      message: "Do you want to delete this record ?",
      button1: { text: "No" },
      button2: { text: "Yes" },
    }
  }

  this.dialogRef = this.dialog.open(DialogBoxComponent, data);
  this.dialogRef.afterClosed().subscribe(result => {
    switch (result) {
      case "No":
        break;
      case "Yes":
        this.deleteProcess(pk_id, index);
        break;
    }
  });
}

deleteProcess(pk_id: any, index: number) {
  var repostSignCond = {
    "source": "data_pece",
    "id": pk_id,
    "token": this.jwtToken,
  };

  this.http.httpViaPost('deletesingledata', repostSignCond).subscribe((response) => {
    if (response.status == 'success') {
      this.allResolveData.tableData.splice(index, 1);
      this.allDataSource = new MatTableDataSource(this.allResolveData.tableData);

      let data: any = {
        width: '250px',
        data: {
          header: "Success",
          message: "Successfully delete.",
          button1: { text: "OK" },
          button2: { text: "" },
        }
      }

      this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    } else {
      let data: any = {
        width: '250px',
        data: {
          header: "Error",
          message: "An error occord. Please try again.",
          button1: { text: "Re-Try" },
          button2: { text: "Close" },
        }
      }

      this.dialogRef = this.dialog.open(DialogBoxComponent, data);
      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "Close":
            break;
          case "Re-Try":
            this.deleteProcess(pk_id, index);
            break;
        }
      });
    }
  });
}
/* Delete record End */

viewDownloadDetails(id: any) {
  let data: any = {
    width: '700px',
    data: {
      report_id: id
    }
  };
  this.dialogRef = this.dialog.open(DownloadDetailsComponent, data);
}

resetSearch() {
  this.searchJson = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };
  this.viewReportProcessData(this.htmlText.headerText);
}

}
