import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-report-conformation',
  templateUrl: './report-conformation.component.html',
  styleUrls: ['./report-conformation.component.css']
})
export class ReportConformationComponent implements OnInit {

  /* Confirm submitted records with existing patient profile which yet to have a report. */
  public confirmSubmittedDisplayedColumns: string[] = ["no", "patient_report", "suggested_patient_by_system", "choose_other_patient"];
  public confirmSubmittedDataSource = [];
  
  /* Conflicting Patient Records */
  public conflictingPatientRecordsDisplayedColumns: string[] = ["no", "patient_report", "conflicting_records", "choose_patient"];
  public conflictingPatientRecordsDataSource = [];

  public htmlText: any = {};
  public myControl = new FormControl();
  public options: string[] = ['One', 'Two', 'Three'];

  constructor(private http: HttpServiceService, private cookieService: CookieService, 
    private router: Router,public activatedRoute : ActivatedRoute) {

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
          this.confirmSubmittedDataSource = response.res;
          console.log(">>", this.confirmSubmittedDataSource);

          var patientSearch = [];
          for(let loop = 0; loop < this.confirmSubmittedDataSource.length; loop++) {
            let patientNameArr = this.confirmSubmittedDataSource[loop].file_original_name.split(' ');
            this.confirmSubmittedDataSource[loop].patient_name = patientNameArr[0] + ' ' + patientNameArr[1];
            this.confirmSubmittedDataSource[loop].patient_name_search = patientNameArr[0];
            patientSearch.push(patientNameArr[0]);
          }

          let data = {
            "source": "google_events",
            "condition": { 
              "patient_name": patientSearch
            },
            "token": this.htmlText.userData.jwtToken
          };
    
          this.http.httpViaPost('bulk-upload-patient-match', data).subscribe(response => {
            if(response.status == true) {
              for(let loop = 0; loop < this.confirmSubmittedDataSource.length; loop++) {
                for(let loop2 = 0; loop2 < response.data.length; loop2++) {
                  if(this.confirmSubmittedDataSource[loop].patient_name.toLowerCase() == response.data[loop2].patient_name.toLowerCase()) {
                    this.confirmSubmittedDataSource[loop].patient_details = response.data[loop2];
                  }
                }
              }

              console.log("main: ", this.confirmSubmittedDataSource);
            }
          });
        }
      });
    }

  ngOnInit() {
  }

}
