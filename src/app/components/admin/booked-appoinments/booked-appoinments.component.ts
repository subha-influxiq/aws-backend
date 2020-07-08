import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../../class/common/common-function';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { MatTabChangeEvent, VERSION } from '@angular/material';

@Component({
  selector: 'app-booked-appoinments',
  templateUrl: './booked-appoinments.component.html',
  styleUrls: ['./booked-appoinments.component.css']
})

export class BookedAppoinmentsComponent implements OnInit {

  public tabFlag: number = 0;

  doctors: any = [];

  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute,
              public snackBar: MatSnackBar, public httpService: HttpServiceService, public cookie: CookieService) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.tab_flag) {
      switch(this.activatedRoute.snapshot.params.tab_flag) {
        case 'pending':
          break;
        case 'completed':
          this.tabFlag = 1;
          break;
      }
    }

    // load doctor search data
    // const data1 = {
    //   token: this.cookie.get('jwtToken'),
    //   condition: {}
    // };
    // this.httpService.postRequest('get-doctor-info', data1).subscribe((response: any) => {
    //   for (let i = 0; i < response.data.length; i++) {
    //     let temp: any = {};
    //     temp['val'] = response.data[i]._id;
    //     temp['name'] = response.data[i].firstname + ' ' + response.data[i].lastname;
    //     this.doctors.push(temp);
    //   }
    // });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
