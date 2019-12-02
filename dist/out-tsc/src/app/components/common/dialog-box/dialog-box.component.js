import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
let DialogBoxComponent = class DialogBoxComponent {
    constructor(dialogRef, dialogData, router) {
        this.dialogRef = dialogRef;
        this.dialogData = dialogData;
        this.router = router;
        this.data = dialogData;
    }
    ngOnInit() {
    }
    button1() {
        this.dialogRef.close(this.data.button1.text);
    }
    button2() {
        this.dialogRef.close(this.data.button2.text);
    }
};
DialogBoxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dialog-box',
        templateUrl: './dialog-box.component.html',
        styleUrls: ['./dialog-box.component.css']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], DialogBoxComponent);
export { DialogBoxComponent };
//# sourceMappingURL=dialog-box.component.js.map