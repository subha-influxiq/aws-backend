import * as tslib_1 from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
let AddEditPatientComponent = class AddEditPatientComponent {
    constructor(fb, activeRoute, router, httpService, datePipe, cookie, snakBar, dialog, commonFunction) {
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.router = router;
        this.httpService = httpService;
        this.datePipe = datePipe;
        this.cookie = cookie;
        this.snakBar = snakBar;
        this.dialog = dialog;
        this.commonFunction = commonFunction;
        this.htmlText = { nav: 'Add Patient', header: "Add Report Manually" };
        this.buttonText = "Submit";
        this.date = new FormControl(new Date());
        this.cookiesData = {};
        this.allDoctorDataArray = [];
        this.allTechArray = [];
        this.user_token = cookie.get('jwtToken');
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        this.cookies_id = this.cookiesData._id;
        this.cookies_name = this.cookiesData.firstname;
        this.cookies_lastname = this.cookiesData.lastname;
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        // this.user_token = cookie.get('jwtToken');
        this.getAllDoctorData();
        // this.getAllTechData();
        this.patientAddEditForm = this.fb.group({
            patientName: ['', [Validators.required, Validators.maxLength(30)]],
            gender: ['', [Validators.required]],
            birthDate: ['', [Validators.required]],
            doctor_id: ['', []],
            tech_id: ['', []],
            testDate: ['', [Validators.required]],
            date: ['', [Validators.required]],
            testCompletedDate: ['', [Validators.required]],
            PTGPT: ['', [Validators.required]],
            PTGVLFI: ['', [Validators.required]],
            IR: ['', [Validators.required]],
            ESRNO: ['', [Validators.required]],
            ESRL: ['', [Validators.required]],
            peakC: ['', [Validators.required]],
            PTGtype: ['', [Validators.required]],
            PTGCVD: ['', [Validators.required]],
            stressI: ['', [Validators.required]],
            RI: ['', [Validators.required]],
            AIPTG: ['', [Validators.required]],
            CIsCI: ['', [Validators.required]],
            pNN50: ['', [Validators.required]],
            RMSSD: ['', [Validators.required]],
            SDba: ['', [Validators.required]],
            SDda: ['', [Validators.required]],
            DPRS: ['', [Validators.required]],
            ValsR: ['', [Validators.required]],
            BMI: ['', [Validators.required]],
            bloodPressure: ['', [Validators.required]],
            leaveNotes: ['', [Validators.required]],
            systolic: ['', []],
            diastolic: ['', []],
            status: [1, []],
            added_by: [this.cookies_id, []]
        });
    }
    ngOnInit() {
    }
    getAllDoctorData() {
        var data = {
            "source": "users_view_doctor_list",
            "token": this.user_token
        };
        this.httpService.httpViaPost('datalist', data)
            .subscribe(response => {
            let result = {};
            result = response.res;
            this.allDoctorDataArray = result;
            console.log("scfsfsfsfsf", this.allDoctorDataArray);
        });
    }
    getDoctorId(value) {
        this.doctorNameId = value;
        this.getAllTechData();
    }
    getAllTechData() {
        var data = {
            "source": "users_view_doctor",
            "condition": {
                "_id_object": this.doctorNameId
            },
            "token": this.user_token
        };
        this.httpService.httpViaPost('datalist', data)
            .subscribe((response) => {
            this.allTechArray = response.res;
        });
    }
    /**for validation purpose**/
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /**for validation purpose**/
    /**modal end here */
    resetAddEditForm() {
        this.formDirective.resetForm();
    }
    patientAddEditFormSubmit() {
        let x;
        for (x in this.patientAddEditForm.controls) {
            this.patientAddEditForm.controls[x].markAsTouched();
        }
        const myString = this.patientAddEditForm.controls.bloodPressure.value;
        const splits = myString.split('/');
        var startDate = this.datePipe.transform(this.startdate, "MM-dd-yyyy");
        var endDate = this.datePipe.transform(this.enddate, "MM-dd-yyyy");
        var dateOfBirth = this.datePipe.transform(this.dateofbirth, "MM-dd-yyyy");
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.patientAddEditForm.value.testDate = startDate;
        this.patientAddEditForm.value.testCompletedDate = endDate;
        this.patientAddEditForm.value.birthDate = dateOfBirth;
        this.patientAddEditForm.controls['testDate'].patchValue(startDate);
        this.patientAddEditForm.controls['testCompletedDate'].patchValue(endDate);
        this.patientAddEditForm.controls['birthDate'].patchValue(dateOfBirth);
        this.patientAddEditForm.controls['date'].patchValue(dateformat);
        this.patientAddEditForm.controls['systolic'].patchValue(splits[0]);
        this.patientAddEditForm.controls['diastolic'].patchValue(splits[1]);
        delete this.patientAddEditForm.value.bloodPressure;
        if (this.patientAddEditForm.valid) {
            var data = {
                "source": "patient_management",
                "data": this.patientAddEditForm.value,
                "sourceobj": ["physicalOrdering", "tech"],
                "token": this.user_token
            };
            this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
                if (response.status = "success") {
                    this.formDirective.resetForm();
                    /* Open modal */
                    let data = {
                        width: '250px',
                        data: {
                            header: "Success",
                            message: "Record Saved Successfully",
                            button1: { text: "Cancel" },
                            button2: { text: "Add Next" },
                        }
                    };
                    this.openDialog(data);
                }
            });
        }
    }
    openDialog(data) {
        this.dialogRef = this.dialog.open(DialogBoxComponent, data);
        this.dialogRef.afterClosed().subscribe(result => {
            switch (result) {
                case "Cancel":
                    this.router.navigateByUrl('/tech/dashboard');
                    break;
                case "Add Next":
                    this.resetAddEditForm();
                    break;
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(FormGroupDirective, { static: false })
], AddEditPatientComponent.prototype, "formDirective", void 0);
AddEditPatientComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-edit-patient',
        templateUrl: './add-edit-patient.component.html',
        styleUrls: ['./add-edit-patient.component.css']
    }),
    HostListener('window:scroll', ['$event'])
], AddEditPatientComponent);
export { AddEditPatientComponent };
//# sourceMappingURL=add-edit-patient.component.js.map