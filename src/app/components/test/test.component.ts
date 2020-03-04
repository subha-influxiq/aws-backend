import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunction } from '../../class/common/common-function';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  public resolveData: any;
  public dataSource: any;
  public displayedColumns:any;
  public lastsearchcond:any={};
  public displaycolvals:any = [];

  public search: any = {
    "name": "",
    "city": "",
    "state": ""
  };

  public page: any = {
    "page_count": 50,
    "page_no": 1
  };

  public sort_val: any;
  public sort_item: any = {};
  public sort_type: any;
  public total_count: any = 0;

  constructor(private router: Router, public cookieService: CookieService, private http: HttpServiceService, public activatedRoute: ActivatedRoute, public commonFunction: CommonFunction) {
    this.displayedColumns = [
      {key:"name", value:'Name'},
      {key:"DOB", value:'Date of Birth'},
      {key:"DOA", value:'DOA'},
      {key:"roll", value:'Roll'},
      {key:"class", value: "Class"},
      {key:"address", value: "Address"},
      {key:"parent_phone", value: "Parent Phone"},
      {key:"parent_email", value: "Parent Email"},
      {key:"city", value: "City"},
      {key:"state", value: "State"},
      {key:"weight", value: "Weight"},
      {key:"height", value: "Height"}
    ];
    let data: any = Array.from(this.displayedColumns, (x:any) => x.key);
    this.displaycolvals = ['#'];
    this.displaycolvals = this.displaycolvals.concat(data);

    this.sort_val = 'doa';
    this.sort_type = 'desc';

    this.activatedRoute.data.subscribe(resolveData => {
      //console.log(">>", resolveData.dataCount);
      this.resolveData = resolveData.dataCount.data;
      this.dataSource = new MatTableDataSource(this.resolveData);
    });

    this.getPageCount();
  }

  getPageData() {
    let searchcond:any = {};
    let serachval = this.search;
    let searcharr = Object.keys(serachval).map(function (key) { 
      // Using Number() to convert key to number type 
      // Using obj[key] to retrieve key value 
      return {key:key, val:serachval[key]};   
  });

  console.log('search arr',searcharr);
  for(let k in searcharr){

    if(searcharr[k].val!=null && searcharr[k].val!=''){
      searchcond[searcharr[k].key]={$regex:searcharr[k].val};

    }
  }
  searchcond={$and:[searchcond]}; 
  this.lastsearchcond=searchcond;
  console.log(searchcond,'cond'); 
  //return;
    //for(lel key in this.search){}
    let repostSignCond: any = {
      "source": "data_pece",
      "condition": {},
      "skip": (parseInt(this.page.page_no)-1) * parseInt(this.page.page_count),
      "limit": parseInt(this.page.page_count),
      "search": searchcond,
      "sort_val": this.sort_val,
      "sort_type": this.sort_type
    };

    

    //console.log('repostSignCond.search',repostSignCond.search);
    //return;
    this.http.httpViaPost('test-datalist', repostSignCond).subscribe((response) => {
      if(response.status == 'success') {
        this.total_count=0;
        this.getPageCount();
        this.dataSource = new MatTableDataSource(response.data);
      } else {
        console.log(response);
      }
    });
  }

  sortPageData(item: any) {
    this.sort_item.header = item; 
    if(item != this.sort_val) {
      this.sort_val = item;
      // this.sort_type.header = item;
      this.sort_type = 'asc';
      this.getPageData();
    } else {
      if(this.sort_type == 'desc') {
        this.sort_type = 'asc';
      } else {
        this.sort_type = 'desc';
      }
      console.log(">>>", this.sort_type);
      this.getPageData();
    }
  }

  nextPage(flag: string = null) {
    if(flag == 'prev' && this.page.page_no > 1) {
      this.page.page_no--;
    } 

    if(flag == null && this.page.page_no < this.total_count / this.page.page_no) {
      this.page.page_no++;
    }
    this.getPageData();
  }
  
  getPageCount() {
    let repostSignCond: any = {
      sort_val: "doa",
      sort_type: "desc",
      search:this.lastsearchcond
    };


    this.http.httpViaPost('test-datalist-page-count', repostSignCond).subscribe((response) => {
      if(response.status == 'success') {
        this.total_count = response.data;
      } else {
        console.log(response);
      }
    });
  }

  ngOnInit() {
  }

  searchData() {
    console.log(this.search);
  }

}