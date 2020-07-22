import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApprovalSettingsUpdateComponent } from '../../../common/approval-settings-update/approval-settings-update.component';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';


@Component({
  selector: 'app-listing-diagnostic-admin',
  templateUrl: './listing-diagnostic-admin.component.html',
  styleUrls: ['./listing-diagnostic-admin.component.css']
})
export class ListingDiagnosticAdminComponent implements OnInit {

  public allUserData: any = [];
  public diagnosticadminData_count: any = 0;
  public datasource: any;
  public allUserData_skip: any = [
    "_id",
    "contact_person",
    "address",
    "zip",
    "city",
    "state",
    "user_type",
    "password",
    "created_at",
    "id",
    "updated_at",
    "name_search"
  ];
  public editUrl: any = "admin/diagnostic-admin-management/edit";
  public allUserData_modify_header: any = {
    "center name": "Center Name",
    "email": "Email",
    "status": "Status",
    "phone": "Phone Number",
    "FAX": "fax"
  };
  public previewModal_detail_skip: any = [
    "_id",
    "user_type",
    "password",
    "created_at",
    "id",
    "updated_at"
  ];

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "data_pece";
  public userData: any;

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public datacollection: any='getdiagnosticadminlistdata';
  public SearchingSourceName: any = "data_diagnostic_admin_list";
  public sortdata:any={
    "type":'desc',
    "field":'centername',
    "options":['center_name']
 };
 public limitcond:any={
  "limit":10,
  "skip":0,
  "pagecount":1
};
public libdata: any = {
  basecondition: "",
  updateendpoint: 'statusupdate',
  // tableheaders: ['firstname', 'lastname', 'email', 'phone', 'practice_name', 'npi', 'status', 'created_date',], //not required
  custombuttons: [
    {
      label: "Log Me",
      type: 'listner',
      id: 'i1'
    },
  ]
}
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;
  public TechDashboardAllData: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction,public dialog: MatDialog, public router: Router) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_cookie = cookie.get('jwtToken');
    this.apiUrl = httpService.baseUrl;
    this.userData = JSON.parse(cookie.get('user_details'));
    
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getdiagnosticadminlistdata';
    let endpointc='getdiagnosticadminlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'centername'
    }
 
    }
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.diagnosticadminData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.TechDashboardAllData =res.results.res;
 
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
              message: "Do you want to login as Diagnostic Admin : " + data.custombuttonclick.data.center_name +"?",
              button1: { text: "Yes" },
              button2: { text: "No" },
            }
          }
          var dialogRef1 = this.dialog.open(DialogBoxComponent, modalData1);

          dialogRef1.afterClosed().subscribe(result => {
            switch(result) {
              case "Yes":
                // Delete Cookie
                this.cookie.delete('user_details');
                this.cookie.delete('main_user');
                this.cookie.delete('jwtToken');
                this.cookie.deleteAll('/');

                setTimeout(() => {
                  // Reset again Cookie
                  this.cookie.set('jwtToken', this.user_cookie);
                  this.cookie.set('user_details', JSON.stringify(data.custombuttonclick.data));
                  this.cookie.set('main_user', JSON.stringify(this.userData));

                  // Redirect to page
                  this.router.navigateByUrl("diagnostic-admin/dashboard");
                }, 500);
                break;
              case "No":
                dialogRef1.close();
                break;
            }
          });
          break;
      }
    }
  }

}
