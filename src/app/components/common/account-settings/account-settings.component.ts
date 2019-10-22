import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent implements OnInit {

  date = new FormControl(new Date());
  public ddmmyy: any;
  serializedDate = new FormControl((new Date()).toISOString());
  public AccountSettingsForm: FormGroup;
  public user_token: any;
  public params_id: any;
  public message: any = "Updated Successfully";
  public states: any;
  public allCities: any;
  public cities: any;
  public cookiesData: any;
  public cookies_id: any;
  public loader: any = false;
  public headerFlag: string = null;

  constructor(public fb: FormBuilder, private datePipe: DatePipe,
    public httpService: HttpServiceService, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute) {
      /* Set header */
      console.log('>>>>---->', this.activeRoute.snapshot.url[0].path);
      this.headerFlag = this.activeRoute.snapshot.url[0].path;

    this.user_token = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();
    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;

    this.allStateCityData();

    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');

    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.AccountSettingsForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phoneno: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      date: [dateformat],
      type: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.SetValueForm();
  }
  /**for validation purpose**/
  inputUntouch(form: any, val: any) {

    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  SetValueForm() {
    setTimeout(() => {
      this.getCityByName(this.cookiesData.state);
    }, 400);
    this.AccountSettingsForm.controls['firstname'].patchValue(this.cookiesData.firstname);
    this.AccountSettingsForm.controls['lastname'].patchValue(this.cookiesData.lastname);
    this.AccountSettingsForm.controls['email'].patchValue(this.cookiesData.email);
    this.AccountSettingsForm.controls['phoneno'].patchValue(this.cookiesData.phone);
    this.AccountSettingsForm.controls['zip'].patchValue(this.cookiesData.zip);
    this.AccountSettingsForm.controls['address'].patchValue(this.cookiesData.address);
    this.AccountSettingsForm.controls['type'].patchValue(this.cookiesData.type);
    this.AccountSettingsForm.controls['state'].patchValue(this.cookiesData.state);
    this.AccountSettingsForm.controls['city'].patchValue(this.cookiesData.city);

  }

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

  CancelRedirectToDashboard() {
    this.router.navigateByUrl('/admin/dashboard');
  }
  
  AccountSettingsFormSubmit() {
    this.loader = true;

    let x: any;
    for (x in this.AccountSettingsForm.controls) {
      this.AccountSettingsForm.controls[x].markAsTouched();
    }
    if (this.AccountSettingsForm.valid) {
      var data: any;
      data = {
        "source": "users",
        "data": {
          id: this.cookies_id,
          firstname: this.AccountSettingsForm.value.firstname,
          lastname: this.AccountSettingsForm.value.lastname,
          phoneno: this.AccountSettingsForm.value.phoneno,
          email: this.AccountSettingsForm.value.email,
          date: this.AccountSettingsForm.value.data,
          zip: this.AccountSettingsForm.value.zip,
          address: this.AccountSettingsForm.value.address,
          city: this.AccountSettingsForm.value.city,
          state: this.AccountSettingsForm.value.state,
          type: this.AccountSettingsForm.value.type,
        },
        "token": this.user_token
      }
      this.httpService.httpViaPost('addorupdatedata', data)
        .subscribe(response => {
          this.loader = false;
          let action: any = "Ok"
          this.snackBar.open(this.message, action, {
            duration: 1000,
          })
          setTimeout(() => {
            this.CancelRedirectToDashboard();
          }, 1200);
        })
    }

  }

}
