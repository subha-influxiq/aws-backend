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
    if(this.shareDetailsData.user_type == 'admin') {
      this.shareDetailsData.link = this.shareDetailsData.baseUrl + '/home';
    } else {
      this.shareDetailsData.link = this.shareDetailsData.baseUrl + '/home/' + this.shareDetailsData.userId;
    }

    //share link
    var url = "http://www.tumblr.com/share?v=3&u=https%3A%2F%2Fpece-doctor-signup.influxiq.com%2Fhome&t=AWS";
    this.shareDetailsData.facebookShareLink = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.shareDetailsData.link);
    this.shareDetailsData.twitterShareLink = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(this.shareDetailsData.link) + "&text=AWS";
    this.shareDetailsData.linkedinShareLink = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(this.shareDetailsData.link) + "&title=&summary=&source=";
    this.shareDetailsData.tumblrShareLink = "http://www.tumblr.com/share?v=3&u=" + encodeURIComponent(this.shareDetailsData.link) + "&t=AWS";

  }

  copyShareLink(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    this.matSnackBar.open("Link copied.", "X", {
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'end', 
      panelClass: ['success-snackbar'],
    });
  }

}
