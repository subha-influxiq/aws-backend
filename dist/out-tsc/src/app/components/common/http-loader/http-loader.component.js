import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HttpLoaderComponent = class HttpLoaderComponent {
    constructor(loaderService, activatedRoute, router) {
        this.loaderService = loaderService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        var urlArr = this.router.url.split("/");
        // if(urlArr[3] == 'bulk-upload') {
        this.loaderService.isLoading.subscribe((v) => {
            this.httpLoading = v;
        });
        // }
    }
    ngOnInit() {
    }
};
HttpLoaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-http-loader',
        templateUrl: './http-loader.component.html',
        styleUrls: ['./http-loader.component.css']
    })
], HttpLoaderComponent);
export { HttpLoaderComponent };
//# sourceMappingURL=http-loader.component.js.map