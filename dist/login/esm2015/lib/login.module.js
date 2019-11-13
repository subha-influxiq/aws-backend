/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { DemoMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent, successModalComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent, snackBarComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent, snackBarResetComponent } from './reset-password/reset-password.component';
import { ApiService } from './api.service';
export class LoginModule {
}
LoginModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    LoginComponent,
                    SignUpComponent,
                    ForgetPasswordComponent,
                    ResetPasswordComponent,
                    successModalComponent,
                    snackBarComponent,
                    snackBarResetComponent,
                ],
                imports: [
                    DemoMaterialModule,
                    FormsModule,
                    ReactiveFormsModule,
                    BrowserAnimationsModule,
                    CommonModule,
                    HttpClientModule
                ],
                exports: [LoginComponent, SignUpComponent, ForgetPasswordComponent, ResetPasswordComponent],
                providers: [ApiService],
                bootstrap: [],
                schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                entryComponents: [successModalComponent, snackBarComponent, snackBarResetComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvbG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMzRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBNEIzQyxNQUFNLE9BQU8sV0FBVzs7O1lBMUJ2QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtpQkFHdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLHVCQUF1QjtvQkFDdkIsWUFBWTtvQkFDWixnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLENBQUM7Z0JBQzNGLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDdkIsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQ25ELGVBQWUsRUFBRSxDQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDO2FBQ3JGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVtb01hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi9tYXRlcmlhbC1tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNpZ25VcENvbXBvbmVudCwgc3VjY2Vzc01vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcmdldFBhc3N3b3JkQ29tcG9uZW50LCBzbmFja0JhckNvbXBvbmVudCB9IGZyb20gJy4vZm9yZ2V0LXBhc3N3b3JkL2ZvcmdldC1wYXNzd29yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvbXBvbmVudCwgc25hY2tCYXJSZXNldENvbXBvbmVudCB9IGZyb20gJy4vcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuL2FwaS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTG9naW5Db21wb25lbnQsXG4gICAgU2lnblVwQ29tcG9uZW50LFxuICAgIEZvcmdldFBhc3N3b3JkQ29tcG9uZW50LFxuICAgIFJlc2V0UGFzc3dvcmRDb21wb25lbnQsXG4gICAgc3VjY2Vzc01vZGFsQ29tcG9uZW50LFxuICAgIHNuYWNrQmFyQ29tcG9uZW50LFxuICAgIHNuYWNrQmFyUmVzZXRDb21wb25lbnQsXG4gICAgLy8gY29tbW9uTW9kYWxDb21wb25lbnRcblxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgRGVtb01hdGVyaWFsTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0xvZ2luQ29tcG9uZW50LCBTaWduVXBDb21wb25lbnQsIEZvcmdldFBhc3N3b3JkQ29tcG9uZW50LCBSZXNldFBhc3N3b3JkQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbQXBpU2VydmljZV0sXG4gIGJvb3RzdHJhcDogW10sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIHN1Y2Nlc3NNb2RhbENvbXBvbmVudCwgc25hY2tCYXJDb21wb25lbnQsIHNuYWNrQmFyUmVzZXRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHsgfVxuIl19