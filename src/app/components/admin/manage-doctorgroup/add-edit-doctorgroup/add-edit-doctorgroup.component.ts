import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatCalendarBody } from '@angular/material';
import * as _ from "lodash";
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
  id: any;
}


@Component({
  selector: 'app-add-edit-doctorgroup',
  templateUrl: './add-edit-doctorgroup.component.html',
  styleUrls: ['./add-edit-doctorgroup.component.css']
})
export class AddEditDoctorgroupComponent implements OnInit {

  public doctorgroupManagementAddEditForm: FormGroup;
  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New Doctor Group', 
    nav: 'Add Doctor Group', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    doctorOfficeData: [],
    techData: [],
    billerData: [],
    states: "",
    allCities: "",
    cities: "",
    taxonomies: ""
  };
  public dialogRef: any;

  constructor(private formBuilder: FormBuilder, private http: HttpServiceService,
    private cookieService: CookieService, public dialog: MatDialog, private router: Router,
    public acivatedRoute: ActivatedRoute, public snackBar: MatSnackBar) { 
      this.htmlText.userData = this.cookieService.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);
    this.allStateCityData();
    if (this.acivatedRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');
      // this.getAllData();

      this.htmlText.message     = "";
      this.htmlText.header      = 'Edit Doctor Group Record';
      this.htmlText.nav         = 'Edit Group Doctor';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.acivatedRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }

  }

  ngOnInit() {
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:                     ['', []],
      groupname:              ['', [ Validators.required, Validators.maxLength(50) ]],
      email:                  ['', [ Validators.required, Validators.email, Validators.maxLength(100) ]],
      phone:                  ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      address:                ['', [ Validators.required, Validators.maxLength(200) ]],
      zip:                    ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ]],
      city:                   ['', [ Validators.required ]],
      state:                  ['', [ Validators.required ]],
      user_type:              ['doctor_group', []],
      status:                 ['', []],
      password:               ['', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ]],
      confirmpassword:        ['', [ Validators.required ]]
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    // diagnostic_admin
    if(this.htmlText.userData.user_details.user_type == 'diagnostic_admin') {
      validateRule["tech_id"] = ['', []];
    }

    switch(flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.doctorgroupManagementAddEditForm = this.formBuilder.group(validateRule);

        this.acivatedRoute.data.forEach((data) => {
          setTimeout(() => {
            this.getCity(doctorgrouoDetails[0].state);
          }, 1000);
          let doctorgrouoDetails: any = data.data.res;
          this.doctorgroupManagementAddEditForm.controls['id'].patchValue(doctorgrouoDetails[0]._id);
          this.doctorgroupManagementAddEditForm.controls['groupname'].patchValue(doctorgrouoDetails[0].groupname);
          this.doctorgroupManagementAddEditForm.controls['email'].patchValue(doctorgrouoDetails[0].email);
          this.doctorgroupManagementAddEditForm.controls['phone'].patchValue(doctorgrouoDetails[0].phone);
          this.doctorgroupManagementAddEditForm.controls['address'].patchValue(doctorgrouoDetails[0].address);
          this.doctorgroupManagementAddEditForm.controls['zip'].patchValue(doctorgrouoDetails[0].zip);
          this.doctorgroupManagementAddEditForm.controls['city'].patchValue(doctorgrouoDetails[0].city);
          this.doctorgroupManagementAddEditForm.controls['state'].patchValue(doctorgrouoDetails[0].state);

          // diagnostic_admin
          if(this.htmlText.userData.user_details.user_type == 'diagnostic_admin') {
            this.doctorgroupManagementAddEditForm.controls['tech_id'].patchValue(doctorgrouoDetails[0].tech_id);
          }
          //this.doctorgroupManagementAddEditForm.controls['biller_id'].patchValue(doctorgrouoDetails[0].biller_details);
          //this.doctorgroupManagementAddEditForm.controls['doctors_office_id'].patchValue(doctorgrouoDetails[0].doctors_office_details);
          this.doctorgroupManagementAddEditForm.controls['status'].patchValue(doctorgrouoDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.doctorgroupManagementAddEditForm = this.formBuilder.group(validateRule, passwordRule);
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
  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.http.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.htmlText.states = response;
    });

    this.http.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.htmlText.allCities = response;
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event: any) {
    var val = event;
    this.htmlText.cities = this.htmlText.allCities[val];
  }

  getCityByName(stateName) {
    this.htmlText.cities = this.htmlText.allCities[stateName];
  }


  doctorgroupManagementAddEditFormSubmit() {
    for (let x in this.doctorgroupManagementAddEditForm.controls) {
      this.doctorgroupManagementAddEditForm.controls[x].markAsTouched();
    }

    /* stop here if form is invalid */
    if (this.doctorgroupManagementAddEditForm.valid) {
      delete this.doctorgroupManagementAddEditForm.value.confirmpassword;

      if (this.doctorgroupManagementAddEditForm.value.status) {
        this.doctorgroupManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.doctorgroupManagementAddEditForm.value.status = parseInt("0");;
      }

      /* start process to submited data */
      var postData: any = {
        "source": "data_pece",
        "data": this.doctorgroupManagementAddEditForm.value,
        "domainurl": environment.siteBaseUrl + 'reset-password',
        //"sourceobjArray": ["tech_id", "biller_id"],
        "token": this.cookieService.get('jwtToken')
      };

      if(this.htmlText.userData.user_details.user_type == 'diagnostic_admin') {
        postData.data["diagnostic_admin_id"] = this.htmlText.userData.user_details._id;
        postData["sourceobj"] = ["diagnostic_admin_id"];
        postData["sourceobjArray"] = ["tech_id"];
      }

      this.http.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
        if (response.status == "success") {
          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          setTimeout(() => {
            switch(this.htmlText.userData.user_details.user_type) {
              case 'diagnostic_admin':
                this.router.navigateByUrl("admin/doctor-management/group");
                break;
              case 'admin':
                this.router.navigateByUrl("admin/doctor-management/group");
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
