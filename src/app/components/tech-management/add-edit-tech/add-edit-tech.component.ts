import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-edit-tech',
  templateUrl: './add-edit-tech.component.html',
  styleUrls: ['./add-edit-tech.component.css']
})
export class AddEditTechComponent implements OnInit {
  public TechManagementAddEditForm: FormGroup;
  public message: any = "Submitted Successfully";

  date = new FormControl(new Date());
  public ddmmyy: any;
  serializedDate = new FormControl((new Date()).toISOString());
  public usersData: any = [];
  public states: any;
  public allCities: any;
  public cities: any;
  public params_id: any;
  public buttonText: any = "Submit";
  public user_token: any;;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snackBar: MatSnackBar) {
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.allStateCityData();
    this.user_token = cookie.get('jwtToken');
    this.params_id = this.activeRoute.snapshot.params._id;

    this.TechManagementAddEditForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phoneno: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      date: [dateformat],
      status: ['', Validators.required],
      password: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, { validators: this.matchpassword('password', 'confirmpassword') })
  }

  ngOnInit() {
    if (this.params_id) {
      this.buttonText = "Update";
      this.getResolveData();
    }
  }
  getResolveData() {
    this.activeRoute.data.forEach((data) => {
      this.usersData = data.techData.res;
      let techDetails: any;
      techDetails = data.techData.res;
      console.log(techDetails);
      this.TechManagementAddEditForm.controls['firstname'].patchValue(techDetails[0].firstname);
      this.TechManagementAddEditForm.controls['lastname'].patchValue(techDetails[0].lastname);
      this.TechManagementAddEditForm.controls['email'].patchValue(techDetails[0].email);
      this.TechManagementAddEditForm.controls['phoneno'].patchValue(techDetails[0].phoneno);
      this.TechManagementAddEditForm.controls['address'].patchValue(techDetails[0].address);
      this.TechManagementAddEditForm.controls['city'].patchValue(techDetails[0].city);
      this.TechManagementAddEditForm.controls['state'].patchValue(techDetails[0].state);
      this.TechManagementAddEditForm.controls['zip'].patchValue(techDetails[0].zip);
      this.TechManagementAddEditForm.controls['status'].patchValue(techDetails[0].status);

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

  /**resetting the form start here **/
  ResetAddForm() {

    this.TechManagementAddEditForm.reset();
  }
  /**resetting the form start here **/
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
  TechManagementAddFormFormSubmit() {
    console.log(this.TechManagementAddEditForm.value);
    let x: any;
    for (x in this.TechManagementAddEditForm.controls) {
      this.TechManagementAddEditForm.controls[x].markAsTouched();
    }
    if (this.TechManagementAddEditForm.valid) {
      if (this.TechManagementAddEditForm.value.status)
        this.TechManagementAddEditForm.value.status = parseInt("1");
      else
        this.TechManagementAddEditForm.value.status = parseInt("0");
      delete this.TechManagementAddEditForm.value.confirmpassword;
      var data: any;
      if(this.params_id){
        data = {
          "source": "tech_management",
          "data": {
            id: this.params_id,
            firstname: this.TechManagementAddEditForm.value.firstname,
            lastname: this.TechManagementAddEditForm.value.lastname,
            phoneno: this.TechManagementAddEditForm.value.phoneno,
            email: this.TechManagementAddEditForm.value.email,
            address: this.TechManagementAddEditForm.value.address,
            city: this.TechManagementAddEditForm.value.city,
            state: this.TechManagementAddEditForm.value.state,
            zip: this.TechManagementAddEditForm.value.zip,
            status: this.TechManagementAddEditForm.value.status,

          },
          "token": this.user_token
        };


      }else{
        data = {
          "source": "tech_management",
          "data": this.TechManagementAddEditForm.value,
          "token": this.user_token
        }

      }
     
      this.httpService.httpViaPost("addorupdatedata", data)
        .subscribe(response => {
          let action = "ok";
          this.snackBar.open(this.message, action, {
            duration: 2000,
          });
          this.ResetAddForm();
          setTimeout(() => {
            this.router.navigateByUrl("/tech-management/list")
          }, 2200);

        })


    }
  }


}
