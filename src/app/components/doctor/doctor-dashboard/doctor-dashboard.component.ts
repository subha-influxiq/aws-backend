import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { UploadDialogBoxComponent} from '../../common/upload-dialog-box/upload-dialog-box.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    const dialogRef = this.dialog.open(UploadDialogBoxComponent,{
      width: '1000px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


