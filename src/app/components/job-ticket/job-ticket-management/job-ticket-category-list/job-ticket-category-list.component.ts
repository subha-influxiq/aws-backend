import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobTicketService } from '../../../../services/job-ticket.service';
@Component({
  selector: 'app-job-ticket-category-list',
  templateUrl: './job-ticket-category-list.component.html',
  styleUrls: ['./job-ticket-category-list.component.css']
})
export class JobTicketCategoryListComponent implements OnInit {
  public jobTicketscatList:any=[];
  public user_type:any;
  public userId:any;
  jobtickets_details_header_skip: any = ['_id', 'uploadfile', 'user_id','added_by_search','issue_related_to_search','subject_search']; // use for Table Header Skip
 
   modify_header_array: any = {
    category_name: 'Category Name',
     user_type:'User Type',
     priority:'Priority',
     user_email: 'E-mail',
     issue_related_to: 'Issue Related To',
     status: 'Status',
     description_html: 'Description',
     createdon_datetime:'Added Date'
   };
   authval: any = [
   ];
   deleteendpoint = '';
   editroute: any = '/';
   updateendpoint = '';
   date_search_source: any = '';                     //
   date_search_endpoint: any = '';           // date_search_endpoint is use for date search endpoint
   tablename: any = 'job_tickets';
 
   public statusarray: any = [{ val: 1, name: 'Active' }, { val: 0, name: 'Inactive' }];

   jobtickets_details_detail_datatype: any = [{                     // use for Table Detail inside the modal image path
     key: 'images',
     value: 'image',
     fileurl: 'http://18.222.26.198/upload/brandimages/'   // Image path
   }];
   jobtickets_details_detail_skip: any = ['_id','uploadfile', 'user_id','added_by_search','issue_related_to_search','subject_search'];   // use for Table Detail Field Skip
 
   search_settings: any = {
 
     datesearch: [{ startdatelabel: 'Start Date', enddatelabel: 'End Date', submit: 'Search', field: 'createdon_datetime' }],
 
     // selectsearch: [
     //   { label: 'Search By Status', field: 'order_status', values: this.statusarray },
     // ],
 
     textsearch: [
       { label: 'Search By Added By', field: 'added_by_search', submit: 'Search' },
       { label: 'Search By Issue Related To', field: 'issue_related_to_search', submit: 'Search' },
       { label: 'Search By Subject', field: 'subject_search', submit: 'Search' }
 
     ]
   };
   searchendpoint = '';
   sortdata: any = {
     type: 'asc',                                              //  default sort data ascend and descend (desc)
     field: 'createdon_datetime',                                         // default field for sorting
     options: []
   };
   datacollection: any = 'api1/getjobticketsdataforadmin';
 
   public date_search_source_count: any = 0;
 
 
   libdata: any = {
     updateendpoint: '',                                //
     hideeditbutton: false,                           // (hide edit button)
     hidedeletebutton: false,                         // (hide delete button)
     hideviewbutton: true,                          // (hide view button)
     hidestatustogglebutton: true,                  // (hide status toggle button)
     hideaction: false,
     updateendpointmany: '',
     deleteendpointmany: '',
     hidemultipleselectbutton: true,
     hidedeletemany: true,
     hideupdatemany: true,                              // (hide action column)
     detailview_override: [],
 
     tableheaders: ['category_name','user_type','description_html','priority','status', 'createdon_datetime'],
     
     custombuttons: [
      //  {
      //    label: "Manage Tickets",
      //    route: "job-ticket-details",
      //    type: 'internallink',
      //    param: ['_id'],
      //  }
     ]
 
   };
   limitcond: any = {                                 // send basic limit data
     limit: 10,
     skip: 0,
     pagecount: 1
   };
  constructor(public activatedRoute : ActivatedRoute,public apiService : JobTicketService) { 
    this.activatedRoute.data.forEach((response: any) => {
      this.jobTicketscatList = response.data.results.res;
      console.log("res",this.jobTicketscatList);

    });
    this.datacollection = '/getjobticketcategorylistdata';

    const endpointc = 'getjobticketcategorylistdata-count';
    const data: any = {
      condition: {

        limit: 10,
        skip: 0
      },
      sort: {

        type: 'desc',                                           // defalut field sort type
        field: '_id'                                         // default sort field
      }

    };
  

  this.apiService.getDataforAdminList(endpointc, data)
    .subscribe((response: any) => {
      this.date_search_source_count = response.count;

    });
  }

  ngOnInit() {
  }

}
