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

import { CookieService } from 'ngx-cookie-service';
import { AuthguardService} from './services/authguard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from './services/http-service.service';
// modules
import { DemoMaterialModule } from '../app/modules/materialModule';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/auth/resetpassword/resetpassword.component';

/* Component (Common uses) Start Here */
import { DialogBoxComponent } from './components/common/dialog-box/dialog-box.component';
import { UploadDialogBoxComponent } from './components/common/upload-dialog-box/upload-dialog-box.component';
/* Component (Common uses) End Here */

/* Components (Pages) Start Here */
/* >>>>------> Admin <------<<<< */
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AddEditComponent } from './components/admin/admin-management/add-edit/add-edit.component';
import { ManageAdminListComponent } from './components/admin/admin-management/manage-admin-list/manage-admin-list.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AddeditDoctorComponent, Modal } from './components/admin/doctor-management/addedit-doctor/addedit-doctor.component';
import { ListDoctorComponent } from './components/admin/doctor-management/list-doctor/list-doctor.component';
import { AddEditBillerComponent } from './components/admin/biller-management/add-edit-biller/add-edit-biller.component';
import { ListingBillerComponent } from './components/admin/biller-management/listing-biller/listing-biller.component';
import { ListingTechComponent } from './components/admin/tech-management/listing-tech/listing-tech.component';
import { AddEditTechComponent } from './components/admin/tech-management/add-edit-tech/add-edit-tech.component';
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
import { TestComponent, DialogContentExampleDialog } from './components/test/test.component';
import { FileUploadModule } from 'file-upload';


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
    DialogContentExampleDialog,
    AddEditComponent,
    ManageAdminListComponent,
    AdminHeaderComponent,
    AddeditDoctorComponent,
    ListDoctorComponent,
    Modal,
    AddEditBillerComponent,
    ListingBillerComponent,
    ListingTechComponent,
    AddEditTechComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    AddEditPatientComponent,
    DialogBoxComponent,
    BulkUploadComponent,
    UploadDialogBoxComponent,
    BillerHeaderComponent,
    DoctorHeaderComponent,
    TechHeaderComponent,
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
    ReactiveFormsModule,
    FileUploadModule
  ],

  providers: [CookieService,AuthguardService,HttpServiceService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[Modal,DialogBoxComponent,UploadDialogBoxComponent,DialogContentExampleDialog,TestComponent]

})
export class AppModule { }
