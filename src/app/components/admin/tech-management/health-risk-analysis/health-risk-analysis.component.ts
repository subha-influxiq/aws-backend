import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-health-risk-analysis',
  templateUrl: './health-risk-analysis.component.html',
  styleUrls: ['./health-risk-analysis.component.css']
})

export class HealthRiskAnalysisComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) {
    console.log('route:: ', this.activatedRoute.snapshot.params._id);
    this.getPatientData(this.activatedRoute.snapshot.params._id);
  }

  ngOnInit() {
  }

  getPatientData(id: any) {
    console.log('HealthRiskAnalysisComponent');
  }

}
