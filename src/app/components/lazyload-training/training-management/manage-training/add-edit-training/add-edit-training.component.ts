import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-add-edit-training',
  templateUrl: './add-edit-training.component.html',
  styleUrls: ['./add-edit-training.component.css']
})
export class AddEditTrainingComponent implements OnInit {

  title = '';
  public header_txt :any= 'Add Training'
  public userData:any;
  public jwtToken: any;
  public isDna: any = "no"
  public formdataval: any;
  public recid: any;
  public listingPageRoute: any = "/admin/manage-training/list";
  public serverDetails: any = {
    "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api1/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source": 'training_category_management',
    "endpoint": "addorupdatetrainingcategory",  
    "showEndpoint": "gettrainingdatabyid",
    "AddheaderText": "Add Training",
    "EditheaderText": "Edit Training",
    "formTitleName": 'Training'
  }
  public additionalData: any = {
    "objectId": "parent_catagory"
  };
  constructor(public route: ActivatedRoute, public cookie: CookieService) {
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
    this.userData=JSON.parse(cookie.get('user_details'));

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recid = params['id'];
      console.log(params['id'])
      if (this.recid != null && this.recid != '' && this.recid != undefined) {
        // this.geteditdata()
        this.header_txt='Edit Training';
      }
    });

    this.formdataval = [
      { inputtype: 'text', name: 'catagory_name', label: 'Training Title', placeholder: 'Enter Training Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description' },

      { inputtype: 'text', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' },
      // {inputtype:'radio',name:'type',value:["Mentor","Mentee","All"],valuelabel:'',label:"Training accessible to",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},

      { inputtype: 'select', name: 'type', label: 'Select Role', sourceview: 'assets/user_type.json', multiple: true, sourcetype: 'static', selectvalue: 'name', selectid: 'val', validationrule: { required: true }, validationerrormsg: 'is required' },

      // { inputtype: 'text', name: 'catagoryname', label: 'Catagory Name ', placeholder: 'Enter Catagory Name', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'select', name: 'parent_catagory', label: 'Parent Category', defaultchoice: 'Select a Parent Category', sourceview: 'training_category_management', endpoint: 'gettrainingcategorydata', selectvalue: 'catagory_name', selectid: '_id' },

      // {inputtype:'select',name:'state',label:'State/Region',defaultchoice:'Select a State/region',sourceview:'assets/states.json',multiple:true, sourcetype:'static',selectvalue:'name',selectid:'abbreviation',validationrule:{required:true},validationerrormsg:'is required'},
      { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },
    ];
  }

}
