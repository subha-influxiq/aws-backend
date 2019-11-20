import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-healthrisk-system-encounter',
  templateUrl: './healthrisk-system-encounter.component.html',
  styleUrls: ['./healthrisk-system-encounter.component.css']
})
export class HealthriskSystemEncounterComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) {
    console.log('route:: ', this.activatedRoute.snapshot.params._id);
    this.getPatientData(this.activatedRoute.snapshot.params._id);
  }

  ngOnInit() {
  }

  getPatientData(id: any) {
    console.log('HealthriskSystemEncounterComponent');
  }

}
