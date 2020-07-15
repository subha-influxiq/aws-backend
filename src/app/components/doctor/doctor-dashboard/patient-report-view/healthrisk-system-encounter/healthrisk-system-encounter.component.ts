import { Component, OnInit, ViewChild, HostListener, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PatientReportViewComponent } from '../patient-report-view.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-healthrisk-system-encounter',
  templateUrl: './healthrisk-system-encounter.component.html',
  styleUrls: ['./healthrisk-system-encounter.component.css']
})

export class HealthriskSystemEncounterComponent implements OnInit {

  public R000Text: string = "R00.0 Tachycardia, unspecified Abnormal Heart Rhythm & Electrical Stability";
  public htmlText: any = {
    nav: 'Add Patient',
    header: "Physician Report"
  };

  public reportDetails: any;
  public orginalReportDetails: any = {};
  public cookiesData: any;

  @Input()
  set patientDetails(patientDetailsData: any) {
    this.reportDetails = patientDetailsData;
  }

  @Input()
  set orginalData(orginalData: any) {
    this.orginalReportDetails = orginalData;
  }

  constructor(public activatedRoute: ActivatedRoute, public httpService: HttpServiceService, public cookie: CookieService, public fb: FormBuilder, public router: Router, public datePipe: DatePipe, public matSnackBar: MatSnackBar) {
    this.cookiesData = this.cookie.getAll();
    this.cookiesData.user_details = JSON.parse(this.cookiesData.user_details);
  }

  ngOnInit() {
    this.orginalReportDetails.patient_details[0].insurance_details = {};
    this.orginalReportDetails.patient_details[0].insurance_details.insurancename = '';
    switch(this.orginalReportDetails.patient_details[0].gender) {
      case 'male':
        this.orginalReportDetails.patient_details[0].gender_male_flag = true;
        this.orginalReportDetails.patient_details[0].gender_female_flag = false;
        break;
      case 'female':
        this.orginalReportDetails.patient_details[0].gender_male_flag = false;
        this.orginalReportDetails.patient_details[0].gender_female_flag = true;
        break;
    }
    // console.log("additional_potential_health_risks: ", this.orginalReportDetails.additional_potential_health_risks);
    // console.log("r00_description: ", this.orginalReportDetails.r00_description);
    // console.log("icd_codes: ", this.orginalReportDetails.icd_codes);
    // console.log("cpt_codes: ", this.orginalReportDetails.cpt_codes);

    if(this.orginalReportDetails.patient_details[0].doctor_details.length == 0) {
      this.orginalReportDetails.patient_details[0].doctor_details[0] = {};
      this.orginalReportDetails.patient_details[0].doctor_details[0].firstname = 'Not';
      this.orginalReportDetails.patient_details[0].doctor_details[0].lastname = 'Found';
    }

    if(typeof(this.orginalReportDetails.patient_details[0].insurance_id) != 'undefined' && this.orginalReportDetails.patient_details[0].insurance_id != '') {
      this.getInsuranceData('');
    } else {
      this.orginalReportDetails.patient_details[0].insurance_details = {
        insurancename: ''
      };
    }
  }

  getInsuranceData(id: any) {
    var data = {
      "source": "data_pece",
      "condition": {
        "_id": this.orginalReportDetails.patient_details[0].insurance_id
      },
      "token": this.cookiesData.jwtToken
    };

    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
      if(response.status == true) {
        this.orginalReportDetails.patient_details[0].insurance_details = response.res[0];
      } else {
        this.orginalReportDetails.patient_details[0].insurance_details = {};
      }
    });
  }

  checkValue(codeFlag = "icd_codes", value: any, fieldName) {
    var postData:any = {
      "source": "data_pece",
      "condition": {
        "_id": this.orginalReportDetails._id
      },
      "_id": this.orginalReportDetails._id,
      "token": this.cookiesData.jwtToken,
      "field": fieldName,
      "code_type": codeFlag,
      "value": parseInt(value)
    };

    this.httpService.httpViaPost('update-patient-data-codes', postData).subscribe((response) => {
      if(response.status == true) {
        this.matSnackBar.open("Successfully updated.", "Ok", {
          duration: 4000
        });
      } else {
        this.matSnackBar.open("An error occord.", "Ok", {
          duration: 4000
        });
      }
    });
  }

}
