import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
let BulkUploadComponent = class BulkUploadComponent {
    constructor(fb, activeRoute, router, httpService, cookie, snakBar, dialog, commonFunction) {
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.router = router;
        this.httpService = httpService;
        this.cookie = cookie;
        this.snakBar = snakBar;
        this.dialog = dialog;
        this.commonFunction = commonFunction;
        this.configData = {
            baseUrl: "https://fileupload.influxhostserver.com/",
            endpoint: "uploads",
            size: "51200",
            format: ["pdf", "jpeg"],
            type: "patient-file",
            path: "patientFile",
            prefix: "patient-file",
            formSubmit: false
        };
        this.images_array = [];
        this.cookiesData = {};
        this.allDoctorDataArray = [];
        this.user_token = cookie.get('jwtToken');
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        this.cookies_id = this.cookiesData._id;
        this.getAllDoctorData();
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        this.techBulkUploadForm = this.fb.group({
            batchName: ['', [Validators.required, Validators.maxLength(40)]],
            doctor_id: ['', []],
            uploadFile: [],
            status: [1, []],
            note: ['', []],
            tech_id: [this.cookies_id, []],
            report_type: ['file', []],
        });
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
        };
        this.httpService.httpViaPost('datalist', data)
            .subscribe(response => {
            let result = {};
            result = response.res;
            this.allDoctorDataArray = result;
        });
    }
    cancelButton() {
        this.router.navigateByUrl('/tech/dashboard');
    }
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /* This one is for get doctor dropdown data */
    getsellabel(docval) {
        this.selectedDoctorName = docval.fullName;
    }
    techBulkUploadFormSubmit() {
        /* Open modal */
        let modalData = {
            panelClass: 'bulkupload-dialog',
            data: {
                header: "Message",
                message: "Are you sure you want to upload these reports for physician : " + this.selectedDoctorName + " ?",
                button1: { text: "No" },
                button2: { text: "Yes" },
            }
        };
        this.openDialog(modalData);
    }
    bulkUploaddataSubmit() {
        this.configData.formSubmit = true;
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
        }
        else {
            this.techBulkUploadForm.value.uploadFile = false;
        }
        if (this.techBulkUploadForm.valid) {
            var data = {
                "source": "patient_management",
                "data": this.techBulkUploadForm.value,
                "sourceobj": ["tech_id", "doctor_id"],
                "token": this.user_token
            };
            this.httpService.httpViaPost("addorupdatedata", data)
                .subscribe(response => {
                if (response.status = "success") {
                    let message = "Successfully Submitted";
                    let action = "OK";
                    this.snakBar.open(message, action, {
                        duration: 2000
                    });
                }
            });
        }
        else {
            alert("error occured");
        }
    }
    openDialog(data) {
        this.dialogRef = this.dialog.open(DialogBoxComponent, data);
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
};
BulkUploadComponent = tslib_1.__decorate([
    Component({
        selector: 'app-bulk-upload',
        templateUrl: './bulk-upload.component.html',
        styleUrls: ['./bulk-upload.component.css']
    })
], BulkUploadComponent);
export { BulkUploadComponent };
//# sourceMappingURL=bulk-upload.component.js.map