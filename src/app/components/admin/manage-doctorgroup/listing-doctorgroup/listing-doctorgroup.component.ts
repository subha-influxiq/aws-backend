import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApprovalSettingsUpdateComponent } from '../../../common/approval-settings-update/approval-settings-update.component';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';


@Component({
  selector: 'app-listing-doctorgroup',
  templateUrl: './listing-doctorgroup.component.html',
  styleUrls: ['./listing-doctorgroup.component.css']
})
export class ListingDoctorgroupComponent implements OnInit {
  public userData: any;
  public docData_count:any=0;
  public  docData: any = [];
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
    "groupname_search"
  ];
  public docData_modify_header: any = {
    groupname: "Group Name",
    email: "Email",
    phone: "Phone Number",
    address: "Address",
    status: "Status",
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
    "groupname_search",
    "updated_at"
  ];
  public tableName: any = 'users';
  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public user_cookie: any;
  public searchingEndpoint:any="datalist";
  public searchSourceName:any="data_doctor_list"
  public editUrl:any = 'admin/doctor-management/group/edit';
  public apiUrl:any;
  public datacollection: any='getdoctorgrouplistdata';
  public sortdata:any={
    "type":'desc',
    "field":'groupname',
    "options":['groupname']
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
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Group Name", field: 'groupname_search' },
      // {label:"Search by Taxonomy",field:'taxo_list'},
      { label: "Search By E-Mail", field: 'email' }]
    };
  // ====================================================================

  constructor(private http: HttpServiceService, private cookieService: CookieService, 
    private router: Router,public activatedRoute : ActivatedRoute,public dialog: MatDialog) {

    this.user_cookie = cookieService.get('jwtToken');
    this.userData = JSON.parse(this.cookieService.get('user_details'));

    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/doctor-management/edit';
    }

    this.apiUrl = http.baseUrl;
  }


  ngOnInit() {
    this.datasource = '';
    let endpoint='getdoctorgrouplistdata';
    let endpointc='getdoctorgrouplistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'groupname'
    }
 
    }
        this.http.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.docData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.http.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.docData =res.results.res;
 
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
              message: "Do you want to login as Doctor Group Admin : " + data.custombuttonclick.data.groupname +"?",
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
                  this.router.navigateByUrl("doctor-group/dashboard");
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
