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
import { OverlayModule } from '@angular/cdk/overlay';
import { MetaModule } from '@ngx-meta/core';

import { CookieService } from 'ngx-cookie-service';
import { AuthguardService} from './services/authguard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from './services/http-service.service';

/* Http Loader */
import { HttpLoaderComponent } from './components/common/http-loader/http-loader.component';
import { HttpLoaderService } from './services/http-loader.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoaderInterceptor } from './class/common/loader.interceptor';

/* Common Function */
import { CommonFunction } from './class/common/common-function';

// modules
import { DemoMaterialModule } from '../app/modules/materialModule';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/auth/resetpassword/resetpassword.component';

/* Component (Common uses) Start Here */
import { DialogBoxComponent } from './components/common/dialog-box/dialog-box.component';
import { UploadDialogBoxComponent } from './components/common/upload-dialog-box/upload-dialog-box.component';
import { PasswordDialogBoxComponent } from './components/common/password-dialog-box/password-dialog-box.component';

/* Component (Common uses) End Here */

/* Components (Pages) Start Here */
/* >>>>------> Admin <------<<<< */
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AddEditComponent,ChangePasswordAdminModal } from './components/admin/admin-management/add-edit/add-edit.component';
import { ManageAdminListComponent } from './components/admin/admin-management/manage-admin-list/manage-admin-list.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AddeditDoctorComponent, ChangePasswordDoctorModal } from './components/admin/doctor-management/addedit-doctor/addedit-doctor.component';
import { ListDoctorComponent } from './components/admin/doctor-management/list-doctor/list-doctor.component';
import { AddEditBillerComponent ,ChangePasswordModal}from './components/admin/biller-management/add-edit-biller/add-edit-biller.component';
import { ListingBillerComponent } from './components/admin/biller-management/listing-biller/listing-biller.component';
import { ListingTechComponent } from './components/admin/tech-management/listing-tech/listing-tech.component';
import { AddEditTechComponent,Dialogtest } from './components/admin/tech-management/add-edit-tech/add-edit-tech.component';
import { AccountSettingsComponent } from './components/common/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/common/account-settings/change-password/change-password.component';
import { UserAddEditComponent } from './components/admin/user-management/user-add-edit/user-add-edit.component';

/* >>>>------> Tech <------<<<< */
import { TechDashboardComponent } from './components/tech/tech-dashboard/tech-dashboard.component';
import { TechHeaderComponent } from './components/tech/tech-header/tech-header.component';
import { AddEditPatientComponent  } from './components/tech/patient-management/add-edit-patient/add-edit-patient.component';
import { BulkUploadComponent } from './components/tech/patient-management/bulk-upload/bulk-upload.component';

/* >>>>------> Doctor <------<<<< */
import { DoctorDashboardComponent } from './components/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorHeaderComponent } from './components/doctor/doctor-header/doctor-header.component';

/* >>>>------> Biller <------<<<< */
import { BillerDashboardComponent } from './components/biller/biller-dashboard/biller-dashboard.component';
import { BillerHeaderComponent } from './components/biller/biller-header/biller-header.component';

/* Components (Pages) End Here */

/* testing purpose start here */
import { TestComponent } from './components/test/test.component';
import { FileUploadModule } from 'file-upload'; 
import { HealthriskSystemEncounterComponent } from './components/admin/tech-management/healthrisk-system-encounter/healthrisk-system-encounter.component';
import { SystemSuperbillComponent } from './components/admin/tech-management/system-superbill/system-superbill.component';
import { HealthRiskAnalysisComponent } from './components/admin/tech-management/health-risk-analysis/health-risk-analysis.component';
import { ReportDetailsComponent } from './components/tech/report-details/report-details.component';
import { NotFoundErrorComponent } from './components/common/not-found-error/not-found-error.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { BillerFooterComponent } from './components/biller/biller-footer/biller-footer.component';
import { TechFooterComponent } from './components/tech/tech-footer/tech-footer.component';
import { DoctorFooterComponent } from './components/doctor/doctor-footer/doctor-footer.component'; 
import { SignatureManagementComponent } from './components/doctor/signature-management/signature-management.component';
import { DoctorOfficeManagementComponent } from './components/admin/doctor-office-management/doctor-office-management.component';
import { AddEditDoctorOfcComponent,ChangePasswordDoctorOfficeModal } from './components/admin/doctor-office-management/add-edit-doctor-ofc/add-edit-doctor-ofc.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorOfficeDashboardComponent } from './components/doctor-office/doctor-office-dashboard/doctor-office-dashboard.component';
import { DoctorOfficeHeaderComponent } from './components/doctor-office/doctor-office-header/doctor-office-header.component';
import { DoctorOfficeFooterComponent } from './components/doctor-office/doctor-office-footer/doctor-office-footer.component';
import { BookedAppoinmentsComponent } from './components/admin/booked-appoinments/booked-appoinments.component';
import { DoctorOfficeAccountSettingsComponent } from './components/doctor-office/doctor-office-account-settings/doctor-office-account-settings.component';
import { DoctorOfficeChangePasswordComponent } from './components/doctor-office/doctor-office-account-settings/doctor-office-change-password/doctor-office-change-password.component';
 

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
    AddeditDoctorComponent,
    ListDoctorComponent,
    ChangePasswordDoctorModal,
    AddEditBillerComponent,
    ListingBillerComponent,
    ListingTechComponent,
    AddEditTechComponent,
    Dialogtest,
    ChangePasswordModal,
    ChangePasswordDoctorOfficeModal,
    ChangePasswordAdminModal,
    AccountSettingsComponent,
    ChangePasswordComponent,
    AddEditPatientComponent,
    DialogBoxComponent,
    BulkUploadComponent,
    UploadDialogBoxComponent,
    BillerHeaderComponent,
    DoctorHeaderComponent,
    TechHeaderComponent, 
    HealthriskSystemEncounterComponent, SystemSuperbillComponent,
    HealthRiskAnalysisComponent,
    ReportDetailsComponent,
    HttpLoaderComponent,
    NotFoundErrorComponent,
    AdminFooterComponent,
    BillerFooterComponent,
    TechFooterComponent,
    DoctorFooterComponent,
    SignatureManagementComponent,
    PasswordDialogBoxComponent,
    DoctorOfficeManagementComponent,
    AddEditDoctorOfcComponent,
    DoctorOfficeDashboardComponent,
    DoctorOfficeHeaderComponent,
    DoctorOfficeFooterComponent,
    BookedAppoinmentsComponent,
    DoctorOfficeAccountSettingsComponent,
    DoctorOfficeChangePasswordComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MetaModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    DemoMaterialModule,
    LoginModule,
    ListingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    
  ],
  exports: [MatPaginatorModule],

  providers: [HttpLoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, CookieService, AuthguardService, HttpServiceService, DatePipe, CommonFunction],
  bootstrap: [AppComponent],
  entryComponents:[ChangePasswordDoctorModal,Dialogtest,ChangePasswordModal,ChangePasswordAdminModal,ChangePasswordDoctorOfficeModal
    ,DialogBoxComponent,PasswordDialogBoxComponent,UploadDialogBoxComponent,TestComponent]

})
export class AppModule {

  constructor(public http: HttpClient) {
    // this.http.get('localhost/api/googleapiphp/powertag.php?q=car&count=3')
    //   .subscribe((r) => {
    //     console.log(r);
    //   });
  }

}
