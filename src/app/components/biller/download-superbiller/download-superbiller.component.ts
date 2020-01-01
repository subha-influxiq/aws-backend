import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-download-superbiller',
  templateUrl: './download-superbiller.component.html',
  styleUrls: ['./download-superbiller.component.css']
})
export class DownloadSuperbillerComponent implements OnInit {

  public reportData: any = [];
  public password: string = "";

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(resolveData => {
      this.reportData = resolveData.data.res[0];
    });
  }

  ngOnInit() {
  }

  downloadPDF() {
    if(this.password == this.reportData.download_password) {
      this.password = "";
      window.open(this.reportData.file_path);
    } else {
      console.log('Error...');
    }
  }

}
