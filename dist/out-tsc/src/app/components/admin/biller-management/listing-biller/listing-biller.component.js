import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListingBillerComponent = class ListingBillerComponent {
    constructor(activeRoute, cookie, httpService) {
        this.activeRoute = activeRoute;
        this.cookie = cookie;
        this.httpService = httpService;
        this.allBillerData = [];
        this.allUserData_skip = ["confirmpassword", "password",
            "created_at", "id", "updated_at", "_id", "type", "phoneno", "taxo_list", "fullName", "city", "state", "zip"];
        this.editUrl = "admin/biller-management/edit";
        this.allUserData_modify_header = {
            "firstname": "First Name", "lastname": "Last Name",
            "email": "E-Mail", "phone": "Phone Number", "date": "Date Added",
            "status": "Status", "address": "Address", "companyname": "Company Name",
            "fullNamecopy": "Name"
        };
        this.UpdateEndpoint = "addorupdatedata";
        this.deleteEndpoint = "deletesingledata";
        this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzExMTYzNDMsImlhdCI6MTU3MTAyOTk0M30.m7kRTmIwvk-G0qYmr0zJ9qXoFJea8fBwnIOt8d7n3bc";
        this.tableName = "users";
        this.previewModal_detail_skip = ['_id', 'fullNamecopy'];
        this.status = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
        this.SearchingEndpoint = "datalist";
        this.SearchingSourceName = "users_view_biller";
        this.search_settings = {
            selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
            textsearch: [{ label: "Search By Name", field: 'fullName' },
                { label: "Search By E-Mail", field: 'email' }],
        };
        this.user_cookie = cookie.get('jwtToken');
        this.apiUrl = httpService.baseUrl;
    }
    ngOnInit() {
        this.getAllBillerData();
    }
    getAllBillerData() {
        this.activeRoute.data.forEach((data) => {
            this.allBillerData = data.Billerdata.res;
        });
    }
};
ListingBillerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listing-biller',
        templateUrl: './listing-biller.component.html',
        styleUrls: ['./listing-biller.component.css']
    })
], ListingBillerComponent);
export { ListingBillerComponent };
//# sourceMappingURL=listing-biller.component.js.map