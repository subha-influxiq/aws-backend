import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let TechHeaderComponent = class TechHeaderComponent {
    constructor(cookies, router) {
        this.cookies = cookies;
        this.router = router;
        this.user_data = {};
        this.loader = true;
        let allData = {};
        allData = cookies.getAll();
        this.user_data = JSON.parse(allData.user_details);
        this.user_cookie = cookies.get('jwtToken');
    }
    ngOnInit() {
    }
    /**logout function start here**/
    logout() {
        this.cookies.delete('jwtToken');
        this.cookies.delete('user_details');
        this.cookies.deleteAll();
        this.router.navigateByUrl('logout');
    }
};
TechHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tech-header',
        templateUrl: './tech-header.component.html',
        styleUrls: ['./tech-header.component.css']
    })
], TechHeaderComponent);
export { TechHeaderComponent };
//# sourceMappingURL=tech-header.component.js.map