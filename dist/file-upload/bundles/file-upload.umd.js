(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('@angular/router'), require('@angular/platform-browser'), require('@angular/forms'), require('@angular/cdk/a11y'), require('@angular/cdk/drag-drop'), require('@angular/cdk/portal'), require('@angular/cdk/scrolling'), require('@angular/cdk/stepper'), require('@angular/cdk/table'), require('@angular/cdk/tree'), require('@angular/material/autocomplete'), require('@angular/material/badge'), require('@angular/material/bottom-sheet'), require('@angular/material/button'), require('@angular/material/button-toggle'), require('@angular/material/card'), require('@angular/material/checkbox'), require('@angular/material/chips'), require('@angular/material/stepper'), require('@angular/material/datepicker'), require('@angular/material/dialog'), require('@angular/material/divider'), require('@angular/material/expansion'), require('@angular/material/grid-list'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/list'), require('@angular/material/menu'), require('@angular/material/core'), require('@angular/material/paginator'), require('@angular/material/progress-bar'), require('@angular/material/progress-spinner'), require('@angular/material/radio'), require('@angular/material/select'), require('@angular/material/sidenav'), require('@angular/material/slider'), require('@angular/material/slide-toggle'), require('@angular/material/snack-bar'), require('@angular/material/sort'), require('@angular/material/table'), require('@angular/material/tabs'), require('@angular/material/toolbar'), require('@angular/material/tooltip'), require('@angular/material/tree'), require('@angular/common/http'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('file-upload', ['exports', 'rxjs/operators', '@angular/router', '@angular/platform-browser', '@angular/forms', '@angular/cdk/a11y', '@angular/cdk/drag-drop', '@angular/cdk/portal', '@angular/cdk/scrolling', '@angular/cdk/stepper', '@angular/cdk/table', '@angular/cdk/tree', '@angular/material/autocomplete', '@angular/material/badge', '@angular/material/bottom-sheet', '@angular/material/button', '@angular/material/button-toggle', '@angular/material/card', '@angular/material/checkbox', '@angular/material/chips', '@angular/material/stepper', '@angular/material/datepicker', '@angular/material/dialog', '@angular/material/divider', '@angular/material/expansion', '@angular/material/grid-list', '@angular/material/icon', '@angular/material/input', '@angular/material/list', '@angular/material/menu', '@angular/material/core', '@angular/material/paginator', '@angular/material/progress-bar', '@angular/material/progress-spinner', '@angular/material/radio', '@angular/material/select', '@angular/material/sidenav', '@angular/material/slider', '@angular/material/slide-toggle', '@angular/material/snack-bar', '@angular/material/sort', '@angular/material/table', '@angular/material/tabs', '@angular/material/toolbar', '@angular/material/tooltip', '@angular/material/tree', '@angular/common/http', '@angular/core'], factory) :
    (factory((global['file-upload'] = {}),global.rxjs.operators,global.ng.router,global.ng.platformBrowser,global.ng.forms,global.ng.cdk.a11y,global.ng.cdk['drag-drop'],global.ng.cdk.portal,global.ng.cdk.scrolling,global.ng.cdk.stepper,global.ng.cdk.table,global.ng.cdk.tree,global.ng.material.autocomplete,global.ng.material.badge,global.ng.material['bottom-sheet'],global.ng.material.button,global.ng.material['button-toggle'],global.ng.material.card,global.ng.material.checkbox,global.ng.material.chips,global.ng.material.stepper,global.ng.material.datepicker,global.ng.material.dialog,global.ng.material.divider,global.ng.material.expansion,global.ng.material['grid-list'],global.ng.material.icon,global.ng.material.input,global.ng.material.list,global.ng.material.menu,global.ng.material.core,global.ng.material.paginator,global.ng.material['progress-bar'],global.ng.material['progress-spinner'],global.ng.material.radio,global.ng.material.select,global.ng.material.sidenav,global.ng.material.slider,global.ng.material['slide-toggle'],global.ng.material['snack-bar'],global.ng.material.sort,global.ng.material.table,global.ng.material.tabs,global.ng.material.toolbar,global.ng.material.tooltip,global.ng.material.tree,global.ng.common.http,global.ng.core));
}(this, (function (exports,operators,router,platformBrowser,forms,a11y,dragDrop,portal,scrolling,stepper,table,tree,autocomplete,badge,bottomSheet,button,buttonToggle,card,checkbox,chips,stepper$1,datepicker,dialog,divider,expansion,gridList,icon,input,list,menu,core,paginator,progressBar,progressSpinner,radio,select,sidenav,slider,slideToggle,snackBar,sort,table$1,tabs,toolbar,tooltip,tree$1,i1,i0) { 'use strict';

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
                }).pipe(operators.map(( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                    switch (event.type) {
                        case i1.HttpEventType.UploadProgress:
                            /** @type {?} */
                            var percentage = Math.round(100 * event.loaded / event.total);
                            if (percentage >= 0 && percentage <= 100) {
                                return { status: 'progress', data: { totalData: event.total, loadedData: event.loaded, percentage: percentage } };
                            }
                            else {
                                return { status: 'complete', data: null };
                            }
                        case i1.HttpEventType.Response:
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
                    headers: new i1.HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                };
                return this.httpClient.post(uploadURL, data, httpOptions);
            };
        FileUploadService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        FileUploadService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ FileUploadService.ngInjectableDef = i0.defineInjectable({ factory: function FileUploadService_Factory() { return new FileUploadService(i0.inject(i1.HttpClient)); }, token: FileUploadService, providedIn: "root" });
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
            { type: i0.Component, args: [{
                        selector: 'lib-dialog-box',
                        template: "<h1 mat-dialog-title>Are you sure ??</h1>\n<div mat-dialog-actions>\n  <button mat-button type=\"button\" [mat-dialog-close]=\"false\" (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button type=\"button\" [mat-dialog-close]=\"true\" cdkFocusInitial>Yes</button>\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        DialogBoxComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialogRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
            ];
        };
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
            { type: i0.Component, args: [{
                        selector: 'lib-preview-files',
                        template: "<h2 mat-dialog-title>File Preview</h2>\n<mat-dialog-content class=\"mat-typography\">\n  <img mat-card-image [src]=\"this.data.imgURL\" *ngIf=\"this.data.imgURL\">\n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n  <button mat-button type=\"button\" mat-dialog-close>Cancel</button>\n</mat-dialog-actions>",
                        styles: ["img{max-width:100%;max-height:64vh}"]
                    }] }
        ];
        /** @nocollapse */
        PreviewFilesComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialogRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
            ];
        };
        return PreviewFilesComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileUploadComponent = /** @class */ (function () {
        function FileUploadComponent(formBuilder, fileUploadService, ActivatedRoute, router$$1, _snackBar, dialog$$1) {
            this.formBuilder = formBuilder;
            this.fileUploadService = fileUploadService;
            this.ActivatedRoute = ActivatedRoute;
            this.router = router$$1;
            this._snackBar = _snackBar;
            this.dialog = dialog$$1;
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
             */ function (getConfig) {
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
                    reader.onload = ( /**
                     * @param {?} _event
                     * @return {?}
                     */function (_event) {
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
                if (getIndex === void 0) {
                    getIndex = null;
                }
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
                this.fileUploadService.upload(url, postData).subscribe(( /**
                 * @param {?} response
                 * @return {?}
                 */function (response) {
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
                }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
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
                if (index === void 0) {
                    index = null;
                }
                this.openDialog();
                this.dialogRef.afterClosed().subscribe(( /**
                 * @param {?} result
                 * @return {?}
                 */function (result) {
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
                this.dialogRef.afterClosed().subscribe(( /**
                 * @param {?} result
                 * @return {?}
                 */function (result) {
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
                reader.onload = ( /**
                 * @param {?} _event
                 * @return {?}
                 */function (_event) {
                    /** @type {?} */
                    var imgURL = reader.result;
                    /** @type {?} */
                    var dialogRef = _this.dialog.open(PreviewFilesComponent, {
                        data: { imgURL: imgURL }
                    });
                });
            };
        FileUploadComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-file-upload',
                        template: "<!-- File Upload -->\n<div class=\"uploadfilecontainer\" (click)=\"fileInput.click()\" libDragDrop (onFileDropped)=\"selectFiles($event)\">\n    <input hidden type=\"file\" #fileInput (change)=\"selectFiles($event.target.files)\" multiple>\n    <div class=\"uploadtextwrapper\">\n        <h2>Drag and Drop Files</h2>\n        <p>Supported Formats:\n            <ng-container *ngFor=\"let val of configData.format; let i = index\">\n                {{ val }}<ng-container *ngIf=\"i + 1 < configData.format.length\">,</ng-container>\n            </ng-container>\n        </p>\n        <p>MAX Size: {{ configData.size / 1024 | number: '.1-2' }} MB</p>\n    </div>\n</div>\n\n<div class=\"button-group\" *ngIf=\"files.length > 0\">\n    <button mat-raised-button color=\"primary\" type=\"button\" (click)=\"uploadAll();\">Upload All</button>\n    <button mat-raised-button color=\"warn\" type=\"button\" (click)=\"deleteAll();\">Delete All</button>\n</div>\n\n<div class=\"files-view\">\n    <!-- View Files -->\n    <mat-card class=\"example-card\" *ngFor=\"let file of files; let i = index;\">\n        <span class=\"viewUrlwrapper\">\n            <div *ngIf=\"file.viewUrl == null\" (click)=\"previewFiles(i);\" class=\"othersFilePreview\"> <h2 style=\"color:white; font-weight: bold;\">{{ file.viewText | uppercase }}</h2></div>\n            <img mat-card-image *ngIf=\"file.viewUrl != null\" [src]=\"file.viewUrl\" alt=\"{{ file.name }}\" (click)=\"previewFiles(i);\" />\n        </span>\n        <span class=\"viewUrlcontent\">\n            <mat-card-header>\n                <mat-card-title>{{ file.name }}</mat-card-title>\n                <mat-card-subtitle class=\"fileDescription\">Type: {{ file.type }}, Size:\n                    <ng-container *ngIf=\"file.size / 1000 > 999\">\n                        {{ file.size / 1000 / 1000 | number: '.1-2' }} MB\n                    </ng-container>\n                    <ng-container *ngIf=\"file.size / 1000 < 1000\">\n                        {{ file.size / 1000 | number: '.1-2' }} KB\n                    </ng-container>\n                </mat-card-subtitle>\n                <mat-card-subtitle class=\"error\" *ngIf=\"file.valid.status == false\">{{ file.valid.message }}\n                </mat-card-subtitle>\n            </mat-card-header>\n\n            <mat-card-content>\n                <mat-progress-bar mode=\"determinate\" *ngIf=\"file.upload.status == 'progress'\"\n                    value=\"{{ file.upload.data.percentage }}\"></mat-progress-bar>\n                <mat-progress-bar mode=\"indeterminate\" *ngIf=\"file.upload.status == 'waiting'\"></mat-progress-bar>\n            </mat-card-content>\n\n            <mat-card-actions>\n                <!-- <button mat-raised-button matTooltip=\"Preview\" *ngIf=\"file.valid.status == true\" aria-label=\"Preview\" (click)=\"previewFiles(i);\">Preview</button> -->\n\n                <button mat-raised-button color=\"primary\" type=\"button\"\n                    *ngIf=\"file.valid.status == true && file.upload.status != 'complete'\" matTooltip=\"Upload\"\n                    aria-label=\"Upload\" (click)=\"uploading(i);\">Upload</button>\n                <button mat-raised-button type=\"button\" disabled *ngIf=\"file.upload.status == 'complete'\">Upload Complete</button>\n\n                <button mat-raised-button type=\"button\" color=\"warn\" matTooltip=\"Remove\" aria-label=\"Remove\"\n                    (click)=\"removeFiles(i);\">Remove</button>\n            </mat-card-actions>\n        </span>\n    </mat-card>\n</div>",
                        styles: [".uploadfilecontainer{background-repeat:no-repeat;background-size:100px;background-position:center;height:200px;width:80%;margin:20px auto;border:2px dashed #1c8adb;border-radius:10px;text-align:center;display:flex;justify-content:center;align-items:center}.uploadfilecontainer:hover{cursor:pointer;background-color:#9ecbec!important;opacity:.8}.button-group{background-repeat:no-repeat;background-size:100px;background-position:center;height:40px;width:80%;margin:20px auto;border-radius:10px}.error.mat-card-subtitle{color:#a00;text-align:left}.example-card{margin:6px auto auto;max-width:100%}.example-header-image{background-image:url(https://material.angular.io/assets/img/examples/shiba1.jpg);background-size:cover}.progress-bar{margin-top:24px}.file-div{background-color:#dedddc;margin-top:6px}.othersFilePreview{background-color:#8a2be2;height:100%;width:100%;text-align:center;justify-content:center;align-items:center;display:flex}.fileDescription{text-align:left}.files-view{background-repeat:no-repeat;background-size:cover;background-position:center;height:auto!important;width:82%;margin:20px auto;border-radius:10px;display:flex;justify-content:center;align-items:stretch;flex-wrap:wrap}.files-view .mat-card{position:relative;z-index:9;flex:1 1 28.33%;margin:10px!important;display:flex;flex-wrap:wrap}.viewUrlwrapper{height:160px;width:100%;overflow:hidden;position:relative}.viewUrlwrapper img{max-width:100%;-o-object-fit:cover;object-fit:cover;margin:0 auto;z-index:99;position:relative;max-width:100%;width:initial;display:block;margin-top:-46px!important}.viewUrlcontent{display:block;justify-content:center;align-items:stretch;flex-wrap:wrap;flex:1 1 100%}.viewUrlcontent .mat-card-header{display:flex;flex-direction:row;flex:1 1 100%;justify-content:center;text-align:center;flex-wrap:wrap}.viewUrlcontent .mat-progress-bar{margin-bottom:5px}.viewUrlcontent .mat-card-header .mat-card-header-text{margin:10px;width:100%}.viewUrlcontent .mat-card-header .mat-card-header-text .mat-card-title{width:100%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;line-height:19px;max-height:40px;-webkit-line-clamp:2}.mat-typography .mat-card-image{width:inherit!important;margin:0!important}"]
                    }] }
        ];
        /** @nocollapse */
        FileUploadComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: FileUploadService },
                { type: router.ActivatedRoute },
                { type: router.Router },
                { type: snackBar.MatSnackBar },
                { type: dialog.MatDialog }
            ];
        };
        FileUploadComponent.propDecorators = {
            config: [{ type: i0.Input }]
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
            { type: i0.NgModule, args: [{
                        exports: [
                            a11y.A11yModule,
                            stepper.CdkStepperModule,
                            table.CdkTableModule,
                            tree.CdkTreeModule,
                            dragDrop.DragDropModule,
                            autocomplete.MatAutocompleteModule,
                            badge.MatBadgeModule,
                            bottomSheet.MatBottomSheetModule,
                            button.MatButtonModule,
                            buttonToggle.MatButtonToggleModule,
                            card.MatCardModule,
                            checkbox.MatCheckboxModule,
                            chips.MatChipsModule,
                            stepper$1.MatStepperModule,
                            datepicker.MatDatepickerModule,
                            dialog.MatDialogModule,
                            divider.MatDividerModule,
                            expansion.MatExpansionModule,
                            gridList.MatGridListModule,
                            icon.MatIconModule,
                            input.MatInputModule,
                            list.MatListModule,
                            menu.MatMenuModule,
                            core.MatNativeDateModule,
                            paginator.MatPaginatorModule,
                            progressBar.MatProgressBarModule,
                            progressSpinner.MatProgressSpinnerModule,
                            radio.MatRadioModule,
                            core.MatRippleModule,
                            select.MatSelectModule,
                            sidenav.MatSidenavModule,
                            slider.MatSliderModule,
                            slideToggle.MatSlideToggleModule,
                            snackBar.MatSnackBarModule,
                            sort.MatSortModule,
                            table$1.MatTableModule,
                            tabs.MatTabsModule,
                            toolbar.MatToolbarModule,
                            tooltip.MatTooltipModule,
                            tree$1.MatTreeModule,
                            portal.PortalModule,
                            scrolling.ScrollingModule,
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
            this.onFileDropped = new i0.EventEmitter();
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
            { type: i0.Directive, args: [{
                        selector: '[libDragDrop]'
                    },] }
        ];
        DragDropDirective.propDecorators = {
            onFileDropped: [{ type: i0.Output }],
            background: [{ type: i0.HostBinding, args: ['style.background-color',] }],
            opacity: [{ type: i0.HostBinding, args: ['style.opacity',] }],
            onDragOver: [{ type: i0.HostListener, args: ['dragover', ['$event'],] }],
            onDragLeave: [{ type: i0.HostListener, args: ['dragleave', ['$event'],] }],
            ondrop: [{ type: i0.HostListener, args: ['drop', ['$event'],] }]
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
            { type: i0.Component, args: [{
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
            { type: i0.NgModule, args: [{
                        declarations: [
                            FileUploadComponent,
                            DragDropDirective,
                            AlertMessageComponent,
                            DialogBoxComponent,
                            PreviewFilesComponent
                        ],
                        imports: [
                            platformBrowser.BrowserModule,
                            MaterialModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            i1.HttpClientModule
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

    exports.FileUploadService = FileUploadService;
    exports.FileUploadComponent = FileUploadComponent;
    exports.FileUploadModule = FileUploadModule;
    exports.ɵe = MaterialModule;
    exports.ɵb = AlertMessageComponent;
    exports.ɵc = DialogBoxComponent;
    exports.ɵd = PreviewFilesComponent;
    exports.ɵa = DragDropDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=file-upload.umd.js.map