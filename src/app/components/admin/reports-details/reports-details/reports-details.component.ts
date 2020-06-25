import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
// import { DownloadDetailsComponent } from './download-details/download-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-reports-details',
  templateUrl: './reports-details.component.html',
  styleUrls: ['./reports-details.component.css']
})
export class ReportsDetailsComponent implements OnInit {

  public loginUserData: any = {};
  public jwtToken: string = "";
  public user:any = {};
  public htmlText: any = {
    headerText: "Patient Reports"
  };
  public allResolveData: any = {};
  public shareDetails: any = {
    baseUrl: environment.doctorSignUpBaseUrl,
    userId: ""
  };

  // Lib list
  public allBillerData: any = [];
  public billerData_count: any = 0;
  public datasource: any;
  public field: any;
  public data: any;
  public allUserData_skip: any = [
    "_id",
    "report_file_type",
    "tech_id",
    "tech_email",
    "batch_name",
    "report_type",
    "status",
    "file_basepath",
    "file_bucketname",
    "file_name",
    "file_original_name",
    "file_type",
    "converted_image",
    "images",
    "patient_details",
    "patient_name_search",
    "report_life_circle",
    "note",
    "additional_potential_health_risks",
    "cpt_codes",
    "created_at","doctor_name"
  ];
  public editUrl: any = "admin/biller-management/edit";
  public userData: any;
  public libdata: any = {
    footersettings: [
            { key: 'f0', data: '', colspan: 1 },
            { key: 'f1', data: '', colspan: 4 },
            { key: 'f2', data: 'Total:', colspan: 1 },
            { key: 'f4', data: '', colspan: 2 },
            { key: 'f3', data: 'Total:', colspan: 2 }
        ],
    basecondition: "",
    updateendpoint: 'status-update',
    hideeditbutton: true,// all these button options are optional not mandatory
    hidedeletebutton: true,
    hidedeletemany: true,
    hidestatustogglebutton: true,
    hideviewbutton: true,
    custombuttons: [
      {
        label: "View Report",
        route: "admin/view-patient-record/",
        type: 'internallink',
        param: ['_id'],
      },
      {
        label: "Download Report",
        link: "https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/reports",
        type: 'externallink',
        paramtype: 'angular',
        param: ['download_file_name']
      },
      {
        label:"Tech Details",
        type:'action',
        datatype:'api',
        endpoint:'get-tech-details',
        // otherparam:["patient_name"],
        //cond:'status',
        //condval:0,
        datafields: ['first name','last name','email','phone','address','city','state','zip'],
        param:'id',
        headermessage: 'Tech Information',
        // refreshdata:true
    } ,
    {
      label:"View Codes",
      type:'action',
      datatype:'api',
      endpoint:'get-codes-details',
      datafields: ['Additional Potential Health Risks','CPT Codes','ICD Codes'],
      // otherparam:["patient_name"],
      //cond:'status',
      //condval:0,
      param:'id',
      headermessage: 'Associated Codes',
      // refreshdata:true
  } ,
  {
    label:"Doctor Office Details",
    type:'action',
    datatype:'api',
    endpoint:'get-doctor-office-details',
    datafields: ['center name','first name','last name','email','phone','address','city','state','zip'],
    // otherparam:["patient_name"],
    //cond:'status',
    //condval:0,
    param:'id',
    headermessage: 'Doctor Office Info',
    // refreshdata:true
} ,
{
  label:"Parent Details",
  type:'action',
  datatype:'api',
  endpoint:'get-parent-details',
  datafields: ['Parent Name','Contact Person','email','phone','address','city','state','zip'],
  // otherparam:["patient_name"],
  cond:'parent_check_flag',
  condval:1,
  param:'id',
  headermessage: 'Parent Information',
  // refreshdata:true
} ,
    ],
    tableheaders: [
      "patient_name",
      // "tech_name",
      "status_text",
      "created_at_datetime",
      "cpt_addl",
      "general_details",
      "cpt_amount",
      "total_cpt_amount"
      // "parent_type",`
      // "parent_id",
      // "doctors_office_id",
    ]
  }
  public allUserData_modify_header: any = {
    "general_details": "Related Info",
    // "tech_name": "Tech Name",
    "patient_name": "Patient Name",
    "status_text": "Status",
    "created_at_datetime": "Report Added",
    "cpt_addl": "CPT/ Addl Hrisk C",
    "cpt_amount" :"Per CPT Validate Amount($)",
    "total_cpt_amount" : "Total Validate Amount($)"
    // "addl_hlth_risk": "Addl Hlth Risk"
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any = environment.apiBaseUrl1;
  public tableName: any = "data_pece";
  public datacollection: any = 'getPatientreport';

  public sortdata: any = {
    "type": 'desc',
    "field": 'patient_name',
    "options": ['patient_name',]
  };
  public limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };

