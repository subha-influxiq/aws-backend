import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadDialogBoxComponent } from '../../common/upload-dialog-box/upload-dialog-box.component';
import { CommonFunction } from '../../../class/common/common-function';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import * as momentImported from 'moment';
const moment = momentImported;

export interface PeriodicElement {
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
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})

export class DoctorDashboardComponent implements OnInit {
  public cookiesData: any;
  public cookies_id: any;
  public user_token: any;
  public DoctorSignedData: any = [];
  public buttonText: any = "Add One";
  public Pending: any;
  public DoctorSigned: any;
  public commonArray: PeriodicElement[] = [];
  public allDataColumns: string[] = ['no', 'billGenerationDate', 'billSentDate', 'patientName',
    'billerName', 'doctorName', 'record', 'recordType', 'techName', 'superBill', 'status', 'billerDropDown', 'action'];
  
    public dataCol:string[]=['billGenerationDate','billSentDate','doctorName','patientName',
  'record','report_type','status','superBill','techName','billerName','billerDropDown','action'];
  public dialogRef:any;
  public headerText: any = " DOCTOR SIGNATURE RECORD REPORTS";
  public doctorSignedArray: any = [];
  public pendingArray: any = [];
  public allDataList: any;
  public allDataSource: any;
  public headertext: any;
  public start_date: any;
  public end_date: any;
  public billerData: any = [];
  dataSource = new MatTableDataSource(this.allDataList);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public allDataSource_skip: any = ["patientName"];

  constructor(public dialog: MatDialog, public commonFunction: CommonFunction, public cookie: CookieService,
    public http: HttpServiceService, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
    let allcookies: any;
    allcookies = cookie.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;
    this.user_token = cookie.get('jwtToken');
    this.getDoctorSignedData();
    this.getBillerData();
    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
    let matDatepicker = moment();


    this.activatedRoute.data.forEach(resolveData => {
      this.allDataList = resolveData.alldata;
      this.allDataSource = new MatTableDataSource(this.allDataList);
      this.allDataSource.paginator = this.paginator;
    });

  }

  ngOnInit() {
    this.allDataSource.paginator = this.paginator;
    this.getData();
  }

  ngAfterViewInit() {
    // this.allDataSource.paginator = this.paginator;
  }

  getBillerData() {
    var data = {
      "source": "users_view_doctor",
      "condition": {
        "_id_object": this.cookies_id
      },
      "token": this.user_token
    }
    this.http.httpViaPost('datalist', data)
      .subscribe((response) => {
        this.billerData = response.res;
      })
  }

  dateSearch() {
    var data = {
      "source": "Patient-Record-Report_view",
      "condition": {
        "date": {
          $lte: moment(this.end_date).format('DD-MM-YYYY'),
          $gte: moment(this.start_date).format('DD-MM-YYYY')
        }
      },
      "token": this.user_token,
    }

    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.allDataSource = response.res;
      });
  }

  applyFilter(key: string, value: string) {
    let filterValue: any = {};
    filterValue[key] = value.toLowerCase();
    var data = {
      "source": "Patient-Record-Report_view",
      "condition": filterValue,
      "token": this.user_token,
    }

    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.allDataSource = response.res;
      })

  }

  applyStatusFilter(filterValue: any) {
    var data = {
      "source": "Patient-Record-Report_view",
      "condition": filterValue,
      "token": this.user_token,
    }

    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.allDataSource = response.res;

      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
      width: '1000px',

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getDoctorSignedData() {
    var data = {
      "source": "doctor_signature",
      "condition": {
        "user_id_object": this.cookies_id
      },
      "token": this.user_token
    }
    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.DoctorSignedData = response.res;
        if (this.DoctorSignedData.length == 1) {
          this.buttonText = "Edit";
        }
      })
  }

  getData() {
    this.dataSource = new MatTableDataSource(this.allDataList);
    this.DoctorSigned = this.allDataList["doctorsigned-count"];
    this.Pending = this.allDataList["pending-count"];
    console.log("Problem (Data not coming) >>--->", this.allDataList);
    this.doctorSignedArray = this.allDataList.data.doctorsigned;
    this.pendingArray = this.allDataList.data.pending;
    this.allDataSource = this.allDataList.dataFull;
  }

  viewReportProcessData(flag: string) {
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
      case 'Report Signed':
        if(this.doctorSignedArray.length > 0){
        this.headerText = "DOCTOR SIGNED REPORTS";
        this.commonArray = this.doctorSignedArray;
        this.allDataSource = new MatTableDataSource(this.commonArray);
        this.allDataSource.paginator = this.paginator;
        }else{
           this.openModal(modalData);
        }
        
        break;
      case 'Report unSigned':
        if(this.pendingArray.length > 0) {
          this.headerText = "DOCTOR UNSIGNED REPORTS";
          this.commonArray = this.pendingArray;
          this.allDataSource = new MatTableDataSource(this.commonArray);
          this.allDataSource.paginator = this.paginator;
        } else {
          this.openModal(modalData);
        }
        break;
      default:
        break;
    }
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

  public sendToBillerJson: any = {};

  setSendBiller(index: number, event: any) {
    this.sendToBillerJson[index] = event.value;
  }

  allSendToBiller(index: number) {
    var data: any = {
      "source": "patient_management",
      "data": {
        "id": this.allDataSource[index]._id,
        "biller_id": this.sendToBillerJson[index],
        "status": 2
      },
      "sourceobj": ["biller_id"],
      "token": this.user_token
    }
    this.http.httpViaPost('addorupdatedata', data).subscribe((response) => {
      if (response.status = "success") {
        let message = "Successfully Send";
        let action = "ok";
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
    })
  }

  viewButton(index: number) {
    console.log("indexxxxx", this.allDataSource[index]);
  }

}
