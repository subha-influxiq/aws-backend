import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-ticket-category',
  templateUrl: './add-ticket-category.component.html',
  styleUrls: ['./add-ticket-category.component.css']
})
export class AddTicketCategoryComponent implements OnInit {
  public loginUserData: any = [];
  public userId:any;

// formdata
formfieldrefresh = true;
updatetable = true;
formfieldrefreshdata: any = null;
// public formdata: any;
public status: any = [{ val: 1, name: 'Active' }, { val: 0, name: 'Inactive' }];

public userTypeValue: any = [{ name: 'Doctor', val: 'doctor' }, { name: 'Tech', val: 'tech' }, { name: 'Biller', val: 'biller' }, { name: 'Doctors Office', val: 'doctor_office' }, { name: 'Diagnostic Admin', val: 'diagnostic_admin' }, { name: 'Doctor Group', val: 'doctor_group' }, { name: 'Distributor', val: 'distributors' }, { name: 'Salesperson', val: 'sales_person' }, { name: 'Biller Admin', val: 'admin_biller' }];
public categoryVal: any = [];
// public imageValue: any= [];
public imageValue: any;
formdata: any = {
  successmessage: 'Added Successfully !!',

  submitactive: true, // optional, default true
  submittext: 'Submit',
  resettext: 'Reset',
  canceltext: 'Cancel',
  // apiUrl:  environment.apiBaseUrl,
  apiUrl:  'https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/',
  endpoint: 'api1/addorupdatejobticketcategory',
  jwttoken: '',

  fields: [
    {
      label: 'Category Name',
      name: 'category_name',
      value: '',
      type: 'text',
      validations: [
        { rule: 'required', message: 'Category Name is required' },

      ]
    },
    {
      label: 'Description',
      name: 'description',
      type: 'editor',
      value: '',
      validations: [
        { rule: 'required', message: 'Description  is required' },
      ]
    },
    {
      label: 'User Type',
      name: 'user_type',
      hint: '',
      type: 'select',
      val: this.userTypeValue,
      validations: [
        { rule: 'required', message: 'Select User Type' }
      ],
    },
    {
      label: 'Priority',
      name: 'priority',
      value: '',
      type: 'number',
      validations: [
        { rule: 'required', message: 'Priority is required' },

      ]
    },
    {
      label: 'Active',
      name: 'status',
      hint: '',
      type: 'checkbox',
      val: this.status,
      // value: '',
   },

    // {
    //   label: 'File Upload',
    //   name: 'uploadfile',
    //   type: 'file',
    //   multiple: true,
    //   prefix: 'image-' + Date.now(),
    //   path: 'dna/job-ticket/',
    //   baseurl: 'dnabackned-dev-bannerfile',
    //   bucket: 'awsbackend-dev-patient-files-test',
    //   apiurl: 'https://tge24bc2ne.execute-api.us-east-1.amazonaws.com/dev/requestUploadURL',
    //   apideleteurl: 'https://tge24bc2ne.execute-api.us-east-1.amazonaws.com/dev/deletefilefromBucket',
   

    // },
    // {
    //   label: 'User Id',
    //   name: 'user_id',
    //   type: 'hidden',
    //   value: this.userId
    // },
    {
      label: 'Ticket Status',
      name: 'ticket_status',
      type: 'hidden',
      value: 'Pending'
    }

  ]
};
  constructor(public cookieService : CookieService ) { 
    // this.loginUserData["user_details"] = cookieService.getAll();
    this.loginUserData= JSON.parse(cookieService.get('user_details'));
    console.log(this.loginUserData);
    this.userId = this.loginUserData._id;
    console.log(this.userId);
    this.formdata['jwttoken'] =  (cookieService.get('jwtToken'));

    this.formdata.fields.push({
      label: 'User Id',
      name: 'user_id',
      type: 'hidden',
      value: this.userId
    })
  }

  ngOnInit() {
  }

}
