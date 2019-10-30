import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material';



export interface PeriodicElement {
  PatientName: string;
  DoctorsName: string;
  TechName: string;
  Record: string;
  UploadDate: string;
  BillGenerationDate: string;
  BillSentDate: string;
  SuperBill: string;
  Status: string;
  BillerName: string;
  SenttoBiller: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { PatientName: 'hd', DoctorsName: 'Hydrogen', TechName: '1.0079', Record: 'H', UploadDate: 'h', BillGenerationDate: '', BillSentDate: 'jh', SuperBill: 'hgf', Status: 'active', BillerName: 'jhv', SenttoBiller: 'shgv' },
  { PatientName: 'hd', DoctorsName: 'Hydrogen', TechName: '1.0079', Record: 'H', UploadDate: 'h', BillGenerationDate: '', BillSentDate: 'jh', SuperBill: 'hgf', Status: 'active', BillerName: 'jhv', SenttoBiller: 'shgv' },
  { PatientName: 'hd', DoctorsName: 'Hydrogen', TechName: '1.0079', Record: 'H', UploadDate: 'h', BillGenerationDate: '', BillSentDate: 'jh', SuperBill: 'hgf', Status: 'active', BillerName: 'jhv', SenttoBiller: 'shgv' },
  { PatientName: 'hd', DoctorsName: 'Hydrogen', TechName: '1.0079', Record: 'H', UploadDate: 'h', BillGenerationDate: '', BillSentDate: 'jh', SuperBill: 'hgf', Status: 'active', BillerName: 'jhv', SenttoBiller: 'shgv' },
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public user_token: any;
  public billerCount:any;
  public doctorCount:any;
  public techCount:any;
  displayedColumns: string[] = ['PatientName', 'DoctorsName', 'TechName', 'Record', 'UploadDate', 'BillGenerationDate', 'BillSentDate', 'SuperBill', 'Status', 'BillerName', 'SenttoBiller'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  docCount: any = [];
  constructor(private router: Router, public cookieService: CookieService,
    private http: HttpServiceService, public activatedRoute: ActivatedRoute, public commonFunction: CommonFunction) {

    this.user_token = cookieService.get('jwtToken');
    this.getAllCountData();

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();




  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.docCount = resolveData.dataCount;
      console.log(this.docCount);
      // console.log(Object.keys(this.docCount));
    });



  }
  getAllCountData() {
    var data = {
      "condition": {
        "type": "doctor"
      },
      "condition1": {
        "type": "tech"
      },
      "condition2": {
        "type": "biller"
      }
    }
    this.http.httpViaPost('count', data)
      .subscribe(response => {
        let result:any;
        result = response;
        this.billerCount    = result["biller-count"];
        this.techCount      = result["tech-count"];
        this.doctorCount    = result["doctor-count"];
      })
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
    this.router.navigateByUrl('admin/doctor-management/list');
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
