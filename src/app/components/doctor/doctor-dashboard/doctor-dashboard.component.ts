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

  public authData: any = {};
  public allResolveData: any;
  public htmlText:any = { 
    buttonText: "Add One",
    headertext: "DOCTOR SIGNATURE RECORD REPORTS"
  };
  public allDataColumns: string[] = ['no', 'billGenerationDate', 'billSentDate', 'patientName', 'record', 'recordType', 'techName', 'superBill', 'status', 'billerDropDown', 'action'];
  public dataCol:string[] = ['billGenerationDate','billSentDate','doctorName','patientName', 'record','report_type','status','superBill','techName','billerDropDown','action'];
  public dialogRef: any;
  public allDataSource: any;
  public headertext: any;
  public start_date: any;
  public end_date: any;
  public billerData: any = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public allDataSource_skip: any = ["patientName"];

  constructor(public dialog: MatDialog, public commonFunction: CommonFunction, public cookie: CookieService,
    public http: HttpServiceService, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
    let allcookies: any = cookie.getAll();
    this.authData["user_details"] = JSON.parse(cookie.get('user_details'));
    this.authData["jwtToken"] = cookie.get('jwtToken');
    
    let matDatepicker = moment();
    this.activatedRoute.data.forEach(resolveData => {
      this.allResolveData = resolveData.doctordata;
      this.allDataSource = new MatTableDataSource(this.allResolveData.data.allReportData);
    });

    console.log(">>>--->", this.allResolveData.data.allBillerList);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.allDataSource.paginator = this.paginator;
  }

  getBillerData() {
    var data = {
      "source": "users_view_doctor",
      "condition": {
        "_id_object": this.authData.to
      },
      "token": this.authData
    }

    this.http.httpViaPost('datalist', data).subscribe((response) => {
      this.billerData = response.res;
    });
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
      "token": this.authData,
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
      "token": this.authData,
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
      "token": this.authData,
    }

    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.allDataSource = response.res;

      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getDoctorSignedData() {
    var data = {
      "source": "doctor_signature",
      "condition": {
        "user_id_object": this.authData
      },
      "token": this.authData
    }
    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        console.log("doctor signature: ", response.res);
      })
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
        if(typeof this.allResolveData.data.signReportData === 'undefined') {
          var data = {
            "source": "Patient-Record-Report_view",
            "condition": {
              "doctor_signature": { $exists: true },
              "doctor_id_object": this.authData.user_details._id
            },
            "token": this.authData.jwtToken
          }
          this.http.httpViaPost('datalist', data).subscribe(response => {
            if(response.res.length > 0) {
              this.allResolveData.data["signReportData"] = response.res;
              this.allDataSource = new MatTableDataSource(this.allResolveData.data.signReportData);
              this.allDataSource.paginator = this.paginator;
            } else {
              this.openModal(modalData);
            }
          });
        } else {
          this.allDataSource = new MatTableDataSource(this.allResolveData.data.signReportData);
          this.allDataSource.paginator = this.paginator;
        }
        break;
      case 'Report unSigned':
        if(typeof this.allResolveData.data.pendingReportData === 'undefined') {
          var data = {
            "source": "Patient-Record-Report_view",
            "condition": {
              "doctor_signature": { $exists: false },
              "doctor_id_object": this.authData.user_details._id
            },
            "token": this.authData.jwtToken
          }
          this.http.httpViaPost('datalist', data).subscribe(response => {
            if(response.res.length > 0) {
              this.allResolveData.data["pendingReportData"] = response.res;
              this.allDataSource = new MatTableDataSource(this.allResolveData.data.pendingReportData);
              this.allDataSource.paginator = this.paginator;
            } else {
              this.openModal(modalData);
            }
          });
        } else {
          this.allDataSource = new MatTableDataSource(this.allResolveData.data.pendingReportData);
          this.allDataSource.paginator = this.paginator;
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
  public billerFlug: number;

  setSendBiller(index: number, event: any) {
    this.billerFlug = event.value + 1;
    this.sendToBillerJson[index] = event.value;
  }

  allSendToBiller(index: number) {
    if(typeof this.sendToBillerJson[index] !== 'undefined') {
      for(var loop = 0; loop <= this.allResolveData.data.allBillerList.length - 1; loop++) {
        if(this.allResolveData.data.allBillerList[loop].biller_id == this.sendToBillerJson[index]) {
          var fullname = this.allResolveData.data.allBillerList[loop].firstname + ' ' + this.allResolveData.data.allBillerList[loop].lastname;
        }
      }


      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Do you want to send this report to biller: " + fullname + " ?",
          button1: { text: "Yes" },
          button2: { text: "No" },
        }
      };
      this.openModal(modalData);

      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "Yes":
            var data: any = {
              "source": "patient_management",
              "data": {
                "id": this.allDataSource[index]._id,
                "biller_id": this.sendToBillerJson[index],
                "status": 2
              },
              "sourceobj": ["biller_id"],
              "token": this.authData
            };

            this.http.httpViaPost('addorupdatedata', data).subscribe((response) => {
              if (response.status = "success") {
                let message = "Successfully Send";
                let action = "OK";
                this.snackBar.open(message, action, {
                  duration: 2000,
                });
              }
            });
            break;
          case "No":
            this.dialogRef.close();
            break;
        }
      });
    } else {
      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "Please select a biller.",
          button1: { text: "" },
          button2: { text: "OK" },
        }
      };
      this.openModal(modalData);
    }
  }

  viewButton(index: number) {
    console.log("View Button...", this.allDataSource[index]);
  }

}