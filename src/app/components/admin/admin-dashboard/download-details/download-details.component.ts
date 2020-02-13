import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

export interface DialogData { 
  report_id: string
}

@Component({
  selector: 'app-download-details',
  templateUrl: './download-details.component.html',
  styleUrls: ['./download-details.component.css']
})

export class DownloadDetailsComponent implements OnInit {

  public data: any;
  public loader: boolean = true;
  public displayedColumns = ['position', 'ip_address', 'os', 'browser', 'device', 'download_attempt', 'date_time'];
  public dataSource: any;

  constructor(public dialogRef: MatDialogRef<DownloadDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData, public router: Router,
    public cookieService: CookieService, private http: HttpServiceService) {
    this.data = this.dialogData;
    
    this.getDownloadReportDetails(this.data.report_id);
  }

  ngOnInit() {
  }

  getDownloadReportDetails(reportID: string) {
    let jwtToken = this.cookieService.get('jwtToken');
    var data = {
      "source": "report_download",
      "condition": { "report_id_object":  reportID},
      "token": jwtToken
    }
    this.http.httpViaPost('datalist', data).subscribe(response => {
      this.loader = false;
      this.dataSource = new MatTableDataSource(response.res);
    });
  }

}
