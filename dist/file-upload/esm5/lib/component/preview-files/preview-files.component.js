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
var PreviewFilesComponent = /** @class */ (function () {
    function PreviewFilesComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    /**
     * @return {?}
     */
    PreviewFilesComponent.prototype.onNoClick = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    /**
     * @return {?}
     */
    PreviewFilesComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // console.log('Preview component: ', this.data);
    };
    PreviewFilesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-preview-files',
                    template: "<h2 mat-dialog-title>File Preview</h2>\n<mat-dialog-content class=\"mat-typography\">\n  <img mat-card-image [src]=\"this.data.imgURL\" *ngIf=\"this.data.imgURL\">\n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n  <button mat-button type=\"button\" mat-dialog-close>Cancel</button>\n</mat-dialog-actions>",
                    styles: ["img{max-width:100%;max-height:64vh}"]
                }] }
    ];
    /** @nocollapse */
    PreviewFilesComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return PreviewFilesComponent;
}());
export { PreviewFilesComponent };
if (false) {
    /** @type {?} */
    PreviewFilesComponent.prototype.dialogRef;
    /** @type {?} */
    PreviewFilesComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1maWxlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvcHJldmlldy1maWxlcy9wcmV2aWV3LWZpbGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFhLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUVwRixnQ0FFQzs7O0lBREMsNEJBQVk7O0FBR2Q7SUFPRSwrQkFDUyxTQUE4QyxFQUNyQixJQUFnQjtRQUR6QyxjQUFTLEdBQVQsU0FBUyxDQUFxQztRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQzs7OztJQUV2RCx5Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCx3Q0FBUTs7O0lBQVI7UUFDRSxpREFBaUQ7SUFDbkQsQ0FBQzs7Z0JBakJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3Qix3VUFBNkM7O2lCQUU5Qzs7OztnQkFWbUIsWUFBWTtnREFlM0IsTUFBTSxTQUFDLGVBQWU7O0lBVTNCLDRCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FkWSxxQkFBcUI7OztJQUc5QiwwQ0FBcUQ7O0lBQ3JELHFDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nRGF0YSB7XG4gIGltZ1VSTDogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItcHJldmlldy1maWxlcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmV2aWV3LWZpbGVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJldmlldy1maWxlcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHJldmlld0ZpbGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHJldmlld0ZpbGVzQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IERpYWxvZ0RhdGEpIHsgfVxuXG4gIG9uTm9DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1ByZXZpZXcgY29tcG9uZW50OiAnLCB0aGlzLmRhdGEpO1xuICB9XG5cbn1cbiJdfQ==