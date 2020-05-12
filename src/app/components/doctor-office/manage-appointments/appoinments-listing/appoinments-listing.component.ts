import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {HttpServiceService} from '../../../../services/http-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonFunction} from '../../../../class/common/common-function';
import {MatTableDataSource, MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../common/dialog-box/dialog-box.component';
import * as momentImported from 'moment';

const moment = momentImported;
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-appoinments-listing',
  templateUrl: './appoinments-listing.component.html',
  styleUrls: ['./appoinments-listing.component.css']
})

export class AppoinmentsListingComponent implements OnInit {

  public searchJson: any = {
    doctorName: "",
    patientName: "",
    status: "",
    dateRange: ""
  };

  public allResolveData: any = {};
  public htmlText: any = {
    headerText: "Patient Report Record"
  }
  public authData: any = {};
  public dialogRef: any;

  constructor(public cookie: CookieService, public http: HttpClient, public snackBar: MatSnackBar,
              public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
              public commonFunction: CommonFunction, public dialog: MatDialog) {

    let allData: any = cookie.getAll();
    this.authData["userData"] = JSON.parse(allData.user_details);
    this.authData["jwtToken"] = cookie.get('jwtToken');
  }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
