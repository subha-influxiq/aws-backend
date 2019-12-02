import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let UploadDialogBoxComponent = class UploadDialogBoxComponent {
    constructor(dialog, fb, cookie, http, snackBar, router) {
        this.dialog = dialog;
        this.fb = fb;
        this.cookie = cookie;
        this.http = http;
        this.snackBar = snackBar;
        this.router = router;
        this.sign = '';
        this.signatureArray = [];
        this.configData = {
            baseUrl: "http://3.15.236.141:5005/",
            endpoint: "uploads",
            size: "51200",
            format: ["jpg", "jpeg", "png", "bmp", "zip", 'html'],
            type: "signature-file",
            path: "signature-file",
            prefix: "signature-file"
        };
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        this.cookies_id = this.cookiesData._id;
        console.log(this.cookiesData);
        console.log(this.cookies_id);
        this.user_token = cookie.get('jwtToken');
        this.getSignatureData();
        this.techUploadForm = this.fb.group({
            sign: ['', Validators.required],
            user_id: ['']
        });
    }
    ngOnInit() {
    }
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    cancelButtonFunction() {
        this.router.navigateByUrl('/doctor/dashboard');
    }
    getSignatureData() {
        var data = {
            "source": "doctor_signature",
            "condition": {
                "user_id_object": this.cookies_id
            },
            "token": this.user_token
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.result = response.res[0]._id;
            this.techUploadForm.controls['sign'].patchValue(response.res[0].sign);
        });
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
        let x;
        for (x in this.techUploadForm.controls) {
            this.techUploadForm.controls[x].markAsTouched();
        }
        this.techUploadForm.controls['user_id'].patchValue(this.cookies_id);
        if (this.techUploadForm.valid) {
            var data;
            if (this.result) {
                data = {
                    "source": "doctor_signature",
                    "sourceobj": ["user_id"],
                    "data": {
                        id: this.result,
                        sign: this.techUploadForm.value.sign,
                        user_id: this.techUploadForm.value.user_id,
                    },
                    "token": this.user_token
                };
            }
            else {
                data = {
                    "source": "doctor_signature",
                    "data": this.techUploadForm.value,
                    "sourceobj": ["user_id"],
                    "token": this.user_token
                };
            }
            this.http.httpViaPost("addorupdatedata", data)
                .subscribe(response => {
                if (response.status = "success") {
                    setTimeout(() => {
                    }, 1000);
                }
                else {
                    alert("Error Occured");
                }
            });
        }
    }
};
UploadDialogBoxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-upload-dialog-box',
        templateUrl: './upload-dialog-box.component.html',
        styleUrls: ['./upload-dialog-box.component.css']
    })
], UploadDialogBoxComponent);
export { UploadDialogBoxComponent };
//# sourceMappingURL=upload-dialog-box.component.js.map