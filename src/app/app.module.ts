import { BrowserModule } from '@angular/platform-browser';
import { DeferLoadModule } from '@trademe/ng-defer-load';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader'
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginModule } from 'login-lib-influxiq'; // login library
import { ListingModule } from 'listing-angular7';
import { FileUploadModule } from 'file-upload-lib-influxiq';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { MetaModule } from '@ngx-meta/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CKEditorModule } from 'ckeditor4-angular'; // ck editor
import { CalendarManagementModule } from 'calendar-management-lib-influxiq';

/* Date Range Picker */
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule } from 'saturn-datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

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
import { AddeditDoctorComponent, ChangePasswordDoctorModal,  } from './components/admin/doctor-management/addedit-doctor/addedit-doctor.component';
import { ListDoctorComponent } from './components/admin/doctor-management/list-doctor/list-doctor.component';
import { AddEditBillerComponent ,ChangePasswordModal}from './components/admin/biller-management/add-edit-biller/add-edit-biller.component';
import { ListingBillerComponent } from './components/admin/biller-management/listing-biller/listing-biller.component';
import { ListingTechComponent } from './components/admin/tech-management/listing-tech/listing-tech.component';
import { AddEditTechComponent, Dialogtest } from './components/admin/tech-management/add-edit-tech/add-edit-tech.component';
import { AccountSettingsComponent } from './components/common/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/common/account-settings/change-password/change-password.component';
import { UserAddEditComponent } from './components/admin/user-management/user-add-edit/user-add-edit.component';
import { ListSalesPersonComponent } from './components/admin/sales-person-management/list-sales-person/list-sales-person.component';
import { AddEditSalesPersonComponent, SRDialogtest } from './components/admin/sales-person-management/add-edit-sales-person/add-edit-sales-person.component';

/* >>>>------> Tech <------<<<< */
import { TechDashboardComponent,DoctorViewDialogComponent } from './components/tech/tech-dashboard/tech-dashboard.component';
import { TechHeaderComponent } from './components/tech/tech-header/tech-header.component';
import { AddEditPatientComponent  } from './components/admin/admin-dashboard/add-edit-patient/add-edit-patient.component';
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

import { HealthriskSystemEncounterComponent } from './components/doctor/doctor-dashboard/patient-report-view/healthrisk-system-encounter/healthrisk-system-encounter.component';
import { SystemSuperbillComponent } from './components/doctor/doctor-dashboard/patient-report-view/system-superbill/system-superbill.component';
import { HealthRiskAnalysisComponent } from './components/doctor/doctor-dashboard/patient-report-view/health-risk-analysis/health-risk-analysis.component';
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
import { BookedAppoinmentsComponent } from './components/admin/booked-appoinments/booked-appoinments.component';
import { ListComponent } from './components/tech/manage-calender/my-appointments/list/list.component';
import { DoctorOfficeDashboardComponent } from './components/doctor-office/doctor-office-dashboard/doctor-office-dashboard.component';
import { DoctorOfficeHeaderComponent } from './components/doctor-office/doctor-office-header/doctor-office-header.component';
import { DoctorOfficeFooterComponent } from './components/doctor-office/doctor-office-footer/doctor-office-footer.component';
import { DoctorOfficeAccountSettingsComponent } from './components/doctor-office/doctor-office-account-settings/doctor-office-account-settings.component';


import { LogoutComponent } from './components/auth/logout/logout.component';
import { DoctorOfficeChangePasswordComponent } from './components/doctor-office/doctor-office-change-password/doctor-office-change-password.component';
import { PatientReportViewComponent } from './components/doctor/doctor-dashboard/patient-report-view/patient-report-view.component';
import { EditPatientRecordComponent } from './components/admin/admin-dashboard/edit-patient-record/edit-patient-record.component';
import { ReportNotProcessComponent } from './components/admin/report-not-process/report-not-process.component';
import { DownloadSuperbillerComponent } from './components/biller/download-superbiller/download-superbiller.component';
import { DownloadDetailsComponent } from './components/admin/admin-dashboard/download-details/download-details.component';

/* Loader */
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { from } from 'rxjs';

