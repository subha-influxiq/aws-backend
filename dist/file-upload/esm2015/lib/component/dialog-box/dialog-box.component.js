/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * @record
 */
export function DialogData() { }
if (false) {
    /** @type {?} */
    DialogData.prototype.message;
}
export class DialogBoxComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    /**
     * @return {?}
     */
    onNoClick() {
        this.dialogRef.close();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DialogBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-dialog-box',
                template: "<h1 mat-dialog-title>Are you sure ??</h1>\n<div mat-dialog-actions>\n  <button mat-button type=\"button\" [mat-dialog-close]=\"false\" (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button type=\"button\" [mat-dialog-close]=\"true\" cdkFocusInitial>Yes</button>\n</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
DialogBoxComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
if (false) {
    /** @type {?} */
    DialogBoxComponent.prototype.dialogRef;
    /** @type {?} */
    DialogBoxComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZGlhbG9nLWJveC9kaWFsb2ctYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFhLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUVwRixnQ0FFQzs7O0lBREMsNkJBQWdCOztBQVNsQixNQUFNLE9BQU8sa0JBQWtCOzs7OztJQUU3QixZQUNTLFNBQTJDLEVBQ2xCLElBQWdCO1FBRHpDLGNBQVMsR0FBVCxTQUFTLENBQWtDO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBSSxDQUFDOzs7O0lBRXZELFNBQVM7UUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7O1lBakJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixvU0FBMEM7O2FBRTNDOzs7O1lBVm1CLFlBQVk7NENBZ0IzQixNQUFNLFNBQUMsZUFBZTs7OztJQUR2Qix1Q0FBa0Q7O0lBQ2xELGtDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nRGF0YSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWRpYWxvZy1ib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGlhbG9nLWJveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RpYWxvZy1ib3guY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGlhbG9nQm94Q29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IERpYWxvZ0RhdGEpIHsgfVxuXG4gIG9uTm9DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19