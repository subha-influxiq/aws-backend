import { Component, OnInit, ViewChild, HostListener, Input, Inject  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
  public cookiesData: any;

  @Input()
  set patientDetails(patientDetails: any) {
    this.htmlText.patientDetails = patientDetails;
  }

  constructor(public activatedRoute: ActivatedRoute, public httpService: HttpServiceService, public cookie: CookieService, public fb: FormBuilder, public router: Router, public datePipe: DatePipe) {
    this.cookiesData = this.cookie.getAll();
    this.cookiesData.user_details = JSON.parse(this.cookiesData.user_details);
    //this.getPatientData(this.activatedRoute.snapshot.params._id);
  }

  ngOnInit() {
  }

  getPatientData(id: any) {
    var data = {
      "source": "data_pece",
      "condition": {
        "_id_object": id
      },
      "token": this.cookiesData.jwtToken
    };

    this.httpService.httpViaPost('datalist', data).subscribe((response) => {
      this.htmlText.patientDetails = response.res[0];
    });
  }
  
}
