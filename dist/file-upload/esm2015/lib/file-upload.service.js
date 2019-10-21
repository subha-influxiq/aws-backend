/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class FileUploadService {
    /**
     * @param {?} httpClient
     */
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.BASE_URL = "http://3.15.236.141:5005/uploads";
    }
    /* Upload Function */
    /**
     * @param {?} uploadURL
     * @param {?} data
     * @return {?}
     */
    upload(uploadURL, data) {
        /** @type {?} */
        const formData = new FormData();
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
        (event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    /** @type {?} */
                    const percentage = Math.round(100 * event.loaded / event.total);
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
                    return `Unhandled event: ${event.type}`;
            }
        })));
    }
    /**
     * @param {?} uploadURL
     * @param {?} data
     * @return {?}
     */
    uploadBase64(uploadURL, data) {
        /** @type {?} */
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.post(uploadURL, data, httpOptions);
    }
}
FileUploadService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FileUploadService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ FileUploadService.ngInjectableDef = i0.defineInjectable({ factory: function FileUploadService_Factory() { return new FileUploadService(i0.inject(i1.HttpClient)); }, token: FileUploadService, providedIn: "root" });
if (false) {
    /** @type {?} */
    FileUploadService.prototype.BASE_URL;
    /**
     * @type {?}
     * @private
     */
    FileUploadService.prototype.httpClient;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2ZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtdXBsb2FkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWdDLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTVHLE9BQU8sRUFBRSxHQUFHLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7OztBQU10RCxNQUFNLE9BQU8saUJBQWlCOzs7O0lBSTVCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFGbkMsYUFBUSxHQUFXLGtDQUFrQyxDQUFDO0lBRWYsQ0FBQzs7Ozs7OztJQUd4QyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUk7O2NBQ3JCLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUMvQixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBTSxTQUFTLEVBQUUsUUFBUSxFQUFFO1lBQ3BELGNBQWMsRUFBRSxJQUFJO1lBQ3BCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEIsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNsQixLQUFLLGFBQWEsQ0FBQyxjQUFjOzswQkFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDL0QsSUFBRyxVQUFVLElBQUksQ0FBQyxJQUFJLFVBQVUsSUFBSSxHQUFHLEVBQUU7d0JBQ3ZDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDO3FCQUNuSDt5QkFBTTt3QkFDTCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7cUJBQzNDO2dCQUNILEtBQUssYUFBYSxDQUFDLFFBQVE7b0JBQ3pCLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO3dCQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUNqRDt5QkFBTTt3QkFDTCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztxQkFDdEQ7Z0JBQ0g7b0JBQ0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO29CQUN2QyxPQUFPLG9CQUFvQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDM0M7UUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU0sWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJOztjQUMzQixXQUFXLEdBQUc7WUFDbEIsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDO2dCQUN2QixjQUFjLEVBQUUsa0JBQWtCO2FBQ25DLENBQUM7U0FDSDtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7WUFwREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTlEsVUFBVTs7Ozs7SUFVakIscUNBQTZEOzs7OztJQUVqRCx1Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEV2ZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEV2ZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkU2VydmljZSB7XG5cbiAgcHVibGljIEJBU0VfVVJMOiBzdHJpbmcgPSBcImh0dHA6Ly8zLjE1LjIzNi4xNDE6NTAwNS91cGxvYWRzXCI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7IH1cblxuICAvKiBVcGxvYWQgRnVuY3Rpb24gKi9cbiAgcHVibGljIHVwbG9hZCh1cGxvYWRVUkwsIGRhdGEpIHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGRhdGEuZmlsZSk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCd0eXBlJywgZGF0YS50eXBlKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3BhdGgnLCBkYXRhLnBhdGgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgncHJlZml4JywgZGF0YS5wcmVmaXgpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PGFueT4odXBsb2FkVVJMLCBmb3JtRGF0YSwge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICBvYnNlcnZlOiAnZXZlbnRzJ1xuICAgIH0pLnBpcGUobWFwKChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICBjYXNlIEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3M6XG4gICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gTWF0aC5yb3VuZCgxMDAgKiBldmVudC5sb2FkZWQgLyBldmVudC50b3RhbCk7XG4gICAgICAgICAgICBpZihwZXJjZW50YWdlID49IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiAncHJvZ3Jlc3MnLCBkYXRhOiB7IHRvdGFsRGF0YTogZXZlbnQudG90YWwsIGxvYWRlZERhdGE6IGV2ZW50LmxvYWRlZCwgcGVyY2VudGFnZTogcGVyY2VudGFnZSB9IH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6ICdjb21wbGV0ZScsIGRhdGE6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIEh0dHBFdmVudFR5cGUuUmVzcG9uc2U6XG4gICAgICAgICAgICBpZihldmVudC5ib2R5LnN0YXR1cyA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiAnY29tcGxldGUnLCBkYXRhOiBldmVudC5ib2R5IH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6ICdlcnJvcicsIGRhdGE6ICdBbiBlcnJvciBvY2NvcmQuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6ICd3YWl0aW5nJywgZGF0YTogJycgfTtcbiAgICAgICAgICAgIHJldHVybiBgVW5oYW5kbGVkIGV2ZW50OiAke2V2ZW50LnR5cGV9YDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHVwbG9hZEJhc2U2NCh1cGxvYWRVUkwsIGRhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KHVwbG9hZFVSTCwgZGF0YSwgaHR0cE9wdGlvbnMpO1xuICB9XG5cbn1cbiJdfQ==