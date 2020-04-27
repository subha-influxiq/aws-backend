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
  public notFindPatientRecordsDisplayedColumns: string[] = ["no", "patient_report", "conflicting_records", "choose_patient"];
  public notFindPatientRecordsDataSource: any = [];

  public htmlText: any = {};

  /*Auto Complete*/
  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<any[]>;

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
        var confirmSubmittedDataSource = response.res;

        var patientSearch = [];
        
        for(let loop = 0; loop < confirmSubmittedDataSource.length; loop++) {
          let patientNameArr = confirmSubmittedDataSource[loop].file_original_name.split(' ');
          confirmSubmittedDataSource[loop].patient_name = patientNameArr[0] + ' ' + patientNameArr[1];
          confirmSubmittedDataSource[loop].patient_name_search = patientNameArr[0];
          patientSearch.push(patientNameArr[0]);

          var jsonData = {
            "patient_name": "",
            "dob": "",
            "gender": "",
            "height": "",
            "weight": ""
          };
          confirmSubmittedDataSource[loop].patient_details = jsonData;
        }

        let data = {
          "source": "google_events",
          "condition": { 
            "patient_name": patientSearch,
            "userid": this.htmlText.userData.user_details._id
          },
          "token": this.htmlText.userData.jwtToken
        };
  
        this.http.httpViaPost('bulk-upload-patient-match', data).subscribe(response => {
          this.options = response.data.match_patient;
          var conflictingPatientRecordsDataSource: any = [];

          if(response.status == "success") {
            for(let loop = 0; loop < confirmSubmittedDataSource.length; loop++) {
              for(let loop2 = 0; loop2 < response.data.match_patient.length; loop2++) {
                if(confirmSubmittedDataSource[loop].patient_name.toLowerCase() == response.data.match_patient[loop2].patient_name.toLowerCase()) {
                  if(typeof(response.data.match_patient[loop2].select_flag) == "undefined") {
                    response.data.match_patient[loop2].select_flag = true;
                    confirmSubmittedDataSource[loop].patient_details = response.data.match_patient[loop2];
                  } else {
                    confirmSubmittedDataSource[loop].patient_details = response.data.match_patient[loop2];
                    conflictingPatientRecordsDataSource.push(confirmSubmittedDataSource[loop]);
                    confirmSubmittedDataSource.splice(loop, 1);

                    this.confirmSubmittedDataSource = new MatTableDataSource(confirmSubmittedDataSource);
                    this.conflictingPatientRecordsDataSource = new MatTableDataSource(conflictingPatientRecordsDataSource);
                    //this.conflictingPatientRecordsDataSource[this.conflictingPatientRecordsDataSource.length - 1].patient_details = response.data.match_patient[loop2];
                  }
                }
              }
            }
          }
        });
      }
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.patient_name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: any): string {
    //console.log("B", user);
    return user && user ? user : '';
  }

  private _filter(name: string): any {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.patient_name.toLowerCase().indexOf(filterValue) === 0);
  }

}
