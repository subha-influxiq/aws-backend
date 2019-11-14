import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';

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

  constructor(public cookieService: CookieService, private formBuilder: FormBuilder,
    private http: HttpServiceService) {

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
  }

  generateForm() {
    this.accountForm = this.formBuilder.group({
      id: [this.userData.id],
      accesscode: [],
      address: [],
      centername: [],
      city: [],
      date: [],
      email: [{ value: 'someValue', disabled: true }],
      phone: [],
      status: [],
      zip: []
    });
  }
  
  setDefaultValue(defaultValue) {
    this.accountForm.patchValue({
      accesscode: defaultValue.accesscode,
      address: defaultValue.address,
      centername: defaultValue.centerName,
      city: defaultValue.city,
      date: defaultValue.date,
      email: defaultValue.email,
      phone: defaultValue.phone,
      status: defaultValue.status,
      zip: defaultValue.zip
    });
  }

  onSubmit() {
    let postData: any = {
      'source': 'users',
      'data': Object.assign(this.accountForm.value),
      'token': this.jwtToken
    }

    this.http.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {
      console.log(response.status);
    });
  }

}
