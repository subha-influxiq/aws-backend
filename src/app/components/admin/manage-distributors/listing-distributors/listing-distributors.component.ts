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
  selector: 'app-listing-distributors',
  templateUrl: './listing-distributors.component.html',
  styleUrls: ['./listing-distributors.component.css']
})
export class ListingDistributorsComponent implements OnInit {

  public allUserData: any = [];
  public techData_count:any=0;
  public datasource: any;
  public allUserData_skip: any = [
    "_id",
    "address",
    "zip",
    "city",
    "state",
    "user_type",
    "password",
    "created_at",
    "id",
    "updated_at",
    "diagnostic_admin_id",
    "name_search"
  ];
  public editUrl: any = "admin/distributors-management/edit";
  public allUserData_modify_header: any = {
    "distributorname": "Distributor Name",
    "contactperson": "Contact Person",
    "email": "Email",
    "status": "Status",
    "phone": "Phone Number"
  };
  public previewModal_detail_skip: any = [
    "_id",
    "user_type",
    "password",
    "created_at",
    "id",
    "updated_at",
    "diagnostic_admin_id"
  ];

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "data_pece";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_tech_list";
  public datacollection: any='getdistributorslistdata';
  public sortdata:any={
    "type":'desc',
    "field":'distributorname',
    "options":['distributorname']
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
      textsearch: [{ label: "Search By Distributor Name", field: 'distributorname_search' },
      { label: "Search By E-Mail", field: 'email' },{ label: "Search By Contact Person", field: 'contactperson_search' }],

    };
  public user_cookie: any;
  public userData: any;
  public TechDashboardAllData: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction ,public dialog: MatDialog,public router: Router) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_cookie = cookie.get('jwtToken');
    this.userData = JSON.parse(this.cookie.get('user_details'));
    
    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/tech-management/edit';
    }

    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/distributors-management/edit';
    }

    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getdistributorslistdata';
    let endpointc='getdistributorslistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'distributorname'
    }
 
    }
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.techData_count =res.count;
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
              message: "Do you want to login as Distributor : " + data.custombuttonclick.data.distributorname +"?",
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
                  this.router.navigateByUrl("distributors/dashboard");
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
