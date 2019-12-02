import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DoctorOfficeManagementComponent = class DoctorOfficeManagementComponent {
    constructor(activatedRoute, cookie, http, httpService) {
        this.activatedRoute = activatedRoute;
        this.cookie = cookie;
        this.http = http;
        this.httpService = httpService;
        this.doctorOfficeAllData = [];
        this.doctorOfficeAllData_skip = ["password", "_id", "type", "techId", "centerName", "techCount", "city",
            "state", "city", "zip"];
        this.editUrl = "admin/doctor-office-management/edit";
        this.doctorOfficeAllData_modify_header = {
            "centerNamecopy": "Center Name", "email": "E-Mail", "phone": "Phone", "address": "Address",
            "date": "Date Added", "status": "Status", "techName": "Tech Name", "techCount": "Tech Count"
        };
        this.previewModal_skip = ['_id', 'techId', 'centerNamecopy'];
        this.UpdateEndpoint = "addorupdatedata";
        this.deleteEndpoint = "deletesingledata";
        this.tableName = "users";
        this.status = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
        this.SearchingEndpoint = "datalist";
        this.SearchingSourceName = "users_view_doctoroffice";
        this.search_settings = {
            selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
            textsearch: [{ label: "Search By Center Name", field: 'centerName' },
                { label: "Search By E-Mail", field: 'email' }],
        };
        this.user_cookie = cookie.get('jwtToken');
        this.apiUrl = httpService.baseUrl;
    }
    ngOnInit() {
        this.activatedRoute.data.forEach((data) => {
            this.doctorOfficeAllData = data.data.res;
        });
    }
};
DoctorOfficeManagementComponent = tslib_1.__decorate([
    Component({
        selector: 'app-doctor-office-management',
        templateUrl: './doctor-office-management.component.html',
        styleUrls: ['./doctor-office-management.component.css']
    })
], DoctorOfficeManagementComponent);
export { DoctorOfficeManagementComponent };
//# sourceMappingURL=doctor-office-management.component.js.map