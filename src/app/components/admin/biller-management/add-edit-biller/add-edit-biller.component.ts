import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,FormGroupDirective } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpServiceService } from '../../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

export interface DialogData {
  message: string;
  id: any;
}

@Component({
  selector: 'app-add-edit-biller',
  templateUrl: './add-edit-biller.component.html',
  styleUrls: ['./add-edit-biller.component.css']
})

export class AddEditBillerComponent implements OnInit {
  @ViewChild(FormGroupDirective,{static: true}) formDirective: FormGroupDirective;
  public dialogRef: any;

  public billerManagementAddEditForm: FormGroup;
  date = new FormControl(new Date());
  public ddmmyy: any;
  public user_token: any;
  public states: any;
  public allCities: any;
  public cities: any;
  public htmlText: any = { header: 'Add New Biller', nav: 'Add Biller', buttonText: 'Save' };
  public params_id: any;
  public message:any="Submitted Successfully";
  serializedDate = new FormControl((new Date()).toISOString());
  public taxo_array :any=[];
  constructor(public fb: FormBuilder, private datePipe: DatePipe,
    public httpService: HttpServiceService, public cookie: CookieService, public router: Router,
     public snackBar: MatSnackBar, public activeRoute: ActivatedRoute, public dialog: MatDialog) {

    this.params_id = this.activeRoute.snapshot.params._id;
    this.user_token = cookie.get('jwtToken');
    this.allStateCityData();

    if(this.params_id){
     this.generateEditForm();
    }else{
      this.generateAddForm();
    }
   
  }

  ngOnInit() {
    if(this.params_id){
      this.htmlText.header = 'Edit Biller Record';
      this.htmlText.nav = 'Edit Biller';
      this.htmlText.buttonText = 'Update';
      this.message="Updated Successfully"
      this.getSingleData();
    }
  }

  generateAddForm() {
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.billerManagementAddEditForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      companyname: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      city: [''],
      state: [''],
      date: [dateformat],
      type : ['biller'],
      status: ['', Validators.required],
      password: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmpassword: [],
    }, { validators: this.matchpassword('password', 'confirmpassword') })
  }

  generateEditForm() {
    this.datePipe.transform(this.date.value, 'MM-dd-yyyy');
    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.billerManagementAddEditForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', Validators.required],
      companyname: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      date: [dateformat],
      type : ['biller'],
      status: ['', Validators.required],
    })
  }

  getSingleData() {
    this.activeRoute.data.forEach((data) => {
      let billerDetails :any;
      billerDetails = data.billersingleData.res;
      setTimeout(() => {
        this.getCityByName(billerDetails[0].state);
      }, 400);
      this.billerManagementAddEditForm.controls['firstname'].patchValue(billerDetails[0].firstname);
      this.billerManagementAddEditForm.controls['lastname'].patchValue(billerDetails[0].lastname);
      this.billerManagementAddEditForm.controls['email'].patchValue(billerDetails[0].email);
      this.billerManagementAddEditForm.controls['phone'].patchValue(billerDetails[0].phone);
      this.billerManagementAddEditForm.controls['companyname'].patchValue(billerDetails[0].companyname);
      this.billerManagementAddEditForm.controls['address'].patchValue(billerDetails[0].address);
      this.billerManagementAddEditForm.controls['zip'].patchValue(billerDetails[0].zip);
      this.billerManagementAddEditForm.controls['city'].patchValue(billerDetails[0].city);
      this.billerManagementAddEditForm.controls['state'].patchValue(billerDetails[0].state);
      this.billerManagementAddEditForm.controls['status'].patchValue(billerDetails[0].status);
    });
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

  ResetAddEditForm() {
    this.formDirective.resetForm();
  }

  backToManagePage(){
    this.router.navigateByUrl("admin/biller-management");
  }

  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(ChangePasswordModal, {
      data: { message: x, 'id': this.params_id }
    });
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }


  BillerManagementAddFormSubmit() {
    let x: any;
    for (x in this.billerManagementAddEditForm.controls) {
      this.billerManagementAddEditForm.controls[x].markAsTouched();
    }
    if (this.billerManagementAddEditForm.valid) {
      if (this.billerManagementAddEditForm.value.status)
        this.billerManagementAddEditForm.value.status = parseInt("1");
      else
        this.billerManagementAddEditForm.value.status = parseInt("0");
        this.billerManagementAddEditForm.value.taxo_list = this.taxo_array;
      delete this.billerManagementAddEditForm.value.confirmpassword;
      
      var data: any;
      if(this.params_id) {
        data = {
          "data" : {
            id: this.params_id,
            firstname: this.billerManagementAddEditForm.value.firstname,
            lastname: this.billerManagementAddEditForm.value.lastname,
            phone: this.billerManagementAddEditForm.value.phone,
            email: this.billerManagementAddEditForm.value.email,
            companyname: this.billerManagementAddEditForm.value.companyname,
            address: this.billerManagementAddEditForm.value.address,
            zip: this.billerManagementAddEditForm.value.zip,
            city: this.billerManagementAddEditForm.value.city,
            state: this.billerManagementAddEditForm.value.state,
            date: this.billerManagementAddEditForm.value.date,
            status: this.billerManagementAddEditForm.value.status,
            
          },
          "source" : "users",
          "token"  : this.user_token
        }
      } else {
        data = {
          "data": this.billerManagementAddEditForm.value,
          "source": "users",
          "token": this.user_token
        }
      }
    
      this.httpService.httpViaPost("addorupdatedata", data)
        .subscribe(response => {
          let action = "Ok";
          this.snackBar.open(this.message, action, {
            duration: 2000,
          });
          this.formDirective.resetForm();
        })
    }
  }
}

@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})

export class ChangePasswordModal {

  public is_error: any;
  public changePwdForm: any = FormGroup;
  public user_token: any;
  public params_id: any;
  public userData: any;

  constructor(public dialogRef: MatDialogRef<ChangePasswordModal>,
    public fb: FormBuilder, public httpService: HttpServiceService, public cookie: CookieService,
    public activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    
    this.params_id = data.id;
    this.user_token = cookie.get('jwtToken');
    this.changePwdForm = this.fb.group({
      password: ['', Validators.required],
      confirmpassword: [],
    }, { validators: this.matchpassword('password', 'confirmpassword') });

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

  changePasswordFormSubmit() {
    let x: any;
    for (x in this.changePwdForm.controls) {
      this.changePwdForm.controls[x].markAsTouched();
    }
    if (this.changePwdForm.valid) {
      delete this.changePwdForm.value.confirmpassword
      var data = {
        "_id": this.params_id,
        "adminflag": 1,
        "newPassword": this.changePwdForm.value.password,
      }
      this.httpService.httpViaPost('changepassword',data).subscribe(response=>{
        console.log("response",response);
      });
    }

  }
}

