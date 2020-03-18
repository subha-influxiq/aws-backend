import { Component, OnInit, ViewChild, HostListener, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { DatePipe } from '@angular/common';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-additional-recommemded-diagnostic-tests',
  templateUrl: './additional-recommemded-diagnostic-tests.component.html',
  styleUrls: ['./additional-recommemded-diagnostic-tests.component.css']
})

export class AdditionalRecommemdedDiagnosticTestsComponent implements OnInit {

  public cookiesData: any;
  public htmlText: any = {};

  public reportDetails: any;

  @Input()
  set patientDetails(patientDetailsData: any) {
    this.reportDetails = patientDetailsData;
    console.log(">>>", patientDetailsData.additional_recommemded_diagnostic_tests);
  }

  constructor(public activatedRoute: ActivatedRoute, public httpService: HttpServiceService,
    public cookie: CookieService, public fb: FormBuilder, public router: Router,public datePipe : DatePipe) {
    
    this.cookiesData = this.cookie.getAll();
    this.cookiesData.user_details = JSON.parse(this.cookiesData.user_details);
  }

  ngOnInit() {
  }

}
