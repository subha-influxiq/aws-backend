import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import {nameValidator,npmValidator,zipValidator,phoneValidator,matchpwd} from './validators';
import { CommonFunction } from '../../../../class/common/common-function';
export interface DialogData {
  msg: string;
}


@Component({
  selector: 'app-addedit-doctor',
  templateUrl: './addedit-doctor.component.html',
  styleUrls: ['./addedit-doctor.component.css']
})
export class AddeditDoctorComponent implements OnInit {


  // ==============================declarations=======================
  docManageForm: FormGroup;
  checkboxArray: any = ['Family Practice', 'General Practitioner', 'Primary Care',
    'Cardiology', 'Neurology', 'Internal Medicine', 'Endocrinology', 'Pain Management', 'Integrated', 'Others'];
  dialogRef: any;
  successMessage: any = "Data Submitted Successfully!!!";
  taxo_array: any = [];
  public htmlText: any = { header: 'Add New Doctor', nav: 'Add Doctor', buttonText: 'Save' };
  action: any;
  defaultData: any;
  condition:any;
  states: any;
  allCities: any;
  cities: any;
  // =================================================================
  public user_token:any;
  public techData : any = [];
  public billerData : any = [];
  constructor(private formBuilder: FormBuilder, private http: HttpServiceService,
    private cookieService: CookieService, public dialog: MatDialog, private router: Router,
    public acivatedRoute: ActivatedRoute, public commonFunction: CommonFunction) {

      /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

      this.user_token = cookieService.get('jwtToken');
      this.getAllTechData();
      this.getAllBillerData();
    this.acivatedRoute.params.subscribe(params => {
      if (params['_id'] != null) {
        this.action = "edit";
        this.condition={ id: params._id };
        this.acivatedRoute.data.subscribe(resolveData => {
          this.defaultData = resolveData.data.res[0];
        });
      }
      else
        this.action = "add";
    });    
  }




  ngOnInit() {
    this.generateForm();

    //generating all the taxonomies
    for (let i = 0; i <= 10; i++)
      this.addCreds();
     
      this.allStateCityData();



    // Case 
    switch (this.action) {
      case 'add':
        /* Button text */
        break;
      case 'edit':
        /* Button text */
        this.htmlText.header = 'Edit Doctor Record';
        this.htmlText.nav = 'Edit Doctor';
        this.htmlText.buttonText = 'Update';
        this.successMessage = "One row updated";
        this.setDefaultValue(this.defaultData);

        setTimeout(() => {
          this.getCityByName(this.defaultData.state);
        }, 2000);
        break;
    }
  }

  inputUntouch(form: any, val: any) {

    form.controls[val].markAsUntouched();
  }


  // ===================================Setting the default Value========================
  setDefaultValue(defaultValue) {
    this.docManageForm.patchValue({
      firstname: defaultValue.firstname,
      lastname: defaultValue.lastname,
      email: defaultValue.email,
      password:defaultValue.password,
      confirmpassword:defaultValue.password,
      phone: defaultValue.phone,
      practicename: defaultValue.practicename,
      taxonomies: defaultValue.taxonomies,
      npm: defaultValue.npm,
      fax : defaultValue.fax,
      address: defaultValue.address,
      city: defaultValue.city,
      state: defaultValue.state,
      tech:defaultValue.tech,
      biller:defaultValue.biller,
      zip: defaultValue.zip,
      status: defaultValue.status

    })
    // this.getCity("Washington");
  }
  // ======================================================================================





  // =============================Form Generator=======================
  generateForm() {
    this.docManageForm = this.formBuilder.group({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)]],
      password: ['',Validators.required],
      confirmpassword: ['',matchpwd],
      phone: ["",[Validators.required]],
      practicename: ['',[Validators.required]],
      npm: ['',[Validators.required]],
      address: ['',Validators.required],
      fax : ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      type:['doctor'],
      zip: ['',[Validators.required]],
      status: ['',],
      tech : ['',Validators.required],
      biller : ['',Validators.required],
      taxo_list: [],
      taxonomies: this.formBuilder.array([]),
    });
  }
  // ==================================================================





  // ============================FormArrayCredentials===================
  addCreds() {
    const creds = this.docManageForm.controls.taxonomies as FormArray;
    creds.push(this.formBuilder.group({
      taxo: '',
    }));
  }
  // ==================================================================== 



  // =========================================MODAL functions==========================================
  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(Modal, {
      width: '250px',
      data: { msg: x }
    });

    this.dialogRef.afterClosed().subscribe(result => {

    });
  }
  // =====================================================================================================






  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.http.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.states = response;
    });

    this.http.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.allCities = response;
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event:any) {
    var val = event;
    this.cities = this.allCities[val];
  }

  getCityByName(stateName) {
    this.cities = this.allCities[stateName];
  }
   /**getting all the technician data**/
   getAllTechData(){
    var data={
      "source": "users",
      "condition": {
        "type": "tech"
    },
    "token": this.user_token
    }
    this.http.httpViaPost('datalist',data)
    .subscribe(response=>{
      this.techData =response.res; 

    })
  }
  /**getting all the biller data**/
  getAllBillerData(){
    var data={
      "source": "users",
      "condition": {
        "type": "biller"
    },
    "token": this.user_token
    }
    this.http.httpViaPost('datalist',data)
    .subscribe(response=>{
      this.billerData =response.res; 
    })
  }





  // ============================Submit Function=======================
  onSubmit() {

    this.docManageForm.value.taxo_list = this.taxo_array;
   

    /* stop here if form is invalid */
    if (this.docManageForm.invalid) {
      this.openDialog("Form is invalid");
      setTimeout(() => {
        this.dialogRef.close();
      }, 2000);
      return;
    } else {
      delete this.docManageForm.value.confirmpassword;
      if (this.docManageForm.value.status) {
        this.docManageForm.value.status = parseInt("1");
      } else {
        this.docManageForm.value.status = parseInt("0");;
      }
    }

    /* start process to submited data */
    let postData: any = {
      "source": 'users',      
      "data": Object.assign(this.docManageForm.value, this.condition),
      "sourceobj": ["tech","biller"],
      "token": this.cookieService.get('jwtToken')
      
    };
    this.http.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
      if (response.status == "success") {
       
        this.openDialog(this.successMessage);
        setTimeout(() => {
          this.dialogRef.close();
        }, 2000);


        this.router.navigateByUrl('admin/doctor-management');;
      } else {
        alert("Some error occurred. Please try again.");
      }
    }, (error) => {
      alert("Some error occurred. Please try again.");
    });


  }
  // ==================================================================


  selectTaxo(val: any) {
    this.taxo_array.push(val);
  }



  trackByFn(index) {
    return index;
  }



}




// ============================================MODAL COMPONENT===========================================
@Component({
  selector: 'app-modal',
  templateUrl: 'modal.html',
})
export class Modal {

  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
// ======================================================================================================
