import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
let SystemSuperbillComponent = class SystemSuperbillComponent {
    // @HostListener('window:scroll', ['$event'])
    // checkScroll() {
    //   this.isSticky = window.pageYOffset >= 50;
    // }
    constructor(activatedRoute, httpService, cookie, fb, router, datePipe) {
        this.activatedRoute = activatedRoute;
        this.httpService = httpService;
        this.cookie = cookie;
        this.fb = fb;
        this.router = router;
        this.datePipe = datePipe;
        this.patientSingleData = [];
        this.date = new FormControl(new Date());
        this.cookiesData = {};
        this.allDoctorDataArray = [];
        this.allPatientReportData = [];
        // sticky section
        this.isSticky = false;
        this.stickyRight = false;
        console.log('route:: ', this.activatedRoute.snapshot.params._id);
        this.userToken = cookie.get('jwtToken');
        var dateformat = datePipe.transform(new Date(), "MM-dd-yyyy");
        console.log("date format", dateformat);
        this.patientBMIForm = this.fb.group({
            patientName: ['', [Validators.required, Validators.maxLength(30)]],
            gender: ['', Validators.required],
            birthDate: ['', Validators.required],
            physicalOrdering: [''],
            testDate: ['', Validators.required],
            testCompletedDate: ['', Validators.required],
            signDate: [dateformat]
        });
        this.getPatientData(this.activatedRoute.snapshot.params._id);
    }
    ngOnInit() {
    }
    /**for validation purpose**/
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /**for validation purpose**/
    getPatientData(id) {
        var data = {
            "source": "patient_management_view_BMI",
            "condition": {
                "_id_object": id
            },
            "token": this.userToken
        };
        this.httpService.httpViaPost('datalist', data).subscribe((response) => {
            this.patientSingleData = response.res;
            this.patientBMIForm.controls['patientName'].patchValue(response.res[0].patientName);
            this.patientBMIForm.controls['physicalOrdering'].patchValue(response.res[0].physicalOrdering);
            this.patientBMIForm.controls['gender'].patchValue(response.res[0].gender);
            let dateOfBirth = response.res[0].birthDate;
            let dobArr = dateOfBirth.split("-");
            this.patientBMIForm.controls['birthDate'].patchValue(moment([dobArr[2], dobArr[1] - 1, dobArr[0]]));
            let sDateArr = response.res[0].testDate.split("-");
            this.patientBMIForm.controls['testDate'].patchValue(moment([sDateArr[2], sDateArr[1] - 1, sDateArr[0]]));
            //   let eDateArr: any = patientDetails.testCompletedDate.split("-");
            // this.patientReportViewForm.controls['testCompletedDate'].patchValue(moment([eDateArr[2], eDateArr[1] - 1, eDateArr[0]]));
        });
    }
};
SystemSuperbillComponent = tslib_1.__decorate([
    Component({
        selector: 'app-system-superbill',
        templateUrl: './system-superbill.component.html',
        styleUrls: ['./system-superbill.component.css'],
        providers: [
            // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
            // `MatMomentDateModule` in your applications root module. We provide it at the component level
            // here, due to limitations of our example generation script.
            { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
            { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        ],
    })
], SystemSuperbillComponent);
export { SystemSuperbillComponent };
//# sourceMappingURL=system-superbill.component.js.map