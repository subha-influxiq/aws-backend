import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddeditDoctorComponent = class AddeditDoctorComponent {
    constructor(formBuilder, http, cookieService, dialog, router, acivatedRoute, snackBar) {
        this.formBuilder = formBuilder;
        this.http = http;
        this.cookieService = cookieService;
        this.dialog = dialog;
        this.router = router;
        this.acivatedRoute = acivatedRoute;
        this.snackBar = snackBar;
        this.message = "Submitted Successfully";
        this.checkboxArray = ['Family Practice', 'General Practitioner', 'Primary Care',
            'Cardiology', 'Neurology', 'Internal Medicine', 'Endocrinology', 'Pain Management', 'Integrated', 'Others'];
        this.successMessage = "Data Submitted Successfully!!!";
        this.taxo_array = [];
        this.htmlText = { header: 'Add New Doctor', nav: 'Add Doctor', buttonText: 'Save' };
        this.techData = [];
        this.billerData = [];
        this.techArray = [];
        this.billerArray = [];
        this.doctorOfficeData = [];
        this.myTaxonomies = [
            {
                name: "Family Practice",
                value: "Family Practice"
            },
            {
                name: "General Practitioner",
                value: "General Practitioner"
            },
            {
                name: "Primary Care",
                value: "Primary Care"
            },
            {
                name: "Cardiology",
                value: "Cardiology"
            },
            {
                name: "Neurology",
                value: "Neurology"
            },
            {
                name: "Internal Medicine",
                value: "Internal Medicine"
            },
            {
                name: "Endocrinology",
                value: "Endocrinology"
            },
            {
                name: "Pain Management",
                value: "Pain Management"
            },
            {
                name: "Integrated",
                value: "Integrated"
            },
            {
                name: "Others",
                value: "Others"
            }
        ];
        this.params_id = this.acivatedRoute.snapshot.params._id;
        if (this.params_id) {
            this.generateEditForm();
        }
        else {
            this.generateAddForm();
        }
        this.user_token = cookieService.get('jwtToken');
        this.getAllTechData();
        this.getAllBillerData();
        this.getAllDoctorOfficeData();
        this.acivatedRoute.params.subscribe(params => {
            if (params['_id'] != null) {
                this.action = "edit";
                this.condition = { id: params._id };
                this.acivatedRoute.data.subscribe(resolveData => {
                    this.defaultData = resolveData.data.res[0];
                });
            }
            else {
                this.action = "add";
            }
        });
    }
    ngOnInit() {
        this.allStateCityData();
        // this.createTaxoInputs();
        // Case 
        switch (this.action) {
            case 'add':
                /* Button text */
                break;
            case 'edit':
                /* Button text */
                this.htmlText.header = 'Edit Doctor Record';
                this.htmlText.nav = 'Edit Doctor';
                this.htmlText.buttonText = 'Update';
                this.successMessage = "One row updated";
                this.setDefaultValue(this.defaultData);
                console.log("default data", this.defaultData);
                setTimeout(() => {
                    this.getCityByName(this.defaultData.state);
                }, 2000);
                break;
        }
    }
    /*creating taxonomy inputs*/
    // createTaxoInputs()
    // {
    //   this.docManageForm = new FormGroup({
    //     taxo_list:this.createTaxonomies(this.myTaxonomies)
    //   });
    //   this.getSelectedTaxonomies();
    // }
    /*creating the taxonomies*/
    // createTaxonomies(taxo_inp){
    //    const arr = taxo_inp.map(tax=>{
    //      return new FormControl(tax.selected || false);
    //    });
    //    return new FormArray(arr);
    // }
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    // ===================================Setting the default Value========================
    setDefaultValue(defaultValue) {
        this.docManageForm.patchValue({
            firstname: defaultValue.firstname,
            lastname: defaultValue.lastname,
            email: defaultValue.email,
            password: defaultValue.password,
            confirmpassword: defaultValue.password,
            phone: defaultValue.phone,
            practicename: defaultValue.practicename,
            taxo_list: defaultValue.taxo_list,
            npm: defaultValue.npm,
            fax: defaultValue.fax,
            address: defaultValue.address,
            city: defaultValue.city,
            state: defaultValue.state,
            tech: defaultValue.tech,
            biller: defaultValue.biller,
            doctorsOfficeName: defaultValue.doctorsOfficeName,
            zip: defaultValue.zip,
            status: defaultValue.status,
            taxonomies: defaultValue.taxonomies
        });
    }
    // ======================================================================================
    // =============================Form Generator=======================
    generateAddForm() {
        this.docManageForm = this.formBuilder.group({
            // taxonomies:['', Validators.required],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)]],
            phone: ["", [Validators.required]],
            practicename: ['', [Validators.required]],
            npm: ['', [Validators.required]],
            address: ['', [Validators.required]],
            fax: ['', [Validators.required]],
            city: ['', []],
            state: ['', []],
            type: ['doctor', []],
            zip: ['', [Validators.required]],
            status: ['', []],
            tech: ['', []],
            biller: ['', []],
            doctorsOfficeName: ['', []],
            taxo_list: ['', []],
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
            confirmpassword: ['', []],
        }, {
            validators: this.matchpassword('password', 'confirmpassword')
        });
    }
    generateEditForm() {
        this.docManageForm = this.formBuilder.group({
            // taxonomies:['', Validators.required],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)]],
            phone: ["", [Validators.required]],
            practicename: ['', [Validators.required]],
            npm: ['', [Validators.required]],
            address: ['', [Validators.required]],
            fax: ['', [Validators.required]],
            city: ['', []],
            state: ['', []],
            type: ['doctor', []],
            zip: ['', [Validators.required]],
            status: ['', []],
            tech: ['', []],
            biller: ['', []],
            doctorsOfficeName: ['', []],
            taxo_list: ['', []]
        });
    }
    // ==================================================================
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
    // =========================================MODAL functions==========================================
    openDialog(x) {
        this.dialogRef = this.dialog.open(ChangePasswordDoctorModal, {
            data: { message: x, 'id': this.params_id }
        });
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }
    // =====================================================================================================
    backToManagePage() {
        this.router.navigateByUrl('admin/doctor-management');
    }
    /**for getting all states & cities function start here**/
    allStateCityData() {
        this.http.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
            this.states = response;
            if (this.params_id != null) {
                this.setDefaultValue(this.defaultData);
            }
        });
        this.http.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
            this.allCities = response;
            if (this.params_id != null) {
                this.setDefaultValue(this.defaultData);
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
    /**getting all the technician data**/
    getAllTechData() {
        var data = {
            "source": "users",
            "condition": {
                "type": "tech"
            },
            "token": this.user_token
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.techData = response.res;
        });
    }
    getAllDoctorOfficeData() {
        var data = {
            "source": "users",
            "condition": {
                "type": "doctor_office"
            },
            "token": this.user_token
        };
        this.http.httpViaPost('datalist', data)
            .subscribe(response => {
            this.doctorOfficeData = response.res;
        });
    }
    /**getting all the biller data**/
    getAllBillerData() {
        var data = {
            "source": "users",
            "condition": {
                "type": "biller"
            },
            "token": this.user_token
        };
        this.http.httpViaPost('datalist', data).subscribe(response => {
            this.billerData = response.res;
        });
    }
    // ============================Submit Function=======================
    onSubmit() {
        let x;
        for (x in this.docManageForm.controls) {
            this.docManageForm.controls[x].markAsTouched();
        }
        /* stop here if form is invalid */
        if (!this.docManageForm.valid) {
            // this.openDialog("Form is invalid");
            // setTimeout(() => {
            //   this.dialogRef.close();
            // }, 2000);
            // return;
        }
        else {
            delete this.docManageForm.value.confirmpassword;
            if (this.docManageForm.value.status) {
                this.docManageForm.value.status = parseInt("1");
            }
            else {
                this.docManageForm.value.status = parseInt("0");
                ;
            }
            /* start process to submited data */
            let postData = {
                "source": "users",
                "data": Object.assign(this.docManageForm.value, this.condition),
                "domainurl": 'http://testbedpece.influxiq.com/reset-password',
                "sourceobj": ["doctorsOfficeName"],
                "token": this.cookieService.get('jwtToken')
            };
            this.http.httpViaPost('addorupdatedata', postData).subscribe((response) => {
                if (response.status == "success") {
                    let action = "ok";
                    this.snackBar.open(this.message, action, {
                        duration: 2000,
                    });
                    // setTimeout(() => {
                    //   this.backToManagePage();
                    // }, 1000);
                }
                else {
                    alert("Some error occurred. Please try again");
                }
            }, (error) => {
                alert("Some error occurred. Please try again.");
            });
        }
    }
    // ==================================================================
    trackByFn(index) {
        return index;
    }
};
AddeditDoctorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-addedit-doctor',
        templateUrl: './addedit-doctor.component.html',
        styleUrls: ['./addedit-doctor.component.css']
    })
], AddeditDoctorComponent);
export { AddeditDoctorComponent };
// ============================================MODAL COMPONENT===========================================
// @Component({
//   selector: 'app-modal',
//   templateUrl: 'modal.html',
// })
// export class Modal {
//   constructor(
//     public dialogRef: MatDialogRef<Modal>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
// ======================================================================================================
let ChangePasswordDoctorModal = class ChangePasswordDoctorModal {
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
            this.httpService.httpViaPost('changepassword', data).subscribe(response => {
            });
        }
    }
};
ChangePasswordDoctorModal = tslib_1.__decorate([
    Component({
        selector: 'dialogtest',
        templateUrl: 'modal.html',
    }),
    tslib_1.__param(5, Inject(MAT_DIALOG_DATA))
], ChangePasswordDoctorModal);
export { ChangePasswordDoctorModal };
//# sourceMappingURL=addedit-doctor.component.js.map