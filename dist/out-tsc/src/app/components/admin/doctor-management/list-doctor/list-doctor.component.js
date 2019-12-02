import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListDoctorComponent = class ListDoctorComponent {
    // ====================================================================
    constructor(http, cookieService, router, activatedRoute) {
        this.http = http;
        this.cookieService = cookieService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        // ===============================Declarations=========================
        this.docData = [];
        this.docData_skip = ["_id", "created_at", "password", "confirmpassword",
            "taxonomies", "password", "confirmpassword", "practicename", "address", "type", "fullName", "tech_id",
            "biller_id", "doctorsOfficeName", "city", "state", "zip"];
        this.docData_modify_header = {
            "firstname": "First Name", "lastname": "Last Name", "email": "Email", "phone": "Phone",
            "practicename": "Practice name", "npm": "NPI#", "status": "Status", "taxo list": "Taxonomies", "fullNamecopy": "Doctor Name", "biller": "Biller Name",
            "tech": "Tech Name", "date": "Date"
        };
        this.previewModal_skip = ["_id", "tech_id", "biller_id", "created_at", "fullNamecopy"];
        this.tableName = 'users';
        this.UpdateEndpoint = "addorupdatedata";
        this.deleteEndpoint = "deletesingledata";
        this.searchingEndpoint = "datalist";
        this.searchSourceName = "users_view_doctor_list";
        this.editUrl = 'admin/doctor-management/edit';
        this.status = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
        this.search_settings = {
            selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
            textsearch: [{ label: "Search By Name", field: 'fullName' },
                // {label:"Search by Taxonomy",field:'taxo_list'},
                { label: "Search By E-Mail", field: 'email' }]
        };
        this.user_cookie = cookieService.get('jwtToken');
        this.apiUrl = http.baseUrl;
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe(resolveData => {
            this.docData = resolveData.data.res;
        });
    }
};
ListDoctorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-list-doctor',
        templateUrl: './list-doctor.component.html',
        styleUrls: ['./list-doctor.component.css']
    })
], ListDoctorComponent);
export { ListDoctorComponent };
//# sourceMappingURL=list-doctor.component.js.map