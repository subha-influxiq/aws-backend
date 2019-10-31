import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';

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
    format: ["pdf"], // use all small font
    type: "patient-file",
    path: "patientFile",
    prefix: "patient-file"
  }
  public techBulkUploadForm: FormGroup;
  public user_token: any;
  public images_array: any = [];
  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService,
    public cookie: CookieService, public snakBar: MatSnackBar, public commonFunction: CommonFunction) {

      /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.techBulkUploadForm = this.fb.group({
      batchName    : ['', [Validators.required, Validators.maxLength(40)]],
      uploadFile   : [],
      status       : [''],
      note         : ['',Validators.required],
    })
    this.user_token = cookie.get('jwtToken');
  }

  ngOnInit() {
  }
  cancelButton(){
    this.router.navigateByUrl('/tech/dashboard');
  }

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  

  techBulkUploadFormSubmit() {
    console.log(this.techBulkUploadForm.value)
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
      this.techBulkUploadForm.controls['uploadFile'].patchValue(this.images_array);


    } else {
      this.techBulkUploadForm.value.uploadFile = false;
    }
    //   for(let b in this.techBulkUploadForm.controls){
    //   console.log(b,'---',this.techBulkUploadForm.controls[b].valid);
    // }
    if(this.techBulkUploadForm.valid){
      var data = {
        "source"  : "patient_management",
        "data"    : this.techBulkUploadForm.value,
        "token"   :  this.user_token
      }
      this.httpService.httpViaPost("addorupdatedata",data)
         .subscribe(response=>{
          if(response.status="success"){
            let message :any="Successfully Submitted";
            let action:any="OK";
            this.snakBar.open(message,action,{
                duration : 2000
            })
            this.router.navigateByUrl('/tech/dashboard');
          }         })
    }else{
      alert("error occured");
    }
  }

}