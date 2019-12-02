/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ListingComponent, Confirmdialog, BottomSheet } from './listing.component';
import { DemoMaterialModule } from './materialmodules';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApiService } from './api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
//import { FooterComponent } from './footer/footer.component';
//import { MyfromComponent } from './myfrom/myfrom.component';
//import {DynamicFieldDirective} from "./myfrom/dynamic-field.directive";
//import { MatFileUploadModule } from 'angular-material-fileupload';
//import {NgxUploaderModule} from "ngx-uploader";
//import {RouterModule} from "@angular/router";
// import { FieldConfig } from './myfrom/field.interface';
// import { DynamicFieldDirective } from './myfrom/dynamic-field.directive';
// import { DynamicFormBuilderComponent } from '../lib/dynamic-form-builder/dynamic-form-builder.component';
/*
import { FieldBuilderComponent } from '../lib/dynamic-form-builder/field-builder/field-builder.component';
import { TextBoxComponent } from '../lib/dynamic-form-builder/atoms/textbox';
import { DropDownComponent } from '../lib/dynamic-form-builder/atoms/dropdown';
import { FileComponent } from '../lib/dynamic-form-builder/atoms/file';
import { CheckBoxComponent } from '../lib/dynamic-form-builder/atoms/checkbox';
import { RadioComponent } from '../lib/dynamic-form-builder/atoms/radio';
*/
import { MomentModule } from 'ngx-moment';
import { RouterModule } from "@angular/router";
//import { SinglepostComponent } from './singlepost/singlepost.component';
export class ListingModule {
}
ListingModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ListingComponent, Confirmdialog, BottomSheet],
                imports: [
                    CommonModule,
                    BrowserModule, BrowserAnimationsModule,
                    DemoMaterialModule,
                    FormsModule, ReactiveFormsModule,
                    RouterModule,
                    MomentModule
                    // DynamicFieldDirective,
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                exports: [ListingComponent,
                ],
                providers: [ApiService],
                entryComponents: [Confirmdialog, BottomSheet],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saXN0aW5nLWFuZ3VsYXI3LyIsInNvdXJjZXMiOlsibGliL2xpc3RpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFhLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFDLFdBQVcsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0I3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUF3QjdDLE1BQU0sT0FBTyxhQUFhOzs7WUFuQnpCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBQyxhQUFhLEVBQUMsV0FBVyxDQUFDO2dCQUN4RCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixhQUFhLEVBQUUsdUJBQXVCO29CQUN0QyxrQkFBa0I7b0JBQ2xCLFdBQVcsRUFBRSxtQkFBbUI7b0JBQy9CLFlBQVk7b0JBQ2IsWUFBWTtvQkFDWix5QkFBeUI7aUJBRTVCO2dCQUNELE9BQU8sRUFBRSxDQUFFLHNCQUFzQixDQUFFO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0I7aUJBRXJCO2dCQUNMLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDdkIsZUFBZSxFQUFDLENBQUMsYUFBYSxFQUFDLFdBQVcsQ0FBQzthQUM1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIENvbXBvbmVudCwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0xpc3RpbmdDb21wb25lbnQsIENvbmZpcm1kaWFsb2csQm90dG9tU2hlZXR9IGZyb20gJy4vbGlzdGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHtEZW1vTWF0ZXJpYWxNb2R1bGV9IGZyb20gJy4vbWF0ZXJpYWxtb2R1bGVzJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbi8vaW1wb3J0IHsgRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XG4vL2ltcG9ydCB7IE15ZnJvbUNvbXBvbmVudCB9IGZyb20gJy4vbXlmcm9tL215ZnJvbS5jb21wb25lbnQnO1xuLy9pbXBvcnQge0R5bmFtaWNGaWVsZERpcmVjdGl2ZX0gZnJvbSBcIi4vbXlmcm9tL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlXCI7XG4vL2ltcG9ydCB7IE1hdEZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tICdhbmd1bGFyLW1hdGVyaWFsLWZpbGV1cGxvYWQnO1xuLy9pbXBvcnQge05neFVwbG9hZGVyTW9kdWxlfSBmcm9tIFwibmd4LXVwbG9hZGVyXCI7XG4vL2ltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vLyBpbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4vbXlmcm9tL2ZpZWxkLmludGVyZmFjZSc7XG4vLyBpbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuL215ZnJvbS9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZSc7XG4vLyBpbXBvcnQgeyBEeW5hbWljRm9ybUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuLi9saWIvZHluYW1pYy1mb3JtLWJ1aWxkZXIvZHluYW1pYy1mb3JtLWJ1aWxkZXIuY29tcG9uZW50Jztcbi8qXG5pbXBvcnQgeyBGaWVsZEJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuLi9saWIvZHluYW1pYy1mb3JtLWJ1aWxkZXIvZmllbGQtYnVpbGRlci9maWVsZC1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0Qm94Q29tcG9uZW50IH0gZnJvbSAnLi4vbGliL2R5bmFtaWMtZm9ybS1idWlsZGVyL2F0b21zL3RleHRib3gnO1xuaW1wb3J0IHsgRHJvcERvd25Db21wb25lbnQgfSBmcm9tICcuLi9saWIvZHluYW1pYy1mb3JtLWJ1aWxkZXIvYXRvbXMvZHJvcGRvd24nO1xuaW1wb3J0IHsgRmlsZUNvbXBvbmVudCB9IGZyb20gJy4uL2xpYi9keW5hbWljLWZvcm0tYnVpbGRlci9hdG9tcy9maWxlJztcbmltcG9ydCB7IENoZWNrQm94Q29tcG9uZW50IH0gZnJvbSAnLi4vbGliL2R5bmFtaWMtZm9ybS1idWlsZGVyL2F0b21zL2NoZWNrYm94JztcbmltcG9ydCB7IFJhZGlvQ29tcG9uZW50IH0gZnJvbSAnLi4vbGliL2R5bmFtaWMtZm9ybS1idWlsZGVyL2F0b21zL3JhZGlvJztcbiovXG5pbXBvcnQgeyBNb21lbnRNb2R1bGUgfSBmcm9tICduZ3gtbW9tZW50JztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vL2ltcG9ydCB7IFNpbmdsZXBvc3RDb21wb25lbnQgfSBmcm9tICcuL3NpbmdsZXBvc3Qvc2luZ2xlcG9zdC5jb21wb25lbnQnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTGlzdGluZ0NvbXBvbmVudCxDb25maXJtZGlhbG9nLEJvdHRvbVNoZWV0XSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQnJvd3Nlck1vZHVsZSwgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgICAgIERlbW9NYXRlcmlhbE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIE1vbWVudE1vZHVsZVxuICAgICAgICAvLyBEeW5hbWljRmllbGREaXJlY3RpdmUsXG5cbiAgICBdLFxuICAgIHNjaGVtYXM6IFsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSBdLFxuICBleHBvcnRzOiBbTGlzdGluZ0NvbXBvbmVudCxcbiAgICAgIC8vTXlmcm9tQ29tcG9uZW50LFxuICAgICAgXSxcbiAgcHJvdmlkZXJzOiBbQXBpU2VydmljZV0sXG4gIGVudHJ5Q29tcG9uZW50czpbQ29uZmlybWRpYWxvZyxCb3R0b21TaGVldF0sXG59KVxuZXhwb3J0IGNsYXNzIExpc3RpbmdNb2R1bGUge1xuICAvLyBmaWVsZDogRmllbGRDb25maWc7XG4gIC8vIGdyb3VwOiBGb3JtR3JvdXA7XG5cbn1cbiJdfQ==