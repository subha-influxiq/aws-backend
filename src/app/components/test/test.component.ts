import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  
  public usersData: any = [];

  constructor(public activeRoute :ActivatedRoute,public dialog: MatDialog) {
  }
 

  ngOnInit() {
    this.getResolveData();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Get resolve data */
  getResolveData() {
    this.activeRoute.data.forEach((data)=>{
      console.log(data);
      this.usersData = data.data.res;
    })
  }

}
@Component({
  selector: 'upload-dialog-content.html',
  templateUrl: 'upload-dialog-content.html',
})
export class DialogContentExampleDialog {}
