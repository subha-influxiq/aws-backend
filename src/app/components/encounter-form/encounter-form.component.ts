import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpServiceService } from '../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatCalendarBody } from '@angular/material';
import * as _ from "lodash";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-encounter-form',
  templateUrl: './encounter-form.component.html',
  styleUrls: ['./encounter-form.component.css']
})
export class EncounterFormComponent implements OnInit {
  public html_body:any;

  constructor(public http:HttpServiceService) {
    let data:any = {
      "source":"",
      "condition":""
    }
      this.http.httpViaPost("get-report-data",data).subscribe((response: any) => {
          // console.log('7777',response);
          this.html_body = response.res;
      })
   }

  ngOnInit() {
  }

}
