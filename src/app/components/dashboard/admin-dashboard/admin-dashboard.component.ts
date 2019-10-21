import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  docCount: any = [];
  constructor(private router: Router, public cookieService: CookieService,
    private http: HttpServiceService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.docCount = resolveData;
      console.log('doc count: ', this.docCount);
    });
  }

  myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  /*Doctor's List*/
  toDocList() {
    this.router.navigateByUrl('doctor-management/list');
  }


  // =======================Get Doctots Count=================
  // onDocGetCount() {
  //   let postData: any = {
  //     source: 'doctors_count',
  //     token: this.cookieService.get('jwtToken')
  //   };
  //   this.http.httpViaPost('datalist', postData).subscribe((response: any) => {

  //     let result: any = response;
  //     this.docCount = result.res[0].doctorcount;
  //   }, (error) => {
  //     alert("Some error occurred. Please try again.");
  //   });
  // }
  // =========================================================

}
