import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AdminHeaderComponent = class AdminHeaderComponent {
    constructor(cookies, router, commonFunction) {
        this.cookies = cookies;
        this.router = router;
        this.commonFunction = commonFunction;
        this.status = true;
        this.user_data = {};
        this.loader = true;
        // sticky section
        this.isSticky = false;
        window.scroll(0, 0);
        let allData = {};
        allData = this.cookies.getAll();
        this.user_data = JSON.parse(allData.user_details);
        this.user_cookie = cookies.get('jwtToken');
    }
    ngOnInit() {
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
    }
    /**logout function start here**/
    logout() {
        this.cookies.delete('jwtToken');
        this.cookies.delete('user_details');
        this.cookies.deleteAll();
        setTimeout(() => {
            this.router.navigateByUrl('logout');
        }, 1000);
    }
    /**logout function end here**/
    // don't remove it's for menu toggleing
    menuFunction() {
        this.status = !this.status;
    }
};
AdminHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin-header',
        templateUrl: './admin-header.component.html',
        styleUrls: ['./admin-header.component.css']
    })
], AdminHeaderComponent);
export { AdminHeaderComponent };
//# sourceMappingURL=admin-header.component.js.map