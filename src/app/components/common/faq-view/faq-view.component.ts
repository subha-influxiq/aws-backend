import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonFunction } from '../../../class/common/common-function';
import { Router, ActivatedRoute ,ActivatedRouteSnapshot} from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-faq-view',
  templateUrl: './faq-view.component.html',
  styleUrls: ['./faq-view.component.css']
})
export class FaqViewComponent implements OnInit {

  public loginUserData: any = {};
  public allResolveData: any;

  constructor(public http: HttpClient, public commonFunction: CommonFunction, public activatedRoute: ActivatedRoute, 
    public cookieService: CookieService, public httpService: HttpServiceService, public deviceService: DeviceDetectorService,
    public matSnackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    
      /* Get and set login User Data */
    this.loginUserData["user_details"] = JSON.parse(this.cookieService.get('user_details'));
    this.loginUserData["jwtToken"] = this.cookieService.get('jwtToken');
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.allResolveData = resolveData.faqData.res;
      for(let loop = 0; loop < this.allResolveData.length; loop++) {
        this.allResolveData[loop].youtube_link_save = this.sanitizer.bypassSecurityTrustResourceUrl(this.allResolveData[loop].youtube_link);
      }
    });
  }

}
