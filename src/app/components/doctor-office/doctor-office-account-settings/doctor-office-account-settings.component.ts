import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, Route } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-doctor-office-account-settings',
  templateUrl: './doctor-office-account-settings.component.html',
  styleUrls: ['./doctor-office-account-settings.component.css']
})
export class DoctorOfficeAccountSettingsComponent implements OnInit {

  // ==========declarations==============
  public userData: any;
  public jwtToken: any;
  public accountForm: FormGroup;
  public cities:any;
  public states:any;
  public message:string = "Updated Successfuly!!!";
  loader:boolean=false;
  allCities:any;

  constructor(public cookieService: CookieService, private formBuilder: FormBuilder,
    private http: HttpServiceService ,private router : Router , private snackBar : MatSnackBar) {

    /*Getting the user data from the cookie*/
    let allData: any = cookieService.getAll();
    this.jwtToken = cookieService.get('jwtToken');
    this.userData = JSON.parse(allData.user_details);
  }

  ngOnInit() {
    //generating the form
    this.generateForm();

    //setting the default value
    this.setDefaultValue(this.userData);

    //getting the citites
     this.allStateCityData();

     
     setTimeout(() => {
      this.getCityByName(this.userData.state);
    }, 2000);
  }

  generateForm() {
    this.accountForm = this.formBuilder.group({
      id: [this.userData._id],
      address: ['', Validators.required],
      centername: ['', Validators.required],
      state:[],
      city: ['', Validators.required],
      date: [],
      email: [{ value: 'someValue', disabled: true }],
      phone: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  setDefaultValue(defaultValue) {
    this.accountForm.patchValue({
      address: defaultValue.address,
      centername: defaultValue.centerName,
      state:defaultValue.state,
      city: defaultValue.city,
      date: defaultValue.date,
      email: defaultValue.email,
      phone: defaultValue.phone,
      status: defaultValue.status,
      zip: defaultValue.zip
    });  
  }

  onSubmit() {
   this.loader=true;
    if (this.accountForm.invalid)
      return;
    else {

      let postData: any = {
        'source': 'users',
        'data': Object.assign(this.accountForm.value),
        'token': this.jwtToken
      }

      this.http.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
        if (response.status == 'success') { 
          var userDetailsCookie: any = JSON.parse(this.cookieService.get('user_details'));
          var type: any = userDetailsCookie.type;
          this.cookieService.delete('user_details');     
          // -------------------------------------
          userDetailsCookie.address =   this.accountForm.value.address;
          // -------------------------------------
          
          userDetailsCookie = JSON.stringify(userDetailsCookie);

          console.log("-->",userDetailsCookie);
          this.loader = false;
          let action: any = "Ok";
          this.snackBar.open(this.message, action, {
            duration: 1000,
          });

          setTimeout(() => {
            // this.cookieService.set('user_details', userDetailsCookie);
          }, 1000);

          setTimeout(() => {
            this.router.navigateByUrl('/doctor-office/dashboard');
          }, 3000);         
        }
        else{
          this.snackBar.open(response.status, "OK", {
            duration: 1500
          });   
        }

      });
    }
  }


  cancelRedirectToDashboard() {
     this.router.navigateByUrl('doctor-office/dashboard');
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
getCity(event) {
  var val = event;
  this.cities = this.allCities[val];
}

getCityByName(stateName) {
  this.cities = this.allCities[stateName];
}


}
