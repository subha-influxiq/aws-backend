import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
let AppComponent = class AppComponent {
    constructor(cookieService, router) {
        this.cookieService = cookieService;
        this.router = router;
        this.title = 'aws-backend';
        this.loading = false;
        this.testJsonData = { "data": "test", "others": "others test" };
        /* Universal Loader for Reslove */
        this.router.events.subscribe((event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
    /**page open at the top portion start**/
    onActivate(event) {
        window.scroll(0, 0);
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map