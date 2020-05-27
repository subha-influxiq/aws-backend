import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  confirmSubmittedDataSource: [];
    conflictingPatientRecordsDataSource: [];
    notFindDataSource: [];
}

@Component({
  selector: 'app-report-upload-success-modal',
  templateUrl: './report-upload-success-modal.component.html',
  styleUrls: ['./report-upload-success-modal.component.css']
})
export class ReportUploadSuccessModalComponent implements OnInit {

  /* Confirm submitted records with existing patient profile which yet to have a report. */
  public confirmSubmittedDisplayedColumns: string[] = ["no", "patient_report", "suggested_patient_by_system"];
  public confirmSubmittedDataSource: any = [];
  
  /* Conflicting Patient Records */
  public conflictingPatientRecordsDisplayedColumns: string[] = ["no", "patient_report", "conflicting_records"];
  public conflictingPatientRecordsDataSource: any = [];

  /* Not Find Patient Records */
  public notFindPatientRecordsDisplayedColumns: string[] = ["no", "patient_report"];
  public notFindPatientRecordsDataSource: any = [];

  constructor(public dialogRef: MatDialogRef<ReportUploadSuccessModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.confirmSubmittedDataSource = new MatTableDataSource(this.data.confirmSubmittedDataSource);
    this.notFindPatientRecordsDataSource = new MatTableDataSource(this.data.notFindDataSource);
    this.conflictingPatientRecordsDataSource = new MatTableDataSource(this.data.conflictingPatientRecordsDataSource);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
