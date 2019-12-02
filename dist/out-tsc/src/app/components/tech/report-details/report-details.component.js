import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ReportDetailsComponent = class ReportDetailsComponent {
    constructor(router) {
        this.router = router;
        console.log("urllllllll", router.url);
    }
    ngOnInit() {
    }
};
ReportDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-report-details',
        templateUrl: './report-details.component.html',
        styleUrls: ['./report-details.component.css']
    })
], ReportDetailsComponent);
export { ReportDetailsComponent };
//# sourceMappingURL=report-details.component.js.map