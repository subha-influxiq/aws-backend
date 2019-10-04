/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { DemoMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent, commonModalComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ApiService } from './api.service';
export class LoginModule {
}
LoginModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LoginComponent, SignUpComponent, ForgetPasswordComponent, ResetPasswordComponent, commonModalComponent],
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
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                entryComponents: [commonModalComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvbG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBa0IzQyxNQUFNLE9BQU8sV0FBVzs7O1lBaEJ2QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQztnQkFDdEgsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDVixtQkFBbUI7b0JBQ25CLHVCQUF1QjtvQkFDdkIsWUFBWTtvQkFDWixnQkFBZ0I7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLENBQUM7Z0JBQzNGLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDdkIsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7Z0JBQ2pDLGVBQWUsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2FBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVtb01hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi9tYXRlcmlhbC1tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTaWduVXBDb21wb25lbnQsIGNvbW1vbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcmdldFBhc3N3b3JkQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JnZXQtcGFzc3dvcmQvZm9yZ2V0LXBhc3N3b3JkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtMb2dpbkNvbXBvbmVudCwgU2lnblVwQ29tcG9uZW50LCBGb3JnZXRQYXNzd29yZENvbXBvbmVudCwgUmVzZXRQYXNzd29yZENvbXBvbmVudCwgY29tbW9uTW9kYWxDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgRGVtb01hdGVyaWFsTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgQ29tbW9uTW9kdWxlLFxuICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtMb2dpbkNvbXBvbmVudCwgU2lnblVwQ29tcG9uZW50LCBGb3JnZXRQYXNzd29yZENvbXBvbmVudCwgUmVzZXRQYXNzd29yZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0FwaVNlcnZpY2VdLFxuICBib290c3RyYXA6IFtdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV0sXG4gIGVudHJ5Q29tcG9uZW50czogW2NvbW1vbk1vZGFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSB7IH1cbiJdfQ==