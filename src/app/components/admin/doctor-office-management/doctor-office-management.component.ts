import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-doctor-office-management',
  templateUrl: './doctor-office-management.component.html',
  styleUrls: ['./doctor-office-management.component.css']
})
export class DoctorOfficeManagementComponent implements OnInit {

  public doctorOfficeAllData: any = [];
  public doctorOfficeData_count:any=0;
  public datasource: any;

  public user_cookie: any;

  public doctorOfficeAllData_skip: any = [
    "_id",
    "address",
    "zip",
    "city",
    "tech_id",
    "doctor_id",
    "state",
    "user_type",
    "password",
    "id",
    "created_at",
    "updated_at",
    "refresh_token",
    "lastGoogleCalendarUpdateOn",
    "name_search"
  ];
  public editUrl: any = "admin/doctor-office-management/edit";
  public doctorOfficeAllData_modify_header: any = {
    "center_name": "Center Name",
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "phone": "Phone Number",
    "parent_name" : "Parent Name",
    "parent_type" : "Parent Type",
    "status": "Status",
    "created_date" : "Created Date"
  };
  public previewModal_skip: any = [
    "_id",
    "tech_id",
    "state",
    "user_type"
  ];

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "dat_pece";
  public userData: any={}

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' },{ val: "distributor", 'name': 'Distributors' },{ val: "doctor_group", 'name': 'Doctors Group Admin' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_doctor_office_list";
  public datacollection: any='getdoctorofficelistdata';
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
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },{label: "Search By Center Name", field: 'center_search' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public  libdata: any = {
      basecondition: {"parent_id":this.userData._id},
      updateendpoint: 'statusupdate',
      notes: {
        label: "Notes",
        addendpoint: "addnotedata",
        deleteendpoint: "deletenotedata",
        listendpoint: "listnotedata",
        user: "",
        currentuserfullname: " ",
        header: 'User',
    },
      // hideeditbutton:true,// all these button options are optional not mandatory
      //hidedeletebutton:true,
      //hideviewbutton:false,
      //hidestatustogglebutton:true,
      // hideaction:true,
      tableheaders: ['center_name','firstname', 'lastname', 'email', 'phone', 'status', 'created_date'], //not required
    }
  

  constructor(public activatedRoute: ActivatedRoute,
    public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService) {

    this.user_cookie = cookie.get('jwtToken');
    let allData=cookie.getAll()
    this.userData = JSON.parse(allData.user_details);
    this.libdata.notes.user = this.userData._id;
    this.libdata.notes.currentuserfullname = this.userData.firstname +this.userData.lastname;
    this.apiUrl = httpService.baseUrl;

    if(this.userData.user_type == 'doctor') {
      this.editUrl = 'doctor/doctor-office-management/edit';
    }
    if(this.userData.user_type == 'diagnostic_admin') {
      this.editUrl = 'diagnostic-admin/doctor-office-management/edit';
    }
    if(this.userData.user_type == 'distributors') {
      this.editUrl = 'distributors/doctor-office-management/edit';
    }
    if(this.userData.user_type == 'doctor_group') {
      this.editUrl = 'doctor-group/doctor-office-management/edit';
    }
    if(this.userData.user_type == 'admin') {
      this.search_settings.textsearch.push({ label: "Search By Parent Name", field: 'parent_name_search' });
      this.search_settings.selectsearch.push({ label: 'Search By Parent Type', field: 'parent_type_search', values: this.parent_type });
      this.libdata.tableheaders.splice(3,0,"parent_name");
      this.libdata.tableheaders.splice(4,0,"parent_type");
    }
  }

  
  ngOnInit() {
    this.datasource = '';
    if(this.userData.user_type !="doctor") {
    let endpoint='getdoctorofficelistdata';
    let endpointc='getdoctorofficelistdata-count';
    let userdata ={};
    if(this.userData.user_type !="admin") {
      userdata = {
        parent_id : this.userData._id
      }
    }
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'firstname'
    },
    data :userdata,
    }
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.doctorOfficeData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.doctorOfficeAllData =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  } else {
    let endpoint='getdoctorofficelistdata';
    let endpointc='getdoctorofficelistdata-count';
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
    docofficeid: this.userData._id,
 
    }
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.doctorOfficeData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.doctorOfficeAllData =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  }
}

}
