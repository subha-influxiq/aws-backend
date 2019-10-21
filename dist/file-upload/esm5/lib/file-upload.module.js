/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './Module/material-module';
import { HttpClientModule } from '@angular/common/http';
import { DragDropDirective } from './directive/drag-drop.directive';
import { AlertMessageComponent } from './component/alert-message/alert-message.component';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';
import { PreviewFilesComponent } from './component/preview-files/preview-files.component';
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
export { FileUploadModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmlsZS11cGxvYWQvIiwic291cmNlcyI6WyJsaWIvZmlsZS11cGxvYWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRTFGO0lBQUE7SUF1QmdDLENBQUM7O2dCQXZCaEMsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIscUJBQXFCO3dCQUNyQixrQkFBa0I7d0JBQ2xCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2IsY0FBYzt3QkFDZCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3FCQUNqQjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtvQkFDYixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsZUFBZSxFQUFFO3dCQUNmLHFCQUFxQjt3QkFDckIsa0JBQWtCO3dCQUNsQixxQkFBcUI7cUJBQ3RCO2lCQUNGOztJQUMrQix1QkFBQztDQUFBLEFBdkJqQyxJQXVCaUM7U0FBcEIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi9Nb2R1bGUvbWF0ZXJpYWwtbW9kdWxlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEcmFnRHJvcERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RyYWctZHJvcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWxlcnRNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvYWxlcnQtbWVzc2FnZS9hbGVydC1tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dCb3hDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9kaWFsb2ctYm94L2RpYWxvZy1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IFByZXZpZXdGaWxlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L3ByZXZpZXctZmlsZXMvcHJldmlldy1maWxlcy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGaWxlVXBsb2FkQ29tcG9uZW50LFxuICAgIERyYWdEcm9wRGlyZWN0aXZlLFxuICAgIEFsZXJ0TWVzc2FnZUNvbXBvbmVudCxcbiAgICBEaWFsb2dCb3hDb21wb25lbnQsXG4gICAgUHJldmlld0ZpbGVzQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBleHBvcnRzOiBbRmlsZVVwbG9hZENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEFsZXJ0TWVzc2FnZUNvbXBvbmVudCxcbiAgICBEaWFsb2dCb3hDb21wb25lbnQsXG4gICAgUHJldmlld0ZpbGVzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZE1vZHVsZSB7IH1cbiJdfQ==