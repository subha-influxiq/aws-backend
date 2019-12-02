import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let CommonFunction = class CommonFunction {
    constructor(httpServiceService, meta, cookie, router, activeRoute) {
        this.httpServiceService = httpServiceService;
        this.meta = meta;
        this.cookie = cookie;
        this.router = router;
        this.activeRoute = activeRoute;
    }
    setTitleMetaTags() {
        let url = this.router.url;
        var urlArr = url.split("/");
        var title = '';
        for (let loop = 1; loop < urlArr.length; loop++) {
            urlArr[loop] = urlArr[loop].replace("-", " ");
            urlArr[loop] = this.titleCase(urlArr[loop]);
            switch (urlArr[loop]) {
                case 'Admin':
                    break;
                case 'Tech':
                    break;
                case 'Doctor':
                    break;
                case 'Doctor Office':
                    break;
                case 'List':
                    break;
                case 'Add':
                    title = title + '- Create New ';
                    break;
                case 'Bulk Upload':
                    title = title + '- Bulk Report Upload ';
                    break;
                case 'Change Password':
                    title = title + '- Change Password ';
                    break;
                case 'Edit':
                    title = title + '- Update Record ';
                    loop = urlArr.length;
                    break;
                default:
                    title += urlArr[loop] + ' ';
                    break;
            }
        }
        let getToken = this.cookie.check('jwtToken');
        if (getToken) {
            let allcookies = this.cookie.getAll();
            let userData = JSON.parse(allcookies.user_details);
            switch (urlArr[1]) {
                case 'Doctor Office':
                    title = title + '| ' + userData.centerName + ' - AWS Backend';
                    break;
                default:
                    title = title + '| ' + userData.firstname + ' ' + userData.lastname + ' - AWS Backend';
                    break;
            }
        }
        else {
            title = 'Welcome to AWS Backend | ' + title;
        }
        /* Set Meta Data */
        this.meta.setTitle(title);
        this.meta.setTag('og:description', 'Welcome to AWS Backend.');
        this.meta.setTag('og:title', 'Welcome to AWS Backend.');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', 'favicon.ico');
    }
    titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
};
CommonFunction = tslib_1.__decorate([
    Injectable()
], CommonFunction);
export { CommonFunction };
//# sourceMappingURL=common-function.js.map