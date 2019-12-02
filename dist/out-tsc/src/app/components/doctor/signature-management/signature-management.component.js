import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UploadDialogBoxComponent } from '../../common/upload-dialog-box/upload-dialog-box.component';
let SignatureManagementComponent = class SignatureManagementComponent {
    constructor(dialog, commonFunction, cookie, http) {
        this.dialog = dialog;
        this.commonFunction = commonFunction;
        this.cookie = cookie;
        this.http = http;
        this.DoctorSignedData = [];
        this.buttonText = "Add One";
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        this.cookies_id = this.cookiesData._id;
        this.user_token = cookie.get('jwtToken');
        this.getDoctorSignedData();
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
    }
    ngOnInit() {
    }
    openDialog() {
        const dialogRef = this.dialog.open(UploadDialogBoxComponent, {
            width: '1000px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
    getDoctorSignedData() {
        var data = {
            "source": "doctor_signature",
            "condition": {
                "user_id_object": this.cookies_id
            },
            "token": this.user_token
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.DoctorSignedData = response.res;
            if (this.DoctorSignedData.length == 1) {
                this.buttonText = "Edit";
            }
        });
    }
};
SignatureManagementComponent = tslib_1.__decorate([
    Component({
        selector: 'app-signature-management',
        templateUrl: './signature-management.component.html',
        styleUrls: ['./signature-management.component.css']
    })
], SignatureManagementComponent);
export { SignatureManagementComponent };
//# sourceMappingURL=signature-management.component.js.map