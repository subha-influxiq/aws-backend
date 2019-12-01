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
export class FileUploadComponent {
    /**
     * @param {?} formBuilder
     * @param {?} fileUploadService
     * @param {?} ActivatedRoute
     * @param {?} router
     * @param {?} _snackBar
     * @param {?} dialog
     */
    constructor(formBuilder, fileUploadService, ActivatedRoute, router, _snackBar, dialog) {
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
    /**
     * @param {?} getConfig
     * @return {?}
     */
    set config(getConfig) {
        this.configData = getConfig;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /* Select File Proccess */
    /**
     * @param {?} event
     * @return {?}
     */
    selectFiles(event) {
        this.loading = true;
        for (let index = 0; index < event.length; index++) {
            /** @type {?} */
            var count = this.files.length;
            /** @type {?} */
            const element = event[index];
            /* Checking Validation */
            /** @type {?} */
            let validate = this.checkingValidation(element);
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
                let format = element.type.split("/");
                element.viewText = format[1];
                this.files.push(element);
            }
        }
    }
    /**
     * @param {?} count
     * @param {?} element
     * @return {?}
     */
    viewFiles(count, element) {
        /** @type {?} */
        let format = element.type.split("/");
        if (format[0] == 'image') {
            /** @type {?} */
            var reader = new FileReader();
            /** @type {?} */
            let imagePath = this.files[count];
            reader.readAsDataURL(this.files[count]);
            reader.onload = (/**
             * @param {?} _event
             * @return {?}
             */
            (_event) => {
                /** @type {?} */
                let imgURL = reader.result;
                this.files[count].viewUrl = imgURL;
            });
        }
        else {
            this.files[count].viewUrl = null;
            this.files[count].viewText = format[1];
        }
    }
    /* Checking Validation */
    /**
     * @param {?} element
     * @return {?}
     */
    checkingValidation(element) {
        /** @type {?} */
        let valid = { status: true, message: null };
        /* Checking File Format */
        /** @type {?} */
        let format = element.type.split("/");
        /** @type {?} */
        let check = this.configData.format.includes(format[1]);
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
    }
    /* File Upload Process */
    /**
     * @param {?=} getIndex
     * @return {?}
     */
    uploadAll(getIndex = null) {
        for (let index = 0; index < this.files.length; index++) {
            if (this.files[index].valid.status == true && this.files[index].upload.status != 'complete') {
                this.uploading(index);
            }
        }
    }
    /* Upload */
    /**
     * @param {?} index
     * @return {?}
     */
    uploading(index) {
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
        (response) => {
            /** @type {?} */
            let result = response;
            switch (result.status) {
                case 'complete':
                    this.files[index].upload = result;
                    this.configData.files = this.files;
                    this.openSnackBar('Successfully Uploaded !!', 'Undo');
                    break;
                case 'error':
                    this.files[index].upload = result.data;
                    this.openSnackBar(result.data, '');
                    break;
                default:
                    this.files[index].upload = result;
                    break;
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            this.files[index] = { status: 'error' };
            this.openSnackBar('An error occurred !!', 'Retry');
        }));
    }
    /* Remove Files */
    /**
     * @param {?=} index
     * @return {?}
     */
    removeFiles(index = null) {
        this.openDialog();
        this.dialogRef.afterClosed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            if (result) {
                this.files.splice(index, 1);
                this.openSnackBar('Successfully Remove !!', '');
            }
        }));
    }
    /**
     * @param {?} message
     * @param {?} action
     * @return {?}
     */
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }
    /* Dialog Box */
    /**
     * @return {?}
     */
    openDialog() {
        this.dialogRef = this.dialog.open(DialogBoxComponent, {
            width: '250px',
            data: { message: "Message" }
        });
    }
    /* Delete all selected files */
    /**
     * @return {?}
     */
    deleteAll() {
        this.openDialog();
        this.dialogRef.afterClosed().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            if (result) {
                this.files.splice(0, this.files.length);
                this.openSnackBar('Successfully Remove !!', '');
            }
        }));
    }
    /* Preview Files */
    /**
     * @param {?} index
     * @return {?}
     */
    previewFiles(index) {
        /** @type {?} */
        var mimeType = this.files[index].type;
        if (mimeType.match(/image\/*/) == null) {
            this.openSnackBar('Preview not supported.', '');
            return;
        }
        /** @type {?} */
        var reader = new FileReader();
        /** @type {?} */
        let imagePath = this.files[index];
        reader.readAsDataURL(this.files[index]);
        reader.onload = (/**
         * @param {?} _event
         * @return {?}
         */
        (_event) => {
            /** @type {?} */
            let imgURL = reader.result;
            /** @type {?} */
            const dialogRef = this.dialog.open(PreviewFilesComponent, {
                data: { imgURL: imgURL }
            });
        });
    }
}
FileUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-file-upload',
                template: "<!-- File Upload -->\n<div class=\"uploadfilecontainer\" (click)=\"fileInput.click()\" libDragDrop (onFileDropped)=\"selectFiles($event)\">\n    <input hidden type=\"file\" #fileInput (change)=\"selectFiles($event.target.files)\" multiple>\n    <div class=\"uploadtextwrapper\">\n        <h2>Drag and Drop Files</h2>\n        <p>Supported Formats:\n            <ng-container *ngFor=\"let val of configData.format; let i = index\">\n                {{ val }}<ng-container *ngIf=\"i + 1 < configData.format.length\">,</ng-container>\n            </ng-container>\n        </p>\n        <p>MAX Size: {{ configData.size / 1024 | number: '.1-2' }} MB</p>\n    </div>\n</div>\n\n<div class=\"button-group\" *ngIf=\"files.length > 0\">\n    <button mat-raised-button color=\"primary\" type=\"button\" (click)=\"uploadAll();\">Upload All</button>\n    <button mat-raised-button color=\"warn\" type=\"button\" (click)=\"deleteAll();\">Delete All</button>\n</div>\n\n<div class=\"files-view\">\n    <!-- View Files -->\n    <mat-card class=\"example-card\" *ngFor=\"let file of files; let i = index;\">\n        <span class=\"viewUrlwrapper\">\n            <div *ngIf=\"file.viewUrl == null\" (click)=\"previewFiles(i);\" class=\"othersFilePreview\"> <h2 style=\"color:white; font-weight: bold;\">{{ file.viewText | uppercase }}</h2></div>\n            <img mat-card-image *ngIf=\"file.viewUrl != null\" [src]=\"file.viewUrl\" alt=\"{{ file.name }}\" (click)=\"previewFiles(i);\" />\n        </span>\n        <span class=\"viewUrlcontent\">\n            <mat-card-header>\n                <mat-card-title>{{ file.name }}</mat-card-title>\n                <mat-card-subtitle class=\"fileDescription\">Type: {{ file.type }}, Size:\n                    <ng-container *ngIf=\"file.size / 1000 > 999\">\n                        {{ file.size / 1000 / 1000 | number: '.1-2' }} MB\n                    </ng-container>\n                    <ng-container *ngIf=\"file.size / 1000 < 1000\">\n                        {{ file.size / 1000 | number: '.1-2' }} KB\n                    </ng-container>\n                </mat-card-subtitle>\n                <mat-card-subtitle class=\"error\" *ngIf=\"file.valid.status == false\">{{ file.valid.message }}\n                </mat-card-subtitle>\n            </mat-card-header>\n\n            <mat-card-content>\n                <mat-progress-bar mode=\"determinate\" *ngIf=\"file.upload.status == 'progress'\"\n                    value=\"{{ file.upload.data.percentage }}\"></mat-progress-bar>\n                <mat-progress-bar mode=\"indeterminate\" *ngIf=\"file.upload.status == 'waiting'\"></mat-progress-bar>\n            </mat-card-content>\n\n            <mat-card-actions>\n                <!-- <button mat-raised-button matTooltip=\"Preview\" *ngIf=\"file.valid.status == true\" aria-label=\"Preview\" (click)=\"previewFiles(i);\">Preview</button> -->\n\n                <button mat-raised-button color=\"primary\" type=\"button\"\n                    *ngIf=\"file.valid.status == true && file.upload.status != 'complete'\" matTooltip=\"Upload\"\n                    aria-label=\"Upload\" (click)=\"uploading(i);\">Upload</button>\n                <button mat-raised-button type=\"button\" disabled *ngIf=\"file.upload.status == 'complete'\">Upload Complete</button>\n\n                <button mat-raised-button type=\"button\" color=\"warn\" matTooltip=\"Remove\" aria-label=\"Remove\"\n                    (click)=\"removeFiles(i);\">Remove</button>\n            </mat-card-actions>\n        </span>\n    </mat-card>\n</div>",
                styles: [".uploadfilecontainer{background-repeat:no-repeat;background-size:100px;background-position:center;height:200px;width:80%;margin:20px auto;border:2px dashed #1c8adb;border-radius:10px;text-align:center;display:flex;justify-content:center;align-items:center}.uploadfilecontainer:hover{cursor:pointer;background-color:#9ecbec!important;opacity:.8}.button-group{background-repeat:no-repeat;background-size:100px;background-position:center;height:40px;width:80%;margin:20px auto;border-radius:10px}.error.mat-card-subtitle{color:#a00;text-align:left}.example-card{margin:6px auto auto;max-width:100%}.example-header-image{background-image:url(https://material.angular.io/assets/img/examples/shiba1.jpg);background-size:cover}.progress-bar{margin-top:24px}.file-div{background-color:#dedddc;margin-top:6px}.othersFilePreview{background-color:#8a2be2;height:100%;width:100%;text-align:center;justify-content:center;align-items:center;display:flex}.fileDescription{text-align:left}.files-view{background-repeat:no-repeat;background-size:cover;background-position:center;height:auto!important;width:82%;margin:20px auto;border-radius:10px;display:flex;justify-content:center;align-items:stretch;flex-wrap:wrap}.files-view .mat-card{position:relative;z-index:9;flex:1 1 28.33%;margin:10px!important;display:flex;flex-wrap:wrap}.viewUrlwrapper{height:160px;width:100%;overflow:hidden;position:relative}.viewUrlwrapper img{max-width:100%;-o-object-fit:cover;object-fit:cover;margin:0 auto;z-index:99;position:relative;max-width:100%;width:initial;display:block;margin-top:-46px!important}.viewUrlcontent{display:block;justify-content:center;align-items:stretch;flex-wrap:wrap;flex:1 1 100%}.viewUrlcontent .mat-card-header{display:flex;flex-direction:row;flex:1 1 100%;justify-content:center;text-align:center;flex-wrap:wrap}.viewUrlcontent .mat-progress-bar{margin-bottom:5px}.viewUrlcontent .mat-card-header .mat-card-header-text{margin:10px;width:100%}.viewUrlcontent .mat-card-header .mat-card-header-text .mat-card-title{width:100%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;line-height:19px;max-height:40px;-webkit-line-clamp:2}.mat-typography .mat-card-image{width:inherit!important;margin:0!important}"]
            }] }
];
/** @nocollapse */
FileUploadComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: FileUploadService },
    { type: ActivatedRoute },
    { type: Router },
    { type: MatSnackBar },
    { type: MatDialog }
];
FileUploadComponent.propDecorators = {
    config: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmlsZS11cGxvYWQvIiwic291cmNlcyI6WyJsaWIvZmlsZS11cGxvYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixLQUFLLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBc0MsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsU0FBUyxFQUFpQyxNQUFNLDBCQUEwQixDQUFDO0FBU3BGLE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7OztJQWtCOUIsWUFBb0IsV0FBd0IsRUFBVSxpQkFBb0MsRUFDaEYsY0FBOEIsRUFBVSxNQUFjLEVBQVUsU0FBc0IsRUFDdkYsTUFBaUI7UUFGTixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDaEYsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdkYsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQWxCbkIsYUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUIsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUV2QixjQUFTLEdBQVcsQ0FBQyxD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SyxDQUFDLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsTUFBTTs7OztRQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7O2dCQUNyQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07O2tCQUNwQixTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQ3hELElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7YUFDekIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO0lBQ0gsQ0FBQzs7O1lBdk1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiwrK0dBQXlDOzthQUUxQzs7OztZQWZRLFdBQVc7WUFFWCxpQkFBaUI7WUFDakIsY0FBYztZQUFFLE1BQU07WUFDdEIsV0FBVztZQUlYLFNBQVM7OztxQkFzQmYsS0FBSzs7OztJQVhOLHVDQUFpQzs7SUFDakMsb0NBQXVCOztJQUN2QiwyQ0FBOEI7O0lBQzlCLHlDQUF1Qjs7SUFDdkIsd0NBQTZCOztJQUM3Qix3Q0FBc0I7O0lBQ3RCLHNDQUFnQzs7SUFFaEMsc0RBQStCOztJQUMvQixxREFBOEI7O0lBMklmLG1DQUFJOzs7OztJQXBJUCwwQ0FBZ0M7Ozs7O0lBQUUsZ0RBQTRDOzs7OztJQUN4Riw2Q0FBc0M7Ozs7O0lBQUUscUNBQXNCOzs7OztJQUFFLHdDQUE4Qjs7SUFDOUYscUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQsIFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRXJyb3JTdGF0ZU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IEZpbGVVcGxvYWRTZXJ2aWNlIH0gZnJvbSAnLi9maWxlLXVwbG9hZC5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHsgQWxlcnRNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvYWxlcnQtbWVzc2FnZS9hbGVydC1tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dCb3hDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9kaWFsb2ctYm94L2RpYWxvZy1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IFByZXZpZXdGaWxlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L3ByZXZpZXctZmlsZXMvcHJldmlldy1maWxlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1maWxlLXVwbG9hZCcsXG4gIHRlbXBsYXRlVXJsOiAnZmlsZS11cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc3R5bGUuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgcHVibGljIGZpbGVzOiBhbnkgPSBbXTtcbiAgcHVibGljIGZpbGVzUHJvY2VzczogYW55ID0gW107XG4gIHB1YmxpYyBjb25maWdEYXRhOiBhbnk7XG4gIHB1YmxpYyB0b3RhbEZpbGU6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkaWFsb2dSZWY6IGFueTtcbiAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBpbWdSZXN1bHRCZWZvcmVDb21wcmVzczpzdHJpbmc7XG4gIGltZ1Jlc3VsdEFmdGVyQ29tcHJlc3M6c3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb25maWcoZ2V0Q29uZmlnOiBhbnkpIHtcbiAgICB0aGlzLmNvbmZpZ0RhdGEgPSBnZXRDb25maWc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBmaWxlVXBsb2FkU2VydmljZTogRmlsZVVwbG9hZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBBY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3NuYWNrQmFyOiBNYXRTbmFja0JhcixcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgLyogU2VsZWN0IEZpbGUgUHJvY2Nlc3MgKi9cbiAgc2VsZWN0RmlsZXMoZXZlbnQpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBldmVudC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjb3VudDogbnVtYmVyID0gdGhpcy5maWxlcy5sZW5ndGg7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZXZlbnRbaW5kZXhdO1xuXG4gICAgICAvKiBDaGVja2luZyBWYWxpZGF0aW9uICovXG4gICAgICBsZXQgdmFsaWRhdGU6IGFueSA9IHRoaXMuY2hlY2tpbmdWYWxpZGF0aW9uKGVsZW1lbnQpO1xuICAgICAgaWYgKHZhbGlkYXRlLnN0YXR1cykge1xuICAgICAgICBlbGVtZW50LnZhbGlkID0geyBzdGF0dXM6IHRydWUgfTtcbiAgICAgICAgZWxlbWVudC51cGxvYWQgPSB7IHN0YXR1czogJ3NlbGVjdGVkJyB9O1xuICAgICAgICBlbGVtZW50LnZpZXdVcmwgPSAnaHR0cHM6Ly9sb2FkaW5nLmlvL3NwaW5uZXJzL2R1YWwtcmluZy9sZy5kdWFsLXJpbmctbG9hZGVyLmdpZic7XG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChlbGVtZW50KTtcbiAgICAgICAgdGhpcy52aWV3RmlsZXMoY291bnQsIGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC52YWxpZCA9IHsgc3RhdHVzOiBmYWxzZSwgbWVzc2FnZTogdmFsaWRhdGUubWVzc2FnZSB9O1xuICAgICAgICBlbGVtZW50LnVwbG9hZCA9IHsgc3RhdHVzOiAnc2VsZWN0ZWQnIH07XG4gICAgICAgIGVsZW1lbnQudmlld1VybCA9IG51bGw7XG5cbiAgICAgICAgbGV0IGZvcm1hdCA9IGVsZW1lbnQudHlwZS5zcGxpdChcIi9cIik7XG4gICAgICAgIGVsZW1lbnQudmlld1RleHQgPSBmb3JtYXRbMV07XG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2aWV3RmlsZXMoY291bnQsIGVsZW1lbnQpIHtcbiAgICBsZXQgZm9ybWF0ID0gZWxlbWVudC50eXBlLnNwbGl0KFwiL1wiKTtcbiAgICBpZihmb3JtYXRbMF0gPT0gJ2ltYWdlJykge1xuICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICBsZXQgaW1hZ2VQYXRoID0gdGhpcy5maWxlc1tjb3VudF07XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTCh0aGlzLmZpbGVzW2NvdW50XSk7XG4gICAgICByZWFkZXIub25sb2FkID0gKF9ldmVudCkgPT4ge1xuICAgICAgICBsZXQgaW1nVVJMID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgdGhpcy5maWxlc1tjb3VudF0udmlld1VybCA9IGltZ1VSTDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWxlc1tjb3VudF0udmlld1VybCA9IG51bGw7XG4gICAgICB0aGlzLmZpbGVzW2NvdW50XS52aWV3VGV4dCA9IGZvcm1hdFsxXTtcbiAgICB9XG4gIH1cblxuICAvKiBDaGVja2luZyBWYWxpZGF0aW9uICovXG4gIGNoZWNraW5nVmFsaWRhdGlvbihlbGVtZW50KSB7XG4gICAgbGV0IHZhbGlkOiBhbnkgPSB7IHN0YXR1czogdHJ1ZSwgbWVzc2FnZTogbnVsbCB9O1xuXG4gICAgLyogQ2hlY2tpbmcgRmlsZSBGb3JtYXQgKi9cbiAgICBsZXQgZm9ybWF0ID0gZWxlbWVudC50eXBlLnNwbGl0KFwiL1wiKTtcbiAgICBsZXQgY2hlY2sgPSB0aGlzLmNvbmZpZ0RhdGEuZm9ybWF0LmluY2x1ZGVzKGZvcm1hdFsxXSk7XG4gICAgaWYgKGNoZWNrID09IGZhbHNlKSB7XG4gICAgICB2YWxpZC5zdGF0dXMgPSBmYWxzZTtcbiAgICAgIHZhbGlkLm1lc3NhZ2UgPSBmb3JtYXRbMV0udG9VcHBlckNhc2UoKSArIFwiIGZvcm1hdCBub3Qgc3VwcG9ydGVkLlwiO1xuICAgICAgdGhpcy5vcGVuU25hY2tCYXIoZm9ybWF0WzFdLnRvVXBwZXJDYXNlKCkgKyBcIiBmb3JtYXQgbm90IHN1cHBvcnRlZC5cIiwgJycpO1xuICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cblxuICAgIC8qIENoZWNraW5nIEZpbGUgc2l6ZSAqL1xuICAgIGlmIChlbGVtZW50LnNpemUgLyAxMDAwID4gdGhpcy5jb25maWdEYXRhLnNpemUpIHtcbiAgICAgIHZhbGlkLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgdmFsaWQubWVzc2FnZSA9IFwiRmlsZSBzaXplIHRvbyBsYXJnZS4gTWF4aW11bSBmaWxlIHNpemUgbGltaXQ6IFwiICsgdGhpcy5jb25maWdEYXRhLnNpemUgKyBcIiBLQi5cIjtcbiAgICAgIHRoaXMub3BlblNuYWNrQmFyKFwiRmlsZSBzaXplIHRvbyBsYXJnZS4gTWF4aW11bSBmaWxlIHNpemUgbGltaXQ6IFwiICsgdGhpcy5jb25maWdEYXRhLnNpemUgKyBcIiBLQi5cIiwgJycpO1xuICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cblxuICAgIGlmICh2YWxpZC5zdGF0dXMgPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cbiAgfVxuXG4gIC8qIEZpbGUgVXBsb2FkIFByb2Nlc3MgKi9cbiAgdXBsb2FkQWxsKGdldEluZGV4OiBhbnkgPSBudWxsKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAodGhpcy5maWxlc1tpbmRleF0udmFsaWQuc3RhdHVzID09IHRydWUgJiYgdGhpcy5maWxlc1tpbmRleF0udXBsb2FkLnN0YXR1cyAhPSAnY29tcGxldGUnKSB7XG4gICAgICAgIHRoaXMudXBsb2FkaW5nKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiBVcGxvYWQgKi9cbiAgdXBsb2FkaW5nKGluZGV4KSB7XG4gICAgdmFyIHBvc3REYXRhOiBhbnkgPSB7XG4gICAgICBmaWxlOiB0aGlzLmZpbGVzW2luZGV4XSxcbiAgICAgIHR5cGU6IHRoaXMuY29uZmlnRGF0YS50eXBlLFxuICAgICAgcGF0aDogdGhpcy5jb25maWdEYXRhLnBhdGgsXG4gICAgICBwcmVmaXg6IHRoaXMuY29uZmlnRGF0YS5wcmVmaXgsXG4gICAgICB1cGxvYWRUeXBlOiB0aGlzLmNvbmZpZ0RhdGEudXBsb2FkVHlwZVxuICAgIH1cblxuICAgIHZhciB1cmw6IHN0cmluZyA9IHRoaXMuY29uZmlnRGF0YS5iYXNlVXJsICsgdGhpcy5jb25maWdEYXRhLmVuZHBvaW50ICsgJz9wYXRoPScgKyB0aGlzLmNvbmZpZ0RhdGEucGF0aCArICcmcHJlZml4PScgKyB0aGlzLmNvbmZpZ0RhdGEucHJlZml4ICsgJyZ0eXBlPScgKyB0aGlzLmNvbmZpZ0RhdGEudHlwZSArICcmcmFuZD0nICsgaW5kZXg7XG4gICAgdGhpcy5maWxlVXBsb2FkU2VydmljZS51cGxvYWQodXJsLCBwb3N0RGF0YSkuc3Vic2NyaWJlKFxuICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHJlc3BvbnNlO1xuICAgICAgICBzd2l0Y2ggKHJlc3VsdC5zdGF0dXMpIHtcbiAgICAgICAgICBjYXNlICdjb21wbGV0ZSc6XG4gICAgICAgICAgICB0aGlzLmZpbGVzW2luZGV4XS51cGxvYWQgPSByZXN1bHQ7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ0RhdGEuZmlsZXMgPSB0aGlzLmZpbGVzO1xuICAgICAgICAgICAgdGhpcy5vcGVuU25hY2tCYXIoJ1N1Y2Nlc3NmdWxseSBVcGxvYWRlZCAhIScsICdVbmRvJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICB0aGlzLmZpbGVzW2luZGV4XS51cGxvYWQgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIHRoaXMub3BlblNuYWNrQmFyKHJlc3VsdC5kYXRhLCAnJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5maWxlc1tpbmRleF0udXBsb2FkID0gcmVzdWx0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5maWxlc1tpbmRleF0gPSB7IHN0YXR1czogJ2Vycm9yJyB9O1xuICAgICAgICB0aGlzLm9wZW5TbmFja0JhcignQW4gZXJyb3Igb2NjdXJyZWQgISEnLCAnUmV0cnknKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyogUmVtb3ZlIEZpbGVzICovXG4gIHJlbW92ZUZpbGVzKGluZGV4OiBhbnkgPSBudWxsKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKCk7XG4gICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLm9wZW5TbmFja0JhcignU3VjY2Vzc2Z1bGx5IFJlbW92ZSAhIScsICcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qIFNuYWNrIEJhciAqL25hbWVcbiAgb3BlblNuYWNrQmFyKG1lc3NhZ2U6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuKG1lc3NhZ2UsIGFjdGlvbiwge1xuICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgfSk7XG4gIH1cblxuICAvKiBEaWFsb2cgQm94ICovXG4gIG9wZW5EaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERpYWxvZ0JveENvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICcyNTBweCcsXG4gICAgICBkYXRhOiB7IG1lc3NhZ2U6IFwiTWVzc2FnZVwiIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qIERlbGV0ZSBhbGwgc2VsZWN0ZWQgZmlsZXMgKi9cbiAgZGVsZXRlQWxsKCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMuZmlsZXMuc3BsaWNlKDAsIHRoaXMuZmlsZXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5vcGVuU25hY2tCYXIoJ1N1Y2Nlc3NmdWxseSBSZW1vdmUgISEnLCAnJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiBQcmV2aWV3IEZpbGVzICovXG4gIHByZXZpZXdGaWxlcyhpbmRleCkge1xuICAgIHZhciBtaW1lVHlwZSA9IHRoaXMuZmlsZXNbaW5kZXhdLnR5cGU7XG4gICAgaWYgKG1pbWVUeXBlLm1hdGNoKC9pbWFnZVxcLyovKSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm9wZW5TbmFja0JhcignUHJldmlldyBub3Qgc3VwcG9ydGVkLicsICcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBsZXQgaW1hZ2VQYXRoID0gdGhpcy5maWxlc1tpbmRleF07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwodGhpcy5maWxlc1tpbmRleF0pO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgICBsZXQgaW1nVVJMID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUHJldmlld0ZpbGVzQ29tcG9uZW50LCB7XG4gICAgICAgIGRhdGE6IHsgaW1nVVJMOiBpbWdVUkwgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==