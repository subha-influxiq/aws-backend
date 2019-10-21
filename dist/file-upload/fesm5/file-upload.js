import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClient, HttpHeaders, HttpEventType, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule, Directive, Output, EventEmitter, HostBinding, HostListener, Component, Inject, Input, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileUploadService = /** @class */ (function () {
    function FileUploadService(httpClient) {
        this.httpClient = httpClient;
        this.BASE_URL = "http://3.15.236.141:5005/uploads";
    }
    /* Upload Function */
    /* Upload Function */
    /**
     * @param {?} uploadURL
     * @param {?} data
     * @return {?}
     */
    FileUploadService.prototype.upload = /* Upload Function */
    /**
     * @param {?} uploadURL
     * @param {?} data
     * @return {?}
     */
    function (uploadURL, data) {
        /** @type {?} */
        var formData = new FormData();
        formData.append('file', data.file);
        formData.append('type', data.type);
        formData.append('path', data.path);
        formData.append('prefix', data.prefix);
        return this.httpClient.post(uploadURL, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    /** @type {?} */
                    var percentage = Math.round(100 * event.loaded / event.total);
                    if (percentage >= 0 && percentage <= 100) {
                        return { status: 'progress', data: { totalData: event.total, loadedData: event.loaded, percentage: percentage } };
                    }
                    else {
                        return { status: 'complete', data: null };
                    }
                case HttpEventType.Response:
                    if (event.body.status == 'success') {
                        return { status: 'complete', data: event.body };
                    }
                    else {
                        return { status: 'error', data: 'An error occord.' };
                    }
                default:
                    return { status: 'waiting', data: '' };
                    return "Unhandled event: " + event.type;
            }
        })));
    };
    /**
     * @param {?} uploadURL
     * @param {?} data
     * @return {?}
     */
    FileUploadService.prototype.uploadBase64 = /**
     * @param {?} uploadURL
     * @param {?} data
     * @return {?}
     */
    function (uploadURL, data) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.post(uploadURL, data, httpOptions);
    };
    FileUploadService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FileUploadService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ FileUploadService.ngInjectableDef = defineInjectable({ factory: function FileUploadService_Factory() { return new FileUploadService(inject(HttpClient)); }, token: FileUploadService, providedIn: "root" });
    return FileUploadService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(formBuilder, fileUploadService, ActivatedRoute$$1, router, _snackBar, dialog) {
        this.formBuilder = formBuilder;
        this.fileUploadService = fileUploadService;
        this.ActivatedRoute = ActivatedRoute$$1;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule.decorators = [
        { type: NgModule, args: [{
                    exports: [
                        A11yModule,
                        CdkStepperModule,
                        CdkTableModule,
                        CdkTreeModule,
                        DragDropModule,
                        MatAutocompleteModule,
                        MatBadgeModule,
                        MatBottomSheetModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatChipsModule,
                        MatStepperModule,
                        MatDatepickerModule,
                        MatDialogModule,
                        MatDividerModule,
                        MatExpansionModule,
                        MatGridListModule,
                        MatIconModule,
                        MatInputModule,
                        MatListModule,
                        MatMenuModule,
                        MatNativeDateModule,
                        MatPaginatorModule,
                        MatProgressBarModule,
                        MatProgressSpinnerModule,
                        MatRadioModule,
                        MatRippleModule,
                        MatSelectModule,
                        MatSidenavModule,
                        MatSliderModule,
                        MatSlideToggleModule,
                        MatSnackBarModule,
                        MatSortModule,
                        MatTableModule,
                        MatTabsModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        MatTreeModule,
                        PortalModule,
                        ScrollingModule,
                    ]
                },] }
    ];
    return MaterialModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DragDropDirective = /** @class */ (function () {
    function DragDropDirective() {
        this.onFileDropped = new EventEmitter();
        this.background = '#f5fcff';
        this.opacity = '1';
    }
    //Dragover listener
    //Dragover listener
    /**
     * @param {?} evt
     * @return {?}
     */
    DragDropDirective.prototype.onDragOver = 
    //Dragover listener
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8';
    };
    //Dragleave listener
    //Dragleave listener
    /**
     * @param {?} evt
     * @return {?}
     */
    DragDropDirective.prototype.onDragLeave = 
    //Dragleave listener
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
    };
    //Drop listener
    //Drop listener
    /**
     * @param {?} evt
     * @return {?}
     */
    DragDropDirective.prototype.ondrop = 
    //Drop listener
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
        /** @type {?} */
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.onFileDropped.emit(files);
        }
    };
    DragDropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[libDragDrop]'
                },] }
    ];
    DragDropDirective.propDecorators = {
        onFileDropped: [{ type: Output }],
        background: [{ type: HostBinding, args: ['style.background-color',] }],
        opacity: [{ type: HostBinding, args: ['style.opacity',] }],
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        ondrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return DragDropDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertMessageComponent = /** @class */ (function () {
    function AlertMessageComponent() {
    }
    /**
     * @return {?}
     */
    AlertMessageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    AlertMessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-alert-message',
                    template: "<span class=\"example-pizza-party\">\n  An error occurred.\n</span>",
                    styles: [".example-pizza-party{color:#ff69b4}"]
                }] }
    ];
    /** @nocollapse */
    AlertMessageComponent.ctorParameters = function () { return []; };
    return AlertMessageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileUploadModule = /** @class */ (function () {
    function FileUploadModule() {
    }
    FileUploadModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FileUploadComponent,
                        DragDropDirective,
                        AlertMessageComponent,
                        DialogBoxComponent,
                        PreviewFilesComponent
                    ],
                    imports: [
                        BrowserModule,
                        MaterialModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule
                    ],
                    providers: [],
                    exports: [FileUploadComponent],
                    entryComponents: [
                        AlertMessageComponent,
                        DialogBoxComponent,
                        PreviewFilesComponent
                    ]
                },] }
    ];
    return FileUploadModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FileUploadService, FileUploadComponent, FileUploadModule, MaterialModule as ɵe, AlertMessageComponent as ɵb, DialogBoxComponent as ɵc, PreviewFilesComponent as ɵd, DragDropDirective as ɵa };

//# sourceMappingURL=file-upload.js.map