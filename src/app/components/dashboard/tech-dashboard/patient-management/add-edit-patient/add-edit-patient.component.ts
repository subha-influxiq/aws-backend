import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../../services/http-service.service'
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../../../common/dialog-box/dialog-box.component';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.css']
})
export class AddEditPatientComponent implements OnInit {

  public buttonText : any="Submit";
  public patientAddEditForm : FormGroup;
  public user_token : any;
  date = new FormControl(new Date());
  public testDate :any;
  startdate: any ;
  enddate :any;
  dateofbirth :any;
  public dialogRef: any;

  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService,public snakBar : MatSnackBar,public dialog: MatDialog) {
      this.user_token = cookie.get('jwtToken');
      this.patientAddEditForm = this.fb.group({
        patientName        :  ['', [Validators.required, Validators.maxLength(30)]],
        gender             :  ['', Validators.required],
        birthDate          :  ['',Validators.required],
        physicalOrdering   :  ['',Validators.required ],
        testDate           :  ['',Validators.required],
        date               :  ['',Validators.required],
        testCompletedDate  :  ['',Validators.required],
        PTGPT              :  ['',Validators.required],
        PTGVLFI            :  ['',Validators.required],
        IR                 :  ['',Validators.required],
        ESRNO              :  ['',Validators.required],
        ESRL               :  ['',Validators.required],
        peakC              :  ['',Validators.required],
        PTGtype            :  ['',Validators.required],
        PTGCVD             :  ['',Validators.required],
        stressI            :  ['',Validators.required],
        RI                 :  ['',Validators.required],
        AIPTG              :  ['',Validators.required],
        CIsCI              :  ['',Validators.required],
        pNN50              :  ['',Validators.required],
        RMSSD              :  ['',Validators.required],
        SDba               :  ['',Validators.required],
        SDda               :  ['',Validators.required],
        DPRS               :  ['',Validators.required],
        ValsR              :  ['',Validators.required],
        BMI                :  ['',Validators.required],
        bloodPressure      :  ['',Validators.required],
        leaveNotes         :  ['',Validators.required]
      })
    }

  ngOnInit() {
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  /**modal end here */
  resetAddEditForm(){
    this.patientAddEditForm.reset();
  }

  patientAddEditFormSubmit(){
    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsUntouched();
    }
    var startDate = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
    var endDate = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
    var dateOfBirth = this.datePipe.transform(this.dateofbirth,"dd-MM-yyyy");
    var dateformat = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.patientAddEditForm.value.testDate = startDate;
    this.patientAddEditForm.value.testCompletedDate = endDate;
    this.patientAddEditForm.value.birthDate = dateOfBirth;
    this.patientAddEditForm.controls['testDate'].patchValue(startDate);
    this.patientAddEditForm.controls['testCompletedDate'].patchValue(endDate);
    this.patientAddEditForm.controls['birthDate'].patchValue(dateOfBirth);
    this.patientAddEditForm.controls['date'].patchValue(dateformat);
 
    if(this.patientAddEditForm.valid) {  
      var data :any = {
        "source" : "patient_management",
        "data" : this.patientAddEditForm.value,
        "token" : this.user_token
      }

      this.httpService.httpViaPost("addorupdatedata",data).subscribe(response=>{
        if(response.status="success"){
          this.resetAddEditForm();

          /* Open modal */
          let data: any = {
            width: '250px',
            data: { 
              header: "Success",
              message: "Record Saved Successfully",
              button1: { text: "Cancel" },
              button2: { text: "Add Next" },
            }
          }
          this.openDialog(data);
        }  
      });
    } else {
      alert("error occured");
    }
  }

  openDialog(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      switch(result) {
        case "Cancel":
          this.router.navigateByUrl('/dashboard/tech');
          break;
        case "Add Next":
          location.reload();
          break;
      }
    });
  }

}
