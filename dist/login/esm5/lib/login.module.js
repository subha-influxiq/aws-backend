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
var LoginModule = /** @class */ (function () {
    function LoginModule() {
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
    return LoginModule;
}());
export { LoginModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbG9naW4vIiwic291cmNlcyI6WyJsaWIvbG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBQUE7SUFnQjJCLENBQUM7O2dCQWhCM0IsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUM7b0JBQ3RILE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLFdBQVc7d0JBQ1YsbUJBQW1CO3dCQUNuQix1QkFBdUI7d0JBQ3ZCLFlBQVk7d0JBQ1osZ0JBQWdCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixDQUFDO29CQUMzRixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxFQUFFO29CQUNiLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDeEM7O0lBQzBCLGtCQUFDO0NBQUEsQUFoQjVCLElBZ0I0QjtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZW1vTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFsLW1vZHVsZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNpZ25VcENvbXBvbmVudCwgY29tbW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3NpZ24tdXAvc2lnbi11cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9yZ2V0UGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL2ZvcmdldC1wYXNzd29yZC9mb3JnZXQtcGFzc3dvcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9hcGkuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0xvZ2luQ29tcG9uZW50LCBTaWduVXBDb21wb25lbnQsIEZvcmdldFBhc3N3b3JkQ29tcG9uZW50LCBSZXNldFBhc3N3b3JkQ29tcG9uZW50LCBjb21tb25Nb2RhbENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBEZW1vTWF0ZXJpYWxNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICBDb21tb25Nb2R1bGUsXG4gICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0xvZ2luQ29tcG9uZW50LCBTaWduVXBDb21wb25lbnQsIEZvcmdldFBhc3N3b3JkQ29tcG9uZW50LCBSZXNldFBhc3N3b3JkQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbQXBpU2VydmljZV0sXG4gIGJvb3RzdHJhcDogW10sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXSxcbiAgZW50cnlDb21wb25lbnRzOiBbY29tbW9uTW9kYWxDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHsgfVxuIl19