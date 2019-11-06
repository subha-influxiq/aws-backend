import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-dialog-box',
  templateUrl: './upload-dialog-box.component.html',
  styleUrls: ['./upload-dialog-box.component.css']
})

export class UploadDialogBoxComponent implements OnInit {

  public techUploadForm: FormGroup;
  public ErrCode: boolean;
  public user_token: any;
  public signatureArray: any = [];
  public cookies_data:any;
  public configData: any = {
    baseUrl: "http://3.15.236.141:5005/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png", "bmp", "zip", 'html'], // use all small font
    type: "signature-file",
    path: "signature-file",
    prefix: "signature-file"
  }
public cookiesData:any;
public cookies_id:any;
public result : any;
  constructor(public dialog: MatDialog, public fb: FormBuilder, public cookie: CookieService,
    public http: HttpServiceService, public snackBar: MatSnackBar) {
      let allcookies: any;
      allcookies = cookie.getAll();
      this.cookiesData = JSON.parse(allcookies.user_details);
      this.cookies_id = this.cookiesData._id;
  
      console.log(this.cookiesData);
      console.log(this.cookies_id);
    this.user_token = cookie.get('jwtToken');
    this.getSignatureData();

    this.techUploadForm = this.fb.group({
      sign: ['', Validators.required],
      user_id:['']
    })
  }

  ngOnInit() {
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  getSignatureData(){
    var data = {
      "source": "doctor_signature",
      "condition": {
        "user_id_object": this.cookies_id
      },
      "token": this.user_token
    }
    this.http.httpViaPost('datalist',data)
      .subscribe(response=>{
        this.result=response.res[0]._id;
        this.techUploadForm.controls['sign'].patchValue(response.res[0].sign);


      })
  }
  techUploadFormSubmit() {

    // if (this.configData.files) {
    //   if (this.configData.files.length > 1) {
    //     this.ErrCode = true;
    //     return;
    //   }
    //   this.techUploadForm.value.uploadfile =
    //     {
    //       "basepath": this.configData.files[0].upload.data.basepath + '/'
    //         + this.configData.path + '/',
    //       "image": this.configData.files[0].upload.data.data.fileservername,
    //       "name": this.configData.files[0].name,
    //       "type": this.configData.files[0].type
    //     };
    //   this.signatureArray = this.techUploadForm.value.uploadfile;
    //   console.log("array", this.signatureArray);

    // } else {
    //   this.techUploadForm.value.uploadfile = false;
    // }
    // this.techUploadForm.controls['uploadfile'].patchValue(this.signatureArray);
    // console.log("upload in tech dashboard", this.techUploadForm.value.uploadfile);
    let x: any;
    for (x in this.techUploadForm.controls) {
      this.techUploadForm.controls[x].markAsTouched();
    }
    this.techUploadForm.controls['user_id'].patchValue(this.cookies_id);

    if (this.techUploadForm.valid) {
      var data :any;
       if(this.result){
        data = {
          "source": "doctor_signature",
          "sourceobj": ["user_id"],
          "data": {
            id: this.result,
            sign: this.techUploadForm.value.sign,
            user_id: this.techUploadForm.value.user_id,
          },
          "token": this.user_token
        }
       }else{
         data = {
          "source": "doctor_signature",
          "data": this.techUploadForm.value,
          "sourceobj": ["user_id"],
          "token": this.user_token
        }
       }
      this.http.httpViaPost("addorupdatedata", data)
        .subscribe(response => {
          if (response.status = "success") {
            setTimeout(() => {

            }, 1000);

          } else {
            alert("Error Occured");

          }
        })
    }
  }

}

