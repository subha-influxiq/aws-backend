import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';import { MatTableDataSource } from '@angular/material/table';
import * as momentImported from 'moment';
const moment = momentImported;

export interface PeriodicElement {
  no: number;
  patientName: string;
  record_type: string;
  date_added: string;
  status: string;
}

export interface AllDataElement {
  no: number;
  patientName: string;
  doctorName: string;
  billerName: string;
  record: string;
  billGenerationDate: string;
  techName: string;
  billSentDate: string;
  superBill: string;
  date: string;
  status: string;
}


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public jwtToken: string = "";
  public htmlText: any = {
    headerText: ""
  };
  public allResolveData: any = {};

  public commonArray: PeriodicElement[] = [];
  public uploadedStatusArray: any = [];
  public processedStatusArray: any = [];
  public signedStatusArray: any = [];
  public billerStatusArray: any = [];
  public displayedColumns: string[] = ['no', 'date_added', 'patientName', 'record_type', 'techName', 'record', 'status'];
  public allDataColumns: string[] = ['no', 'billGenerationDate', 'techName', 'billSentDate', 'billerName', 'report_type','doctorName', 'record', 'superBill', 'date', 'patientNamecopy', 'status','editRecord'];
  public startDate: any;
  public endDate: any;
  public statusFlag : any;

  dataSource: MatTableDataSource<PeriodicElement>;
  allDataSource: MatTableDataSource<AllDataElement>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public allDataList: any = [];

  @ViewChild(MatPaginator, { static: false }) paginatorAll: MatPaginator;

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute) {
    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');

    this.activatedRoute.data.subscribe(resolveData => {
      console.log("===========", resolveData);
      this.allResolveData = resolveData.dataCount.data;
      let allData: AllDataElement[] = this.allResolveData.totalReportData;
      this.allDataSource = new MatTableDataSource(allData);
    });
  }

  ngOnInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  ngAfterViewInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  filterByName(key: string, value: string) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();
    console.log("searchh",searchJson);
    var data = {
      "source": "Patient-Record-Report_view",
      "condition": searchJson,
      "token": this.jwtToken
    }
    this.http.httpViaPost('datalist', data)
      .subscribe(Response => {
        this.allDataSource = Response.res;
      });
  }

  filerByReports(key: string, value: any) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();
    var data = {
      "source": "patient_management_view_count",
      "condition": searchJson,
      "token": this.jwtToken
    }

    this.http.httpViaPost('datalist', data)
      .subscribe(Response => {
        let result: any = Response.res;
        this.dataSource = result;
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
    this.http.httpViaPost('datalist', data)
      .subscribe((response) => {
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
    this.http.httpViaPost('datalist', data)
      .subscribe((response) => {
        this.dataSource = response.res;
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
    this.statusFlag = flag;
    switch (flag) {
      case 'Reports Uploaded':
        this.htmlText.headerText = "Reports Uploaded";
        this.commonArray = this.uploadedStatusArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        this.dataSource.paginator = this.paginator;
        break;
      case 'Report Processed':
        this.htmlText.headerText = "Reports Processed";
        this.commonArray = this.processedStatusArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        this.dataSource.paginator = this.paginator;
        break;
      case 'Report Signed':
        this.htmlText.headerText = "Reports Signed";
        this.commonArray = this.signedStatusArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        this.dataSource.paginator = this.paginator;
        break;
      case 'Super Bill':
        this.htmlText.headerText = "Sent to Super Bill";
        this.commonArray = this.billerStatusArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        this.dataSource.paginator = this.paginator;
        break;
      default:
        break;
    }
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


}