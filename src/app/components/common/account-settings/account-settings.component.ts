import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl ,FormGroupDirective} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../class/common/common-function';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent implements OnInit {
  
  @ViewChild(FormGroupDirective,{static: false}) formDirective: FormGroupDirective;

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
    public httpService: HttpServiceService, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public commonFunction: CommonFunction) {

    /* Set header */
    this.headerFlag = this.activeRoute.snapshot.url[0].path;

    this.user_token = cookie.get('jwtToken');
    let allcookies: any;
    allcookies = cookie.getAll();
    
    this.cookiesData = JSON.parse(allcookies.user_details);
    this.cookies_id = this.cookiesData._id;

    /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

    this.allStateCityData();

    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');

    var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.AccountSettingsForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneno: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
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
    this.AccountSettingsForm.controls['phoneno'].patchValue(this.cookiesData.phone);
    this.AccountSettingsForm.controls['zip'].patchValue(this.cookiesData.zip);
    this.AccountSettingsForm.controls['address'].patchValue(this.cookiesData.address);
    this.AccountSettingsForm.controls['state'].patchValue(this.cookiesData.state);
    this.AccountSettingsForm.controls['city'].patchValue(this.cookiesData.city);
  }

  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.httpService.getSiteSettingData("./assets/data-set/state.json").subscribe(response => {
      this.states = response;
      this.SetValueForm();
    });

    this.httpService.getSiteSettingData("./assets/data-set/city.json").subscribe(response => {
      this.allCities = response;
      this.SetValueForm();
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
        "source": "data_pece",
        "data": {
          id: this.cookies_id,
          firstname: this.AccountSettingsForm.value.firstname,
          lastname: this.AccountSettingsForm.value.lastname,
          phoneno: this.AccountSettingsForm.value.phoneno,
          date: this.AccountSettingsForm.value.data,
          zip: this.AccountSettingsForm.value.zip,
          address: this.AccountSettingsForm.value.address,
          city: this.AccountSettingsForm.value.city,
          state: this.AccountSettingsForm.value.state,
        },
        "token": this.user_token
      }
      this.httpService.httpViaPost('addorupdatedata', data).subscribe(response => {
          var userDetailsCookie: any = JSON.parse(this.cookie.get('user_details'));
          var type: any = userDetailsCookie.type;
          this.cookie.delete('user_details');

          userDetailsCookie.firstname = this.AccountSettingsForm.value.firstname;
          userDetailsCookie.lastname = this.AccountSettingsForm.value.lastname;
          userDetailsCookie = JSON.stringify(userDetailsCookie);
          this.loader = false;
          let action: any = "Ok";
          this.snackBar.open(this.message, action, {
            duration: 1000,
          });

          setTimeout(() => {
            this.cookie.set('user_details', userDetailsCookie);
          }, 1000);

          setTimeout(() => {
            this.router.navigateByUrl(type + '/dashboard');
          }, 3000);
        })
    }

  }

}
