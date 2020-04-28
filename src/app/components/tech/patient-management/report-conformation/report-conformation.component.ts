import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

  public checkboxData: any = [];

  constructor(private http: HttpServiceService, private cookieService: CookieService, private router: Router,public activatedRoute : ActivatedRoute) {

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
        var confirmSubmittedDataSource: any = response.res;
        var patientSearch = [];
        
        for(let loop = 0; loop < confirmSubmittedDataSource.length; loop++) {
          let patientNameArr = confirmSubmittedDataSource[loop].file_original_name.split(' ');
          confirmSubmittedDataSource[loop].patient_name = patientNameArr[0] + ' ' + patientNameArr[1];
          confirmSubmittedDataSource[loop].patient_name_search = patientNameArr[0];
          patientSearch.push(patientNameArr[0]);

          confirmSubmittedDataSource[loop].patient_details = [];
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
          var conflictingPatientRecordsDataSource: any = [];

          if(response.status == "success") {
            for(let loop = 0; loop < confirmSubmittedDataSource.length; loop++) {
              for(let loop2 = 0; loop2 < response.data.match_patient.length; loop2++) {
                /* For find some patient */
                if(confirmSubmittedDataSource[loop].patient_name.toLowerCase() == response.data.match_patient[loop2].patient_name.toLowerCase()) {
                  /* checking duplicate */
                  if(typeof(confirmSubmittedDataSource[loop].patient_find_flag) == 'undefined') {
                    confirmSubmittedDataSource[loop].patient_find_flag = true;
                    confirmSubmittedDataSource[loop].patient_details.push(response.data.match_patient[loop2]);
                  } else {
                    conflictingPatientRecordsDataSource.push(confirmSubmittedDataSource[loop]);
                    conflictingPatientRecordsDataSource[loop].patient_details.push(response.data.match_patient[loop2]);
                  }
                }
              }
            }

            /* Delete conflict data */
            for(let loop = 0; loop < confirmSubmittedDataSource.length; loop++) {
              if(confirmSubmittedDataSource[loop].patient_details.length > 1) {
                confirmSubmittedDataSource.splice(loop, 1);
              }
            }

            /* Add not find data */
            var notFindDataSource: any = [];
            for(let loop = 0; loop < confirmSubmittedDataSource.length; loop++) {
              if(typeof(confirmSubmittedDataSource[loop].patient_find_flag) == 'undefined') {
                notFindDataSource.push(confirmSubmittedDataSource[loop]);
              }
            }

            this.confirmSubmittedDataSource = new MatTableDataSource(confirmSubmittedDataSource);
            this.conflictingPatientRecordsDataSource = new MatTableDataSource(conflictingPatientRecordsDataSource);
            this.notFindPatientRecordsDataSource = new MatTableDataSource(notFindDataSource);
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
    this.autocomplateData.flag = flag;
    this.autocomplateData.arrayIndex = index;
  }

  testFun() {
    // for(let loop = 0; loop < this.htmlText.options.length; loop++) {
    //   if(this.htmlText.options[loop].patient_name == user) {
    //     console.log(">>>>>>", this.htmlText.options[loop]);
    //   }
    // }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(">>>>>", this.htmlText.options[this.autocomplateData.arrayIndex]);
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
