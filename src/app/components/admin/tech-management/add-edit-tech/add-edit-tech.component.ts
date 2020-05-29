import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
  id: any;
}

@Component({
  selector: 'app-add-edit-tech',
  templateUrl: './add-edit-tech.component.html',
  styleUrls: ['./add-edit-tech.component.css']
})

export class AddEditTechComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public TechManagementAddEditForm: FormGroup;
  public dialogRef: any;
  public selectionChangeValue: any;
  public params_id: any = '';
  
  public htmlText: any = {
    userData: "",
    header: 'Add New Tech', 
    nav: 'Add Tech', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    states: "",
    allCities: "",
    cities: "",
    parent_type: [{
      name: "Distributor",value:"distributor"
    }, { name: "DiagnosticAdmin",value:"diagnostic_admin" }, { name: "DoctorGroup",value:"doctor_group" }],
  };

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snackBar: MatSnackBar, public commonFunction: CommonFunction,
    public dialog: MatDialog) {
    
    this.htmlText.userData = cookie.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);
    this.allStateCityData();

    if (this.activeRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.message     = "Updated Successfully";
      this.htmlText.header      = 'Edit Tech Record';
      this.htmlText.nav         = 'Edit Tech';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:               ['', []],
      firstname:        ['', [ Validators.required, Validators.maxLength(50) ]],
      lastname:         ['', [ Validators.required, Validators.maxLength(50) ]],
      email:            ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:            ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      address:          ['', [ Validators.required, Validators.maxLength(200) ]],
      zip:              ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ]],
      city:             ['', [ Validators.required ]],
      state:            ['', [ Validators.required ]],
      user_type:        ['tech', []],
      parent_type:      ['admin',[]],
      parent_id:        ['',[]],
      status:           ['', []],
      password:         ['', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ]],
      confirmpassword:  ['', [ Validators.required ]]
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.TechManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          let billerDetails :any = data.techData.res;
          setTimeout(() => {
            this.getCity(billerDetails[0].state);
          }, 1000);

          this.TechManagementAddEditForm.controls['id'].patchValue(billerDetails[0]._id);
          this.TechManagementAddEditForm.controls['firstname'].patchValue(billerDetails[0].firstname);
          this.TechManagementAddEditForm.controls['lastname'].patchValue(billerDetails[0].lastname);
          this.TechManagementAddEditForm.controls['email'].patchValue(billerDetails[0].email);
          this.TechManagementAddEditForm.controls['phone'].patchValue(billerDetails[0].phone);
          this.TechManagementAddEditForm.controls['address'].patchValue(billerDetails[0].address);
          // this.getCity(doctorDetails[0].state);
          this.getParentData(billerDetails[0].parent_type);
          //  this.getCity(doctorDetails[0].state);
          // this.getCityByName(doctorDetails[0].state);
          setTimeout(() => {
            // getCityByName
            
            this.TechManagementAddEditForm.controls['parent_type'].patchValue(billerDetails[0].parent_type);
            this.TechManagementAddEditForm.controls['parent_id'].patchValue(billerDetails[0].parent_id);
          }, 2000);
          this.TechManagementAddEditForm.controls['zip'].patchValue(billerDetails[0].zip);
          this.TechManagementAddEditForm.controls['city'].patchValue(billerDetails[0].city);
          this.TechManagementAddEditForm.controls['state'].patchValue(billerDetails[0].state);
          this.TechManagementAddEditForm.controls['status'].patchValue(billerDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.TechManagementAddEditForm = this.fb.group(validateRule);
        break;
    }
  }

  ngOnInit() {
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

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(Dialogtest, {
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
      // this.getResolveData();
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

  getCityByName(stateName) {
    this.htmlText.cities = this.htmlText.allCities[stateName];
  }

  getParentData(id: any = '') {
    console.log('222222222222',id);
    var billerData = id;
    this.selectionChangeValue = billerData;
    console.log('1111', billerData);
    if ((billerData == 'DiagnosticAdmin') || (billerData == "diagnostic_admin")) {
      // data['diagnostic_admin_id_object'] = this.htmlText.userData.user_details._id;
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "diagnostic_admin"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    if ((billerData == 'Distributor') || (billerData == 'distributor')) {
      // data['diagnostic_admin_id_object'] = this.htmlText.userData.user_details._id;
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "distributors"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    if ((billerData == 'DoctorGroup') || (billerData == "doctor_group")) {
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

  TechManagementAddFormFormSubmit() {
    for (let x in this.TechManagementAddEditForm.controls) {
      this.TechManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.TechManagementAddEditForm.valid) {
      delete this.TechManagementAddEditForm.value.confirmpassword;

      if (this.TechManagementAddEditForm.value.status) {
        this.TechManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.TechManagementAddEditForm.value.status = parseInt("0");
      }
      
      var data: any = {
        "source": "data_pece",
        "data": this.TechManagementAddEditForm.value,
        "token": this.htmlText.userData.jwtToken,
        "sourceobj":["parent_id"],
      };

      if(this.htmlText.userData.user_details.user_type == 'diagnostic_admin') {
        data.data["parent_id"] = this.htmlText.userData.user_details._id;
        data.data["parent_type"] = "diagnostic_admin"
        data["sourceobj"] = ["parent_id"];
      }

      if(this.htmlText.userData.user_details.user_type == 'doctor') {
        data.data["doctor_id"] = this.htmlText.userData.user_details._id;
        data["sourceobj"] = ["doctor_id"];
      }

      if(this.htmlText.userData.user_details.user_type == 'doctor_group') {
        data.data["parent_id"] = this.htmlText.userData.user_details._id;
        data.data["parent_type"] = "doctor_group"
        data["sourceobj"] = ["parent_id"];
      }

      if(this.htmlText.userData.user_details.user_type == 'distributors') {
        data.data["parent_id"] = this.htmlText.userData.user_details._id;
        data.data["parent_type"] = "distributor"
        data["sourceobj"] = ["parent_id"];
      }

      if(this.htmlText.userData.user_details.user_type !='doctor') {

      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if (response.status == "success") {
          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          this.formDirective.resetForm();

          setTimeout(() => {
            switch(this.htmlText.userData.user_details.user_type) {
              case 'admin':
                this.router.navigateByUrl("admin/tech-management");
                break;
              case 'diagnostic_admin':
                this.router.navigateByUrl("diagnostic-admin/tech-management");
                break;
              case  'doctor_group':
                this.router.navigateByUrl("doctor-group/tech-management");
                break;
              case  'distributors':
                this.router.navigateByUrl("distributors/tech-management");
                break;
            }
          }, 1000);
        } else {
          this.snackBar.open(response.msg, '', {
            duration: 2000,
          });
        }
      });
    } else {
      data.data["parent_id"] = this.htmlText.userData.user_details._id;
      data.data["parent_type"] = "doctor"
      data["sourceobj"] = ["parent_id"];
      data["doctorid"] = this.htmlText.userData.user_details._id
      this.httpService.httpViaPost("add-tech-data", data).subscribe(response => {
        if (response.status == "success") {
          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          this.formDirective.resetForm();

          setTimeout(() => {
            switch(this.htmlText.userData.user_details.user_type) {
              case 'admin':
                this.router.navigateByUrl("admin/tech-management");
                break;
              case 'diagnostic_admin':
                this.router.navigateByUrl("diagnostic-admin/tech-management");
                break;
              case  'doctor_group':
                this.router.navigateByUrl("doctor-group/tech-management");
                break;
              case  'distributors':
                this.router.navigateByUrl("distributors/tech-management");
                break;
              case 'doctor' :
                this.router.navigateByUrl("doctor/tech-management");
                break;
            }
          }, 1000);
        } else {
          this.snackBar.open(response.msg, '', {
            duration: 2000,
          });
        }
      });
    }
    }
  }

}
/**this is only for the Change Password modal in the edit page**/
@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})

export class Dialogtest {
  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<Dialogtest>,
    public fb: FormBuilder, public httpService: HttpServiceService, public cookie: CookieService,
    public activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.params_id = data.id;

    this.user_token = cookie.get('jwtToken');
    this.changePwdForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
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