// diagnostic-admin-management
import { AddEditDiagnosticAdminComponent, DiagnosticAdminPasswordChange } from './components/admin/diagnostic-admin-management/add-edit-diagnostic-admin/add-edit-diagnostic-admin.component';
import { ListingDiagnosticAdminComponent } from './components/admin/diagnostic-admin-management/listing-diagnostic-admin/listing-diagnostic-admin.component';
import { DiagnosticAdminDashboardComponent } from './components/diagnostic-admin/diagnostic-admin-dashboard/diagnostic-admin-dashboard.component';
import { DiagnosticAdminHeaderComponent } from './components/diagnostic-admin/diagnostic-admin-header/diagnostic-admin-header.component';
import { DiagnosticAdminFooterComponent } from './components/diagnostic-admin/diagnostic-admin-footer/diagnostic-admin-footer.component';
import { AdditionalRecommemdedDiagnosticTestsComponent } from './components/doctor/doctor-dashboard/patient-report-view/additional-recommemded-diagnostic-tests/additional-recommemded-diagnostic-tests.component';

import { SalesPersonDashboardComponent } from './components/sales-person/sales-person-dashboard/sales-person-dashboard.component';
import { SalesPersonHeaderComponent } from './components/sales-person/sales-person-header/sales-person-header.component';
import { SalesPersonFooterComponent } from './components/sales-person/sales-person-footer/sales-person-footer.component';
import { AddEditFaqComponent } from './components/admin/faq-management/add-edit-faq/add-edit-faq.component';
import { ListFaqComponent } from './components/admin/faq-management/list-faq/list-faq.component';
import { FaqViewComponent } from './components/common/faq-view/faq-view.component';
import { CalCreateSlotComponent } from './components/tech/manage-calender/manage-schedule/cal-create-slot/cal-create-slot.component';
import { CalSyncWithGoogleComponent } from './components/tech/manage-calender/manage-schedule/cal-sync-with-google/cal-sync-with-google.component';
import { CalHomeComponent } from './components/tech/manage-calender/manage-schedule/cal-home/cal-home.component';
import { CalViewSlotComponent } from './components/tech/manage-calender/manage-schedule/cal-view-slot/cal-view-slot.component';
import { CalEventListingComponent } from './components/tech/manage-calender/manage-schedule/cal-event-listing/cal-event-listing.component';
import { AppoinmentsListingComponent } from './components/doctor-office/manage-appointments/appoinments-listing/appoinments-listing.component';
import {
  BookAppoinmentNowComponent,
  ChooseDoctorDialog
} from './components/doctor-office/manage-appointments/book-appoinment-now/book-appoinment-now.component';
import { BookedEventsComponent } from './components/tech/manage-calender/manage-schedule/booked-events/booked-events.component';
import { ReportConformationComponent } from './components/tech/patient-management/report-conformation/report-conformation.component';
import { AddEditInsuranceComponent } from './components/admin/manage-insurance/add-edit-insurance/add-edit-insurance.component';
import { ListingInsuranceComponent } from './components/admin/manage-insurance/listing-insurance/listing-insurance.component';
import { AddEditInsurancetypeComponent } from './components/admin/manage-insurancetype/add-edit-insurancetype/add-edit-insurancetype.component';
import { ListingInsurancetypeComponent } from './components/admin/manage-insurancetype/listing-insurancetype/listing-insurancetype.component';
import { AddEditDoctorgroupComponent } from './components/admin/manage-doctorgroup/add-edit-doctorgroup/add-edit-doctorgroup.component';
import { ListingDoctorgroupComponent } from './components/admin/manage-doctorgroup/listing-doctorgroup/listing-doctorgroup.component';
import { AddEditAdminbillerComponent } from './components/admin/manage-adminbiller/add-edit-adminbiller/add-edit-adminbiller.component';
import { ListingAdminbillerComponent } from './components/admin/manage-adminbiller/listing-adminbiller/listing-adminbiller.component';
import { AddEditPatientinformationComponent } from './components/admin/manage-patientinformation/add-edit-patientinformation/add-edit-patientinformation.component';
import { ListingPatientinformationComponent } from './components/admin/manage-patientinformation/listing-patientinformation/listing-patientinformation.component';
import { AddEditDistributorsComponent } from './components/admin/manage-distributors/add-edit-distributors/add-edit-distributors.component';
import { ListingDistributorsComponent } from './components/admin/manage-distributors/listing-distributors/listing-distributors.component';
import { DoctorGroupDashboardComponent } from './components/doctor-group/doctor-group-dashboard/doctor-group-dashboard.component';
import { DoctorGroupHeaderComponent } from './components/doctor-group/doctor-group-header/doctor-group-header.component';
import { DoctorGroupFooterComponent } from './components/doctor-group/doctor-group-footer/doctor-group-footer.component';
import { DistributorsDashboardComponent } from './components/distributors/distributors-dashboard/distributors-dashboard.component';
import { DistributorsHeaderComponent } from './components/distributors/distributors-header/distributors-header.component';
import { DistributorsFooterComponent } from './components/distributors/distributors-footer/distributors-footer.component';
import { AdminbillerDashboardComponent } from './components/adminbiller/adminbiller-dashboard/adminbiller-dashboard.component';
import { AdminbillerHeaderComponent } from './components/adminbiller/adminbiller-header/adminbiller-header.component';
import { AdminbillerFooterComponent } from './components/adminbiller/adminbiller-footer/adminbiller-footer.component';
import { AddPatientManuallyComponent } from './components/doctor-office/add-patient/add-patient-manually/add-patient-manually.component';
import {UpcomingAppoinmentsComponent} from "./components/booked-events-listing/upcoming-appoinments/upcoming-appoinments.component";
import {PastAppoinmentsComponent} from "./components/booked-events-listing/past-appoinments/past-appoinments.component";
import { PatientSelectModalComponent } from './components/tech/patient-management/patient-select-modal/patient-select-modal.component';
import { ReportUploadSuccessModalComponent } from './components/tech/patient-management/report-upload-success-modal/report-upload-success-modal.component';
import { EncounterFormComponent } from './components/encounter-form/encounter-form.component';
import {RescheduleAppointmentComponent} from "./components/booked-events-listing/reschedule-appointment/reschedule-appointment.component";
import { PatientDetailsComponent } from './components/doctor/doctor-dashboard/patient-report-view/patient-details/patient-details.component';
import { EncounterFormRulesComponent } from './components/common/encounter-form-rules/encounter-form-rules.component';
import { ApprovedPatientReportsComponent } from './components/admin/admin-dashboard/approved-patient-reports/approved-patient-reports.component';
import { DoctorSignupShareComponent } from './components/common/doctor-signup-share/doctor-signup-share.component';
import { ApprovedPatientReportsBilleradminComponent } from './components/adminbiller/approved-patient-reports/approved-patient-reports-billeradmin/approved-patient-reports-billeradmin.component';
import { HoldReportJobTicketComponent } from './components/admin/admin-dashboard/hold-report-job-ticket/hold-report-job-ticket.component';
import { CptValidateReportsComponent } from './components/admin/cpt-validate-reports/cpt-validate-reports/cpt-validate-reports.component'
import { ReportsDetailsComponent } from './components/admin/reports-details/reports-details/reports-details.component';
import { JobTicketPatientReportsComponent } from './components/admin/admin-dashboard/job-ticket-patient-reports/job-ticket-patient-reports.component';
import { ViewJobTicketImageComponent } from './components/admin/admin-dashboard/hold-report-job-ticket/view-job-ticket-image/view-job-ticket-image.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "red",
  "bgsOpacity": 1,
  "bgsPosition": "center-center",
  "bgsSize": 80,
  "bgsType": "rectangle-bounce",
  "blur": 30,
  "delay": 0,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 100,
  "fgsType": "three-strings",
  "gap": 50,
  //"logoPosition": "center-center",
  //"logoSize": 120,
  //"logoUrl": "../assets/images/minilogo.png",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 6,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 500
}


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
    SRDialogtest,
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
    BookedAppoinmentsComponent,
    ListComponent,
    DoctorOfficeDashboardComponent,
    DoctorOfficeHeaderComponent,
    DoctorOfficeFooterComponent,
    BookedAppoinmentsComponent,
    DoctorOfficeAccountSettingsComponent,
    DoctorOfficeChangePasswordComponent,
    LogoutComponent,
    PatientReportViewComponent,
    DoctorViewDialogComponent,
    EditPatientRecordComponent,
    ReportNotProcessComponent,
    DownloadSuperbillerComponent,
    DownloadDetailsComponent,

    AddEditDiagnosticAdminComponent,
    DiagnosticAdminPasswordChange,
    ListingDiagnosticAdminComponent,
    DiagnosticAdminDashboardComponent,
    DiagnosticAdminHeaderComponent,
    DiagnosticAdminFooterComponent,
    AdditionalRecommemdedDiagnosticTestsComponent,

    ListSalesPersonComponent,
    AddEditSalesPersonComponent,
    SalesPersonDashboardComponent,
    SalesPersonHeaderComponent,
    SalesPersonFooterComponent,
    AddEditFaqComponent,
    ListFaqComponent,
    FaqViewComponent,
    FaqViewComponent,
    CalCreateSlotComponent,
    CalSyncWithGoogleComponent,
    CalHomeComponent,
    CalViewSlotComponent,
    CalEventListingComponent,
    AppoinmentsListingComponent,
    BookAppoinmentNowComponent,
    BookedEventsComponent,
    ReportConformationComponent,
    AddEditInsuranceComponent,
    ListingInsuranceComponent,
    AddEditInsurancetypeComponent,
    ListingInsurancetypeComponent,
    AddEditDoctorgroupComponent,
    ListingDoctorgroupComponent,
    AddEditAdminbillerComponent,
    ListingAdminbillerComponent,
    AddEditPatientinformationComponent,
    ListingPatientinformationComponent,
    AddEditDistributorsComponent,
    ListingDistributorsComponent,
    DoctorGroupDashboardComponent,
    DoctorGroupHeaderComponent,
    DoctorGroupFooterComponent,
    DistributorsDashboardComponent,
    DistributorsHeaderComponent,
    DistributorsFooterComponent,
    AdminbillerDashboardComponent,
    AdminbillerHeaderComponent,
    AdminbillerFooterComponent,
    AddPatientManuallyComponent,
    UpcomingAppoinmentsComponent,
    PastAppoinmentsComponent,
    ChooseDoctorDialog,
    PatientSelectModalComponent,
    ReportUploadSuccessModalComponent,
    EncounterFormComponent,
    RescheduleAppointmentComponent,
    EncounterFormComponent,
    PatientDetailsComponent,
    EncounterFormRulesComponent,
    ApprovedPatientReportsComponent,
    DoctorSignupShareComponent,
    ApprovedPatientReportsBilleradminComponent,
    HoldReportJobTicketComponent,
    CptValidateReportsComponent,
    ReportsDetailsComponent,
    JobTicketPatientReportsComponent,
    ViewJobTicketImageComponent,

    TimeAgoPipe,
  ],
  imports: [
    SatDatepickerModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    DeferLoadModule,
    MetaModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    DemoMaterialModule,
    LoginModule,
    ListingModule,
    CalendarManagementModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),

    /* Loader */
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule,

    //ckeditor
    CKEditorModule,
  ],
  exports: [
    MatPaginatorModule
  ],
  providers: [
    HttpLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    CookieService,
    AuthguardService,
    HttpServiceService,
    DatePipe,
    CommonFunction,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE
      ]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    },
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents:[
    ChangePasswordDoctorModal,
    Dialogtest, SRDialogtest, ChangePasswordModal,
    ChangePasswordAdminModal,
    ChangePasswordDoctorOfficeModal,
    DiagnosticAdminPasswordChange,
    DiagnosticAdminPasswordChange,

    DialogBoxComponent,
    PasswordDialogBoxComponent,
    UploadDialogBoxComponent,
    TestComponent,
    DoctorViewDialogComponent,
    DownloadDetailsComponent,
    ChooseDoctorDialog,

    // Bulk Upload Modal
    PatientSelectModalComponent,
    ReportUploadSuccessModalComponent,

    // View job tickets image
    ViewJobTicketImageComponent,
  ]
})

export class AppModule {

  constructor(public http: HttpClient) {
    // this.http.get('localhost/api/googleapiphp/powertag.php?q=car&count=3')
    //   .subscribe((r) => {
    //     console.log(r);
    //   });
  }

}
