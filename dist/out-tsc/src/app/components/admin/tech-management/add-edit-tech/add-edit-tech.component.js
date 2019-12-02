import * as tslib_1 from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material";
let AddEditTechComponent = class AddEditTechComponent {
    constructor(fb, activeRoute, router, httpService, datePipe, cookie, snackBar, commonFunction, dialog) {
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.router = router;
        this.httpService = httpService;
        this.datePipe = datePipe;
        this.cookie = cookie;
        this.snackBar = snackBar;
        this.commonFunction = commonFunction;
        this.dialog = dialog;
        this.message = "Submitted Successfully";
        this.date = new FormControl(new Date());
        this.serializedDate = new FormControl((new Date()).toISOString());
        this.usersData = [];
        this.htmlText = { header: 'Add New Technician', nav: 'Add Tech', buttonText: 'Save' };
        this.taxo_array = [];
        this.headerText = "add technician";
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        this.allStateCityData();
        this.user_token = cookie.get('jwtToken');
        this.params_id = this.activeRoute.snapshot.params._id;
        if (this.params_id) {
            this.generateEditForm();
        }
        else {
            this.generateAddForm();
        }
    }
    generateAddForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.TechManagementAddEditForm = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            date: [dateformat, []],
            type: ['tech', []],
            // taxo_list : [],
            status: ['', []],
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirmpassword: ['', Validators.required],
        }, { validators: this.matchpassword('password', 'confirmpassword') });
    }
    generateEditForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.TechManagementAddEditForm = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            date: [dateformat, []],
            type: ['tech', []],
            // taxo_list : [],
            status: ['', []],
        });
    }
    ngOnInit() {
        if (this.params_id) {
            this.htmlText.header = 'Edit Technician Record';
            this.htmlText.nav = 'Edit Technician';
            this.headerText = "edit technician";
            this.htmlText.buttonText = 'Update';
            this.getResolveData();
        }
    }
    getResolveData() {
        this.activeRoute.data.forEach((data) => {
            this.usersData = data.techData.res;
            let techDetails;
            techDetails = data.techData.res;
            setTimeout(() => {
                this.getCityByName(techDetails[0].state);
            }, 400);
            this.TechManagementAddEditForm.controls['firstname'].patchValue(techDetails[0].firstname);
            this.TechManagementAddEditForm.controls['lastname'].patchValue(techDetails[0].lastname);
            this.TechManagementAddEditForm.controls['email'].patchValue(techDetails[0].email);
            this.TechManagementAddEditForm.controls['phone'].patchValue(techDetails[0].phone);
            this.TechManagementAddEditForm.controls['address'].patchValue(techDetails[0].address);
            this.TechManagementAddEditForm.controls['city'].patchValue(techDetails[0].city);
            this.TechManagementAddEditForm.controls['state'].patchValue(techDetails[0].state);
            this.TechManagementAddEditForm.controls['zip'].patchValue(techDetails[0].zip);
            this.TechManagementAddEditForm.controls['status'].patchValue(techDetails[0].status);
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
        this.dialogRef = this.dialog.open(Dialogtest, {
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
    /**resetting the form start here **/
    ResetAddForm() {
        this.formDirective.resetForm();
    }
    /**resetting the form start here **/
    /**for getting all states & cities function start here**/
    allStateCityData() {
        this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
            this.states = response;
            // this.getResolveData();
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
        this.cities = this.allCities[val];
    }
    getCityByName(stateName) {
        this.cities = this.allCities[stateName];
    }
    backToManagePage() {
        this.router.navigateByUrl("admin/tech-management");
    }
    TechManagementAddFormFormSubmit() {
        let x;
        for (x in this.TechManagementAddEditForm.controls) {
            this.TechManagementAddEditForm.controls[x].markAsTouched();
        }
        if (this.TechManagementAddEditForm.valid) {
            if (this.TechManagementAddEditForm.value.status)
                this.TechManagementAddEditForm.value.status = parseInt("1");
            else
                this.TechManagementAddEditForm.value.status = parseInt("0");
            this.TechManagementAddEditForm.value.taxo_list = this.taxo_array;
            delete this.TechManagementAddEditForm.value.confirmpassword;
            var data;
            if (this.params_id) {
                data = {
                    "source": "users",
                    "data": {
                        id: this.params_id,
                        firstname: this.TechManagementAddEditForm.value.firstname,
                        lastname: this.TechManagementAddEditForm.value.lastname,
                        phone: this.TechManagementAddEditForm.value.phone,
                        email: this.TechManagementAddEditForm.value.email,
                        address: this.TechManagementAddEditForm.value.address,
                        city: this.TechManagementAddEditForm.value.city,
                        state: this.TechManagementAddEditForm.value.state,
                        zip: this.TechManagementAddEditForm.value.zip,
                        status: this.TechManagementAddEditForm.value.status,
                    },
                    "token": this.user_token
                };
            }
            else {
                data = {
                    "source": "users",
                    "data": this.TechManagementAddEditForm.value,
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
            });
        }
        else {
        }
    }
};
tslib_1.__decorate([
    ViewChild(FormGroupDirective, { static: false })
], AddEditTechComponent.prototype, "formDirective", void 0);
AddEditTechComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-edit-tech',
        templateUrl: './add-edit-tech.component.html',
        styleUrls: ['./add-edit-tech.component.css']
    })
], AddEditTechComponent);
export { AddEditTechComponent };
/**this is only for the Change Password modal in the edit page**/
let Dialogtest = class Dialogtest {
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
Dialogtest = tslib_1.__decorate([
    Component({
        selector: 'dialogtest',
        templateUrl: 'modal.html',
    }),
    tslib_1.__param(5, Inject(MAT_DIALOG_DATA))
], Dialogtest);
export { Dialogtest };
//# sourceMappingURL=add-edit-tech.component.js.map