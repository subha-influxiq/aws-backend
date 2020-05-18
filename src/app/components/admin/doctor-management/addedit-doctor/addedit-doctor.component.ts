import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { nameValidator, npmValidator, zipValidator, phoneValidator, matchpwd } from './validators';
import { MatSnackBar, MatCalendarBody } from '@angular/material';
import * as _ from "lodash";
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
  id: any;
}

@Component({
  selector: 'app-addedit-doctor',
  templateUrl: './addedit-doctor.component.html',
  styleUrls: ['./addedit-doctor.component.css']
})

export class AddeditDoctorComponent implements OnInit {

  public doctorManagementAddEditForm: FormGroup;
  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New Doctor',
    nav: 'Add Doctor',
    buttonText: 'Save',
    message: "Submitted Successfully",
    doctorOfficeData: [],
    techData: [],
    parent_type: [{
      name: "Distributor",value:"distributor"
    }, { name: "DiagnosticAdmin",value:"diagnostic_admin" }, { name: "DoctorGroup",value:"doctor_group" }],
    parent_id: [],
    billerData: [],
    states: "",
    allCities: "",
    cities: "",
    taxonomies: "",
    user_details: ""
  };
  public dialogRef: any;
  public selectionChangeValue: any;

  constructor(private formBuilder: FormBuilder, private http: HttpServiceService,
    private cookieService: CookieService, public dialog: MatDialog, private router: Router,
    public acivatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {

    this.htmlText.userData = this.cookieService.getAll();
    this.htmlText.user_details = JSON.parse(this.htmlText.userData.user_details);
    this.allStateCityData();
    // this.getAllData();
    // this.f();
    
    if(this.htmlText.user_details.user_type !='admin') {
      this.getalldata(this.htmlText.user_details);
    } else {
      this.getalldata();
    }

    if (this.acivatedRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.message = "Updated Successfully";
      this.htmlText.header = 'Edit Doctor Record';
      this.htmlText.nav = 'Edit Doctor';
      this.htmlText.buttonText = 'Update';
      this.params_id = this.acivatedRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
    
  }

  ngOnInit() {
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id: ['', []],
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(16)]],
      fax: ['', [Validators.required]],
      practice_name: ['', [Validators.required]],
      npi: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(18)]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      user_type: ['doctor'],
      parent_type: ['admin'],
      parent_id: ['', []],
      tech_id: [[]],
      biller_id: [[]],
      doctors_office_id: [[]],
      taxo_list: [[]],
      status: ['', []],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required]]
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    // diagnostic_admin
    if (this.htmlText.user_details.user_type == 'diagnostic_admin') {
      validateRule["tech_id"] = [[], []];
    }

    if (this.htmlText.user_details.user_type == 'doctor') {
      validateRule["tech_id"] = [[], []];
    }

    switch (flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.doctorManagementAddEditForm = this.formBuilder.group(validateRule);

        this.acivatedRoute.data.forEach((data) => {
          let doctorDetails: any = data.data.res;
          console.log('=======', doctorDetails[0]);
          this.doctorManagementAddEditForm.controls['id'].patchValue(doctorDetails[0]._id);
          this.doctorManagementAddEditForm.controls['firstname'].patchValue(doctorDetails[0].firstname);
          this.doctorManagementAddEditForm.controls['firstname'].patchValue(doctorDetails[0].firstname);
          this.doctorManagementAddEditForm.controls['lastname'].patchValue(doctorDetails[0].lastname);
          this.doctorManagementAddEditForm.controls['email'].patchValue(doctorDetails[0].email);
          this.doctorManagementAddEditForm.controls['phone'].patchValue(doctorDetails[0].phone);
          this.doctorManagementAddEditForm.controls['fax'].patchValue(doctorDetails[0].fax);
          this.doctorManagementAddEditForm.controls['practice_name'].patchValue(doctorDetails[0].practice_name);
          this.doctorManagementAddEditForm.controls['npi'].patchValue(doctorDetails[0].npi);
          this.doctorManagementAddEditForm.controls['address'].patchValue(doctorDetails[0].address);
          this.doctorManagementAddEditForm.controls['zip'].patchValue(doctorDetails[0].zip);
          this.doctorManagementAddEditForm.controls['city'].patchValue(doctorDetails[0].city);
          this.doctorManagementAddEditForm.controls['state'].patchValue(doctorDetails[0].state);
          this.doctorManagementAddEditForm.controls['city'].patchValue(doctorDetails[0].city);
          // this.getCity(doctorDetails[0].state);
          this.getalldata(doctorDetails[0].parent_id);
          //  this.getCity(doctorDetails[0].state);
          // this.getCityByName(doctorDetails[0].state);
          setTimeout(() => {
            // getCityByName
            
            this.doctorManagementAddEditForm.controls['tech_id'].patchValue(doctorDetails[0].tech_id);
            this.doctorManagementAddEditForm.controls['biller_id'].patchValue(doctorDetails[0].biller_id);
            this.doctorManagementAddEditForm.controls['doctors_office_id'].patchValue(doctorDetails[0].doctors_office_id);
            console.log('doctorDetails[0].doctors_office_id', doctorDetails[0].doctors_office_id);
            console.log('doctorDetails[0].tech_id', doctorDetails[0].tech_id);
            console.log('doctorDetails[0].biller_id', doctorDetails[0].biller_id);
          }, 2000);

          // if (doctorDetails[0].parent_type != "admin") {
          this.doctorManagementAddEditForm.controls['parent_type'].patchValue(doctorDetails[0].parent_type);
          // }
          // if (doctorDetails[0].parent_type != "admin") {
          this.doctorManagementAddEditForm.controls['parent_id'].patchValue(doctorDetails[0].parent_id);
          // }
          // this.doctorManagementAddEditForm.controls['state'].patchValue(doctorDetails[0].state);
          this.doctorManagementAddEditForm.controls['taxo_list'].patchValue(doctorDetails[0].taxo_list);
          this.doctorManagementAddEditForm.controls['status'].patchValue(doctorDetails[0].status);
          // this.doctorManagementAddEditForm.controls['doctors_office_id'].patchValue(doctorDetails[0].doctors_office_details);
          // this.getalldata(doctorDetails[0].parent_id);
          // return;
          // setTimeout(() => {
          //   this.getCity(doctorDetails[0].state);
          // }, 1000);
          // if (doctorDetails[0].parent_type == "admin") {
          //   setTimeout(() => {
          //     this.getalldata();
          //   }, 1000);
          // } else {
          //   setTimeout(() => {
          //     this.getalldata(doctorDetails[0].parent_id);
          //   }, 1000);
          // }
          // if (doctorDetails[0].parent_type != "admin") {
          //   setTimeout(() => {
          //     this.getParentData(doctorDetails[0].parent_type);
          //   }, 1000);
          // }

          // return



          // this.doctorManagementAddEditForm.controls['tech_id'].patchValue(doctorDetails[0].tech_id);
          // this.doctorManagementAddEditForm.controls['biller_id'].patchValue(doctorDetails[0].biller_id);
          // this.doctorManagementAddEditForm.controls['doctors_office_id'].patchValue(doctorDetails[0].doctors_office_id);

          // // diagnostic_admin
          // if (this.htmlText.user_details.user_type == 'diagnostic_admin') {
          //   this.doctorManagementAddEditForm.controls['tech_id'].patchValue(doctorDetails[0].tech_id);
          // }

          // if (this.htmlText.user_details.user_type == 'admin') {
          //   this.doctorManagementAddEditForm.controls['parent_id'] = this.htmlText.user_details._id;
          //   // this.doctorManagementAddEditForm.controls['parent_type'] = this.;
          // }
          // // doctor
          // if (this.htmlText.user_details.user_type == 'doctor') {
          //   this.doctorManagementAddEditForm.controls['tech_id'].patchValue(doctorDetails[0].tech_id);
          // }
          //this.doctorManagementAddEditForm.controls['biller_id'].patchValue(doctorDetails[0].biller_details);
          //this.doctorManagementAddEditForm.controls['doctors_office_id'].patchValue(doctorDetails[0].doctors_office_details);


        });
        break;
      case 'add':
        delete validateRule.id;

        this.doctorManagementAddEditForm = this.formBuilder.group(validateRule, passwordRule);
        break;
    }
  }

  matchpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      } else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(ChangePasswordDoctorModal, {
      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.http.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.htmlText.states = response;
    });

    this.http.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.htmlText.allCities = response;
    });

    this.http.getSiteSettingData("./assets/data-set/taxonomies.json").subscribe(response => {
      this.htmlText.taxonomies = response;
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event: any) {
    var val = event;
    this.htmlText.cities = this.htmlText.allCities[val];
  }

  getCityByName(stateName) {
    this.htmlText.cities = this.htmlText.allCities[stateName];
    console.log(stateName,this.htmlText.allCities[stateName],'cc');
  }

  /**getting all the technician data**/
  getalldata(id: any = '') {
    var data = {
      "token": this.htmlText.userData.jwtToken,
      "source": "data_pece",
      "condition": {}
    };

    var data1 = {
      "token": this.htmlText.userData.jwtToken,
      "source": "data_pece",
      "condition": {}
    };

    var data2 = {
      "token": this.htmlText.userData.jwtToken,
      "source": "data_pece",
      "condition": {}
    };

    if (id.user_type == 'diagnostic_admin') {
      data.condition['parent_id_object'] = id._id;
      data.condition['user_type'] = "tech"
      data1.condition['parent_id_object'] = id._id;
      data1.condition['user_type'] = "biller"
      data2.condition['parent_id_object'] = id._id;
      data2.condition['user_type'] = "doctor_office"
    }

    if (id.user_type == 'doctor_group') {
      data.condition['parent_id_object'] = id._id;
      data.condition['user_type'] = "tech"
      data1.condition['parent_id_object'] = id._id;
      data1.condition['user_type'] = "biller"
      data2.condition['parent_id_object'] = id._id;
      data2.condition['user_type'] = "doctor_office"
    }

    if (id.user_type == 'distributors') {
      data.condition['parent_id_object'] = id._id;
      data.condition['user_type'] = "tech"
      data1.condition['parent_id_object'] = id._id;
      data1.condition['user_type'] = "biller"
      data2.condition['parent_id_object'] = id._id;
      data2.condition['user_type'] = "doctor_office"
    }

    if (id == '') {
      data.condition['user_type'] = "tech"
      data1.condition['user_type'] = "biller"
      data2.condition['user_type'] = "doctor_office"
    }

    this.http.httpViaPost('datalist', data).subscribe(response => {
      this.htmlText.techData = response.res;
    });

    this.http.httpViaPost('datalist', data1).subscribe(response => {
      this.htmlText.billerData = response.res;
    });

    this.http.httpViaPost('datalist', data2).subscribe(response => {
      this.htmlText.doctorOfficeData = response.res;
    });
  }

  /**getting all the Parent data**/


  getParentData(id: any = '') {
    var billerData = id;
    this.selectionChangeValue = billerData;
    console.log('1111', billerData);
    if (billerData == 'DiagnosticAdmin') {
      // data['diagnostic_admin_id_object'] = this.htmlText.userData.user_details._id;
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "diagnostic_admin"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    if (billerData == 'Distributor') {
      // data['diagnostic_admin_id_object'] = this.htmlText.userData.user_details._id;
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "distributors"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    if (billerData == 'DoctorGroup') {
      // data['diagnostic_admin_id_object'] = this.htmlText.userData.user_details._id;
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "doctor_group"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    // if(this.htmlText.user_details.user_type == 'distributors') {
    //   data['distributor_id_object'] = this.htmlText.userData.user_details._id;
    // }

    this.http.httpViaPost('datalist', data).subscribe(response => {
      // console.log('+++++++++',response);
      this.htmlText.parent_id = response.res;
      // this.htmlText.parent_id = response;
      // this.htmlText.doctorOfficeData = response.data.doctor_office_data;
      // this.htmlText.billerData = response.data.biller_data;
    });
  }

  doctorManagementAddEditFormSubmit() {
    for (let x in this.doctorManagementAddEditForm.controls) {
      this.doctorManagementAddEditForm.controls[x].markAsTouched();
    }

    /* stop here if form is invalid */
    if (this.doctorManagementAddEditForm.valid) {
      delete this.doctorManagementAddEditForm.value.confirmpassword;

      if (this.doctorManagementAddEditForm.value.status) {
        this.doctorManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.doctorManagementAddEditForm.value.status = parseInt("0");;
      }


      /* start process to submited data */
      
      var postData: any = {
        "source": "data_pece",
        "data": this.doctorManagementAddEditForm.value,
        "sourceobjArray": ["tech_id","biller_id","doctor_office_id"],
        "token": this.cookieService.get('jwtToken')
      };

      if (this.htmlText.user_details.user_type == 'diagnostic_admin') {
        postData.data["parent_id"] = this.htmlText.user_details._id;
        postData.data["parent_type"] = "diagnostic_dmin";
        postData["sourceobj"] = ["parent_id"];
        postData["sourceobjArray"] = ["tech_id"];
      }

      if (this.htmlText.user_details.user_type == 'doctor_group') {
        postData.data["parent_id"] = this.htmlText.user_details._id;
        postData.data["parent_type"] = "doctors_group_admin";
        postData["sourceobj"] = ["parent_id"];
        postData["sourceobjArray"] = ["tech_id"];
      }

      if (this.htmlText.user_details.user_type == 'distributors') {
        postData.data["parent_id"] = this.htmlText.user_details._id;
        postData.data["parent_type"] = "distributors";
        postData["sourceobj"] = ["parent_id"];
        postData["sourceobjArray"] = ["tech_id"];
      }
      this.http.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
        if (response.status == "success") {
          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          setTimeout(() => {
            switch (this.htmlText.user_details.user_type) {
              case 'admin':
                this.router.navigateByUrl("admin/doctor-management");
                break;
              case 'diagnostic_admin':
                this.router.navigateByUrl("diagnostic-admin/doctor-management");
                break;
              case 'distributors':
                this.router.navigateByUrl("distributors/doctor-management");
                break;
              case 'doctor_group':
                this.router.navigateByUrl("doctor-group/doctor-management");
                break;
            }
          }, 1000);
        } else {
          this.snackBar.open(response.msg, '', {
            duration: 2000,
          });
        }
      }, (error) => {
        alert("Some error occurred. Please try again.");
      });
    }
  }
}

@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})

export class ChangePasswordDoctorModal {
  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDoctorModal>,
    public fb: FormBuilder, public httpService: HttpServiceService, public cookie: CookieService,
    public activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.params_id = data.id;

    this.user_token = cookie.get('jwtToken');
    this.changePwdForm = this.fb.group({
      password: ['', Validators.required],
      confirmpassword: [],
    }, { validators: this.matchpassword('password', 'confirmpassword') })

  }

  matchpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      } else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

  changePasswordFormSubmit() {
    for (let x in this.changePwdForm.controls) {
      this.changePwdForm.controls[x].markAsTouched();
    }

    if (this.changePwdForm.valid) {
      delete this.changePwdForm.value.confirmpassword
      var data = {
        "_id": this.params_id,
        "adminflag": 1,
        "newPassword": this.changePwdForm.value.password,
      }

      this.httpService.httpViaPost('changepassword', data).subscribe(response => {
      });
    }
  }

}