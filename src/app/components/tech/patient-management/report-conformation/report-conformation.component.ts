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

  public htmlText: any = {};

  /*Auto Complete*/
  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<any[]>;

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

        /* Find patient name using file name start */
        let data = {
          "source": "google_events",
          "condition": { 
            "patient_name": patientSearch,
            "userid": this.htmlText.userData.user_details._id
          },
          "token": this.htmlText.userData.jwtToken
        };
  
        this.http.httpViaPost('bulk-upload-patient-match', data).subscribe(response => {
          for(let loop = 0; loop < response.data.match_patient.length; loop++) {
            this.options.push(response.data.match_patient[loop].patient_name);
          }
          this.htmlText.options = response.data.match_patient;
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
            for(let loop = 0; loop < this.htmlText.confirmSubmittedDataSource.length; loop++) {
              if(typeof(this.htmlText.confirmSubmittedDataSource[loop].patient_find_flag) == 'undefined') {
                this.htmlText.notFindDataSource.push(this.htmlText.confirmSubmittedDataSource[loop]);
              }
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
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  selectArrayIndex(flag, index) {
    console.log(flag, index);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    switch(this.autocomplateData.flag) {
      case 'find':
        var patientData: any;
        for(let loop = 0; loop < this.htmlText.options.length; loop++) {
          if(this.htmlText.options[loop].patient_name == value) {
            patientData = this.htmlText.options[loop];
          }
        }

        this.htmlText.confirmSubmittedDataSource[this.autocomplateData.arrayIndex].patient_details.push(patientData);
        this.htmlText.confirmSubmittedDataSource[this.autocomplateData.arrayIndex].patient_details.splice(0, 1);
        this.confirmSubmittedDataSource = new MatTableDataSource(this.htmlText.confirmSubmittedDataSource);
        
        this.autocomplateData.flag = "";
        this.autocomplateData.arrayIndex = "";
        break;
      case 'conflicting':
        this.htmlText.conflictingPatientRecordsDataSource[this.autocomplateData.arrayIndex].patient_details.push(this.htmlText.options[this.autocomplateData.arrayIndex]);
        this.htmlText.conflictingPatientRecordsDataSource[this.autocomplateData.arrayIndex].patient_details.splice(0, 1);
        this.conflictingPatientRecordsDataSource = new MatTableDataSource(this.htmlText.conflictingPatientRecordsDataSource);
        break;
      case 'not found':
        this.notFindPatientRecordsDataSource = new MatTableDataSource(this.htmlText.notFindDataSource);
        console.log(">>>>>", this.htmlText.options[this.autocomplateData.arrayIndex]);
        break;
    }

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  updateRecord() {
    if(this.checkboxData.checkbox1 == true && this.checkboxData.checkbox2 == true) {
      var data: any = {
        "source": "data_pece",
        "data": this.htmlText.confirmSubmittedDataSource,
        "token": this.htmlText.userData.jwtToken
      };

      this.http.httpViaPost("addorupdatedata", data).subscribe(response => {
        if(response.status == 'success') {
          this.snackBar.open("Successfully updated.", "Ok", {
            duration: 2000,
          });
          
          setTimeout(() => {
            this.router.navigateByUrl('/tech/dashboard');
          }, 1000);
        } else {
          this.snackBar.open("An error occoed. Error code: F-AEA-TS-164.", "Ok", {
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
    console.log(this.htmlText.confirmSubmittedDataSource);
    console.log(this.checkboxData);
  }

}
