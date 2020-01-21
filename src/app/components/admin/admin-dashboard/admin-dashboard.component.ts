import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DownloadDetailsComponent } from './download-details/download-details.component';
import * as momentImported from 'moment';
const moment = momentImported;


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  public jwtToken: string = "";
  public htmlText: any = {
    headerText: "Patient Reports"
  };

  public allResolveData: any = {};
  public uploadedStatusArray: any = [];
  public processedStatusArray: any = [];
  public signedStatusArray: any = [];
  public billerStatusArray: any = [];
  public allDataColumns: string[];
  public startDate: any;
  public endDate: any;
  public statusFlag : any;
  public dialogRef: any;

  allDataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public allDataList: any = [];

  @ViewChild(MatPaginator, { static: false }) paginatorAll: MatPaginator;

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');

    /* Set Table Header */
    this.allDataColumns = ['no', 'techName', 'report_type','doctorName', 'date', 'patientNamecopy', 'status','editRecord'];

    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.dataCount.data;
      let allData = this.allResolveData.totalReportData;
      this.allDataSource = new MatTableDataSource(allData);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  filterByName(key: string, value: string) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();

    var data = {
      "source": "Patient-Record-Report_view",
      "condition": searchJson,
      "token": this.jwtToken
    }
    this.http.httpViaPost('datalist', data).subscribe(Response => {
        this.allDataSource = Response.res;
      });
  }

  filerByReports(key: string, value: any) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();
    var data = {
      "source": "Patient-Record-Report_view",
      "condition": searchJson,
      "token": this.jwtToken
    }

    this.http.httpViaPost('datalist', data)
      .subscribe(Response => {
        let result: any = Response.res;
        //this.dataSource = result;
      });

  }

  dateRangeSearch() {
    var data = {
      "source": "Patient-Record-Report_view",
      "condition": {
        "date" : {
          $lte: moment(this.endDate).format('DD-MM-YYYY'),
          $gte: moment(this.startDate).format('DD-MM-YYYY')
        }
      },
      "token": this.jwtToken,
    }
    this.http.httpViaPost('datalist', data).subscribe((response) => {
      this.allDataSource = response.res;
    });
  }

  dateReportsRangeSearch() {
    var data = {
      "source": "patient_management_view_count",
      "condition": {
        "date_added": { 
          $lte: moment(this.endDate).format('DD-MM-YYYY'),
          $gte: moment(this.startDate).format('DD-MM-YYYY')
        },
        status: this.statusFlag
    },
      "token": this.jwtToken,
    }
    this.http.httpViaPost('datalist', data).subscribe((response) => {
      //this.dataSource = response.res;
    });
  }

  getStatusCountData() {
    var data = {
      "condition": {
        "condition": {
          "status": "pending"
        },
        "condition1": {
          "status": "waiting for doctor sign"
        },
        "condition2": {
          "status": "doctor signed"
        },
        "condition3": {
          "status": "error"
        },
        "condition4": {
          "status": "send to biller"
        },
        "condition5": {
          "record_type": "file"
        }
      }
    }
    this.http.httpViaPost('statuscount', data)
      .subscribe(response => {

        let result: any;
        result = response;
        
        this.uploadedStatusArray = result.data.status1;
        this.processedStatusArray = result.data.status2;
        this.signedStatusArray = result.data.status3;
        this.billerStatusArray = result.data.status5;
      })
  }


  viewReportProcessData(flag: string) {
    this.htmlText.headerText = flag;
    var repostSignCond: any = {};
    /* Set Table Header */
    this.allDataColumns = ['no', 'billGenerationDate', 'techName', 'billSentDate', 'billerName', 'report_type','doctorName', 'superBill', 'date', 'patientNamecopy', 'status','editRecord'];

    switch (flag) {
      /* Report Status Section */
      case 'Total Mannual Reports':
        repostSignCond = {
          "source": "Patient-Record-Report_view",
          "condition": {
            "report_type": "mannual"
          },
          "token": this.jwtToken,
        }
        break;
      case 'Total File Reports':
          repostSignCond = {
            "source": "Patient-Record-Report_view",
            "condition": {
              "report_type": "file"
            },
            "token": this.jwtToken,
          }
          break;
      /* Report Status Section */
      case 'Reports Uploaded':
        repostSignCond = {
          "source": "Patient-Record-Report_view",
          "token": this.jwtToken,
        }
        break;
      case 'Report Processed':
        repostSignCond = {
          "source": "Patient-Record-Report_view",
          "condition": {
            "page_1": { $exists:true },
            "page_2": { $exists:true },
            "page_3": { $exists:true },
            "page_4": { $exists:true },
            "page_5": { $exists:true },
            "page_6": { $exists:true },
            "page_7": { $exists:true }
          },
          "token": this.jwtToken,
        }
        break;
      case 'Report Signed':
        repostSignCond = {
          "source": "Patient-Record-Report_view",
          "condition": {
            "doctor_signature": { $exists:true }
          },
          "token": this.jwtToken,
        }
        break;
      case 'Super Bill':
        /////////////////////////////////////////
        //////////////// Pending ////////////////
        /////////////////////////////////////////
        repostSignCond = {
          "source": "Patient-Record-Report_view",
          "condition": {
            "doctor_signature": { $exists:true }
          },
          "token": this.jwtToken,
        }
        break;
      case 'Download Bill':
        repostSignCond = {
          "source": "Patient-Record-Report_view",
          "condition": {
            "download_count": { $exists: true }
          },
          "token": this.jwtToken,
        }
        break;
      case 'Reports Pending Sing':
        repostSignCond = {
          "source": "Patient-Record-Report_view",
          "condition": {
            "doctor_signature": { $exists:false }
          },
          "token": this.jwtToken,
        }
        break;
      default:
        break;
    }

    this.http.httpViaPost('datalist', repostSignCond).subscribe((response) => {
      let allData = response.res;
      this.allDataSource = new MatTableDataSource(allData);
      this.allDataSource.paginator = this.paginatorAll;
    });
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

  downloadReport(link) {
    window.open(link, "_blank");
  }

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
      switch(result) {
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
      "source": "patient_management",
      "id": pk_id,
      "token": this.jwtToken,
    }
    this.http.httpViaPost('deletesingledata', repostSignCond).subscribe((response) => {
      if(response.status == 'success') {
        this.allResolveData.totalReportData.splice(index, 1);
        let allData = this.allResolveData.totalReportData;
        this.allDataSource = new MatTableDataSource(allData);

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
          switch(result) {
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

  viewDownloadDetails(id: any) {
    let data: any = {
      width: '700px',
      data: {
        report_id: id
      }
    };
    this.dialogRef = this.dialog.open(DownloadDetailsComponent, data);
  }

}