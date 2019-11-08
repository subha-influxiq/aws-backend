import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
@Component({
  selector: 'app-add-edit-doctor-ofc',
  templateUrl: './add-edit-doctor-ofc.component.html',
  styleUrls: ['./add-edit-doctor-ofc.component.css']
})
export class AddEditDoctorOfcComponent implements OnInit {
  public message: any = "Submitted Successfully";

  public htmlText: any = { header: 'Add Doctor office', nav: 'Add Doctor office', buttonText: 'Save' };
  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  date = new FormControl(new Date());
  public ddmmyy: any;
  serializedDate = new FormControl((new Date()).toISOString());
  public doctorOfficeAddEditForm: FormGroup;
  public user_token: any;
  public params_id: any;
  public usersData: any = [];
  public states: any;
  public allCities: any;
  public cities: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snackBar: MatSnackBar, public commonFunction: CommonFunction,
    public dialog: MatDialog) {
    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.allStateCityData();
    this.user_token = cookie.get('jwtToken');
    this.params_id = this.activeRoute.snapshot.params._id;
    this.doctorOfficeAddEditForm = this.fb.group({
      centerName: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      date: [dateformat],
      status: [''],
      type: ['doctor_office'],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, { validators: this.matchpassword('password', 'confirmpassword') })
  }

  ngOnInit() {
    if (this.params_id) {
      this.htmlText.header = 'Edit Doctors Office Record';
      this.htmlText.nav = 'Edit Doctors Office';
      this.htmlText.buttonText = 'Update';
      this.getResolveData();
    }
  }
  getResolveData() {
    this.activeRoute.data.forEach((data) => {
      this.usersData = data.data.res;
      let techDetails: any;
      techDetails = data.data.res;
      setTimeout(() => {
        this.getCityByName(techDetails[0].state);
      }, 400);
      this.doctorOfficeAddEditForm.controls['centerName'].patchValue(techDetails[0].centerName);
      this.doctorOfficeAddEditForm.controls['email'].patchValue(techDetails[0].email);
      this.doctorOfficeAddEditForm.controls['phone'].patchValue(techDetails[0].phone);
      this.doctorOfficeAddEditForm.controls['address'].patchValue(techDetails[0].address);
      this.doctorOfficeAddEditForm.controls['city'].patchValue(techDetails[0].city);
      this.doctorOfficeAddEditForm.controls['state'].patchValue(techDetails[0].state);
      this.doctorOfficeAddEditForm.controls['zip'].patchValue(techDetails[0].zip);
      this.doctorOfficeAddEditForm.controls['status'].patchValue(techDetails[0].status);

    })
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
  /**for validation purpose**/
  inputUntouch(form: any, val: any) {

    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/
  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.states = response;
    });

    this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.allCities = response;
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event) {
    var val = event;
    this.cities = this.allCities[val];
  }
  getCityByName(stateName) {
    this.cities = this.allCities[stateName];
  }

  doctorOfficeAddEditFormFormSubmit() {
    let x: any;
    for (x in this.doctorOfficeAddEditForm.controls) {
      this.doctorOfficeAddEditForm.controls[x].markAsTouched();
    }
     if(this.params_id){
      delete this.doctorOfficeAddEditForm.value.password;
      delete this.doctorOfficeAddEditForm.value.confirmpassword;
     }
    if (this.doctorOfficeAddEditForm.valid) {
      if (this.doctorOfficeAddEditForm.value.status)
        this.doctorOfficeAddEditForm.value.status = parseInt("1");
      else
        this.doctorOfficeAddEditForm.value.status = parseInt("0");
        
      delete this.doctorOfficeAddEditForm.value.confirmpassword;  
      
      var data: any;
      if (this.params_id) {
        data = {
          "source": "users",
          "data": {
            id: this.params_id,
            centerName: this.doctorOfficeAddEditForm.value.centerName,
            phone: this.doctorOfficeAddEditForm.value.phone,
            email: this.doctorOfficeAddEditForm.value.email,
            address: this.doctorOfficeAddEditForm.value.address,
            city: this.doctorOfficeAddEditForm.value.city,
            state: this.doctorOfficeAddEditForm.value.state,
            zip: this.doctorOfficeAddEditForm.value.zip,
            status: this.doctorOfficeAddEditForm.value.status,
          },
          "token": this.user_token
        };
     } else {
        data = {
          "source": "users",
          "data": this.doctorOfficeAddEditForm.value,
          "token": this.user_token
        }
      }
      this.httpService.httpViaPost("addorupdatedata", data)
        .subscribe(response => {
          let action = "ok";
          this.snackBar.open(this.message, action, {
            duration: 2000,
          });
          this.formDirective.resetForm();
          setTimeout(() => {
            this.router.navigateByUrl("/admin/doctor-office-management");
          }, 2200);

        })
    }else{
      alert("error");
    }
  }
}
