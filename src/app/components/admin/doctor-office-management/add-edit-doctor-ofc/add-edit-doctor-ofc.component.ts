import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
  id: any;
};

@Component({
  selector: 'app-add-edit-doctor-ofc',
  templateUrl: './add-edit-doctor-ofc.component.html',
  styleUrls: ['./add-edit-doctor-ofc.component.css']
})

export class AddEditDoctorOfcComponent implements OnInit {
  
  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public doctorOfficeAddEditForm: FormGroup;
  public params_id: any='';
  public selectionChangeValue: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New Doctor Office', 
    nav: 'Add Doctor Office', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    doctorOfficeData: "",
    techData: "",
    billerData: "",
    parent_type: [{
      name: "Distributor",value:"distributor"
    }, { name: "DiagnosticAdmin",value:"diagnostic_admin" }, { name: "DoctorGroup",value:"doctor_group" }],
    states: "",
    allCities: "",
    cities: "",
    taxonomies: "",
    user_details:'',
  };
  public dialogRef: any;
  
  constructor(public formBuilder: FormBuilder, public acivatedRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookieService: CookieService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    
      this.htmlText.userData = this.cookieService.getAll();
      this.htmlText.user_details = JSON.parse(this.htmlText.userData.user_details);
      // if(this.htmlText.user_details.user_type == 'admin') {
      // this.getAllTechData();
      // } else {
      //  this.getAllTechData(this.htmlText.user_details._id);
      // }
      this.allStateCityData();
      console.log('888888',this.acivatedRoute.snapshot);
      if (this.acivatedRoute.snapshot.params._id) {
        this.generateAddEditForm('edit');
  
        this.htmlText.message     = "Updated Successfully";
        this.htmlText.header      = 'Edit Doctor Office Record';
        this.htmlText.nav         = 'Edit Doctor Office';
        this.htmlText.buttonText  = 'Update';
        this.params_id            = this.acivatedRoute.snapshot.params._id;
      } else {
        this.generateAddEditForm('add');
      }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:                     ['', []],
      center_name:            ['', [ Validators.required, Validators.maxLength(50) ]],
      firstname:              ['', [ Validators.required, Validators.maxLength(50) ]],
      lastname:               ['', [ Validators.required, Validators.maxLength(50) ]],
      email:                  ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:                  ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      address:                ['', [ Validators.required, Validators.maxLength(200) ]],
      zip:                    ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ]],
      city:                   ['', [ Validators.required ]],
      parent_type: ['admin',[]],
      parent_id: ['', []],
      state:                  ['', [ Validators.required ]],
      user_type:              ['doctor_office', []],
      status:                 ['', []],
      password:               ['', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ]],
      confirmpassword:        ['', [ Validators.required ]]
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.doctorOfficeAddEditForm = this.formBuilder.group(validateRule);

        this.acivatedRoute.data.forEach((data) => {
          let doctorDetails: any = data.data.res;
          setTimeout(() => {
            this.getCity(doctorDetails[0].state);
          }, 1000);

          this.doctorOfficeAddEditForm.controls['id'].patchValue(doctorDetails[0]._id);
          this.doctorOfficeAddEditForm.controls['center_name'].patchValue(doctorDetails[0].center_name);
          this.doctorOfficeAddEditForm.controls['firstname'].patchValue(doctorDetails[0].firstname);
          this.doctorOfficeAddEditForm.controls['lastname'].patchValue(doctorDetails[0].lastname);
          this.doctorOfficeAddEditForm.controls['email'].patchValue(doctorDetails[0].email);
          this.doctorOfficeAddEditForm.controls['phone'].patchValue(doctorDetails[0].phone);
          this.doctorOfficeAddEditForm.controls['address'].patchValue(doctorDetails[0].address);
          this.doctorOfficeAddEditForm.controls['zip'].patchValue(doctorDetails[0].zip);
          this.doctorOfficeAddEditForm.controls['city'].patchValue(doctorDetails[0].city);
          this.doctorOfficeAddEditForm.controls['tech_id'].patchValue(doctorDetails[0].tech_id);// this.getCity(doctorDetails[0].state);
          this.getParentData(doctorDetails[0].parent_type);
          //  this.getCity(doctorDetails[0].state);
          // this.getCityByName(doctorDetails[0].state);
          setTimeout(() => {
            // getCityByName
            
            this.doctorOfficeAddEditForm.controls['parent_type'].patchValue(doctorDetails[0].parent_type);
            this.doctorOfficeAddEditForm.controls['parent_id'].patchValue(doctorDetails[0].parent_id);
          }, 2000);
          this.doctorOfficeAddEditForm.controls['state'].patchValue(doctorDetails[0].state);
          this.doctorOfficeAddEditForm.controls['status'].patchValue(doctorDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.doctorOfficeAddEditForm = this.formBuilder.group(validateRule, passwordRule);
        break;
    }
    console.log('2222222222',this.params_id)
  }

  ngOnInit() {
  }

  matchpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      }
      else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(ChangePasswordDoctorOfficeModal, {
      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.htmlText.states = response;
    });

    this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.htmlText.allCities = response;
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event) {
    var val = event;
    this.htmlText.cities = this.htmlText.allCities[val];
  }

  /**getting all the technician data**/
  // getAllTechData(id:any='') {
  //   console.log(">>>>>", this.htmlText.user_details);

  //   var data = {
  //     "source": "data_pece",
  //     "condition": {
  //       "user_type": "tech",
  //       "tech_id": this.htmlText.user_details.tech_id
  //     },
  //     "token": this.htmlText.userData.jwtToken
  //   };

  //   if(this.htmlText.user_details.user_type !='admin') {
  //     data.condition["parent_id"] = id;
  //   }
  //   this.httpService.httpViaPost('datalist', data).subscribe(response => {
  //     this.htmlText.techData = response.res;
  //   });
  // }

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

    this.httpService.httpViaPost('datalist', data).subscribe(response => {
      // console.log('+++++++++',response);
      this.htmlText.parent_id = response.res;
      // this.htmlText.parent_id = response;
      // this.htmlText.doctorOfficeData = response.data.doctor_office_data;
      // this.htmlText.billerData = response.data.biller_data;
    });
  }

  getCityByName(stateName) {
    this.htmlText.cities = this.htmlText.allCities[stateName];
  }

  doctorOfficeAddEditFormFormSubmit() {
    for (let x in this.doctorOfficeAddEditForm.controls) {
      this.doctorOfficeAddEditForm.controls[x].markAsTouched();
    }

    /* stop here if form is invalid */
    if (this.doctorOfficeAddEditForm.valid) {
      delete this.doctorOfficeAddEditForm.value.confirmpassword;

      if (this.doctorOfficeAddEditForm.value.status) {
        this.doctorOfficeAddEditForm.value.status = parseInt("1");
      } else {
        this.doctorOfficeAddEditForm.value.status = parseInt("0");;
      }

      /* start process to submited data */
      let postData: any = {
        "source": "data_pece",
        "data": this.doctorOfficeAddEditForm.value,
        "domainurl": environment.siteBaseUrl + 'reset-password',
        "sourceobj":["parent_id"],
        "token": this.cookieService.get('jwtToken')
      };

      if(this.htmlText.user_details.user_type == 'doctor') {
        postData.data["doctor_id"] = this.htmlText.user_details._id;
        postData["sourceobj"] = ["doctor_id"];
      }

      if(this.htmlText.user_details.user_type == 'diagnostic_admin') {
        postData.data["parent_id"] = this.htmlText.user_details._id;
        postData["sourceobj"] = ["parent_id"];
        postData["parent_type"] = ["diagnostic_admin"];
      }

      if(this.htmlText.user_details.user_type == 'doctor_group') {
        postData.data["parent_id"] = this.htmlText.user_details._id;
        postData["sourceobj"] = ["parent_id"];
        postData["parent_type"] = ["doctor_group"];
      }

      if(this.htmlText.user_details.user_type == 'distributors') {
        postData.data["parent_id"] = this.htmlText.user_details._id;
        postData["sourceobj"] = ["parent_id"];
        postData["parent_type"] = ["distributors"];
      }
      if(this.htmlText.user_details.user_type !='doctor') {
      this.httpService.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
        if (response.status == "success") {
          this.formDirective.resetForm();

          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          setTimeout(() => {
            switch(this.htmlText.user_details.user_type) {
              case 'doctor':
                this.router.navigateByUrl("doctor/doctor-office-management");
                break;
              case 'admin':
                this.router.navigateByUrl("admin/doctor-office-management");
                break;
            }
          }, 2000);
        } else {
          this.snackBar.open(response.msg, '', {
            duration: 2000,
          });
        }
      }, (error) => {
        alert("Some error occurred. Please try again.");
      });
    } else {
      postData.data["parent_id"] = this.htmlText.userData.user_details._id;
      postData.data["parent_type"] = "doctor"
      postData["sourceobj"] = ["parent_id"];
      postData["doctorid"] = this.htmlText.userData.user_details._id
      this.httpService.httpViaPost('add-doctor-office-data', postData).subscribe((response: any) => {
        if (response.status == "success") {
          this.formDirective.resetForm();

          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          setTimeout(() => {
            switch(this.htmlText.user_details.user_type) {
              case 'doctor':
                this.router.navigateByUrl("doctor/doctor-office-management");
                break;
              case 'diagnostic_admin':
                this.router.navigateByUrl("diagnostic-admin/doctor-office-management");
                break;
              case 'doctor_group':
                this.router.navigateByUrl("doctor-group/doctor-office-management");
                break;
              case 'distributors':
                this.router.navigateByUrl("distributors/doctor-office-management");
                break;
            }
          }, 2000);
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
}

@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})

export class ChangePasswordDoctorOfficeModal {
  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDoctorOfficeModal>,
    public fb: FormBuilder, public httpService: HttpServiceService, public cookie: CookieService,
    public activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.params_id = data.id;

    this.user_token = cookie.get('jwtToken');
    this.changePwdForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: ['', []],
    }, { validators: this.matchpassword('password', 'confirmpassword') })

  }

  matchpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      }
      else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

  changePasswordFormSubmit() {
    let x: any;
    for (x in this.changePwdForm.controls) {
      this.changePwdForm.controls[x].markAsTouched();
    }
    if (this.changePwdForm.valid) {
      delete this.changePwdForm.value.confirmpassword
      var data = {
        "_id": this.params_id,
        "adminflag": 1,
        "newPassword": this.changePwdForm.value.password,
      }
      this.httpService.httpViaPost('changepassword',data).subscribe(response=>{
        console.log("response",response);
      });
    }

  }
}