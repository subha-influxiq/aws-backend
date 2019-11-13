import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource, MatPaginator } from '@angular/material';
// import { MatPaginator} from '@angular/material/paginator';


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

  public user_token: any;
  public billerCount: any;
  public doctorCount: any;
  public techCount: any;
  public uploadedStatusCount: any;
  public processedStatusCount: any;
  public signedStatusCount: any;
  public billerStatusCount: any;

  public headerText: any;
  public commonArray: PeriodicElement[] = [];
  public uploadedStatusArray: any = [];
  public processedStatusArray: any = [];
  public signedStatusArray: any = [];
  public billerStatusArray: any = [];
  public displayedColumns: string[] = ['no', 'patientName', 'record_type', 'date_added', 'status'];
  public allDataColumns: string[] = ['no', 'billGenerationDate', 'techName', 'billSentDate', 'billerName', 'doctorName', 'record', 'superBill', 'date', 'patientName', 'status'];

  dataSource: MatTableDataSource<PeriodicElement>;
  allDataSource: MatTableDataSource<AllDataElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public allDataList: any = [];

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  
  constructor(private router: Router, public cookieService: CookieService,
    private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction) {

   
    this.user_token = cookieService.get('jwtToken');

    this.activatedRoute.data.subscribe(resolveData => {
      const allData: AllDataElement[] = resolveData.dataCount.res;
      this.allDataSource = new MatTableDataSource(allData);
      this.allDataSource.paginator = this.paginator;
    });

    this.getAllCountData();
    this.getStatusCountData();

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.allDataList = resolveData.dataCount.res;
      this.allDataSource = new MatTableDataSource(this.allDataList);

    });

  }

  ngAfterViewInit() {
    this.allDataSource.paginator = this.paginator;
    // this.dataSource.paginator = this.paginator;
  }

  patientNameFilter(value: any) {
    var data = {
      "source": "Patient-Record-Report_view",
      "condition": value,
      "token" : this.user_token
    }
    this.http.httpViaPost('datalist', data).subscribe((response)=>{
      let result:any = response.res;
      this.allDataSource = result;
    });
  }

  getAllCountData() {
    var data = {
      "condition": {
        "type": "doctor"
      },
      "condition1": {
        "type": "tech"
      },
      "condition2": {
        "type": "biller"
      }
    }
    this.http.httpViaPost('count', data).subscribe((response) => {
      this.billerCount = response["biller-count"];
      this.techCount = response["tech-count"];
      this.doctorCount = response["doctor-count"];
    });
  }

  getStatusCountData() {
    var data = {
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
    this.http.httpViaPost('statuscount', data)
      .subscribe(response => {
        let result: any;
        result = response;
        this.uploadedStatusCount = result["status-count1"];
        this.processedStatusCount = result["status-count2"];
        this.signedStatusCount = result["status-count3"];
        this.billerStatusCount = result["status-count5"];

        this.uploadedStatusArray = result.data.status1;
        this.processedStatusArray = result.data.status2;
        this.signedStatusArray = result.data.status3;
        this.billerStatusArray = result.data.status5;
      })
  }


  viewReportProcessData(flag: string) {
    switch (flag) {
      case 'Reports Uploaded':
        this.headerText = "Reports Uploaded";
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.uploadedStatusArray);
        break;
      case 'Report Processed':
        this.headerText = "Reports Processed";
        this.commonArray = this.processedStatusArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        break;
      case 'Report Signed':
        this.headerText = "Reports Signed";
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.signedStatusArray);
        break;
      case 'Super Bill':
        this.headerText = "Sent to Super Bill";
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.signedStatusArray);
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
