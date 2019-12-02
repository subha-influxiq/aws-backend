import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ResolveService = class ResolveService {
    constructor(cookies, _apiService, router) {
        this.cookies = cookies;
        this._apiService = _apiService;
        this.router = router;
    }
    resolve(route, state) {
        /* will come into play while editing otherwise no effect */
        var requestData = route.data.requestcondition;
        ////////////////// Condition for all dashboard ////////////////////
        /* This one is for Tech Dashboard Start */
        if (route.url[0].path == 'tech') {
            switch (route.url[1].path) {
                case 'dashboard':
                    var allData = this.cookies.getAll();
                    var userData = JSON.parse(allData.user_details);
                    requestData.condition['tech_id_object'] = userData._id;
                    break;
            }
        }
        /* This one is for Tech Dashboard End */
        /* This one is for Doctor Dashboard Start */
        if (route.url[0].path == 'doctor') {
            switch (route.url[1].path) {
                case 'dashboard':
                    var allData = this.cookies.getAll();
                    var userData = JSON.parse(allData.user_details);
                    requestData.condition.condition['doctor_id'] = userData._id;
                    break;
            }
        }
        /* This one is for Doctor Dashboard End */
        /* This one is for Biller Dashboard Start */
        if (route.url[0].path == 'biller') {
            switch (route.url[1].path) {
                case 'dashboard':
                    var allData = this.cookies.getAll();
                    var userData = JSON.parse(allData.user_details);
                    requestData.condition.condition['biller_id'] = userData._id;
                    break;
            }
        }
        /* This one is for Biller Dashboard End */
        /////////////////////////////////////////////////////////////////////
        /* If send any query params */
        requestData.condition = Object.assign(requestData.condition, route.params);
        return new Promise((resolve) => {
            if (typeof route.data.requestcondition.source != 'string') {
                var returnData = {};
                for (let i = 0; i <= route.data.requestcondition.source.length - 1; i++) {
                    let data = {
                        source: route.data.requestcondition.source[i],
                        condition: {}
                    };
                    this._apiService.ResolveViaPost(data, route.data.endpoint).subscribe(api_object => {
                        if (api_object) {
                            returnData[route.data.requestcondition.source[i]] = api_object;
                        }
                        else { // id not found
                            return true;
                        }
                    });
                }
                setTimeout(() => {
                    return resolve(returnData);
                }, 3000);
            }
            else {
                this._apiService.ResolveViaPost(route.data.requestcondition, route.data.endpoint).subscribe(api_object => {
                    if (api_object) {
                        return resolve(api_object);
                    }
                    else { // id not found
                        return true;
                    }
                });
            }
        });
    }
};
ResolveService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ResolveService);
export { ResolveService };
//# sourceMappingURL=resolve.service.js.map