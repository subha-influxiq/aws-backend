import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {
  public configData: any = {
    baseUrl: "http://3.15.236.141:5005/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png", "bmp", "zip", 'html'], // use all small font
    type: "patient-file",
    path: "patientFile",
    prefix: "patient-file"
  }
  public techBulkUploadForm: FormGroup;
  public user_token: any;
  public images_array: any = [];
  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService,
    public cookie: CookieService, public snakBar: MatSnackBar) {

    this.techBulkUploadForm = this.fb.group({
      batchName: ['', [Validators.required, Validators.maxLength(40)]],
      uploadFile: ['', Validators.required]
    })
    this.user_token = cookie.get('jwtToken');
  }

  ngOnInit() {
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  techBulkUploadFormSubmit() {
    console.log(this.configData.files[0]);
    if (this.configData) {
      for (const loop in this.configData.files) {
        this.images_array =
          this.images_array.concat({
            "basepath": this.configData.files[loop].upload.data.basepath + '/'
              + this.configData.path + '/',
            "image": this.configData.files[loop].upload.data.data.fileservername,
            "name": this.configData.files[loop].name,
            "type": this.configData.files[loop].type
          });
      }
      this.techBulkUploadForm.value.uploadFile = this.images_array;

    } else {
      this.techBulkUploadForm.value.uploadFile = false;
    }
    console.log("total data",this.techBulkUploadForm.value);
    if(this.techBulkUploadForm.valid){
      var data = {
        "source"  : "patient_bulk_upload",
        "data"    : this.techBulkUploadForm.value,
        "token"   :  this.user_token
      }
      this.httpService.httpViaPost("addorupdatedata",data)
         .subscribe(response=>{
           console.log("responseeee",response);
         })
    }
  }

}
