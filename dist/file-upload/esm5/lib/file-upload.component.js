/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileUploadService } from './file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';
import { PreviewFilesComponent } from './component/preview-files/preview-files.component';
import { MatDialog } from '@angular/material/dialog';
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(formBuilder, fileUploadService, ActivatedRoute, router, _snackBar, dialog) {
        this.formBuilder = formBuilder;
        this.fileUploadService = fileUploadService;
        this.ActivatedRoute = ActivatedRoute;
        this.router = router;
        this._snackBar = _snackBar;
        this.dialog = dialog;
        this.formData = new FormData();
        this.files = [];
        this.filesProcess = [];
        this.totalFile = 0;
        this.loading = false;
    }
    Object.defineProperty(FileUploadComponent.prototype, "config", {
        set: /**
         * @param {?} getConfig
         * @return {?}
         */
        function (getConfig) {
            this.configData = getConfig;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FileUploadComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /* Select File Proccess */
    /* Select File Proccess */
    /**
     * @param {?} event
     * @return {?}
     */
    FileUploadComponent.prototype.selectFiles = /* Select File Proccess */
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.loading = true;
        for (var index = 0; index < event.length; index++) {
            /** @type {?} */
            var count = this.files.length;
            /** @type {?} */
            var element = event[index];
            /* Checking Validation */
            /** @type {?} */
            var validate = this.checkingValidation(element);
            if (validate.status) {
                element.valid = { status: true };
                element.upload = { status: 'selected' };
                element.viewUrl = 'https://loading.io/spinners/dual-ring/lg.dual-ring-loader.gif';
                this.files.push(element);
                this.viewFiles(count, element);
            }
            else {
                element.valid = { status: false, message: validate.message };
                element.upload = { status: 'selected' };
                element.viewUrl = null;
                /** @type {?} */
                var format = element.type.split("/");
                element.viewText = format[1];
                this.files.push(element);
            }
        }
    };
    /**
     * @param {?} count
     * @param {?} element
     * @return {?}
     */
    FileUploadComponent.prototype.viewFiles = /**
     * @param {?} count
     * @param {?} element
     * @return {?}
     */
    function (count, element) {
        var _this = this;
        /** @type {?} */
        var format = element.type.split("/");
        if (format[0] == 'image') {
            /** @type {?} */
            var reader = new FileReader();
            /** @type {?} */
            var imagePath = this.files[count];
            reader.readAsDataURL(this.files[count]);
            reader.onload = (/**
             * @param {?} _event
             * @return {?}
             */
            function (_event) {
                /** @type {?} */
                var imgURL = reader.result;
                _this.files[count].viewUrl = imgURL;
            });
        }
        else {
            this.files[count].viewUrl = null;
            this.files[count].viewText = format[1];
        }
    };
    /* Checking Validation */
    /* Checking Validation */
    /**
     * @param {?} element
     * @return {?}
     */
    FileUploadComponent.prototype.checkingValidation = /* Checking Validation */
    /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var valid = { status: true, message: null };
        /* Checking File Format */
        /** @type {?} */
        var format = element.type.split("/");
        /** @type {?} */
        var check = this.configData.format.includes(format[1]);
        if (check == false) {
            valid.status = false;
            valid.message = format[1].toUpperCase() + " format not supported.";
            this.openSnackBar(format[1].toUpperCase() + " format not supported.", '');
            return valid;
        }
        /* Checking File size */
        if (element.size / 1000 > this.configData.size) {
            valid.status = false;
            valid.message = "File size too large. Maximum file size limit: " + this.configData.size + " KB.";
            this.openSnackBar("File size too large. Maximum file size limit: " + this.configData.size + " KB.", '');
            return valid;
        }
        if (valid.status == true) {
            return valid;
        }
    };
    /* File Upload Process */
    /* File Upload Process */
    /**
     * @param {?=} getIndex
     * @return {?}
     */
    FileUploadComponent.prototype.uploadAll = /* File Upload Process */
    /**
     * @param {?=} getIndex
     * @return {?}
     */
    function (getIndex) {
        if (getIndex === void 0) { getIndex = null; }
        for (var index = 0; index < this.files.length; index++) {
            if (this.files[index].valid.status == true && this.files[index].upload.status != 'complete') {
                this.uploading(index);
            }
        }
    };
    /* Upload */
    /* Upload */
    /**
     * @param {?} index
     * @return {?}
     */
    FileUploadComponent.prototype.uploading = /* Upload */
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        /** @type {?} */
        var postData = {
            file: this.files[index],
            type: this.configData.type,
            path: this.configData.path,
            prefix: this.configData.prefix,
            uploadType: this.configData.uploadType
        };
        /** @type {?} */
        var url = this.configData.baseUrl + this.configData.endpoint + '?path=' + this.configData.path + '&prefix=' + this.configData.prefix + '&type=' + this.configData.type + '&rand=' + index;
        this.fileUploadService.upload(url, postData).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var result = response;
            switch (result.status) {
                case 'complete':
                    _this.files[index].upload = result;
                    _this.configData.files = _this.files;
                    _this.openSnackBar('Successfully Uploaded !!', 'Undo');
                    break;
                case 'error':
                    _this.files[index].upload = result.data;
                    _this.openSnackBar(result.data, '');
                    break;
                default:
                    _this.files[index].upload = result;
                    break;
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            _this.files[index] = { status: 'error' };
            _this.openSnackBar('An error occurred !!', 'Retry');
        }));
    };
    /* Remove Files */
    /* Remove Files */
    /**
     * @param {?=} index
     * @return {?}
     */
    FileUploadComponent.prototype.removeFiles = /* Remove Files */
    /**
     * @param {?=} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        if (index === void 0) { index = null; }
        this.openDialog();
        this.dialogRef.afterClosed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result) {
                _this.files.splice(index, 1);
                _this.openSnackBar('Successfully Remove !!', '');
            }
        }));
    };
    /**
     * @param {?} message
     * @param {?} action
     * @return {?}
     */
    FileUploadComponent.prototype.openSnackBar = /**
     * @param {?} message
     * @param {?} action
     * @return {?}
     */
    function (message, action) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    };
    /* Dialog Box */
    /* Dialog Box */
    /**
     * @return {?}
     */
    FileUploadComponent.prototype.openDialog = /* Dialog Box */
    /**
     * @return {?}
     */
    function () {
        this.dialogRef = this.dialog.open(DialogBoxComponent, {
            width: '250px',
            data: { message: "Message" }
        });
    };
    /* Delete all selected files */
    /* Delete all selected files */
    /**
     * @return {?}
     */
    FileUploadComponent.prototype.deleteAll = /* Delete all selected files */
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.openDialog();
        this.dialogRef.afterClosed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result) {
                _this.files.splice(0, _this.files.length);
                _this.openSnackBar('Successfully Remove !!', '');
            }
        }));
    };
    /* Preview Files */
    /* Preview Files */
    /**
     * @param {?} index
     * @return {?}
     */
    FileUploadComponent.prototype.previewFiles = /* Preview Files */
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        /** @type {?} */
        var mimeType = this.files[index].type;
        if (mimeType.match(/image\/*/) == null) {
            this.openSnackBar('Preview not supported.', '');
            return;
        }
        /** @type {?} */
        var reader = new FileReader();
        /** @type {?} */
        var imagePath = this.files[index];
        reader.readAsDataURL(this.files[index]);
        reader.onload = (/**
         * @param {?} _event
         * @return {?}
         */
        function (_event) {
            /** @type {?} */
            var imgURL = reader.result;
            /** @type {?} */
            var dialogRef = _this.dialog.open(PreviewFilesComponent, {
                data: { imgURL: imgURL }
            });
        });
    };
    FileUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-file-upload',
                    template: "<!-- File Upload -->\n<div class=\"uploadfilecontainer\" (click)=\"fileInput.click()\" libDragDrop (onFileDropped)=\"selectFiles($event)\">\n    <input hidden type=\"file\" #fileInput (change)=\"selectFiles($event.target.files)\" multiple>\n    <div class=\"uploadtextwrapper\">\n        <h2>Drag and Drop Files</h2>\n        <p>Supported Formats:\n            <ng-container *ngFor=\"let val of configData.format; let i = index\">\n                {{ val }}<ng-container *ngIf=\"i + 1 < configData.format.length\">,</ng-container>\n            </ng-container>\n        </p>\n        <p>MAX Size: {{ configData.size / 1024 | number: '.1-2' }} MB</p>\n    </div>\n</div>\n\n<div class=\"button-group\" *ngIf=\"files.length > 0\">\n    <button mat-raised-button color=\"primary\" type=\"button\" (click)=\"uploadAll();\">Upload All</button>\n    <button mat-raised-button color=\"warn\" type=\"button\" (click)=\"deleteAll();\">Delete All</button>\n</div>\n\n<div class=\"files-view\">\n    <!-- View Files -->\n    <mat-card class=\"example-card\" *ngFor=\"let file of files; let i = index;\">\n        <span class=\"viewUrlwrapper\">\n            <div *ngIf=\"file.viewUrl == null\" (click)=\"previewFiles(i);\" class=\"othersFilePreview\"> <h2 style=\"color:white; font-weight: bold;\">{{ file.viewText | uppercase }}</h2></div>\n            <img mat-card-image *ngIf=\"file.viewUrl != null\" [src]=\"file.viewUrl\" alt=\"{{ file.name }}\" (click)=\"previewFiles(i);\" />\n        </span>\n        <span class=\"viewUrlcontent\">\n            <mat-card-header>\n                <mat-card-title>{{ file.name }}</mat-card-title>\n                <mat-card-subtitle class=\"fileDescription\">Type: {{ file.type }}, Size:\n                    <ng-container *ngIf=\"file.size / 1000 > 999\">\n                        {{ file.size / 1000 / 1000 | number: '.1-2' }} MB\n                    </ng-container>\n                    <ng-container *ngIf=\"file.size / 1000 < 1000\">\n                        {{ file.size / 1000 | number: '.1-2' }} KB\n                    </ng-container>\n                </mat-card-subtitle>\n                <mat-card-subtitle class=\"error\" *ngIf=\"file.valid.status == false\">{{ file.valid.message }}\n                </mat-card-subtitle>\n            </mat-card-header>\n\n            <mat-card-content>\n                <mat-progress-bar mode=\"determinate\" *ngIf=\"file.upload.status == 'progress'\"\n                    value=\"{{ file.upload.data.percentage }}\"></mat-progress-bar>\n                <mat-progress-bar mode=\"indeterminate\" *ngIf=\"file.upload.status == 'waiting'\"></mat-progress-bar>\n            </mat-card-content>\n\n            <mat-card-actions>\n                <!-- <button mat-raised-button matTooltip=\"Preview\" *ngIf=\"file.valid.status == true\" aria-label=\"Preview\" (click)=\"previewFiles(i);\">Preview</button> -->\n\n                <button mat-raised-button color=\"primary\" type=\"button\"\n                    *ngIf=\"file.valid.status == true && file.upload.status != 'complete'\" matTooltip=\"Upload\"\n                    aria-label=\"Upload\" (click)=\"uploading(i);\">Upload</button>\n                <button mat-raised-button type=\"button\" disabled *ngIf=\"file.upload.status == 'complete'\">Upload Complete</button>\n\n                <button mat-raised-button type=\"button\" color=\"warn\" matTooltip=\"Remove\" aria-label=\"Remove\"\n                    (click)=\"removeFiles(i);\">Remove</button>\n            </mat-card-actions>\n        </span>\n    </mat-card>\n</div>",
                    styles: [".uploadfilecontainer{background-repeat:no-repeat;background-size:100px;background-position:center;height:200px;width:80%;margin:20px auto;border:2px dashed #1c8adb;border-radius:10px;text-align:center;display:flex;justify-content:center;align-items:center}.uploadfilecontainer:hover{cursor:pointer;background-color:#9ecbec!important;opacity:.8}.button-group{background-repeat:no-repeat;background-size:100px;background-position:center;height:40px;width:80%;margin:20px auto;border-radius:10px}.error.mat-card-subtitle{color:#a00;text-align:left}.example-card{margin:6px auto auto;max-width:100%}.example-header-image{background-image:url(https://material.angular.io/assets/img/examples/shiba1.jpg);background-size:cover}.progress-bar{margin-top:24px}.file-div{background-color:#dedddc;margin-top:6px}.othersFilePreview{background-color:#8a2be2;height:100%;width:100%;text-align:center;justify-content:center;align-items:center;display:flex}.fileDescription{text-align:left}.files-view{background-repeat:no-repeat;background-size:cover;background-position:center;height:auto!important;width:82%;margin:20px auto;border-radius:10px;display:flex;justify-content:center;align-items:stretch;flex-wrap:wrap}.files-view .mat-card{position:relative;z-index:9;flex:1 1 28.33%;margin:10px!important;display:flex;flex-wrap:wrap}.viewUrlwrapper{height:160px;width:100%;overflow:hidden;position:relative}.viewUrlwrapper img{max-width:100%;-o-object-fit:cover;object-fit:cover;margin:0 auto;z-index:99;position:relative;max-width:100%;width:initial;display:block;margin-top:-46px!important}.viewUrlcontent{display:block;justify-content:center;align-items:stretch;flex-wrap:wrap;flex:1 1 100%}.viewUrlcontent .mat-card-header{display:flex;flex-direction:row;flex:1 1 100%;justify-content:center;text-align:center;flex-wrap:wrap}.viewUrlcontent .mat-progress-bar{margin-bottom:5px}.viewUrlcontent .mat-card-header .mat-card-header-text{margin:10px;width:100%}.viewUrlcontent .mat-card-header .mat-card-header-text .mat-card-title{width:100%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;line-height:19px;max-height:40px;-webkit-line-clamp:2}.mat-typography .mat-card-image{width:inherit!important;margin:0!important}"]
                }] }
    ];
    /** @nocollapse */
    FileUploadComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: FileUploadService },
        { type: ActivatedRoute },
        { type: Router },
        { type: MatSnackBar },
        { type: MatDialog }
    ]; };
    FileUploadComponent.propDecorators = {
        config: [{ type: Input }]
    };
    return FileUploadComponent;
}());
export { FileUploadComponent };
if (false) {
    /** @type {?} */
    FileUploadComponent.prototype.formData;
    /** @type {?} */
    FileUploadComponent.prototype.files;
    /** @type {?} */
    FileUploadComponent.prototype.filesProcess;
    /** @type {?} */
    FileUploadComponent.prototype.configData;
    /** @type {?} */
    FileUploadComponent.prototype.totalFile;
    /** @type {?} */
    FileUploadComponent.prototype.dialogRef;
    /** @type {?} */
    FileUploadComponent.prototype.loading;
    /** @type {?} */
    FileUploadComponent.prototype.imgResultBeforeCompress;
    /** @type {?} */
    FileUploadComponent.prototype.imgResultAfterCompress;
    /** @type {?} */
    FileUploadComponent.prototype.name;
    /**
     * @type {?}
     * @private
     */
    FileUploadComponent.prototype.formBuilder;
    /**
     * @type {?}
     * @private
     */
    FileUploadComponent.prototype.fileUploadService;
    /**
     * @type {?}
     * @private
     */
    FileUploadComponent.prototype.ActivatedRoute;
    /**
     * @type {?}
     * @private
     */
    FileUploadComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    FileUploadComponent.prototype._snackBar;
    /** @type {?} */
    FileUploadComponent.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmlsZS11cGxvYWQvIiwic291cmNlcyI6WyJsaWIvZmlsZS11cGxvYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixLQUFLLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBc0MsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsU0FBUyxFQUFpQyxNQUFNLDBCQUEwQixDQUFDO0FBR3BGO0lBd0JFLDZCQUFvQixXQUF3QixFQUFVLGlCQUFvQyxFQUNoRixjQUE4QixFQUFVLE1BQWMsRUFBVSxTQUFzQixFQUN2RixNQUFpQjtRQUZOLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNoRixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUN2RixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBbEJuQixhQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQixVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBRXZCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEIsWUFBTyxHQUFZLEtBQUss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OztJQUM5RixxQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFcnJvclN0YXRlTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZFNlcnZpY2UgfSBmcm9tICcuL2ZpbGUtdXBsb2FkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgeyBBbGVydE1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9hbGVydC1tZXNzYWdlL2FsZXJ0LW1lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ0JveENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2RpYWxvZy1ib3gvZGlhbG9nLWJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJldmlld0ZpbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvcHJldmlldy1maWxlcy9wcmV2aWV3LWZpbGVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWZpbGUtdXBsb2FkJyxcbiAgdGVtcGxhdGVVcmw6ICdmaWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzdHlsZS5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBwdWJsaWMgZmlsZXM6IGFueSA9IFtdO1xuICBwdWJsaWMgZmlsZXNQcm9jZXNzOiBhbnkgPSBbXTtcbiAgcHVibGljIGNvbmZpZ0RhdGE6IGFueTtcbiAgcHVibGljIHRvdGFsRmlsZTogbnVtYmVyID0gMDtcbiAgcHVibGljIGRpYWxvZ1JlZjogYW55O1xuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGltZ1Jlc3VsdEJlZm9yZUNvbXByZXNzOnN0cmluZztcbiAgaW1nUmVzdWx0QWZ0ZXJDb21wcmVzczpzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbmZpZyhnZXRDb25maWc6IGFueSkge1xuICAgIHRoaXMuY29uZmlnRGF0YSA9IGdldENvbmZpZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIGZpbGVVcGxvYWRTZXJ2aWNlOiBGaWxlVXBsb2FkU2VydmljZSxcbiAgICBwcml2YXRlIEFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfc25hY2tCYXI6IE1hdFNuYWNrQmFyLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICAvKiBTZWxlY3QgRmlsZSBQcm9jY2VzcyAqL1xuICBzZWxlY3RGaWxlcyhldmVudCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGV2ZW50Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGNvdW50OiBudW1iZXIgPSB0aGlzLmZpbGVzLmxlbmd0aDtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudFtpbmRleF07XG5cbiAgICAgIC8qIENoZWNraW5nIFZhbGlkYXRpb24gKi9cbiAgICAgIGxldCB2YWxpZGF0ZTogYW55ID0gdGhpcy5jaGVja2luZ1ZhbGlkYXRpb24oZWxlbWVudCk7XG4gICAgICBpZiAodmFsaWRhdGUuc3RhdHVzKSB7XG4gICAgICAgIGVsZW1lbnQudmFsaWQgPSB7IHN0YXR1czogdHJ1ZSB9O1xuICAgICAgICBlbGVtZW50LnVwbG9hZCA9IHsgc3RhdHVzOiAnc2VsZWN0ZWQnIH07XG4gICAgICAgIGVsZW1lbnQudmlld1VybCA9ICdodHRwczovL2xvYWRpbmcuaW8vc3Bpbm5lcnMvZHVhbC1yaW5nL2xnLmR1YWwtcmluZy1sb2FkZXIuZ2lmJztcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnZpZXdGaWxlcyhjb3VudCwgZWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnZhbGlkID0geyBzdGF0dXM6IGZhbHNlLCBtZXNzYWdlOiB2YWxpZGF0ZS5tZXNzYWdlIH07XG4gICAgICAgIGVsZW1lbnQudXBsb2FkID0geyBzdGF0dXM6ICdzZWxlY3RlZCcgfTtcbiAgICAgICAgZWxlbWVudC52aWV3VXJsID0gbnVsbDtcblxuICAgICAgICBsZXQgZm9ybWF0ID0gZWxlbWVudC50eXBlLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgZWxlbWVudC52aWV3VGV4dCA9IGZvcm1hdFsxXTtcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZpZXdGaWxlcyhjb3VudCwgZWxlbWVudCkge1xuICAgIGxldCBmb3JtYXQgPSBlbGVtZW50LnR5cGUuc3BsaXQoXCIvXCIpO1xuICAgIGlmKGZvcm1hdFswXSA9PSAnaW1hZ2UnKSB7XG4gICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIGxldCBpbWFnZVBhdGggPSB0aGlzLmZpbGVzW2NvdW50XTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKHRoaXMuZmlsZXNbY291bnRdKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgICAgIGxldCBpbWdVUkwgPSByZWFkZXIucmVzdWx0O1xuICAgICAgICB0aGlzLmZpbGVzW2NvdW50XS52aWV3VXJsID0gaW1nVVJMO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbGVzW2NvdW50XS52aWV3VXJsID0gbnVsbDtcbiAgICAgIHRoaXMuZmlsZXNbY291bnRdLnZpZXdUZXh0ID0gZm9ybWF0WzFdO1xuICAgIH1cbiAgfVxuXG4gIC8qIENoZWNraW5nIFZhbGlkYXRpb24gKi9cbiAgY2hlY2tpbmdWYWxpZGF0aW9uKGVsZW1lbnQpIHtcbiAgICBsZXQgdmFsaWQ6IGFueSA9IHsgc3RhdHVzOiB0cnVlLCBtZXNzYWdlOiBudWxsIH07XG5cbiAgICAvKiBDaGVja2luZyBGaWxlIEZvcm1hdCAqL1xuICAgIGxldCBmb3JtYXQgPSBlbGVtZW50LnR5cGUuc3BsaXQoXCIvXCIpO1xuICAgIGxldCBjaGVjayA9IHRoaXMuY29uZmlnRGF0YS5mb3JtYXQuaW5jbHVkZXMoZm9ybWF0WzFdKTtcbiAgICBpZiAoY2hlY2sgPT0gZmFsc2UpIHtcbiAgICAgIHZhbGlkLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgdmFsaWQubWVzc2FnZSA9IGZvcm1hdFsxXS50b1VwcGVyQ2FzZSgpICsgXCIgZm9ybWF0IG5vdCBzdXBwb3J0ZWQuXCI7XG4gICAgICB0aGlzLm9wZW5TbmFja0Jhcihmb3JtYXRbMV0udG9VcHBlckNhc2UoKSArIFwiIGZvcm1hdCBub3Qgc3VwcG9ydGVkLlwiLCAnJyk7XG4gICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuXG4gICAgLyogQ2hlY2tpbmcgRmlsZSBzaXplICovXG4gICAgaWYgKGVsZW1lbnQuc2l6ZSAvIDEwMDAgPiB0aGlzLmNvbmZpZ0RhdGEuc2l6ZSkge1xuICAgICAgdmFsaWQuc3RhdHVzID0gZmFsc2U7XG4gICAgICB2YWxpZC5tZXNzYWdlID0gXCJGaWxlIHNpemUgdG9vIGxhcmdlLiBNYXhpbXVtIGZpbGUgc2l6ZSBsaW1pdDogXCIgKyB0aGlzLmNvbmZpZ0RhdGEuc2l6ZSArIFwiIEtCLlwiO1xuICAgICAgdGhpcy5vcGVuU25hY2tCYXIoXCJGaWxlIHNpemUgdG9vIGxhcmdlLiBNYXhpbXVtIGZpbGUgc2l6ZSBsaW1pdDogXCIgKyB0aGlzLmNvbmZpZ0RhdGEuc2l6ZSArIFwiIEtCLlwiLCAnJyk7XG4gICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkLnN0YXR1cyA9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuICB9XG5cbiAgLyogRmlsZSBVcGxvYWQgUHJvY2VzcyAqL1xuICB1cGxvYWRBbGwoZ2V0SW5kZXg6IGFueSA9IG51bGwpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5maWxlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmICh0aGlzLmZpbGVzW2luZGV4XS52YWxpZC5zdGF0dXMgPT0gdHJ1ZSAmJiB0aGlzLmZpbGVzW2luZGV4XS51cGxvYWQuc3RhdHVzICE9ICdjb21wbGV0ZScpIHtcbiAgICAgICAgdGhpcy51cGxvYWRpbmcoaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIFVwbG9hZCAqL1xuICB1cGxvYWRpbmcoaW5kZXgpIHtcbiAgICB2YXIgcG9zdERhdGE6IGFueSA9IHtcbiAgICAgIGZpbGU6IHRoaXMuZmlsZXNbaW5kZXhdLFxuICAgICAgdHlwZTogdGhpcy5jb25maWdEYXRhLnR5cGUsXG4gICAgICBwYXRoOiB0aGlzLmNvbmZpZ0RhdGEucGF0aCxcbiAgICAgIHByZWZpeDogdGhpcy5jb25maWdEYXRhLnByZWZpeCxcbiAgICAgIHVwbG9hZFR5cGU6IHRoaXMuY29uZmlnRGF0YS51cGxvYWRUeXBlXG4gICAgfVxuXG4gICAgdmFyIHVybDogc3RyaW5nID0gdGhpcy5jb25maWdEYXRhLmJhc2VVcmwgKyB0aGlzLmNvbmZpZ0RhdGEuZW5kcG9pbnQgKyAnP3BhdGg9JyArIHRoaXMuY29uZmlnRGF0YS5wYXRoICsgJyZwcmVmaXg9JyArIHRoaXMuY29uZmlnRGF0YS5wcmVmaXggKyAnJnR5cGU9JyArIHRoaXMuY29uZmlnRGF0YS50eXBlICsgJyZyYW5kPScgKyBpbmRleDtcbiAgICB0aGlzLmZpbGVVcGxvYWRTZXJ2aWNlLnVwbG9hZCh1cmwsIHBvc3REYXRhKS5zdWJzY3JpYmUoXG4gICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0gcmVzcG9uc2U7XG4gICAgICAgIHN3aXRjaCAocmVzdWx0LnN0YXR1cykge1xuICAgICAgICAgIGNhc2UgJ2NvbXBsZXRlJzpcbiAgICAgICAgICAgIHRoaXMuZmlsZXNbaW5kZXhdLnVwbG9hZCA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnRGF0YS5maWxlcyA9IHRoaXMuZmlsZXM7XG4gICAgICAgICAgICB0aGlzLm9wZW5TbmFja0JhcignU3VjY2Vzc2Z1bGx5IFVwbG9hZGVkICEhJywgJ1VuZG8nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgIHRoaXMuZmlsZXNbaW5kZXhdLnVwbG9hZCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgdGhpcy5vcGVuU25hY2tCYXIocmVzdWx0LmRhdGEsICcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLmZpbGVzW2luZGV4XS51cGxvYWQgPSByZXN1bHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICB0aGlzLmZpbGVzW2luZGV4XSA9IHsgc3RhdHVzOiAnZXJyb3InIH07XG4gICAgICAgIHRoaXMub3BlblNuYWNrQmFyKCdBbiBlcnJvciBvY2N1cnJlZCAhIScsICdSZXRyeScpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKiBSZW1vdmUgRmlsZXMgKi9cbiAgcmVtb3ZlRmlsZXMoaW5kZXg6IGFueSA9IG51bGwpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coKTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLmZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMub3BlblNuYWNrQmFyKCdTdWNjZXNzZnVsbHkgUmVtb3ZlICEhJywgJycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyogU25hY2sgQmFyICovbmFtZVxuICBvcGVuU25hY2tCYXIobWVzc2FnZTogc3RyaW5nLCBhY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMuX3NuYWNrQmFyLm9wZW4obWVzc2FnZSwgYWN0aW9uLCB7XG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qIERpYWxvZyBCb3ggKi9cbiAgb3BlbkRpYWxvZygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRGlhbG9nQm94Q29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzI1MHB4JyxcbiAgICAgIGRhdGE6IHsgbWVzc2FnZTogXCJNZXNzYWdlXCIgfVxuICAgIH0pO1xuICB9XG5cbiAgLyogRGVsZXRlIGFsbCBzZWxlY3RlZCBmaWxlcyAqL1xuICBkZWxldGVBbGwoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKCk7XG4gICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5maWxlcy5zcGxpY2UoMCwgdGhpcy5maWxlcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLm9wZW5TbmFja0JhcignU3VjY2Vzc2Z1bGx5IFJlbW92ZSAhIScsICcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qIFByZXZpZXcgRmlsZXMgKi9cbiAgcHJldmlld0ZpbGVzKGluZGV4KSB7XG4gICAgdmFyIG1pbWVUeXBlID0gdGhpcy5maWxlc1tpbmRleF0udHlwZTtcbiAgICBpZiAobWltZVR5cGUubWF0Y2goL2ltYWdlXFwvKi8pID09IG51bGwpIHtcbiAgICAgIHRoaXMub3BlblNuYWNrQmFyKCdQcmV2aWV3IG5vdCBzdXBwb3J0ZWQuJywgJycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGxldCBpbWFnZVBhdGggPSB0aGlzLmZpbGVzW2luZGV4XTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCh0aGlzLmZpbGVzW2luZGV4XSk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IChfZXZlbnQpID0+IHtcbiAgICAgIGxldCBpbWdVUkwgPSByZWFkZXIucmVzdWx0O1xuICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQcmV2aWV3RmlsZXNDb21wb25lbnQsIHtcbiAgICAgICAgZGF0YTogeyBpbWdVUkw6IGltZ1VSTCB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIl19