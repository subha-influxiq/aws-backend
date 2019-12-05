import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})

export class BulkUploadComponent implements OnInit {

  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["pdf", "jpeg"], // use all small font
    type: "patient-file",
    path: "patientFile",
    prefix: "patient-file",
    formSubmit: false,
    conversionNeeded: 1,
    bucketName: "awsbackend-dev-patient-files"
  }

  public techBulkUploadForm: FormGroup;
  public user_token: any;
  public images_array: any = [];
  public cookiesData: any = {};
  public cookies_id: any;
  public allDoctorDataArray: any = [];
  public dialogRef: any;
  public doctorName: any;
  public selectedDoctorName: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {
    this.user_token = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();

    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;
    this.getAllDoctorData();

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.techBulkUploadForm = this.fb.group({
      batch_name: ['', [Validators.required, Validators.maxLength(40)]],
      doctor_id: ['', [Validators.required]],
      upload_file: ['', []],
      status: [1, []],
      note: ['', []],
      tech_id: [this.cookies_id, []],
      report_type: ['file', []],
    })
    this.user_token = cookie.get('jwtToken');
  }

  ngOnInit() {
  }

  getAllDoctorData() {
    var data = {
      "source": "users_view_doctor",
      "condition": {
        "tech_id_object": this.cookies_id
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
        let result: any = {};
        result = response.res;
        this.allDoctorDataArray = result;
      })
  }

  cancelButton() {
    this.router.navigateByUrl('/tech/dashboard');
  }

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  /* This one is for get doctor dropdown data */

  getsellabel(docval: any) {
    this.selectedDoctorName = docval.fullName;
  }

  techBulkUploadFormSubmit() {
    this.configData.formSubmit = true;
    if (!this.configData.files) {
      return false;
    }
    /* Open modal */
    let modalData: any = {
      panelClass: 'bulkupload-dialog',
      data: {
        header: "Message",
        message: "Are you sure you want to upload these reports for physician : " + this.selectedDoctorName + " ?",
        button1: { text: "No" },
        button2: { text: "Yes" },
      }
    }

    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "No":
          location.reload();
          break;
        case "Yes":
          this.bulkUploaddataSubmit();
          break;
      }
    });
  }

  bulkUploaddataSubmit() {
    console.log(">>>>>>>>", this.configData.files);
    if (this.configData.files.length > 0) {
      for (const loop in this.configData.files) {
        this.images_array =
          this.images_array.concat({
            "upload_server_id": this.configData.files[loop].upload.data._id,
            "basepath": this.configData.files[loop].upload.data.basepath + '/' + this.configData.path + '/',
            "fileservername": this.configData.files[loop].upload.data.data.fileservername,
            "name": this.configData.files[loop].name,
            "type": this.configData.files[loop].type,
            "bucketname": this.configData.bucketName
          });
      }

      this.techBulkUploadForm.controls['upload_file'].patchValue(this.images_array);
    } else {
      this.techBulkUploadForm.value.upload_file = false;
    }

    if (this.techBulkUploadForm.valid) {
      var data = {
        "source": "bulk_report_upload",
        "data": this.techBulkUploadForm.value,
        "sourceobj": ["tech_id", "doctor_id"],
        "token": this.user_token
      }
      this.httpService.httpViaPost("upload-bulk-report", data)
        .subscribe(response => {
          if (response.status = "success") {
            let message: any = "Successfully Submitted";
            let action: any = "OK";
            this.snakBar.open(message, action, {
              duration: 2000
            });

            setTimeout(() => {
              this.router.navigateByUrl('/tech/dashboard');
            }, 1000);
          }
        })
    } else {
      alert("error occured");
    }
  }

}
