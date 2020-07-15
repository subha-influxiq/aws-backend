import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';


export interface DialogData {
  doctorData: {},
}

@Component({
  selector: 'app-approval-settings-update',
  templateUrl: './approval-settings-update.component.html',
  styleUrls: ['./approval-settings-update.component.css']
})
export class ApprovalSettingsUpdateComponent implements OnInit {

  public allReceivedData: any;
  public ApprovalSettingsUpdateForm: FormGroup;
  public htmlText: any = {
    userData: "",
    message: "Submitted Successfully",
    defaultButtonText: "Change to Default"
  };

  constructor(public httpService: HttpServiceService, public cookie: CookieService, public formBuilder: FormBuilder, public dialogRef: MatDialogRef<ApprovalSettingsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData, public router: Router) {
    this.allReceivedData = dialogData;
    this.htmlText.userData = cookie.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);
  }

  ngOnInit() {
    this.generateAddEditForm();
  }

  generateAddEditForm(flag: string = null) {
    let validateRule: any = {
      id:             [ this.allReceivedData.doctorData._id, [] ],
      default_value:  [ 0, [] ],
      default_value_percentage:  [ this.allReceivedData.doctorData.default_value_percentage, [ Validators.required, Validators.min(0), Validators.max(100) ] ],
    };

    this.ApprovalSettingsUpdateForm = this.formBuilder.group(validateRule);
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  TechManagementAddFormFormSubmit() {
    for (let x in this.ApprovalSettingsUpdateForm.controls) {
      this.ApprovalSettingsUpdateForm.controls[x].markAsTouched();
    }

    if (this.ApprovalSettingsUpdateForm.valid) {
      var data: any = {
        "source": "data_pece",
        "data": this.ApprovalSettingsUpdateForm.value,
        "token": this.htmlText.userData.jwtToken
      };

      data.data.default_value_percentage = parseInt(data.data.default_value_percentage);

      this.httpService.httpViaPost("addorupdatedata", data).subscribe(response => {
        if (response.status == "success") {
          this.dialogRef.close(response);
        }
      });
    }
  }

  chnageToDefault() {
    this.htmlText.defaultButtonText = "Please Wait";
    var intervalId = setInterval(() => {
      this.htmlText.defaultButtonText += '.';
    }, 400);

    this.httpService.httpViaPost("get-default-approval-settings", {}).subscribe(response => {
      if (response.status == "success") {
        this.ApprovalSettingsUpdateForm.patchValue({ default_value_percentage: response.data[0].default_value_percentage });
        this.ApprovalSettingsUpdateForm.patchValue({ default_value: 1 });
        clearInterval(intervalId);
        this.htmlText.defaultButtonText = "Change to Default";
      }
    });
  }

  changeDefaultValuePercentage() {
    this.ApprovalSettingsUpdateForm.patchValue({ default_value: 0 });
  }

  closeModal() {
    this.dialogRef.close({ status: "close" });
  }

}
