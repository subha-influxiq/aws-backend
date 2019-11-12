import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { nameValidator, npmValidator, zipValidator, phoneValidator, matchpwd } from './validators';
import { CommonFunction } from '../../../../class/common/common-function';
import { MatSnackBar } from '@angular/material';

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

  public message: any = "Submitted Successfully";
  // ============================== declarations =======================
  public docManageForm: FormGroup;
  public checkboxArray: any = ['Family Practice', 'General Practitioner', 'Primary Care',
    'Cardiology', 'Neurology', 'Internal Medicine', 'Endocrinology', 'Pain Management', 'Integrated', 'Others'];
  public dialogRef: any;
  public successMessage: any = "Data Submitted Successfully!!!";
  public taxo_array: any = [];
  public htmlText: any = { header: 'Add New Doctor', nav: 'Add Doctor', buttonText: 'Save' };
  public action: any;
  public defaultData: any;
  public condition: any;
  public states: any;
  public allCities: any;
  public cities: any;

  public user_token: any;
  public techData: any = [];
  public billerData: any = [];
  public techArray: any = [];
  public billerArray: any = [];
  public doctorOfficeData: any = [];
  public params_id: any;

  constructor(private formBuilder: FormBuilder, private http: HttpServiceService,
    private cookieService: CookieService, public dialog: MatDialog, private router: Router,
    public acivatedRoute: ActivatedRoute, public commonFunction: CommonFunction, public snackBar: MatSnackBar) {

    this.params_id = this.acivatedRoute.snapshot.params._id;
    if (this.params_id) {
      this.generateEditForm();
    } else {
      this.generateAddForm();
    }
    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.user_token = cookieService.get('jwtToken');
    this.getAllTechData();
    this.getAllBillerData();
    this.getAllDoctorOfficeData();
    this.acivatedRoute.params.subscribe(params => {
      if (params['_id'] != null) {
        this.action = "edit";
        this.condition = { id: params._id };
        this.acivatedRoute.data.subscribe(resolveData => {
          this.defaultData = resolveData.data.res[0];
        });
      } else {
        this.action = "add";
      }
    });
  }

  ngOnInit() {
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
      password: defaultValue.password,
      confirmpassword: defaultValue.password,
      phone: defaultValue.phone,
      practicename: defaultValue.practicename,
      taxonomies: defaultValue.taxonomies,
      npm: defaultValue.npm,
      fax: defaultValue.fax,
      address: defaultValue.address,
      city: defaultValue.city,
      state: defaultValue.state,
      tech: defaultValue.tech,
      biller: defaultValue.biller,
      doctorsOfficeName: defaultValue.doctorsOfficeName,
      zip: defaultValue.zip,
      status: defaultValue.status,
      taxo_list: defaultValue.taxo_list
    });
  }
  // ======================================================================================


  // =============================Form Generator=======================
  generateAddForm() {
    this.docManageForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)]],
      phone: ["", [Validators.required]],
      practicename: ['', [Validators.required]],
      npm: ['', [Validators.required]],
      address: ['', Validators.required],
      fax: ['', Validators.required],
      city: [''],
      state: [''],
      type: ['doctor'],
      zip: ['', [Validators.required]],
      status: ['',],
      tech: [''],
      biller: [''],
      doctorsOfficeName: [''],
      taxo_list: [],
      taxonomies: this.formBuilder.array([]),
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, {
      validators: this.matchpassword('password', 'confirmpassword')
    });
  }

  generateEditForm() {
    this.docManageForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)]],
      phone: ["", [Validators.required]],
      practicename: ['', [Validators.required]],
      npm: ['', [Validators.required]],
      address: ['', Validators.required],
      fax: ['', Validators.required],
      city: [''],
      state: [''],
      type: ['doctor'],
      zip: ['', [Validators.required]],
      status: ['',],
      tech: [''],
      biller: [''],
      doctorsOfficeName: [''],
      taxo_list: [],
      taxonomies: this.formBuilder.array([]),
    });
  }

  // ==================================================================
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
    this.dialogRef = this.dialog.open(ChangePasswordDoctorModal, {
      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }
  // =====================================================================================================


  backToManagePage() {
    this.router.navigateByUrl('admin/doctor-management');
  }

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

  getCity(event: any) {
    var val = event;
    this.cities = this.allCities[val];
  }

  getCityByName(stateName) {
    this.cities = this.allCities[stateName];
  }

  /**getting all the technician data**/
  getAllTechData() {
    var data = {
      "source": "users",
      "condition": {
        "type": "tech"
      },
      "token": this.user_token
    }
    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.techData = response.res;

      })
  }

  getAllDoctorOfficeData() {
    var data = {
      "source": "users",
      "condition": {
        "type": "doctor_office"
      },
      "token": this.user_token
    }
    this.http.httpViaPost('datalist', data)
      .subscribe(response => {
        this.doctorOfficeData = response.res;
      })
  }

  /**getting all the biller data**/
  getAllBillerData() {
    var data = {
      "source": "users",
      "condition": {
        "type": "biller"
      },
      "token": this.user_token
    }
    this.http.httpViaPost('datalist', data).subscribe(response => {
        this.billerData = response.res;
      });
  }


  // ============================Submit Function=======================
  onSubmit() {
    let x: any;
    for (x in this.docManageForm.controls) {
      this.docManageForm.controls[x].markAsTouched();
    }
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
      "source": "users",
      "data": Object.assign(this.docManageForm.value, this.condition),
      "sourceobj": ["tech", "biller"],
      "token": this.cookieService.get('jwtToken')

    };
    this.http.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
      if (response.status == "success") {
        let action = "ok";
        this.snackBar.open(this.message, action, {
          duration: 2000,
        });
      } else {
        alert("Some error occurred. Please try again");
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
      this.httpService.httpViaPost('changepassword', data).subscribe(response => {
        console.log("response", response);
      });
    }

  }
}
