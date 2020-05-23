import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { PatientSelectModalComponent } from '../patient-select-modal/patient-select-modal.component';

@Component({
  selector: 'app-report-conformation',
  templateUrl: './report-conformation.component.html',
  styleUrls: ['./report-conformation.component.css']
})
export class ReportConformationComponent implements OnInit {

  /* Confirm submitted records with existing patient profile which yet to have a report. */
  public confirmSubmittedDisplayedColumns: string[] = ["no", "patient_report", "suggested_patient_by_system", "choose_other_patient"];
  public confirmSubmittedDataSource: any = [];
  
  /* Conflicting Patient Records */
  public conflictingPatientRecordsDisplayedColumns: string[] = ["no", "patient_report", "conflicting_records", "choose_other_patient"];
  public conflictingPatientRecordsDataSource: any = [];

  /* Not Find Patient Records */
  public notFindPatientRecordsDisplayedColumns: string[] = ["no", "patient_report", "choose_other_patient"];
  public notFindPatientRecordsDataSource: any = [];

  public htmlText: any = {
    confirmSubmittedDataSource: [],
    conflictingPatientRecordsDataSource: [],
    notFindDataSource: []
  };

  /* Auto Complete */
  public autocomplateData: any = {
    flag: "",
    arrayIndex: ""
  };

