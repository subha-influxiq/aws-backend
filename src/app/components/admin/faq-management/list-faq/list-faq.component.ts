import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunction } from '../../../../class/common/common-function';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.css']
})
export class ListFaqComponent implements OnInit {

  public allUserData: any = [];
  public datasource: any ='';
  public faqData_count:any=0;
  public allUserData_skip: any = [
    "_id",
    "answer",
    "created_at",
    "youtube_link"
  ];
  public editUrl: any = "admin/faq-management/edit";
  public allUserData_modify_header: any = {
    "users" : "Users",
    "question": "Question",
    "priority" : "Priority",
    "status" : "Status"
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

  public libdata:any={
    // basecondition: {report_type:"file"},
    updateendpoint:'statusupdate',
    // hideeditbutton:true,// all these button options are optional not mandatory
    // hidedeletebutton:true,
    // hideviewbutton:true,
    //hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders:['users','question','priority','status'] //not required
}

public datacollection: any='getfaqlistdata';
  public sortdata:any={
    "type":'desc',
    "field":'question',
    "options":['question']
 };
 public limitcond:any={
  "limit":10,
  "skip":0,
  "pagecount":1
};

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public apiUrl: any;
  public tableName: any = "data_faq";

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "data_sales_person_list";
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Question", field: 'question_search' }]
    };
  public user_cookie: any;
  public userData: any;
  public FaqManagementAddEditForm: any = [];
  constructor(public cookie: CookieService, public http: HttpClient,
    public httpService: HttpServiceService, public activatedRoute: ActivatedRoute,
    public commonFunction: CommonFunction) {

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_cookie = cookie.get('jwtToken');
    let allData = cookie.getAll();
    this.userData = JSON.parse(allData.user_details);

    this.apiUrl = httpService.baseUrl;
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getfaqlistdata';
    let endpointc='getfaqlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'question'
    }
 
    }
        this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.faqData_count =res.count;
            //console.warn('blogData c',res);
 
        }, error => {
            console.log('Oooops!');
        });
 
        this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
           
            this.FaqManagementAddEditForm =res.results.res;
 
        }, error => {
            console.log('Oooops!');
        });
  }

}
