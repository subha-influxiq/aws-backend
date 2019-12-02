import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let DoctorOfficeAccountSettingsComponent = class DoctorOfficeAccountSettingsComponent {
    constructor(cookieService, formBuilder, http, router, snackBar) {
        this.cookieService = cookieService;
        this.formBuilder = formBuilder;
        this.http = http;
        this.router = router;
        this.snackBar = snackBar;
        this.message = "Updated Successfuly!!!";
        this.loader = false;
        /*Getting the user data from the cookie*/
        let allData = cookieService.getAll();
        this.jwtToken = cookieService.get('jwtToken');
        this.userData = JSON.parse(allData.user_details);
    }
    ngOnInit() {
        //generating the form
        this.generateForm();
        //setting the default value
        this.setDefaultValue(this.userData);
        //getting the citites
        this.allStateCityData();
        setTimeout(() => {
            this.getCityByName(this.userData.state);
        }, 2000);
    }
    generateForm() {
        this.accountForm = this.formBuilder.group({
            id: [this.userData._id],
            address: ['', Validators.required],
            centername: ['', Validators.required],
            state: [],
            city: ['', Validators.required],
            date: [],
            email: [{ value: 'someValue', disabled: true }],
            phone: ['', Validators.required],
            zip: ['', Validators.required]
        });
    }
    setDefaultValue(defaultValue) {
        this.accountForm.patchValue({
            address: defaultValue.address,
            centername: defaultValue.centerName,
            state: defaultValue.state,
            city: defaultValue.city,
            date: defaultValue.date,
            email: defaultValue.email,
            phone: defaultValue.phone,
            status: defaultValue.status,
            zip: defaultValue.zip
        });
    }
    onSubmit() {
        this.loader = true;
        if (this.accountForm.invalid)
            return;
        else {
            let postData = {
                'source': 'users',
                'data': Object.assign(this.accountForm.value),
                'token': this.jwtToken
            };
            this.http.httpViaPost('addorupdatedata', postData).subscribe((response) => {
                if (response.status == 'success') {
                    var userDetailsCookie = JSON.parse(this.cookieService.get('user_details'));
                    var type = userDetailsCookie.type;
                    this.cookieService.delete('user_details');
                    // -------------------------------------
                    userDetailsCookie.address = this.accountForm.value.address;
                    // -------------------------------------
                    userDetailsCookie = JSON.stringify(userDetailsCookie);
                    console.log("-->", userDetailsCookie);
                    this.loader = false;
                    let action = "Ok";
                    this.snackBar.open(this.message, action, {
                        duration: 1000,
                    });
                    setTimeout(() => {
                        // this.cookieService.set('user_details', userDetailsCookie);
                    }, 1000);
                    setTimeout(() => {
                        this.router.navigateByUrl('/doctor-office/dashboard');
                    }, 3000);
                }
                else {
                    this.snackBar.open(response.status, "OK", {
                        duration: 1500
                    });
                }
            });
        }
    }
    cancelRedirectToDashboard() {
        this.router.navigateByUrl('doctor-office/dashboard');
    }
    /**for getting all states & cities function start here**/
    allStateCityData() {
        this.http.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
            this.states = response;
        });
        this.http.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
            this.allCities = response;
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
};
DoctorOfficeAccountSettingsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-doctor-office-account-settings',
        templateUrl: './doctor-office-account-settings.component.html',
        styleUrls: ['./doctor-office-account-settings.component.css']
    })
], DoctorOfficeAccountSettingsComponent);
export { DoctorOfficeAccountSettingsComponent };
//# sourceMappingURL=doctor-office-account-settings.component.js.map