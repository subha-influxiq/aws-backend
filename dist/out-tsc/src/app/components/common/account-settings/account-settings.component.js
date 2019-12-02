import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroupDirective } from '@angular/forms';
let AccountSettingsComponent = class AccountSettingsComponent {
    constructor(fb, datePipe, httpService, cookie, router, snackBar, activeRoute, commonFunction) {
        this.fb = fb;
        this.datePipe = datePipe;
        this.httpService = httpService;
        this.cookie = cookie;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.commonFunction = commonFunction;
        this.date = new FormControl(new Date());
        this.serializedDate = new FormControl((new Date()).toISOString());
        this.message = "Updated Successfully";
        this.loader = false;
        this.headerFlag = null;
        /* Set header */
        this.headerFlag = this.activeRoute.snapshot.url[0].path;
        this.user_token = cookie.get('jwtToken');
        let allcookies;
        allcookies = cookie.getAll();
        this.cookiesData = JSON.parse(allcookies.user_details);
        console.log("souresjhgfgfd", this.cookiesData.type);
        this.cookies_id = this.cookiesData._id;
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        this.allStateCityData();
        this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
        var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
        this.AccountSettingsForm = fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phoneno: ['', Validators.required],
            address: ['', Validators.required],
            zip: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            date: [dateformat]
        });
    }
    ngOnInit() {
        this.SetValueForm();
    }
    /**for validation purpose**/
    inputUntouch(form, val) {
        form.controls[val].markAsUntouched();
    }
    /**for validation purpose**/
    SetValueForm() {
        setTimeout(() => {
            this.getCityByName(this.cookiesData.state);
        }, 400);
        this.AccountSettingsForm.controls['firstname'].patchValue(this.cookiesData.firstname);
        this.AccountSettingsForm.controls['lastname'].patchValue(this.cookiesData.lastname);
        this.AccountSettingsForm.controls['phoneno'].patchValue(this.cookiesData.phone);
        this.AccountSettingsForm.controls['zip'].patchValue(this.cookiesData.zip);
        this.AccountSettingsForm.controls['address'].patchValue(this.cookiesData.address);
        this.AccountSettingsForm.controls['state'].patchValue(this.cookiesData.state);
        this.AccountSettingsForm.controls['city'].patchValue(this.cookiesData.city);
    }
    /**for getting all states & cities function start here**/
    allStateCityData() {
        this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
            this.states = response;
            this.SetValueForm();
        });
        this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
            this.allCities = response;
            this.SetValueForm();
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
    CancelRedirectToDashboard() {
        this.router.navigateByUrl('/admin/dashboard');
    }
    AccountSettingsFormSubmit() {
        this.loader = true;
        let x;
        for (x in this.AccountSettingsForm.controls) {
            this.AccountSettingsForm.controls[x].markAsTouched();
        }
        if (this.AccountSettingsForm.valid) {
            var data;
            data = {
                "source": "users",
                "data": {
                    id: this.cookies_id,
                    firstname: this.AccountSettingsForm.value.firstname,
                    lastname: this.AccountSettingsForm.value.lastname,
                    phoneno: this.AccountSettingsForm.value.phoneno,
                    date: this.AccountSettingsForm.value.data,
                    zip: this.AccountSettingsForm.value.zip,
                    address: this.AccountSettingsForm.value.address,
                    city: this.AccountSettingsForm.value.city,
                    state: this.AccountSettingsForm.value.state,
                },
                "token": this.user_token
            };
            this.httpService.httpViaPost('addorupdatedata', data).subscribe(response => {
                var userDetailsCookie = JSON.parse(this.cookie.get('user_details'));
                var type = userDetailsCookie.type;
                this.cookie.delete('user_details');
                userDetailsCookie.firstname = this.AccountSettingsForm.value.firstname;
                userDetailsCookie.lastname = this.AccountSettingsForm.value.lastname;
                userDetailsCookie = JSON.stringify(userDetailsCookie);
                this.loader = false;
                let action = "Ok";
                this.snackBar.open(this.message, action, {
                    duration: 1000,
                });
                setTimeout(() => {
                    this.cookie.set('user_details', userDetailsCookie);
                }, 1000);
                setTimeout(() => {
                    this.router.navigateByUrl(type + '/dashboard');
                }, 3000);
            });
        }
    }
};
tslib_1.__decorate([
    ViewChild(FormGroupDirective, { static: false })
], AccountSettingsComponent.prototype, "formDirective", void 0);
AccountSettingsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-account-settings',
        templateUrl: './account-settings.component.html',
        styleUrls: ['./account-settings.component.css']
    })
], AccountSettingsComponent);
export { AccountSettingsComponent };
//# sourceMappingURL=account-settings.component.js.map