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

    this.activatedRoute.data.forEach((data) => {
      this.allResolveData = data.techDashboardData.data;
      this.allResolveData["totalRemainToProcessCount"] = this.allResolveData.totalReportCount - this.allResolveData.processedReportCount;
      let allDashboardData: AllDataElement[] = this.allResolveData.totalReportData;
      this.allDataSource = new MatTableDataSource(allDashboardData);
    });
  }

  ngOnInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  ngAfterViewInit() {
    this.allDataSource.paginator = this.paginatorAll;
  }

  viewDetailsData(flag: any) {
    var condition: any = {}
    
    this.htmlText.headerText = flag;

    if(this.searchJson.dateRange != '') {
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
    public httpService: HttpServiceService, ) {

    this.allData = cookie.getAll()
    this.user_data = JSON.parse(this.allData.user_details);
    this.user_token = cookie.get('jwtToken');
    var dta: any = {
      "source": "users_view_doctor",
      "condition": {
        tech_id_object: this.user_data._id
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
