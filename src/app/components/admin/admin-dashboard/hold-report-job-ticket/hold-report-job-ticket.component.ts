import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatCalendarBody } from '@angular/material';
import * as _ from "lodash";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-hold-report-job-ticket',
  templateUrl: './hold-report-job-ticket.component.html',
  styleUrls: ['./hold-report-job-ticket.component.css']
})
export class HoldReportJobTicketComponent implements OnInit {

  public jobTicketForm: FormGroup;
  public params_id: any='';
  public htmlText: any = {
    userData: "",
    header: 'Create a job tickets',
    nav: 'Add Doctor',
    buttonText: 'Create',
    message: "Submitted Successfully",
    ckEditorValue: ''
  };

  public configData: any = {
    baseUrl: environment.fileUploadUrl,
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png", "gif", "bmp"], // use all small font
    type: "patient-file",
    path: "patientFile",
    prefix: "patient-file",
    formSubmit: false,
    conversionNeeded: 1,
    bucketName: "awsbackend-dev-patient-files"
  }

  constructor(private formBuilder: FormBuilder, private http: HttpServiceService, private cookieService: CookieService, public dialog: MatDialog, private router: Router, public acivatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
    this.htmlText.userData = this.cookieService.getAll();
    this.htmlText.user_details = JSON.parse(this.htmlText.userData.user_details);

    // Generate form
    this.generateAddEditForm();
  }

  ngOnInit() {
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      firstname: ['', [Validators.required, Validators.maxLength(50)]]
    };

    this.jobTicketForm = this.formBuilder.group(validateRule);
  }

}
