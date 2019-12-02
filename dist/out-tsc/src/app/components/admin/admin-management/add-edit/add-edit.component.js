import * as tslib_1 from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material";
let AddEditComponent = class AddEditComponent {
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
        this.serializedDate = new FormControl((new Date()).toISOString());
        this.htmlText = { header: 'Add New Admin', nav: 'Add Admin', buttonText: 'Save' };
        this.message = "Submitted Successfully";
        this.taxo_array = [];
        this.user_token = cookie.get('jwtToken');
        if (this.params_id) {
            this.generateEditForm();
        }
        else {
            this.generateAddForm();
        }
    }
    ngOnInit() {
        if (this.activeRoute.snapshot.params._id) {
            this.message = "Updated Successfully";
            this.htmlText.header = 'Edit Admin Record';
            this.htmlText.nav = 'Edit Admin';
            this.htmlText.buttonText = 'Update';
            this.params_id = this.activeRoute.snapshot.params._id;
            this.getSingleResolveData();
        }
    }
    generateAddForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.adminManagementAddEditForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', Validators.required],
            date: [dateformat],
            type: ['admin'],
            taxo_list: [],
            status: ['', Validators.required],
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirmpassword: [],
        }, { validator: this.machpassword('password', 'confirmpassword') });
    }
    validateEmailNotTaken(control) {
        return (control) => {
            return this.httpService.checkingDuplicateEmail(control.value).subscribe((res) => {
                if (res.data.length == 0) {
                    return { emailTaken: false };
                }
                else {
                    return { emailTaken: true };
                }
            });
        };
    }
    generateEditForm() {
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.adminManagementAddEditForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: ['', Validators.required],
            date: [dateformat],
            type: ['admin'],
            taxo_list: [],
            status: ['', Validators.required],
        });
    }
    machpassword(passwordkye, confirmpasswordkye) {
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
    /**Resolve data for edit */
    getSingleResolveData() {
        this.activeRoute.data.forEach((data) => {
            let AdminSingleData;
            AdminSingleData = data.adminsingleData.res;
            this.adminManagementAddEditForm.controls['firstname'].patchValue(AdminSingleData[0].firstname);
            this.adminManagementAddEditForm.controls['lastname'].patchValue(AdminSingleData[0].lastname);
            this.adminManagementAddEditForm.controls['email'].patchValue(AdminSingleData[0].email);
            this.adminManagementAddEditForm.controls['phone'].patchValue(AdminSingleData[0].phone);
            this.adminManagementAddEditForm.controls['status'].patchValue(AdminSingleData[0].status);
            this.adminManagementAddEditForm.controls['password'].patchValue(AdminSingleData[0].password);
        });
    }
    /**for validation purpose**/
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /**for validation purpose**/
    ResetAddEditForm() {
        this.formDirective.resetForm();
    }
    backToManagePage() {
        this.router.navigateByUrl('/admin/admin-management');
    }
    openDialog(x) {
        this.dialogRef = this.dialog.open(ChangePasswordAdminModal, {
            data: { message: x, 'id': this.params_id }
        });
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }
    AdminManagementAddFormSubmit() {
        let x;
        for (x in this.adminManagementAddEditForm.controls) {
            this.adminManagementAddEditForm.controls[x].markAsTouched();
        }
        if (this.adminManagementAddEditForm.valid) {
            if (this.adminManagementAddEditForm.value.status)
                this.adminManagementAddEditForm.value.status = parseInt("1");
            else
                this.adminManagementAddEditForm.value.status = parseInt("0");
            this.adminManagementAddEditForm.value.taxo_list = this.taxo_array;
            /**delete confirmpassword  field before submitted the form */
            delete this.adminManagementAddEditForm.value.confirmpassword;
            /**end */
            var data;
            if (this.params_id) {
                data = {
                    "source": "users",
                    "data": {
                        id: this.params_id,
                        firstname: this.adminManagementAddEditForm.value.firstname,
                        lastname: this.adminManagementAddEditForm.value.lastname,
                        phone: this.adminManagementAddEditForm.value.phone,
                        email: this.adminManagementAddEditForm.value.email,
                        date: this.adminManagementAddEditForm.value.data,
                        password: this.adminManagementAddEditForm.value.password,
                        status: this.adminManagementAddEditForm.value.status,
                    },
                    "token": this.user_token
                };
            }
            else {
                data = {
                    "source": "users",
                    "data": this.adminManagementAddEditForm.value,
                    "token": this.user_token,
                    "domainurl": 'http://testbedpece.influxiq.com/reset-password'
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
    ViewChild(FormGroupDirective, { static: false })
], AddEditComponent.prototype, "formDirective", void 0);
AddEditComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-edit',
        templateUrl: './add-edit.component.html',
        styleUrls: ['./add-edit.component.css']
    })
], AddEditComponent);
export { AddEditComponent };
let ChangePasswordAdminModal = class ChangePasswordAdminModal {
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
            password: ['', Validators.required],
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
            this.httpService.httpViaPost('changepassword', data).subscribe((response) => {
                console.log("response", response);
            });
        }
    }
};
ChangePasswordAdminModal = tslib_1.__decorate([
    Component({
        selector: 'dialogtest',
        templateUrl: 'modal.html',
    }),
    tslib_1.__param(5, Inject(MAT_DIALOG_DATA))
], ChangePasswordAdminModal);
export { ChangePasswordAdminModal };
//# sourceMappingURL=add-edit.component.js.map