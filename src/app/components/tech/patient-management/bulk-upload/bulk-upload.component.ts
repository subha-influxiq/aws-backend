import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})

export class BulkUploadComponent implements OnInit {

  public configData: any = {
    baseUrl: environment.fileUploadUrl,
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

  public doctorDetails: any = {};

  public techBulkUploadForm: FormGroup;
  public user_token: any;
  public images_array: any = [];
  public cookiesData: any = {};
  public cookies_id: any;
  public allDoctorDataArray: any = [];
  public dialogRef: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService,
    public cookie: CookieService, public snakBar: MatSnackBar, public dialog: MatDialog,
    public commonFunction: CommonFunction) {
    this.user_token = cookie.get('jwtToken');
    let allcookies: any = cookie.getAll();

    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;
    //this.getAllDoctorData();

    this.techBulkUploadForm = this.fb.group({
      batch_name          : ['', [ Validators.required, Validators.maxLength(40) ]],
      report_file_type    : ['', [ Validators.required ]],
      // doctor_id           : ['', [Validators.required]],
      // doctor_name         : ['', []],
      // doctor_email        : ['', []],
      // doctor_details      : ['', []],
      tech_id             : [ this.cookies_id, [Validators.required] ],
      tech_name           : [ this.cookiesData.firstname + ' ' + this.cookiesData.lastname, [] ],
      tech_email          : [ this.cookiesData.email, [] ],
      upload_file         : [ '', [] ],
      status              : [ 2, [] ],
      ready_for_process   : [ false, [] ],
      note                : [ '', [] ],
      report_type         : [ 'file', [] ],
    })
    this.user_token = cookie.get('jwtToken');
  }

  ngOnInit() {
  }

  getAllDoctorData() {
    var data = {
      "source": "doctors_by_tech_id",
      "condition": {
        "tech_id_object": this.cookies_id
      },
      "token": this.user_token
    }

    this.httpService.httpViaPost('datalist', data).subscribe(response => {
      let result: any = {};
      result = response.res;
      this.allDoctorDataArray = result;
    });
  }

  cancelButton() {
    this.router.navigateByUrl('/tech/dashboard');
  }

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  /* This one is for get doctor dropdown data */

  getsellabel(index: number) {
    this.doctorDetails.name = this.allDoctorDataArray[index].firstname + ' ' + this.allDoctorDataArray[index].lastname;
    this.doctorDetails.email = this.allDoctorDataArray[index].email;
    
    var details = '<p class="doctor_name">';
    details += this.doctorDetails.name;
    details += '<p class="doctor_name"> <span> Email: </span>';
    details += this.allDoctorDataArray[index].email;
    details += '</p><p class="doctor_name"> <span>NPI: </span>';
    details += this.allDoctorDataArray[index].npi;
    details += '</p>';

    this.techBulkUploadForm.patchValue({
      doctor_id: this.allDoctorDataArray[index]._id,
      doctor_name: this.doctorDetails.name,
      doctor_email: this.doctorDetails.email,
      doctor_details: details
    });
  }

  techBulkUploadFormSubmit() {
    this.configData.formSubmit = true;
    if (!this.configData.files) {
      return false;
    } else {
      this.bulkUploaddataSubmit();
    }


    /* Open modal */
    // let modalData: any = {
    //   panelClass: 'bulkupload-dialog',
    //   data: {
    //     header: "Message",
    //     message: "Are you sure you want to upload these reports for physician : " + this.doctorDetails.name + " ?",
    //     button1: { text: "No" },
    //     button2: { text: "Yes" },
    //   }
    // }

    // this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    // this.dialogRef.afterClosed().subscribe(result => {
    //   switch (result) {
    //     case "No":
    //       break;
    //     case "Yes":
    //       this.bulkUploaddataSubmit();
    //       break;
    //   }
    // });
  }

  bulkUploaddataSubmit() {
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
      var formData: any = this.techBulkUploadForm.value;
      if(typeof(this.cookiesData.diagnostic_admin_id) != 'undefined') {
        formData["diagnostic_admin_id"] = this.cookiesData.diagnostic_admin_id;
      }

      formData.report_life_circle = [];
      formData.report_life_circle.push({
        "upload_by_tech_id" : this.cookies_id,
        "date"              : Date.now(),
        "upload_date"       : Date.now(),
        "status"            : 2,
        "upload_status"     : 2,
        "upload_status_text": "File uploaded",
        "status_text"       : "File uploaded"
      });

      var data = {
        "source": "data_pece",
        "data": formData,
        //"doctor_details": this.doctorDetails,
        "tech_details": this.cookiesData,
        "login_url": environment.siteBaseUrl + "login",
        "sourceobj": ["tech_id", "doctor_id", "diagnostic_admin_id"],
        "token": this.user_token
      };

      this.httpService.httpViaPost("upload-bulk-report", data).subscribe(response => {
        if (response.status = "success") {
          this.snakBar.open("Successfully Submitted", "OK", {
            duration: 1000
          });

          setTimeout(() => {
            this.router.navigateByUrl('/tech/patient-management/bulk-upload/report-conformation/' + response.upload_id);
          }, 2000);
        }
      });
    } else {
      let modalData: any = {
        panelClass: 'bulkupload-dialog',
        data: {
          header: "Message",
          message: "An error occord. Please try later.",
          button1: { text: "" },
          button2: { text: "Ok" },
        }
      }
  
      this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
      this.dialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case "No":
            break;
          case "Ok":
            break;
        }
      });
    }
  }

}
