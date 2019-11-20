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
// public paramsId :any;
  constructor(public activatedRoute : ActivatedRoute) { 
      // this.paramsId = activatedRoute.snapshot.params._id;
      // console.log("sdsdsd",this.paramsId);

    }

  ngOnInit() {
    this.activatedRoute.data.forEach((data) => {
      console.log("souresh",data);
      // this.doctorOfficeAllData = data.data.res;
    })
  }

}