  public previewModal_detail_skip: any = ['_id', 'user_type', 'status', 'password', 'created_at'];

  public status: any = [{ val: "Biller Admin Approved", 'name': 'Biller Admin Approved' }, { val: "Biller Admin Not Approved", 'name': 'Biller Admin Not Approved' }, {val:"Biller Admin Hold" , 'name' :"Biller Admin Hold"}];
  public cptcodes: any = [{ val: "95923", 'name': '95923' }, { val: "95943", 'name': '95943' }, { val: "95921", 'name': "95921" }, { val: "93923", 'name': "93923" }, { val: "93922", 'name': "93922" }];
  public parent_type: any = [{ val: "admin", 'name': 'Admin' }, { val: "diagnostic_admin", 'name': 'Diagnostic Admin' }, { val: "distributors", 'name': 'Distributor' }, { val: "doctor_group", 'name': 'Doctor Group' }];
  public report_type: any = [{ val: "RM-3A", 'name': 'RM-3A' }, { val: "TM FLOW V3", 'name': 'TM FLOW V3' }, { val: "TM FLOW V4", 'name': 'TM FLOW V4' },{ val: "CMAT with BP Cuffs", 'name': 'CMAT with BP Cuffs' }];
  public SearchingEndpoint: any = "datalist";
  public authval: any = [];
  public docofficeval: any = [];
  public techval: any = [];
  public parentnameval: any = [];
  public doctorcity: any = [];
  public doctorstate: any = [];
  public patientcity: any = [];
  public patientstate: any = [];
  public SearchingSourceName: any = "data_biller_list";
  public search_settings: any =
    {
      
      selectsearch: [{ label: 'Search By Report Type', field: 'report_file_type', values: this.report_type } ,{label: "Search By Patient City", field: 'patient_state_search', values:this.patientcity },{label: "Search By Doctor", field: 'doc_name_search', values:this.authval },{label: "Search By Tech", field: 'tech_name_search', values:this.techval },{label: "Search By Doctor Office", field: 'doctor_ofiice_name_search', values:this.docofficeval },{label: "Search By Parent Name", field: 'parent_name_search', values:this.parentnameval },{label: "Search By Doctor City", field: 'doctor_city_search', values:this.doctorcity },{label: "Search By Doctor State", field: 'doctor_state_search', values:this.doctorstate },{label: "Search By Patient State", field: 'patient_city_search', values:this.patientstate }],
      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at_datetime" }], 
      textsearch: [{ label: "Search By Patient Name", field: 'patient_name_search' }],
      // { label: "Search By E-Mail", field: 'email' }, { label: "Search By Parent Name", field: 'parent_search' }, { label: "Search By Company Name", field: 'company_search' }],
      search:[{ label: 'Search By CPT Codes', field: 'cpt_codes_search', values: this.cptcodes }
      ]
    };
  // lib list end

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public deviceService: DeviceDetectorService, private matSnackBar: MatSnackBar) {

    this.loginUserData["user_details"] = cookieService.getAll();
    this.loginUserData.user_details.user_details = JSON.parse(this.loginUserData.user_details.user_details);
    this.shareDetails.userId = this.loginUserData.user_details.user_details._id;
    this.shareDetails.user_type = this.loginUserData.user_details.user_details.user_type;

    this.loginUserData["jwtToken"] = cookieService.get('jwtToken');

    /* Get Auth Token */
    this.jwtToken = cookieService.get('jwtToken');
    
    if(this.loginUserData.user_details.user_details.user_type == "doctor") {
      this.user = {doctor_id:this.loginUserData.user_details.user_details._id,status:11}
      this.libdata.custombuttons[0].route = "doctor/patient-record/"
      this.search_settings.selectsearch.splice(2,1);
      this.search_settings.selectsearch.splice(6,1);
      this.search_settings.selectsearch.splice(7,1);
    } else if(this.loginUserData.user_details.user_details.user_type == "tech") {
      this.search_settings.selectsearch.splice(3,1);
      this.user = {tech_id:this.loginUserData.user_details.user_details._id,status:11}
    } else if(this.loginUserData.user_details.user_details.user_type == "doctor_office") {
      this.search_settings.selectsearch.splice(4,1);
      this.libdata.custombuttons[0].route = "doctor-office/view-patient-record/"
      this.user = {doctors_office_id:this.loginUserData.user_details.user_details._id,status:11}
    } else if(this.loginUserData.user_details.user_details.user_type == "diagnostic_admin") {
      this.search_settings.selectsearch.splice(5,1);
      this.libdata.custombuttons[0].route = "diagnostic-admin/patient-record/"
      this.user = {parent_id:this.loginUserData.user_details.user_details._id,status:11}
    } else if(this.loginUserData.user_details.user_details.user_type == "doctor_group") {
      this.search_settings.selectsearch.splice(5,1);
      this.libdata.custombuttons[0].route = "doctor-group/view-patient-record/"
      this.user = {parent_id :this.loginUserData.user_details.user_details._id,status:11}
    } else if(this.loginUserData.user_details.user_details.user_type == "distributors") {
      this.search_settings.selectsearch.splice(5,1);
      this.libdata.custombuttons[0].route = "distributors/view-patient-record/"
      this.user = {parent_id:this.loginUserData.user_details.user_details._id,status:11}
    } else {
      this.user = {parent_id:this.activatedRoute.snapshot.params._id}
    }
    /* Get resolve data */
    // this.activatedRoute.data.subscribe(resolveData => {
      // this.allResolveData = resolveData.dataCount.data.dashboardCount[0];
      //this.viewReportProcessData(this.htmlText.headerText);
    // });

    this.libdata.basecondition = this.user;
    // lib list
    console.log("+++",this.user);
    let endpoint = 'getPatientreport';
    let endpointc = 'getPatientreport-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'patient_name'
      },
      data:this.user
    }

    this.http.httpViaPostbyApi1(endpointc, data).subscribe((res: any) => {
      this.billerData_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPostbyApi1(endpoint, data).subscribe((res: any) => {
      // console.log(res.amount);
      this.allBillerData = res.results.res;
      // this.libdata.footersettings[2].data = 'Total:'+res.amount+'';
      // this.libdata.footersettings[4].data = 'Total:'+res.total+'';
    }, error => {
      console.log('Oooops!');
    });
  }


  ngOnInit() {
    let data:any= {
      "data":this.user
    }
    // data.condition = this.user;
    this.http.httpViaPostbyApi1("datalist-report", data).subscribe((response: any) => {
      var start = false;
      var count = 0;
      this.libdata.footersettings[2].data = 'Total:'+response.amount+'';
      this.libdata.footersettings[4].data = 'Total:'+response.total+'';
      for(var i in response.res) {
        if(response.res[i].doc_name_search !="") {
          for(var j in this.authval) {
            if(response.res[i].doc_name == this.authval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) { 
            this.authval.push({name:response.res[i].doc_name,val:response.res[i].doc_name_search}); 
        } 
        start = false; 
        count = 0;
          
        }
      }
      for(var i in response.res) {
        if(response.res[i].tech_name_search !="") {
          for(var j in this.techval) {
          if(response.res[i].tech_namesearch == this.techval[j].name) {
            start = true;
          }
        }
        count ++;
        if(count == 1 && start ==false) {
          this.techval.push({name:response.res[i].tech_namesearch,val:response.res[i].tech_name_search})
        }
        start = false;
        count = 0;
      }
      }
      for(var i in response.res) {
        if(response.res[i].parent_name_search !="") {
          for(var j in this.parentnameval) {
            if(response.res[i].parent_namesearch == this.parentnameval[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.parentnameval.push({name:response.res[i].parent_namesearch,val:response.res[i].parent_name_search})
          }
          start = false;
          count = 0;
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].doctor_state_search !="") {
          for(var j in this.doctorstate) {
            if(response.res[i].doctor_state == this.doctorstate[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.doctorstate.push({name:response.res[i].doctor_state,val:response.res[i].doctor_state_search})
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].doctor_city_search !="") {
          for(var j in this.doctorcity) {
            if(response.res[i].doctor_city == this.doctorcity[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.doctorcity.push({name:response.res[i].doctor_city,val:response.res[i].doctor_city_search})
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].patient_city_search !="") {
          for(var j in this.patientcity) {
            if(response.res[i].patient_city == this.patientcity[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.patientcity.push({name:response.res[i].patient_city,val:response.res[i].patient_city_search})
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].patient_state_search !="") {
          for(var j in this.patientstate) {
            if(response.res[i].patient_state == this.patientstate[j].name) {
              start = true;
            }
          }
          count ++;
          if(count == 1 && start ==false) {
            this.patientstate.push({name:response.res[i].patient_state,val:response.res[i].patient_state_search })
          }
          start = false;
          count = 0;
        
        
        }
      }
      for(var i in response.res) {
        if(response.res[i].doctor_ofiice_name_search !="") {
          for(var j in this.docofficeval) {
            if(response.res[i].doctor_ofiice_namesearch == this.docofficeval[j].name) {
              start = true;
            }
          }
          count++;
          if (count == 1 && start == false) { 
            this.docofficeval.push({name:response.res[i].doctor_ofiice_namesearch,val:response.res[i].doctor_ofiice_name_search }) 
        } 
        start = false; 
        count = 0;
        }
      }
    }, error => {
      console.log('Oooops!');
    });
  }

  ngAfterViewInit() {
  }

  viewReportProcessData(flag) {
    console.log(flag);
  }


}
