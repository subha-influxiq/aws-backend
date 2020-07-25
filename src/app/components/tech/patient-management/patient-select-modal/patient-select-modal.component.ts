import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../../services/http-service.service';

export interface DialogData {
  allPatient: [];
}

@Component({
  selector: 'app-patient-select-modal',
  templateUrl: './patient-select-modal.component.html',
  styleUrls: ['./patient-select-modal.component.css']
})
export class PatientSelectModalComponent implements OnInit {

  public htmlText: any = {};

  public selectPatient: any = {
    data: '',
    error: false,
    onSelect: ''
  };

  public selectDoctor: any = {
    data: '',
    error: false,
    onSelect: ''
  };

  public demoPatient: any = {
    
  };

  constructor(public httpService: HttpServiceService, private cookieService: CookieService, public dialogRef: MatDialogRef<PatientSelectModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.htmlText.userData = this.cookieService.getAll();
    this.htmlText.userData.user_details = JSON.parse(this.htmlText.userData.user_details);
    var data = {
      "source": "doctors_by_tech_id",
      "condition": { 
        "tech_id_object": this.htmlText.userData.user_details._id
      },
      "token": this.htmlText.userData.jwtToken
    };

    this.httpService.httpViaPost('datalist', data).subscribe(response => {
      if(response.status == true) {
        this.htmlText.doctorList = response.res;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChnagePatient(patientIndex) {
    this.selectPatient.data = this.data.allPatient[patientIndex];
  }

  onChnageDoctor(doctorIndex) {
    this.selectPatient.data = this.htmlText.doctorList[doctorIndex];
  }

  closeModal() {
    if(this.selectPatient.data == '') {
      this.selectPatient.error = true;
    } else {
      this.selectPatient.error = false;
      this.dialogRef.close(this.selectPatient.data);
    }
  }

  resetAllField() {
    this.selectPatient.data = '';
    this.selectPatient.model = '';
  }

}
