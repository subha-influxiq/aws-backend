import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
let HttpServiceService = class HttpServiceService {
    constructor(http, CookieService) {
        this.http = http;
        this.CookieService = CookieService;
        this.environment = "dev";
        this.baseUrl = "https://w8lauzoyaa.execute-api.us-east-1.amazonaws.com/dev/api/";
        // this.getSiteSettingData().subscribe(responce => {
        //   this.siteSettingData = responce;
        // });
    }
    /* read site setting data */
    getSiteSettingData(url) {
        return this.http.get(url);
    }
    /* call api via post method */
    httpViaPost(endpoint, jsonData) {
        /* set common header */
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.CookieService.get('jwtToken')
            })
        };
        return this.http.post(this.baseUrl + endpoint, jsonData);
    }
    /* call api via get method */
    httpViaGet(endpoint, jsonData) {
        /* set common header */
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.CookieService.get('jwtToken')
            })
        };
        return this.http.get(this.baseUrl + endpoint, jsonData);
    }
    /* Resolve service */
    ResolveViaPost(requestdata, endpoint) {
        /* set common header */
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.CookieService.get('jwtToken')
            })
        };
        return this.http.post(this.baseUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    }
    checkingDuplicateEmail(requestdata) {
        let data = { "email": requestdata, "source": "users" };
        /* set common header */
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.CookieService.get('jwtToken')
            })
        };
        return this.http.post(this.baseUrl + 'duplicate-email-checking', JSON.stringify(data), httpOptions).pipe(map(res => res));
    }
};
HttpServiceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], HttpServiceService);
export { HttpServiceService };
//# sourceMappingURL=http-service.service.js.map