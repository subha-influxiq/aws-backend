import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthguardService = class AuthguardService {
    constructor(cookie, _router) {
        this.cookie = cookie;
        this._router = _router;
    }
    canActivate(next, state) {
        var getToken = this.cookie.get('jwtToken');
        if (getToken) {
            var allData = this.cookie.getAll();
            var userData = JSON.parse(allData.user_details);
            /* Login User */
            switch (next.url[0].path) {
                case 'login':
                case 'forget-password':
                    this._router.navigate([userData.type.replace("_", "-") + '/dashboard']);
                    break;
                default:
                    if (userData.type == 'doctor_office' && next.url[0].path == 'doctor-office') {
                        return true;
                    }
                    else {
                        if (next.url[0].path == userData.type) {
                            return true;
                        }
                        else {
                            this._router.navigate([userData.type.replace("_", "-") + '/dashboard']);
                        }
                    }
                    break;
            }
        }
        else {
            /* Login User */
            switch (next.url[0].path) {
                case 'login':
                case 'forget-password':
                    return true;
                    break;
                default:
                    this._router.navigate(['/login']);
                    break;
            }
        }
    }
};
AuthguardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthguardService);
export { AuthguardService };
//# sourceMappingURL=authguard.service.js.map