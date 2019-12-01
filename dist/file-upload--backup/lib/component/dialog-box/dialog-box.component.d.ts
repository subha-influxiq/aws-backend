import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
    message: string;
}
export declare class DialogBoxComponent implements OnInit {
    dialogRef: MatDialogRef<DialogBoxComponent>;
    data: DialogData;
    constructor(dialogRef: MatDialogRef<DialogBoxComponent>, data: DialogData);
    onNoClick(): void;
    ngOnInit(): void;
}
