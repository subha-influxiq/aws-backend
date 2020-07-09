import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApprovalSettingsUpdateComponent } from '../../../common/approval-settings-update/approval-settings-update.component';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  // ===============================Declarations=========================
  public userData: any = {};
  public docData_count: any = 0;
  public docData: any = [];
  public datasource: any;
  public docData_skip: any = [
    "_id",
    "fax",
    "address",
    "zip",
    "city",
    "state",
    "user_type",
    "tech_id",
    "biller_id",
    "doctors_office_id",
    "diagnostic_admin_id",
    "taxo_list",
    "password",
    "created_at",
    "id",
    "name_search",
    "updated_at",
    "doctor_signature",
    "distributor_id",
    "diagnostic_admin_id",
    "doctorgroup_id"
  ];
  public docData_modify_header: any = {
    firstname: "First Name",
    lastname: "Last Name",
    practice_name: "Practice Name",
    parent_name: "Parent Name",
    parent_type: "Parent Type",
    npi: "NPI#",
    email: "Email",
    phone: "Phone Number",
    status: "Status",
    created_date: "Created Date"
  };

  public previewModal_skip: any = [
    "_id",
    "user_type",
    "tech_id",
    "biller_id",
    "doctors_office_id",
    "taxo_list",
    "password",
    "created_at",
    "id",
    "name_search",
    "updated_at"
  ];
  public tableName: any = 'data_pece';
  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public user_cookie: any;
  public searchingEndpoint: any = "datalist";
  public searchSourceName: any = "data_doctor_list"
  public editUrl: any = 'admin/doctor-management/edit';
  public apiUrl: any;
  public datacollection: any = 'getdoctorlistdata';
  public data: any;
  public field: any;
  public fetch: any;
  public libdata: any = {
    basecondition: "",
    updateendpoint: 'statusupdate',
    notes: {
      label: "Notes",
      addendpoint: "addnotedata",
      deleteendpoint: "deletenotedata",
      listendpoint: "listnotedata",
      user: "",
      currentuserfullname: " ",
      header: 'fullname',
    },
    tableheaders: ['firstname', 'lastname', 'email', 'phone', 'practice_name', 'npi', 'status', 'created_date',], //not required
    custombuttons: [
      {
        label: "Log Me",
        type: 'listner',
        id: 'i1'
      },
      {
        label: "Approval Settings",
        type: 'listner',
        id: 'i1'
      },
    ]
  }
  public sortdata: any = {
    "type": 'desc',
    "field": 'firstname',
    "options": ['firstname', 'email', 'practice_name', 'npi', 'status', 'created_date']
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributors' }, { val: "doctor_group", 'name': 'Doctors Group Admin' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }, { label: "Search By NPI", field: 'npi' }]
    };
  // ====================================================================

  constructor(public dialog: MatDialog, private http: HttpServiceService, private cookieService: CookieService,
    private router: Router, public activatedRoute: ActivatedRoute) {

    this.user_cookie = cookieService.get('jwtToken');
    let allData = cookieService.getAll();
    this.userData = JSON.parse(allData.user_details);
    
    if (this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/doctor-management/edit';
      this.field = { 'parent_id': this.userData._id };
      this.data = this.userData._id;
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.center_name;
    }
    
    if (this.userData.user_type == 'admin') {
      if (this.activatedRoute.snapshot.routeConfig.path == "admin/sales-person/doctor-management") {
        this.field = { parent_user_type: "sales_person" }
        this.docData_modify_header.parent_name = "Sales Person Name";
        this.docData_modify_header.parent_type = "Parent";
        this.search_settings.textsearch.push({ label: "Search By Sales Person Name", field: 'parent_name_search' });
      } else {
        this.search_settings.textsearch.push({ label: "Search By Parent Name", field: 'parent_name_search' });
      }
      this.search_settings.selectsearch.push({ label: 'Search By Parent Type', field: 'parent_user_type', values: this.parent_type });
      this.libdata.tableheaders.splice(3, 0, "parent_name");
      this.libdata.tableheaders.splice(4, 0, "parent_type");
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.firstname + this.userData.lastname;
    }

    if (this.userData.user_type == 'doctor_group') {
      this.editUrl = 'doctor-group/doctor-management/edit';
      this.field = { 'parent_id': this.userData._id };
      this.data = this.userData._id;
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.groupname
    }
    if (this.userData.user_type == 'distributors') {
      this.editUrl = 'distributors/doctor-management/edit';
      this.field = { 'parent_id': this.userData._id };
      this.data = this.userData._id;
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.distributorname;
    }

    this.libdata.basecondition = this.field;
    this.apiUrl = http.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint = 'getdoctorlistdata';
    let endpointc = 'getdoctorlistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'firstname'
      },
      data: this.fetch
    }

    if (this.userData.user_type == 'diagnostic_admin') {
      this.fetch = { 'parent_id': this.data }
    }
    if (this.userData.user_type == 'doctor_group') {
      this.fetch = { 'parent_id': this.data }
    }
    if (this.userData.user_type == 'distributors') {
      this.fetch = { 'parent_id': this.data }
    }
    if (this.activatedRoute.snapshot.routeConfig.path == "admin/sales-person/doctor-management") {
      this.fetch = { flag: 1 }
    }
    if (this.activatedRoute.snapshot.routeConfig.path == "admin/doctor-management") {
      this.fetch = { flag: 0 }
    }

    data.data = this.fetch;
    this.http.httpViaPost(endpointc, data).subscribe((res: any) => {
      this.docData_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint, data).subscribe((res: any) => {
      this.docData = res.results.res;
    }, error => {
      console.log('Oooops!');
    });
  }

  listenLiblistingChange(data: any = null) {
    if(data != null) {
      switch(data.custombuttonclick.btninfo.label) {
        case "Log Me":
          let modalData1: any = {
            panelClass: 'bulkupload-dialog',
            data: {
              header: "Alert",
              message: "Do you want to login using this doctor ?",
              button1: { text: "Yes" },
              button2: { text: "No" },
            }
          }
          var dialogRef1 = this.dialog.open(DialogBoxComponent, modalData1);

          dialogRef1.afterClosed().subscribe(result => {
            switch(result) {
              case "Yes":
                // Delete Cookie
                this.cookieService.delete('user_details');
                this.cookieService.delete('main_user');
                this.cookieService.delete('jwtToken');
                this.cookieService.deleteAll('/');

                setTimeout(() => {
                  // Reset again Cookie
                  this.cookieService.set('jwtToken', this.user_cookie);
                  this.cookieService.set('user_details', JSON.stringify(data.custombuttonclick.data));
                  this.cookieService.set('main_user', JSON.stringify(this.userData));

                  // Redirect to page
                  this.router.navigateByUrl("doctor/dashboard");
                }, 500);
                break;
              case "No":
                dialogRef1.close();
                break;
            }
          });
          break;
        case "Approval Settings":
          console.log("Settings");
          let modalData: any = {
            panelClass: 'bulkupload-dialog',
            data: {
              doctorData: data.custombuttonclick.data,
            },
            width: '500px'
          };
          const dialogRef = this.dialog.open(ApprovalSettingsUpdateComponent, modalData);
      
          dialogRef.afterClosed().subscribe(result => {
            switch(result.status) {
              case 'success':
                let modalData: any = {
                  panelClass: 'bulkupload-dialog',
                  data: {
                    header: "Alert",
                    message: "Successfully Updated.",
                    button1: { text: "" },
                    button2: { text: "OK" },
                  }
                }
                const dialogRef = this.dialog.open(DialogBoxComponent, modalData);
      
                dialogRef.afterClosed().subscribe(result => {
                  this.docData = [];
                  this.docData_count = 0;
                  this.ngOnInit();
                });
                break;
              case 'close':
                break;
              default:
                break;
            }
          });
          break;
      }
    }
  }


}
