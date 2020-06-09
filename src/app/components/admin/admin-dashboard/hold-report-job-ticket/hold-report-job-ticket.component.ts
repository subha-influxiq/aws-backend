import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatCalendarBody } from '@angular/material';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import * as _ from "lodash";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-hold-report-job-ticket',
  templateUrl: './hold-report-job-ticket.component.html',
  styleUrls: ['./hold-report-job-ticket.component.css']
})
export class HoldReportJobTicketComponent implements OnInit {

  public jobTicketForm: FormGroup;
  public params_id: any = '';
  public htmlText: any = {
    userData: "",
    header: 'Create a job tickets',
    nav: 'Add Doctor',
    buttonText: 'Create',
    message: "Submitted Successfully",
    oldTickets: [],
    reportId: '',
    ckEditorValue: ''
  };

  public tiles: any = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

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

  public dialogRef: any;

  constructor(private formBuilder: FormBuilder, private httpService: HttpServiceService, private cookieService: CookieService, private router: Router, public acivatedRoute: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.htmlText.userData = this.cookieService.getAll();
    this.htmlText.user_details = JSON.parse(this.htmlText.userData.user_details);
  }

  ngOnInit() {
    this.acivatedRoute.paramMap.subscribe(params => {
      this.htmlText.reportId = params.get('_id');

      var data = {
        "source": "data_pece",
        "condition": {
          "_id_object": this.htmlText.reportId
        },
        "token": this.htmlText.userData.jwtToken
      }
  
      this.httpService.httpViaPost('datalist', data).subscribe(response => {
        if(typeof(response.res[0].job_tickets_details) != 'undefined') {
          this.htmlText.header = 'Reply';
          this.htmlText.oldTickets = response.res[0].job_tickets_details;
        } else {
          this.htmlText.oldTickets = [];
        }
        
        for(let loop1 = 0; loop1 < this.htmlText.oldTickets.length; loop1++) {
          this.htmlText.oldTickets[loop1].images = [];

          for(let loop2 = 0; loop2 < this.htmlText.oldTickets[loop1].files.length; loop2++) {
            var data: any = this.randomNumber(1, this.htmlText.oldTickets[loop1].files.length - 1);

            this.htmlText.oldTickets[loop1].images.push(
              { 
                cols: data.cols, 
                rows: data.rows, 
                image: this.htmlText.oldTickets[loop1].files[loop2].basepath + this.htmlText.oldTickets[loop1].files[loop2].fileservername,
                color: 'lightblue'
              }
            );
          }
        }
      });
    });
  }

  createJobTickets() {
    if (typeof(this.configData.files) != 'undefined' && this.configData.files.length > 0) {
      var images_array: any = [];
      for (const loop in this.configData.files) {
        images_array = images_array.concat({
            "upload_server_id": this.configData.files[loop].upload.data._id,
            "basepath": this.configData.files[loop].upload.data.basepath + '/' + this.configData.path + '/',
            "fileservername": this.configData.files[loop].upload.data.data.fileservername,
            "name": this.configData.files[loop].name,
            "type": this.configData.files[loop].type,
            "bucketname": this.configData.bucketName
          });
      }

      this.htmlText.uploadFiles = images_array;
    } else {
      this.htmlText.uploadFiles = [];
    }

    var data: any = {
      "source" : "data_pece",
      "data" : {
        id: this.htmlText.reportId,
        job_tickets_details: {
          user_id: this.htmlText.user_details._id,
          user_type: this.htmlText.user_details.user_type,
          user_name: this.htmlText.user_details.firstname + ' ' + this.htmlText.user_details.lastname,
          description: this.htmlText.ckEditorValue,
          files: this.htmlText.uploadFiles
        },
        job_ticket_status: 'open'
      },
      "token" : this.htmlText.userData.jwtToken,
      "job_tickets": true
    };

    this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
      if (response.status == "success") {
        let data: any = {
          width: '250px',
          data: {
            header: "Successfully Submitted",
            message: "Thank you for your interest. We will contact you soon.",
            button1: { text: "" },
            button2: { text: "Close" },
          }
        };
        this.dialogRef = this.dialog.open(DialogBoxComponent, data);
        
        this.dialogRef.afterClosed().subscribe(result => {
          switch(result) {
            case "Close":
              this.router.navigateByUrl('/admin/dashboard');
              break;
            default:
              this.router.navigateByUrl('/admin/dashboard');
              break;
          }
        });
      } else {
        this.snackBar.open(response.msg, '', {
          duration: 2000,
        });
      }
    });
  }

  randomNumber(min, max) {
    var table: any = {
      cols: Math.round((Math.random() * (max - min) + min)),
      rows: Math.round((Math.random() * (max - min) + min))
    }; 

    return table;
  }

  createJobTicket() {
    
  }

}
