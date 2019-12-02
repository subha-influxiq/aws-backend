import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ManageAdminListComponent = class ManageAdminListComponent {
    constructor(activatedRoute, cookie, httpService) {
        this.activatedRoute = activatedRoute;
        this.cookie = cookie;
        this.httpService = httpService;
        this.TechDashboardAllData = [];
        this.allUserData_skip = ["confirmpassword", "accesscode", "password",
            "created_at", "_id", "id", "updated_at", "phoneno", "type", "taxo_list",
            "state", "city", "zip", "address", "fullName", "zip", "city", "state"];
        this.editUrl = "admin/admin-management/edit";
        this.allUserData_modify_header = {
            "firstname": "First Name", "lastname": "Last Name",
            "email": "E-Mail", "phone": "Phone Number", "date": "Date",
            "status": "Status", "address": "Address",
            "fullNamecopy": "Name"
        };
        this.UpdateEndpoint = "addorupdatedata";
        this.deleteEndpoint = "deletesingledata";
        this.previewModal_skip = ['_id', 'fullNamecopy'];
        this.tableName = "users";
        this.status = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
        this.SearchingEndpoint = "datalist";
        this.SearchingSourceName = "users_view_admin";
        this.search_settings = {
            selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
            textsearch: [{ label: "Search By Name", field: 'fullName' },
                { label: "Search By E-Mail", field: 'email' }],
        };
        this.user_cookie = cookie.get('jwtToken');
        this.apiUrl = httpService.baseUrl;
    }
    ngOnInit() {
        this.activatedRoute.data.forEach((data) => {
            this.TechDashboardAllData = data.adminManagementdData.res;
        });
    }
};
ManageAdminListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-manage-admin-list',
        templateUrl: './manage-admin-list.component.html',
        styleUrls: ['./manage-admin-list.component.css']
    })
], ManageAdminListComponent);
export { ManageAdminListComponent };
//# sourceMappingURL=manage-admin-list.component.js.map