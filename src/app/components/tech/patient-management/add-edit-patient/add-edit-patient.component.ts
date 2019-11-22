import { Component, OnInit,Inject,ViewChild ,HostListener} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormGroupDirective
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service'
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { CommonFunction } from '../../../../class/common/common-function';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.css']
})
@HostListener('window:scroll', ['$event'])
export class AddEditPatientComponent implements OnInit {
  @ViewChild(FormGroupDirective,{static: false}) formDirective: FormGroupDirective;
  public htmlText: any = { nav: 'Add Patient' ,header:"Add Report Manually"};
  public buttonText : any="Submit";
  public patientAddEditForm : FormGroup;
  public user_token : any;
  date = new FormControl(new Date());
  public testDate :any;
  startdate: any ;
  enddate :any;
  dateofbirth :any;
  public dialogRef: any;
  public cookiesData : any={};
  public cookies_id:any;
  public allDoctorDataArray : any = [];
  public tech_id:any;
  public cookies_name:any;
  public cookies_lastname:any;
  
  constructor(public fb: FormBuilder, public activeRoute: ActivatedRoute,
    public router: Router, public httpService: HttpServiceService, private datePipe: DatePipe,
    public cookie: CookieService,public snakBar : MatSnackBar,public dialog: MatDialog,
     public commonFunction: CommonFunction) {
      this.user_token = cookie.get('jwtToken');
      let allcookies: any;
      allcookies = cookie.getAll();
      
      this.cookiesData = JSON.parse(allcookies.user_details);
      console.log("cookies data",this.cookiesData);
      this.cookies_id = this.cookiesData._id;
      this.cookies_name = this.cookiesData.firstname;
      this.cookies_lastname = this.cookiesData.lastname;
     
      /* Set Meta Data */
    this.commonFunction.setTitleMetaTags();

      // this.user_token = cookie.get('jwtToken');
      this.getAllDoctorData();

      this.patientAddEditForm = this.fb.group({
        patientName        :  ['', [Validators.required, Validators.maxLength(30)]],
        gender             :  ['', Validators.required],
        birthDate          :  ['',Validators.required],
        physicalOrdering   :  ['' ],
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
        leaveNotes         :  ['',Validators.required],
        systolic           :  [''],
        diastolic          :  [''],
        status             :  [1],
        user_id            :  []

      })
    }

  ngOnInit() {
    
  }

  getAllDoctorData(){
    var data = {
      "source": "users_view_doctor",
      "condition":{
        "tech_id_object": this.cookies_id
      },
      "token": this.user_token
    }
    this.httpService.httpViaPost('datalist', data)
      .subscribe(response => {
       
        let result: any = {};
        result = response.res;
        this.allDoctorDataArray = result;   
      })
  }

  /**for validation purpose**/
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/

  /**modal end here */
  resetAddEditForm(){
    this.formDirective.resetForm();
  }

  patientAddEditFormSubmit(){
  
    let x: any;
    for (x in this.patientAddEditForm.controls) {
      this.patientAddEditForm.controls[x].markAsTouched();
    }
    const myString = this.patientAddEditForm.controls.bloodPressure.value;
    const splits = myString.split('/');
    var startDate = this.datePipe.transform(this.startdate, "MM-dd-yyyy");
    var endDate = this.datePipe.transform(this.enddate, "MM-dd-yyyy");
    var dateOfBirth = this.datePipe.transform(this.dateofbirth,"MM-dd-yyyy");
    var dateformat = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.patientAddEditForm.value.testDate = startDate;
    this.patientAddEditForm.value.testCompletedDate = endDate;
    this.patientAddEditForm.value.birthDate = dateOfBirth;
    this.patientAddEditForm.controls['testDate'].patchValue(startDate);
    this.patientAddEditForm.controls['testCompletedDate'].patchValue(endDate);
    this.patientAddEditForm.controls['birthDate'].patchValue(dateOfBirth);
    this.patientAddEditForm.controls['date'].patchValue(dateformat);
    this.patientAddEditForm.controls['systolic'].patchValue(splits[0]);
    this.patientAddEditForm.controls['diastolic'].patchValue(splits[1]);
    this.patientAddEditForm.controls['user_id'].patchValue(this.cookies_id);
    delete this.patientAddEditForm.value.bloodPressure;
 
    if(this.patientAddEditForm.valid) {  
      var data :any = {
        "source" : "patient_management",
        "data" : this.patientAddEditForm.value,
        "sourceobj": ["user_id","physicalOrdering"],
        "token" : this.user_token
      }

      this.httpService.httpViaPost("addorupdatedata",data).subscribe(response=>{
        if(response.status="success"){
          this.formDirective.resetForm();

          // this.resetAddEditForm();

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
    }
  }

  openDialog(data) {
    this.dialogRef = this.dialog.open(DialogBoxComponent, data);
    this.dialogRef.afterClosed().subscribe(result => {
      switch(result) {
        case "Cancel":
          this.router.navigateByUrl('/tech/dashboard');
          
          break;
        case "Add Next":
          // location.reload();
          this.resetAddEditForm();
          break;
      }
    });
  }

}

