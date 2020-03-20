import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from '../../../../class/common/common-function';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { environment } from '../../../../../environments/environment';

export interface DialogData {
  message: string;
  id: any;
}

@Component({
  selector: 'app-add-edit-faq',
  templateUrl: './add-edit-faq.component.html',
  styleUrls: ['./add-edit-faq.component.css']
})
export class AddEditFaqComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  public FaqManagementAddEditForm: FormGroup;
  public dialogRef: any;

  public params_id: any;
  public htmlText: any = {
    userData: "",
    header: 'Add New FAQ', 
    nav: 'Add FAQ', 
    buttonText: 'Save',
    message: "Submitted Successfully",
    states: "",
    allCities: "",
    cities: ""
  };

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService, public snackBar: MatSnackBar, public commonFunction: CommonFunction,
    public dialog: MatDialog) {
    
    this.htmlText.userData = cookie.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);

    if (this.activeRoute.snapshot.params._id) {
      this.generateAddEditForm('edit');

      this.htmlText.message     = "Updated Successfully";
      this.htmlText.header      = 'Edit FAQ Record';
      this.htmlText.nav         = 'Edit FAQ';
      this.htmlText.buttonText  = 'Update';
      this.params_id            = this.activeRoute.snapshot.params._id;
    } else {
      this.generateAddEditForm('add');
    }
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:       ['', []],
      users:    ['', [ Validators.required, Validators.maxLength(50) ]],
      question: ['', [ Validators.required, Validators.maxLength(50) ]],
      answer:   ['', [ Validators.required, Validators.maxLength(10000) ]],
      priority: ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(16) ]],
      status:   ['', []],
    };
    
    switch(flag) {
      case 'edit':
        this.FaqManagementAddEditForm = this.fb.group(validateRule);

        this.activeRoute.data.forEach((data) => {
          let billerDetails: any = data.techData.res;

          this.FaqManagementAddEditForm.controls['id'].patchValue(billerDetails[0]._id);
          this.FaqManagementAddEditForm.controls['users'].patchValue(billerDetails[0].users);
          this.FaqManagementAddEditForm.controls['question'].patchValue(billerDetails[0].question);
          this.FaqManagementAddEditForm.controls['answer'].patchValue(billerDetails[0].answer);
          this.FaqManagementAddEditForm.controls['priority'].patchValue(billerDetails[0].priority);
          this.FaqManagementAddEditForm.controls['status'].patchValue(billerDetails[0].status);
        });
        break;
      case 'add':
        delete validateRule.id;
        
        this.FaqManagementAddEditForm = this.fb.group(validateRule);
        break;
    }
  }

  ngOnInit() {
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  TechManagementAddFormFormSubmit() {
    for (let x in this.FaqManagementAddEditForm.controls) {
      this.FaqManagementAddEditForm.controls[x].markAsTouched();
    }

    if (this.FaqManagementAddEditForm.valid) {
      if (this.FaqManagementAddEditForm.value.status) {
        this.FaqManagementAddEditForm.value.status = parseInt("1");
      } else {
        this.FaqManagementAddEditForm.value.status = parseInt("0");
      }
      
      var data: any = {
        "source": "data_faq",
        "data": this.FaqManagementAddEditForm.value,
        "token": this.htmlText.userData.jwtToken
      };

      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if (response.status == "success") {
          this.snackBar.open(this.htmlText.message, 'Ok', {
            duration: 2000,
          });

          this.formDirective.resetForm();

          setTimeout(() => {
            this.router.navigateByUrl("admin/faq-management");
          }, 1000);
        } else {
          this.snackBar.open(response.msg, '', {
            duration: 2000,
          });
        }
      });
    }
  }

}
