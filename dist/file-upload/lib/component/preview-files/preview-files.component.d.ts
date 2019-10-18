import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
    imgURL: any;
}
export declare class PreviewFilesComponent implements OnInit {
    dialogRef: MatDialogRef<PreviewFilesComponent>;
    data: DialogData;
    constructor(dialogRef: MatDialogRef<PreviewFilesComponent>, data: DialogData);
    onNoClick(): void;
    ngOnInit(): void;
}
