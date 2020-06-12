import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 

export interface DialogData {
  allImages: any;
  selectImageIndex: number;
}

@Component({
  selector: 'app-view-job-ticket-image',
  templateUrl: './view-job-ticket-image.component.html',
  styleUrls: ['./view-job-ticket-image.component.css']
})
export class ViewJobTicketImageComponent {

  public imageLoader: boolean;

  constructor(public dialogRef: MatDialogRef<ViewJobTicketImageComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
 
  onNoClick(): void {
    this.dialogRef.close();
  }

  changeImage(action = 'next') {
    switch(action) {
      case 'previous':
        if(this.data.selectImageIndex == 0) {
          this.data.selectImageIndex = this.data.allImages.length - 1;
        } else {
          this.data.selectImageIndex--;
        }
        break;
      case 'next':
        if(this.data.selectImageIndex == this.data.allImages.length - 1) {
          this.data.selectImageIndex = 0;
        } else {
          this.data.selectImageIndex++;
        }
        break;
    }
  }

}
