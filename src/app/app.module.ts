import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader'
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginModule } from 'login'; //login library
import { ListingModule } from 'lib-listing';
import { DatePipe } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { AuthguardService} from './services/authguard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from './services/http-service.service';
// modules
import { DemoMaterialModule } from '../app/modules/materialModule';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/auth/resetpassword/resetpassword.component';

//dashboards
import { TechDashboardComponent } from './components/dashboard/tech-dashboard/tech-dashboard.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { BillerDashboardComponent } from './components/dashboard/biller-dashboard/biller-dashboard.component';
import { DoctorDashboardComponent } from './components/dashboard/doctor-dashboard/doctor-dashboard.component';

//user-management
import { UserAddEditComponent } from './components/user-management/user-add-edit/user-add-edit.component';
/**testing purpose start here**/
import { TestComponent } from './components/test/test.component';
import { AddEditComponent } from './components/admin-management/add-edit/add-edit.component';
import { ManageAdminListComponent } from './components/admin-management/manage-admin-list/manage-admin-list.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AddEditBillerComponent } from './components/biller-management/add-edit-biller/add-edit-biller.component';
import { ListingBillerComponent } from './components/biller-management/listing-biller/listing-biller.component';
import { ListingTechComponent } from './components/tech-management/listing-tech/listing-tech.component';
import { AddEditTechComponent } from './components/tech-management/add-edit-tech/add-edit-tech.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/account-settings/change-password/change-password.component';

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
    //user-management
    UserAddEditComponent,
    // Test
    TestComponent,
    AddEditComponent,
    ManageAdminListComponent,
    AdminHeaderComponent,
    AddEditBillerComponent,
    ListingBillerComponent,
    ListingTechComponent,
    AddEditTechComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,

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
    ListingModule,
    FormsModule,
    ReactiveFormsModule

    

  ],
  providers: [CookieService,AuthguardService,HttpServiceService,    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
