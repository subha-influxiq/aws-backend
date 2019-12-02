import * as tslib_1 from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material";
let AddEditDoctorOfcComponent = class AddEditDoctorOfcComponent {
    constructor(fb, activeRoute, router, httpService, datePipe, cookie, snackBar, dialog) {
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.router = router;
        this.httpService = httpService;
        this.datePipe = datePipe;
        this.cookie = cookie;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.message = "Submitted Successfully";
        this.htmlText = { header: 'Add Doctor office', nav: 'Add Doctor office', buttonText: 'Save' };
        this.date = new FormControl(new Date());
        this.serializedDate = new FormControl((new Date()).toISOString());
        this.usersData = [];
        this.allTechData = [];
        this.params_id = this.activeRoute.snapshot.params._id;
        this.allStateCityData();
        this.user_token = cookie.get('jwtToken');
        this.getAllTechData();
        if (this.params_id) {
            this.generateEditForm();
        }
        else {
            this.generateAddForm();
        }
    }
    ngOnInit() {
        if (this.params_id) {
            this.htmlText.header = 'Edit Doctors Office Record';
            this.htmlText.nav = 'Edit Doctors Office';
            this.htmlText.buttonText = 'Update';
            this.getResolveData();
        }
    }
    getResolveData() {
        this.activeRoute.data.forEach((data) => {
            this.usersData = data.data.res;
            let techDetails;
            techDetails = data.data.res;
            setTimeout(() => {
                this.getCityByName(techDetails[0].state);
            }, 500);
            this.doctorOfficeAddEditForm.controls['centerName'].patchValue(techDetails[0].centerName);
            this.doctorOfficeAddEditForm.controls['email'].patchValue(techDetails[0].email);
            this.doctorOfficeAddEditForm.controls['phone'].patchValue(techDetails[0].phone);
            this.doctorOfficeAddEditForm.controls['address'].patchValue(techDetails[0].address);
            this.doctorOfficeAddEditForm.controls['state'].patchValue(techDetails[0].state);
            this.doctorOfficeAddEditForm.controls['city'].patchValue(techDetails[0].city);
            this.doctorOfficeAddEditForm.controls['tech'].patchValue(techDetails[0].tech);
            this.doctorOfficeAddEditForm.controls['zip'].patchValue(techDetails[0].zip);
            this.doctorOfficeAddEditForm.controls['status'].patchValue(techDetails[0].status);
        });
    }
    generateAddForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.doctorOfficeAddEditForm = this.fb.group({
            centerName: ['', [Validators.required]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', []],
            state: ['', []],
            zip: ['', [Validators.required]],
            date: [dateformat, []],
            status: ['', []],
            tech: ['', []],
            type: ['doctor_office', []],
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirmpassword: [],
        }, { validators: this.matchpassword('password', 'confirmpassword') });
    }
    generateEditForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.doctorOfficeAddEditForm = this.fb.group({
            centerName: ['', [Validators.required]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', []],
            state: ['', []],
            tech: ['', []],
            zip: ['', [Validators.required]],
            date: [dateformat, []],
            status: ['', []],
            type: ['doctor_office', []],
        });
    }
    matchpassword(passwordkye, confirmpasswordkye) {
        return (group) => {
            let passwordInput = group.controls[passwordkye], confirmpasswordInput = group.controls[confirmpasswordkye];
            if (passwordInput.value !== confirmpasswordInput.value) {
                return confirmpasswordInput.setErrors({ notEquivalent: true });
            }
            else {
                return confirmpasswordInput.setErrors(null);
            }
        };
    }
    openDialog(x) {
        this.dialogRef = this.dialog.open(ChangePasswordDoctorOfficeModal, {
            data: { message: x, 'id': this.params_id }
        });
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }
    /**for validation purpose**/
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /**for validation purpose**/
    /**for getting all states & cities function start here**/
    allStateCityData() {
        this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
            this.states = response;
        });
        this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
            this.allCities = response;
            if (this.params_id) {
                this.getResolveData();
            }
        });
    }
    /**for getting all states & cities  function end here**/
    getCity(event) {
        var val = event;
        console.log(event);
        this.cities = this.allCities[val];
    }
    backToManagePage() {
        this.router.navigateByUrl("/admin/doctor-office-management");
    }
    /**getting all the technician data**/
    getAllTechData() {
        var data = {
            "source": "users",
            "condition": {
                "type": "tech"
            },
            "token": this.user_token
        };
        this.httpService.httpViaPost('datalist', data)
            .subscribe(response => {
            this.allTechData = response.res;
        });
    }
    getCityByName(stateName) {
        console.log('stateName', stateName);
        this.cities = this.allCities[stateName];
        console.log(this.cities);
    }
    doctorOfficeAddEditFormFormSubmit() {
        let x;
        for (x in this.doctorOfficeAddEditForm.controls) {
            this.doctorOfficeAddEditForm.controls[x].markAsTouched();
        }
        if (this.params_id) {
            delete this.doctorOfficeAddEditForm.value.password;
            delete this.doctorOfficeAddEditForm.value.confirmpassword;
        }
        if (this.doctorOfficeAddEditForm.valid) {
            if (this.doctorOfficeAddEditForm.value.status)
                this.doctorOfficeAddEditForm.value.status = parseInt("1");
            else
                this.doctorOfficeAddEditForm.value.status = parseInt("0");
            delete this.doctorOfficeAddEditForm.value.confirmpassword;
            var data;
            if (this.params_id) {
                data = {
                    "source": "users",
                    "data": {
                        id: this.params_id,
                        centerName: this.doctorOfficeAddEditForm.value.centerName,
                        phone: this.doctorOfficeAddEditForm.value.phone,
                        email: this.doctorOfficeAddEditForm.value.email,
                        address: this.doctorOfficeAddEditForm.value.address,
                        city: this.doctorOfficeAddEditForm.value.city,
                        state: this.doctorOfficeAddEditForm.value.state,
                        tech: this.doctorOfficeAddEditForm.value.tech,
                        zip: this.doctorOfficeAddEditForm.value.zip,
                        status: this.doctorOfficeAddEditForm.value.status,
                    },
                    "token": this.user_token
                };
            }
            else {
                data = {
                    "source": "users",
                    "data": this.doctorOfficeAddEditForm.value,
                    "domainurl": 'http://testbedpece.influxiq.com/reset-password',
                    "token": this.user_token
                };
            }
            this.httpService.httpViaPost("addorupdatedata", data)
                .subscribe(response => {
                let action = "ok";
                this.snackBar.open(this.message, action, {
                    duration: 2000,
                });
                this.formDirective.resetForm();
                this.router.navigateByUrl('/admin/doctor-office-management');
            });
        }
        else {
            alert("error");
        }
    }
};
tslib_1.__decorate([
    ViewChild(FormGroupDirective, { static: false })
], AddEditDoctorOfcComponent.prototype, "formDirective", void 0);
AddEditDoctorOfcComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-edit-doctor-ofc',
        templateUrl: './add-edit-doctor-ofc.component.html',
        styleUrls: ['./add-edit-doctor-ofc.component.css']
    })
], AddEditDoctorOfcComponent);
export { AddEditDoctorOfcComponent };
let ChangePasswordDoctorOfficeModal = class ChangePasswordDoctorOfficeModal {
    constructor(dialogRef, fb, httpService, cookie, activeRoute, data) {
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.httpService = httpService;
        this.cookie = cookie;
        this.activeRoute = activeRoute;
        this.data = data;
        this.changePwdForm = FormGroup;
        this.params_id = data.id;
        this.user_token = cookie.get('jwtToken');
        this.changePwdForm = this.fb.group({
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirmpassword: ['', []],
        }, { validators: this.matchpassword('password', 'confirmpassword') });
    }
    matchpassword(passwordkye, confirmpasswordkye) {
        return (group) => {
            let passwordInput = group.controls[passwordkye], confirmpasswordInput = group.controls[confirmpasswordkye];
            if (passwordInput.value !== confirmpasswordInput.value) {
                return confirmpasswordInput.setErrors({ notEquivalent: true });
            }
            else {
                return confirmpasswordInput.setErrors(null);
            }
        };
    }
    changePasswordFormSubmit() {
        let x;
        for (x in this.changePwdForm.controls) {
            this.changePwdForm.controls[x].markAsTouched();
        }
        if (this.changePwdForm.valid) {
            delete this.changePwdForm.value.confirmpassword;
            var data = {
                "_id": this.params_id,
                "adminflag": 1,
                "newPassword": this.changePwdForm.value.password,
            };
            this.httpService.httpViaPost('changepassword', data).subscribe(response => {
                console.log("response", response);
            });
        }
    }
};
ChangePasswordDoctorOfficeModal = tslib_1.__decorate([
    Component({
        selector: 'dialogtest',
        templateUrl: 'modal.html',
    }),
    tslib_1.__param(5, Inject(MAT_DIALOG_DATA))
], ChangePasswordDoctorOfficeModal);
export { ChangePasswordDoctorOfficeModal };
//# sourceMappingURL=add-edit-doctor-ofc.component.js.map