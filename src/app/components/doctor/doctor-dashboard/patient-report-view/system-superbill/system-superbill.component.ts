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
    if(typeof(this.reportDetails.reportData[0].BMI) != 'undefined') {
      this.reportDetails.reportData[0].BMI_flag = Math.round(this.reportDetails.reportData[0].BMI * 10);
      console.log(">>>>", this.reportDetails.reportData[0].BMI_flag);

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


}
