import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../services/http-service.service';
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
  public buttonText: any = "Save";
  public message: any = "Submitted Successfully";
  public states: any;
  public allCities: any;
  public cities: any;

  constructor(public fb: FormBuilder, private datePipe: DatePipe,
    public httpService: HttpServiceService, public cookie: CookieService, public router: Router, public snackBar: MatSnackBar, public activeRoute: ActivatedRoute) {
    this.user_token = cookie.get('jwtToken');
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
      status: ['', Validators.required],
      type:['',Validators.required],
      password: [],
      confirmpassword: [],
    }, { validator: this.machpassword('password', 'confirmpassword') })
  }

  ngOnInit() {
  }

  machpassword(passwordkye: string, confirmpasswordkye: string) {
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
  ResetForm() {

  }
  AccountSettingsFormSubmit() {

  }

}
