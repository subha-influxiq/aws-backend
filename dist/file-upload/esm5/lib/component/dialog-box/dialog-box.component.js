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
var DialogBoxComponent = /** @class */ (function () {
    function DialogBoxComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    /**
     * @return {?}
     */
    DialogBoxComponent.prototype.onNoClick = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    /**
     * @return {?}
     */
    DialogBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DialogBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-dialog-box',
                    template: "<h1 mat-dialog-title>Are you sure ??</h1>\n<div mat-dialog-actions>\n  <button mat-button type=\"button\" [mat-dialog-close]=\"false\" (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button type=\"button\" [mat-dialog-close]=\"true\" cdkFocusInitial>Yes</button>\n</div>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    DialogBoxComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return DialogBoxComponent;
}());
export { DialogBoxComponent };
if (false) {
    /** @type {?} */
    DialogBoxComponent.prototype.dialogRef;
    /** @type {?} */
    DialogBoxComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZGlhbG9nLWJveC9kaWFsb2ctYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFhLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUVwRixnQ0FFQzs7O0lBREMsNkJBQWdCOztBQUdsQjtJQVFFLDRCQUNTLFNBQTJDLEVBQ2xCLElBQWdCO1FBRHpDLGNBQVMsR0FBVCxTQUFTLENBQWtDO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBSSxDQUFDOzs7O0lBRXZELHNDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELHFDQUFROzs7SUFBUjtJQUNBLENBQUM7O2dCQWpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsb1NBQTBDOztpQkFFM0M7Ozs7Z0JBVm1CLFlBQVk7Z0RBZ0IzQixNQUFNLFNBQUMsZUFBZTs7SUFTM0IseUJBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQWJZLGtCQUFrQjs7O0lBRzNCLHVDQUFrRDs7SUFDbEQsa0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZGlhbG9nLWJveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2ctYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGlhbG9nLWJveC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBEaWFsb2dCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEaWFsb2dCb3hDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogRGlhbG9nRGF0YSkgeyB9XG5cbiAgb25Ob0NsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iXX0=