import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListingTechComponent = class ListingTechComponent {
    constructor(cookie, http, httpService, activatedRoute, commonFunction) {
        this.cookie = cookie;
        this.http = http;
        this.httpService = httpService;
        this.activatedRoute = activatedRoute;
        this.commonFunction = commonFunction;
        this.allUserData = [];
        this.allUserData_skip = ["_id", "created_at", "password", "id",
            "updated_at", "type", "phoneno", "taxo_list", "fullName", "city", "state", "zip"];
        this.editUrl = "admin/tech-management/edit";
        this.allUserData_modify_header = {
            "firstname": "First Name", "lastname": "Last Name",
            "email": "E-Mail", "address": "Address", "status": "Status", "phone": "Phone Number",
            "date": "Data Added", "fullNamecopy": "Name"
        };
        this.previewModal_detail_skip = ['_id', 'fullNamecopy'];
        this.UpdateEndpoint = "addorupdatedata";
        this.deleteEndpoint = "deletesingledata";
        this.tableName = "users";
        this.status = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
        this.SearchingEndpoint = "datalist";
        this.SearchingSourceName = "users_view_tech";
        this.search_settings = {
            selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
            textsearch: [{ label: "Search By Name", field: 'fullName' },
                { label: "Search By E-Mail", field: 'email' }],
        };
        this.TechDashboardAllData = [];
        /* Set Meta Data */
        this.commonFunction.setTitleMetaTags();
        this.user_cookie = cookie.get('jwtToken');
        this.apiUrl = httpService.baseUrl;
    }
    ngOnInit() {
        this.activatedRoute.data.forEach((data) => {
            this.TechDashboardAllData = data.techDashboardData.res;
        });
    }
};
ListingTechComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listing-tech',
        templateUrl: './listing-tech.component.html',
        styleUrls: ['./listing-tech.component.css']
    })
], ListingTechComponent);
export { ListingTechComponent };
//# sourceMappingURL=listing-tech.component.js.map