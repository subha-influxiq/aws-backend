import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
let LoaderInterceptor = class LoaderInterceptor {
    constructor(loaderService) {
        this.loaderService = loaderService;
        this.requests = [];
    }
    removeRequest(req) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }
    intercept(req, next) {
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(event => {
                if (event instanceof HttpResponse) {
                    this.removeRequest(req);
                    observer.next(event);
                }
            }, err => {
                console.log('Error occord.');
                this.removeRequest(req);
                observer.error(err);
            }, () => {
                this.removeRequest(req);
                observer.complete();
            });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
};
LoaderInterceptor = tslib_1.__decorate([
    Injectable()
], LoaderInterceptor);
export { LoaderInterceptor };
//# sourceMappingURL=loader.interceptor.js.map