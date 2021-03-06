import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  public UserManagementAddEditForm: FormGroup;
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
    public cookie: CookieService) {
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.allStateCityData();
    this.user_token = cookie.get('jwtToken');
    this.params_id = this.activeRoute.snapshot.params._id;

    this.UserManagementAddEditForm = this.fb.group({
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
    })

  }

  ngOnInit() {
    if (this.params_id) {
      this.buttonText = "Update";
      this.getResolveData();
    }
  }
  /* Get resolve data */
  getResolveData() {
    this.activeRoute.data.forEach((data) => {
      this.usersData = data.UserData.res;
      let userDetails: any;
      userDetails = data.UserData.res;
      this.UserManagementAddEditForm.controls['firstname'].patchValue(userDetails[0].firstname);
      this.UserManagementAddEditForm.controls['lastname'].patchValue(userDetails[0].lastname);
      this.UserManagementAddEditForm.controls['email'].patchValue(userDetails[0].email);
      this.UserManagementAddEditForm.controls['phoneno'].patchValue(userDetails[0].phoneno);
      this.UserManagementAddEditForm.controls['address'].patchValue(userDetails[0].address);
      this.UserManagementAddEditForm.controls['city'].patchValue(userDetails[0].city);
      this.UserManagementAddEditForm.controls['state'].patchValue(userDetails[0].state);
      this.UserManagementAddEditForm.controls['zip'].patchValue(userDetails[0].zip);
      this.UserManagementAddEditForm.controls['status'].patchValue(userDetails[0].status);
    })
  }
  /**for validation purpose**/
  inputUntouch(form: any, val: any) {

    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  /**resetting the form start here **/
  ResetAddForm() {

    this.UserManagementAddEditForm.reset();
  }
  /**resetting the form start here **/

  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.states = response;
      this.getResolveData();
    });

    this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.allCities = response;
      this.getResolveData();
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event) {
    var val = event;
    this.cities = this.allCities[val];
  }

  UserManagementAddFormFormSubmit() {
    let x: any;
    for (x in this.UserManagementAddEditForm.controls) {
      this.UserManagementAddEditForm.controls[x].markAsTouched();
    }
    if (this.UserManagementAddEditForm.valid) {
      if (this.UserManagementAddEditForm.value.status)
        this.UserManagementAddEditForm.value.status = parseInt("1");
      else
        this.UserManagementAddEditForm.value.status = parseInt("0");
      var data: any;
      if (this.params_id) {
        data = {
          "source": "user_management",
          "data": {
            id: this.params_id,
            firstname: this.UserManagementAddEditForm.value.firstname,
            lastname: this.UserManagementAddEditForm.value.lastname,
            phoneno: this.UserManagementAddEditForm.value.phoneno,
            email: this.UserManagementAddEditForm.value.email,
            address: this.UserManagementAddEditForm.value.address,
            city: this.UserManagementAddEditForm.value.city,
            state: this.UserManagementAddEditForm.value.state,
            zip: this.UserManagementAddEditForm.value.zip,
            status: this.UserManagementAddEditForm.value.status
          },
          "token": this.user_token
        };

      } else {
        data = {
          "source": "user_management",
          "data": this.UserManagementAddEditForm.value,
          "token": this.user_token
        }
      }

    }
    this.httpService.httpViaPost("addorupdatedata", data)
      .subscribe(res => {
        this.ResetAddForm();
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard/tech');
        }, 100);

      }
      )


  }

}
