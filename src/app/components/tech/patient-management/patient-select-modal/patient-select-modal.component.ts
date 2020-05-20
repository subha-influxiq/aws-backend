import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  allPatient: [];
}

@Component({
  selector: 'app-patient-select-modal',
  templateUrl: './patient-select-modal.component.html',
  styleUrls: ['./patient-select-modal.component.css']
})
export class PatientSelectModalComponent implements OnInit {

  public selectPatientData: any = '';

  constructor(public dialogRef: MatDialogRef<PatientSelectModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectPatient(patientIndex) {
    this.selectPatientData = this.data.allPatient[patientIndex];
  }

}
