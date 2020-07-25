import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import * as _ from "lodash";
import { environment } from '../../../../environments/environment';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';

@Component({
  selector: 'app-add-new-doctor',
  templateUrl: './add-new-doctor.component.html',
  styleUrls: ['./add-new-doctor.component.css']
})
export class AddNewDoctorComponent implements OnInit {

  public doctorManagementAddEditForm: FormGroup;
  public params_id: any='';
  public htmlText: any = {
    userData: "",
    header: 'Add New Doctor',
    nav: 'Add Doctor',
    buttonText: 'Save',
    message: "Submitted Successfully",
    doctorOfficeData: [],
    techData: [],
    parent_type: [
      { name: "Distributor", value: "distributor" },
      { name: "DiagnosticAdmin", value: "diagnostic_admin" },
      { name: "DoctorGroup", value: "doctor_group" }
    ],
    parent_id: [],
    cpt_amount : [
      { value: 12 },
      { value: 13 },
      { value: 14 },
      { value: 15 }
    ],
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

    // Generate Add Edit Form
    this.generateAddEditForm();
  }

  ngOnInit() {
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:                   [ '', [] ],
      firstname:            [ '', [ Validators.required, Validators.maxLength(50) ] ],
      lastname:             [ '', [ Validators.required, Validators.maxLength(50) ] ],
      email:                [ '', [ Validators.required, Validators.email, Validators.maxLength(100) ] ],
      phone:                [ '', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ] ],
      fax:                  [ '', [ Validators.required ] ],
      practice_name:        [ '', [ Validators.required ] ],
      npi:                  [ '', [ Validators.required ] ],
      address:              [ '', [ Validators.required, Validators.maxLength(200) ] ],
      zip:                  [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(18) ] ],
      city:                 [ '', [ Validators.required ] ],
      state:                [ '', [ Validators.required ] ],
      user_type:            [ 'doctor' ],
      parent_type:          [ 'admin' ],
      parent_id:            [ '', [] ],
      cpt_validate_amount:  [ 12, [] ],
      tech_id:              [ '', [] ],
      biller_id:            [ '', [] ],
      doctors_office_id:    [ '', [] ],
      taxo_list:            [ '', [] ],
      status:               [ '', [] ],
      password:             [ '', [ Validators.required, Validators.maxLength(16), Validators.minLength(6) ] ],
      confirmpassword:      [ '', [ Validators.required ] ]
    };
    let passwordRule: any = { validators: this.matchpassword('password', 'confirmpassword') };

    switch (flag) {
      case 'edit':
        delete validateRule.password;
        delete validateRule.confirmpassword;

        this.doctorManagementAddEditForm = this.formBuilder.group(validateRule);

        this.acivatedRoute.data.subscribe(resolveData => {
          this.htmlText.techData = resolveData.data.data.tech_data;
          this.htmlText.billerData = resolveData.data.data.biller_data;
          this.htmlText.doctorOfficeData = resolveData.data.data.doctor_office_data;

          let doctorDetails: any = resolveData.data.data.doctor_data;
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
          this.doctorManagementAddEditForm.controls['cpt_validate_amount'].patchValue(doctorDetails[0].cpt_validate_amount);
          this.doctorManagementAddEditForm.controls['tech_id'].patchValue(doctorDetails[0].tech_id);
          this.doctorManagementAddEditForm.controls['biller_id'].patchValue(doctorDetails[0].biller_id);
          this.doctorManagementAddEditForm.controls['doctors_office_id'].patchValue(doctorDetails[0].doctors_office_id);
          this.doctorManagementAddEditForm.controls['taxo_list'].patchValue(doctorDetails[0].taxo_list);
          this.doctorManagementAddEditForm.controls['status'].patchValue(doctorDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;

        this.acivatedRoute.data.subscribe(resolveData => {
          this.htmlText.techData = resolveData.data.data.tech_data;
          this.htmlText.billerData = resolveData.data.data.biller_data;
          this.htmlText.doctorOfficeData = resolveData.data.data.doctor_office_data;
        });

        this.doctorManagementAddEditForm = this.formBuilder.group(validateRule, passwordRule);
        break;
    }

    // Call function to get all City, State and Taxonomies
    this.allStateCityData();
  }

  // Fetch All City, State and Taxonomies
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

  // Confirm Password match function
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

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  
  getCity(event: any) {
    this.htmlText.cities = this.htmlText.allCities[event];
  }

  getCityByName(stateName) {
    this.htmlText.cities = this.htmlText.allCities[stateName];
  }

  doctorManagementAddEditFormSubmit() {
    console.log("Data: ", this.htmlText.user_details);
    for (let x in this.doctorManagementAddEditForm.controls) {
      this.doctorManagementAddEditForm.controls[x].markAsTouched();
    }

    /* stop here if form is invalid */
    if (this.doctorManagementAddEditForm.valid) {
      delete this.doctorManagementAddEditForm.value.confirmpassword;

      if (this.doctorManagementAddEditForm.value.status) {
        this.doctorManagementAddEditForm.controls['status'].patchValue(parseInt("1"));
      } else {
        this.doctorManagementAddEditForm.controls['status'].patchValue(parseInt("0"));
      }

      if(this.doctorManagementAddEditForm.value.cpt_validate_amount) {
        this.doctorManagementAddEditForm.controls['cpt_validate_amount'].patchValue(parseInt(this.doctorManagementAddEditForm.value.cpt_validate_amount));
      }

      /* start process to submited data */
      var postData: any = {
        "source": "data_pece",
        "data": this.doctorManagementAddEditForm.value,
        "sourceobjArray": [
          "tech_id",
          "biller_id",
          "doctors_office_id"
        ],
        "sourceobj":[
          "parent_id"
        ],
        "token": this.cookieService.get('jwtToken')
      };

      if(this.htmlText.user_details.parent_type != 'admin') {
        postData.data.parent_id = this.htmlText.user_details.parent_id;
        postData.data.parent_type = this.htmlText.user_details.parent_type;
      } else {
        postData.data.parent_id = this.htmlText.user_details._id;
        postData.data.parent_type = this.htmlText.user_details.parent_type;
      }

      this.http.httpViaPostbyApi1('addorupdatedata', postData).subscribe((response: any) => {
        if (response.status == "success") {
          let modalData1: any = {
            panelClass: 'bulkupload-dialog',
            data: {
              header: "Message",
              message: "Successfully Saved.",
              button1: { text: "" },
              button2: { text: "OK" },
            }
          }
          var dialogRef = this.dialog.open(DialogBoxComponent, modalData1);

          dialogRef.afterClosed().subscribe(result => {
            switch(result) {
              case "OK":
                dialogRef.close();
                this.router.navigateByUrl("sales-person/dashboard");
                break;
            }
          });
        } else {
          this.snackBar.open(response.msg, '', {
            duration: 2000,
          });
        }
      }, (error) => {
        this.snackBar.open("An error occurred. Please try again.", '', {
          duration: 2000,
        });
      });
    }
  }

  getParentData(id: any = '') {
    var billerData = id;
    this.selectionChangeValue = billerData;
    if ((billerData == 'DiagnosticAdmin') || (billerData == "diagnostic_admin")) {
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "diagnostic_admin"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    if ((billerData == 'Distributor') || (billerData == 'distributor')) {
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "distributors"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    if ((billerData == 'DoctorGroup') || (billerData == "doctor_group")) {
      var data = {
        "source": "data_pece",
        "condition": {
          "user_type": "doctor_group"
        },
        "token": this.htmlText.userData.jwtToken,
      }
    }

    this.http.httpViaPost('datalist', data).subscribe(response => {
      this.htmlText.parent_id = response.res;
    });
  }

}
