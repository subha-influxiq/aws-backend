import { Component, OnInit, ViewChild, HostListener, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-doctor-signup-share',
  templateUrl: './doctor-signup-share.component.html',
  styleUrls: ['./doctor-signup-share.component.css']
})
export class DoctorSignupShareComponent implements OnInit {

  public shareDetailsData: any;

  @Input()
  set shareDetails(shareDetailsData: any) {
    this.shareDetailsData = shareDetailsData;
  }

  constructor(public matSnackBar: MatSnackBar) { }

  ngOnInit() {
    console.log("Data: ", this.shareDetailsData);
  }

  copyShareLink(inputElement) {
    var link = this.shareDetailsData.baseUrl + '/' + this.shareDetailsData.userId;

    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    this.matSnackBar.open("Link copied.", "Ok", {
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'end', 
      panelClass: ['success-snackbar'],
    });
  }

}
