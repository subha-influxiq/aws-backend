import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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
  public user_token:any;
  public signatureArray:any=[];
  public configData: any = {
    baseUrl: "http://3.15.236.141:5005/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png", "bmp", "zip", 'html'], // use all small font
    type: "signature-file",
    path: "signature-file",
    prefix: "signature-file"
  }
  constructor(public dialog: MatDialog,public fb  : FormBuilder,public cookie : CookieService,
    public http :HttpServiceService,public snackBar : MatSnackBar) { 
    this.user_token = cookie.get('jwtToken');
    this.techUploadForm = this.fb.group({
      uploadfile : ['',Validators.required]
    })
  }


  ngOnInit() {
  }
  techUploadFormSubmit(){
    if (this.configData.files) {
      if (this.configData.files.length > 1) {
        this.ErrCode = true;
        return;
      }
      this.techUploadForm.value.uploadfile =
        {
          "basepath": this.configData.files[0].upload.data.basepath + '/'
            + this.configData.path + '/',
          "image": this.configData.files[0].upload.data.data.fileservername,
          "name": this.configData.files[0].name,
          "type": this.configData.files[0].type
        };
        this.signatureArray=this.techUploadForm.value.uploadfile;
        console.log("array",this.signatureArray);
        
    } else {
      this.techUploadForm.value.uploadfile = false;
    }
    this.techUploadForm.controls['uploadfile'].patchValue(this.signatureArray);
    console.log("upload in tech dashboard",this.techUploadForm.value.uploadfile);
    if(this.techUploadForm.valid){
      var data = {
        "source"  : "doctor_signature",
        "data"    : this.techUploadForm.value,
        "token"   :  this.user_token
      }
      this.http.httpViaPost("addorupdatedata",data)
      .subscribe(response=>{
        if(response.status ="success"){
          setTimeout(() => {
            
          }, 1000);
        
        }else{
          alert("Error Occured");
          
        }
      })
  }
}


}
@Component({
  selector: 'upload-dialog-content',
  templateUrl: './upload-dialog-content.html',
})
export class DialogContentExampleDialog {}
