import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginModule } from 'login'; //login library
import { CookieService } from 'ngx-cookie-service';

// modules
import { DemoMaterialModule } from '../app/modules/materialModule';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/auth/resetpassword/resetpassword.component';
//dashboards
import { TechDashboardComponent } from './components/dashboard/tech-dashboard/tech-dashboard.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { BillerDashboardComponent } from './components/dashboard/biller-dashboard/biller-dashboard.component';
import { DoctorDashboardComponent } from './components/dashboard/doctor-dashboard/doctor-dashboard.component';
/**testing purpose start here**/
import { TestComponent } from './components/test/test.component';

/**end here**/

@NgModule({
  declarations: [
    AppComponent,

    // Auth
    LoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,

    // dashboard
    TechDashboardComponent,
    AdminDashboardComponent,
    BillerDashboardComponent,
    DoctorDashboardComponent,
    // Test
    TestComponent,


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
