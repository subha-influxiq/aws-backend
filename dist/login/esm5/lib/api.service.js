/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// for setting observables to get serverurl and endpointurl from app
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-cookie-service";
var ApiService = /** @class */ (function () {
    function ApiService(_http, _authHttp, cookieService) {
        var _this = this;
        this._http = _http;
        this._authHttp = _authHttp;
        this.cookieService = cookieService;
        this.progress = [];
        this.uploaderror = '';
        this.accesstoken = this.cookieService.get('jwtToken');
        // public accesstoken:any='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjgzNTgyMTAsImlhdCI6MTU2ODI3MTgxMH0.2ltvxVKwfX1uwMOwQ2Zzgp1K2jiaCDj051Wyho0Iw-Q';
        this.fileservername = [];
        this.subjectForServerUrl = new Subject();
        this.subjectForaddEndpointUrl = new Subject();
        this.subjectForuploadEndpointUrl = new Subject(); //added by souresh
        //added by souresh
        this.subjectForupdateEndpointUrl = new Subject();
        this.subjectFordeletesingleEndpointUrl = new Subject();
        this.subjectForupdatestatusSingleEndpointUrl = new Subject();
        this.subjectForGetdataEndpointUrl = new Subject();
        this.subscriptionServer = this.getServerUrl().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var result;
            result = message;
            if (result != null) {
                _this.serverUrl = result;
            }
            else {
                _this.serverUrl = null;
            }
        }));
        this.subscriptionaddEndpoint = this.getaddEndpoint().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var result;
            result = message;
            if (result != null) {
                _this.addendpointUrl = result;
            }
            else {
                _this.addendpointUrl = null;
            }
        }));
        /*********added by souresh***********/
        this.subscriptionuploadEndpoint = this.getuploadEndpoint().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var result;
            result = message;
            if (result != null) {
                _this.uploadEndpointUrl = result;
            }
            else {
                _this.uploadEndpointUrl = null;
            }
        }));
        /************souresh end here**************/
        this.subscriptionupdateEndpoint = this.getupdateEndpoint().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var result;
            result = message;
            if (result != null) {
                _this.updateendpointUrl = result;
            }
            else {
                _this.updateendpointUrl = null;
            }
        }));
        this.subscriptiondeletesingleEndpoint = this.getdeletesingleEndpoint().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var result;
            result = message;
            if (result != null) {
                _this.deletesingle_endpointUrl = result;
            }
            else {
                _this.deletesingle_endpointUrl = null;
            }
        }));
        this.subscriptionupdatestatusSingleEndpoint = this.getupdatestatus_singleEndpoint().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var result;
            result = message;
            if (result != null) {
                _this.updatestatus_single_endpointUrl = result;
            }
            else {
                _this.updatestatus_single_endpointUrl = null;
            }
        }));
        this.subscriptionGetdataEndpoint = this.getdataEndpoint().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var result;
            result = message;
            if (result != null) {
                _this.getdata_endpointUrl = result;
            }
            else {
                _this.getdata_endpointUrl = null;
            }
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ApiService.prototype.setServerUrl = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.subjectForServerUrl.next(value);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.clearServerUrl = /**
     * @return {?}
     */
    function () {
        this.subjectForServerUrl.next(null);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getServerUrl = /**
     * @return {?}
     */
    function () {
        return this.subjectForServerUrl.asObservable();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApiService.prototype.setaddEndpoint = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.subjectForaddEndpointUrl.next(value);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.clearaddEndpoint = /**
     * @return {?}
     */
    function () {
        this.subjectForaddEndpointUrl.next(null);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getaddEndpoint = /**
     * @return {?}
     */
    function () {
        return this.subjectForaddEndpointUrl.asObservable();
    };
    /*****added by souresh******/
    /**
     * **added by souresh*****
     * @param {?} value
     * @return {?}
     */
    ApiService.prototype.setuploadEndpont = /**
     * **added by souresh*****
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.subjectForuploadEndpointUrl.next(value);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.clearuploadEndpoint = /**
     * @return {?}
     */
    function () {
        this.subjectForuploadEndpointUrl.next(null);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getuploadEndpoint = /**
     * @return {?}
     */
    function () {
        return this.subjectForuploadEndpointUrl.asObservable();
    };
    /********souresh end here********/
    /**
     * *****souresh end here*******
     * @param {?} value
     * @return {?}
     */
    ApiService.prototype.setupdateEndpoint = /**
     * *****souresh end here*******
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.subjectForupdateEndpointUrl.next(value);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.clearupdateEndpoint = /**
     * @return {?}
     */
    function () {
        this.subjectForupdateEndpointUrl.next(null);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getupdateEndpoint = /**
     * @return {?}
     */
    function () {
        return this.subjectForupdateEndpointUrl.asObservable();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApiService.prototype.setdeletesingleEndpoint = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.subjectFordeletesingleEndpointUrl.next(value);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.cleardeletesingleEndpoint = /**
     * @return {?}
     */
    function () {
        this.subjectFordeletesingleEndpointUrl.next(null);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getdeletesingleEndpoint = /**
     * @return {?}
     */
    function () {
        return this.subjectFordeletesingleEndpointUrl.asObservable();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApiService.prototype.setupdatestatus_singleEndpoint = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.subjectForupdatestatusSingleEndpointUrl.next(value);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.clearupdatestatus_singleEndpoint = /**
     * @return {?}
     */
    function () {
        this.subjectForupdatestatusSingleEndpointUrl.next(null);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getupdatestatus_singleEndpoint = /**
     * @return {?}
     */
    function () {
        return this.subjectForupdatestatusSingleEndpointUrl.asObservable();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApiService.prototype.setgetdataEndpoint = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.subjectForGetdataEndpointUrl.next(value);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.cleargetdataEndpoint = /**
     * @return {?}
     */
    function () {
        this.subjectForGetdataEndpointUrl.next(null);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getdataEndpoint = /**
     * @return {?}
     */
    function () {
        return this.subjectForGetdataEndpointUrl.asObservable();
    };
    /**
     * @return {?}
     */
    ApiService.prototype.isTokenExpired = /**
     * @return {?}
     */
    function () {
        // const helper = new JwtHelperService();
        // const decodedToken = helper.decodeToken(localStorage.getItem('id_token'));
        // var isIdTokenExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
        // console.log('refresh_token',localStorage.getItem('refresh_token'))
        // const isRefreshTokenExpired = helper.isTokenExpired(localStorage.getItem('refresh_token'));
        // console.log('id_token isExpired:',isIdTokenExpired)
        // console.log('refresh_token isExpired:',isRefreshTokenExpired)
    };
    /**
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.addData = /**
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        console.log('in adddata apiservice');
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.accesstoken //hard code written access-token(temp)
            })
        };
        // console.log('httpoptions',httpOptions,this.serverUrl,requestdata);
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /*******added by souresh************/
    /**
     * ****added by souresh***********
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.uploadFile = /**
     * ****added by souresh***********
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': this.accesstoken //hard code written access-token(temp)
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.uploadEndpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /*******souresh end here********/
    /**
     * ****souresh end here*******
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.UpdateData = /**
     * ****souresh end here*******
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': this.accesstoken //hard code written access-token(temp)
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.updateendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.getData = /**
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.accesstoken
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.getdata_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /*************** Added by himadri start here ***************/
    /**
     * ************ Added by himadri start here **************
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.addLogin = /**
     * ************ Added by himadri start here **************
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        console.log('in addLogin apiservice');
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                // 'Authorization': this.accesstoken          //hard code written access-token(temp)
            })
        };
        // console.log(this.serverUrl,requestdata);
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /*************** Added by himadri end here ***************/
    /*************** Added by himadri start here ***************/
    /*************** Added by himadri end here ***************/
    /**
     * ************ Added by himadri start here **************
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.forgetPassword = /*************** Added by himadri end here ***************/
    /**
     * ************ Added by himadri start here **************
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        console.log('in forgetPassword apiservice');
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                // 'Authorization': this.accesstoken          //hard code written access-token(temp)
            })
        };
        // console.log(this.serverUrl,requestdata);
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /*************** Added by himadri end here ***************/
    /**
     * ************ Added by himadri end here **************
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.deleteSingleData = /**
     * ************ Added by himadri end here **************
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': this.accesstoken
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.deletesingle_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.deleteMultipleData = /**
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': this.accesstoken
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.deletesingle_endpointUrl + 'many', JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.UpdateStatusForSingleData = /**
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': this.accesstoken
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} requestdata
     * @return {?}
     */
    ApiService.prototype.UpdateStatusForMultipleData = /**
     * @param {?} requestdata
     * @return {?}
     */
    function (requestdata) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': this.accesstoken
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl + 'many', JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} requestdata
     * @param {?} endpoint
     * @return {?}
     */
    ApiService.prototype.CustomRequest = /**
     * @param {?} requestdata
     * @param {?} endpoint
     * @return {?}
     */
    function (requestdata, endpoint) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': this.accesstoken
            })
        };
        /** @type {?} */
        var result = this._http.post(this.serverUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @return {?}
     */
    ApiService.prototype.jwtTokenGet = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        /** @type {?} */
        var result = this._http.get(this.serverUrl + 'gettemptoken').pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    ApiService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: HttpClient },
        { type: CookieService }
    ]; };
    /** @nocollapse */ ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient), i0.inject(i1.HttpClient), i0.inject(i2.CookieService)); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());
export { ApiService };
if (false) {
    /** @type {?} */
    ApiService.prototype.lengthis;
    /** @type {?} */
    ApiService.prototype.percentageis;
    /** @type {?} */
    ApiService.prototype.inprogress;
    /** @type {?} */
    ApiService.prototype.progress;
    /** @type {?} */
    ApiService.prototype.uploadtype;
    /** @type {?} */
    ApiService.prototype.uploaderror;
    /** @type {?} */
    ApiService.prototype.accesstoken;
    /** @type {?} */
    ApiService.prototype.fileservername;
    /** @type {?} */
    ApiService.prototype.serverUrl;
    /** @type {?} */
    ApiService.prototype.addendpointUrl;
    /** @type {?} */
    ApiService.prototype.uploadEndpointUrl;
    /** @type {?} */
    ApiService.prototype.updateendpointUrl;
    /** @type {?} */
    ApiService.prototype.deletesingle_endpointUrl;
    /** @type {?} */
    ApiService.prototype.updatestatus_single_endpointUrl;
    /** @type {?} */
    ApiService.prototype.deletemultiple_endpointUrl;
    /** @type {?} */
    ApiService.prototype.updatestatus_multiple_endpointUrl;
    /** @type {?} */
    ApiService.prototype.getdata_endpointUrl;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.subjectForServerUrl;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.subjectForaddEndpointUrl;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.subjectForuploadEndpointUrl;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.subjectForupdateEndpointUrl;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.subjectFordeletesingleEndpointUrl;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.subjectForupdatestatusSingleEndpointUrl;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.subjectForGetdataEndpointUrl;
    /** @type {?} */
    ApiService.prototype.subscriptionServer;
    /** @type {?} */
    ApiService.prototype.subscriptionaddEndpoint;
    /** @type {?} */
    ApiService.prototype.subscriptionuploadEndpoint;
    /** @type {?} */
    ApiService.prototype.subscriptionupdateEndpoint;
    /** @type {?} */
    ApiService.prototype.subscriptiondeletesingleEndpoint;
    /** @type {?} */
    ApiService.prototype.subscriptionupdatestatusSingleEndpoint;
    /** @type {?} */
    ApiService.prototype.subscriptionGetdataEndpoint;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype._http;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype._authHttp;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype.cookieService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2dpbi8iLCJzb3VyY2VzIjpbImxpYi9hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUE0QixVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBYSxHQUFHLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUUvRCxPQUFPLEVBQWMsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFNLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFHaEQ7SUFzQ0Usb0JBQW9CLEtBQWlCLEVBQzNCLFNBQXFCLEVBQVMsYUFBNEI7UUFEcEUsaUJBcUVDO1FBckVtQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQzNCLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQS9CN0QsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUVuQixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztRQUUxRCxtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQVVqQix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ3pDLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDOUMsZ0NBQTJCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQyxDQUFFLGtCQUFrQjs7UUFDckUsZ0NBQTJCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUNqRCxzQ0FBaUMsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ3ZELDRDQUF1QyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDN0QsaUNBQTRCLEdBQUcsSUFBSSxP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dUNBQXVCOztJQUN2Qiw4Q0FBOEI7O0lBQzlCLHFEQUFxQzs7SUFDckMsZ0RBQWdDOztJQUNoQyx1REFBdUM7O0lBQ3ZDLHlDQUF5Qjs7Ozs7SUFDekIseUNBQWlEOzs7OztJQUNqRCw4Q0FBc0Q7Ozs7O0lBQ3RELGlEQUF5RDs7Ozs7SUFDekQsaURBQXlEOzs7OztJQUN6RCx1REFBK0Q7Ozs7O0lBQy9ELDZEQUFxRTs7Ozs7SUFDckUsa0RBQTBEOztJQUMxRCx3Q0FBd0M7O0lBQ3hDLDZDQUE2Qzs7SUFDN0MsZ0RBQWdEOztJQUNoRCxnREFBZ0Q7O0lBQ2hELHNEQUFzRDs7SUFDdEQsNERBQTREOztJQUM1RCxpREFBaUQ7Ozs7O0lBRXJDLDJCQUF5Qjs7Ozs7SUFDbkMsK0JBQTZCOzs7OztJQUFDLG1DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBtYXAsIHRha2VXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuLy8gZm9yIHNldHRpbmcgb2JzZXJ2YWJsZXMgdG8gZ2V0IHNlcnZlcnVybCBhbmQgZW5kcG9pbnR1cmwgZnJvbSBhcHBcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0e0Nvb2tpZVNlcnZpY2V9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoeyAgIFxuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgcHVibGljIGxlbmd0aGlzO1xuICBwdWJsaWMgcGVyY2VudGFnZWlzO1xuICBwdWJsaWMgaW5wcm9ncmVzcztcbiAgcHVibGljIHByb2dyZXNzOiBhbnkgPSBbXTtcbiAgcHVibGljIHVwbG9hZHR5cGU7XG4gIHB1YmxpYyB1cGxvYWRlcnJvcjogYW55ID0gJyc7XG4gIHB1YmxpYyBhY2Nlc3N0b2tlbjphbnk9dGhpcy5jb29raWVTZXJ2aWNlLmdldCgnand0VG9rZW4nKTtcbiAgLy8gcHVibGljIGFjY2Vzc3Rva2VuOmFueT0nZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5Sm1iMjhpT2lKaVlYSWlMQ0psZUhBaU9qRTFOamd6TlRneU1UQXNJbWxoZENJNk1UVTJPREkzTVRneE1IMC4ybHR2eFZLd2ZYMXV3TU93UTJaemdwMUsyamlhQ0RqMDUxV3lobzBJdy1RJztcbiAgZmlsZXNlcnZlcm5hbWU6IGFueSA9IFtdO1xuICBzZXJ2ZXJVcmw6IGFueTtcbiAgYWRkZW5kcG9pbnRVcmw6IGFueTtcbiAgdXBsb2FkRW5kcG9pbnRVcmw6YW55OyAvL3NvdXJlc2hcbiAgdXBkYXRlZW5kcG9pbnRVcmw6IGFueTtcbiAgZGVsZXRlc2luZ2xlX2VuZHBvaW50VXJsOiBhbnk7XG4gIHVwZGF0ZXN0YXR1c19zaW5nbGVfZW5kcG9pbnRVcmw6IGFueTtcbiAgZGVsZXRlbXVsdGlwbGVfZW5kcG9pbnRVcmw6IGFueTtcbiAgdXBkYXRlc3RhdHVzX211bHRpcGxlX2VuZHBvaW50VXJsOiBhbnk7XG4gIGdldGRhdGFfZW5kcG9pbnRVcmw6IGFueTtcbiAgcHJpdmF0ZSBzdWJqZWN0Rm9yU2VydmVyVXJsID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIHN1YmplY3RGb3JhZGRFbmRwb2ludFVybCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBzdWJqZWN0Rm9ydXBsb2FkRW5kcG9pbnRVcmwgPSBuZXcgU3ViamVjdDxhbnk+KCk7ICAvL2FkZGVkIGJ5IHNvdXJlc2hcbiAgcHJpdmF0ZSBzdWJqZWN0Rm9ydXBkYXRlRW5kcG9pbnRVcmwgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgc3ViamVjdEZvcmRlbGV0ZXNpbmdsZUVuZHBvaW50VXJsID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIHN1YmplY3RGb3J1cGRhdGVzdGF0dXNTaW5nbGVFbmRwb2ludFVybCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBzdWJqZWN0Rm9yR2V0ZGF0YUVuZHBvaW50VXJsID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgc3Vic2NyaXB0aW9uU2VydmVyOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBzdWJzY3JpcHRpb25hZGRFbmRwb2ludDogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgc3Vic2NyaXB0aW9udXBsb2FkRW5kcG9pbnQ6IFN1YnNjcmlwdGlvbjsgICAvL2FkZGVkIGJ5IHNvdXJlc2hcbiAgcHVibGljIHN1YnNjcmlwdGlvbnVwZGF0ZUVuZHBvaW50OiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBzdWJzY3JpcHRpb25kZWxldGVzaW5nbGVFbmRwb2ludDogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgc3Vic2NyaXB0aW9udXBkYXRlc3RhdHVzU2luZ2xlRW5kcG9pbnQ6IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIHN1YnNjcmlwdGlvbkdldGRhdGFFbmRwb2ludDogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBfYXV0aEh0dHA6IEh0dHBDbGllbnQscHJpdmF0ZSBjb29raWVTZXJ2aWNlIDpDb29raWVTZXJ2aWNlKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25TZXJ2ZXIgPSB0aGlzLmdldFNlcnZlclVybCgpLnN1YnNjcmliZShtZXNzYWdlID0+IHtcbiAgICAgbGV0IHJlc3VsdDogYW55O1xuICAgICAgcmVzdWx0ID0gbWVzc2FnZTtcbiAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnNlcnZlclVybCA9IHJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VydmVyVXJsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbmFkZEVuZHBvaW50ID0gdGhpcy5nZXRhZGRFbmRwb2ludCgpLnN1YnNjcmliZShtZXNzYWdlID0+IHtcbiAgICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICAgIHJlc3VsdCA9IG1lc3NhZ2U7XG4gICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hZGRlbmRwb2ludFVybCA9IHJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkZW5kcG9pbnRVcmwgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8qKioqKioqKiphZGRlZCBieSBzb3VyZXNoKioqKioqKioqKiovXG4gICAgdGhpcy5zdWJzY3JpcHRpb251cGxvYWRFbmRwb2ludD10aGlzLmdldHVwbG9hZEVuZHBvaW50KCkuc3Vic2NyaWJlKG1lc3NhZ2U9PntcbiAgICAgIGxldCByZXN1bHQ6YW55O1xuICAgICAgcmVzdWx0PW1lc3NhZ2U7XG4gICAgICAgIGlmKHJlc3VsdCE9bnVsbCl7XG4gICAgICAgICAgdGhpcy51cGxvYWRFbmRwb2ludFVybCA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIHRoaXMudXBsb2FkRW5kcG9pbnRVcmwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAvKioqKioqKioqKioqc291cmVzaCBlbmQgaGVyZSoqKioqKioqKioqKioqL1xuICAgIHRoaXMuc3Vic2NyaXB0aW9udXBkYXRlRW5kcG9pbnQgPSB0aGlzLmdldHVwZGF0ZUVuZHBvaW50KCkuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xuICAgICAgbGV0IHJlc3VsdDogYW55O1xuICAgICAgcmVzdWx0ID0gbWVzc2FnZTtcbiAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZWVuZHBvaW50VXJsID0gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cGRhdGVlbmRwb2ludFVybCA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25kZWxldGVzaW5nbGVFbmRwb2ludCA9IHRoaXMuZ2V0ZGVsZXRlc2luZ2xlRW5kcG9pbnQoKS5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgICByZXN1bHQgPSBtZXNzYWdlO1xuICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlc2luZ2xlX2VuZHBvaW50VXJsID0gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWxldGVzaW5nbGVfZW5kcG9pbnRVcmwgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9udXBkYXRlc3RhdHVzU2luZ2xlRW5kcG9pbnQgPSB0aGlzLmdldHVwZGF0ZXN0YXR1c19zaW5nbGVFbmRwb2ludCgpLnN1YnNjcmliZShtZXNzYWdlID0+IHtcbiAgICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICAgIHJlc3VsdCA9IG1lc3NhZ2U7XG4gICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVzdGF0dXNfc2luZ2xlX2VuZHBvaW50VXJsID0gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cGRhdGVzdGF0dXNfc2luZ2xlX2VuZHBvaW50VXJsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbkdldGRhdGFFbmRwb2ludCA9IHRoaXMuZ2V0ZGF0YUVuZHBvaW50KCkuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xuICAgICAgbGV0IHJlc3VsdDogYW55O1xuICAgICAgcmVzdWx0ID0gbWVzc2FnZTtcbiAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdldGRhdGFfZW5kcG9pbnRVcmwgPSByZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdldGRhdGFfZW5kcG9pbnRVcmwgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgXG4gIH1cblxuICBzZXRTZXJ2ZXJVcmwodmFsdWU6IGFueSkge1xuICAgIHRoaXMuc3ViamVjdEZvclNlcnZlclVybC5uZXh0KHZhbHVlKTtcbiAgfVxuICBwdWJsaWMgY2xlYXJTZXJ2ZXJVcmwoKSB7XG4gICAgdGhpcy5zdWJqZWN0Rm9yU2VydmVyVXJsLm5leHQobnVsbCk7XG4gIH1cbiAgcHVibGljIGdldFNlcnZlclVybCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3RGb3JTZXJ2ZXJVcmwuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXRhZGRFbmRwb2ludCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5zdWJqZWN0Rm9yYWRkRW5kcG9pbnRVcmwubmV4dCh2YWx1ZSk7XG4gIH1cbiAgcHVibGljIGNsZWFyYWRkRW5kcG9pbnQoKSB7XG4gICAgdGhpcy5zdWJqZWN0Rm9yYWRkRW5kcG9pbnRVcmwubmV4dChudWxsKTtcbiAgfVxuICBwdWJsaWMgZ2V0YWRkRW5kcG9pbnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0Rm9yYWRkRW5kcG9pbnRVcmwuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbi8qKioqKmFkZGVkIGJ5IHNvdXJlc2gqKioqKiovXG4gIHNldHVwbG9hZEVuZHBvbnQodmFsdWU6YW55KXtcbiAgICB0aGlzLnN1YmplY3RGb3J1cGxvYWRFbmRwb2ludFVybC5uZXh0KHZhbHVlKTtcbiAgfVxuICBwdWJsaWMgY2xlYXJ1cGxvYWRFbmRwb2ludCgpe1xuICAgIHRoaXMuc3ViamVjdEZvcnVwbG9hZEVuZHBvaW50VXJsLm5leHQobnVsbCk7XG4gIH1cbiAgcHVibGljIGdldHVwbG9hZEVuZHBvaW50KCk6IE9ic2VydmFibGUgPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3RGb3J1cGxvYWRFbmRwb2ludFVybC5hc09ic2VydmFibGUoKTtcbiAgfVxuICAgLyoqKioqKioqc291cmVzaCBlbmQgaGVyZSoqKioqKioqL1xuXG5cbiAgc2V0dXBkYXRlRW5kcG9pbnQodmFsdWU6IGFueSkge1xuICAgIHRoaXMuc3ViamVjdEZvcnVwZGF0ZUVuZHBvaW50VXJsLm5leHQodmFsdWUpO1xuICB9XG4gIHB1YmxpYyBjbGVhcnVwZGF0ZUVuZHBvaW50KCkge1xuICAgIHRoaXMuc3ViamVjdEZvcnVwZGF0ZUVuZHBvaW50VXJsLm5leHQobnVsbCk7XG4gIH1cbiAgcHVibGljIGdldHVwZGF0ZUVuZHBvaW50KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdEZvcnVwZGF0ZUVuZHBvaW50VXJsLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2V0ZGVsZXRlc2luZ2xlRW5kcG9pbnQodmFsdWU6IGFueSkge1xuICAgIHRoaXMuc3ViamVjdEZvcmRlbGV0ZXNpbmdsZUVuZHBvaW50VXJsLm5leHQodmFsdWUpO1xuICB9XG4gIHB1YmxpYyBjbGVhcmRlbGV0ZXNpbmdsZUVuZHBvaW50KCkge1xuICAgIHRoaXMuc3ViamVjdEZvcmRlbGV0ZXNpbmdsZUVuZHBvaW50VXJsLm5leHQobnVsbCk7XG4gIH1cbiAgcHVibGljIGdldGRlbGV0ZXNpbmdsZUVuZHBvaW50KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdEZvcmRlbGV0ZXNpbmdsZUVuZHBvaW50VXJsLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2V0dXBkYXRlc3RhdHVzX3NpbmdsZUVuZHBvaW50KHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnN1YmplY3RGb3J1cGRhdGVzdGF0dXNTaW5nbGVFbmRwb2ludFVybC5uZXh0KHZhbHVlKTtcbiAgfVxuICBwdWJsaWMgY2xlYXJ1cGRhdGVzdGF0dXNfc2luZ2xlRW5kcG9pbnQoKSB7XG4gICAgdGhpcy5zdWJqZWN0Rm9ydXBkYXRlc3RhdHVzU2luZ2xlRW5kcG9pbnRVcmwubmV4dChudWxsKTtcbiAgfVxuICBwdWJsaWMgZ2V0dXBkYXRlc3RhdHVzX3NpbmdsZUVuZHBvaW50KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdEZvcnVwZGF0ZXN0YXR1c1NpbmdsZUVuZHBvaW50VXJsLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2V0Z2V0ZGF0YUVuZHBvaW50KHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnN1YmplY3RGb3JHZXRkYXRhRW5kcG9pbnRVcmwubmV4dCh2YWx1ZSk7XG4gIH1cbiAgcHVibGljIGNsZWFyZ2V0ZGF0YUVuZHBvaW50KCkge1xuICAgIHRoaXMuc3ViamVjdEZvckdldGRhdGFFbmRwb2ludFVybC5uZXh0KG51bGwpO1xuICB9XG4gIHB1YmxpYyBnZXRkYXRhRW5kcG9pbnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0Rm9yR2V0ZGF0YUVuZHBvaW50VXJsLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cblxuXG4gIGlzVG9rZW5FeHBpcmVkKCkge1xuXG4gICAgLy8gY29uc3QgaGVscGVyID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcbiAgICAvLyBjb25zdCBkZWNvZGVkVG9rZW4gPSBoZWxwZXIuZGVjb2RlVG9rZW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJykpO1xuICAgIC8vIHZhciBpc0lkVG9rZW5FeHBpcmVkID0gaGVscGVyLmlzVG9rZW5FeHBpcmVkKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpKTtcbiAgICAvLyBjb25zb2xlLmxvZygncmVmcmVzaF90b2tlbicsbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlZnJlc2hfdG9rZW4nKSlcbiAgICAvLyBjb25zdCBpc1JlZnJlc2hUb2tlbkV4cGlyZWQgPSBoZWxwZXIuaXNUb2tlbkV4cGlyZWQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlZnJlc2hfdG9rZW4nKSk7XG4gICAgLy8gY29uc29sZS5sb2coJ2lkX3Rva2VuIGlzRXhwaXJlZDonLGlzSWRUb2tlbkV4cGlyZWQpXG4gICAgLy8gY29uc29sZS5sb2coJ3JlZnJlc2hfdG9rZW4gaXNFeHBpcmVkOicsaXNSZWZyZXNoVG9rZW5FeHBpcmVkKVxuICB9XG5cbiAgYWRkRGF0YShyZXF1ZXN0ZGF0YTogYW55KSB7XG4gICAgY29uc29sZS5sb2coJ2luIGFkZGRhdGEgYXBpc2VydmljZScpO1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiB0aGlzLmFjY2Vzc3Rva2VuICAgICAgICAgIC8vaGFyZCBjb2RlIHdyaXR0ZW4gYWNjZXNzLXRva2VuKHRlbXApXG4gICAgICB9KVxuICAgIH07XG5cbiAgICAvLyBjb25zb2xlLmxvZygnaHR0cG9wdGlvbnMnLGh0dHBPcHRpb25zLHRoaXMuc2VydmVyVXJsLHJlcXVlc3RkYXRhKTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wb3N0KHRoaXMuc2VydmVyVXJsICsgdGhpcy5hZGRlbmRwb2ludFVybCwgSlNPTi5zdHJpbmdpZnkocmVxdWVzdGRhdGEpLCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqKioqKiphZGRlZCBieSBzb3VyZXNoKioqKioqKioqKioqL1xuICB1cGxvYWRGaWxlKHJlcXVlc3RkYXRhOmFueSl7XG4gICAgY29uc3QgaHR0cE9wdGlvbnM9e1xuICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnYWNjZXNzLXRva2VuJzp0aGlzLmFjY2Vzc3Rva2VuICAgICAgICAgIC8vaGFyZCBjb2RlIHdyaXR0ZW4gYWNjZXNzLXRva2VuKHRlbXApXG4gICAgICAgIH0pXG4gICAgfTtcbiAgICB2YXIgcmVzdWx0PXRoaXMuX2h0dHAucG9zdCh0aGlzLnNlcnZlclVybCArIHRoaXMudXBsb2FkRW5kcG9pbnRVcmwsSlNPTi5zdHJpbmdpZnkocmVxdWVzdGRhdGEpLGh0dHBPcHRpb25zKS5waXBlKG1hcChyZXM9PnJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqKioqKipzb3VyZXNoIGVuZCBoZXJlKioqKioqKiovXG4gIFVwZGF0ZURhdGEocmVxdWVzdGRhdGE6IGFueSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2FjY2Vzcy10b2tlbic6IHRoaXMuYWNjZXNzdG9rZW4gICAgICAgICAgLy9oYXJkIGNvZGUgd3JpdHRlbiBhY2Nlc3MtdG9rZW4odGVtcClcbiAgICAgIH0pXG4gICAgfTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wb3N0KHRoaXMuc2VydmVyVXJsICsgdGhpcy51cGRhdGVlbmRwb2ludFVybCwgSlNPTi5zdHJpbmdpZnkocmVxdWVzdGRhdGEpLCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXREYXRhKHJlcXVlc3RkYXRhOiBhbnkpIHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogdGhpcy5hY2Nlc3N0b2tlblxuICAgICAgfSlcbiAgICB9O1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QodGhpcy5zZXJ2ZXJVcmwgKyB0aGlzLmdldGRhdGFfZW5kcG9pbnRVcmwsIEpTT04uc3RyaW5naWZ5KHJlcXVlc3RkYXRhKSwgaHR0cE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4vKioqKioqKioqKioqKioqIEFkZGVkIGJ5IGhpbWFkcmkgc3RhcnQgaGVyZSAqKioqKioqKioqKioqKiovIFxuICBhZGRMb2dpbihyZXF1ZXN0ZGF0YTogYW55KSB7XG4gICAgY29uc29sZS5sb2coJ2luIGFkZExvZ2luIGFwaXNlcnZpY2UnKTtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgLy8gJ0F1dGhvcml6YXRpb24nOiB0aGlzLmFjY2Vzc3Rva2VuICAgICAgICAgIC8vaGFyZCBjb2RlIHdyaXR0ZW4gYWNjZXNzLXRva2VuKHRlbXApXG4gICAgICB9KVxuICAgIH07XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVybCxyZXF1ZXN0ZGF0YSk7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2h0dHAucG9zdCh0aGlzLnNlcnZlclVybCArIHRoaXMuYWRkZW5kcG9pbnRVcmwsIEpTT04uc3RyaW5naWZ5KHJlcXVlc3RkYXRhKSwgaHR0cE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8qKioqKioqKioqKioqKiogQWRkZWQgYnkgaGltYWRyaSBlbmQgaGVyZSAqKioqKioqKioqKioqKiovIFxuXG4vKioqKioqKioqKioqKioqIEFkZGVkIGJ5IGhpbWFkcmkgc3RhcnQgaGVyZSAqKioqKioqKioqKioqKiovIFxuZm9yZ2V0UGFzc3dvcmQocmVxdWVzdGRhdGE6IGFueSkge1xuICBjb25zb2xlLmxvZygnaW4gZm9yZ2V0UGFzc3dvcmQgYXBpc2VydmljZScpO1xuICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgLy8gJ0F1dGhvcml6YXRpb24nOiB0aGlzLmFjY2Vzc3Rva2VuICAgICAgICAgIC8vaGFyZCBjb2RlIHdyaXR0ZW4gYWNjZXNzLXRva2VuKHRlbXApXG4gICAgfSlcbiAgfTtcblxuICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcnZlclVybCxyZXF1ZXN0ZGF0YSk7XG4gIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QodGhpcy5zZXJ2ZXJVcmwgKyB0aGlzLmFkZGVuZHBvaW50VXJsLCBKU09OLnN0cmluZ2lmeShyZXF1ZXN0ZGF0YSksIGh0dHBPcHRpb25zKS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4vKioqKioqKioqKioqKioqIEFkZGVkIGJ5IGhpbWFkcmkgZW5kIGhlcmUgKioqKioqKioqKioqKioqLyBcblxuXG4gIGRlbGV0ZVNpbmdsZURhdGEocmVxdWVzdGRhdGE6IGFueSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2FjY2Vzcy10b2tlbic6IHRoaXMuYWNjZXNzdG9rZW5cbiAgICAgIH0pXG4gICAgfTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wb3N0KHRoaXMuc2VydmVyVXJsICsgdGhpcy5kZWxldGVzaW5nbGVfZW5kcG9pbnRVcmwsIEpTT04uc3RyaW5naWZ5KHJlcXVlc3RkYXRhKSwgaHR0cE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZGVsZXRlTXVsdGlwbGVEYXRhKHJlcXVlc3RkYXRhOiBhbnkpIHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdhY2Nlc3MtdG9rZW4nOiB0aGlzLmFjY2Vzc3Rva2VuXG4gICAgICB9KVxuICAgIH07XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2h0dHAucG9zdCh0aGlzLnNlcnZlclVybCArIHRoaXMuZGVsZXRlc2luZ2xlX2VuZHBvaW50VXJsKydtYW55JywgSlNPTi5zdHJpbmdpZnkocmVxdWVzdGRhdGEpLCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBVcGRhdGVTdGF0dXNGb3JTaW5nbGVEYXRhKHJlcXVlc3RkYXRhOiBhbnkpIHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdhY2Nlc3MtdG9rZW4nOiB0aGlzLmFjY2Vzc3Rva2VuXG4gICAgICB9KVxuICAgIH07XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2h0dHAucG9zdCh0aGlzLnNlcnZlclVybCArIHRoaXMudXBkYXRlc3RhdHVzX3NpbmdsZV9lbmRwb2ludFVybCwgSlNPTi5zdHJpbmdpZnkocmVxdWVzdGRhdGEpLCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBVcGRhdGVTdGF0dXNGb3JNdWx0aXBsZURhdGEocmVxdWVzdGRhdGE6IGFueSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2FjY2Vzcy10b2tlbic6IHRoaXMuYWNjZXNzdG9rZW5cbiAgICAgIH0pXG4gICAgfTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wb3N0KHRoaXMuc2VydmVyVXJsICsgdGhpcy51cGRhdGVzdGF0dXNfc2luZ2xlX2VuZHBvaW50VXJsKydtYW55JywgSlNPTi5zdHJpbmdpZnkocmVxdWVzdGRhdGEpLCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgQ3VzdG9tUmVxdWVzdChyZXF1ZXN0ZGF0YTogYW55LCBlbmRwb2ludDphbnkgKSB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYWNjZXNzLXRva2VuJzogdGhpcy5hY2Nlc3N0b2tlblxuICAgICAgfSlcbiAgICB9O1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QodGhpcy5zZXJ2ZXJVcmwgK2VuZHBvaW50LCBKU09OLnN0cmluZ2lmeShyZXF1ZXN0ZGF0YSksIGh0dHBPcHRpb25zKS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGp3dFRva2VuR2V0KCkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9KVxuICAgIH07XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2h0dHAuZ2V0KHRoaXMuc2VydmVyVXJsICsgJ2dldHRlbXB0b2tlbicpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuXG5cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl19