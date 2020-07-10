import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-listing-tech',
  templateUrl: './listing-tech.component.html',
  styleUrls: ['./listing-tech.component.css']
})

export class ListingTechComponent implements OnInit {
  
  public allUserData: any = [];
  public techData_count:any=0;
  public field:any;
  public data:any;
  public fetch:any;
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
    "name_search",
    "diagnostic_admin_id",
    "distributor_id",
    "doctorgroup_id"
  ];
  public editUrl: any = "admin/tech-management/edit";
  libdata:any={
    basecondition: "",
    updateendpoint:'statusupdate',
    notes: {
      label: "Notes",
      addendpoint: "addnotedata",
      deleteendpoint: "deletenotedata",
      listendpoint: "listnotedata",
      user: "",
      currentuserfullname: " ",
      header: 'fullname',
  },
    // hideeditbutton:true,// all these button options are optional not mandatory
    //hidedeletebutton:true,
    //hideviewbutton:false,
    //hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders:['firstname','lastname','email','phone','status','created_date'], //not required
    custombuttons: [
      {
        label: "Log Me",
        type: 'listner',
        id: 'i1'
      },]
}
  public allUserData_modify_header: any = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "status": "Status",
    "phone": "Phone Number",
    "parent_name" : "Parent Name",
    "parent_type" : "Parent Type"
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
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' },{ val: "distributor", 'name': 'Distributors' },{ val: "doctor_group", 'name': 'Doctors Group Admin' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_tech_list";
  public datacollection: any='gettechlistdata';
  public sortdata:any={
    "type":'desc',
    "field":'firstname',
    "options":['firstname']
 };
 public limitcond:any={
  "limit":10,
  "skip":0,
  "pagecount":1
};
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status },],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;
  public userData: any;
  public TechDashboardAllData: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction,public dialog: MatDialog,private router: Router) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_cookie = cookie.get('jwtToken');
    if(this.activatedRoute.snapshot.routeConfig.path == "admin/doctor/tech-management") {
      this.userData = {user_type:"doctor",_id:JSON.parse(this.cookie.get('id'))};
    } else {
    this.userData = JSON.parse(this.cookie.get('user_details'));
    }
    this.libdata.notes.user = this.userData._id;
    this.libdata.notes.currentuserfullname = this.userData.firstname +this.userData.lastname;
    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/tech-management/edit';
      this.field = {'parent_id':this.userData._id};
      this.data = this.userData._id;
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.center_name;
    }
    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/tech-management/edit';
      this.libdata.basecondition = {doctor_id:this.userData._id,type:"doctor"}
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.firstname +this.userData.lastname;
    }
    if(this.userData.user_type == 'doctor_group') {
      this.editUrl = 'doctor-group/tech-management/edit';
      this.field = {'parent_id':this.userData._id};
      this.data = this.userData._id;
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.groupname 
    }
    if(this.userData.user_type == 'distributors') {
      this.editUrl = 'distributors/tech-management/edit';
      this.field = {'parent_id':this.userData._id};
      this.data = this.userData._id;
      this.libdata.notes.user = this.userData._id;
    this.libdata.notes.currentuserfullname = this.userData.distributorname;
    }
    if(this.userData.user_type == 'admin') {
      this.search_settings.textsearch.push({ label: "Search By Parent Name", field: 'parent_name_search' });
      this.search_settings.selectsearch.push({ label: 'Search By Parent Type', field: 'parent_type_search', values: this.parent_type });
      this.libdata.tableheaders.splice(3,0,"parent_name");
      this.libdata.tableheaders.splice(4,0,"parent_type");
      this.libdata.notes.user = this.userData._id;
      this.libdata.notes.currentuserfullname = this.userData.firstname +this.userData.lastname;
    }

    this.libdata.basecondition = this.field;

    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    if(this.userData.user_type !="doctor") {
      console.log("if");
    let endpoint='gettechlistdata';
    let endpointc='gettechlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'firstname'
    },
    data:this.fetch
    }
  

    if(this.userData.user_type == 'diagnostic_admin') {
      this.fetch={'parent_id':  this.data}
    }
    if(this.userData.user_type == 'doctor_group') {
      this.fetch={'parent_id':  this.data}
    }
    if(this.userData.user_type == 'distributors') {
      this.fetch={'parent_id':  this.data}
    }
    data.data = this.fetch;
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
  } else {
    console.log("else");
    let endpoint='gettechlistdata';
    let endpointc='gettechlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'firstname'
    },
    type:"doctor",
    _id: this.userData._id
    }
  

    if(this.userData.user_type == 'diagnostic_admin') {
      this.fetch={'parent_id':  this.data}
    }
    if(this.userData.user_type == 'doctor_group') {
      this.fetch={'parent_id':  this.data}
    }
    if(this.userData.user_type == 'distributors') {
      this.fetch={'parent_id':  this.data}
    }
    data.data = this.fetch;
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
}

listenLiblistingChange(data: any = null) {
  if(data != null) {
    switch(data.custombuttonclick.btninfo.label) {
      case "Log Me":
        let modalData1: any = {
          panelClass: 'bulkupload-dialog',
          data: {
            header: "Alert",
            message: "Do you want to login as tech : " + data.custombuttonclick.data.firstname + " " + data.custombuttonclick.data.lastname + "?",
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
                this.router.navigateByUrl("tech/dashboard");
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
