import * as tslib_1 from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material";
let AddEditBillerComponent = class AddEditBillerComponent {
    constructor(fb, datePipe, httpService, cookie, router, snackBar, activeRoute, dialog) {
        this.fb = fb;
        this.datePipe = datePipe;
        this.httpService = httpService;
        this.cookie = cookie;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.dialog = dialog;
        this.date = new FormControl(new Date());
        this.htmlText = { header: 'Add New Biller', nav: 'Add Biller', buttonText: 'Save' };
        this.message = "Submitted Successfully";
        this.serializedDate = new FormControl((new Date()).toISOString());
        this.taxo_array = [];
        this.params_id = this.activeRoute.snapshot.params._id;
        this.user_token = cookie.get('jwtToken');
        this.allStateCityData();
        if (this.params_id) {
            this.generateEditForm();
        }
        else {
            this.generateAddForm();
        }
    }
    ngOnInit() {
        if (this.params_id) {
            this.htmlText.header = 'Edit Biller Record';
            this.htmlText.nav = 'Edit Biller';
            this.htmlText.buttonText = 'Update';
            this.message = "Updated Successfully";
            this.getSingleData();
        }
    }
    generateAddForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.billerManagementAddEditForm = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', [Validators.required]],
            companyname: ['', [Validators.required]],
            address: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            city: ['', []],
            state: ['', []],
            date: [dateformat, []],
            type: ['biller', []],
            status: ['', []],
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirmpassword: ['', []],
        }, { validators: this.matchpassword('password', 'confirmpassword') });
    }
    generateEditForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.billerManagementAddEditForm = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', [Validators.required]],
            companyname: ['', [Validators.required]],
            address: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            date: [dateformat, []],
            type: ['biller', []],
            status: ['', []],
        });
    }
    getSingleData() {
        this.activeRoute.data.forEach((data) => {
            let billerDetails;
            billerDetails = data.billersingleData.res;
            setTimeout(() => {
                this.getCityByName(billerDetails[0].state);
            }, 500);
            this.billerManagementAddEditForm.controls['firstname'].patchValue(billerDetails[0].firstname);
            this.billerManagementAddEditForm.controls['lastname'].patchValue(billerDetails[0].lastname);
            this.billerManagementAddEditForm.controls['email'].patchValue(billerDetails[0].email);
            this.billerManagementAddEditForm.controls['phone'].patchValue(billerDetails[0].phone);
            this.billerManagementAddEditForm.controls['companyname'].patchValue(billerDetails[0].companyname);
            this.billerManagementAddEditForm.controls['address'].patchValue(billerDetails[0].address);
            this.billerManagementAddEditForm.controls['zip'].patchValue(billerDetails[0].zip);
            this.billerManagementAddEditForm.controls['city'].patchValue(billerDetails[0].city);
            this.billerManagementAddEditForm.controls['state'].patchValue(billerDetails[0].state);
            this.billerManagementAddEditForm.controls['status'].patchValue(billerDetails[0].status);
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
    /**for validation purpose**/
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /**for validation purpose**/
    /**for getting all states & cities function start here**/
    allStateCityData() {
        this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
            this.states = response;
            // this.getSingleData();
        });
        this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
            this.allCities = response;
            if (this.params_id) {
                this.getSingleData();
            }
        });
    }
    /**for getting all states & cities  function end here**/
    getCity(event) {
        var val = event;
        this.cities = this.allCities[val];
    }
    getCityByName(stateName) {
        console.log(stateName);
        this.cities = this.allCities[stateName];
    }
    ResetAddEditForm() {
        this.formDirective.resetForm();
    }
    backToManagePage() {
        this.router.navigateByUrl("admin/biller-management");
    }
    openDialog(x) {
        this.dialogRef = this.dialog.open(ChangePasswordModal, {
            data: { message: x, 'id': this.params_id }
        });
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }
    BillerManagementAddFormSubmit() {
        let x;
        for (x in this.billerManagementAddEditForm.controls) {
            this.billerManagementAddEditForm.controls[x].markAsTouched();
        }
        if (this.billerManagementAddEditForm.valid) {
            if (this.billerManagementAddEditForm.value.status)
                this.billerManagementAddEditForm.value.status = parseInt("1");
            else
                this.billerManagementAddEditForm.value.status = parseInt("0");
            this.billerManagementAddEditForm.value.taxo_list = this.taxo_array;
            delete this.billerManagementAddEditForm.value.confirmpassword;
            var data;
            if (this.params_id) {
                data = {
                    "data": {
                        id: this.params_id,
                        firstname: this.billerManagementAddEditForm.value.firstname,
                        lastname: this.billerManagementAddEditForm.value.lastname,
                        phone: this.billerManagementAddEditForm.value.phone,
                        email: this.billerManagementAddEditForm.value.email,
                        companyname: this.billerManagementAddEditForm.value.companyname,
                        address: this.billerManagementAddEditForm.value.address,
                        zip: this.billerManagementAddEditForm.value.zip,
                        city: this.billerManagementAddEditForm.value.city,
                        state: this.billerManagementAddEditForm.value.state,
                        date: this.billerManagementAddEditForm.value.date,
                        status: this.billerManagementAddEditForm.value.status,
                    },
                    "source": "users",
                    "token": this.user_token
                };
            }
            else {
                data = {
                    "data": this.billerManagementAddEditForm.value,
                    "source": "users",
                    "domainurl": 'http://testbedpece.influxiq.com/reset-password',
                    "token": this.user_token
                };
            }
            this.httpService.httpViaPost("addorupdatedata", data)
                .subscribe(response => {
                let action = "Ok";
                this.snackBar.open(this.message, action, {
                    duration: 2000,
                });
                this.formDirective.resetForm();
            });
        }
    }
};
tslib_1.__decorate([
    ViewChild(FormGroupDirective, { static: true })
], AddEditBillerComponent.prototype, "formDirective", void 0);
AddEditBillerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-edit-biller',
        templateUrl: './add-edit-biller.component.html',
        styleUrls: ['./add-edit-biller.component.css']
    })
], AddEditBillerComponent);
export { AddEditBillerComponent };
let ChangePasswordModal = class ChangePasswordModal {
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
            confirmpassword: [],
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
ChangePasswordModal = tslib_1.__decorate([
    Component({
        selector: 'dialogtest',
        templateUrl: 'modal.html',
    }),
    tslib_1.__param(5, Inject(MAT_DIALOG_DATA))
], ChangePasswordModal);
export { ChangePasswordModal };
//# sourceMappingURL=add-edit-biller.component.js.map