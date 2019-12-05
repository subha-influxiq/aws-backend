import { Component, OnInit ,ViewChild,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';


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
  displayedColumns: string[] = ['no', 'patientName', 'record_type', 'doctorName', 'techName','date_added', 'status'];

  public totalDoctor:any;

  public user_data: any = {};
  allDataColumns: string[] = ['no','patientName', 'doctorName', 'techName','billerName','recordType','billGenerationData', 'billsendDate','status'];


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
  public headerText: any="Patient record report";
  public userToken : any;
  public dialogRef: any;

  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute, 
    public commonFunction: CommonFunction,public dialog: MatDialog) {

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
        "tech_id_object": this.user_id
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        let result: any = {};
        result = response.res;
        this.allDoctorData=response.res;
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
      "condition": {
        "condition": {
          "status": "1",
          "type": "tech",
        },
        "condition1": {
          "status": "2",
          "type": "tech"
        },
        "condition2": {
          "status": "3"
        },
        "condition3": {
          "status": "error"
        },
        "condition4": {
          "status": "4"
        },
        "condition5": {
          "record_type": "file"
        },
        "condition6": {
          "type": "tech"
        },
        "_id": this.user_data._id,
        "type": "tech_id"
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
      });
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
     /* Open modal */
     let modalData: any = {
      panelClass: 'bulkupload-dialog',
      data: {
        header: "Message",
        message: "No Records Found",
        button1: { text: "" },
        button2: { text: "Ok" },
      }
    }
  
    switch (flag) {
      case 'upload':
        if(this.reportUploadedArray.length > 0) {
          this.headerText = "Reports Uploaded";
          this.commonArray = this.reportUploadedArray;
          this.dataSource = new MatTableDataSource(this.commonArray);
          this.dataSource.paginator = this.paginatorAll;
          this.dataSource.sort = this.sort;
        } else {
           this.openDialog(modalData);        }
        break;
      case 'processed':
        if(this.reportProcessedArray>0){
          this.headerText = "Reports Processed";
          this.commonArray = this.reportProcessedArray;
          this.dataSource = new MatTableDataSource(this.commonArray);
          this.dataSource.paginator = this.paginatorAll;
          this.dataSource.sort = this.sort;

        }else{
          this.openDialog(modalData); 
        }
        
        break;
      case 'remainProcess':
        if(this,this.reportRemainingArray > 0){
          this.headerText = "Reports Remain to Process";
          this.commonArray = this.reportRemainingArray;
          this.dataSource = new MatTableDataSource(this.commonArray);
          this.dataSource.paginator = this.paginatorAll;
          this.dataSource.sort = this.sort;
        }else{
          this.openDialog(modalData); 
        }

        break;
      default:
        break;
    }
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
allDoctorViewModal(){
 //dialog function
  const dialogGenreRef = this.dialog.open(DoctorViewDialogComponent, {
    panelClass: ['modal-sm', 'infomodal'],
    disableClose: true,
  });
  dialogGenreRef.afterClosed().subscribe(result => {
   
  });
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
  public allDoctorData:any;
  public user_data:any;
  public allData: any = {};
  public userToken:any;
  public loader: boolean = true;

  constructor(public dialogRef: MatDialogRef<DoctorViewDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
  public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService,) {


      this.allData = cookie.getAll()
      this.user_data = JSON.parse(this.allData.user_details);
      this.user_token = cookie.get('jwtToken');
      var dta:any = {
        "source": "users_view_doctor",
        "condition": {
          tech_id_object: this.user_data._id
        },
        "token": this.user_token
      }
      this.httpService.httpViaPost('datalist', dta)
        .subscribe((response:any) => {
          
          let result: any = {};
          result = response.res;
          if (response.resc > 0) {
            this.loader = false;
            this.allDoctorData=response.res;
            
          }

        })
    }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
