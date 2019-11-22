import { Component, OnInit ,ViewChild,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource, MatSort } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


  public totalDoctor:any;

  public user_data: any = {};
  allDataColumns: string[] = ['no','patientName', 'doctorName', 'record','created_at', 'billsendDate','status'];


   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


   @ViewChild(MatPaginator, { static: false }) paginatorAll: MatPaginator;
   @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatSort, { static: false }) sortAll: MatSort;


   dataSource: MatTableDataSource<PeriodicElement>;
  allDataSource: MatTableDataSource<AllDataElement>;

  /**lib-listing start here**/

  public allUserData: any = [];
  
  public user_id: any;
  public user_token: any;
  public techDashboardAllData: any = [];
  public techSingleData: any = [];
  public userSingleDataName: any;
  public userSingleDataTaxo:any;
  public userSingleDataEmail:any;
  public userSingleDataFax:any;
  public userSingleDataPhone:any;
  public allDoctorData:any=[];
  public uploadedStatusCount: any;
  public processedStatusCount: any;
  public signedStatusCount: any;
  public reportUploadedArray: any = [];
  public reportProcessedArray: any = [];
  public reportRemainingArray: any = [];
  public headerText: any;
  public userToken : any;

  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute, public commonFunction: CommonFunction,public dialog: MatDialog) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    let allData: any = {};
    allData = cookie.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.userToken = cookie.get('jwtToken');

    this.user_id = this.user_data.id;
    this.user_token = cookie.get('jwtToken');
    this.getTechData();
    this.getTechCountData();

    this.activatedRoute.data.forEach((data) => {
      let allDashboardData : AllDataElement[] = data.techDashboardData.res;
      this.techDashboardAllData = new MatTableDataSource(allDashboardData);
    })
  }

  ngOnInit() {
    this.techDashboardAllData.paginator = this.paginator;
    this.techDashboardAllData.sort = this.sortAll;
  }
  ngAfterViewInit() {
    this.techDashboardAllData.paginator = this.paginator;
  }
  
  

  getTechData() {
    var data = {
      "source": "users_view_doctor",
      "condition": {
        tech: this.user_data.firstname + " " + this.user_data.lastname
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        console.log(response);
        let result: any = {};
        result = response.res;
        this.allDoctorData=response.res;
        console.log(this.allDoctorData);
        this.userSingleDataName = result[0].fullName;
        this.userSingleDataEmail=result[0].email;
        this.userSingleDataFax=result[0].fax;
        this.userSingleDataPhone=result[0].phone;
        this.userSingleDataTaxo=result[0].taxo_list[0];
        this.totalDoctor=response.resc;
      })
  }
  getTechCountData() {
    var data = {
      "source": "users",
      "condition": {
        "condition": {
          "status": "pending",
          "type": "tech"
        },
        "condition1": {
          "status": "waiting for doctor sign",
          "type": "tech"
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
        },
        "condition6": {
          "type": "tech"
        },
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('statuscount', data)
      .subscribe(response => {
        this.processedStatusCount = response["status-count1"];
        this.signedStatusCount = response["status-count2"];
        this.uploadedStatusCount = response["status-count7"]
        this.reportUploadedArray = response.data.status7;
        this.reportRemainingArray = response.data.status2;
        this.reportProcessedArray = response.data.status1;

      })
  }
  filterByName(key: string, value: string) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();
    searchJson["user_id_object"] = this.user_id;
    var data = {
      "source": "patient_management_view_tech",
      "condition": searchJson,
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe((Response) => {
        this.techDashboardAllData = Response.res;
      });
  }

  filerByReports(key: string, value: any) {
    let searchJson: any = {};
    searchJson[key] = value.toLowerCase();
    var data = {
      "source": "patient_management_view_tech",
      "condition": searchJson,
      "token": this.userToken
    }
    this.httpService.httpViaPost('datalist', data)
    .subscribe((Response) => {
      // this.techDashboardAllData = Response.res;
    });

  }
  viewDetailsData(flag: any) {
    switch (flag) {
      case 'upload':
        this.headerText = "Reports Uploaded";
        this.commonArray = this.reportUploadedArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        this.dataSource.paginator = this.paginatorAll; 
        this.dataSource.sort = this.sort;
        break;
      case 'processed':
        this.headerText = "Reports Processed";
        this.commonArray = this.reportProcessedArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        this.dataSource.paginator = this.paginatorAll; 
        this.dataSource.sort = this.sort;
        break;
      case 'remainProcess':
        this.headerText = "Reports Remain to Process";
        this.commonArray = this.reportRemainingArray;
        this.dataSource = new MatTableDataSource(this.commonArray);
        this.dataSource.paginator = this.paginatorAll; 
        this.dataSource.sort = this.sort;
        break;
      default:
        break;
    }
  }

  /**All doctor deatls view in modal */
allDoctorViewModal(){
 console.log("allDoctorViewModal"); 
 //dialog function
  const dialogGenreRef = this.dialog.open(DoctorViewDialogComponent, {
    panelClass: ['modal-sm', 'infomodal'],
    disableClose: true,
  });
  dialogGenreRef.afterClosed().subscribe(result => {
    //console.log('SuccessDialogComponent was closed');
  });
}

}


// Doctor View dialog component
@Component({
  selector: 'doctor-dialog',
  templateUrl: 'doctorview.component.html',
})
export class DoctorViewDialogComponent {
  public user_token: any;
  public allDoctorData:any;
  public user_data:any;
  public allData: any = {};
  public userToken:any;

  constructor(public dialogRef: MatDialogRef<DoctorViewDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService,) { 

      this.allData = cookie.getAll()
      this.user_data = JSON.parse(this.allData.user_details);
      this.user_token = cookie.get('jwtToken');
      var dta:any = {
        "source": "users_view_doctor",
        "condition": {
          tech: this.user_data.firstname + " " + this.user_data.lastname
        },
        "token": this.user_token
      }
      this.httpService.httpViaPost('datalist', dta)
        .subscribe(response => {
          console.log(response);
          let result: any = {};
          result = response.res;
          this.allDoctorData=response.res;
          console.log(this.allDoctorData);
        })
    }
    
  public onNoClick(): void {
    this.dialogRef.close();
  }
    
}