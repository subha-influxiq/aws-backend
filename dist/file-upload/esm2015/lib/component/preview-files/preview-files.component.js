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
    DialogData.prototype.imgURL;
}
export class PreviewFilesComponent {
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
        // console.log('Preview component: ', this.data);
    }
}
PreviewFilesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-preview-files',
                template: "<h2 mat-dialog-title>File Preview</h2>\n<mat-dialog-content class=\"mat-typography\">\n  <img mat-card-image [src]=\"this.data.imgURL\" *ngIf=\"this.data.imgURL\">\n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n  <button mat-button type=\"button\" mat-dialog-close>Cancel</button>\n</mat-dialog-actions>",
                styles: ["img{max-width:100%;max-height:64vh}"]
            }] }
];
/** @nocollapse */
PreviewFilesComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
if (false) {
    /** @type {?} */
    PreviewFilesComponent.prototype.dialogRef;
    /** @type {?} */
    PreviewFilesComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1maWxlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvcHJldmlldy1maWxlcy9wcmV2aWV3LWZpbGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFhLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUVwRixnQ0FFQzs7O0lBREMsNEJBQVk7O0FBUWQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFFaEMsWUFDUyxTQUE4QyxFQUNyQixJQUFnQjtRQUR6QyxjQUFTLEdBQVQsU0FBUyxDQUFxQztRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQzs7OztJQUV2RCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLGlEQUFpRDtJQUNuRCxDQUFDOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLHdVQUE2Qzs7YUFFOUM7Ozs7WUFWbUIsWUFBWTs0Q0FlM0IsTUFBTSxTQUFDLGVBQWU7Ozs7SUFEdkIsMENBQXFEOztJQUNyRCxxQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpYWxvZ0RhdGEge1xuICBpbWdVUkw6IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLXByZXZpZXctZmlsZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJldmlldy1maWxlcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ByZXZpZXctZmlsZXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdGaWxlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFByZXZpZXdGaWxlc0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBEaWFsb2dEYXRhKSB7IH1cblxuICBvbk5vQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdQcmV2aWV3IGNvbXBvbmVudDogJywgdGhpcy5kYXRhKTtcbiAgfVxuXG59XG4iXX0=