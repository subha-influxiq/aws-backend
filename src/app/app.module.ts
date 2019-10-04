import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from 'login'; //login library
import { CookieService } from 'ngx-cookie-service';
// modules
import {DemoMaterialModule } from '../app/modules/materialModule';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TechdashboardComponent } from './components/techdashboard/techdashboard.component';

/**testing purpose start here**/
import { TestComponent } from './components/test/test.component';
import { TestforgetPasswordComponent } from './components/testforget-password/testforget-password.component';
import { TestresetPasswordComponent } from './components/testreset-password/testreset-password.component';
import { TestsignupComponent } from './components/testsignup/testsignup.component';
/**end here**/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    DashboardComponent,
    TechdashboardComponent,
    TestComponent,
    TestforgetPasswordComponent,
    TestresetPasswordComponent,
    TestsignupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    DemoMaterialModule,
    LoginModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
