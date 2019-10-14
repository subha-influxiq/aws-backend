import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';
import { DatePipe } from '@angular/common';

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

  public states: any;
  public allCities: any;
  public cities: any;

  /**set data for edit start here**/

  /**set data for edit start here**/
  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe) {
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.allStateCityData();
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
    });

    this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.allCities = response;
    });
  }
  /**for getting all states & cities  function end here**/

  getCity(event) {
    console.log(event);
    var val = event;
    this.cities = this.allCities[val];
  }

  UserManagementAddFormFormSubmit() {
    //console.log(this.UserManagementAddEditForm.value);
    let x: any;
    for (x in this.UserManagementAddEditForm.controls) {
      this.UserManagementAddEditForm.controls[x].markAsTouched();
    }
    if (this.UserManagementAddEditForm.valid) {
      if (this.UserManagementAddEditForm.value.status)
        this.UserManagementAddEditForm.value.status = parseInt("1");
      else
        this.UserManagementAddEditForm.value.status = parseInt("0");
    }
    var data = {
      "source": "user_management",
      "data": this.UserManagementAddEditForm.value,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzExMTYzNDMsImlhdCI6MTU3MTAyOTk0M30.m7kRTmIwvk-G0qYmr0zJ9qXoFJea8fBwnIOt8d7n3bc"
    }

    if (this.UserManagementAddEditForm.valid) {
      this.httpService.httpViaPost("addorupdatedata", data)
        .subscribe(res => {
          console.log(res);
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/tech');
          }, 100);

        })
    } else {
      alert("error occured");
    }

  }

}
