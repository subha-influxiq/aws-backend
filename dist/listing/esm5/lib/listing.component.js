/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import {Component, OnInit, ViewChild, Input, Inject,
//   ComponentFactoryResolver,
//   ComponentRef,
//   Directive,
//   ViewContainerRef} from '@angular/core';
// import {MatSort, MatTableDataSource,MatPaginator} from '@angular/material';
// import {SelectionModel} from '@angular/cdk/collections';
// import { ApiService } from './api.service';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event} from "@angular/router";
// import {Observable} from 'rxjs';
// import {startWith, map} from 'rxjs/operators';
// import {HttpClient} from "@angular/common/http";
// import { DomSanitizer} from '@angular/platform-browser';
// declare var $:any;
// import * as momentImported from 'moment';
// const moment = momentImported;
// @Component({
//   selector: 'lib-listing',
//   templateUrl: './listing.module.html',
//   styleUrls: ['./listing.module.css']
// })
// export class ListingComponent implements OnInit {
//   myControl = new FormControl();
//   datasourceval:any;
//   search_settingsval:any;
//   click_to_add_ananother_pageval:any;
//   grab_linkval:any;
//   date_search_sourceval:any;
//   date_search_endpointval:any;
//   urlval:any;
//   searchendpointval:any;
//   searchListval:any;
//   pdf_link_val:any;
//   statusarrval:any;
//   skipval:any;
//   errormg:any;
//   jwttokenval:any;
//   detail_datatypeval:any;
//   detail_skip_arrayval:any;
//   deleteendpointval:any;
//   editrouteval:any;
//   apiurlval:any;
//   updateendpointval:any;
//   modify_header_arrayval:any;
//   selection :any;
//   sourcedataval :any;
//   emailarrayval :any;
//   columns :any=[];
//   olddata :any=[];
//   tsearch :any=[];
//   autosearch :any=[];
//   public x :any;
//   public custombuttonval :any;
//   public result :any = {};
//   public sh :any = false;
//   public art :any = false;
//   public aud2 :any = false;
//   public aud :any = false;
//   /* this variable for artist xp preview */
//   previewFlug: any = false;
//   @Input()
//   set search_settings(search_settings: any) {
//     this.search_settingsval = search_settings;
//     console.log('this.search_settingsval');
//     console.log(this.search_settingsval);
//     /*for (let i= 0; i<= this.search_settingsval.search.length; i++) {
//       console.log(this.search_settingsval.search[i].label);
//     }*/
//   /*  console.log(this.search_settingsval.selectsearch);
//     console.log(this.search_settingsval.selectsearch[0].label);
//     console.log(this.search_settingsval.selectsearch[0].values);
//     console.log(this.search_settingsval.datesearch);*/
//   }
//   @Input()
//   set click_to_add_ananother_page(click_to_add_ananother_page: any) {
//     this.click_to_add_ananother_pageval = click_to_add_ananother_page;
//     console.log('this.click_to_add_ananother_pageval');
//     console.log(this.click_to_add_ananother_pageval);
//   }
//   @Input()
//   set grab_link(grab_link: any) {
//     this.grab_linkval = grab_link;
//     console.log('this.grab_linkval');
//     console.log(this.grab_linkval);
//   }
//   @Input()
//   set custombutton(custombutton: any) {
//     this.custombuttonval = custombutton;
//     console.log('this.custombuttonval');
//     console.log(this.custombuttonval);
//   }
//   @Input()
//   set date_search_source(date_search_source: any) {
//     this.date_search_sourceval = date_search_source;
//     console.log('this.date_search_sourceval');
//     console.log(this.date_search_sourceval);
//   }
//   @Input()
//   set date_search_endpoint(date_search_endpoint: any) {
//     this.date_search_endpointval = date_search_endpoint;
//     console.log('this.date_search_endpointval');
//     console.log(this.date_search_endpointval);
//   }
//    @Input()
//   set url(url: any) {
//     this.urlval = url;
//     console.log('this.urlval');
//     console.log(this.urlval);
//   }
//     @Input()
//   set searchendpoint(searchendpoint: any) {
//     this.searchendpointval = searchendpoint;
//     console.log('this.searchendpointval');
//     console.log(this.searchendpointval);
//   }
//    @Input()
//   set pdf_link(pdf_link: any) {
//     this.pdf_link_val = pdf_link;
//     console.log('this.pdf_link_val');
//     console.log(this.pdf_link_val);
//   }
//   @Input()
//   set searchList(searchList: any) {
//     this.searchListval = searchList;
//     console.log('this.searchListval');
//     console.log(this.searchListval);
//   }
//   @Input()
//   set datasource(datasource: any) {
//     this.datasourceval = datasource;
//     console.log('this.datasourceval');
//     console.log(this.datasourceval);
//   }
//   @Input()
//   set skip(skip: any) {
//     this.skipval = skip;
//     console.log('this.skipval');
//     console.log(this.skipval);
//   }
//   @Input()
//   set detail_datatype(detail_datatype: any) {
//     this.detail_datatypeval = detail_datatype;
//     console.log('this.detail_datatypeval');
//     console.log(this.detail_datatypeval);
//   }
//  @Input()
//   set detail_skip_array(detail_skip_array: any) {
//     this.detail_skip_arrayval = detail_skip_array;
//     console.log('this.detail_skip_arrayval');
//     console.log(this.detail_skip_arrayval);
//   }
// @Input()
//   set sourcedata(sourcedata: any) {
//     this.sourcedataval = sourcedata;
//     console.log('this.sourcedataval');
//     console.log(this.sourcedataval);
//   }
//   @Input()
//   set modify_header_array(modify_header_array: any) {
//     this.modify_header_arrayval = modify_header_array;
//     console.log('this.modify_header_arrayval');
//     console.log(this.modify_header_arrayval);
//   }
//   @Input()
//     set deleteendpoint(deleteendpointval: any) {
//       this.deleteendpointval = deleteendpointval;
//       console.log('this.deleteendpointval');
//       console.log(this.deleteendpointval);
//     }
//  @Input()
//     set updateendpoint(updateendpoint: any) {
//       this.updateendpointval = updateendpoint;
//       console.log('this.updateendpointval');
//       console.log(this.updateendpointval);
//     }
//     @Input()
//     set apiurl(apiurl: any) {
//       this.apiurlval = apiurl;
//       console.log('this.apiurlval');
//       console.log(this.apiurlval);
//     }
// @Input()
//     set jwttoken(jwttoken: any) {
//       this.jwttokenval = jwttoken;
//       console.log('this.jwttokenval');
//       console.log(this.jwttokenval);
//     }
//     @Input()
//     set statusarr(statusarr: any) {
//       this.statusarrval = statusarr;
//       console.log('this.statusarrval');
//       console.log(this.statusarrval);
//     }
//     @Input()
//     set emailarray(emailarray: any) {
//       this.emailarrayval = emailarray;
//       console.log('this.emailarrayval');
//       console.log(this.emailarrayval);
//     }
//   @Input()
//   set editroute(editroute: any) {
//     console.log('editroute');
//     console.log(editroute);
//     this.editrouteval = editroute;
//     console.log('this.editrouteval');
//     console.log(this.editrouteval);
//   }
//   /* artistxp preview start */
//   @Input()
//   set preview_artistxp(flug: any) {
//     this.previewFlug = true;
//   }
//   /* artistxp preview end */
//   stateGroups: string[] = this.searchListval;
//   stateGroup: Observable<string[]>;
//   displayedColumns: string[] = [];
//   datacolumns: string[] = [];
//   displayedColumnsheader: string[] = [];
//   formarray: any = [];
//   start_date: any ;
//   dateSearch_condition: any ={};
//   selectSearch_condition: any ={};
//   autoSearch_condition: any ={};
//   textSearch_condition: any ={};
//   end_date: any ;
//   public i: any ;
//   loading: any = false ;
//   public preresult: any={};
//   //dataSource = new MatTableDataSource(this.datasourceval);
//   dataSource = new MatTableDataSource;
//   @ViewChild(MatSort, {static: true}) sort: MatSort;
//   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
//   // options: FormGroup;
//   myForm:any;
//   // myForm:any;
//   constructor(public _apiService: ApiService,public dialog: MatDialog,private bottomSheet: MatBottomSheet,public fb: FormBuilder,private router: Router, private resolver: ComponentFactoryResolver,
//               private container: ViewContainerRef, public _http: HttpClient, public sanitizer:DomSanitizer) {
//     this.router.events.subscribe((event: Event) => {
//         switch (true) {
//           case event instanceof NavigationStart: {
//             this.loading = true;
//             break;
//           }
//           case event instanceof NavigationEnd:
//           case event instanceof NavigationCancel:
//           case event instanceof NavigationError: {
//             this.loading = false;
//             break;
//           }
//           default: {
//             break;
//           }
//         }
//       });
//    /* this.myForm = this.fb.group({
//       email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
//       password: ['', Validators.required]
//     });*/
//   }
//   /*@Directive({
//     selector: '[Listing]'
//   })*/
//   inputblur(val:any){
//     console.log('on blur .....');
//     this.myForm.controls[val].markAsUntouched();
//   }
//   ngOnInit() {
//     if (this.search_settingsval !=null && this.search_settingsval.search != null && this.search_settingsval.search != '') {
//       console.log('----------------');
//       let source: any;
//       let condition: any = {};
//       source = {
//         source: this.date_search_sourceval,
//         condition: condition
//       };
//       let link = this.apiurlval + '' + this.date_search_endpointval;
//       this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
//         console.log(res);
//         this.result = res;
//         console.log(this.result);
//         this.preresult = this.result.res;
//         console.log(this.preresult);
//       });
//     }
//     // this._service.success(this.columns[0].date,'dndnnd',this.options);
//    /* this.stateGroupOptions = this.myControl.valueChanges
//         .pipe(
//             startWith(''),
//             map(value => this._filterGroup(value))
//         );*/
//     this.stateGroup = this.myControl.valueChanges
//         .pipe(
//             startWith(''),
//             map(value => this._filter(value))
//         );
//     /*const factory = this.resolver.resolveComponentFactory(
//         componentMapper[this.field.type]
//     );
//     this.componentRef = this.container.createComponent(factory);
//     this.componentRef.instance.field = this.field;
//     this.componentRef.instance.group = this.group;
// */
//     this.x = this.datasourceval;
//     let x=this.x;
//     let temp = []
//     let keys = x[0]
//     temp = Object.keys(keys)    /*by Object.keys() we can find the fieldnames(or keys) in an object, i.e, in temp object field names are saved*/
//     let coldef_list = [];
//     let header_list = [];
//     for (let i = 0; i < temp.length; i++) {
//       coldef_list.push(temp[i].replace(/\s/g, "_"));      /*to replace spaces in field name by "_", we use "replace(/\s/g, "_")"*/
//       header_list.push(temp[i])
//     }
//     //coldef_list.push('Actions');
//     //header_list.push('Actions')
//     console.log('coldef_list',coldef_list);
//     console.log('header_list',header_list);
//     for (let i = 0; i < coldef_list.length; i++) {
//       let ff = `row.${coldef_list[i]}`
//       var tt = { columnDef: `${coldef_list[i]}`,    header: `${header_list[i].replace(/_/g," ")}`,  cell: (row) => eval(ff) ,objlength:header_list.length  };
//       // console.log('tt.columnDef');
//       // console.log(tt.columnDef);
//       for (let b in this.modify_header_arrayval){
//         if(b==tt.header) tt.header=this.modify_header_arrayval[b];
//       }
//       if(this.skipval.indexOf(tt.columnDef)==-1)
//       this.columns.push(tt);
//       // console.log('this.columns');
//       // console.log(this.columns);
//     }
//     let displayedcols= this.columns.map(x => x.columnDef);
//     displayedcols.push('Actions');
//     this.displayedColumns =displayedcols;
//     this.displayedColumns.unshift('select');        /*adds select column in table by unshift function*/
//     let data_list = [];
//     for (let i = 0; i < this.x.length; i++) {
//       data_list.push(this.createData(x[i]));
//     }
//     this.olddata=data_list;
//     console.log(data_list)
//     this.dataSource = new MatTableDataSource(data_list);
//     this.selection = new SelectionModel(true, []);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
//   onSubmit() {
//     let x: any;
//     this.errormg = '';
//     let data = this.myForm.value;
//     console.log('data');
//     console.log(data);
//     console.log(this.myForm.valid);
//     for (x in this.myForm.controls) {
//       this.myForm.controls[x].markAsTouched();
//     }
//   }
//   dateSearch(val: any) {
//     console.log("start date");
//     console.log(this.start_date);
//     console.log(this.end_date);
//     let sd = moment(this.start_date).unix();
//     let ed = moment(this.end_date).unix();
//     console.log(moment(this.start_date).unix());
//     console.log(moment(this.end_date).unix());
//     console.log(new Date(this.end_date).getTime());
//     let link = this.apiurlval + ''+ this.date_search_endpointval;
//     console.log(link);
//     if(moment(this.end_date).unix()!=null && moment(this.start_date).unix()!=null ) {
//       let source:any;
//       let condition: any;
//       condition = {};
//       condition[val] = {
//         $lte: new Date(this.end_date).getTime(),
//             $gte: new Date(this.start_date).getTime(),
//       };
//       this.dateSearch_condition = {};
//       this.dateSearch_condition = condition;
//       let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
//           source= {
//             source: this.date_search_sourceval,
//             condition: conditionobj,
//           };
//       console.log(source);
//       this._apiService.postSearch(link,this.jwttokenval, source).subscribe(res => {
//         console.log(res);
//         let result: any = {};
//         result = res;
//         console.log(result.res);
//         this.dataSource = new MatTableDataSource(result.res);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       })
//       /*this._http.post(link, {source:this.date_search_sourceval,
//         condition: {
//           'created_at': {
//             $lte: new Date(this.end_date).getTime(),
//             $gte: new Date(this.start_date).getTime(),
//           }
//         },token: this.jwttokenval,
//       }).subscribe( res =>{
//         let result: any ={};
//         result = res;
//         console.log("ok");
//         console.log(res);
//         console.log(result.res);
//         let newdata = result.res;
//         this.dataSource = new MatTableDataSource(result.res);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       })*/
//     }else
//       console.log("error");
//   }
//   selectSearch (value:any,type:any){
//     console.log('type');
//     console.log(type);
//     let link = this.apiurlval + ''+ this.date_search_endpointval;
//     console.log(link);
//     let source:any;
//     let condition: any;
//     condition = {};
//     condition[type.field]=value;
//     this.selectSearch_condition = {};
//     this.selectSearch_condition = condition;
//     let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
//     source= {
//       source: this.date_search_sourceval,
//       condition: conditionobj
//     };
//     if(value !=null ) {
//       this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
//         console.log(res);
//         let result: any = {};
//         result = res;
//         console.log("ok");
//         console.log(res);
//         console.log(result.res);
//         let newdata = result.res;
//         this.dataSource = new MatTableDataSource(result.res);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       });
//     } else
//     {
//       console.log('oops');
//     }
//   console.log("error");
//   }
//   autosearchfunction (value: any) {
//     console.log(value);
//     let val:any=this.autosearch[value];
//     console.log(val);
//     let source:any;
//     let condition: any={};
//     if(this.autosearch[value].length>0 && {$or:[this.autosearch[value].toLowerCase(),this.autosearch[value].toUpperCase(),this.autosearch[value]]})condition[value+'_regex']=val;
//     this.autoSearch_condition = {};
//     this.autoSearch_condition = condition;
//     let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
//     source= {
//       source: this.date_search_sourceval,
//       condition: conditionobj
//     };
//     let link = this.apiurlval + ''+ this.date_search_endpointval;
//     this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
//       console.log(res);
//       // let result:any={};
//       this.result = res;
//       console.log(this.result);
//       console.log(this.result.res);
//       this.dataSource = new MatTableDataSource(this.result.res);
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//     });
//   }
//   textsearchfunction (value:any){
//     console.log('value');
//     console.log(value);
//     console.log(value.toLowerCase());
//     console.log(this.tsearch[value]);
//     let link = this.apiurlval + ''+ this.date_search_endpointval;
//     console.log(link);
//     let source:any;
//     let condition: any={};
//     //condition = {};
//     let val:any =this.tsearch[value].toLowerCase();
//     // condition={$or:[this.tsearch[value].toLowerCase(),this.tsearch[value].toUpperCase()]};
//     if(this.tsearch[value].length>1 && {$or:[this.tsearch[value].toLowerCase(),this.tsearch[value].toUpperCase()]})condition[value+'_regex']=val;
//     this.textSearch_condition = {};
//     this.textSearch_condition = condition;
//     //condition[value]="/222/";
//     //condition={email:{$regx:'/222/i'}};
//     let conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
//     source= {
//       source: this.date_search_sourceval,
//       condition: conditionobj
//     };
//     console.log('source');
//     console.log(source);
//     //add loader
//     this.loading = true;
//     if(value !=null  ) {
//       this._apiService.postSearch(link, this.jwttokenval, source).subscribe(res => {
//         console.log(res);
//         let result: any = {};
//         result = res;
//         //close loader
//         this.loading = false;
//         console.log("ok");
//         console.log(res);
//         console.log(result.res);
//         let newdata = result.res;
//         this.dataSource = new MatTableDataSource(result.res);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       });
//     } else
//     {
//       console.log('oops');
//     }
//   console.log("error");
//   }
//   private _filter(value: string): string[] {
//     const filterValue = value.toLowerCase();
//     return this.searchListval.filter(option => option.toLowerCase().includes(filterValue));
//   }
//   /*private _filterGroup(value: string): StateGroup[] {
//    /!* if (value) {
//       return this.searchListval
//           .map(group => ({names: _filter(group.names, value)}))
//           .filter(group => group.names.length > 0);
//     }
//     return this.searchListval;*!/
//     const filterValue = value.toLowerCase();
//     return this.searchListval.filter(option => option.toLowerCase().includes(filterValue));
//   }*/
//   getstatus(val:any){
//     // console.log('val');
//     // console.log(val);
//     for(let b in this.statusarrval){
//       if(this.statusarrval[b].val==val)
//         return this.statusarrval[b].name;
//       // console.log(this.statusarrval[b].name);
//     }
//     return "N/A";
//   }
//   hi(val: any){
//     // console.log('hi  val');
//     // console.log(val);
//     if (val.shatterblok_agreement_date != null && val.audiodeadline_agreement_date ==null ){
//       // console.log('shatter blok');
//       this.sh = true;
//       this.aud = false;
//     }
//     if (val.shatterblok_agreement_date != null && val.audiodeadline_agreement_date !=null) {
//       this.sh = true;
//       this.aud = true;
//     }
//     if (val.shatterblok_agreement_date == null && val.audiodeadline_agreement_date ==null) {
//       this.sh = false;
//       this.aud = false;
//     }
//   }
//   grapurl(val: any){
//     //  for all row checking
// // console.log(val)
//     if (val != null) {
//       this.art = true;
//       this.aud2 = true;
//     }
//     if (val == null) {
//       this.art = false;
//       this.aud2 = false;
//     }
//     // console.log(this.sh);
//     // console.log(this.aud);
//   }
//     copyText(row: any, val: string){
//     console.log('row in copyText');
//     console.log(row);
//     console.log('val in copyText');
//     console.log(val)
//       let fullurl = val+''+row;
//     console.log(fullurl);
//         let selBox = document.createElement('textarea');
//         selBox.style.position = 'fixed';
//         selBox.style.left = '0';
//         selBox.style.top = '0';
//         selBox.style.opacity = '0';
//         selBox.value = fullurl;
//         document.body.appendChild(selBox);
//         selBox.focus();
//         selBox.select();
//         document.execCommand('copy');
//         document.body.removeChild(selBox);
//     }
//   clickurl(val: any , url: any) {
//     let i
//     console.log('ok');
//     console.log(val);
//     console.log(val._id);
//     console.log(url);
//     console.log(url + '' +val._id + '' + this.pdf_link_val);
//     let link= url + '' +val._id + '' + this.pdf_link_val;
//     window.open(link, "_blank");
//   }
//   /** Whether the number of selected elements matches the total number of rows. */
//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//   }
//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   masterToggle() {
//     this.isAllSelected() ?
//         this.selection.clear() :
//         this.dataSource.data.forEach(row => this.selection.select(row));
//   }
//   /** The label for the checkbox on the passed row */
//   checkboxLabel(row?: any): string {
//     if (!row) {
//       return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
//     }
//     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
//   }
//   createData(point:any){
//     let data = {};
//     Object.keys(point).forEach(function (key) {
//       data[key.replace(/\s/g, "_")] = point[key];
//     });
//     return data
//   }
//   applyFilter(filterValue: string) {
//     console.log(filterValue)
//     console.log(this.dataSource);
//     // console.log(this.dataSource[name])
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
//   /*applyFilter1(filterValue: string, val: any) {
//     console.log(filterValue);
//     console.log(val.value);
//     let value= new MatTableDataSource(val.value);
//     value.filter = filterValue.trim().toLowerCase();
//     console.log(value);
//     /!* this.dataSource.filterPredicate = function(data, filter: string): boolean {
//       // return data.name.toLowerCase().includes(filter);
//     };
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }*!/
//   }*/
//   styleCell(col_name,row){
//     /*
//      if (col_name['columnDef']=='progress' && row['progress']=='100'){
//      return {'color' : 'red'}
//      } else {
//      return {}
//      }
//      */
//     return {}
//   }
//   viewdata(data1:any){
//     let data:any;
//     data=data1;
//     let data2:any=[];
//     console.log('data');
//     console.log(data);
//       for (let key in data) {
//           if (data.hasOwnProperty(key)) {
//               console.log(key + " -> " + data[key]+"--->"+typeof (data[key]));
//               if(typeof (data[key])=='boolean') {
//                   if(data[key]==true) data[key]='Yes';
//                   if(data[key]==false) data[key]='No';
//               }
//               console.log(key)
//               if(typeof (data[key])=='object') {
//                   let tempdata:any=[];
//                   for(let k in data[key]){
//                       console.log('key');
//                       console.log(key);
//                       console.log(this.detail_datatypeval);
//                       for(let p in this.detail_datatypeval){
//                           console.log('p');
//                           console.log(p);
//                           console.log(key);
//                           console.log(data[key][k]);
//                           if(this.detail_datatypeval[p].key==key && this.detail_datatypeval[p].value=='image'){
//                               let imgval:any=this.detail_datatypeval[p].fileurl+data[key][k].replace(/'/g, '');
//                               console.log('imgval');
//                               console.log('imgval');
//                               console.log(imgval);
//                               console.log(data[key][k].replace(/'/g, ''));
//                               tempdata.push("<img mat-card-image src="+imgval+"><br/>");
//                              // tempdata.push("<span>"+data[key][k]+"</span><br/>")
//                           }
//                           if(this.detail_datatypeval[p].key==key && this.detail_datatypeval[p].value!='image'){
//                               //tempdata.push("<img mat-card-image src="+data[key][k]+"><br/>")
//                               tempdata.push("<span>"+data[key][k]+"</span><br/>");
//                           }
//                       }
//                   }
//                   data[key]=tempdata;
//               }
//           }
//       }
//       console.log('data');
//       console.log(data);
//       for(let n in data){
//         if(data[n]!=null && data[n]!=''){
//           data2[n]=data[n];
//         }
//       }
//     for(let v in this.detail_skip_arrayval){
//       //data2[this.detail_skip_arrayval[v]]='';
//       delete data2[this.detail_skip_arrayval[v]];
//       console.log('this.detail_skip_arrayval[v]');
//       console.log(this.detail_skip_arrayval[v]);
//     }
//       let res = Object.entries(data2);
//     console.log('this.detail_skip_array');
//     console.log(this.detail_skip_arrayval);
//     console.log(this.detail_datatypeval);
//     console.log('res');
//     console.log(res);
//     const dialogRef = this.dialog.open(Confirmdialog, {
//       height: 'auto',
//       panelClass: 'custom-modalbox',
//       data: {isconfirmation:false,data:res}
//     });
//   }
//   managestatus(data:any){
//     console.log('data');
//     console.log(data);
//     let bs=this.bottomSheet.open(BottomSheet,{panelClass: 'custom-bottomsheet',data:{items:this.statusarrval}});
//     bs.afterDismissed().subscribe(result => {
//       console.log('The bottom sheet was closed');
//       console.log(result);
//       if(result!=null){
//         data.status = result.val;
//         data.id = data._id;
//       this._apiService.togglestatus(this.apiurlval + 'statusupdate', data, this.jwttokenval, this.sourcedataval).subscribe(res => {
//         let result: any = {};
//         result = res;
//         if (result.status == 'success') {
//           for (let c in this.olddata) {
//             //this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
//             if (this.olddata[c]._id == data._id) {
//               console.log('in data update');
//               console.log(data);
//               this.olddata[c].status = data.status;
//             }
//           }
//           this.dataSource = new MatTableDataSource(this.olddata);
//           this.selection = new SelectionModel(true, []);
//           this.dataSource.paginator = this.paginator;
//           this.dataSource.sort = this.sort;
//           let dialogRef = this.dialog.open(Confirmdialog, {
//             panelClass: 'custom-modalbox',
//             data: {message: 'Status updated successfully!!', isconfirmation: false}
//           });
//         }
//       }, error => {
//         console.log('Oooops!');
//       });
//     }
//       //this.animal = result;
//     });
//   }
// // for tree view in modal
//   custombuttonfunc(data:any){
//     console.log('data');
//     console.log(data);    // row data
//     console.log(this.custombuttonval);    // object from where the library has been used
//     let unsafeurl:any=this.custombuttonval.url;   //iframe url
//     for(let b in this.custombuttonval.fields){
//       unsafeurl=unsafeurl+'/'+data[this.custombuttonval.fields[b]];
//     }
//     console.log('unsafeurl');
//     console.log(unsafeurl);
//     unsafeurl=this.sanitizer.bypassSecurityTrustResourceUrl(unsafeurl);   //for sanitizing the url for security, otherwise it won't be able to show the page in iframe, hence modal
//     const dialogRef = this.dialog.open(Confirmdialog, {       // for opening the modal
//       height: 'auto',
//       panelClass: 'custom-data-modal',
//       data: {isconfirmation:false,data:[{data:data,customdata:unsafeurl}]}
//     });
//   }
//   managestatusmultiple(){
//     let ids:any=[];
//     let c:any;
//     for(c in this.selection.selected){
//       ids.push(this.selection.selected[c]._id);
//     }
//     console.log('ids');
//     console.log(ids);
//     //console.log('data');
//     //console.log(data);
//     let bs=this.bottomSheet.open(BottomSheet,{data:{items:this.statusarrval}});
//     bs.afterDismissed().subscribe(result => {
//       console.log('The bottom sheet was closed');
//       console.log(result);
//       if(result!=null){
//         //data.status = result.val;
//         //data.id = data._id;
//         let newstatus:any=result.val;
//       this._apiService.togglestatusmany(this.apiurlval + 'statusupdate', ids,result.val, this.jwttokenval, this.sourcedataval).subscribe(res => {
//         let result: any = {};
//         result = res;
//         if (result.status == 'success') {
//           for (let c in this.olddata) {
//             //this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
//             if (ids.indexOf(this.olddata[c]._id)>-1) {
//               console.log('in data update');
//               //console.log(data);
//               this.olddata[c].status = newstatus;
//             }
//           }
//           this.dataSource = new MatTableDataSource(this.olddata);
//           this.selection = new SelectionModel(true, []);
//           this.dataSource.paginator = this.paginator;
//           this.dataSource.sort = this.sort;
//           let dialogRef = this.dialog.open(Confirmdialog, {
//             panelClass: 'custom-modalbox',
//             data: {message: 'Status updated successfully!!', isconfirmation: false}
//           });
//         }
//       }, error => {
//         console.log('Oooops!');
//       });
//     }
//       //this.animal = result;
//     });
//   }
//   deletemultiple(){
//     console.log('this.selection.selected.length');
//     console.log(this.selection.selected.length);
//     console.log(this.selection);
//     console.log(this.selection.selected);
//     const dialogRef = this.dialog.open(Confirmdialog, {
//       panelClass: 'custom-modalbox',
//       data: {message: 'Are you sure you want to delete the selected records?'}
//     });
//     let ids:any=[];
//     let c:any;
//     for(c in this.selection.selected){
//       ids.push(this.selection.selected[c]._id);
//     }
//     console.log('ids');
//     console.log(ids);
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       console.log(result);
//       if(result=='yes'){
//         this._apiService.deteManyData(this.apiurlval+this.deleteendpointval,ids,this.jwttokenval,this.sourcedataval).subscribe(res => {
//           let result: any = {};
//           result = res;
//           if(result.status=='success'){
//             for(let c in ids){
//               this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
//             }
//             console.log('this.olddata');
//             console.log(this.olddata);
//             this.dataSource = new MatTableDataSource(this.olddata);
//             this.selection = new SelectionModel(true, []);
//             this.dataSource.paginator = this.paginator;
//             this.dataSource.sort = this.sort;
//             let dialogRef = this.dialog.open(Confirmdialog, {
//               panelClass: 'custom-modalbox',
//               data: {message: 'Record(s)  deleted successfully !!',isconfirmation:false}
//             });
//           }
//         }, error => {
//           console.log('Oooops!');
//         });
//       }
//       //this.animal = result;
//     });
//   }
//   deletedata(data:any){
//     //alert(5);
//     //this._apiService.deteOneData(this.apiurlval+this.deleteendpointval,data,this.jwttokenval);
//     console.log('data 889 ---');
//     console.log(data);
//     console.log('jwttokenval');
//     console.log(this.jwttokenval);
//     const dialogRef = this.dialog.open(Confirmdialog, {
//       panelClass: 'custom-modalbox',
//       height: 'auto',
//       data: {message: 'Are you sure to delete this record ??'}
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       console.log(result);
//       if(result=='yes'){
//         this._apiService.deteOneData(this.apiurlval+this.deleteendpointval,data,this.jwttokenval,this.sourcedataval).subscribe(res => {
//           let result: any = {};
//           result = res;
//           if(result.status=='success'){
//             console.log('this.olddata');
//             console.log(this.olddata);
//             console.log(this.olddata._id);
//             this.olddata = this.olddata.filter(olddata => olddata._id != data._id)
//             this.dataSource = new MatTableDataSource(this.olddata);
//             this.selection = new SelectionModel(true, []);
//             this.dataSource.paginator = this.paginator;
//             this.dataSource.sort = this.sort;
//             let dialogRef = this.dialog.open(Confirmdialog, {
//               panelClass: 'custom-modalbox',
//               data: {message: 'Record  deleted successfully !!',isconfirmation:false}
//             });
//           }
//         }, error => {
//           console.log('Oooops!');
//         });
//       }
//       //this.animal = result;
//     });
//   }
//  editdata(data:any){
//     console.log('data');
//     console.log(data);
//     console.log(this.editrouteval);
//     console.log(this.editrouteval+data._id);
//     console.log(this.jwttokenval);
//    this.router.navigate([this.editrouteval,data._id]);
//     //this.na
//   }
//   /* artistxp preview button click function start */
//   artistxpPreview(singleData: any) {
//     let link = 'http://developmentapi.audiodeadline.com:3090/' + 'datalist';
//     /******* not completed ******/
//     let data: any = { "source": "blockchainuser_view", "condition": { "posts_id_object": singleData._id }, "token": this.jwttokenval };
//     /******** not completed *****/
//     this._apiService.postData(link, data).subscribe(response => {
//       let restlt: any = response;
//       /* open dialog */
//       const dialogRef = this.dialog.open(Confirmdialog, {
//         panelClass: 'custom-modalbox-artistxp-preview',
//         height: 'auto',
//         data: { preview: true, previewData: restlt }
//       });
//     });
//   }
//   /* artistxp preview button click function end */
// }
// @Component({
//   selector: 'confirmdialog',
//   templateUrl: 'confirm-dialog.html',
// })
// export class Confirmdialog {
//   constructor(
//       public dialogRef: MatDialogRef<Confirmdialog>,
//       @Inject(MAT_DIALOG_DATA) public data: any ,public sanitizer:DomSanitizer) {
//     console.log('my data ...');
//     console.log(this.data);
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//   sanitizeUrl(unsafeurl:any,data:any,rowdata:any){
//     for(let b in data){
//       unsafeurl=unsafeurl+'/'+rowdata[data[b]];
//     }
//     console.log('unsafeurl');
//     console.log(unsafeurl);
//     console.log(data);
//     console.log(rowdata);
//     return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeurl);
//   }
// }
// @Component({
//   selector: 'bottom-sheet',
//   templateUrl: 'bottom-sheet.html',
// })
// export class BottomSheet {
//   constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>,@Inject(MAT_BOTTOM_SHEET_DATA) public data:any) {}
//   openLink(val:any): void {
//     console.log('bottomsheet data');
//     console.log(val);
//     this.bottomSheetRef.dismiss(val);
//     //event.preventDefault();
//   }
// }
import { Component, ViewChild, Input, Inject, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from './api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FormBuilder, FormControl } from '@angular/forms';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import * as momentImported from 'moment';
/** @type {?} */
var moment = momentImported;
var ListingComponent = /** @class */ (function () {
    // myForm:any;
    function ListingComponent(_apiService, dialog, bottomSheet, fb, router, resolver, container, _http, sanitizer) {
        var _this = this;
        this._apiService = _apiService;
        this.dialog = dialog;
        this.bottomSheet = bottomSheet;
        this.fb = fb;
        this.router = router;
        this.resolver = resolver;
        this.container = container;
        this._http = _http;
        this.sanitizer = sanitizer;
        this.myControl = new FormControl();
        this.columns = [];
        this.olddata = [];
        this.tsearch = [];
        this.autosearch = [];
        this.result = {};
        this.sh = false;
        this.art = false;
        this.aud2 = false;
        this.aud = false;
        /* this variable for artist xp preview */
        this.previewFlug = false;
        /* artistxp preview end */
        this.stateGroups = this.searchListval;
        this.displayedColumns = [];
        this.datacolumns = [];
        this.displayedColumnsheader = [];
        this.formarray = [];
        this.dateSearch_condition = {};
        this.selectSearch_condition = {};
        this.autoSearch_condition = {};
        this.textSearch_condition = {};
        this.loading = false;
        this.preresult = {};
        //dataSource = new MatTableDataSource(this.datasourceval);
        this.dataSource = new MatTableDataSource;
        this.router.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            switch (true) {
                case event instanceof NavigationStart: {
                    _this.loading = true;
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    _this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        }));
        /* this.myForm = this.fb.group({
           email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
           password: ['', Validators.required]
         });*/
    }
    Object.defineProperty(ListingComponent.prototype, "search_settings", {
        set: /**
         * @param {?} search_settings
         * @return {?}
         */
        function (search_settings) {
            this.search_settingsval = search_settings;
            console.log('this.search_settingsval');
            console.log(this.search_settingsval);
            /*for (let i= 0; i<= this.search_settingsval.search.length; i++) {
              console.log(this.search_settingsval.search[i].label);
            }*/
            /*  console.log(this.search_settingsval.selectsearch);
              console.log(this.search_settingsval.selectsearch[0].label);
              console.log(this.search_settingsval.selectsearch[0].values);
              console.log(this.search_settingsval.datesearch);*/
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "click_to_add_ananother_page", {
        set: /**
         * @param {?} click_to_add_ananother_page
         * @return {?}
         */
        function (click_to_add_ananother_page) {
            this.click_to_add_ananother_pageval = click_to_add_ananother_page;
            console.log('this.click_to_add_ananother_pageval');
            console.log(this.click_to_add_ananother_pageval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "grab_link", {
        set: /**
         * @param {?} grab_link
         * @return {?}
         */
        function (grab_link) {
            this.grab_linkval = grab_link;
            console.log('this.grab_linkval');
            console.log(this.grab_linkval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "custombutton", {
        set: /**
         * @param {?} custombutton
         * @return {?}
         */
        function (custombutton) {
            this.custombuttonval = custombutton;
            console.log('this.custombuttonval');
            console.log(this.custombuttonval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "date_search_source", {
        set: /**
         * @param {?} date_search_source
         * @return {?}
         */
        function (date_search_source) {
            this.date_search_sourceval = date_search_source;
            console.log('this.date_search_sourceval');
            console.log(this.date_search_sourceval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "date_search_endpoint", {
        set: /**
         * @param {?} date_search_endpoint
         * @return {?}
         */
        function (date_search_endpoint) {
            this.date_search_endpointval = date_search_endpoint;
            console.log('this.date_search_endpointval');
            console.log(this.date_search_endpointval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "url", {
        set: /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            this.urlval = url;
            console.log('this.urlval');
            console.log(this.urlval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "searchendpoint", {
        set: /**
         * @param {?} searchendpoint
         * @return {?}
         */
        function (searchendpoint) {
            this.searchendpointval = searchendpoint;
            console.log('this.searchendpointval');
            console.log(this.searchendpointval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "pdf_link", {
        set: /**
         * @param {?} pdf_link
         * @return {?}
         */
        function (pdf_link) {
            this.pdf_link_val = pdf_link;
            console.log('this.pdf_link_val');
            console.log(this.pdf_link_val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "searchList", {
        set: /**
         * @param {?} searchList
         * @return {?}
         */
        function (searchList) {
            this.searchListval = searchList;
            console.log('this.searchListval');
            console.log(this.searchListval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "datasource", {
        set: /**
         * @param {?} datasource
         * @return {?}
         */
        function (datasource) {
            this.datasourceval = datasource;
            console.log('this.datasourceval');
            console.log(this.datasourceval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "skip", {
        set: /**
         * @param {?} skip
         * @return {?}
         */
        function (skip) {
            this.skipval = skip;
            console.log('this.skipval');
            console.log(this.skipval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "detail_datatype", {
        set: /**
         * @param {?} detail_datatype
         * @return {?}
         */
        function (detail_datatype) {
            this.detail_datatypeval = detail_datatype;
            console.log('this.detail_datatypeval');
            console.log(this.detail_datatypeval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "detail_skip_array", {
        set: /**
         * @param {?} detail_skip_array
         * @return {?}
         */
        function (detail_skip_array) {
            this.detail_skip_arrayval = detail_skip_array;
            console.log('this.detail_skip_arrayval');
            console.log(this.detail_skip_arrayval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "sourcedata", {
        set: /**
         * @param {?} sourcedata
         * @return {?}
         */
        function (sourcedata) {
            this.sourcedataval = sourcedata;
            console.log('this.sourcedataval');
            console.log(this.sourcedataval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "modify_header_array", {
        set: /**
         * @param {?} modify_header_array
         * @return {?}
         */
        function (modify_header_array) {
            this.modify_header_arrayval = modify_header_array;
            console.log('this.modify_header_arrayval');
            console.log(this.modify_header_arrayval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "deleteendpoint", {
        set: /**
         * @param {?} deleteendpointval
         * @return {?}
         */
        function (deleteendpointval) {
            this.deleteendpointval = deleteendpointval;
            console.log('this.deleteendpointval');
            console.log(this.deleteendpointval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "updateendpoint", {
        set: /**
         * @param {?} updateendpoint
         * @return {?}
         */
        function (updateendpoint) {
            this.updateendpointval = updateendpoint;
            console.log('this.updateendpointval');
            console.log(this.updateendpointval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "apiurl", {
        set: /**
         * @param {?} apiurl
         * @return {?}
         */
        function (apiurl) {
            this.apiurlval = apiurl;
            console.log('this.apiurlval');
            console.log(this.apiurlval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "jwttoken", {
        set: /**
         * @param {?} jwttoken
         * @return {?}
         */
        function (jwttoken) {
            this.jwttokenval = jwttoken;
            console.log('this.jwttokenval');
            console.log(this.jwttokenval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "statusarr", {
        set: /**
         * @param {?} statusarr
         * @return {?}
         */
        function (statusarr) {
            this.statusarrval = statusarr;
            console.log('this.statusarrval');
            console.log(this.statusarrval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "emailarray", {
        set: /**
         * @param {?} emailarray
         * @return {?}
         */
        function (emailarray) {
            this.emailarrayval = emailarray;
            console.log('this.emailarrayval');
            console.log(this.emailarrayval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "editroute", {
        set: /**
         * @param {?} editroute
         * @return {?}
         */
        function (editroute) {
            console.log('editroute');
            console.log(editroute);
            this.editrouteval = editroute;
            console.log('this.editrouteval');
            console.log(this.editrouteval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingComponent.prototype, "preview_artistxp", {
        /* artistxp preview start */
        set: /* artistxp preview start */
        /**
         * @param {?} flug
         * @return {?}
         */
        function (flug) {
            this.previewFlug = true;
        },
        enumerable: true,
        configurable: true
    });
    /*@Directive({
      selector: '[Listing]'
    })*/
    /*@Directive({
        selector: '[Listing]'
      })*/
    /**
     * @param {?} val
     * @return {?}
     */
    ListingComponent.prototype.inputblur = /*@Directive({
        selector: '[Listing]'
      })*/
    /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        console.log('on blur .....');
        this.myForm.controls[val].markAsUntouched();
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.search_settingsval != null && this.search_settingsval.search != null && this.search_settingsval.search != '') {
            console.log('----------------');
            /** @type {?} */
            var source = void 0;
            /** @type {?} */
            var condition = {};
            source = {
                source: this.date_search_sourceval,
                condition: condition
            };
            /** @type {?} */
            var link = this.apiurlval + '' + this.date_search_endpointval;
            this._apiService.postSearch(link, this.jwttokenval, source).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                console.log(res);
                _this.result = res;
                console.log(_this.result);
                _this.preresult = _this.result.res;
                console.log(_this.preresult);
            }));
        }
        // this._service.success(this.columns[0].date,'dndnnd',this.options);
        /* this.stateGroupOptions = this.myControl.valueChanges
             .pipe(
                 startWith(''),
                 map(value => this._filterGroup(value))
             );*/
        this.stateGroup = this.myControl.valueChanges
            .pipe(startWith(''), map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this._filter(value); })));
        /*const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.field.type]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    */
        this.x = this.datasourceval;
        /** @type {?} */
        var x = this.x;
        /** @type {?} */
        var temp = [];
        /** @type {?} */
        var keys = x[0];
        temp = Object.keys(keys); /*by Object.keys() we can find the fieldnames(or keys) in an object, i.e, in temp object field names are saved*/
        /*by Object.keys() we can find the fieldnames(or keys) in an object, i.e, in temp object field names are saved*/
        /** @type {?} */
        var coldef_list = [];
        /** @type {?} */
        var header_list = [];
        for (var i = 0; i < temp.length; i++) {
            coldef_list.push(temp[i].replace(/\s/g, "_")); /*to replace spaces in field name by "_", we use "replace(/\s/g, "_")"*/
            header_list.push(temp[i]);
        }
        //coldef_list.push('Actions');
        //header_list.push('Actions')
        console.log('coldef_list', coldef_list);
        console.log('header_list', header_list);
        var _loop_1 = function (i) {
            /** @type {?} */
            var ff = "row." + coldef_list[i];
            tt = { columnDef: "" + coldef_list[i], header: "" + header_list[i].replace(/_/g, " "), cell: (/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return eval(ff); }), objlength: header_list.length };
            // console.log('tt.columnDef');
            // console.log(tt.columnDef);
            for (var b in this_1.modify_header_arrayval) {
                if (b == tt.header)
                    tt.header = this_1.modify_header_arrayval[b];
            }
            if (this_1.skipval.indexOf(tt.columnDef) == -1)
                this_1.columns.push(tt);
        };
        var this_1 = this, tt;
        for (var i = 0; i < coldef_list.length; i++) {
            _loop_1(i);
        }
        /** @type {?} */
        var displayedcols = this.columns.map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.columnDef; }));
        displayedcols.push('Actions');
        this.displayedColumns = displayedcols;
        this.displayedColumns.unshift('select'); /*adds select column in table by unshift function*/
        /*adds select column in table by unshift function*/
        /** @type {?} */
        var data_list = [];
        for (var i = 0; i < this.x.length; i++) {
            data_list.push(this.createData(x[i]));
        }
        this.olddata = data_list;
        console.log(data_list);
        this.dataSource = new MatTableDataSource(data_list);
        this.selection = new SelectionModel(true, []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.onSubmit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var x;
        this.errormg = '';
        /** @type {?} */
        var data = this.myForm.value;
        console.log('data');
        console.log(data);
        console.log(this.myForm.valid);
        for (x in this.myForm.controls) {
            this.myForm.controls[x].markAsTouched();
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    ListingComponent.prototype.dateSearch = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var _this = this;
        console.log("start date");
        console.log(this.start_date);
        console.log(this.end_date);
        /** @type {?} */
        var sd = moment(this.start_date).unix();
        /** @type {?} */
        var ed = moment(this.end_date).unix();
        console.log(moment(this.start_date).unix());
        console.log(moment(this.end_date).unix());
        console.log(new Date(this.end_date).getTime());
        /** @type {?} */
        var link = this.apiurlval + '' + this.date_search_endpointval;
        console.log(link);
        if (moment(this.end_date).unix() != null && moment(this.start_date).unix() != null) {
            /** @type {?} */
            var source = void 0;
            /** @type {?} */
            var condition = void 0;
            condition = {};
            condition[val] = {
                $lte: new Date(this.end_date).getTime(),
                $gte: new Date(this.start_date).getTime(),
            };
            this.dateSearch_condition = {};
            this.dateSearch_condition = condition;
            /** @type {?} */
            var conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
            source = {
                source: this.date_search_sourceval,
                condition: conditionobj,
            };
            console.log(source);
            this._apiService.postSearch(link, this.jwttokenval, source).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                console.log(res);
                /** @type {?} */
                var result = {};
                result = res;
                console.log(result.res);
                _this.dataSource = new MatTableDataSource(result.res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            }));
            /*this._http.post(link, {source:this.date_search_sourceval,
              condition: {
                'created_at': {
                  $lte: new Date(this.end_date).getTime(),
                  $gte: new Date(this.start_date).getTime(),
                }
              },token: this.jwttokenval,
            }).subscribe( res =>{
              let result: any ={};
              result = res;
              console.log("ok");
              console.log(res);
              console.log(result.res);
              let newdata = result.res;
              this.dataSource = new MatTableDataSource(result.res);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })*/
        }
        else
            console.log("error");
    };
    /**
     * @param {?} value
     * @param {?} type
     * @return {?}
     */
    ListingComponent.prototype.selectSearch = /**
     * @param {?} value
     * @param {?} type
     * @return {?}
     */
    function (value, type) {
        var _this = this;
        console.log('type');
        console.log(type);
        /** @type {?} */
        var link = this.apiurlval + '' + this.date_search_endpointval;
        console.log(link);
        /** @type {?} */
        var source;
        /** @type {?} */
        var condition;
        condition = {};
        condition[type.field] = value;
        this.selectSearch_condition = {};
        this.selectSearch_condition = condition;
        /** @type {?} */
        var conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
        source = {
            source: this.date_search_sourceval,
            condition: conditionobj
        };
        if (value != null) {
            this._apiService.postSearch(link, this.jwttokenval, source).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                console.log(res);
                /** @type {?} */
                var result = {};
                result = res;
                console.log("ok");
                console.log(res);
                console.log(result.res);
                /** @type {?} */
                var newdata = result.res;
                _this.dataSource = new MatTableDataSource(result.res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            }));
        }
        else {
            console.log('oops');
        }
        console.log("error");
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ListingComponent.prototype.autosearchfunction = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        console.log(value);
        /** @type {?} */
        var val = this.autosearch[value];
        console.log(val);
        /** @type {?} */
        var source;
        /** @type {?} */
        var condition = {};
        if (this.autosearch[value].length > 0 && { $or: [this.autosearch[value].toLowerCase(), this.autosearch[value].toUpperCase(), this.autosearch[value]] })
            condition[value + '_regex'] = val;
        this.autoSearch_condition = {};
        this.autoSearch_condition = condition;
        /** @type {?} */
        var conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
        source = {
            source: this.date_search_sourceval,
            condition: conditionobj
        };
        /** @type {?} */
        var link = this.apiurlval + '' + this.date_search_endpointval;
        this._apiService.postSearch(link, this.jwttokenval, source).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            console.log(res);
            // let result:any={};
            _this.result = res;
            console.log(_this.result);
            console.log(_this.result.res);
            _this.dataSource = new MatTableDataSource(_this.result.res);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ListingComponent.prototype.textsearchfunction = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        console.log('value');
        console.log(value);
        console.log(value.toLowerCase());
        console.log(this.tsearch[value]);
        /** @type {?} */
        var link = this.apiurlval + '' + this.date_search_endpointval;
        console.log(link);
        /** @type {?} */
        var source;
        /** @type {?} */
        var condition = {};
        //condition = {};
        /** @type {?} */
        var val = this.tsearch[value].toLowerCase();
        // condition={$or:[this.tsearch[value].toLowerCase(),this.tsearch[value].toUpperCase()]};
        if (this.tsearch[value].length > 1 && { $or: [this.tsearch[value].toLowerCase(), this.tsearch[value].toUpperCase()] })
            condition[value + '_regex'] = val;
        this.textSearch_condition = {};
        this.textSearch_condition = condition;
        //condition[value]="/222/";
        //condition={email:{$regx:'/222/i'}};
        /** @type {?} */
        var conditionobj = Object.assign({}, this.textSearch_condition, this.dateSearch_condition, this.autoSearch_condition, this.selectSearch_condition);
        source = {
            source: this.date_search_sourceval,
            condition: conditionobj
        };
        console.log('source');
        console.log(source);
        //add loader
        this.loading = true;
        if (value != null) {
            this._apiService.postSearch(link, this.jwttokenval, source).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                console.log(res);
                /** @type {?} */
                var result = {};
                result = res;
                //close loader
                _this.loading = false;
                console.log("ok");
                console.log(res);
                console.log(result.res);
                /** @type {?} */
                var newdata = result.res;
                _this.dataSource = new MatTableDataSource(result.res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            }));
        }
        else {
            console.log('oops');
        }
        console.log("error");
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    ListingComponent.prototype._filter = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var filterValue = value.toLowerCase();
        return this.searchListval.filter((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.toLowerCase().includes(filterValue); }));
    };
    /*private _filterGroup(value: string): StateGroup[] {
     /!* if (value) {
        return this.searchListval
            .map(group => ({names: _filter(group.names, value)}))
            .filter(group => group.names.length > 0);
      }
  
      return this.searchListval;*!/
      const filterValue = value.toLowerCase();
  
      return this.searchListval.filter(option => option.toLowerCase().includes(filterValue));
    }*/
    /*private _filterGroup(value: string): StateGroup[] {
       /!* if (value) {
          return this.searchListval
              .map(group => ({names: _filter(group.names, value)}))
              .filter(group => group.names.length > 0);
        }
    
        return this.searchListval;*!/
        const filterValue = value.toLowerCase();
    
        return this.searchListval.filter(option => option.toLowerCase().includes(filterValue));
      }*/
    /**
     * @param {?} val
     * @return {?}
     */
    ListingComponent.prototype.getstatus = /*private _filterGroup(value: string): StateGroup[] {
       /!* if (value) {
          return this.searchListval
              .map(group => ({names: _filter(group.names, value)}))
              .filter(group => group.names.length > 0);
        }
    
        return this.searchListval;*!/
        const filterValue = value.toLowerCase();
    
        return this.searchListval.filter(option => option.toLowerCase().includes(filterValue));
      }*/
    /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        // console.log('val');
        // console.log(val);
        for (var b in this.statusarrval) {
            if (this.statusarrval[b].val == val)
                return this.statusarrval[b].name;
            // console.log(this.statusarrval[b].name);
        }
        return "N/A";
    };
    /**
     * @param {?} val
     * @return {?}
     */
    ListingComponent.prototype.hi = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        // console.log('hi  val');
        // console.log(val);
        if (val.shatterblok_agreement_date != null && val.audiodeadline_agreement_date == null) {
            // console.log('shatter blok');
            this.sh = true;
            this.aud = false;
        }
        if (val.shatterblok_agreement_date != null && val.audiodeadline_agreement_date != null) {
            this.sh = true;
            this.aud = true;
        }
        if (val.shatterblok_agreement_date == null && val.audiodeadline_agreement_date == null) {
            this.sh = false;
            this.aud = false;
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    ListingComponent.prototype.grapurl = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        //  for all row checking
        // console.log(val)
        if (val != null) {
            this.art = true;
            this.aud2 = true;
        }
        if (val == null) {
            this.art = false;
            this.aud2 = false;
        }
        // console.log(this.sh);
        // console.log(this.aud);
    };
    /**
     * @param {?} row
     * @param {?} val
     * @return {?}
     */
    ListingComponent.prototype.copyText = /**
     * @param {?} row
     * @param {?} val
     * @return {?}
     */
    function (row, val) {
        console.log('row in copyText');
        console.log(row);
        console.log('val in copyText');
        console.log(val);
        /** @type {?} */
        var fullurl = val + '' + row;
        console.log(fullurl);
        /** @type {?} */
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = fullurl;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    };
    /**
     * @param {?} val
     * @param {?} url
     * @return {?}
     */
    ListingComponent.prototype.clickurl = /**
     * @param {?} val
     * @param {?} url
     * @return {?}
     */
    function (val, url) {
        /** @type {?} */
        var i;
        console.log('ok');
        console.log(val);
        console.log(val._id);
        console.log(url);
        console.log(url + '' + val._id + '' + this.pdf_link_val);
        /** @type {?} */
        var link = url + '' + val._id + '' + this.pdf_link_val;
        window.open(link, "_blank");
    };
    /** Whether the number of selected elements matches the total number of rows. */
    /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    ListingComponent.prototype.isAllSelected = /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var numSelected = this.selection.selected.length;
        /** @type {?} */
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    ListingComponent.prototype.masterToggle = /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.selection.select(row); }));
    };
    /** The label for the checkbox on the passed row */
    /**
     * The label for the checkbox on the passed row
     * @param {?=} row
     * @return {?}
     */
    ListingComponent.prototype.checkboxLabel = /**
     * The label for the checkbox on the passed row
     * @param {?=} row
     * @return {?}
     */
    function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    /**
     * @param {?} point
     * @return {?}
     */
    ListingComponent.prototype.createData = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        /** @type {?} */
        var data = {};
        Object.keys(point).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            data[key.replace(/\s/g, "_")] = point[key];
        }));
        return data;
    };
    /**
     * @param {?} filterValue
     * @return {?}
     */
    ListingComponent.prototype.applyFilter = /**
     * @param {?} filterValue
     * @return {?}
     */
    function (filterValue) {
        console.log(filterValue);
        console.log(this.dataSource);
        // console.log(this.dataSource[name])
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    /*applyFilter1(filterValue: string, val: any) {
      console.log(filterValue);
      console.log(val.value);
      let value= new MatTableDataSource(val.value);
  
      value.filter = filterValue.trim().toLowerCase();
      console.log(value);
      /!* this.dataSource.filterPredicate = function(data, filter: string): boolean {
        // return data.name.toLowerCase().includes(filter);
      };
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }*!/
    }*/
    /*applyFilter1(filterValue: string, val: any) {
        console.log(filterValue);
        console.log(val.value);
        let value= new MatTableDataSource(val.value);
    
        value.filter = filterValue.trim().toLowerCase();
        console.log(value);
        /!* this.dataSource.filterPredicate = function(data, filter: string): boolean {
          // return data.name.toLowerCase().includes(filter);
        };
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }*!/
      }*/
    /**
     * @param {?} col_name
     * @param {?} row
     * @return {?}
     */
    ListingComponent.prototype.styleCell = /*applyFilter1(filterValue: string, val: any) {
        console.log(filterValue);
        console.log(val.value);
        let value= new MatTableDataSource(val.value);
    
        value.filter = filterValue.trim().toLowerCase();
        console.log(value);
        /!* this.dataSource.filterPredicate = function(data, filter: string): boolean {
          // return data.name.toLowerCase().includes(filter);
        };
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }*!/
      }*/
    /**
     * @param {?} col_name
     * @param {?} row
     * @return {?}
     */
    function (col_name, row) {
        /*
         if (col_name['columnDef']=='progress' && row['progress']=='100'){
         return {'color' : 'red'}
         } else {
         return {}
         }
         */
        return {};
    };
    /**
     * @param {?} data1
     * @return {?}
     */
    ListingComponent.prototype.viewdata = /**
     * @param {?} data1
     * @return {?}
     */
    function (data1) {
        /** @type {?} */
        var data;
        data = data1;
        /** @type {?} */
        var data2 = [];
        console.log('data');
        console.log(data);
        for (var key in data) {
            /** @type {?} */
            var flagk = '';
            if (data.hasOwnProperty(key)) {
                console.log(key + " -> " + data[key] + "--->" + typeof (data[key]));
                if (typeof (data[key]) == 'boolean') {
                    if (data[key] == true)
                        data[key] = 'Yes';
                    if (data[key] == false)
                        data[key] = 'No';
                }
                if (typeof (data[key]) == 'object') {
                    /** @type {?} */
                    var tempdata = [];
                    for (var k in data[key]) {
                        console.log('key');
                        console.log(key);
                        console.log(this.detail_datatypeval);
                        for (var p in this.detail_datatypeval) {
                            console.log('p');
                            console.log(p);
                            console.log(key);
                            console.log(data[key][k]);
                            if (this.detail_datatypeval[p].key == key && this.detail_datatypeval[p].value == 'image') {
                                /** @type {?} */
                                var imgval = this.detail_datatypeval[p].fileurl + data[key][k].replace(/'/g, '');
                                console.log('imgval');
                                console.log('imgval');
                                console.log(imgval);
                                console.log(data[key][k].replace(/'/g, ''));
                                tempdata.push("<img mat-card-image src=" + imgval + "><br/>");
                                // tempdata.push("<span>"+data[key][k]+"</span><br/>")
                            }
                            if (this.detail_datatypeval[p].key == key && this.detail_datatypeval[p].value != 'image') {
                                //tempdata.push("<img mat-card-image src="+data[key][k]+"><br/>")
                                tempdata.push("<span>" + data[key][k] + "</span><br/>");
                            }
                        }
                    }
                    data[key] = tempdata;
                }
            }
        }
        console.log('data');
        console.log(data);
        for (var n in data) {
            if (data[n] != null && data[n] != '') {
                data2[n] = data[n];
            }
        }
        for (var v in this.detail_skip_arrayval) {
            //data2[this.detail_skip_arrayval[v]]='';
            delete data2[this.detail_skip_arrayval[v]];
            console.log('this.detail_skip_arrayval[v]');
            console.log(this.detail_skip_arrayval[v]);
        }
        /** @type {?} */
        var res = Object.entries(data2);
        console.log('this.detail_skip_array');
        console.log(this.detail_skip_arrayval);
        console.log(this.detail_datatypeval);
        console.log('res');
        console.log(res);
        /** @type {?} */
        var dialogRef = this.dialog.open(Confirmdialog, {
            height: 'auto',
            panelClass: 'custom-modalbox',
            data: { isconfirmation: false, data: res }
        });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ListingComponent.prototype.managestatus = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        console.log('data');
        console.log(data);
        /** @type {?} */
        var bs = this.bottomSheet.open(BottomSheet, { panelClass: 'custom-bottomsheet', data: { items: this.statusarrval } });
        bs.afterDismissed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            console.log('The bottom sheet was closed');
            console.log(result);
            if (result != null) {
                data.status = result.val;
                data.id = data._id;
                _this._apiService.togglestatus(_this.apiurlval + 'statusupdate', data, _this.jwttokenval, _this.sourcedataval).subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    /** @type {?} */
                    var result = {};
                    result = res;
                    if (result.status == 'success') {
                        for (var c in _this.olddata) {
                            //this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
                            if (_this.olddata[c]._id == data._id) {
                                console.log('in data update');
                                console.log(data);
                                _this.olddata[c].status = data.status;
                            }
                        }
                        _this.dataSource = new MatTableDataSource(_this.olddata);
                        _this.selection = new SelectionModel(true, []);
                        _this.dataSource.paginator = _this.paginator;
                        _this.dataSource.sort = _this.sort;
                        /** @type {?} */
                        var dialogRef = _this.dialog.open(Confirmdialog, {
                            panelClass: 'custom-modalbox',
                            data: { message: 'Status updated successfully!!', isconfirmation: false }
                        });
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log('Oooops!');
                }));
            }
            //this.animal = result;
        }));
    };
    // for tree view in modal
    // for tree view in modal
    /**
     * @param {?} data
     * @return {?}
     */
    ListingComponent.prototype.custombuttonfunc = 
    // for tree view in modal
    /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        console.log('data');
        console.log(data); // row data
        console.log(this.custombuttonval); // object from where the library has been used
        // object from where the library has been used
        /** @type {?} */
        var unsafeurl = this.custombuttonval.url;
        for (var b in this.custombuttonval.fields) {
            unsafeurl = unsafeurl + '/' + data[this.custombuttonval.fields[b]];
        }
        console.log('unsafeurl');
        console.log(unsafeurl);
        unsafeurl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeurl); //for sanitizing the url for security, otherwise it won't be able to show the page in iframe, hence modal
        //for sanitizing the url for security, otherwise it won't be able to show the page in iframe, hence modal
        /** @type {?} */
        var dialogRef = this.dialog.open(Confirmdialog, {
            // for opening the modal
            height: 'auto',
            panelClass: 'custom-data-modal',
            data: { isconfirmation: false, data: [{ data: data, customdata: unsafeurl }] }
        });
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.managestatusmultiple = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var ids = [];
        /** @type {?} */
        var c;
        for (c in this.selection.selected) {
            ids.push(this.selection.selected[c]._id);
        }
        console.log('ids');
        console.log(ids);
        //console.log('data');
        //console.log(data);
        /** @type {?} */
        var bs = this.bottomSheet.open(BottomSheet, { data: { items: this.statusarrval } });
        bs.afterDismissed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            console.log('The bottom sheet was closed');
            console.log(result);
            if (result != null) {
                //data.status = result.val;
                //data.id = data._id;
                /** @type {?} */
                var newstatus_1 = result.val;
                _this._apiService.togglestatusmany(_this.apiurlval + 'statusupdate', ids, result.val, _this.jwttokenval, _this.sourcedataval).subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    /** @type {?} */
                    var result = {};
                    result = res;
                    if (result.status == 'success') {
                        for (var c_1 in _this.olddata) {
                            //this.olddata = this.olddata.filter(olddata => olddata._id != ids[c]);
                            if (ids.indexOf(_this.olddata[c_1]._id) > -1) {
                                console.log('in data update');
                                //console.log(data);
                                _this.olddata[c_1].status = newstatus_1;
                            }
                        }
                        _this.dataSource = new MatTableDataSource(_this.olddata);
                        _this.selection = new SelectionModel(true, []);
                        _this.dataSource.paginator = _this.paginator;
                        _this.dataSource.sort = _this.sort;
                        /** @type {?} */
                        var dialogRef = _this.dialog.open(Confirmdialog, {
                            panelClass: 'custom-modalbox',
                            data: { message: 'Status updated successfully!!', isconfirmation: false }
                        });
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log('Oooops!');
                }));
            }
            //this.animal = result;
        }));
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.deletemultiple = /**
     * @return {?}
     */
    function () {
        var _this = this;
        console.log('this.selection.selected.length');
        console.log(this.selection.selected.length);
        console.log(this.selection);
        console.log(this.selection.selected);
        /** @type {?} */
        var dialogRef = this.dialog.open(Confirmdialog, {
            panelClass: 'custom-modalbox',
            data: { message: 'Are you sure you want to delete the selected records?' }
        });
        /** @type {?} */
        var ids = [];
        /** @type {?} */
        var c;
        for (c in this.selection.selected) {
            ids.push(this.selection.selected[c]._id);
        }
        console.log('ids');
        console.log(ids);
        dialogRef.afterClosed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result == 'yes') {
                _this._apiService.deteManyData(_this.apiurlval + _this.deleteendpointval, ids, _this.jwttokenval, _this.sourcedataval).subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    /** @type {?} */
                    var result = {};
                    result = res;
                    if (result.status == 'success') {
                        var _loop_2 = function (c_2) {
                            _this.olddata = _this.olddata.filter((/**
                             * @param {?} olddata
                             * @return {?}
                             */
                            function (olddata) { return olddata._id != ids[c_2]; }));
                        };
                        for (var c_2 in ids) {
                            _loop_2(c_2);
                        }
                        console.log('this.olddata');
                        console.log(_this.olddata);
                        _this.dataSource = new MatTableDataSource(_this.olddata);
                        _this.selection = new SelectionModel(true, []);
                        _this.dataSource.paginator = _this.paginator;
                        _this.dataSource.sort = _this.sort;
                        /** @type {?} */
                        var dialogRef_1 = _this.dialog.open(Confirmdialog, {
                            panelClass: 'custom-modalbox',
                            data: { message: 'Record(s)  deleted successfully !!', isconfirmation: false }
                        });
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log('Oooops!');
                }));
            }
            //this.animal = result;
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ListingComponent.prototype.deletedata = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        //alert(5);
        //this._apiService.deteOneData(this.apiurlval+this.deleteendpointval,data,this.jwttokenval);
        console.log('data 889 ---');
        console.log(data);
        console.log('jwttokenval');
        console.log(this.jwttokenval);
        /** @type {?} */
        var dialogRef = this.dialog.open(Confirmdialog, {
            panelClass: 'custom-modalbox',
            height: 'auto',
            data: { message: 'Are you sure to delete this record ??' }
        });
        dialogRef.afterClosed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result == 'yes') {
                _this._apiService.deteOneData(_this.apiurlval + _this.deleteendpointval, data, _this.jwttokenval, _this.sourcedataval).subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    /** @type {?} */
                    var result = {};
                    result = res;
                    if (result.status == 'success') {
                        console.log('this.olddata');
                        console.log(_this.olddata);
                        console.log(_this.olddata._id);
                        _this.olddata = _this.olddata.filter((/**
                         * @param {?} olddata
                         * @return {?}
                         */
                        function (olddata) { return olddata._id != data._id; }));
                        _this.dataSource = new MatTableDataSource(_this.olddata);
                        _this.selection = new SelectionModel(true, []);
                        _this.dataSource.paginator = _this.paginator;
                        _this.dataSource.sort = _this.sort;
                        /** @type {?} */
                        var dialogRef_2 = _this.dialog.open(Confirmdialog, {
                            panelClass: 'custom-modalbox',
                            data: { message: 'Record  deleted successfully !!', isconfirmation: false }
                        });
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log('Oooops!');
                }));
            }
            //this.animal = result;
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ListingComponent.prototype.editdata = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        console.log('data');
        console.log(data);
        console.log(this.editrouteval);
        console.log(this.editrouteval + data._id);
        console.log(this.jwttokenval);
        this.router.navigate([this.editrouteval, data._id]);
        //this.na
    };
    /* artistxp preview button click function start */
    /* artistxp preview button click function start */
    /**
     * @param {?} singleData
     * @return {?}
     */
    ListingComponent.prototype.artistxpPreview = /* artistxp preview button click function start */
    /**
     * @param {?} singleData
     * @return {?}
     */
    function (singleData) {
        var _this = this;
        /** @type {?} */
        var link = 'http://developmentapi.audiodeadline.com:3090/' + 'datalist';
        /**
         * **** not completed *****
         * @type {?}
         */
        var data = { "source": "blockchainuser_view", "condition": { "posts_id_object": singleData._id }, "token": this.jwttokenval };
        /******** not completed *****/
        this._apiService.postData(link, data).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var restlt = response;
            /* open dialog */
            /** @type {?} */
            var dialogRef = _this.dialog.open(Confirmdialog, {
                panelClass: 'custom-modalbox-artistxp-preview',
                height: 'auto',
                data: { preview: true, previewData: restlt }
            });
        }));
    };
    ListingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-listing',
                    template: "<div class=\"container\">\n\n\n  <mat-card>\n    <mat-toolbar-row class=\"searchbar\" style=\"display: flex!important; justify-content: space-between!important;\">\n    <mat-form-field class=\"searchdiv\">\n\n      <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n    </mat-form-field>\n\n      <span  *ngIf=\"search_settingsval !=null && search_settingsval.textsearch != null \">\n    <mat-form-field *ngFor=\"let item of search_settingsval.textsearch\" class=\"searchdiv\">\n\n      <input matInput (change)=\"textsearchfunction(item.field)\" (keyup)=\"textsearchfunction(item.field)\" [(ngModel)]='tsearch[item.field]' placeholder=\"{{item.label}}\">\n      <span matPrefix><i class=\"material-icons searchicon\" >\n        search\n      </i> &nbsp;</span>\n    </mat-form-field>\n      </span>\n\n<span *ngIf=\"search_settingsval !=null && search_settingsval.search != null \">\n  <mat-form-field  *ngFor=\"let item of search_settingsval.search\">\n    <input type=\"text\" placeholder=\"{{item.label}}\" matInput [(ngModel)]=\"autosearch[item.field]\" [matAutocomplete]=\"auto\">\n    <mat-autocomplete  #auto=\"matAutocomplete\" >\n       <mat-option *ngFor=\"let option of result.res | async\" [value]=\"option[item.field]\" (click)=\"autosearchfunction(item.field)\">\n        {{option[item.field]}}\n      </mat-option>\n    </mat-autocomplete>\n  </mat-form-field>\n</span>\n\n\n\n<!--      <span *ngIf=\"search_settingsval !=null && search_settingsval != null \">\n\n      <mat-form-field *ngFor=\"let item of search_settingsval.search\">\n        <mat-label>{{item.label}}</mat-label>\n        <mat-select>\n          <mat-option *ngFor=\"let status of preresult\" [value]=\"status\" (click)=\"autosearchfunction(status.email)\">\n            {{status.email}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      </span>-->\n    <!--  <ng-container  *ngIf=\"search_settingsval !=null && search_settingsval.textsearch != null \">\n&lt;!&ndash;        <span *ngFor=\"let status of this.search_settingsval.textsearch\">&ndash;&gt;\n&lt;!&ndash;        <mat-form-field *ngFor=\"let statusval of status.value\">&ndash;&gt;\n        <mat-form-field *ngFor=\"let status of this.search_settingsval.textsearch\">\n              <input matInput (keyup)=\"applyFilter1($event.target.value, status)\" placeholder=\"{{status.label}}\">\n        </mat-form-field>\n&lt;!&ndash;              </span>&ndash;&gt;\n      </ng-container>-->\n\n\n      <ng-container  *ngIf=\"search_settingsval !=null && search_settingsval.selectsearch != null \">\n        <mat-form-field *ngFor=\"let status of this.search_settingsval.selectsearch\">\n          <mat-label>{{status.label}}</mat-label>\n          <mat-select>\n            <mat-option *ngFor=\"let statusval of status.values\" [value]=\"statusval\" (click)=\"selectSearch(statusval.val, status)\">\n              {{statusval.name}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n      </ng-container>\n\n\n      <ng-container *ngIf=\"date_search_endpointval !=null && date_search_sourceval != null && search_settingsval.datesearch != null \">\n        <span *ngFor=\"let status of this.search_settingsval.datesearch\">\n        <mat-form-field >\n          <input matInput [matDatepicker]=\"picker\"autocomplete=\"off\"  placeholder=\"{{status.startdatelabel}}\"  [(ngModel)]=\"start_date\" >\n          <mat-datepicker-toggle matSuffix [for]=\"picker\" ></mat-datepicker-toggle>\n          <mat-datepicker #picker></mat-datepicker>\n        </mat-form-field>\n        <mat-form-field>\n          <input matInput [matDatepicker]=\"picker1\" autocomplete=\"off\" placeholder=\"{{status.enddatelabel}}\" [(ngModel)]=\"end_date\" >\n          <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\n          <mat-datepicker #picker1 ></mat-datepicker>\n        </mat-form-field>\n        <button mat-raised-button color=\"primary\" class=\"add_button\" style=\"margin: 0!important; margin-left: 10px!important; \" (click)=\"dateSearch(status.field)\">{{status.submit}}</button>\n      </span>\n      </ng-container>\n\n\n\n      <span *ngIf=\"click_to_add_ananother_pageval !=null\">\n        <button mat-raised-button color=\"primary\" class=\"add_button\" style=\"margin: 0!important; margin-left: 10px!important; \" [routerLink]=\"click_to_add_ananother_pageval\" >Add</button>\n      </span>\n    </mat-toolbar-row>\n\n\n\n    <ng-container *ngIf=\"selection.selected.length!=null && selection.selected.length>0\">\n      <button mat-raised-button (click)=\"deletemultiple()\"> Delete </button>\n      <button mat-raised-button (click)=\"managestatusmultiple()\"> Update Status </button>\n    </ng-container>\n\n\n\n    <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"select\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\"\n                        [checked]=\"selection.hasValue() && isAllSelected()\"\n                        [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n          </mat-checkbox>\n        </th>\n        <td mat-cell *matCellDef=\"let row\" data-label=\"select\">\n          <mat-checkbox (click)=\"$event.stopPropagation()\"\n                        (change)=\"$event ? selection.toggle(row) : null\"\n                        [checked]=\"selection.isSelected(row)\">\n          </mat-checkbox>\n        </td>\n      </ng-container>\n\n      <ng-container *ngFor=\"let column of columns\" [matColumnDef]=\"column.columnDef\" >\n        <th mat-header-cell *matHeaderCellDef mat-sort-header class=\"th-header-center\">{{column.header}}</th>\n        <td mat-cell *matCellDef=\"let row\" [ngStyle]=\"styleCell(column,row)\" data-title=\"{{column.header}}\"   class=\"td-cell-center\">\n          <span *ngIf=\"column.columnDef=='status' \">{{ getstatus([column.cell(row)]) }} {{hi(row)}}</span>\n          <span *ngIf=\"column.columnDef!='status' \">{{ column.cell(row) }}</span>\n          <span *ngIf=\"column.columnDef=='grab_url && grab_linkval!=null && grab_linkval[0]!=null' \">{{grapurl(row[this.grab_linkval[0].field_name])}}</span>\n          <br>\n\n<!--          <span *ngIf=\"sh==true\">-->\n            <span *ngIf=\"column.columnDef=='contractssigned' && sh==true && urlval !=null\" class=\"cursor\">\n              <i title=\"{{urlval[0].label}}\" (click)=\"clickurl(row,urlval[0].url)\" class=\"material-icons\">cloud_download</i>\n            </span>\n<!--          </span>-->\n<!--          <span *ngIf=\"aud==true\">-->\n            <span *ngIf=\"column.columnDef=='contractssigned' && aud==true  && urlval !=null\">\n              <i title=\"{{urlval[1].label}}\" (click)=\"clickurl(row,urlval[1].url)\" class=\"material-icons\">cloud_download</i>\n            </span>\n\n\n<!--// for grap url//-->\n\n\n\n          <span *ngIf=\" grab_linkval!=null && grab_linkval[0]!=null && column.columnDef==[grab_linkval[0].col_name]\" class=\"cursor\">\n              <button mat-button (click)=\"copyText(row[grab_linkval[0].field_name],grab_linkval[1].url)\">{{grab_linkval[1].label}}</button>\n            </span>\n          <br>\n          <!--          </span>-->\n          <!--          <span *ngIf=\"aud==true\">-->\n          <span *ngIf=\"grab_linkval!=null && grab_linkval[0]!=null &&column.columnDef== [grab_linkval[0].col_name]\">\n              <button mat-button (click)=\"copyText(row[grab_linkval[0].field_name],grab_linkval[2].url)\">{{grab_linkval[2].label}}</button>\n            </span>\n\n<!--          //grap url end//-->\n\n\n<!--          </span>-->\n          <!-- <span *ngIf=\"column.columnDef=='contractssigned' \">\n            <span *ngFor=\"let item of urlval\" class=\"cursor\">\n            <i title=\"{{item.label}}\" (click)=\"clickurl(row,item.url)\" class=\"material-icons\">cloud_download</i>\n          </span>\n          </span>-->\n        </td>\n      </ng-container>\n\n\n\n      <ng-container matColumnDef=\"Actions\"   >\n        <th mat-header-cell *matHeaderCellDef  class=\"th-header-center\">Actions</th>\n        <td (click)=\"$event.stopPropagation()\" mat-cell  *matCellDef=\"let row\" data-label=\"Actions\"  class=\"td-cell-center\">\n          <span *ngIf=\"selection.selected.length==null || selection.selected.length==0\">\n            <span class=\"cursor\" (click)=\"editdata(row)\" >\n              <i class=\"material-icons\">\n                edit\n              </i>\n            </span>\n\n            <!--For modern browsers-->\n            <span class=\"cursor\" (click)=\"deletedata(row)\" >\n              <i class=\"material-icons\">\n                delete_outline\n              </i>\n            </span>\n\n            <!--For modern browsers-->\n            <span class=\"cursor\" (click)=\"viewdata(row)\" >\n              <i class=\"material-icons\">\n                pageview\n              </i>\n            </span>\n\n            <!--For modern browsers-->\n            <span class=\"cursor\" (click)=\"managestatus(row)\" >\n              <i class=\"material-icons\">\n                toggle_off\n              </i>\n            </span>\n            <span *ngIf=\"custombuttonval!=null\" class=\"cursor treeclass\" (click)=\"custombuttonfunc(row)\" >\n              <i class=\"material-icons treeclass\">\n                toggle_off\n              </i>\n            </span>\n\n            <!-- artistxp preview start -->\n            <span *ngIf=\"previewFlug==true\" class=\"cursor treeclass\" (click)=\"artistxpPreview(row)\">\n              <i class=\"material-icons\">perm_media</i>\n            </span>\n            <!-- artistxp preview end -->\n\n          </span>\n\n        </td>\n      </ng-container>\n\n\n\n\n\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n\n    </table>\n\n    <mat-paginator [pageSizeOptions]=\"[5,10, 20, 50,100]\" showFirstLastButtons></mat-paginator>\n    <mat-spinner *ngIf=\"loading == true\" ></mat-spinner>\n\n    <br>\n\n\n   <!-- <form [formGroup]=\"stateForm\">\n      <mat-form-field>\n        <input type=\"text\" matInput placeholder=\"States Group\" formControlName=\"stateGroup\" required [matAutocomplete]=\"autoGroup\">\n        <mat-autocomplete #autoGroup=\"matAutocomplete\">\n          <mat-optgroup *ngFor=\"let group of stateGroupOptions | async\" [label]=\"group.letter\">\n            <mat-option *ngFor=\"let name of group.names\" [value]=\"name\">\n              {{name}}\n            </mat-option>\n          </mat-optgroup>\n        </mat-autocomplete>\n      </mat-form-field>\n    </form>-->\n\n    <!--<form class=\"example-form\">\n      <mat-form-field class=\"example-full-width\">\n        <input type=\"text\" placeholder=\"Select state\" aria-label=\"Number\" matInput [formControl]=\"myControl\" [matAutocomplete]=\"auto\">\n        <mat-autocomplete #auto=\"matAutocomplete\">\n          <mat-option *ngFor=\"let option of stateGroup | async\" [value]=\"option\">\n            {{option}}\n          </mat-option>\n        </mat-autocomplete>\n      </mat-form-field>\n    </form>\n-->\n\n  </mat-card>\n\n<!--\n  <mat-card>\n\n    <div class=\"example-container\">\n\n\n      <mat-card-content >\n        <mat-form-field class=\"form-group\">\n            <input (blur)=\"inputblur('email')\" matInput placeholder=\"email\" type=\"email\" [formControl]=\"myForm.controls['email']\" >\n            <mat-error  *ngIf=\"!myForm.controls['email'].valid && myForm.controls['email'].touched && issubmit==1\">email field can not be blank</mat-error>\n        </mat-form-field>\n\n        <mat-form-field class=\"form-group\">\n            <input (blur)=\"inputblur('password')\" matInput placeholder=\"Password\" type=\"password\" [formControl]=\"myForm.controls['password']\" >\n            <mat-error  *ngIf=\"!myForm.controls['password'].valid && myForm.controls['password'].touched && issubmit==1\">Password field can not be blank</mat-error>\n        </mat-form-field>\n\n            <button mat-button  (click)=\"onSubmit()\" class=\"s_getmyoffer_login_button\"  >Login</button>\n        </mat-card-content>\n\n\n    </div>\n\n  </mat-card>-->\n  <br>\n  <br>\n\n\n\n</div>\n\n",
                    styles: [".container{background:#fff}body{font-family:Roboto,Arial,sans-serif;margin:0;display:none!important}.basic-container{padding:30px}.version-info{font-size:8pt;float:right}table{width:100%}th.mat-sort-header-sorted{color:#000}.custom-modalbox{display:none}"]
                }] }
    ];
    /** @nocollapse */
    ListingComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: MatDialog },
        { type: MatBottomSheet },
        { type: FormBuilder },
        { type: Router },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: HttpClient },
        { type: DomSanitizer }
    ]; };
    ListingComponent.propDecorators = {
        search_settings: [{ type: Input }],
        click_to_add_ananother_page: [{ type: Input }],
        grab_link: [{ type: Input }],
        custombutton: [{ type: Input }],
        date_search_source: [{ type: Input }],
        date_search_endpoint: [{ type: Input }],
        url: [{ type: Input }],
        searchendpoint: [{ type: Input }],
        pdf_link: [{ type: Input }],
        searchList: [{ type: Input }],
        datasource: [{ type: Input }],
        skip: [{ type: Input }],
        detail_datatype: [{ type: Input }],
        detail_skip_array: [{ type: Input }],
        sourcedata: [{ type: Input }],
        modify_header_array: [{ type: Input }],
        deleteendpoint: [{ type: Input }],
        updateendpoint: [{ type: Input }],
        apiurl: [{ type: Input }],
        jwttoken: [{ type: Input }],
        statusarr: [{ type: Input }],
        emailarray: [{ type: Input }],
        editroute: [{ type: Input }],
        preview_artistxp: [{ type: Input }],
        sort: [{ type: ViewChild, args: [MatSort, { static: true },] }],
        paginator: [{ type: ViewChild, args: [MatPaginator, { static: true },] }]
    };
    return ListingComponent;
}());
export { ListingComponent };
if (false) {
    /** @type {?} */
    ListingComponent.prototype.myControl;
    /** @type {?} */
    ListingComponent.prototype.datasourceval;
    /** @type {?} */
    ListingComponent.prototype.search_settingsval;
    /** @type {?} */
    ListingComponent.prototype.click_to_add_ananother_pageval;
    /** @type {?} */
    ListingComponent.prototype.grab_linkval;
    /** @type {?} */
    ListingComponent.prototype.date_search_sourceval;
    /** @type {?} */
    ListingComponent.prototype.date_search_endpointval;
    /** @type {?} */
    ListingComponent.prototype.urlval;
    /** @type {?} */
    ListingComponent.prototype.searchendpointval;
    /** @type {?} */
    ListingComponent.prototype.searchListval;
    /** @type {?} */
    ListingComponent.prototype.pdf_link_val;
    /** @type {?} */
    ListingComponent.prototype.statusarrval;
    /** @type {?} */
    ListingComponent.prototype.skipval;
    /** @type {?} */
    ListingComponent.prototype.errormg;
    /** @type {?} */
    ListingComponent.prototype.jwttokenval;
    /** @type {?} */
    ListingComponent.prototype.detail_datatypeval;
    /** @type {?} */
    ListingComponent.prototype.detail_skip_arrayval;
    /** @type {?} */
    ListingComponent.prototype.deleteendpointval;
    /** @type {?} */
    ListingComponent.prototype.editrouteval;
    /** @type {?} */
    ListingComponent.prototype.apiurlval;
    /** @type {?} */
    ListingComponent.prototype.updateendpointval;
    /** @type {?} */
    ListingComponent.prototype.modify_header_arrayval;
    /** @type {?} */
    ListingComponent.prototype.selection;
    /** @type {?} */
    ListingComponent.prototype.sourcedataval;
    /** @type {?} */
    ListingComponent.prototype.emailarrayval;
    /** @type {?} */
    ListingComponent.prototype.columns;
    /** @type {?} */
    ListingComponent.prototype.olddata;
    /** @type {?} */
    ListingComponent.prototype.tsearch;
    /** @type {?} */
    ListingComponent.prototype.autosearch;
    /** @type {?} */
    ListingComponent.prototype.x;
    /** @type {?} */
    ListingComponent.prototype.custombuttonval;
    /** @type {?} */
    ListingComponent.prototype.result;
    /** @type {?} */
    ListingComponent.prototype.sh;
    /** @type {?} */
    ListingComponent.prototype.art;
    /** @type {?} */
    ListingComponent.prototype.aud2;
    /** @type {?} */
    ListingComponent.prototype.aud;
    /** @type {?} */
    ListingComponent.prototype.previewFlug;
    /** @type {?} */
    ListingComponent.prototype.stateGroups;
    /** @type {?} */
    ListingComponent.prototype.stateGroup;
    /** @type {?} */
    ListingComponent.prototype.displayedColumns;
    /** @type {?} */
    ListingComponent.prototype.datacolumns;
    /** @type {?} */
    ListingComponent.prototype.displayedColumnsheader;
    /** @type {?} */
    ListingComponent.prototype.formarray;
    /** @type {?} */
    ListingComponent.prototype.start_date;
    /** @type {?} */
    ListingComponent.prototype.dateSearch_condition;
    /** @type {?} */
    ListingComponent.prototype.selectSearch_condition;
    /** @type {?} */
    ListingComponent.prototype.autoSearch_condition;
    /** @type {?} */
    ListingComponent.prototype.textSearch_condition;
    /** @type {?} */
    ListingComponent.prototype.end_date;
    /** @type {?} */
    ListingComponent.prototype.i;
    /** @type {?} */
    ListingComponent.prototype.loading;
    /** @type {?} */
    ListingComponent.prototype.preresult;
    /** @type {?} */
    ListingComponent.prototype.dataSource;
    /** @type {?} */
    ListingComponent.prototype.sort;
    /** @type {?} */
    ListingComponent.prototype.paginator;
    /** @type {?} */
    ListingComponent.prototype.myForm;
    /** @type {?} */
    ListingComponent.prototype._apiService;
    /** @type {?} */
    ListingComponent.prototype.dialog;
    /**
     * @type {?}
     * @private
     */
    ListingComponent.prototype.bottomSheet;
    /** @type {?} */
    ListingComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    ListingComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    ListingComponent.prototype.resolver;
    /**
     * @type {?}
     * @private
     */
    ListingComponent.prototype.container;
    /** @type {?} */
    ListingComponent.prototype._http;
    /** @type {?} */
    ListingComponent.prototype.sanitizer;
}
var Confirmdialog = /** @class */ (function () {
    function Confirmdialog(dialogRef, data, sanitizer) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.sanitizer = sanitizer;
        console.log('my data ...');
        console.log(this.data);
    }
    /**
     * @return {?}
     */
    Confirmdialog.prototype.onNoClick = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    /**
     * @param {?} unsafeurl
     * @param {?} data
     * @param {?} rowdata
     * @return {?}
     */
    Confirmdialog.prototype.sanitizeUrl = /**
     * @param {?} unsafeurl
     * @param {?} data
     * @param {?} rowdata
     * @return {?}
     */
    function (unsafeurl, data, rowdata) {
        for (var b in data) {
            unsafeurl = unsafeurl + '/' + rowdata[data[b]];
        }
        console.log('unsafeurl');
        console.log(unsafeurl);
        console.log(data);
        console.log(rowdata);
        return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeurl);
    };
    Confirmdialog.decorators = [
        { type: Component, args: [{
                    selector: 'confirmdialog',
                    template: "\n<div *ngIf=\"data.preview != true\">\n    <h1 mat-dialog-title *ngIf=\"data!=null && data.message!=null\" >Hey !</h1>\n    <h1 mat-dialog-title *ngIf=\"data!=null && data.data!=null && data.data[0]==null\">Details </h1>\n    <div mat-dialog-content>\n        <p *ngIf=\"data!=null && data.message!=null\">{{data.message}}</p>\n\n\n        <div *ngIf=\"data!=null && data.data!=null\">\n\n\n\n            <mat-card class=\"example-card\" *ngFor=\"let item of data.data;\">\n                <mat-card-header id=\"dialogdata{{item[0]}}\">\n                    <!--<div mat-card-avatar class=\"example-header-image\"></div>-->\n                    <mat-card-title>{{item[0]}}</mat-card-title>\n                </mat-card-header>\n                <!--<img mat-card-image src=\"https://material.angular.io/assets/img/examples/shiba2.jpg\" alt=\"Photo of a Shiba Inu\">-->\n                <mat-card-content id=\"dialogdata{{item[0]}}\">\n                    <p [innerHtml]=\"item[1]\">\n\n                    </p>\n                </mat-card-content>\n            </mat-card>\n\n        </div>\n\n        <!--for custom page in modal(mainly used for tree)-->\n        <div *ngIf=\"data!=null && data.data!=null  && data.data[0]!=null &&  data.data[0].customdata!=null\">\n\n            <iframe class=\"custom-datadiv\" height=\"auto\"  [src]=\"data.data[0].customdata\" ></iframe>\n\n        </div>\n\n    </div>\n</div>\n\n\n<div *ngIf=\"data.preview == true\">\n    <lib-singlepost [post1]=\"data.previewData.res[0].posts\" [user]=\"\"></lib-singlepost>\n</div>\n\n\n\n\n\n<div mat-dialog-actions *ngIf=\"data.preview != true\">\n    <button mat-button *ngIf=\"data.isconfirmation==null ||  data.isconfirmation!=false\" (click)=\"onNoClick()\">No Thanks</button>\n    <button mat-button mat-dialog-close=\"yes\" cdkFocusInitial>Ok</button>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    Confirmdialog.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
        { type: DomSanitizer }
    ]; };
    return Confirmdialog;
}());
export { Confirmdialog };
if (false) {
    /** @type {?} */
    Confirmdialog.prototype.dialogRef;
    /** @type {?} */
    Confirmdialog.prototype.data;
    /** @type {?} */
    Confirmdialog.prototype.sanitizer;
}
var BottomSheet = /** @class */ (function () {
    function BottomSheet(bottomSheetRef, data) {
        this.bottomSheetRef = bottomSheetRef;
        this.data = data;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    BottomSheet.prototype.openLink = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        console.log('bottomsheet data');
        console.log(val);
        this.bottomSheetRef.dismiss(val);
        //event.preventDefault();
    };
    BottomSheet.decorators = [
        { type: Component, args: [{
                    selector: 'bottom-sheet',
                    template: "<mat-nav-list>\n\n\n    <a *ngFor=\"let item of data.items;\"  mat-list-item (click)=\"openLink(item)\">\n        <span mat-line></span>\n        <span mat-line>{{item.name}}</span>\n    </a>\n\n\n</mat-nav-list>\n"
                }] }
    ];
    /** @nocollapse */
    BottomSheet.ctorParameters = function () { return [
        { type: MatBottomSheetRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_BOTTOM_SHEET_DATA,] }] }
    ]; };
    return BottomSheet;
}());
export { BottomSheet };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BottomSheet.prototype.bottomSheetRef;
    /** @type {?} */
    BottomSheet.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saXN0aW5nLWFuZ3VsYXI3LyIsInNvdXJjZXMiOlsibGliL2xpc3RpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QVk7O0lBb2xDckIsb0JBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQXhCWSxhQUFhOzs7SUFHcEIsa0NBQTZDOztJQUM3Qyw2QkFBeUM7O0lBQUUsa0NBQTZCOztBQXlCOUU7SUFLRSxxQkFBb0IsY0FBOEMsRUFBdUMsSUFBUTtRQUE3RixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0M7UUFBdUMsU0FBSSxHQUFKLElBQUksQ0FBSTtJQUFHLENBQUM7Ozs7O0lBRXJILDhCQUFROzs7O0lBQVIsVUFBUyxHQUFPO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMseUJBQXlCO0lBQzNCLENBQUM7O2dCQVpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsa09BQWdDO2lCQUNqQzs7OztnQkFsbUN1QixpQkFBaUI7Z0RBb21DNkIsTUFBTSxTQUFDLHFCQUFxQjs7SUFRbEcsa0JBQUM7Q0FBQSxBQWJELElBYUM7U0FUWSxXQUFXOzs7Ozs7SUFDVixxQ0FBc0Q7O0lBQUMsMkJBQThDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgSW5qZWN0LFxuLy8gICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4vLyAgIENvbXBvbmVudFJlZixcbi8vICAgRGlyZWN0aXZlLFxuLy8gICBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7TWF0U29ydCwgTWF0VGFibGVEYXRhU291cmNlLE1hdFBhZ2luYXRvcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuLy8gaW1wb3J0IHtTZWxlY3Rpb25Nb2RlbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbi8vIGltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuL2FwaS5zZXJ2aWNlJztcbi8vIGltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuLy8gaW1wb3J0IHtNYXRCb3R0b21TaGVldCwgTWF0Qm90dG9tU2hlZXRSZWYsTUFUX0JPVFRPTV9TSEVFVF9EQVRBfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG4vLyBpbXBvcnQge0Zvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBpbXBvcnQge05hdmlnYXRpb25DYW5jZWwsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciwgTmF2aWdhdGlvblN0YXJ0LCBSb3V0ZXIsIEV2ZW50fSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vLyBpbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuLy8gaW1wb3J0IHtzdGFydFdpdGgsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbi8vIGltcG9ydCB7IERvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBkZWNsYXJlIHZhciAkOmFueTtcbi8vIGltcG9ydCAqIGFzIG1vbWVudEltcG9ydGVkIGZyb20gJ21vbWVudCc7XG4vLyBjb25zdCBtb21lbnQgPSBtb21lbnRJbXBvcnRlZDtcblxuLy8gQENvbXBvbmVudCh7XG4vLyAgIHNlbGVjdG9yOiAnbGliLWxpc3RpbmcnLFxuLy8gICB0ZW1wbGF0ZVVybDogJy4vbGlzdGluZy5tb2R1bGUuaHRtbCcsXG4vLyAgIHN0eWxlVXJsczogWycuL2xpc3RpbmcubW9kdWxlLmNzcyddXG4vLyB9KVxuLy8gZXhwb3J0IGNsYXNzIExpc3RpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4vLyAgIG15Q29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuXG5cbi8vICAgZGF0YXNvdXJjZXZhbDphbnk7XG4vLyAgIHNlYXJjaF9zZXR0aW5nc3ZhbDphbnk7XG4vLyAgIGNsaWNrX3RvX2FkZF9hbmFub3RoZXJfcGFnZXZhbDphbnk7XG4vLyAgIGdyYWJfbGlua3ZhbDphbnk7XG4vLyAgIGRhdGVfc2VhcmNoX3NvdXJjZXZhbDphbnk7XG4vLyAgIGRhdGVfc2VhcmNoX2VuZHBvaW50dmFsOmFueTtcbi8vICAgdXJsdmFsOmFueTtcbi8vICAgc2VhcmNoZW5kcG9pbnR2YWw6YW55O1xuLy8gICBzZWFyY2hMaXN0dmFsOmFueTtcbi8vICAgcGRmX2xpbmtfdmFsOmFueTtcbi8vICAgc3RhdHVzYXJydmFsOmFueTtcbi8vICAgc2tpcHZhbDphbnk7XG4vLyAgIGVycm9ybWc6YW55O1xuLy8gICBqd3R0b2tlbnZhbDphbnk7XG4vLyAgIGRldGFpbF9kYXRhdHlwZXZhbDphbnk7XG4vLyAgIGRldGFpbF9za2lwX2FycmF5dmFsOmFueTtcbi8vICAgZGVsZXRlZW5kcG9pbnR2YWw6YW55O1xuLy8gICBlZGl0cm91dGV2YWw6YW55O1xuLy8gICBhcGl1cmx2YWw6YW55O1xuLy8gICB1cGRhdGVlbmRwb2ludHZhbDphbnk7XG4vLyAgIG1vZGlmeV9oZWFkZXJfYXJyYXl2YWw6YW55O1xuLy8gICBzZWxlY3Rpb24gOmFueTtcbi8vICAgc291cmNlZGF0YXZhbCA6YW55O1xuLy8gICBlbWFpbGFycmF5dmFsIDphbnk7XG4vLyAgIGNvbHVtbnMgOmFueT1bXTtcbi8vICAgb2xkZGF0YSA6YW55PVtdO1xuLy8gICB0c2VhcmNoIDphbnk9W107XG4vLyAgIGF1dG9zZWFyY2ggOmFueT1bXTtcbi8vICAgcHVibGljIHggOmFueTtcbi8vICAgcHVibGljIGN1c3RvbWJ1dHRvbnZhbCA6YW55O1xuLy8gICBwdWJsaWMgcmVzdWx0IDphbnkgPSB7fTtcbi8vICAgcHVibGljIHNoIDphbnkgPSBmYWxzZTtcbi8vICAgcHVibGljIGFydCA6YW55ID0gZmFsc2U7XG4vLyAgIHB1YmxpYyBhdWQyIDphbnkgPSBmYWxzZTtcbi8vICAgcHVibGljIGF1ZCA6YW55ID0gZmFsc2U7XG5cbi8vICAgLyogdGhpcyB2YXJpYWJsZSBmb3IgYXJ0aXN0IHhwIHByZXZpZXcgKi9cbi8vICAgcHJldmlld0ZsdWc6IGFueSA9IGZhbHNlO1xuXG5cbi8vICAgQElucHV0KClcbi8vICAgc2V0IHNlYXJjaF9zZXR0aW5ncyhzZWFyY2hfc2V0dGluZ3M6IGFueSkge1xuLy8gICAgIHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsID0gc2VhcmNoX3NldHRpbmdzO1xuLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLnNlYXJjaF9zZXR0aW5nc3ZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsKTtcbi8vICAgICAvKmZvciAobGV0IGk9IDA7IGk8PSB0aGlzLnNlYXJjaF9zZXR0aW5nc3ZhbC5zZWFyY2gubGVuZ3RoOyBpKyspIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlYXJjaFtpXS5sYWJlbCk7XG4vLyAgICAgfSovXG5cbi8vICAgLyogIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlbGVjdHNlYXJjaCk7XG4vLyAgICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hfc2V0dGluZ3N2YWwuc2VsZWN0c2VhcmNoWzBdLmxhYmVsKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnNlYXJjaF9zZXR0aW5nc3ZhbC5zZWxlY3RzZWFyY2hbMF0udmFsdWVzKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnNlYXJjaF9zZXR0aW5nc3ZhbC5kYXRlc2VhcmNoKTsqL1xuLy8gICB9XG5cbi8vICAgQElucHV0KClcbi8vICAgc2V0IGNsaWNrX3RvX2FkZF9hbmFub3RoZXJfcGFnZShjbGlja190b19hZGRfYW5hbm90aGVyX3BhZ2U6IGFueSkge1xuLy8gICAgIHRoaXMuY2xpY2tfdG9fYWRkX2FuYW5vdGhlcl9wYWdldmFsID0gY2xpY2tfdG9fYWRkX2FuYW5vdGhlcl9wYWdlO1xuLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLmNsaWNrX3RvX2FkZF9hbmFub3RoZXJfcGFnZXZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpY2tfdG9fYWRkX2FuYW5vdGhlcl9wYWdldmFsKTtcbi8vICAgfVxuXG4vLyAgIEBJbnB1dCgpXG4vLyAgIHNldCBncmFiX2xpbmsoZ3JhYl9saW5rOiBhbnkpIHtcbi8vICAgICB0aGlzLmdyYWJfbGlua3ZhbCA9IGdyYWJfbGluaztcbi8vICAgICBjb25zb2xlLmxvZygndGhpcy5ncmFiX2xpbmt2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmdyYWJfbGlua3ZhbCk7XG4vLyAgIH1cbi8vICAgQElucHV0KClcbi8vICAgc2V0IGN1c3RvbWJ1dHRvbihjdXN0b21idXR0b246IGFueSkge1xuLy8gICAgIHRoaXMuY3VzdG9tYnV0dG9udmFsID0gY3VzdG9tYnV0dG9uO1xuLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLmN1c3RvbWJ1dHRvbnZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuY3VzdG9tYnV0dG9udmFsKTtcbi8vICAgfVxuXG4vLyAgIEBJbnB1dCgpXG4vLyAgIHNldCBkYXRlX3NlYXJjaF9zb3VyY2UoZGF0ZV9zZWFyY2hfc291cmNlOiBhbnkpIHtcbi8vICAgICB0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCA9IGRhdGVfc2VhcmNoX3NvdXJjZTtcbi8vICAgICBjb25zb2xlLmxvZygndGhpcy5kYXRlX3NlYXJjaF9zb3VyY2V2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCk7XG4vLyAgIH1cblxuLy8gICBASW5wdXQoKVxuLy8gICBzZXQgZGF0ZV9zZWFyY2hfZW5kcG9pbnQoZGF0ZV9zZWFyY2hfZW5kcG9pbnQ6IGFueSkge1xuLy8gICAgIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWwgPSBkYXRlX3NlYXJjaF9lbmRwb2ludDtcbi8vICAgICBjb25zb2xlLmxvZygndGhpcy5kYXRlX3NlYXJjaF9lbmRwb2ludHZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWwpO1xuLy8gICB9XG4vLyAgICBASW5wdXQoKVxuLy8gICBzZXQgdXJsKHVybDogYW55KSB7XG4vLyAgICAgdGhpcy51cmx2YWwgPSB1cmw7XG4vLyAgICAgY29uc29sZS5sb2coJ3RoaXMudXJsdmFsJyk7XG4vLyAgICAgY29uc29sZS5sb2codGhpcy51cmx2YWwpO1xuLy8gICB9XG4vLyAgICAgQElucHV0KClcbi8vICAgc2V0IHNlYXJjaGVuZHBvaW50KHNlYXJjaGVuZHBvaW50OiBhbnkpIHtcbi8vICAgICB0aGlzLnNlYXJjaGVuZHBvaW50dmFsID0gc2VhcmNoZW5kcG9pbnQ7XG4vLyAgICAgY29uc29sZS5sb2coJ3RoaXMuc2VhcmNoZW5kcG9pbnR2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnNlYXJjaGVuZHBvaW50dmFsKTtcbi8vICAgfVxuLy8gICAgQElucHV0KClcbi8vICAgc2V0IHBkZl9saW5rKHBkZl9saW5rOiBhbnkpIHtcbi8vICAgICB0aGlzLnBkZl9saW5rX3ZhbCA9IHBkZl9saW5rO1xuLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLnBkZl9saW5rX3ZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMucGRmX2xpbmtfdmFsKTtcbi8vICAgfVxuLy8gICBASW5wdXQoKVxuLy8gICBzZXQgc2VhcmNoTGlzdChzZWFyY2hMaXN0OiBhbnkpIHtcbi8vICAgICB0aGlzLnNlYXJjaExpc3R2YWwgPSBzZWFyY2hMaXN0O1xuLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLnNlYXJjaExpc3R2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnNlYXJjaExpc3R2YWwpO1xuLy8gICB9XG4vLyAgIEBJbnB1dCgpXG4vLyAgIHNldCBkYXRhc291cmNlKGRhdGFzb3VyY2U6IGFueSkge1xuLy8gICAgIHRoaXMuZGF0YXNvdXJjZXZhbCA9IGRhdGFzb3VyY2U7XG4vLyAgICAgY29uc29sZS5sb2coJ3RoaXMuZGF0YXNvdXJjZXZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YXNvdXJjZXZhbCk7XG4vLyAgIH1cblxuLy8gICBASW5wdXQoKVxuLy8gICBzZXQgc2tpcChza2lwOiBhbnkpIHtcbi8vICAgICB0aGlzLnNraXB2YWwgPSBza2lwO1xuLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLnNraXB2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnNraXB2YWwpO1xuLy8gICB9XG4vLyAgIEBJbnB1dCgpXG4vLyAgIHNldCBkZXRhaWxfZGF0YXR5cGUoZGV0YWlsX2RhdGF0eXBlOiBhbnkpIHtcbi8vICAgICB0aGlzLmRldGFpbF9kYXRhdHlwZXZhbCA9IGRldGFpbF9kYXRhdHlwZTtcbi8vICAgICBjb25zb2xlLmxvZygndGhpcy5kZXRhaWxfZGF0YXR5cGV2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbF9kYXRhdHlwZXZhbCk7XG4vLyAgIH1cbi8vICBASW5wdXQoKVxuLy8gICBzZXQgZGV0YWlsX3NraXBfYXJyYXkoZGV0YWlsX3NraXBfYXJyYXk6IGFueSkge1xuLy8gICAgIHRoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWwgPSBkZXRhaWxfc2tpcF9hcnJheTtcbi8vICAgICBjb25zb2xlLmxvZygndGhpcy5kZXRhaWxfc2tpcF9hcnJheXZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWwpO1xuLy8gICB9XG5cbi8vIEBJbnB1dCgpXG4vLyAgIHNldCBzb3VyY2VkYXRhKHNvdXJjZWRhdGE6IGFueSkge1xuLy8gICAgIHRoaXMuc291cmNlZGF0YXZhbCA9IHNvdXJjZWRhdGE7XG4vLyAgICAgY29uc29sZS5sb2coJ3RoaXMuc291cmNlZGF0YXZhbCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuc291cmNlZGF0YXZhbCk7XG4vLyAgIH1cblxuLy8gICBASW5wdXQoKVxuLy8gICBzZXQgbW9kaWZ5X2hlYWRlcl9hcnJheShtb2RpZnlfaGVhZGVyX2FycmF5OiBhbnkpIHtcbi8vICAgICB0aGlzLm1vZGlmeV9oZWFkZXJfYXJyYXl2YWwgPSBtb2RpZnlfaGVhZGVyX2FycmF5O1xuLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLm1vZGlmeV9oZWFkZXJfYXJyYXl2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGlmeV9oZWFkZXJfYXJyYXl2YWwpO1xuLy8gICB9XG5cbi8vICAgQElucHV0KClcbi8vICAgICBzZXQgZGVsZXRlZW5kcG9pbnQoZGVsZXRlZW5kcG9pbnR2YWw6IGFueSkge1xuLy8gICAgICAgdGhpcy5kZWxldGVlbmRwb2ludHZhbCA9IGRlbGV0ZWVuZHBvaW50dmFsO1xuLy8gICAgICAgY29uc29sZS5sb2coJ3RoaXMuZGVsZXRlZW5kcG9pbnR2YWwnKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGVsZXRlZW5kcG9pbnR2YWwpO1xuLy8gICAgIH1cblxuLy8gIEBJbnB1dCgpXG4vLyAgICAgc2V0IHVwZGF0ZWVuZHBvaW50KHVwZGF0ZWVuZHBvaW50OiBhbnkpIHtcbi8vICAgICAgIHRoaXMudXBkYXRlZW5kcG9pbnR2YWwgPSB1cGRhdGVlbmRwb2ludDtcbi8vICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLnVwZGF0ZWVuZHBvaW50dmFsJyk7XG4vLyAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVwZGF0ZWVuZHBvaW50dmFsKTtcbi8vICAgICB9XG4vLyAgICAgQElucHV0KClcbi8vICAgICBzZXQgYXBpdXJsKGFwaXVybDogYW55KSB7XG4vLyAgICAgICB0aGlzLmFwaXVybHZhbCA9IGFwaXVybDtcbi8vICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmFwaXVybHZhbCcpO1xuLy8gICAgICAgY29uc29sZS5sb2codGhpcy5hcGl1cmx2YWwpO1xuLy8gICAgIH1cblxuLy8gQElucHV0KClcbi8vICAgICBzZXQgand0dG9rZW4oand0dG9rZW46IGFueSkge1xuLy8gICAgICAgdGhpcy5qd3R0b2tlbnZhbCA9IGp3dHRva2VuO1xuLy8gICAgICAgY29uc29sZS5sb2coJ3RoaXMuand0dG9rZW52YWwnKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMuand0dG9rZW52YWwpO1xuLy8gICAgIH1cblxuLy8gICAgIEBJbnB1dCgpXG4vLyAgICAgc2V0IHN0YXR1c2FycihzdGF0dXNhcnI6IGFueSkge1xuLy8gICAgICAgdGhpcy5zdGF0dXNhcnJ2YWwgPSBzdGF0dXNhcnI7XG4vLyAgICAgICBjb25zb2xlLmxvZygndGhpcy5zdGF0dXNhcnJ2YWwnKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdHVzYXJydmFsKTtcbi8vICAgICB9XG5cbi8vICAgICBASW5wdXQoKVxuLy8gICAgIHNldCBlbWFpbGFycmF5KGVtYWlsYXJyYXk6IGFueSkge1xuLy8gICAgICAgdGhpcy5lbWFpbGFycmF5dmFsID0gZW1haWxhcnJheTtcbi8vICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmVtYWlsYXJyYXl2YWwnKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1haWxhcnJheXZhbCk7XG4vLyAgICAgfVxuXG4vLyAgIEBJbnB1dCgpXG4vLyAgIHNldCBlZGl0cm91dGUoZWRpdHJvdXRlOiBhbnkpIHtcbi8vICAgICBjb25zb2xlLmxvZygnZWRpdHJvdXRlJyk7XG4vLyAgICAgY29uc29sZS5sb2coZWRpdHJvdXRlKTtcbi8vICAgICB0aGlzLmVkaXRyb3V0ZXZhbCA9IGVkaXRyb3V0ZTtcbi8vICAgICBjb25zb2xlLmxvZygndGhpcy5lZGl0cm91dGV2YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmVkaXRyb3V0ZXZhbCk7XG4vLyAgIH1cblxuXG4vLyAgIC8qIGFydGlzdHhwIHByZXZpZXcgc3RhcnQgKi9cbi8vICAgQElucHV0KClcbi8vICAgc2V0IHByZXZpZXdfYXJ0aXN0eHAoZmx1ZzogYW55KSB7XG4vLyAgICAgdGhpcy5wcmV2aWV3Rmx1ZyA9IHRydWU7XG4vLyAgIH1cbi8vICAgLyogYXJ0aXN0eHAgcHJldmlldyBlbmQgKi9cblxuXG4vLyAgIHN0YXRlR3JvdXBzOiBzdHJpbmdbXSA9IHRoaXMuc2VhcmNoTGlzdHZhbDtcbi8vICAgc3RhdGVHcm91cDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG5cbi8vICAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbXTtcbi8vICAgZGF0YWNvbHVtbnM6IHN0cmluZ1tdID0gW107XG4vLyAgIGRpc3BsYXllZENvbHVtbnNoZWFkZXI6IHN0cmluZ1tdID0gW107XG4vLyAgIGZvcm1hcnJheTogYW55ID0gW107XG4vLyAgIHN0YXJ0X2RhdGU6IGFueSA7XG4vLyAgIGRhdGVTZWFyY2hfY29uZGl0aW9uOiBhbnkgPXt9O1xuLy8gICBzZWxlY3RTZWFyY2hfY29uZGl0aW9uOiBhbnkgPXt9O1xuLy8gICBhdXRvU2VhcmNoX2NvbmRpdGlvbjogYW55ID17fTtcbi8vICAgdGV4dFNlYXJjaF9jb25kaXRpb246IGFueSA9e307XG4vLyAgIGVuZF9kYXRlOiBhbnkgO1xuLy8gICBwdWJsaWMgaTogYW55IDtcbi8vICAgbG9hZGluZzogYW55ID0gZmFsc2UgO1xuLy8gICBwdWJsaWMgcHJlcmVzdWx0OiBhbnk9e307XG4vLyAgIC8vZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UodGhpcy5kYXRhc291cmNldmFsKTtcbi8vICAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U7XG5cbi8vICAgQFZpZXdDaGlsZChNYXRTb3J0LCB7c3RhdGljOiB0cnVlfSkgc29ydDogTWF0U29ydDtcbi8vICAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IsIHtzdGF0aWM6IHRydWV9KSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbi8vICAgLy8gb3B0aW9uczogRm9ybUdyb3VwO1xuLy8gICBteUZvcm06YW55O1xuLy8gICAvLyBteUZvcm06YW55O1xuXG4vLyAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfYXBpU2VydmljZTogQXBpU2VydmljZSxwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cscHJpdmF0ZSBib3R0b21TaGVldDogTWF0Qm90dG9tU2hlZXQscHVibGljIGZiOiBGb3JtQnVpbGRlcixwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4vLyAgICAgICAgICAgICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgX2h0dHA6IEh0dHBDbGllbnQsIHB1YmxpYyBzYW5pdGl6ZXI6RG9tU2FuaXRpemVyKSB7XG5cbi8vICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHtcbi8vICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4vLyAgICAgICAgICAgY2FzZSBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydDoge1xuLy8gICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBjYXNlIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZDpcbi8vICAgICAgICAgICBjYXNlIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbDpcbi8vICAgICAgICAgICBjYXNlIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yOiB7XG4vLyAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBkZWZhdWx0OiB7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuXG5cblxuLy8gICAgLyogdGhpcy5teUZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbi8vICAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eXFxzKltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxAW1xcd1xcLVxcK19dK1xcLltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxzKiQvKV0pXSxcbi8vICAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4vLyAgICAgfSk7Ki9cblxuXG5cbi8vICAgfVxuLy8gICAvKkBEaXJlY3RpdmUoe1xuLy8gICAgIHNlbGVjdG9yOiAnW0xpc3RpbmddJ1xuLy8gICB9KSovXG5cblxuXG5cblxuXG4vLyAgIGlucHV0Ymx1cih2YWw6YW55KXtcbi8vICAgICBjb25zb2xlLmxvZygnb24gYmx1ciAuLi4uLicpO1xuLy8gICAgIHRoaXMubXlGb3JtLmNvbnRyb2xzW3ZhbF0ubWFya0FzVW50b3VjaGVkKCk7XG4vLyAgIH1cbi8vICAgbmdPbkluaXQoKSB7XG5cbi8vICAgICBpZiAodGhpcy5zZWFyY2hfc2V0dGluZ3N2YWwgIT1udWxsICYmIHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlYXJjaCAhPSBudWxsICYmIHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlYXJjaCAhPSAnJykge1xuLy8gICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0nKTtcbi8vICAgICAgIGxldCBzb3VyY2U6IGFueTtcbi8vICAgICAgIGxldCBjb25kaXRpb246IGFueSA9IHt9O1xuLy8gICAgICAgc291cmNlID0ge1xuLy8gICAgICAgICBzb3VyY2U6IHRoaXMuZGF0ZV9zZWFyY2hfc291cmNldmFsLFxuLy8gICAgICAgICBjb25kaXRpb246IGNvbmRpdGlvblxuLy8gICAgICAgfTtcbi8vICAgICAgIGxldCBsaW5rID0gdGhpcy5hcGl1cmx2YWwgKyAnJyArIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4vLyAgICAgICB0aGlzLl9hcGlTZXJ2aWNlLnBvc3RTZWFyY2gobGluaywgdGhpcy5qd3R0b2tlbnZhbCwgc291cmNlKS5zdWJzY3JpYmUocmVzID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbi8vICAgICAgICAgdGhpcy5yZXN1bHQgPSByZXM7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0KTtcbi8vICAgICAgICAgdGhpcy5wcmVyZXN1bHQgPSB0aGlzLnJlc3VsdC5yZXM7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJlcmVzdWx0KTtcbi8vICAgICAgIH0pO1xuXG4vLyAgICAgfVxuXG4vLyAgICAgLy8gdGhpcy5fc2VydmljZS5zdWNjZXNzKHRoaXMuY29sdW1uc1swXS5kYXRlLCdkbmRubmQnLHRoaXMub3B0aW9ucyk7XG4vLyAgICAvKiB0aGlzLnN0YXRlR3JvdXBPcHRpb25zID0gdGhpcy5teUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4vLyAgICAgICAgIC5waXBlKFxuLy8gICAgICAgICAgICAgc3RhcnRXaXRoKCcnKSxcbi8vICAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiB0aGlzLl9maWx0ZXJHcm91cCh2YWx1ZSkpXG4vLyAgICAgICAgICk7Ki9cblxuLy8gICAgIHRoaXMuc3RhdGVHcm91cCA9IHRoaXMubXlDb250cm9sLnZhbHVlQ2hhbmdlc1xuLy8gICAgICAgICAucGlwZShcbi8vICAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4vLyAgICAgICAgICAgICBtYXAodmFsdWUgPT4gdGhpcy5fZmlsdGVyKHZhbHVlKSlcbi8vICAgICAgICAgKTtcblxuLy8gICAgIC8qY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4vLyAgICAgICAgIGNvbXBvbmVudE1hcHBlclt0aGlzLmZpZWxkLnR5cGVdXG4vLyAgICAgKTtcbi8vICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbi8vICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5maWVsZCA9IHRoaXMuZmllbGQ7XG4vLyAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuLy8gKi9cblxuLy8gICAgIHRoaXMueCA9IHRoaXMuZGF0YXNvdXJjZXZhbDtcbi8vICAgICBsZXQgeD10aGlzLng7XG5cbi8vICAgICBsZXQgdGVtcCA9IFtdXG4vLyAgICAgbGV0IGtleXMgPSB4WzBdXG4vLyAgICAgdGVtcCA9IE9iamVjdC5rZXlzKGtleXMpICAgIC8qYnkgT2JqZWN0LmtleXMoKSB3ZSBjYW4gZmluZCB0aGUgZmllbGRuYW1lcyhvciBrZXlzKSBpbiBhbiBvYmplY3QsIGkuZSwgaW4gdGVtcCBvYmplY3QgZmllbGQgbmFtZXMgYXJlIHNhdmVkKi9cblxuLy8gICAgIGxldCBjb2xkZWZfbGlzdCA9IFtdO1xuLy8gICAgIGxldCBoZWFkZXJfbGlzdCA9IFtdO1xuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcC5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgY29sZGVmX2xpc3QucHVzaCh0ZW1wW2ldLnJlcGxhY2UoL1xccy9nLCBcIl9cIikpOyAgICAgIC8qdG8gcmVwbGFjZSBzcGFjZXMgaW4gZmllbGQgbmFtZSBieSBcIl9cIiwgd2UgdXNlIFwicmVwbGFjZSgvXFxzL2csIFwiX1wiKVwiKi9cbi8vICAgICAgIGhlYWRlcl9saXN0LnB1c2godGVtcFtpXSlcbi8vICAgICB9XG4vLyAgICAgLy9jb2xkZWZfbGlzdC5wdXNoKCdBY3Rpb25zJyk7XG4vLyAgICAgLy9oZWFkZXJfbGlzdC5wdXNoKCdBY3Rpb25zJylcbi8vICAgICBjb25zb2xlLmxvZygnY29sZGVmX2xpc3QnLGNvbGRlZl9saXN0KTtcbi8vICAgICBjb25zb2xlLmxvZygnaGVhZGVyX2xpc3QnLGhlYWRlcl9saXN0KTtcblxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sZGVmX2xpc3QubGVuZ3RoOyBpKyspIHtcbi8vICAgICAgIGxldCBmZiA9IGByb3cuJHtjb2xkZWZfbGlzdFtpXX1gXG4vLyAgICAgICB2YXIgdHQgPSB7IGNvbHVtbkRlZjogYCR7Y29sZGVmX2xpc3RbaV19YCwgICAgaGVhZGVyOiBgJHtoZWFkZXJfbGlzdFtpXS5yZXBsYWNlKC9fL2csXCIgXCIpfWAsICBjZWxsOiAocm93KSA9PiBldmFsKGZmKSAsb2JqbGVuZ3RoOmhlYWRlcl9saXN0Lmxlbmd0aCAgfTtcbi8vICAgICAgIC8vIGNvbnNvbGUubG9nKCd0dC5jb2x1bW5EZWYnKTtcbi8vICAgICAgIC8vIGNvbnNvbGUubG9nKHR0LmNvbHVtbkRlZik7XG4vLyAgICAgICBmb3IgKGxldCBiIGluIHRoaXMubW9kaWZ5X2hlYWRlcl9hcnJheXZhbCl7XG4vLyAgICAgICAgIGlmKGI9PXR0LmhlYWRlcikgdHQuaGVhZGVyPXRoaXMubW9kaWZ5X2hlYWRlcl9hcnJheXZhbFtiXTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgaWYodGhpcy5za2lwdmFsLmluZGV4T2YodHQuY29sdW1uRGVmKT09LTEpXG4vLyAgICAgICB0aGlzLmNvbHVtbnMucHVzaCh0dCk7XG4vLyAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5jb2x1bW5zJyk7XG4vLyAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbHVtbnMpO1xuLy8gICAgIH1cbi8vICAgICBsZXQgZGlzcGxheWVkY29scz0gdGhpcy5jb2x1bW5zLm1hcCh4ID0+IHguY29sdW1uRGVmKTtcbi8vICAgICBkaXNwbGF5ZWRjb2xzLnB1c2goJ0FjdGlvbnMnKTtcblxuLy8gICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9ZGlzcGxheWVkY29scztcbi8vICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMudW5zaGlmdCgnc2VsZWN0Jyk7ICAgICAgICAvKmFkZHMgc2VsZWN0IGNvbHVtbiBpbiB0YWJsZSBieSB1bnNoaWZ0IGZ1bmN0aW9uKi9cblxuLy8gICAgIGxldCBkYXRhX2xpc3QgPSBbXTtcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMueC5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgZGF0YV9saXN0LnB1c2godGhpcy5jcmVhdGVEYXRhKHhbaV0pKTtcbi8vICAgICB9XG4vLyAgICAgdGhpcy5vbGRkYXRhPWRhdGFfbGlzdDtcbi8vICAgICBjb25zb2xlLmxvZyhkYXRhX2xpc3QpXG4vLyAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZShkYXRhX2xpc3QpO1xuLy8gICAgIHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsKHRydWUsIFtdKTtcbi8vICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4vLyAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4vLyAgIH1cblxuXG4vLyAgIG9uU3VibWl0KCkge1xuLy8gICAgIGxldCB4OiBhbnk7XG4vLyAgICAgdGhpcy5lcnJvcm1nID0gJyc7XG4vLyAgICAgbGV0IGRhdGEgPSB0aGlzLm15Rm9ybS52YWx1ZTtcbi8vICAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMubXlGb3JtLnZhbGlkKTtcbi8vICAgICBmb3IgKHggaW4gdGhpcy5teUZvcm0uY29udHJvbHMpIHtcbi8vICAgICAgIHRoaXMubXlGb3JtLmNvbnRyb2xzW3hdLm1hcmtBc1RvdWNoZWQoKTtcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgZGF0ZVNlYXJjaCh2YWw6IGFueSkge1xuLy8gICAgIGNvbnNvbGUubG9nKFwic3RhcnQgZGF0ZVwiKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXJ0X2RhdGUpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuZW5kX2RhdGUpO1xuLy8gICAgIGxldCBzZCA9IG1vbWVudCh0aGlzLnN0YXJ0X2RhdGUpLnVuaXgoKTtcbi8vICAgICBsZXQgZWQgPSBtb21lbnQodGhpcy5lbmRfZGF0ZSkudW5peCgpO1xuLy8gICAgIGNvbnNvbGUubG9nKG1vbWVudCh0aGlzLnN0YXJ0X2RhdGUpLnVuaXgoKSk7XG4vLyAgICAgY29uc29sZS5sb2cobW9tZW50KHRoaXMuZW5kX2RhdGUpLnVuaXgoKSk7XG4vLyAgICAgY29uc29sZS5sb2cobmV3IERhdGUodGhpcy5lbmRfZGF0ZSkuZ2V0VGltZSgpKTtcbi8vICAgICBsZXQgbGluayA9IHRoaXMuYXBpdXJsdmFsICsgJycrIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4vLyAgICAgY29uc29sZS5sb2cobGluayk7XG4vLyAgICAgaWYobW9tZW50KHRoaXMuZW5kX2RhdGUpLnVuaXgoKSE9bnVsbCAmJiBtb21lbnQodGhpcy5zdGFydF9kYXRlKS51bml4KCkhPW51bGwgKSB7XG5cblxuLy8gICAgICAgbGV0IHNvdXJjZTphbnk7XG4vLyAgICAgICBsZXQgY29uZGl0aW9uOiBhbnk7XG4vLyAgICAgICBjb25kaXRpb24gPSB7fTtcblxuLy8gICAgICAgY29uZGl0aW9uW3ZhbF0gPSB7XG4vLyAgICAgICAgICRsdGU6IG5ldyBEYXRlKHRoaXMuZW5kX2RhdGUpLmdldFRpbWUoKSxcbi8vICAgICAgICAgICAgICRndGU6IG5ldyBEYXRlKHRoaXMuc3RhcnRfZGF0ZSkuZ2V0VGltZSgpLFxuLy8gICAgICAgfTtcbi8vICAgICAgIHRoaXMuZGF0ZVNlYXJjaF9jb25kaXRpb24gPSB7fTtcbi8vICAgICAgIHRoaXMuZGF0ZVNlYXJjaF9jb25kaXRpb24gPSBjb25kaXRpb247XG4vLyAgICAgICBsZXQgY29uZGl0aW9ub2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50ZXh0U2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5kYXRlU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5hdXRvU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5zZWxlY3RTZWFyY2hfY29uZGl0aW9uKTtcbi8vICAgICAgICAgICBzb3VyY2U9IHtcbi8vICAgICAgICAgICAgIHNvdXJjZTogdGhpcy5kYXRlX3NlYXJjaF9zb3VyY2V2YWwsXG4vLyAgICAgICAgICAgICBjb25kaXRpb246IGNvbmRpdGlvbm9iaixcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgY29uc29sZS5sb2coc291cmNlKTtcbi8vICAgICAgIHRoaXMuX2FwaVNlcnZpY2UucG9zdFNlYXJjaChsaW5rLHRoaXMuand0dG9rZW52YWwsIHNvdXJjZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4vLyAgICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuLy8gICAgICAgICByZXN1bHQgPSByZXM7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yZXMpO1xuLy8gICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHJlc3VsdC5yZXMpO1xuLy8gICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4vLyAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuLy8gICAgICAgfSlcblxuLy8gICAgICAgLyp0aGlzLl9odHRwLnBvc3QobGluaywge3NvdXJjZTp0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCxcbi8vICAgICAgICAgY29uZGl0aW9uOiB7XG4vLyAgICAgICAgICAgJ2NyZWF0ZWRfYXQnOiB7XG4vLyAgICAgICAgICAgICAkbHRlOiBuZXcgRGF0ZSh0aGlzLmVuZF9kYXRlKS5nZXRUaW1lKCksXG4vLyAgICAgICAgICAgICAkZ3RlOiBuZXcgRGF0ZSh0aGlzLnN0YXJ0X2RhdGUpLmdldFRpbWUoKSxcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sdG9rZW46IHRoaXMuand0dG9rZW52YWwsXG4vLyAgICAgICB9KS5zdWJzY3JpYmUoIHJlcyA9Pntcbi8vICAgICAgICAgbGV0IHJlc3VsdDogYW55ID17fTtcbi8vICAgICAgICAgcmVzdWx0ID0gcmVzO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm9rXCIpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQucmVzKTtcbi8vICAgICAgICAgbGV0IG5ld2RhdGEgPSByZXN1bHQucmVzO1xuLy8gICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHJlc3VsdC5yZXMpO1xuLy8gICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4vLyAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuLy8gICAgICAgfSkqL1xuLy8gICAgIH1lbHNlXG4vLyAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuLy8gICB9XG5cblxuXG4vLyAgIHNlbGVjdFNlYXJjaCAodmFsdWU6YW55LHR5cGU6YW55KXtcbi8vICAgICBjb25zb2xlLmxvZygndHlwZScpO1xuLy8gICAgIGNvbnNvbGUubG9nKHR5cGUpO1xuLy8gICAgIGxldCBsaW5rID0gdGhpcy5hcGl1cmx2YWwgKyAnJysgdGhpcy5kYXRlX3NlYXJjaF9lbmRwb2ludHZhbDtcbi8vICAgICBjb25zb2xlLmxvZyhsaW5rKTtcbi8vICAgICBsZXQgc291cmNlOmFueTtcbi8vICAgICBsZXQgY29uZGl0aW9uOiBhbnk7XG4vLyAgICAgY29uZGl0aW9uID0ge307XG4vLyAgICAgY29uZGl0aW9uW3R5cGUuZmllbGRdPXZhbHVlO1xuLy8gICAgIHRoaXMuc2VsZWN0U2VhcmNoX2NvbmRpdGlvbiA9IHt9O1xuLy8gICAgIHRoaXMuc2VsZWN0U2VhcmNoX2NvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbi8vICAgICBsZXQgY29uZGl0aW9ub2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50ZXh0U2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5kYXRlU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5hdXRvU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5zZWxlY3RTZWFyY2hfY29uZGl0aW9uKTtcbi8vICAgICBzb3VyY2U9IHtcbi8vICAgICAgIHNvdXJjZTogdGhpcy5kYXRlX3NlYXJjaF9zb3VyY2V2YWwsXG4vLyAgICAgICBjb25kaXRpb246IGNvbmRpdGlvbm9ialxuLy8gICAgIH07XG4vLyAgICAgaWYodmFsdWUgIT1udWxsICkge1xuLy8gICAgICAgdGhpcy5fYXBpU2VydmljZS5wb3N0U2VhcmNoKGxpbmssIHRoaXMuand0dG9rZW52YWwsIHNvdXJjZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4vLyAgICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuLy8gICAgICAgICByZXN1bHQgPSByZXM7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwib2tcIik7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yZXMpO1xuLy8gICAgICAgICBsZXQgbmV3ZGF0YSA9IHJlc3VsdC5yZXM7XG4vLyAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UocmVzdWx0LnJlcyk7XG4vLyAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbi8vICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4vLyAgICAgICB9KTtcbi8vICAgICB9IGVsc2Vcbi8vICAgICB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnb29wcycpO1xuLy8gICAgIH1cbi8vICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbi8vICAgfVxuLy8gICBhdXRvc2VhcmNoZnVuY3Rpb24gKHZhbHVlOiBhbnkpIHtcbi8vICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4vLyAgICAgbGV0IHZhbDphbnk9dGhpcy5hdXRvc2VhcmNoW3ZhbHVlXTtcbi8vICAgICBjb25zb2xlLmxvZyh2YWwpO1xuLy8gICAgIGxldCBzb3VyY2U6YW55O1xuLy8gICAgIGxldCBjb25kaXRpb246IGFueT17fTtcbi8vICAgICBpZih0aGlzLmF1dG9zZWFyY2hbdmFsdWVdLmxlbmd0aD4wICYmIHskb3I6W3RoaXMuYXV0b3NlYXJjaFt2YWx1ZV0udG9Mb3dlckNhc2UoKSx0aGlzLmF1dG9zZWFyY2hbdmFsdWVdLnRvVXBwZXJDYXNlKCksdGhpcy5hdXRvc2VhcmNoW3ZhbHVlXV19KWNvbmRpdGlvblt2YWx1ZSsnX3JlZ2V4J109dmFsO1xuLy8gICAgIHRoaXMuYXV0b1NlYXJjaF9jb25kaXRpb24gPSB7fTtcbi8vICAgICB0aGlzLmF1dG9TZWFyY2hfY29uZGl0aW9uID0gY29uZGl0aW9uO1xuLy8gICAgIGxldCBjb25kaXRpb25vYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRleHRTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmRhdGVTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmF1dG9TZWFyY2hfY29uZGl0aW9uLCB0aGlzLnNlbGVjdFNlYXJjaF9jb25kaXRpb24pO1xuLy8gICAgIHNvdXJjZT0ge1xuLy8gICAgICAgc291cmNlOiB0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCxcbi8vICAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9ub2JqXG4vLyAgICAgfTtcbi8vICAgICBsZXQgbGluayA9IHRoaXMuYXBpdXJsdmFsICsgJycrIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4vLyAgICAgdGhpcy5fYXBpU2VydmljZS5wb3N0U2VhcmNoKGxpbmssIHRoaXMuand0dG9rZW52YWwsIHNvdXJjZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuLy8gICAgICAgLy8gbGV0IHJlc3VsdDphbnk9e307XG4vLyAgICAgICB0aGlzLnJlc3VsdCA9IHJlcztcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0KTtcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0LnJlcyk7XG4vLyAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHRoaXMucmVzdWx0LnJlcyk7XG4vLyAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4vLyAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcblxuLy8gICAgIH0pO1xuLy8gICB9XG5cbi8vICAgdGV4dHNlYXJjaGZ1bmN0aW9uICh2YWx1ZTphbnkpe1xuLy8gICAgIGNvbnNvbGUubG9nKCd2YWx1ZScpO1xuLy8gICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbi8vICAgICBjb25zb2xlLmxvZyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnRzZWFyY2hbdmFsdWVdKTtcbi8vICAgICBsZXQgbGluayA9IHRoaXMuYXBpdXJsdmFsICsgJycrIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4vLyAgICAgY29uc29sZS5sb2cobGluayk7XG4vLyAgICAgbGV0IHNvdXJjZTphbnk7XG4vLyAgICAgbGV0IGNvbmRpdGlvbjogYW55PXt9O1xuLy8gICAgIC8vY29uZGl0aW9uID0ge307XG4vLyAgICAgbGV0IHZhbDphbnkgPXRoaXMudHNlYXJjaFt2YWx1ZV0udG9Mb3dlckNhc2UoKTtcbi8vICAgICAvLyBjb25kaXRpb249eyRvcjpbdGhpcy50c2VhcmNoW3ZhbHVlXS50b0xvd2VyQ2FzZSgpLHRoaXMudHNlYXJjaFt2YWx1ZV0udG9VcHBlckNhc2UoKV19O1xuLy8gICAgIGlmKHRoaXMudHNlYXJjaFt2YWx1ZV0ubGVuZ3RoPjEgJiYgeyRvcjpbdGhpcy50c2VhcmNoW3ZhbHVlXS50b0xvd2VyQ2FzZSgpLHRoaXMudHNlYXJjaFt2YWx1ZV0udG9VcHBlckNhc2UoKV19KWNvbmRpdGlvblt2YWx1ZSsnX3JlZ2V4J109dmFsO1xuLy8gICAgIHRoaXMudGV4dFNlYXJjaF9jb25kaXRpb24gPSB7fTtcbi8vICAgICB0aGlzLnRleHRTZWFyY2hfY29uZGl0aW9uID0gY29uZGl0aW9uO1xuLy8gICAgIC8vY29uZGl0aW9uW3ZhbHVlXT1cIi8yMjIvXCI7XG4vLyAgICAgLy9jb25kaXRpb249e2VtYWlsOnskcmVneDonLzIyMi9pJ319O1xuLy8gICAgIGxldCBjb25kaXRpb25vYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRleHRTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmRhdGVTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmF1dG9TZWFyY2hfY29uZGl0aW9uLCB0aGlzLnNlbGVjdFNlYXJjaF9jb25kaXRpb24pO1xuLy8gICAgIHNvdXJjZT0ge1xuLy8gICAgICAgc291cmNlOiB0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCxcbi8vICAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9ub2JqXG4vLyAgICAgfTtcbi8vICAgICBjb25zb2xlLmxvZygnc291cmNlJyk7XG4vLyAgICAgY29uc29sZS5sb2coc291cmNlKTtcbi8vICAgICAvL2FkZCBsb2FkZXJcbi8vICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuLy8gICAgIGlmKHZhbHVlICE9bnVsbCAgKSB7XG4vLyAgICAgICB0aGlzLl9hcGlTZXJ2aWNlLnBvc3RTZWFyY2gobGluaywgdGhpcy5qd3R0b2tlbnZhbCwgc291cmNlKS5zdWJzY3JpYmUocmVzID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbi8vICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4vLyAgICAgICAgIHJlc3VsdCA9IHJlcztcbi8vICAgICAgICAgLy9jbG9zZSBsb2FkZXJcbi8vICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwib2tcIik7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yZXMpO1xuLy8gICAgICAgICBsZXQgbmV3ZGF0YSA9IHJlc3VsdC5yZXM7XG4vLyAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UocmVzdWx0LnJlcyk7XG4vLyAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbi8vICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4vLyAgICAgICB9KTtcbi8vICAgICB9IGVsc2Vcbi8vICAgICB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnb29wcycpO1xuLy8gICAgIH1cbi8vICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbi8vICAgfVxuXG5cblxuLy8gICBwcml2YXRlIF9maWx0ZXIodmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbi8vICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbi8vICAgICByZXR1cm4gdGhpcy5zZWFyY2hMaXN0dmFsLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpKTtcbi8vICAgfVxuXG4vLyAgIC8qcHJpdmF0ZSBfZmlsdGVyR3JvdXAodmFsdWU6IHN0cmluZyk6IFN0YXRlR3JvdXBbXSB7XG4vLyAgICAvISogaWYgKHZhbHVlKSB7XG4vLyAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hMaXN0dmFsXG4vLyAgICAgICAgICAgLm1hcChncm91cCA9PiAoe25hbWVzOiBfZmlsdGVyKGdyb3VwLm5hbWVzLCB2YWx1ZSl9KSlcbi8vICAgICAgICAgICAuZmlsdGVyKGdyb3VwID0+IGdyb3VwLm5hbWVzLmxlbmd0aCA+IDApO1xuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiB0aGlzLnNlYXJjaExpc3R2YWw7KiEvXG4vLyAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4vLyAgICAgcmV0dXJuIHRoaXMuc2VhcmNoTGlzdHZhbC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlKSk7XG4vLyAgIH0qL1xuXG4vLyAgIGdldHN0YXR1cyh2YWw6YW55KXtcbi8vICAgICAvLyBjb25zb2xlLmxvZygndmFsJyk7XG4vLyAgICAgLy8gY29uc29sZS5sb2codmFsKTtcbi8vICAgICBmb3IobGV0IGIgaW4gdGhpcy5zdGF0dXNhcnJ2YWwpe1xuLy8gICAgICAgaWYodGhpcy5zdGF0dXNhcnJ2YWxbYl0udmFsPT12YWwpXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnN0YXR1c2FycnZhbFtiXS5uYW1lO1xuLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0dXNhcnJ2YWxbYl0ubmFtZSk7XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiBcIk4vQVwiO1xuLy8gICB9XG4vLyAgIGhpKHZhbDogYW55KXtcbi8vICAgICAvLyBjb25zb2xlLmxvZygnaGkgIHZhbCcpO1xuLy8gICAgIC8vIGNvbnNvbGUubG9nKHZhbCk7XG4vLyAgICAgaWYgKHZhbC5zaGF0dGVyYmxva19hZ3JlZW1lbnRfZGF0ZSAhPSBudWxsICYmIHZhbC5hdWRpb2RlYWRsaW5lX2FncmVlbWVudF9kYXRlID09bnVsbCApe1xuLy8gICAgICAgLy8gY29uc29sZS5sb2coJ3NoYXR0ZXIgYmxvaycpO1xuLy8gICAgICAgdGhpcy5zaCA9IHRydWU7XG4vLyAgICAgICB0aGlzLmF1ZCA9IGZhbHNlO1xuLy8gICAgIH1cbi8vICAgICBpZiAodmFsLnNoYXR0ZXJibG9rX2FncmVlbWVudF9kYXRlICE9IG51bGwgJiYgdmFsLmF1ZGlvZGVhZGxpbmVfYWdyZWVtZW50X2RhdGUgIT1udWxsKSB7XG4vLyAgICAgICB0aGlzLnNoID0gdHJ1ZTtcbi8vICAgICAgIHRoaXMuYXVkID0gdHJ1ZTtcbi8vICAgICB9XG4vLyAgICAgaWYgKHZhbC5zaGF0dGVyYmxva19hZ3JlZW1lbnRfZGF0ZSA9PSBudWxsICYmIHZhbC5hdWRpb2RlYWRsaW5lX2FncmVlbWVudF9kYXRlID09bnVsbCkge1xuLy8gICAgICAgdGhpcy5zaCA9IGZhbHNlO1xuLy8gICAgICAgdGhpcy5hdWQgPSBmYWxzZTtcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgZ3JhcHVybCh2YWw6IGFueSl7XG4vLyAgICAgLy8gIGZvciBhbGwgcm93IGNoZWNraW5nXG4vLyAvLyBjb25zb2xlLmxvZyh2YWwpXG4vLyAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4vLyAgICAgICB0aGlzLmFydCA9IHRydWU7XG4vLyAgICAgICB0aGlzLmF1ZDIgPSB0cnVlO1xuLy8gICAgIH1cbi8vICAgICBpZiAodmFsID09IG51bGwpIHtcbi8vICAgICAgIHRoaXMuYXJ0ID0gZmFsc2U7XG4vLyAgICAgICB0aGlzLmF1ZDIgPSBmYWxzZTtcbi8vICAgICB9XG4vLyAgICAgLy8gY29uc29sZS5sb2codGhpcy5zaCk7XG4vLyAgICAgLy8gY29uc29sZS5sb2codGhpcy5hdWQpO1xuLy8gICB9XG5cbi8vICAgICBjb3B5VGV4dChyb3c6IGFueSwgdmFsOiBzdHJpbmcpe1xuLy8gICAgIGNvbnNvbGUubG9nKCdyb3cgaW4gY29weVRleHQnKTtcbi8vICAgICBjb25zb2xlLmxvZyhyb3cpO1xuLy8gICAgIGNvbnNvbGUubG9nKCd2YWwgaW4gY29weVRleHQnKTtcbi8vICAgICBjb25zb2xlLmxvZyh2YWwpXG4vLyAgICAgICBsZXQgZnVsbHVybCA9IHZhbCsnJytyb3c7XG4vLyAgICAgY29uc29sZS5sb2coZnVsbHVybCk7XG4vLyAgICAgICAgIGxldCBzZWxCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuLy8gICAgICAgICBzZWxCb3guc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuLy8gICAgICAgICBzZWxCb3guc3R5bGUubGVmdCA9ICcwJztcbi8vICAgICAgICAgc2VsQm94LnN0eWxlLnRvcCA9ICcwJztcbi8vICAgICAgICAgc2VsQm94LnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4vLyAgICAgICAgIHNlbEJveC52YWx1ZSA9IGZ1bGx1cmw7XG4vLyAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsQm94KTtcbi8vICAgICAgICAgc2VsQm94LmZvY3VzKCk7XG4vLyAgICAgICAgIHNlbEJveC5zZWxlY3QoKTtcbi8vICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbi8vICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzZWxCb3gpO1xuLy8gICAgIH1cblxuLy8gICBjbGlja3VybCh2YWw6IGFueSAsIHVybDogYW55KSB7XG4vLyAgICAgbGV0IGlcbi8vICAgICBjb25zb2xlLmxvZygnb2snKTtcbi8vICAgICBjb25zb2xlLmxvZyh2YWwpO1xuLy8gICAgIGNvbnNvbGUubG9nKHZhbC5faWQpO1xuLy8gICAgIGNvbnNvbGUubG9nKHVybCk7XG4vLyAgICAgY29uc29sZS5sb2codXJsICsgJycgK3ZhbC5faWQgKyAnJyArIHRoaXMucGRmX2xpbmtfdmFsKTtcbi8vICAgICBsZXQgbGluaz0gdXJsICsgJycgK3ZhbC5faWQgKyAnJyArIHRoaXMucGRmX2xpbmtfdmFsO1xuLy8gICAgIHdpbmRvdy5vcGVuKGxpbmssIFwiX2JsYW5rXCIpO1xuLy8gICB9XG5cblxuLy8gICAvKiogV2hldGhlciB0aGUgbnVtYmVyIG9mIHNlbGVjdGVkIGVsZW1lbnRzIG1hdGNoZXMgdGhlIHRvdGFsIG51bWJlciBvZiByb3dzLiAqL1xuLy8gICBpc0FsbFNlbGVjdGVkKCkge1xuLy8gICAgIGNvbnN0IG51bVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuLy8gICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5sZW5ndGg7XG4vLyAgICAgcmV0dXJuIG51bVNlbGVjdGVkID09PSBudW1Sb3dzO1xuLy8gICB9XG5cbi8vICAgLyoqIFNlbGVjdHMgYWxsIHJvd3MgaWYgdGhleSBhcmUgbm90IGFsbCBzZWxlY3RlZDsgb3RoZXJ3aXNlIGNsZWFyIHNlbGVjdGlvbi4gKi9cbi8vICAgbWFzdGVyVG9nZ2xlKCkge1xuLy8gICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cbi8vICAgICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKSA6XG4vLyAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhLmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbi8vICAgfVxuXG4vLyAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjaGVja2JveCBvbiB0aGUgcGFzc2VkIHJvdyAqL1xuLy8gICBjaGVja2JveExhYmVsKHJvdz86IGFueSk6IHN0cmluZyB7XG4vLyAgICAgaWYgKCFyb3cpIHtcbi8vICAgICAgIHJldHVybiBgJHt0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/ICdzZWxlY3QnIDogJ2Rlc2VsZWN0J30gYWxsYDtcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIGAke3RoaXMuc2VsZWN0aW9uLmlzU2VsZWN0ZWQocm93KSA/ICdkZXNlbGVjdCcgOiAnc2VsZWN0J30gcm93ICR7cm93LnBvc2l0aW9uICsgMX1gO1xuLy8gICB9XG5cblxuLy8gICBjcmVhdGVEYXRhKHBvaW50OmFueSl7XG4vLyAgICAgbGV0IGRhdGEgPSB7fTtcbi8vICAgICBPYmplY3Qua2V5cyhwb2ludCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4vLyAgICAgICBkYXRhW2tleS5yZXBsYWNlKC9cXHMvZywgXCJfXCIpXSA9IHBvaW50W2tleV07XG4vLyAgICAgfSk7XG4vLyAgICAgcmV0dXJuIGRhdGFcbi8vICAgfVxuXG4vLyAgIGFwcGx5RmlsdGVyKGZpbHRlclZhbHVlOiBzdHJpbmcpIHtcbi8vICAgICBjb25zb2xlLmxvZyhmaWx0ZXJWYWx1ZSlcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGFTb3VyY2UpO1xuLy8gICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YVNvdXJjZVtuYW1lXSlcbi8vICAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbi8vICAgICBpZiAodGhpcy5kYXRhU291cmNlLnBhZ2luYXRvcikge1xuLy8gICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvci5maXJzdFBhZ2UoKTtcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgLyphcHBseUZpbHRlcjEoZmlsdGVyVmFsdWU6IHN0cmluZywgdmFsOiBhbnkpIHtcbi8vICAgICBjb25zb2xlLmxvZyhmaWx0ZXJWYWx1ZSk7XG4vLyAgICAgY29uc29sZS5sb2codmFsLnZhbHVlKTtcbi8vICAgICBsZXQgdmFsdWU9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UodmFsLnZhbHVlKTtcblxuLy8gICAgIHZhbHVlLmZpbHRlciA9IGZpbHRlclZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuLy8gICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbi8vICAgICAvISogdGhpcy5kYXRhU291cmNlLmZpbHRlclByZWRpY2F0ZSA9IGZ1bmN0aW9uKGRhdGEsIGZpbHRlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4vLyAgICAgICAvLyByZXR1cm4gZGF0YS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyKTtcbi8vICAgICB9O1xuLy8gICAgIGlmICh0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yKSB7XG4vLyAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yLmZpcnN0UGFnZSgpO1xuLy8gICAgIH0qIS9cbi8vICAgfSovXG5cbi8vICAgc3R5bGVDZWxsKGNvbF9uYW1lLHJvdyl7XG5cbi8vICAgICAvKlxuLy8gICAgICBpZiAoY29sX25hbWVbJ2NvbHVtbkRlZiddPT0ncHJvZ3Jlc3MnICYmIHJvd1sncHJvZ3Jlc3MnXT09JzEwMCcpe1xuLy8gICAgICByZXR1cm4geydjb2xvcicgOiAncmVkJ31cbi8vICAgICAgfSBlbHNlIHtcbi8vICAgICAgcmV0dXJuIHt9XG4vLyAgICAgIH1cbi8vICAgICAgKi9cblxuXG4vLyAgICAgcmV0dXJuIHt9XG4vLyAgIH1cblxuXG4vLyAgIHZpZXdkYXRhKGRhdGExOmFueSl7XG4vLyAgICAgbGV0IGRhdGE6YW55O1xuLy8gICAgIGRhdGE9ZGF0YTE7XG4vLyAgICAgbGV0IGRhdGEyOmFueT1bXTtcbi8vICAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4vLyAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuLy8gICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbi8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coa2V5ICsgXCIgLT4gXCIgKyBkYXRhW2tleV0rXCItLS0+XCIrdHlwZW9mIChkYXRhW2tleV0pKTtcbi8vICAgICAgICAgICAgICAgaWYodHlwZW9mIChkYXRhW2tleV0pPT0nYm9vbGVhbicpIHtcbi8vICAgICAgICAgICAgICAgICAgIGlmKGRhdGFba2V5XT09dHJ1ZSkgZGF0YVtrZXldPSdZZXMnO1xuLy8gICAgICAgICAgICAgICAgICAgaWYoZGF0YVtrZXldPT1mYWxzZSkgZGF0YVtrZXldPSdObyc7XG4vLyAgICAgICAgICAgICAgIH1cblxuXG4vLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSlcblxuLy8gICAgICAgICAgICAgICBpZih0eXBlb2YgKGRhdGFba2V5XSk9PSdvYmplY3QnKSB7XG4vLyAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGRhdGE6YW55PVtdO1xuLy8gICAgICAgICAgICAgICAgICAgZm9yKGxldCBrIGluIGRhdGFba2V5XSl7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2tleScpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kZXRhaWxfZGF0YXR5cGV2YWwpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgcCBpbiB0aGlzLmRldGFpbF9kYXRhdHlwZXZhbCl7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHApO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2tleV1ba10pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRldGFpbF9kYXRhdHlwZXZhbFtwXS5rZXk9PWtleSAmJiB0aGlzLmRldGFpbF9kYXRhdHlwZXZhbFtwXS52YWx1ZT09J2ltYWdlJyl7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWd2YWw6YW55PXRoaXMuZGV0YWlsX2RhdGF0eXBldmFsW3BdLmZpbGV1cmwrZGF0YVtrZXldW2tdLnJlcGxhY2UoLycvZywgJycpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltZ3ZhbCcpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltZ3ZhbCcpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW1ndmFsKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFba2V5XVtrXS5yZXBsYWNlKC8nL2csICcnKSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wZGF0YS5wdXNoKFwiPGltZyBtYXQtY2FyZC1pbWFnZSBzcmM9XCIraW1ndmFsK1wiPjxici8+XCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZW1wZGF0YS5wdXNoKFwiPHNwYW4+XCIrZGF0YVtrZXldW2tdK1wiPC9zcGFuPjxici8+XCIpXG5cblxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZGV0YWlsX2RhdGF0eXBldmFsW3BdLmtleT09a2V5ICYmIHRoaXMuZGV0YWlsX2RhdGF0eXBldmFsW3BdLnZhbHVlIT0naW1hZ2UnKXtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGVtcGRhdGEucHVzaChcIjxpbWcgbWF0LWNhcmQtaW1hZ2Ugc3JjPVwiK2RhdGFba2V5XVtrXStcIj48YnIvPlwiKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGRhdGEucHVzaChcIjxzcGFuPlwiK2RhdGFba2V5XVtrXStcIjwvc3Bhbj48YnIvPlwiKTtcblxuXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XT10ZW1wZGF0YTtcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH1cbi8vICAgICAgIH1cblxuLy8gICAgICAgY29uc29sZS5sb2coJ2RhdGEnKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgICAgZm9yKGxldCBuIGluIGRhdGEpe1xuLy8gICAgICAgICBpZihkYXRhW25dIT1udWxsICYmIGRhdGFbbl0hPScnKXtcbi8vICAgICAgICAgICBkYXRhMltuXT1kYXRhW25dO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG5cbi8vICAgICBmb3IobGV0IHYgaW4gdGhpcy5kZXRhaWxfc2tpcF9hcnJheXZhbCl7XG4vLyAgICAgICAvL2RhdGEyW3RoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl1dPScnO1xuLy8gICAgICAgZGVsZXRlIGRhdGEyW3RoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl1dO1xuLy8gICAgICAgY29uc29sZS5sb2coJ3RoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl0nKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl0pO1xuLy8gICAgIH1cbi8vICAgICAgIGxldCByZXMgPSBPYmplY3QuZW50cmllcyhkYXRhMik7XG4vLyAgICAgY29uc29sZS5sb2coJ3RoaXMuZGV0YWlsX3NraXBfYXJyYXknKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbF9za2lwX2FycmF5dmFsKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbF9kYXRhdHlwZXZhbCk7XG5cbi8vICAgICBjb25zb2xlLmxvZygncmVzJyk7XG4vLyAgICAgY29uc29sZS5sb2cocmVzKTtcblxuXG5cbi8vICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbi8vICAgICAgIGhlaWdodDogJ2F1dG8nLFxuLy8gICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4vLyAgICAgICBkYXRhOiB7aXNjb25maXJtYXRpb246ZmFsc2UsZGF0YTpyZXN9XG4vLyAgICAgfSk7XG5cbi8vICAgfVxuLy8gICBtYW5hZ2VzdGF0dXMoZGF0YTphbnkpe1xuLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhJyk7XG4vLyAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgbGV0IGJzPXRoaXMuYm90dG9tU2hlZXQub3BlbihCb3R0b21TaGVldCx7cGFuZWxDbGFzczogJ2N1c3RvbS1ib3R0b21zaGVldCcsZGF0YTp7aXRlbXM6dGhpcy5zdGF0dXNhcnJ2YWx9fSk7XG5cbi8vICAgICBicy5hZnRlckRpc21pc3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ1RoZSBib3R0b20gc2hlZXQgd2FzIGNsb3NlZCcpO1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbi8vICAgICAgIGlmKHJlc3VsdCE9bnVsbCl7XG4vLyAgICAgICAgIGRhdGEuc3RhdHVzID0gcmVzdWx0LnZhbDtcbi8vICAgICAgICAgZGF0YS5pZCA9IGRhdGEuX2lkO1xuLy8gICAgICAgdGhpcy5fYXBpU2VydmljZS50b2dnbGVzdGF0dXModGhpcy5hcGl1cmx2YWwgKyAnc3RhdHVzdXBkYXRlJywgZGF0YSwgdGhpcy5qd3R0b2tlbnZhbCwgdGhpcy5zb3VyY2VkYXRhdmFsKS5zdWJzY3JpYmUocmVzID0+IHtcbi8vICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4vLyAgICAgICAgIHJlc3VsdCA9IHJlcztcbi8vICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gJ3N1Y2Nlc3MnKSB7XG4vLyAgICAgICAgICAgZm9yIChsZXQgYyBpbiB0aGlzLm9sZGRhdGEpIHtcbi8vICAgICAgICAgICAgIC8vdGhpcy5vbGRkYXRhID0gdGhpcy5vbGRkYXRhLmZpbHRlcihvbGRkYXRhID0+IG9sZGRhdGEuX2lkICE9IGlkc1tjXSk7XG4vLyAgICAgICAgICAgICBpZiAodGhpcy5vbGRkYXRhW2NdLl9pZCA9PSBkYXRhLl9pZCkge1xuLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW4gZGF0YSB1cGRhdGUnKTtcbi8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICAgIHRoaXMub2xkZGF0YVtjXS5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSh0aGlzLm9sZGRhdGEpO1xuLy8gICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsKHRydWUsIFtdKTtcbi8vICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4vLyAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG5cbi8vICAgICAgICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7XG4vLyAgICAgICAgICAgICBwYW5lbENsYXNzOiAnY3VzdG9tLW1vZGFsYm94Jyxcbi8vICAgICAgICAgICAgIGRhdGE6IHttZXNzYWdlOiAnU3RhdHVzIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5ISEnLCBpc2NvbmZpcm1hdGlvbjogZmFsc2V9XG4vLyAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfVxuXG4vLyAgICAgICB9LCBlcnJvciA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdPb29vcHMhJyk7XG4vLyAgICAgICB9KTtcbi8vICAgICB9XG4vLyAgICAgICAvL3RoaXMuYW5pbWFsID0gcmVzdWx0O1xuLy8gICAgIH0pO1xuXG4vLyAgIH1cblxuLy8gLy8gZm9yIHRyZWUgdmlldyBpbiBtb2RhbFxuLy8gICBjdXN0b21idXR0b25mdW5jKGRhdGE6YW55KXtcbi8vICAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpOyAgICAvLyByb3cgZGF0YVxuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuY3VzdG9tYnV0dG9udmFsKTsgICAgLy8gb2JqZWN0IGZyb20gd2hlcmUgdGhlIGxpYnJhcnkgaGFzIGJlZW4gdXNlZFxuLy8gICAgIGxldCB1bnNhZmV1cmw6YW55PXRoaXMuY3VzdG9tYnV0dG9udmFsLnVybDsgICAvL2lmcmFtZSB1cmxcbi8vICAgICBmb3IobGV0IGIgaW4gdGhpcy5jdXN0b21idXR0b252YWwuZmllbGRzKXtcbi8vICAgICAgIHVuc2FmZXVybD11bnNhZmV1cmwrJy8nK2RhdGFbdGhpcy5jdXN0b21idXR0b252YWwuZmllbGRzW2JdXTtcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coJ3Vuc2FmZXVybCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuc2FmZXVybCk7XG4vLyAgICAgdW5zYWZldXJsPXRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1bnNhZmV1cmwpOyAgIC8vZm9yIHNhbml0aXppbmcgdGhlIHVybCBmb3Igc2VjdXJpdHksIG90aGVyd2lzZSBpdCB3b24ndCBiZSBhYmxlIHRvIHNob3cgdGhlIHBhZ2UgaW4gaWZyYW1lLCBoZW5jZSBtb2RhbFxuXG4vLyAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7ICAgICAgIC8vIGZvciBvcGVuaW5nIHRoZSBtb2RhbFxuLy8gICAgICAgaGVpZ2h0OiAnYXV0bycsXG4vLyAgICAgICBwYW5lbENsYXNzOiAnY3VzdG9tLWRhdGEtbW9kYWwnLFxuLy8gICAgICAgZGF0YToge2lzY29uZmlybWF0aW9uOmZhbHNlLGRhdGE6W3tkYXRhOmRhdGEsY3VzdG9tZGF0YTp1bnNhZmV1cmx9XX1cbi8vICAgICB9KTtcblxuXG4vLyAgIH1cblxuXG5cbi8vICAgbWFuYWdlc3RhdHVzbXVsdGlwbGUoKXtcblxuLy8gICAgIGxldCBpZHM6YW55PVtdO1xuLy8gICAgIGxldCBjOmFueTtcbi8vICAgICBmb3IoYyBpbiB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZCl7XG5cbi8vICAgICAgIGlkcy5wdXNoKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkW2NdLl9pZCk7XG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUubG9nKCdpZHMnKTtcbi8vICAgICBjb25zb2xlLmxvZyhpZHMpO1xuLy8gICAgIC8vY29uc29sZS5sb2coJ2RhdGEnKTtcbi8vICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgIGxldCBicz10aGlzLmJvdHRvbVNoZWV0Lm9wZW4oQm90dG9tU2hlZXQse2RhdGE6e2l0ZW1zOnRoaXMuc3RhdHVzYXJydmFsfX0pO1xuXG4vLyAgICAgYnMuYWZ0ZXJEaXNtaXNzZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdUaGUgYm90dG9tIHNoZWV0IHdhcyBjbG9zZWQnKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4vLyAgICAgICBpZihyZXN1bHQhPW51bGwpe1xuLy8gICAgICAgICAvL2RhdGEuc3RhdHVzID0gcmVzdWx0LnZhbDtcbi8vICAgICAgICAgLy9kYXRhLmlkID0gZGF0YS5faWQ7XG4vLyAgICAgICAgIGxldCBuZXdzdGF0dXM6YW55PXJlc3VsdC52YWw7XG4vLyAgICAgICB0aGlzLl9hcGlTZXJ2aWNlLnRvZ2dsZXN0YXR1c21hbnkodGhpcy5hcGl1cmx2YWwgKyAnc3RhdHVzdXBkYXRlJywgaWRzLHJlc3VsdC52YWwsIHRoaXMuand0dG9rZW52YWwsIHRoaXMuc291cmNlZGF0YXZhbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4vLyAgICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuLy8gICAgICAgICByZXN1bHQgPSByZXM7XG4vLyAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09ICdzdWNjZXNzJykge1xuLy8gICAgICAgICAgIGZvciAobGV0IGMgaW4gdGhpcy5vbGRkYXRhKSB7XG4vLyAgICAgICAgICAgICAvL3RoaXMub2xkZGF0YSA9IHRoaXMub2xkZGF0YS5maWx0ZXIob2xkZGF0YSA9PiBvbGRkYXRhLl9pZCAhPSBpZHNbY10pO1xuLy8gICAgICAgICAgICAgaWYgKGlkcy5pbmRleE9mKHRoaXMub2xkZGF0YVtjXS5faWQpPi0xKSB7XG4vLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBkYXRhIHVwZGF0ZScpO1xuLy8gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgICAgICAgICAgICB0aGlzLm9sZGRhdGFbY10uc3RhdHVzID0gbmV3c3RhdHVzO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHRoaXMub2xkZGF0YSk7XG4vLyAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWwodHJ1ZSwgW10pO1xuLy8gICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbi8vICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcblxuLy8gICAgICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbi8vICAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdjdXN0b20tbW9kYWxib3gnLFxuLy8gICAgICAgICAgICAgZGF0YToge21lc3NhZ2U6ICdTdGF0dXMgdXBkYXRlZCBzdWNjZXNzZnVsbHkhIScsIGlzY29uZmlybWF0aW9uOiBmYWxzZX1cbi8vICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9XG5cbi8vICAgICAgIH0sIGVycm9yID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ09vb29wcyEnKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH1cbi8vICAgICAgIC8vdGhpcy5hbmltYWwgPSByZXN1bHQ7XG4vLyAgICAgfSk7XG5cbi8vICAgfVxuXG4vLyAgIGRlbGV0ZW11bHRpcGxlKCl7XG4vLyAgICAgY29uc29sZS5sb2coJ3RoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCk7XG4vLyAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3Rpb24pO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkKTtcblxuLy8gICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQ29uZmlybWRpYWxvZywge1xuLy8gICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4vLyAgICAgICBkYXRhOiB7bWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHNlbGVjdGVkIHJlY29yZHM/J31cbi8vICAgICB9KTtcbi8vICAgICBsZXQgaWRzOmFueT1bXTtcbi8vICAgICBsZXQgYzphbnk7XG4vLyAgICAgZm9yKGMgaW4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQpe1xuXG4vLyAgICAgICBpZHMucHVzaCh0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZFtjXS5faWQpO1xuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmxvZygnaWRzJyk7XG4vLyAgICAgY29uc29sZS5sb2coaWRzKTtcblxuLy8gICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ1RoZSBkaWFsb2cgd2FzIGNsb3NlZCcpO1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbi8vICAgICAgIGlmKHJlc3VsdD09J3llcycpe1xuLy8gICAgICAgICB0aGlzLl9hcGlTZXJ2aWNlLmRldGVNYW55RGF0YSh0aGlzLmFwaXVybHZhbCt0aGlzLmRlbGV0ZWVuZHBvaW50dmFsLGlkcyx0aGlzLmp3dHRva2VudmFsLHRoaXMuc291cmNlZGF0YXZhbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4vLyAgICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4vLyAgICAgICAgICAgcmVzdWx0ID0gcmVzO1xuLy8gICAgICAgICAgIGlmKHJlc3VsdC5zdGF0dXM9PSdzdWNjZXNzJyl7XG4vLyAgICAgICAgICAgICBmb3IobGV0IGMgaW4gaWRzKXtcbi8vICAgICAgICAgICAgICAgdGhpcy5vbGRkYXRhID0gdGhpcy5vbGRkYXRhLmZpbHRlcihvbGRkYXRhID0+IG9sZGRhdGEuX2lkICE9IGlkc1tjXSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5vbGRkYXRhJyk7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9sZGRhdGEpO1xuLy8gICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSh0aGlzLm9sZGRhdGEpO1xuLy8gICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWwodHJ1ZSwgW10pO1xuLy8gICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuLy8gICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG5cbi8vICAgICAgICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbi8vICAgICAgICAgICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4vLyAgICAgICAgICAgICAgIGRhdGE6IHttZXNzYWdlOiAnUmVjb3JkKHMpICBkZWxldGVkIHN1Y2Nlc3NmdWxseSAhIScsaXNjb25maXJtYXRpb246ZmFsc2V9XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICB9LCBlcnJvciA9PiB7XG4vLyAgICAgICAgICAgY29uc29sZS5sb2coJ09vb29wcyEnKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgIH1cbi8vICAgICAgIC8vdGhpcy5hbmltYWwgPSByZXN1bHQ7XG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vICAgZGVsZXRlZGF0YShkYXRhOmFueSl7XG4vLyAgICAgLy9hbGVydCg1KTtcbi8vICAgICAvL3RoaXMuX2FwaVNlcnZpY2UuZGV0ZU9uZURhdGEodGhpcy5hcGl1cmx2YWwrdGhpcy5kZWxldGVlbmRwb2ludHZhbCxkYXRhLHRoaXMuand0dG9rZW52YWwpO1xuLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIDg4OSAtLS0nKTtcbi8vICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICBjb25zb2xlLmxvZygnand0dG9rZW52YWwnKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmp3dHRva2VudmFsKTtcblxuXG4vLyAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7XG4vLyAgICAgICBwYW5lbENsYXNzOiAnY3VzdG9tLW1vZGFsYm94Jyxcbi8vICAgICAgIGhlaWdodDogJ2F1dG8nLFxuLy8gICAgICAgZGF0YToge21lc3NhZ2U6ICdBcmUgeW91IHN1cmUgdG8gZGVsZXRlIHRoaXMgcmVjb3JkID8/J31cbi8vICAgICB9KTtcblxuLy8gICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ1RoZSBkaWFsb2cgd2FzIGNsb3NlZCcpO1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbi8vICAgICAgIGlmKHJlc3VsdD09J3llcycpe1xuLy8gICAgICAgICB0aGlzLl9hcGlTZXJ2aWNlLmRldGVPbmVEYXRhKHRoaXMuYXBpdXJsdmFsK3RoaXMuZGVsZXRlZW5kcG9pbnR2YWwsZGF0YSx0aGlzLmp3dHRva2VudmFsLHRoaXMuc291cmNlZGF0YXZhbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4vLyAgICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4vLyAgICAgICAgICAgcmVzdWx0ID0gcmVzO1xuLy8gICAgICAgICAgIGlmKHJlc3VsdC5zdGF0dXM9PSdzdWNjZXNzJyl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5vbGRkYXRhJyk7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9sZGRhdGEpO1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5vbGRkYXRhLl9pZCk7XG4vLyAgICAgICAgICAgICB0aGlzLm9sZGRhdGEgPSB0aGlzLm9sZGRhdGEuZmlsdGVyKG9sZGRhdGEgPT4gb2xkZGF0YS5faWQgIT0gZGF0YS5faWQpXG4vLyAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHRoaXMub2xkZGF0YSk7XG4vLyAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb25Nb2RlbCh0cnVlLCBbXSk7XG4vLyAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4vLyAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbi8vICAgICAgICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbi8vICAgICAgICAgICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4vLyAgICAgICAgICAgICAgIGRhdGE6IHttZXNzYWdlOiAnUmVjb3JkICBkZWxldGVkIHN1Y2Nlc3NmdWxseSAhIScsaXNjb25maXJtYXRpb246ZmFsc2V9XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICB9XG5cbi8vICAgICAgICAgfSwgZXJyb3IgPT4ge1xuLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdPb29vcHMhJyk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICB9XG4vLyAgICAgICAvL3RoaXMuYW5pbWFsID0gcmVzdWx0O1xuLy8gICAgIH0pO1xuXG4vLyAgIH1cblxuLy8gIGVkaXRkYXRhKGRhdGE6YW55KXtcbi8vICAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdHJvdXRldmFsKTtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLmVkaXRyb3V0ZXZhbCtkYXRhLl9pZCk7XG4vLyAgICAgY29uc29sZS5sb2codGhpcy5qd3R0b2tlbnZhbCk7XG4vLyAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5lZGl0cm91dGV2YWwsZGF0YS5faWRdKTtcbi8vICAgICAvL3RoaXMubmFcblxuXG4vLyAgIH1cblxuLy8gICAvKiBhcnRpc3R4cCBwcmV2aWV3IGJ1dHRvbiBjbGljayBmdW5jdGlvbiBzdGFydCAqL1xuLy8gICBhcnRpc3R4cFByZXZpZXcoc2luZ2xlRGF0YTogYW55KSB7XG4vLyAgICAgbGV0IGxpbmsgPSAnaHR0cDovL2RldmVsb3BtZW50YXBpLmF1ZGlvZGVhZGxpbmUuY29tOjMwOTAvJyArICdkYXRhbGlzdCc7XG4vLyAgICAgLyoqKioqKiogbm90IGNvbXBsZXRlZCAqKioqKiovXG4vLyAgICAgbGV0IGRhdGE6IGFueSA9IHsgXCJzb3VyY2VcIjogXCJibG9ja2NoYWludXNlcl92aWV3XCIsIFwiY29uZGl0aW9uXCI6IHsgXCJwb3N0c19pZF9vYmplY3RcIjogc2luZ2xlRGF0YS5faWQgfSwgXCJ0b2tlblwiOiB0aGlzLmp3dHRva2VudmFsIH07XG4vLyAgICAgLyoqKioqKioqIG5vdCBjb21wbGV0ZWQgKioqKiovXG4vLyAgICAgdGhpcy5fYXBpU2VydmljZS5wb3N0RGF0YShsaW5rLCBkYXRhKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuLy8gICAgICAgbGV0IHJlc3RsdDogYW55ID0gcmVzcG9uc2U7XG4vLyAgICAgICAvKiBvcGVuIGRpYWxvZyAqL1xuLy8gICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7XG4vLyAgICAgICAgIHBhbmVsQ2xhc3M6ICdjdXN0b20tbW9kYWxib3gtYXJ0aXN0eHAtcHJldmlldycsXG4vLyAgICAgICAgIGhlaWdodDogJ2F1dG8nLFxuLy8gICAgICAgICBkYXRhOiB7IHByZXZpZXc6IHRydWUsIHByZXZpZXdEYXRhOiByZXN0bHQgfVxuLy8gICAgICAgfSk7XG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vICAgLyogYXJ0aXN0eHAgcHJldmlldyBidXR0b24gY2xpY2sgZnVuY3Rpb24gZW5kICovXG5cblxuXG4vLyB9XG5cblxuLy8gQENvbXBvbmVudCh7XG4vLyAgIHNlbGVjdG9yOiAnY29uZmlybWRpYWxvZycsXG4vLyAgIHRlbXBsYXRlVXJsOiAnY29uZmlybS1kaWFsb2cuaHRtbCcsXG4vLyB9KVxuLy8gZXhwb3J0IGNsYXNzIENvbmZpcm1kaWFsb2cge1xuXG4vLyAgIGNvbnN0cnVjdG9yKFxuLy8gICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbmZpcm1kaWFsb2c+LFxuLy8gICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkgLHB1YmxpYyBzYW5pdGl6ZXI6RG9tU2FuaXRpemVyKSB7XG4vLyAgICAgY29uc29sZS5sb2coJ215IGRhdGEgLi4uJyk7XG4vLyAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcbi8vICAgfVxuXG4vLyAgIG9uTm9DbGljaygpOiB2b2lkIHtcbi8vICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuLy8gICB9XG4vLyAgIHNhbml0aXplVXJsKHVuc2FmZXVybDphbnksZGF0YTphbnkscm93ZGF0YTphbnkpe1xuLy8gICAgIGZvcihsZXQgYiBpbiBkYXRhKXtcbi8vICAgICAgIHVuc2FmZXVybD11bnNhZmV1cmwrJy8nK3Jvd2RhdGFbZGF0YVtiXV07XG5cbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coJ3Vuc2FmZXVybCcpO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuc2FmZXVybCk7XG4vLyAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgY29uc29sZS5sb2cocm93ZGF0YSk7XG4vLyAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1bnNhZmV1cmwpO1xuLy8gICB9XG5cbi8vIH1cblxuXG5cblxuLy8gQENvbXBvbmVudCh7XG4vLyAgIHNlbGVjdG9yOiAnYm90dG9tLXNoZWV0Jyxcbi8vICAgdGVtcGxhdGVVcmw6ICdib3R0b20tc2hlZXQuaHRtbCcsXG4vLyB9KVxuLy8gZXhwb3J0IGNsYXNzIEJvdHRvbVNoZWV0IHtcbi8vICAgY29uc3RydWN0b3IocHJpdmF0ZSBib3R0b21TaGVldFJlZjogTWF0Qm90dG9tU2hlZXRSZWY8Qm90dG9tU2hlZXQ+LEBJbmplY3QoTUFUX0JPVFRPTV9TSEVFVF9EQVRBKSBwdWJsaWMgZGF0YTphbnkpIHt9XG5cbi8vICAgb3BlbkxpbmsodmFsOmFueSk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKCdib3R0b21zaGVldCBkYXRhJyk7XG4vLyAgICAgY29uc29sZS5sb2codmFsKTtcbi8vICAgICB0aGlzLmJvdHRvbVNoZWV0UmVmLmRpc21pc3ModmFsKTtcbi8vICAgICAvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4vLyAgIH1cbi8vIH1cblxuXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBJbmplY3QsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRTb3J0LCBNYXRUYWJsZURhdGFTb3VyY2UsTWF0UGFnaW5hdG9yfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge1NlbGVjdGlvbk1vZGVsfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge01hdEJvdHRvbVNoZWV0LCBNYXRCb3R0b21TaGVldFJlZixNQVRfQk9UVE9NX1NIRUVUX0RBVEF9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TmF2aWdhdGlvbkNhbmNlbCwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yLCBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciwgRXZlbnR9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmRlY2xhcmUgdmFyICQ6YW55O1xuaW1wb3J0ICogYXMgbW9tZW50SW1wb3J0ZWQgZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudEltcG9ydGVkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbGlzdGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0aW5nLm1vZHVsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGlzdGluZy5tb2R1bGUuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlzdGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbXlDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cblxuICBkYXRhc291cmNldmFsOmFueTtcbiAgc2VhcmNoX3NldHRpbmdzdmFsOmFueTtcbiAgY2xpY2tfdG9fYWRkX2FuYW5vdGhlcl9wYWdldmFsOmFueTtcbiAgZ3JhYl9saW5rdmFsOmFueTtcbiAgZGF0ZV9zZWFyY2hfc291cmNldmFsOmFueTtcbiAgZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw6YW55O1xuICB1cmx2YWw6YW55O1xuICBzZWFyY2hlbmRwb2ludHZhbDphbnk7XG4gIHNlYXJjaExpc3R2YWw6YW55O1xuICBwZGZfbGlua192YWw6YW55O1xuICBzdGF0dXNhcnJ2YWw6YW55O1xuICBza2lwdmFsOmFueTtcbiAgZXJyb3JtZzphbnk7XG4gIGp3dHRva2VudmFsOmFueTtcbiAgZGV0YWlsX2RhdGF0eXBldmFsOmFueTtcbiAgZGV0YWlsX3NraXBfYXJyYXl2YWw6YW55O1xuICBkZWxldGVlbmRwb2ludHZhbDphbnk7XG4gIGVkaXRyb3V0ZXZhbDphbnk7XG4gIGFwaXVybHZhbDphbnk7XG4gIHVwZGF0ZWVuZHBvaW50dmFsOmFueTtcbiAgbW9kaWZ5X2hlYWRlcl9hcnJheXZhbDphbnk7XG4gIHNlbGVjdGlvbiA6YW55O1xuICBzb3VyY2VkYXRhdmFsIDphbnk7XG4gIGVtYWlsYXJyYXl2YWwgOmFueTtcbiAgY29sdW1ucyA6YW55PVtdO1xuICBvbGRkYXRhIDphbnk9W107XG4gIHRzZWFyY2ggOmFueT1bXTtcbiAgYXV0b3NlYXJjaCA6YW55PVtdO1xuICBwdWJsaWMgeCA6YW55O1xuICBwdWJsaWMgY3VzdG9tYnV0dG9udmFsIDphbnk7XG4gIHB1YmxpYyByZXN1bHQgOmFueSA9IHt9O1xuICBwdWJsaWMgc2ggOmFueSA9IGZhbHNlO1xuICBwdWJsaWMgYXJ0IDphbnkgPSBmYWxzZTtcbiAgcHVibGljIGF1ZDIgOmFueSA9IGZhbHNlO1xuICBwdWJsaWMgYXVkIDphbnkgPSBmYWxzZTtcblxuICAvKiB0aGlzIHZhcmlhYmxlIGZvciBhcnRpc3QgeHAgcHJldmlldyAqL1xuICBwcmV2aWV3Rmx1ZzogYW55ID0gZmFsc2U7XG5cblxuICBASW5wdXQoKVxuICBzZXQgc2VhcmNoX3NldHRpbmdzKHNlYXJjaF9zZXR0aW5nczogYW55KSB7XG4gICAgdGhpcy5zZWFyY2hfc2V0dGluZ3N2YWwgPSBzZWFyY2hfc2V0dGluZ3M7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuc2VhcmNoX3NldHRpbmdzdmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hfc2V0dGluZ3N2YWwpO1xuICAgIC8qZm9yIChsZXQgaT0gMDsgaTw9IHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlYXJjaC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hfc2V0dGluZ3N2YWwuc2VhcmNoW2ldLmxhYmVsKTtcbiAgICB9Ki9cblxuICAvKiAgY29uc29sZS5sb2codGhpcy5zZWFyY2hfc2V0dGluZ3N2YWwuc2VsZWN0c2VhcmNoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlYXJjaF9zZXR0aW5nc3ZhbC5zZWxlY3RzZWFyY2hbMF0ubGFiZWwpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlbGVjdHNlYXJjaFswXS52YWx1ZXMpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLmRhdGVzZWFyY2gpOyovXG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY2xpY2tfdG9fYWRkX2FuYW5vdGhlcl9wYWdlKGNsaWNrX3RvX2FkZF9hbmFub3RoZXJfcGFnZTogYW55KSB7XG4gICAgdGhpcy5jbGlja190b19hZGRfYW5hbm90aGVyX3BhZ2V2YWwgPSBjbGlja190b19hZGRfYW5hbm90aGVyX3BhZ2U7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuY2xpY2tfdG9fYWRkX2FuYW5vdGhlcl9wYWdldmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5jbGlja190b19hZGRfYW5hbm90aGVyX3BhZ2V2YWwpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGdyYWJfbGluayhncmFiX2xpbms6IGFueSkge1xuICAgIHRoaXMuZ3JhYl9saW5rdmFsID0gZ3JhYl9saW5rO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLmdyYWJfbGlua3ZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JhYl9saW5rdmFsKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY3VzdG9tYnV0dG9uKGN1c3RvbWJ1dHRvbjogYW55KSB7XG4gICAgdGhpcy5jdXN0b21idXR0b252YWwgPSBjdXN0b21idXR0b247XG4gICAgY29uc29sZS5sb2coJ3RoaXMuY3VzdG9tYnV0dG9udmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5jdXN0b21idXR0b252YWwpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGVfc2VhcmNoX3NvdXJjZShkYXRlX3NlYXJjaF9zb3VyY2U6IGFueSkge1xuICAgIHRoaXMuZGF0ZV9zZWFyY2hfc291cmNldmFsID0gZGF0ZV9zZWFyY2hfc291cmNlO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0ZV9zZWFyY2hfc291cmNldmFsKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBkYXRlX3NlYXJjaF9lbmRwb2ludChkYXRlX3NlYXJjaF9lbmRwb2ludDogYW55KSB7XG4gICAgdGhpcy5kYXRlX3NlYXJjaF9lbmRwb2ludHZhbCA9IGRhdGVfc2VhcmNoX2VuZHBvaW50O1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLmRhdGVfc2VhcmNoX2VuZHBvaW50dmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5kYXRlX3NlYXJjaF9lbmRwb2ludHZhbCk7XG4gIH1cbiAgIEBJbnB1dCgpXG4gIHNldCB1cmwodXJsOiBhbnkpIHtcbiAgICB0aGlzLnVybHZhbCA9IHVybDtcbiAgICBjb25zb2xlLmxvZygndGhpcy51cmx2YWwnKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnVybHZhbCk7XG4gIH1cbiAgICBASW5wdXQoKVxuICBzZXQgc2VhcmNoZW5kcG9pbnQoc2VhcmNoZW5kcG9pbnQ6IGFueSkge1xuICAgIHRoaXMuc2VhcmNoZW5kcG9pbnR2YWwgPSBzZWFyY2hlbmRwb2ludDtcbiAgICBjb25zb2xlLmxvZygndGhpcy5zZWFyY2hlbmRwb2ludHZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoZW5kcG9pbnR2YWwpO1xuICB9XG4gICBASW5wdXQoKVxuICBzZXQgcGRmX2xpbmsocGRmX2xpbms6IGFueSkge1xuICAgIHRoaXMucGRmX2xpbmtfdmFsID0gcGRmX2xpbms7XG4gICAgY29uc29sZS5sb2coJ3RoaXMucGRmX2xpbmtfdmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5wZGZfbGlua192YWwpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBzZWFyY2hMaXN0KHNlYXJjaExpc3Q6IGFueSkge1xuICAgIHRoaXMuc2VhcmNoTGlzdHZhbCA9IHNlYXJjaExpc3Q7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuc2VhcmNoTGlzdHZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoTGlzdHZhbCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRhdGFzb3VyY2UoZGF0YXNvdXJjZTogYW55KSB7XG4gICAgdGhpcy5kYXRhc291cmNldmFsID0gZGF0YXNvdXJjZTtcbiAgICBjb25zb2xlLmxvZygndGhpcy5kYXRhc291cmNldmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhc291cmNldmFsKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBza2lwKHNraXA6IGFueSkge1xuICAgIHRoaXMuc2tpcHZhbCA9IHNraXA7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuc2tpcHZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2tpcHZhbCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRldGFpbF9kYXRhdHlwZShkZXRhaWxfZGF0YXR5cGU6IGFueSkge1xuICAgIHRoaXMuZGV0YWlsX2RhdGF0eXBldmFsID0gZGV0YWlsX2RhdGF0eXBlO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLmRldGFpbF9kYXRhdHlwZXZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsX2RhdGF0eXBldmFsKTtcbiAgfVxuIEBJbnB1dCgpXG4gIHNldCBkZXRhaWxfc2tpcF9hcnJheShkZXRhaWxfc2tpcF9hcnJheTogYW55KSB7XG4gICAgdGhpcy5kZXRhaWxfc2tpcF9hcnJheXZhbCA9IGRldGFpbF9za2lwX2FycmF5O1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLmRldGFpbF9za2lwX2FycmF5dmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5kZXRhaWxfc2tpcF9hcnJheXZhbCk7XG4gIH1cblxuQElucHV0KClcbiAgc2V0IHNvdXJjZWRhdGEoc291cmNlZGF0YTogYW55KSB7XG4gICAgdGhpcy5zb3VyY2VkYXRhdmFsID0gc291cmNlZGF0YTtcbiAgICBjb25zb2xlLmxvZygndGhpcy5zb3VyY2VkYXRhdmFsJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5zb3VyY2VkYXRhdmFsKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RpZnlfaGVhZGVyX2FycmF5KG1vZGlmeV9oZWFkZXJfYXJyYXk6IGFueSkge1xuICAgIHRoaXMubW9kaWZ5X2hlYWRlcl9hcnJheXZhbCA9IG1vZGlmeV9oZWFkZXJfYXJyYXk7XG4gICAgY29uc29sZS5sb2coJ3RoaXMubW9kaWZ5X2hlYWRlcl9hcnJheXZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubW9kaWZ5X2hlYWRlcl9hcnJheXZhbCk7XG4gIH1cblxuICBASW5wdXQoKVxuICAgIHNldCBkZWxldGVlbmRwb2ludChkZWxldGVlbmRwb2ludHZhbDogYW55KSB7XG4gICAgICB0aGlzLmRlbGV0ZWVuZHBvaW50dmFsID0gZGVsZXRlZW5kcG9pbnR2YWw7XG4gICAgICBjb25zb2xlLmxvZygndGhpcy5kZWxldGVlbmRwb2ludHZhbCcpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5kZWxldGVlbmRwb2ludHZhbCk7XG4gICAgfVxuXG4gQElucHV0KClcbiAgICBzZXQgdXBkYXRlZW5kcG9pbnQodXBkYXRlZW5kcG9pbnQ6IGFueSkge1xuICAgICAgdGhpcy51cGRhdGVlbmRwb2ludHZhbCA9IHVwZGF0ZWVuZHBvaW50O1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMudXBkYXRlZW5kcG9pbnR2YWwnKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudXBkYXRlZW5kcG9pbnR2YWwpO1xuICAgIH1cbiAgICBASW5wdXQoKVxuICAgIHNldCBhcGl1cmwoYXBpdXJsOiBhbnkpIHtcbiAgICAgIHRoaXMuYXBpdXJsdmFsID0gYXBpdXJsO1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMuYXBpdXJsdmFsJyk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmFwaXVybHZhbCk7XG4gICAgfVxuXG5ASW5wdXQoKVxuICAgIHNldCBqd3R0b2tlbihqd3R0b2tlbjogYW55KSB7XG4gICAgICB0aGlzLmp3dHRva2VudmFsID0gand0dG9rZW47XG4gICAgICBjb25zb2xlLmxvZygndGhpcy5qd3R0b2tlbnZhbCcpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5qd3R0b2tlbnZhbCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc3RhdHVzYXJyKHN0YXR1c2FycjogYW55KSB7XG4gICAgICB0aGlzLnN0YXR1c2FycnZhbCA9IHN0YXR1c2FycjtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGlzLnN0YXR1c2FycnZhbCcpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0dXNhcnJ2YWwpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGVtYWlsYXJyYXkoZW1haWxhcnJheTogYW55KSB7XG4gICAgICB0aGlzLmVtYWlsYXJyYXl2YWwgPSBlbWFpbGFycmF5O1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMuZW1haWxhcnJheXZhbCcpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5lbWFpbGFycmF5dmFsKTtcbiAgICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGVkaXRyb3V0ZShlZGl0cm91dGU6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKCdlZGl0cm91dGUnKTtcbiAgICBjb25zb2xlLmxvZyhlZGl0cm91dGUpO1xuICAgIHRoaXMuZWRpdHJvdXRldmFsID0gZWRpdHJvdXRlO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLmVkaXRyb3V0ZXZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdHJvdXRldmFsKTtcbiAgfVxuXG5cbiAgLyogYXJ0aXN0eHAgcHJldmlldyBzdGFydCAqL1xuICBASW5wdXQoKVxuICBzZXQgcHJldmlld19hcnRpc3R4cChmbHVnOiBhbnkpIHtcbiAgICB0aGlzLnByZXZpZXdGbHVnID0gdHJ1ZTtcbiAgfVxuICAvKiBhcnRpc3R4cCBwcmV2aWV3IGVuZCAqL1xuXG5cbiAgc3RhdGVHcm91cHM6IHN0cmluZ1tdID0gdGhpcy5zZWFyY2hMaXN0dmFsO1xuICBzdGF0ZUdyb3VwOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcblxuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IFtdO1xuICBkYXRhY29sdW1uczogc3RyaW5nW10gPSBbXTtcbiAgZGlzcGxheWVkQ29sdW1uc2hlYWRlcjogc3RyaW5nW10gPSBbXTtcbiAgZm9ybWFycmF5OiBhbnkgPSBbXTtcbiAgc3RhcnRfZGF0ZTogYW55IDtcbiAgZGF0ZVNlYXJjaF9jb25kaXRpb246IGFueSA9e307XG4gIHNlbGVjdFNlYXJjaF9jb25kaXRpb246IGFueSA9e307XG4gIGF1dG9TZWFyY2hfY29uZGl0aW9uOiBhbnkgPXt9O1xuICB0ZXh0U2VhcmNoX2NvbmRpdGlvbjogYW55ID17fTtcbiAgZW5kX2RhdGU6IGFueSA7XG4gIHB1YmxpYyBpOiBhbnkgO1xuICBsb2FkaW5nOiBhbnkgPSBmYWxzZSA7XG4gIHB1YmxpYyBwcmVyZXN1bHQ6IGFueT17fTtcbiAgLy9kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSh0aGlzLmRhdGFzb3VyY2V2YWwpO1xuICBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTtcblxuICBAVmlld0NoaWxkKE1hdFNvcnQse3N0YXRpYzogdHJ1ZX0pIHNvcnQ6IE1hdFNvcnQ7XG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yLHtzdGF0aWM6IHRydWV9KSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbiAgLy8gb3B0aW9uczogRm9ybUdyb3VwO1xuICBteUZvcm06YW55O1xuICAvLyBteUZvcm06YW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfYXBpU2VydmljZTogQXBpU2VydmljZSxwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cscHJpdmF0ZSBib3R0b21TaGVldDogTWF0Qm90dG9tU2hlZXQscHVibGljIGZiOiBGb3JtQnVpbGRlcixwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgX2h0dHA6IEh0dHBDbGllbnQsIHB1YmxpYyBzYW5pdGl6ZXI6RG9tU2FuaXRpemVyKSB7XG5cbiAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydDoge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZDpcbiAgICAgICAgICBjYXNlIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbDpcbiAgICAgICAgICBjYXNlIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yOiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cblxuICAgLyogdGhpcy5teUZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eXFxzKltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxAW1xcd1xcLVxcK19dK1xcLltcXHdcXC1cXCtfXSsoXFwuW1xcd1xcLVxcK19dKykqXFxzKiQvKV0pXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7Ki9cblxuXG5cbiAgfVxuICAvKkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW0xpc3RpbmddJ1xuICB9KSovXG5cblxuXG5cblxuXG4gIGlucHV0Ymx1cih2YWw6YW55KXtcbiAgICBjb25zb2xlLmxvZygnb24gYmx1ciAuLi4uLicpO1xuICAgIHRoaXMubXlGb3JtLmNvbnRyb2xzW3ZhbF0ubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5zZWFyY2hfc2V0dGluZ3N2YWwgIT1udWxsICYmIHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlYXJjaCAhPSBudWxsICYmIHRoaXMuc2VhcmNoX3NldHRpbmdzdmFsLnNlYXJjaCAhPSAnJykge1xuICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICAgIGxldCBzb3VyY2U6IGFueTtcbiAgICAgIGxldCBjb25kaXRpb246IGFueSA9IHt9O1xuICAgICAgc291cmNlID0ge1xuICAgICAgICBzb3VyY2U6IHRoaXMuZGF0ZV9zZWFyY2hfc291cmNldmFsLFxuICAgICAgICBjb25kaXRpb246IGNvbmRpdGlvblxuICAgICAgfTtcbiAgICAgIGxldCBsaW5rID0gdGhpcy5hcGl1cmx2YWwgKyAnJyArIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4gICAgICB0aGlzLl9hcGlTZXJ2aWNlLnBvc3RTZWFyY2gobGluaywgdGhpcy5qd3R0b2tlbnZhbCwgc291cmNlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSByZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0KTtcbiAgICAgICAgdGhpcy5wcmVyZXN1bHQgPSB0aGlzLnJlc3VsdC5yZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJlcmVzdWx0KTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8gdGhpcy5fc2VydmljZS5zdWNjZXNzKHRoaXMuY29sdW1uc1swXS5kYXRlLCdkbmRubmQnLHRoaXMub3B0aW9ucyk7XG4gICAvKiB0aGlzLnN0YXRlR3JvdXBPcHRpb25zID0gdGhpcy5teUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiB0aGlzLl9maWx0ZXJHcm91cCh2YWx1ZSkpXG4gICAgICAgICk7Ki9cblxuICAgIHRoaXMuc3RhdGVHcm91cCA9IHRoaXMubXlDb250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgICAgICBtYXAodmFsdWUgPT4gdGhpcy5fZmlsdGVyKHZhbHVlKSlcbiAgICAgICAgKTtcblxuICAgIC8qY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICAgIGNvbXBvbmVudE1hcHBlclt0aGlzLmZpZWxkLnR5cGVdXG4gICAgKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5maWVsZCA9IHRoaXMuZmllbGQ7XG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuKi9cblxuICAgIHRoaXMueCA9IHRoaXMuZGF0YXNvdXJjZXZhbDtcbiAgICBsZXQgeD10aGlzLng7XG5cbiAgICBsZXQgdGVtcCA9IFtdXG4gICAgbGV0IGtleXMgPSB4WzBdXG4gICAgdGVtcCA9IE9iamVjdC5rZXlzKGtleXMpICAgIC8qYnkgT2JqZWN0LmtleXMoKSB3ZSBjYW4gZmluZCB0aGUgZmllbGRuYW1lcyhvciBrZXlzKSBpbiBhbiBvYmplY3QsIGkuZSwgaW4gdGVtcCBvYmplY3QgZmllbGQgbmFtZXMgYXJlIHNhdmVkKi9cblxuICAgIGxldCBjb2xkZWZfbGlzdCA9IFtdO1xuICAgIGxldCBoZWFkZXJfbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcC5sZW5ndGg7IGkrKykge1xuICAgICAgY29sZGVmX2xpc3QucHVzaCh0ZW1wW2ldLnJlcGxhY2UoL1xccy9nLCBcIl9cIikpOyAgICAgIC8qdG8gcmVwbGFjZSBzcGFjZXMgaW4gZmllbGQgbmFtZSBieSBcIl9cIiwgd2UgdXNlIFwicmVwbGFjZSgvXFxzL2csIFwiX1wiKVwiKi9cbiAgICAgIGhlYWRlcl9saXN0LnB1c2godGVtcFtpXSlcbiAgICB9XG4gICAgLy9jb2xkZWZfbGlzdC5wdXNoKCdBY3Rpb25zJyk7XG4gICAgLy9oZWFkZXJfbGlzdC5wdXNoKCdBY3Rpb25zJylcbiAgICBjb25zb2xlLmxvZygnY29sZGVmX2xpc3QnLGNvbGRlZl9saXN0KTtcbiAgICBjb25zb2xlLmxvZygnaGVhZGVyX2xpc3QnLGhlYWRlcl9saXN0KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sZGVmX2xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBmZiA9IGByb3cuJHtjb2xkZWZfbGlzdFtpXX1gXG4gICAgICB2YXIgdHQgPSB7IGNvbHVtbkRlZjogYCR7Y29sZGVmX2xpc3RbaV19YCwgICAgaGVhZGVyOiBgJHtoZWFkZXJfbGlzdFtpXS5yZXBsYWNlKC9fL2csXCIgXCIpfWAsICBjZWxsOiAocm93KSA9PiBldmFsKGZmKSAsb2JqbGVuZ3RoOmhlYWRlcl9saXN0Lmxlbmd0aCAgfTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0dC5jb2x1bW5EZWYnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHR0LmNvbHVtbkRlZik7XG4gICAgICBmb3IgKGxldCBiIGluIHRoaXMubW9kaWZ5X2hlYWRlcl9hcnJheXZhbCl7XG4gICAgICAgIGlmKGI9PXR0LmhlYWRlcikgdHQuaGVhZGVyPXRoaXMubW9kaWZ5X2hlYWRlcl9hcnJheXZhbFtiXTtcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5za2lwdmFsLmluZGV4T2YodHQuY29sdW1uRGVmKT09LTEpXG4gICAgICB0aGlzLmNvbHVtbnMucHVzaCh0dCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5jb2x1bW5zJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbHVtbnMpO1xuICAgIH1cbiAgICBsZXQgZGlzcGxheWVkY29scz0gdGhpcy5jb2x1bW5zLm1hcCh4ID0+IHguY29sdW1uRGVmKTtcbiAgICBkaXNwbGF5ZWRjb2xzLnB1c2goJ0FjdGlvbnMnKTtcblxuICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9ZGlzcGxheWVkY29scztcbiAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMudW5zaGlmdCgnc2VsZWN0Jyk7ICAgICAgICAvKmFkZHMgc2VsZWN0IGNvbHVtbiBpbiB0YWJsZSBieSB1bnNoaWZ0IGZ1bmN0aW9uKi9cblxuICAgIGxldCBkYXRhX2xpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMueC5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YV9saXN0LnB1c2godGhpcy5jcmVhdGVEYXRhKHhbaV0pKTtcbiAgICB9XG4gICAgdGhpcy5vbGRkYXRhPWRhdGFfbGlzdDtcbiAgICBjb25zb2xlLmxvZyhkYXRhX2xpc3QpXG4gICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZShkYXRhX2xpc3QpO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsKHRydWUsIFtdKTtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cblxuXG4gIG9uU3VibWl0KCkge1xuICAgIGxldCB4OiBhbnk7XG4gICAgdGhpcy5lcnJvcm1nID0gJyc7XG4gICAgbGV0IGRhdGEgPSB0aGlzLm15Rm9ybS52YWx1ZTtcbiAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubXlGb3JtLnZhbGlkKTtcbiAgICBmb3IgKHggaW4gdGhpcy5teUZvcm0uY29udHJvbHMpIHtcbiAgICAgIHRoaXMubXlGb3JtLmNvbnRyb2xzW3hdLm1hcmtBc1RvdWNoZWQoKTtcbiAgICB9XG4gIH1cbiAgZGF0ZVNlYXJjaCh2YWw6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnQgZGF0ZVwiKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXJ0X2RhdGUpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZW5kX2RhdGUpO1xuICAgIGxldCBzZCA9IG1vbWVudCh0aGlzLnN0YXJ0X2RhdGUpLnVuaXgoKTtcbiAgICBsZXQgZWQgPSBtb21lbnQodGhpcy5lbmRfZGF0ZSkudW5peCgpO1xuICAgIGNvbnNvbGUubG9nKG1vbWVudCh0aGlzLnN0YXJ0X2RhdGUpLnVuaXgoKSk7XG4gICAgY29uc29sZS5sb2cobW9tZW50KHRoaXMuZW5kX2RhdGUpLnVuaXgoKSk7XG4gICAgY29uc29sZS5sb2cobmV3IERhdGUodGhpcy5lbmRfZGF0ZSkuZ2V0VGltZSgpKTtcbiAgICBsZXQgbGluayA9IHRoaXMuYXBpdXJsdmFsICsgJycrIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4gICAgY29uc29sZS5sb2cobGluayk7XG4gICAgaWYobW9tZW50KHRoaXMuZW5kX2RhdGUpLnVuaXgoKSE9bnVsbCAmJiBtb21lbnQodGhpcy5zdGFydF9kYXRlKS51bml4KCkhPW51bGwgKSB7XG5cblxuICAgICAgbGV0IHNvdXJjZTphbnk7XG4gICAgICBsZXQgY29uZGl0aW9uOiBhbnk7XG4gICAgICBjb25kaXRpb24gPSB7fTtcblxuICAgICAgY29uZGl0aW9uW3ZhbF0gPSB7XG4gICAgICAgICRsdGU6IG5ldyBEYXRlKHRoaXMuZW5kX2RhdGUpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICRndGU6IG5ldyBEYXRlKHRoaXMuc3RhcnRfZGF0ZSkuZ2V0VGltZSgpLFxuICAgICAgfTtcbiAgICAgIHRoaXMuZGF0ZVNlYXJjaF9jb25kaXRpb24gPSB7fTtcbiAgICAgIHRoaXMuZGF0ZVNlYXJjaF9jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgICBsZXQgY29uZGl0aW9ub2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50ZXh0U2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5kYXRlU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5hdXRvU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5zZWxlY3RTZWFyY2hfY29uZGl0aW9uKTtcbiAgICAgICAgICBzb3VyY2U9IHtcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcy5kYXRlX3NlYXJjaF9zb3VyY2V2YWwsXG4gICAgICAgICAgICBjb25kaXRpb246IGNvbmRpdGlvbm9iaixcbiAgICAgICAgICB9O1xuICAgICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICAgIHRoaXMuX2FwaVNlcnZpY2UucG9zdFNlYXJjaChsaW5rLHRoaXMuand0dG9rZW52YWwsIHNvdXJjZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgICByZXN1bHQgPSByZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yZXMpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHJlc3VsdC5yZXMpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgICAgfSlcblxuICAgICAgLyp0aGlzLl9odHRwLnBvc3QobGluaywge3NvdXJjZTp0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCxcbiAgICAgICAgY29uZGl0aW9uOiB7XG4gICAgICAgICAgJ2NyZWF0ZWRfYXQnOiB7XG4gICAgICAgICAgICAkbHRlOiBuZXcgRGF0ZSh0aGlzLmVuZF9kYXRlKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAkZ3RlOiBuZXcgRGF0ZSh0aGlzLnN0YXJ0X2RhdGUpLmdldFRpbWUoKSxcbiAgICAgICAgICB9XG4gICAgICAgIH0sdG9rZW46IHRoaXMuand0dG9rZW52YWwsXG4gICAgICB9KS5zdWJzY3JpYmUoIHJlcyA9PntcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID17fTtcbiAgICAgICAgcmVzdWx0ID0gcmVzO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9rXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQucmVzKTtcbiAgICAgICAgbGV0IG5ld2RhdGEgPSByZXN1bHQucmVzO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHJlc3VsdC5yZXMpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgICAgfSkqL1xuICAgIH1lbHNlXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICB9XG5cblxuXG4gIHNlbGVjdFNlYXJjaCAodmFsdWU6YW55LHR5cGU6YW55KXtcbiAgICBjb25zb2xlLmxvZygndHlwZScpO1xuICAgIGNvbnNvbGUubG9nKHR5cGUpO1xuICAgIGxldCBsaW5rID0gdGhpcy5hcGl1cmx2YWwgKyAnJysgdGhpcy5kYXRlX3NlYXJjaF9lbmRwb2ludHZhbDtcbiAgICBjb25zb2xlLmxvZyhsaW5rKTtcbiAgICBsZXQgc291cmNlOmFueTtcbiAgICBsZXQgY29uZGl0aW9uOiBhbnk7XG4gICAgY29uZGl0aW9uID0ge307XG4gICAgY29uZGl0aW9uW3R5cGUuZmllbGRdPXZhbHVlO1xuICAgIHRoaXMuc2VsZWN0U2VhcmNoX2NvbmRpdGlvbiA9IHt9O1xuICAgIHRoaXMuc2VsZWN0U2VhcmNoX2NvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICBsZXQgY29uZGl0aW9ub2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50ZXh0U2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5kYXRlU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5hdXRvU2VhcmNoX2NvbmRpdGlvbiwgdGhpcy5zZWxlY3RTZWFyY2hfY29uZGl0aW9uKTtcbiAgICBzb3VyY2U9IHtcbiAgICAgIHNvdXJjZTogdGhpcy5kYXRlX3NlYXJjaF9zb3VyY2V2YWwsXG4gICAgICBjb25kaXRpb246IGNvbmRpdGlvbm9ialxuICAgIH07XG4gICAgaWYodmFsdWUgIT1udWxsICkge1xuICAgICAgdGhpcy5fYXBpU2VydmljZS5wb3N0U2VhcmNoKGxpbmssIHRoaXMuand0dG9rZW52YWwsIHNvdXJjZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgICByZXN1bHQgPSByZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib2tcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yZXMpO1xuICAgICAgICBsZXQgbmV3ZGF0YSA9IHJlc3VsdC5yZXM7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UocmVzdWx0LnJlcyk7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2VcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZygnb29wcycpO1xuICAgIH1cbiAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgfVxuICBhdXRvc2VhcmNoZnVuY3Rpb24gKHZhbHVlOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgbGV0IHZhbDphbnk9dGhpcy5hdXRvc2VhcmNoW3ZhbHVlXTtcbiAgICBjb25zb2xlLmxvZyh2YWwpO1xuICAgIGxldCBzb3VyY2U6YW55O1xuICAgIGxldCBjb25kaXRpb246IGFueT17fTtcbiAgICBpZih0aGlzLmF1dG9zZWFyY2hbdmFsdWVdLmxlbmd0aD4wICYmIHskb3I6W3RoaXMuYXV0b3NlYXJjaFt2YWx1ZV0udG9Mb3dlckNhc2UoKSx0aGlzLmF1dG9zZWFyY2hbdmFsdWVdLnRvVXBwZXJDYXNlKCksdGhpcy5hdXRvc2VhcmNoW3ZhbHVlXV19KWNvbmRpdGlvblt2YWx1ZSsnX3JlZ2V4J109dmFsO1xuICAgIHRoaXMuYXV0b1NlYXJjaF9jb25kaXRpb24gPSB7fTtcbiAgICB0aGlzLmF1dG9TZWFyY2hfY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIGxldCBjb25kaXRpb25vYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRleHRTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmRhdGVTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmF1dG9TZWFyY2hfY29uZGl0aW9uLCB0aGlzLnNlbGVjdFNlYXJjaF9jb25kaXRpb24pO1xuICAgIHNvdXJjZT0ge1xuICAgICAgc291cmNlOiB0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCxcbiAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9ub2JqXG4gICAgfTtcbiAgICBsZXQgbGluayA9IHRoaXMuYXBpdXJsdmFsICsgJycrIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4gICAgdGhpcy5fYXBpU2VydmljZS5wb3N0U2VhcmNoKGxpbmssIHRoaXMuand0dG9rZW52YWwsIHNvdXJjZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgLy8gbGV0IHJlc3VsdDphbnk9e307XG4gICAgICB0aGlzLnJlc3VsdCA9IHJlcztcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0KTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0LnJlcyk7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHRoaXMucmVzdWx0LnJlcyk7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcblxuICAgIH0pO1xuICB9XG5cbiAgdGV4dHNlYXJjaGZ1bmN0aW9uICh2YWx1ZTphbnkpe1xuICAgIGNvbnNvbGUubG9nKCd2YWx1ZScpO1xuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRzZWFyY2hbdmFsdWVdKTtcbiAgICBsZXQgbGluayA9IHRoaXMuYXBpdXJsdmFsICsgJycrIHRoaXMuZGF0ZV9zZWFyY2hfZW5kcG9pbnR2YWw7XG4gICAgY29uc29sZS5sb2cobGluayk7XG4gICAgbGV0IHNvdXJjZTphbnk7XG4gICAgbGV0IGNvbmRpdGlvbjogYW55PXt9O1xuICAgIC8vY29uZGl0aW9uID0ge307XG4gICAgbGV0IHZhbDphbnkgPXRoaXMudHNlYXJjaFt2YWx1ZV0udG9Mb3dlckNhc2UoKTtcbiAgICAvLyBjb25kaXRpb249eyRvcjpbdGhpcy50c2VhcmNoW3ZhbHVlXS50b0xvd2VyQ2FzZSgpLHRoaXMudHNlYXJjaFt2YWx1ZV0udG9VcHBlckNhc2UoKV19O1xuICAgIGlmKHRoaXMudHNlYXJjaFt2YWx1ZV0ubGVuZ3RoPjEgJiYgeyRvcjpbdGhpcy50c2VhcmNoW3ZhbHVlXS50b0xvd2VyQ2FzZSgpLHRoaXMudHNlYXJjaFt2YWx1ZV0udG9VcHBlckNhc2UoKV19KWNvbmRpdGlvblt2YWx1ZSsnX3JlZ2V4J109dmFsO1xuICAgIHRoaXMudGV4dFNlYXJjaF9jb25kaXRpb24gPSB7fTtcbiAgICB0aGlzLnRleHRTZWFyY2hfY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIC8vY29uZGl0aW9uW3ZhbHVlXT1cIi8yMjIvXCI7XG4gICAgLy9jb25kaXRpb249e2VtYWlsOnskcmVneDonLzIyMi9pJ319O1xuICAgIGxldCBjb25kaXRpb25vYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRleHRTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmRhdGVTZWFyY2hfY29uZGl0aW9uLCB0aGlzLmF1dG9TZWFyY2hfY29uZGl0aW9uLCB0aGlzLnNlbGVjdFNlYXJjaF9jb25kaXRpb24pO1xuICAgIHNvdXJjZT0ge1xuICAgICAgc291cmNlOiB0aGlzLmRhdGVfc2VhcmNoX3NvdXJjZXZhbCxcbiAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9ub2JqXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygnc291cmNlJyk7XG4gICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICAvL2FkZCBsb2FkZXJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIGlmKHZhbHVlICE9bnVsbCAgKSB7XG4gICAgICB0aGlzLl9hcGlTZXJ2aWNlLnBvc3RTZWFyY2gobGluaywgdGhpcy5qd3R0b2tlbnZhbCwgc291cmNlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgIHJlc3VsdCA9IHJlcztcbiAgICAgICAgLy9jbG9zZSBsb2FkZXJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib2tcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yZXMpO1xuICAgICAgICBsZXQgbmV3ZGF0YSA9IHJlc3VsdC5yZXM7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UocmVzdWx0LnJlcyk7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2VcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZygnb29wcycpO1xuICAgIH1cbiAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgfVxuXG5cblxuICBwcml2YXRlIF9maWx0ZXIodmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5zZWFyY2hMaXN0dmFsLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpKTtcbiAgfVxuXG4gIC8qcHJpdmF0ZSBfZmlsdGVyR3JvdXAodmFsdWU6IHN0cmluZyk6IFN0YXRlR3JvdXBbXSB7XG4gICAvISogaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWFyY2hMaXN0dmFsXG4gICAgICAgICAgLm1hcChncm91cCA9PiAoe25hbWVzOiBfZmlsdGVyKGdyb3VwLm5hbWVzLCB2YWx1ZSl9KSlcbiAgICAgICAgICAuZmlsdGVyKGdyb3VwID0+IGdyb3VwLm5hbWVzLmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlYXJjaExpc3R2YWw7KiEvXG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoTGlzdHZhbC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlKSk7XG4gIH0qL1xuXG4gIGdldHN0YXR1cyh2YWw6YW55KXtcbiAgICAvLyBjb25zb2xlLmxvZygndmFsJyk7XG4gICAgLy8gY29uc29sZS5sb2codmFsKTtcbiAgICBmb3IobGV0IGIgaW4gdGhpcy5zdGF0dXNhcnJ2YWwpe1xuICAgICAgaWYodGhpcy5zdGF0dXNhcnJ2YWxbYl0udmFsPT12YWwpXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXR1c2FycnZhbFtiXS5uYW1lO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0dXNhcnJ2YWxbYl0ubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBcIk4vQVwiO1xuICB9XG4gIGhpKHZhbDogYW55KXtcbiAgICAvLyBjb25zb2xlLmxvZygnaGkgIHZhbCcpO1xuICAgIC8vIGNvbnNvbGUubG9nKHZhbCk7XG4gICAgaWYgKHZhbC5zaGF0dGVyYmxva19hZ3JlZW1lbnRfZGF0ZSAhPSBudWxsICYmIHZhbC5hdWRpb2RlYWRsaW5lX2FncmVlbWVudF9kYXRlID09bnVsbCApe1xuICAgICAgLy8gY29uc29sZS5sb2coJ3NoYXR0ZXIgYmxvaycpO1xuICAgICAgdGhpcy5zaCA9IHRydWU7XG4gICAgICB0aGlzLmF1ZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodmFsLnNoYXR0ZXJibG9rX2FncmVlbWVudF9kYXRlICE9IG51bGwgJiYgdmFsLmF1ZGlvZGVhZGxpbmVfYWdyZWVtZW50X2RhdGUgIT1udWxsKSB7XG4gICAgICB0aGlzLnNoID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHZhbC5zaGF0dGVyYmxva19hZ3JlZW1lbnRfZGF0ZSA9PSBudWxsICYmIHZhbC5hdWRpb2RlYWRsaW5lX2FncmVlbWVudF9kYXRlID09bnVsbCkge1xuICAgICAgdGhpcy5zaCA9IGZhbHNlO1xuICAgICAgdGhpcy5hdWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZ3JhcHVybCh2YWw6IGFueSl7XG4gICAgLy8gIGZvciBhbGwgcm93IGNoZWNraW5nXG4vLyBjb25zb2xlLmxvZyh2YWwpXG4gICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFydCA9IHRydWU7XG4gICAgICB0aGlzLmF1ZDIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodmFsID09IG51bGwpIHtcbiAgICAgIHRoaXMuYXJ0ID0gZmFsc2U7XG4gICAgICB0aGlzLmF1ZDIgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zaCk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5hdWQpO1xuICB9XG5cbiAgICBjb3B5VGV4dChyb3c6IGFueSwgdmFsOiBzdHJpbmcpe1xuICAgIGNvbnNvbGUubG9nKCdyb3cgaW4gY29weVRleHQnKTtcbiAgICBjb25zb2xlLmxvZyhyb3cpO1xuICAgIGNvbnNvbGUubG9nKCd2YWwgaW4gY29weVRleHQnKTtcbiAgICBjb25zb2xlLmxvZyh2YWwpXG4gICAgICBsZXQgZnVsbHVybCA9IHZhbCsnJytyb3c7XG4gICAgY29uc29sZS5sb2coZnVsbHVybCk7XG4gICAgICAgIGxldCBzZWxCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICBzZWxCb3guc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICBzZWxCb3guc3R5bGUubGVmdCA9ICcwJztcbiAgICAgICAgc2VsQm94LnN0eWxlLnRvcCA9ICcwJztcbiAgICAgICAgc2VsQm94LnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgIHNlbEJveC52YWx1ZSA9IGZ1bGx1cmw7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsQm94KTtcbiAgICAgICAgc2VsQm94LmZvY3VzKCk7XG4gICAgICAgIHNlbEJveC5zZWxlY3QoKTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzZWxCb3gpO1xuICAgIH1cblxuICBjbGlja3VybCh2YWw6IGFueSAsIHVybDogYW55KSB7XG4gICAgbGV0IGlcbiAgICBjb25zb2xlLmxvZygnb2snKTtcbiAgICBjb25zb2xlLmxvZyh2YWwpO1xuICAgIGNvbnNvbGUubG9nKHZhbC5faWQpO1xuICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgY29uc29sZS5sb2codXJsICsgJycgK3ZhbC5faWQgKyAnJyArIHRoaXMucGRmX2xpbmtfdmFsKTtcbiAgICBsZXQgbGluaz0gdXJsICsgJycgK3ZhbC5faWQgKyAnJyArIHRoaXMucGRmX2xpbmtfdmFsO1xuICAgIHdpbmRvdy5vcGVuKGxpbmssIFwiX2JsYW5rXCIpO1xuICB9XG5cblxuICAvKiogV2hldGhlciB0aGUgbnVtYmVyIG9mIHNlbGVjdGVkIGVsZW1lbnRzIG1hdGNoZXMgdGhlIHRvdGFsIG51bWJlciBvZiByb3dzLiAqL1xuICBpc0FsbFNlbGVjdGVkKCkge1xuICAgIGNvbnN0IG51bVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5sZW5ndGg7XG4gICAgcmV0dXJuIG51bVNlbGVjdGVkID09PSBudW1Sb3dzO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgYWxsIHJvd3MgaWYgdGhleSBhcmUgbm90IGFsbCBzZWxlY3RlZDsgb3RoZXJ3aXNlIGNsZWFyIHNlbGVjdGlvbi4gKi9cbiAgbWFzdGVyVG9nZ2xlKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKSA6XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhLmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgfVxuXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjaGVja2JveCBvbiB0aGUgcGFzc2VkIHJvdyAqL1xuICBjaGVja2JveExhYmVsKHJvdz86IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/ICdzZWxlY3QnIDogJ2Rlc2VsZWN0J30gYWxsYDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMuc2VsZWN0aW9uLmlzU2VsZWN0ZWQocm93KSA/ICdkZXNlbGVjdCcgOiAnc2VsZWN0J30gcm93ICR7cm93LnBvc2l0aW9uICsgMX1gO1xuICB9XG5cblxuICBjcmVhdGVEYXRhKHBvaW50OmFueSl7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhwb2ludCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkYXRhW2tleS5yZXBsYWNlKC9cXHMvZywgXCJfXCIpXSA9IHBvaW50W2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIGFwcGx5RmlsdGVyKGZpbHRlclZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhmaWx0ZXJWYWx1ZSlcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGFTb3VyY2UpO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YVNvdXJjZVtuYW1lXSlcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAodGhpcy5kYXRhU291cmNlLnBhZ2luYXRvcikge1xuICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvci5maXJzdFBhZ2UoKTtcbiAgICB9XG4gIH1cbiAgLyphcHBseUZpbHRlcjEoZmlsdGVyVmFsdWU6IHN0cmluZywgdmFsOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhmaWx0ZXJWYWx1ZSk7XG4gICAgY29uc29sZS5sb2codmFsLnZhbHVlKTtcbiAgICBsZXQgdmFsdWU9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UodmFsLnZhbHVlKTtcblxuICAgIHZhbHVlLmZpbHRlciA9IGZpbHRlclZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAvISogdGhpcy5kYXRhU291cmNlLmZpbHRlclByZWRpY2F0ZSA9IGZ1bmN0aW9uKGRhdGEsIGZpbHRlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAvLyByZXR1cm4gZGF0YS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyKTtcbiAgICB9O1xuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yLmZpcnN0UGFnZSgpO1xuICAgIH0qIS9cbiAgfSovXG5cbiAgc3R5bGVDZWxsKGNvbF9uYW1lLHJvdyl7XG5cbiAgICAvKlxuICAgICBpZiAoY29sX25hbWVbJ2NvbHVtbkRlZiddPT0ncHJvZ3Jlc3MnICYmIHJvd1sncHJvZ3Jlc3MnXT09JzEwMCcpe1xuICAgICByZXR1cm4geydjb2xvcicgOiAncmVkJ31cbiAgICAgfSBlbHNlIHtcbiAgICAgcmV0dXJuIHt9XG4gICAgIH1cbiAgICAgKi9cblxuXG4gICAgcmV0dXJuIHt9XG4gIH1cblxuXG4gIHZpZXdkYXRhKGRhdGExOmFueSl7XG4gICAgbGV0IGRhdGE6YW55O1xuICAgIGRhdGE9ZGF0YTE7XG4gICAgbGV0IGRhdGEyOmFueT1bXTtcbiAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBsZXQgZmxhZ2s6YW55PScnO1xuICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coa2V5ICsgXCIgLT4gXCIgKyBkYXRhW2tleV0rXCItLS0+XCIrdHlwZW9mIChkYXRhW2tleV0pKTtcbiAgICAgICAgICAgICAgaWYodHlwZW9mIChkYXRhW2tleV0pPT0nYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgIGlmKGRhdGFba2V5XT09dHJ1ZSkgZGF0YVtrZXldPSdZZXMnO1xuICAgICAgICAgICAgICAgICAgaWYoZGF0YVtrZXldPT1mYWxzZSkgZGF0YVtrZXldPSdObyc7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZih0eXBlb2YgKGRhdGFba2V5XSk9PSdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgdGVtcGRhdGE6YW55PVtdO1xuICAgICAgICAgICAgICAgICAgZm9yKGxldCBrIGluIGRhdGFba2V5XSl7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2tleScpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kZXRhaWxfZGF0YXR5cGV2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgcCBpbiB0aGlzLmRldGFpbF9kYXRhdHlwZXZhbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2tleV1ba10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRldGFpbF9kYXRhdHlwZXZhbFtwXS5rZXk9PWtleSAmJiB0aGlzLmRldGFpbF9kYXRhdHlwZXZhbFtwXS52YWx1ZT09J2ltYWdlJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWd2YWw6YW55PXRoaXMuZGV0YWlsX2RhdGF0eXBldmFsW3BdLmZpbGV1cmwrZGF0YVtrZXldW2tdLnJlcGxhY2UoLycvZywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltZ3ZhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltZ3ZhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW1ndmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFba2V5XVtrXS5yZXBsYWNlKC8nL2csICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wZGF0YS5wdXNoKFwiPGltZyBtYXQtY2FyZC1pbWFnZSBzcmM9XCIraW1ndmFsK1wiPjxici8+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZW1wZGF0YS5wdXNoKFwiPHNwYW4+XCIrZGF0YVtrZXldW2tdK1wiPC9zcGFuPjxici8+XCIpXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZGV0YWlsX2RhdGF0eXBldmFsW3BdLmtleT09a2V5ICYmIHRoaXMuZGV0YWlsX2RhdGF0eXBldmFsW3BdLnZhbHVlIT0naW1hZ2UnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGVtcGRhdGEucHVzaChcIjxpbWcgbWF0LWNhcmQtaW1hZ2Ugc3JjPVwiK2RhdGFba2V5XVtrXStcIj48YnIvPlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGRhdGEucHVzaChcIjxzcGFuPlwiK2RhdGFba2V5XVtrXStcIjwvc3Bhbj48YnIvPlwiKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGRhdGFba2V5XT10ZW1wZGF0YTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJ2RhdGEnKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgZm9yKGxldCBuIGluIGRhdGEpe1xuICAgICAgICBpZihkYXRhW25dIT1udWxsICYmIGRhdGFbbl0hPScnKXtcbiAgICAgICAgICBkYXRhMltuXT1kYXRhW25dO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBmb3IobGV0IHYgaW4gdGhpcy5kZXRhaWxfc2tpcF9hcnJheXZhbCl7XG4gICAgICAvL2RhdGEyW3RoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl1dPScnO1xuICAgICAgZGVsZXRlIGRhdGEyW3RoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl1dO1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl0nKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsX3NraXBfYXJyYXl2YWxbdl0pO1xuICAgIH1cbiAgICAgIGxldCByZXMgPSBPYmplY3QuZW50cmllcyhkYXRhMik7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuZGV0YWlsX3NraXBfYXJyYXknKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbF9za2lwX2FycmF5dmFsKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbF9kYXRhdHlwZXZhbCk7XG5cbiAgICBjb25zb2xlLmxvZygncmVzJyk7XG4gICAgY29uc29sZS5sb2cocmVzKTtcblxuXG5cbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbiAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4gICAgICBkYXRhOiB7aXNjb25maXJtYXRpb246ZmFsc2UsZGF0YTpyZXN9XG4gICAgfSk7XG5cbiAgfVxuICBtYW5hZ2VzdGF0dXMoZGF0YTphbnkpe1xuICAgIGNvbnNvbGUubG9nKCdkYXRhJyk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgbGV0IGJzPXRoaXMuYm90dG9tU2hlZXQub3BlbihCb3R0b21TaGVldCx7cGFuZWxDbGFzczogJ2N1c3RvbS1ib3R0b21zaGVldCcsZGF0YTp7aXRlbXM6dGhpcy5zdGF0dXNhcnJ2YWx9fSk7XG5cbiAgICBicy5hZnRlckRpc21pc3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1RoZSBib3R0b20gc2hlZXQgd2FzIGNsb3NlZCcpO1xuICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgIGlmKHJlc3VsdCE9bnVsbCl7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzdWx0LnZhbDtcbiAgICAgICAgZGF0YS5pZCA9IGRhdGEuX2lkO1xuICAgICAgdGhpcy5fYXBpU2VydmljZS50b2dnbGVzdGF0dXModGhpcy5hcGl1cmx2YWwgKyAnc3RhdHVzdXBkYXRlJywgZGF0YSwgdGhpcy5qd3R0b2tlbnZhbCwgdGhpcy5zb3VyY2VkYXRhdmFsKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgIHJlc3VsdCA9IHJlcztcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgZm9yIChsZXQgYyBpbiB0aGlzLm9sZGRhdGEpIHtcbiAgICAgICAgICAgIC8vdGhpcy5vbGRkYXRhID0gdGhpcy5vbGRkYXRhLmZpbHRlcihvbGRkYXRhID0+IG9sZGRhdGEuX2lkICE9IGlkc1tjXSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vbGRkYXRhW2NdLl9pZCA9PSBkYXRhLl9pZCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW4gZGF0YSB1cGRhdGUnKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgIHRoaXMub2xkZGF0YVtjXS5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSh0aGlzLm9sZGRhdGEpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsKHRydWUsIFtdKTtcbiAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG5cbiAgICAgICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7XG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnY3VzdG9tLW1vZGFsYm94JyxcbiAgICAgICAgICAgIGRhdGE6IHttZXNzYWdlOiAnU3RhdHVzIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5ISEnLCBpc2NvbmZpcm1hdGlvbjogZmFsc2V9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPb29vcHMhJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgICAvL3RoaXMuYW5pbWFsID0gcmVzdWx0O1xuICAgIH0pO1xuXG4gIH1cblxuLy8gZm9yIHRyZWUgdmlldyBpbiBtb2RhbFxuICBjdXN0b21idXR0b25mdW5jKGRhdGE6YW55KXtcbiAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpOyAgICAvLyByb3cgZGF0YVxuICAgIGNvbnNvbGUubG9nKHRoaXMuY3VzdG9tYnV0dG9udmFsKTsgICAgLy8gb2JqZWN0IGZyb20gd2hlcmUgdGhlIGxpYnJhcnkgaGFzIGJlZW4gdXNlZFxuICAgIGxldCB1bnNhZmV1cmw6YW55PXRoaXMuY3VzdG9tYnV0dG9udmFsLnVybDsgICAvL2lmcmFtZSB1cmxcbiAgICBmb3IobGV0IGIgaW4gdGhpcy5jdXN0b21idXR0b252YWwuZmllbGRzKXtcbiAgICAgIHVuc2FmZXVybD11bnNhZmV1cmwrJy8nK2RhdGFbdGhpcy5jdXN0b21idXR0b252YWwuZmllbGRzW2JdXTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ3Vuc2FmZXVybCcpO1xuICAgIGNvbnNvbGUubG9nKHVuc2FmZXVybCk7XG4gICAgdW5zYWZldXJsPXRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1bnNhZmV1cmwpOyAgIC8vZm9yIHNhbml0aXppbmcgdGhlIHVybCBmb3Igc2VjdXJpdHksIG90aGVyd2lzZSBpdCB3b24ndCBiZSBhYmxlIHRvIHNob3cgdGhlIHBhZ2UgaW4gaWZyYW1lLCBoZW5jZSBtb2RhbFxuXG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7ICAgICAgIC8vIGZvciBvcGVuaW5nIHRoZSBtb2RhbFxuICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICBwYW5lbENsYXNzOiAnY3VzdG9tLWRhdGEtbW9kYWwnLFxuICAgICAgZGF0YToge2lzY29uZmlybWF0aW9uOmZhbHNlLGRhdGE6W3tkYXRhOmRhdGEsY3VzdG9tZGF0YTp1bnNhZmV1cmx9XX1cbiAgICB9KTtcblxuXG4gIH1cblxuXG5cbiAgbWFuYWdlc3RhdHVzbXVsdGlwbGUoKXtcblxuICAgIGxldCBpZHM6YW55PVtdO1xuICAgIGxldCBjOmFueTtcbiAgICBmb3IoYyBpbiB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZCl7XG5cbiAgICAgIGlkcy5wdXNoKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkW2NdLl9pZCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdpZHMnKTtcbiAgICBjb25zb2xlLmxvZyhpZHMpO1xuICAgIC8vY29uc29sZS5sb2coJ2RhdGEnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgIGxldCBicz10aGlzLmJvdHRvbVNoZWV0Lm9wZW4oQm90dG9tU2hlZXQse2RhdGE6e2l0ZW1zOnRoaXMuc3RhdHVzYXJydmFsfX0pO1xuXG4gICAgYnMuYWZ0ZXJEaXNtaXNzZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdUaGUgYm90dG9tIHNoZWV0IHdhcyBjbG9zZWQnKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICBpZihyZXN1bHQhPW51bGwpe1xuICAgICAgICAvL2RhdGEuc3RhdHVzID0gcmVzdWx0LnZhbDtcbiAgICAgICAgLy9kYXRhLmlkID0gZGF0YS5faWQ7XG4gICAgICAgIGxldCBuZXdzdGF0dXM6YW55PXJlc3VsdC52YWw7XG4gICAgICB0aGlzLl9hcGlTZXJ2aWNlLnRvZ2dsZXN0YXR1c21hbnkodGhpcy5hcGl1cmx2YWwgKyAnc3RhdHVzdXBkYXRlJywgaWRzLHJlc3VsdC52YWwsIHRoaXMuand0dG9rZW52YWwsIHRoaXMuc291cmNlZGF0YXZhbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgICAgICByZXN1bHQgPSByZXM7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09ICdzdWNjZXNzJykge1xuICAgICAgICAgIGZvciAobGV0IGMgaW4gdGhpcy5vbGRkYXRhKSB7XG4gICAgICAgICAgICAvL3RoaXMub2xkZGF0YSA9IHRoaXMub2xkZGF0YS5maWx0ZXIob2xkZGF0YSA9PiBvbGRkYXRhLl9pZCAhPSBpZHNbY10pO1xuICAgICAgICAgICAgaWYgKGlkcy5pbmRleE9mKHRoaXMub2xkZGF0YVtjXS5faWQpPi0xKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBkYXRhIHVwZGF0ZScpO1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICB0aGlzLm9sZGRhdGFbY10uc3RhdHVzID0gbmV3c3RhdHVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHRoaXMub2xkZGF0YSk7XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWwodHJ1ZSwgW10pO1xuICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcblxuICAgICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdjdXN0b20tbW9kYWxib3gnLFxuICAgICAgICAgICAgZGF0YToge21lc3NhZ2U6ICdTdGF0dXMgdXBkYXRlZCBzdWNjZXNzZnVsbHkhIScsIGlzY29uZmlybWF0aW9uOiBmYWxzZX1cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ09vb29wcyEnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAgIC8vdGhpcy5hbmltYWwgPSByZXN1bHQ7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGRlbGV0ZW11bHRpcGxlKCl7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgY29uc29sZS5sb2codGhpcy5zZWxlY3Rpb24pO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkKTtcblxuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQ29uZmlybWRpYWxvZywge1xuICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4gICAgICBkYXRhOiB7bWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHNlbGVjdGVkIHJlY29yZHM/J31cbiAgICB9KTtcbiAgICBsZXQgaWRzOmFueT1bXTtcbiAgICBsZXQgYzphbnk7XG4gICAgZm9yKGMgaW4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQpe1xuXG4gICAgICBpZHMucHVzaCh0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZFtjXS5faWQpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnaWRzJyk7XG4gICAgY29uc29sZS5sb2coaWRzKTtcblxuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1RoZSBkaWFsb2cgd2FzIGNsb3NlZCcpO1xuICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgIGlmKHJlc3VsdD09J3llcycpe1xuICAgICAgICB0aGlzLl9hcGlTZXJ2aWNlLmRldGVNYW55RGF0YSh0aGlzLmFwaXVybHZhbCt0aGlzLmRlbGV0ZWVuZHBvaW50dmFsLGlkcyx0aGlzLmp3dHRva2VudmFsLHRoaXMuc291cmNlZGF0YXZhbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgICAgcmVzdWx0ID0gcmVzO1xuICAgICAgICAgIGlmKHJlc3VsdC5zdGF0dXM9PSdzdWNjZXNzJyl7XG4gICAgICAgICAgICBmb3IobGV0IGMgaW4gaWRzKXtcbiAgICAgICAgICAgICAgdGhpcy5vbGRkYXRhID0gdGhpcy5vbGRkYXRhLmZpbHRlcihvbGRkYXRhID0+IG9sZGRhdGEuX2lkICE9IGlkc1tjXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5vbGRkYXRhJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9sZGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSh0aGlzLm9sZGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWwodHJ1ZSwgW10pO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG5cbiAgICAgICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbiAgICAgICAgICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4gICAgICAgICAgICAgIGRhdGE6IHttZXNzYWdlOiAnUmVjb3JkKHMpICBkZWxldGVkIHN1Y2Nlc3NmdWxseSAhIScsaXNjb25maXJtYXRpb246ZmFsc2V9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ09vb29wcyEnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICAgIC8vdGhpcy5hbmltYWwgPSByZXN1bHQ7XG4gICAgfSk7XG4gIH1cbiAgZGVsZXRlZGF0YShkYXRhOmFueSl7XG4gICAgLy9hbGVydCg1KTtcbiAgICAvL3RoaXMuX2FwaVNlcnZpY2UuZGV0ZU9uZURhdGEodGhpcy5hcGl1cmx2YWwrdGhpcy5kZWxldGVlbmRwb2ludHZhbCxkYXRhLHRoaXMuand0dG9rZW52YWwpO1xuICAgIGNvbnNvbGUubG9nKCdkYXRhIDg4OSAtLS0nKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBjb25zb2xlLmxvZygnand0dG9rZW52YWwnKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmp3dHRva2VudmFsKTtcblxuXG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7XG4gICAgICBwYW5lbENsYXNzOiAnY3VzdG9tLW1vZGFsYm94JyxcbiAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgZGF0YToge21lc3NhZ2U6ICdBcmUgeW91IHN1cmUgdG8gZGVsZXRlIHRoaXMgcmVjb3JkID8/J31cbiAgICB9KTtcblxuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1RoZSBkaWFsb2cgd2FzIGNsb3NlZCcpO1xuICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgIGlmKHJlc3VsdD09J3llcycpe1xuICAgICAgICB0aGlzLl9hcGlTZXJ2aWNlLmRldGVPbmVEYXRhKHRoaXMuYXBpdXJsdmFsK3RoaXMuZGVsZXRlZW5kcG9pbnR2YWwsZGF0YSx0aGlzLmp3dHRva2VudmFsLHRoaXMuc291cmNlZGF0YXZhbCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgICAgcmVzdWx0ID0gcmVzO1xuICAgICAgICAgIGlmKHJlc3VsdC5zdGF0dXM9PSdzdWNjZXNzJyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5vbGRkYXRhJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9sZGRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5vbGRkYXRhLl9pZCk7XG4gICAgICAgICAgICB0aGlzLm9sZGRhdGEgPSB0aGlzLm9sZGRhdGEuZmlsdGVyKG9sZGRhdGEgPT4gb2xkZGF0YS5faWQgIT0gZGF0YS5faWQpXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKHRoaXMub2xkZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb25Nb2RlbCh0cnVlLCBbXSk7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgICAgICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1kaWFsb2csIHtcbiAgICAgICAgICAgICAgcGFuZWxDbGFzczogJ2N1c3RvbS1tb2RhbGJveCcsXG4gICAgICAgICAgICAgIGRhdGE6IHttZXNzYWdlOiAnUmVjb3JkICBkZWxldGVkIHN1Y2Nlc3NmdWxseSAhIScsaXNjb25maXJtYXRpb246ZmFsc2V9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPb29vcHMhJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgICAvL3RoaXMuYW5pbWFsID0gcmVzdWx0O1xuICAgIH0pO1xuXG4gIH1cblxuIGVkaXRkYXRhKGRhdGE6YW55KXtcbiAgICBjb25zb2xlLmxvZygnZGF0YScpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdHJvdXRldmFsKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmVkaXRyb3V0ZXZhbCtkYXRhLl9pZCk7XG4gICAgY29uc29sZS5sb2codGhpcy5qd3R0b2tlbnZhbCk7XG4gICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5lZGl0cm91dGV2YWwsZGF0YS5faWRdKTtcbiAgICAvL3RoaXMubmFcblxuXG4gIH1cblxuICAvKiBhcnRpc3R4cCBwcmV2aWV3IGJ1dHRvbiBjbGljayBmdW5jdGlvbiBzdGFydCAqL1xuICBhcnRpc3R4cFByZXZpZXcoc2luZ2xlRGF0YTogYW55KSB7XG4gICAgbGV0IGxpbmsgPSAnaHR0cDovL2RldmVsb3BtZW50YXBpLmF1ZGlvZGVhZGxpbmUuY29tOjMwOTAvJyArICdkYXRhbGlzdCc7XG4gICAgLyoqKioqKiogbm90IGNvbXBsZXRlZCAqKioqKiovXG4gICAgbGV0IGRhdGE6IGFueSA9IHsgXCJzb3VyY2VcIjogXCJibG9ja2NoYWludXNlcl92aWV3XCIsIFwiY29uZGl0aW9uXCI6IHsgXCJwb3N0c19pZF9vYmplY3RcIjogc2luZ2xlRGF0YS5faWQgfSwgXCJ0b2tlblwiOiB0aGlzLmp3dHRva2VudmFsIH07XG4gICAgLyoqKioqKioqIG5vdCBjb21wbGV0ZWQgKioqKiovXG4gICAgdGhpcy5fYXBpU2VydmljZS5wb3N0RGF0YShsaW5rLCBkYXRhKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgbGV0IHJlc3RsdDogYW55ID0gcmVzcG9uc2U7XG4gICAgICAvKiBvcGVuIGRpYWxvZyAqL1xuICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtZGlhbG9nLCB7XG4gICAgICAgIHBhbmVsQ2xhc3M6ICdjdXN0b20tbW9kYWxib3gtYXJ0aXN0eHAtcHJldmlldycsXG4gICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICBkYXRhOiB7IHByZXZpZXc6IHRydWUsIHByZXZpZXdEYXRhOiByZXN0bHQgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgLyogYXJ0aXN0eHAgcHJldmlldyBidXR0b24gY2xpY2sgZnVuY3Rpb24gZW5kICovXG5cblxuXG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29uZmlybWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnY29uZmlybS1kaWFsb2cuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1kaWFsb2cge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbmZpcm1kaWFsb2c+LFxuICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkgLHB1YmxpYyBzYW5pdGl6ZXI6RG9tU2FuaXRpemVyKSB7XG4gICAgY29uc29sZS5sb2coJ215IGRhdGEgLi4uJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgfVxuXG4gIG9uTm9DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG4gIHNhbml0aXplVXJsKHVuc2FmZXVybDphbnksZGF0YTphbnkscm93ZGF0YTphbnkpe1xuICAgIGZvcihsZXQgYiBpbiBkYXRhKXtcbiAgICAgIHVuc2FmZXVybD11bnNhZmV1cmwrJy8nK3Jvd2RhdGFbZGF0YVtiXV07XG5cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ3Vuc2FmZXVybCcpO1xuICAgIGNvbnNvbGUubG9nKHVuc2FmZXVybCk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY29uc29sZS5sb2cocm93ZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1bnNhZmV1cmwpO1xuICB9XG5cbn1cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYm90dG9tLXNoZWV0JyxcbiAgdGVtcGxhdGVVcmw6ICdib3R0b20tc2hlZXQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEJvdHRvbVNoZWV0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBib3R0b21TaGVldFJlZjogTWF0Qm90dG9tU2hlZXRSZWY8Qm90dG9tU2hlZXQ+LEBJbmplY3QoTUFUX0JPVFRPTV9TSEVFVF9EQVRBKSBwdWJsaWMgZGF0YTphbnkpIHt9XG5cbiAgb3BlbkxpbmsodmFsOmFueSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdib3R0b21zaGVldCBkYXRhJyk7XG4gICAgY29uc29sZS5sb2codmFsKTtcbiAgICB0aGlzLmJvdHRvbVNoZWV0UmVmLmRpc21pc3ModmFsKTtcbiAgICAvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn0iXX0=