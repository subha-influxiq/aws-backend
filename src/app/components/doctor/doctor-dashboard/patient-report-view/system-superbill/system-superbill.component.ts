import { Component, OnInit, ViewChild, HostListener, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-system-superbill',
  templateUrl: './system-superbill.component.html',
  styleUrls: ['./system-superbill.component.css']
})
export class SystemSuperbillComponent implements OnInit {
  
  public R000Text: string = "R00.0 Tachycardia, unspecified Abnormal Heart Rhythm & Electrical Stability";
  public htmlText: any = { 
    nav: 'Add Patient', 
    header: "Physician Report"
  };
  
  public reportDetails: any;
  public cookiesData: any;
  public orginalReportDetails: any;

  @Input()
  set patientDetails(patientDetailsData: any) {
    this.reportDetails = patientDetailsData;
  }

  @Input()
  set orginalData(orginalData: any) {
    this.orginalReportDetails = orginalData;
  }

  constructor(public activatedRoute: ActivatedRoute, public httpService: HttpServiceService,
    public cookie: CookieService, public fb: FormBuilder, public router: Router, public datePipe: DatePipe) {
    
    this.cookiesData = this.cookie.getAll();
    this.cookiesData.user_details = JSON.parse(this.cookiesData.user_details);
    //this.getPatientData(this.activatedRoute.snapshot.params._id);
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
      this.orginalReportDetails.patient_details[0].doctor_details.push({
        firstname: 'Not',
        lastname: 'Found'
      });
    }

    if(typeof(this.orginalReportDetails.patient_details[0].insurance_id) != 'undefined' && this.orginalReportDetails.patient_details[0].insurance_id != '') {
      this.getInsuranceData('');
    } else {
      this.orginalReportDetails.patient_details[0].insurance_details = {
        insurancename: ''
      };
    }


    if(typeof(this.reportDetails.reportData[0].BMI) != 'undefined') {
      this.reportDetails.reportData[0].BMI_flag = Math.round(this.reportDetails.reportData[0].BMI * 10);
      
      if(this.reportDetails.reportData[0].BMI_flag >= 290 && this.reportDetails.reportData[0].BMI_flag < 300) {
        this.reportDetails.reportData[0].BMI29 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 330 && this.reportDetails.reportData[0].BMI_flag < 340) {
        this.reportDetails.reportData[0].BMI33 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 370 && this.reportDetails.reportData[0].BMI_flag < 380) {
        this.reportDetails.reportData[0].BMI37 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 450 && this.reportDetails.reportData[0].BMI_flag < 500) {
        this.reportDetails.reportData[0].BMI45 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 300 && this.reportDetails.reportData[0].BMI_flag < 310) {
        this.reportDetails.reportData[0].BMI30 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 340 && this.reportDetails.reportData[0].BMI_flag < 350) {
        this.reportDetails.reportData[0].BMI34 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 380 && this.reportDetails.reportData[0].BMI_flag < 390) {
        this.reportDetails.reportData[0].BMI38 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 500 && this.reportDetails.reportData[0].BMI_flag < 600) {
        this.reportDetails.reportData[0].BMI50 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 310 && this.reportDetails.reportData[0].BMI_flag < 320) {
        this.reportDetails.reportData[0].BMI31 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 350 && this.reportDetails.reportData[0].BMI_flag < 360) {
        this.reportDetails.reportData[0].BMI31 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 390 && this.reportDetails.reportData[0].BMI_flag < 400) {
        this.reportDetails.reportData[0].BMI39 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 600 && this.reportDetails.reportData[0].BMI_flag < 700) {
        this.reportDetails.reportData[0].BMI60 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 320 && this.reportDetails.reportData[0].BMI_flag < 330) {
        this.reportDetails.reportData[0].BMI32 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 360 && this.reportDetails.reportData[0].BMI_flag < 370) {
        this.reportDetails.reportData[0].BMI36 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 400 && this.reportDetails.reportData[0].BMI_flag < 450) {
        this.reportDetails.reportData[0].BMI40 = true;
      }

      if(this.reportDetails.reportData[0].BMI_flag >= 700) {
        this.reportDetails.reportData[0].BMI70 = true;
      }
    }
  }

  getInsuranceData(id: any) {
    var data = {
      "source": "data_pece",
      "condition": {
        "_id_object": this.orginalReportDetails.patient_details[0].insurance_id
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


}