  public checkboxData: any = {
    checkbox1: false,
    checkbox2: false
  };
  public dialogRef: any;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private http: HttpServiceService, private cookieService: CookieService, private router: Router,public activatedRoute : ActivatedRoute) {

    this.htmlText.userData = this.cookieService.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);

    var data = {
      "source": "data_pece",
      "condition": { 
        "upload_id": this.activatedRoute.snapshot.paramMap.get("upload_id")
      },
      "token": this.htmlText.userData.jwtToken
    };

    this.http.httpViaPost('datalist', data).subscribe(response => {
      if(response.status == true) {
        /* Get name using file name start */
        this.htmlText.confirmSubmittedDataSource = response.res;
        var patientSearch = [];
        
        for(let loop = 0; loop < this.htmlText.confirmSubmittedDataSource.length; loop++) {
          let patientNameArr = this.htmlText.confirmSubmittedDataSource[loop].file_original_name.split(' ');
          this.htmlText.confirmSubmittedDataSource[loop].patient_name = patientNameArr[0] + ' ' + patientNameArr[1];
          this.htmlText.confirmSubmittedDataSource[loop].patient_name_search = patientNameArr[0];
          patientSearch.push(patientNameArr[0]);

          this.htmlText.confirmSubmittedDataSource[loop].patient_details = [];
        }
        /* Get name using file name end */

        /* Find patient name using file name start view_google_event_with_all_data */
        let data = {
          "source": "view_google_event_with_all_data",
          "condition": { 
            "patient_name": patientSearch,
            "userid": this.htmlText.userData.user_details._id
          },
          "token": this.htmlText.userData.jwtToken
        };
  
        this.http.httpViaPost('bulk-upload-patient-match', data).subscribe(response => {
          this.htmlText.options = response.data.all_patient;
          this.htmlText.conflictingPatientRecordsDataSource = [];

          if(response.status == "success") {
            for(let loop = 0; loop < this.htmlText.confirmSubmittedDataSource.length; loop++) {
              for(let loop2 = 0; loop2 < response.data.match_patient.length; loop2++) {
                /* For find some patient */
                if(this.htmlText.confirmSubmittedDataSource[loop].patient_name.toLowerCase() == response.data.match_patient[loop2].patient_name.toLowerCase()) {
                  /* checking duplicate */
                  if(typeof(this.htmlText.confirmSubmittedDataSource[loop].patient_find_flag) == 'undefined') {
                    this.htmlText.confirmSubmittedDataSource[loop].patient_find_flag = true;
                    this.htmlText.confirmSubmittedDataSource[loop].patient_details.push(response.data.match_patient[loop2]);
                  } else {
                    this.htmlText.conflictingPatientRecordsDataSource.push(this.htmlText.confirmSubmittedDataSource[loop]);
                    this.htmlText.conflictingPatientRecordsDataSource[loop].patient_details.push(response.data.match_patient[loop2]);
                  }
                }
              }
            }

            /* Delete conflict data */
            for(let loop = 0; loop < this.htmlText.confirmSubmittedDataSource.length; loop++) {
              if(this.htmlText.confirmSubmittedDataSource[loop].patient_details.length > 1) {
                this.htmlText.confirmSubmittedDataSource.splice(loop, 1);
              }
            }

            /* Add not find data */
            this.htmlText.notFindDataSource = [];
            var deleteIndex = [];
            for(let loop = 0; loop < this.htmlText.confirmSubmittedDataSource.length; loop++) {
              if(typeof(this.htmlText.confirmSubmittedDataSource[loop].patient_find_flag) == 'undefined') {
                this.htmlText.notFindDataSource.push(this.htmlText.confirmSubmittedDataSource[loop]);
                deleteIndex.push(loop);
              }
            }

            for(let loop = 0; loop < deleteIndex.length; loop++) {
              this.htmlText.confirmSubmittedDataSource.splice(deleteIndex, 1);
            }

            this.confirmSubmittedDataSource = new MatTableDataSource(this.htmlText.confirmSubmittedDataSource);
            this.conflictingPatientRecordsDataSource = new MatTableDataSource(this.htmlText.conflictingPatientRecordsDataSource);
            this.notFindPatientRecordsDataSource = new MatTableDataSource(this.htmlText.notFindDataSource);
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  selectArrayIndex(flag, index) {
    this.autocomplateData.flag = flag;
    this.autocomplateData.arrayIndex = index;
  }

  selectConflictingRecord(flag, conflictIndex, selectIndex) {
    if(flag == 'conflicting') {
      let data: any = {
        width: '250px',
        data: {
          header: "Alert",
          message: "Are you sure to select record ?",
          button1: { text: "No" },
          button2: { text: "Yes" },
        }
      };
      this.dialogRef = this.dialog.open(DialogBoxComponent, data);
      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "No":
            break;
          case "Yes":
            var patientDetails = this.htmlText.conflictingPatientRecordsDataSource[conflictIndex].patient_details[selectIndex];
            this.htmlText.conflictingPatientRecordsDataSource[conflictIndex].patient_details.splice(0, this.htmlText.conflictingPatientRecordsDataSource[conflictIndex].patient_details.length);
            this.htmlText.conflictingPatientRecordsDataSource[conflictIndex].patient_details.push(patientDetails);

            this.htmlText.confirmSubmittedDataSource.push(this.htmlText.conflictingPatientRecordsDataSource[conflictIndex]);
            this.htmlText.conflictingPatientRecordsDataSource.splice(conflictIndex, 1);

            this.confirmSubmittedDataSource = new MatTableDataSource(this.htmlText.confirmSubmittedDataSource);
            this.conflictingPatientRecordsDataSource = new MatTableDataSource(this.htmlText.conflictingPatientRecordsDataSource);
            break;
        }
      });
    }
  }

  updateRecord() {
    console.log("SUBHA >>>----> ", this.htmlText.confirmSubmittedDataSource);
    if(this.checkboxData.checkbox1 == true && this.checkboxData.checkbox2 == true) {
      var data: any = {
        "source": "data_pece",
        "data": this.htmlText.confirmSubmittedDataSource,
        "token": this.htmlText.userData.jwtToken
      };

      this.http.httpViaPost("update-upload-file", data).subscribe(response => {
        if(response.status == 'success') {
          this.snackBar.open("Successfully updated.", "Ok", {
            duration: 2000,
          });
          
          setTimeout(() => {
            this.router.navigateByUrl('/tech/dashboard');
          }, 1000);
        } else {
          this.snackBar.open(response.msg + " Error code: F-AEA-TS-164.", "Ok", {
            duration: 2000,
          });
        }
      });
    } else {
      let data: any = {
        width: '250px',
        data: {
          header: "Alert",
          message: "Please check confirm box before submit.",
          button1: { text: "" },
          button2: { text: "Okay" },
        }
      };
      this.dialogRef = this.dialog.open(DialogBoxComponent, data);
      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "No":
            break;
          case "Yes":
            break;
        }
      });
    }
  }

  changePatientDialog(sectionFlag, tableIndex) {
    const dialogRef = this.dialog.open(PatientSelectModalComponent, {
      width: '500px',
      data: { allPatient: this.htmlText.options }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != '') {
        switch(sectionFlag) {
          case 'submitted':
            this.htmlText.confirmSubmittedDataSource[tableIndex].patient_details.splice(0, 1);
            this.htmlText.confirmSubmittedDataSource[tableIndex].patient_details.push(result);
            this.confirmSubmittedDataSource = new MatTableDataSource(this.htmlText.confirmSubmittedDataSource);
            break;
          case 'conflicting':
            this.htmlText.conflictingPatientRecordsDataSource[tableIndex].patient_details = [];
            this.htmlText.conflictingPatientRecordsDataSource[tableIndex].patient_details.push(result);
            this.conflictingPatientRecordsDataSource = new MatTableDataSource(this.htmlText.conflictingPatientRecordsDataSource);
            break;
          case 'not found':
            this.htmlText.confirmSubmittedDataSource.push(this.htmlText.notFindDataSource[tableIndex]);
            this.htmlText.confirmSubmittedDataSource[this.htmlText.confirmSubmittedDataSource.length - 1].patient_details.push(result);
            this.htmlText.notFindDataSource.splice(tableIndex, 1);

            this.confirmSubmittedDataSource = new MatTableDataSource(this.htmlText.confirmSubmittedDataSource);
            this.notFindPatientRecordsDataSource = new MatTableDataSource(this.htmlText.notFindDataSource);
            break;
          default:
            break;
        }
      }
    });
  }

}
