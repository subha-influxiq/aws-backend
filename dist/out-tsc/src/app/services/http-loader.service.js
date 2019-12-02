import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let HttpLoaderService = class HttpLoaderService {
    constructor() {
        this.isLoading = new BehaviorSubject(false);
    }
};
HttpLoaderService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], HttpLoaderService);
export { HttpLoaderService };
//# sourceMappingURL=http-loader.service.js.map