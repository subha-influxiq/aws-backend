
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { AuthguardService } from '../services/authguard.service';
import { from } from 'rxjs';

/* Resolve Service */
import { ResolveService } from '../services/resolve.service';
import { CalendarService } from '../services/calendar.service';

/* Auth Component */
import { LoginComponent } from '../components/auth/login/login.component';
import { ForgetpasswordComponent } from '../components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../components/auth/resetpassword/resetpassword.component';
import { LogoutComponent } from '../components/auth/logout/logout.component';

/****************** Admin *****************/
import { ReportNotProcessComponent } from '../components/admin/report-not-process/report-not-process.component';
import { AdminDashboardComponent } from '../components/admin/admin-dashboard/admin-dashboard.component';
import { EditPatientRecordComponent } from '../components/admin/admin-dashboard/edit-patient-record/edit-patient-record.component';

// Diagnostic Admin Management
import { AddEditDiagnosticAdminComponent } from '../components/admin/diagnostic-admin-management/add-edit-diagnostic-admin/add-edit-diagnostic-admin.component';
import { ListingDiagnosticAdminComponent } from '../components/admin/diagnostic-admin-management/listing-diagnostic-admin/listing-diagnostic-admin.component';

/* User Mnagement */
import { UserAddEditComponent } from '../components/admin/user-management/user-add-edit/user-add-edit.component'
import { AddEditComponent } from '../components/admin/admin-management/add-edit/add-edit.component';
import { ManageAdminListComponent } from '../components/admin/admin-management/manage-admin-list/manage-admin-list.component';
import { AddeditDoctorComponent } from '../components/admin/doctor-management/addedit-doctor/addedit-doctor.component';
import { ListDoctorComponent } from '../components/admin/doctor-management/list-doctor/list-doctor.component';

/* Biller Management */
import { AddEditBillerComponent } from '../components/admin/biller-management/add-edit-biller/add-edit-biller.component';
import { ListingBillerComponent } from '../components/admin/biller-management/listing-biller/listing-biller.component';

/* Tech Management */
import { AddEditTechComponent } from '../components/admin/tech-management/add-edit-tech/add-edit-tech.component';
import { ListingTechComponent } from '../components/admin/tech-management/listing-tech/listing-tech.component';

/* Sales Person Management */
import { ListSalesPersonComponent } from '../components/admin/sales-person-management/list-sales-person/list-sales-person.component';
import { AddEditSalesPersonComponent } from '../components/admin/sales-person-management/add-edit-sales-person/add-edit-sales-person.component';

/* FNQ Management */
import { AddEditFaqComponent } from '../components/admin/faq-management/add-edit-faq/add-edit-faq.component';
import { ListFaqComponent } from '../components/admin/faq-management/list-faq/list-faq.component';

/**Doctor Office Mnagement**/
import { DoctorOfficeManagementComponent } from '../components/admin/doctor-office-management/doctor-office-management.component';
import { AddEditDoctorOfcComponent } from '../components/admin/doctor-office-management/add-edit-doctor-ofc/add-edit-doctor-ofc.component';

/**Booked-Appoiments**/
import { BookedAppoinmentsComponent } from '../components/admin/booked-appoinments/booked-appoinments.component';

/* Account Settings */
import { AccountSettingsComponent } from '../components/common/account-settings/account-settings.component';
import { ChangePasswordComponent } from '../components/common/account-settings/change-password/change-password.component';

/***************** Tech Dashboard ****************/
import { TechDashboardComponent } from '../components/tech/tech-dashboard/tech-dashboard.component';
import { CalHomeComponent } from '../components/tech/manage-calender/manage-schedule/cal-home/cal-home.component';
import { ListComponent } from '../components/tech/manage-calender/my-appointments/list/list.component';

/* Patient Management */
import { AddEditPatientComponent } from '../components/admin/admin-dashboard/add-edit-patient/add-edit-patient.component';

/* Bulk Upload**/
import { BulkUploadComponent } from '../components/tech/patient-management/bulk-upload/bulk-upload.component';
import { ReportConformationComponent } from '../components/tech/patient-management/report-conformation/report-conformation.component';

import { BillerDashboardComponent } from '../components/biller/biller-dashboard/biller-dashboard.component';

/**Doctor Dashboard **/
import { DoctorDashboardComponent } from '../components/doctor/doctor-dashboard/doctor-dashboard.component';
import { PatientReportViewComponent } from '../components/doctor/doctor-dashboard/patient-report-view/patient-report-view.component';
import { ReportDetailsComponent } from '../components/tech/report-details/report-details.component';


/***************** Doctor Office Dashboard ****************/
import { DoctorOfficeDashboardComponent } from '../components/doctor-office/doctor-office-dashboard/doctor-office-dashboard.component';

/* Error Pages */
import { NotFoundErrorComponent } from '../components/common/not-found-error/not-found-error.component';


/* Sales Person */
import { SalesPersonDashboardComponent } from '../components/sales-person/sales-person-dashboard/sales-person-dashboard.component';


/* Test Component */
import { TestComponent } from '../components/test/test.component';


import { HealthriskSystemEncounterComponent } from '../components/doctor/doctor-dashboard/patient-report-view/healthrisk-system-encounter/healthrisk-system-encounter.component';
import { SystemSuperbillComponent } from '../components/doctor/doctor-dashboard/patient-report-view/system-superbill/system-superbill.component';
import { HealthRiskAnalysisComponent } from '../components/doctor/doctor-dashboard/patient-report-view/health-risk-analysis/health-risk-analysis.component';
import { SignatureManagementComponent } from '../components/doctor/signature-management/signature-management.component';
import { DoctorOfficeAccountSettingsComponent } from '../components/doctor-office/doctor-office-account-settings/doctor-office-account-settings.component';
import { DoctorOfficeChangePasswordComponent } from '../components/doctor-office/doctor-office-change-password/doctor-office-change-password.component';
import { DownloadSuperbillerComponent } from '../components/biller/download-superbiller/download-superbiller.component';
import { DiagnosticAdminDashboardComponent } from '../components/diagnostic-admin/diagnostic-admin-dashboard/diagnostic-admin-dashboard.component';
import { FaqViewComponent } from '../components/common/faq-view/faq-view.component';
import { CalCreateSlotComponent } from '../components/tech/manage-calender/manage-schedule/cal-create-slot/cal-create-slot.component';
import { CalEventListingComponent } from '../components/tech/manage-calender/manage-schedule/cal-event-listing/cal-event-listing.component';
import { CalViewSlotComponent } from '../components/tech/manage-calender/manage-schedule/cal-view-slot/cal-view-slot.component';

import { AppoinmentsListingComponent } from '../components/doctor-office/manage-appointments/appoinments-listing/appoinments-listing.component';
import { BookAppoinmentNowComponent } from '../components/doctor-office/manage-appointments/book-appoinment-now/book-appoinment-now.component';
import { CalSyncWithGoogleComponent } from '../components/tech/manage-calender/manage-schedule/cal-sync-with-google/cal-sync-with-google.component';
import { BookedEventsComponent } from '../components/tech/manage-calender/manage-schedule/booked-events/booked-events.component';
import {AddEditInsuranceComponent} from '../components/admin/manage-insurance/add-edit-insurance/add-edit-insurance.component';
import { ListingInsuranceComponent } from '../components/admin/manage-insurance/listing-insurance/listing-insurance.component';
import { AddEditInsurancetypeComponent } from '../components/admin/manage-insurancetype/add-edit-insurancetype/add-edit-insurancetype.component';
import { ListingInsurancetypeComponent } from '../components/admin/manage-insurancetype/listing-insurancetype/listing-insurancetype.component';

const routes: Routes = [
  /********** Auth Route Start **********/
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'forget-password', 
    component: ForgetpasswordComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'reset-password/:token', 
    component: ResetpasswordComponent 
  },
  { 
    path: 'sign-up', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'logout', 
    component: LogoutComponent 
  },
  /********** Auth Route Start **********/





  /********** Admin Routes Start **********/
  {
    path: 'admin/dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthguardService],
    resolve: { dataCount: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'admin-dashboard'
    },
  },
  {
    path: 'admin/images-not-process', 
    component: ReportNotProcessComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  {
    path: 'admin/text-not-process', 
    component: ReportNotProcessComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          "report_type": "file",
          "images": { $exists: true },
          $or: [
            { "page_1": { $exists: false } },
            { "page_2": { $exists: false } },
            { "page_3": { $exists: false } },
            { "page_4": { $exists: false } },
            { "page_5": { $exists: false } },
            { "page_6": { $exists: false } },
            { "page_7": { $exists: false } }
          ]
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Patient Management */
  {
    path: 'admin/patient-record/:_id', 
    component: PatientReportViewComponent,
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'report-view'
    },
  },
  {
    path: 'admin/patient-management/add', 
    component: AddEditPatientComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/patient-record/edit/:_id', 
    component: EditPatientRecordComponent, 
    canActivate: [AuthguardService],
    resolve: { patientData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },

  /* User Management */
  { 
    path: 'admin/user-management/add', 
    component: UserAddEditComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/user-management/edit/:_id', 
    component: UserAddEditComponent, 
    canActivate: [AuthguardService], 
    resolve: { UserData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },

  /* Admin Management */
  {
    path: 'admin/admin-management', 
    component: ManageAdminListComponent, 
    canActivate: [AuthguardService],
  },
  { 
    path: 'admin/admin-management/add', 
    component: AddEditComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/admin-management/edit/:_id', 
    component: AddEditComponent, 
    canActivate: [AuthguardService], 
    resolve: { adminsingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "admin"
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Biller Management */
  {
    path: 'admin/biller-management', 
    component: ListingBillerComponent, 
    canActivate: [AuthguardService],
  },
  { 
    path: 'admin/biller-management/add', 
    component: AddEditBillerComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/biller-management/edit/:_id', 
    component: AddEditBillerComponent, 
    canActivate: [AuthguardService], 
    resolve: { billersingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "biller"
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Tech Management */
  {
    path: 'admin/tech-management', 
    component: ListingTechComponent, 
    canActivate: [AuthguardService],
  },
  { 
    path: 'admin/tech-management/add', 
    component: AddEditTechComponent, 
    canActivate: [AuthguardService] 
  },{
    path: 'admin/insurance-management', 
    component: ListingInsuranceComponent, 
    canActivate: [AuthguardService],
  },
  { 
    path: 'admin/insurance-management/add', 
    component: AddEditInsuranceComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/insurance-management/edit/:_id', 
    component: AddEditInsuranceComponent, 
    canActivate: [AuthguardService], 
    resolve: { insuranceData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "insurance",

        }
      },
      endpoint: 'datalist'
    },
  },
  {
    path: 'admin/tech-management/edit/:_id', 
    component: AddEditTechComponent, 
    canActivate: [AuthguardService], 
    resolve: { techData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "tech",

        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Doctor Management */
  {
    path: 'admin/doctor-management', 
    component: ListDoctorComponent, 
    canActivate: [AuthguardService]
  },
  { 
    path: 'admin/doctor-management/add', 
    component: AddeditDoctorComponent 
  },
  {
    path: 'admin/doctor-management/edit/:_id', 
    component: AddeditDoctorComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "doctor"
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Doctor Office Management */
  {
    path: 'admin/doctor-office-management', 
    component: DoctorOfficeManagementComponent, canActivate: [AuthguardService],
  },
  { 
    path: 'admin/doctor-office-management/add', 
    component: AddEditDoctorOfcComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/doctor-office-management/edit/:_id', 
    component: AddEditDoctorOfcComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },


  {
    path: 'admin/insurance-type-management', 
    component: ListingInsurancetypeComponent, 
    canActivate: [AuthguardService],
  },
  { 
    path: 'admin/insurance-type-management/add', 
    component: AddEditInsurancetypeComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/insurance-type-management/edit/:_id', 
    component: AddEditInsurancetypeComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },

  /* Diagnostic Admin Management */
  {
    path: 'admin/diagnostic-admin-management', 
    component: ListingDiagnosticAdminComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "diagnostic_admin"
        }
      },
      endpoint: 'datalist'
    },
  },
  {
    path: 'admin/diagnostic-admin-management/add', 
    component: AddEditDiagnosticAdminComponent, 
    canActivate: [AuthguardService],
  },
  {
    path: 'admin/diagnostic-admin-management/edit/:_id', 
    component: AddEditDiagnosticAdminComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "diagnostic_admin"
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Sales Person Management */
  {
    path: 'admin/sales-person-management', 
    component: ListSalesPersonComponent, 
    canActivate: [AuthguardService], 
    resolve: { techDashboardData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "sales_person"
        }
      },
      endpoint: 'datalist'
    },
  },
  { 
    path: 'admin/sales-person-management/add', 
    component: AddEditSalesPersonComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/sales-person-management/edit/:_id', 
    component: AddEditSalesPersonComponent, 
    canActivate: [AuthguardService], 
    resolve: { techData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "sales_person",

        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* FNQ Management */
  {
    path: 'admin/faq-management', 
    component: ListFaqComponent, 
    canActivate: [AuthguardService], 
    resolve: { techDashboardData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  { 
    path: 'admin/faq-management/add', 
    component: AddEditFaqComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'admin/faq-management/edit/:_id', 
    component: AddEditFaqComponent, 
    canActivate: [AuthguardService], 
    resolve: { techData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  
  /* Booked Appoinments */
  { 
    path: 'admin/booked-appoinments', 
    component: BookedAppoinmentsComponent,
    canActivate: [AuthguardService],
    resolve: {bookedEventList: ResolveService},
    data: {
      requestcondition: {
        source: 'google-events',
        condition: {}
      },
      endpoint: 'list-booked-events'
    }
  },

  /* Faq */
  {
    path: 'admin/faq', 
    component: FaqViewComponent, 
    canActivate: [AuthguardService], 
    resolve: { faqData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {
          users: "admin"
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Account-Settings */
  { 
    path: 'admin/account-settings', 
    component: AccountSettingsComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'admin/account-settings/change-password', 
    component: ChangePasswordComponent, 
    canActivate: [AuthguardService] 
  },
  /********** Admin Routes End ***********/





  /****************** Diagnostic Admin Routes Start *****************/
  /* Diagnostic Admin Dashboard */
  {
    path: 'diagnostic-admin/dashboard', 
    component: DiagnosticAdminDashboardComponent, 
    canActivate: [AuthguardService],
    resolve: { dataCount: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'diagnostic-admin-dashboard'
    },
  },

  /* Add Patient Record Mannual */
  {
    path: 'diagnostic-admin/patient-management/add', 
    component: AddEditPatientComponent, 
    canActivate: [AuthguardService] 
  },

  /* Edit Patient Record */
  {
    path: 'diagnostic-admin/patient-record/edit/:_id', 
    component: EditPatientRecordComponent, 
    canActivate: [AuthguardService],
    resolve: { patientData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },

  /* Diagnostic Admin Patient Record View */
  {
    path: 'diagnostic-admin/patient-record/:_id', 
    component: PatientReportViewComponent,
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'report-view'
    },
  },

  /* Account Settings */
  { 
    path: 'diagnostic-admin/account-settings', 
    component: AccountSettingsComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'diagnostic-admin/account-settings/change-password', 
    component: ChangePasswordComponent, 
    canActivate: [AuthguardService] 
  },

  /* Tech Management */
  {
    path: 'diagnostic-admin/tech-management', 
    component: ListingTechComponent, 
    canActivate: [AuthguardService], 
    resolve: { techDashboardData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "tech"
        }
      },
      endpoint: 'datalist'
    },
  },
  { 
    path: 'diagnostic-admin/tech-management/add', 
    component: AddEditTechComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'diagnostic-admin/tech-management/edit/:_id', 
    component: AddEditTechComponent, 
    canActivate: [AuthguardService], 
    resolve: { techData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "tech"
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Doctor Management */
  {
    path: 'diagnostic-admin/doctor-management', 
    component: ListDoctorComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "doctor"
        }
      },
      endpoint: 'datalist'
    },
  },
  { 
    path: 'diagnostic-admin/doctor-management/add', 
    component: AddeditDoctorComponent 
  },
  {
    path: 'diagnostic-admin/doctor-management/edit/:_id', 
    component: AddeditDoctorComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "doctor"
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Biller Management */
  {
    path: 'diagnostic-admin/biller-management', 
    component: ListingBillerComponent, 
    canActivate: [AuthguardService], 
    resolve: { Billerdata: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "biller"
        }
      },
      endpoint: 'datalist'
    },
  },
  { 
    path: 'diagnostic-admin/biller-management/add', 
    component: AddEditBillerComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'diagnostic-admin/biller-management/edit/:_id', 
    component: AddEditBillerComponent, 
    canActivate: [AuthguardService], 
    resolve: { billersingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "biller"
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Faq */
  {
    path: 'diagnostic-admin/faq', 
    component: FaqViewComponent, 
    canActivate: [AuthguardService], 
    resolve: { faqData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {
          users: "diagnostic_admin"
        }
      },
      endpoint: 'datalist'
    },
  },
  /****************** Diagnostic Admin Routes End *****************/





  /****************** Tech Route Start *****************/
  /* Tech Dashboard */
  {
    path: 'tech/dashboard', 
    component: TechDashboardComponent, 
    canActivate: [AuthguardService],
    resolve: { techDashboardData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          "report_type": { $exists: true }
        },
      },
      endpoint: 'tech-dashboard'
    },
  },

  /* Report */
  { 
    path: 'tech/report/total-uploaded', 
    component: ReportDetailsComponent, 
    canActivate: [AuthguardService], 
  },
  { 
    path: 'tech/report/total-processed', 
    component: ReportDetailsComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'tech/report/total-remained-processed', 
    component: ReportDetailsComponent, 
    canActivate: [AuthguardService]
  },

  /* Calender Management */
  { 
    path: 'tech/manage-calender/manage-sehedule', 
    component: CalHomeComponent, 
    canActivate: [AuthguardService],
    resolve: {eventdayarrData: CalendarService},
    data: {
      requestcondition: {
        source: 'events_eventdayarr_view',
        condition: {}
      },
      endpoint: 'view-event-eventdayarr'
    }
  },
  { 
    path: 'tech/manage-calender/manage-sehedule/:access_token/:refresh', 
    component: CalSyncWithGoogleComponent, 
    canActivate: [AuthguardService]
  },
  { 
    path: 'tech/manage-calender/manage-sehedule/view-slot-user', 
    component: CalViewSlotComponent, 
    canActivate: [AuthguardService],
    resolve: {eventdayarrData: ResolveService},
    data: {
      requestcondition: {
        source: 'events_eventdayarr_view',
        condition: {$and: [{event_type: 1}]}
      },
      endpoint: 'cal-view-event-eventdayarr'
    }
  },
  { 
    path: 'tech/manage-calender/manage-sehedule/create-availability', 
    component: CalCreateSlotComponent
  },
  { 
    path: 'tech/manage-calender/manage-sehedule/booked-events',
    component: BookedEventsComponent,
    resolve: {eventListData: CalendarService},
    data: {
      requestcondition: {
        source: 'google-events',
        condition: {}
      },
      endpoint: 'list-booked-events'
    },
  },
  { 
    path: 'tech/manage-calender/manage-sehedule/event-listing', 
    component: CalEventListingComponent,
    resolve: {eventListData: CalendarService},
    data: {
      requestcondition: {
        source: 'events',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },

  /* My Appoinments */
  { 
    path: 'tech/manage-calender/my-appoinments', 
    component: ListComponent, 
    canActivate: [AuthguardService],
    resolve: {bookedEventList: ResolveService},
    data: {
      requestcondition: {
        source: 'google-events',
        condition: {}
      },
      endpoint: 'list-booked-events'
    },
  },

  /* Bulk Upload */
  { 
    path: 'tech/patient-management/bulk-upload', 
    component: BulkUploadComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'tech/patient-management/bulk-upload/report-conformation/:upload_id', 
    component: ReportConformationComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'tech/health-risk-system-encounter', 
    component: HealthriskSystemEncounterComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'tech/system-superbill', 
    component: SystemSuperbillComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'tech/health-risk-analysis', 
    component: HealthRiskAnalysisComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'tech/health-risk-system-encounter', 
    component: HealthriskSystemEncounterComponent 
  },
  { 
    path: 'tech/system-superbill', 
    component: SystemSuperbillComponent 
  },
  {
    path: 'tech/health-risk-analysis',
    component: HealthRiskAnalysisComponent,
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },

  /* Faq */
  {
    path: 'tech/faq', 
    component: FaqViewComponent, 
    canActivate: [AuthguardService], 
    resolve: { faqData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {
          users: "tech"
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Account-Settings */
  { 
    path: 'tech/account-settings', 
    component: AccountSettingsComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'tech/account-settings/change-password', 
    component: ChangePasswordComponent, 
    canActivate: [AuthguardService] 
  },
  /****************** Tech Route End *****************/





  /*****************  Biller Route ****************/
  /* Biller Dashboard */
  {
    path: 'biller/dashboard', 
    component: BillerDashboardComponent, 
    canActivate: [AuthguardService],
    resolve: { billerData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {},
      },
      endpoint: 'biller-dashboard'
    },
  },
  
  /* Download report */
  {
    path: 'download/super-bill/:_id', 
    component: DownloadSuperbillerComponent
  },
  {
    path: 'biller/patient-record-report/:_id', 
    component: PatientReportViewComponent,
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'report-view'
    },
  },

  /* Faq */
  {
    path: 'biller/faq', 
    component: FaqViewComponent, 
    canActivate: [AuthguardService], 
    resolve: { faqData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {
          users: "biller"
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Account Setting */
  { 
    path: 'biller/account-settings', 
    component: AccountSettingsComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'biller/account-settings/change-password', 
    component: ChangePasswordComponent, 
    canActivate: [AuthguardService] 
  },
  /******************  Biller Route End *******************/





  /*********** Doctor Route ***********/
  /* Doctor Dashboard */
  {
    path: 'doctor/dashboard', 
    component: DoctorDashboardComponent, 
    canActivate: [AuthguardService],
    resolve: { doctordata: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {},
      },
      endpoint: 'doctor-dashboard'
    },
  },
  {
    path: 'doctor/patient-record-report/:_id', 
    component: PatientReportViewComponent,
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {}
      },
      endpoint: 'report-view'
    },
  },

  /* Biller Management */
  {
    path: 'doctor/biller-management', 
    component: ListingBillerComponent, 
    canActivate: [AuthguardService], 
    resolve: { Billerdata: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "biller",
          diagnostic_admin_id: { $exists: false }
        }
      },
      endpoint: 'datalist'
    },
  },
  { 
    path: 'doctor/biller-management/add', 
    component: AddEditBillerComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'doctor/biller-management/edit/:_id', 
    component: AddEditBillerComponent, 
    canActivate: [AuthguardService], 
    resolve: { billersingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "biller",
          diagnostic_admin_id: { $exists: false }
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Tech Management */
  {
    path: 'doctor/tech-management', 
    component: ListingTechComponent, 
    canActivate: [AuthguardService], 
    resolve: { techDashboardData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "tech",
          diagnostic_admin_id: { $exists: false }
        }
      },
      endpoint: 'datalist'
    },
  },
  { 
    path: 'doctor/tech-management/add', 
    component: AddEditTechComponent, 
    canActivate: [AuthguardService] 
  },
  {
    path: 'doctor/tech-management/edit/:_id', 
    component: AddEditTechComponent, 
    canActivate: [AuthguardService], 
    resolve: { techData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          user_type: "tech",
          diagnostic_admin_id: { $exists: false }
        }
      },
      endpoint: 'datalist'
    },
  },
  
  /* Doctor Office Management */
  {
    path: 'doctor/doctor-office-management', 
    component: DoctorOfficeManagementComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          "user_type": "doctor_office",
          "diagnostic_admin_id": { $exists: false }
        }
      },
      endpoint: 'datalist'
    },
  },
  {
    path: 'doctor/doctor-office-management/add', 
    component: AddEditDoctorOfcComponent, 
    canActivate: [AuthguardService]
  },
  {
    path: 'doctor/doctor-office-management/edit/:_id', 
    component: AddEditDoctorOfcComponent, 
    canActivate: [AuthguardService],
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'data_pece',
        condition: {
          "user_type": "doctor_office",
          "diagnostic_admin_id": { $exists: false }
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Signature Management */
  { 
    path: 'doctor/signature-management', 
    component: SignatureManagementComponent, 
    canActivate: [AuthguardService] 
  },

  /* Faq */
  {
    path: 'doctor/faq', 
    component: FaqViewComponent, 
    canActivate: [AuthguardService], 
    resolve: { faqData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {
          users: "doctor"
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Account-Settings */
  { 
    path: 'doctor/account-settings', 
    component: AccountSettingsComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'doctor/account-settings/change-password', 
    component: ChangePasswordComponent, 
    canActivate: [AuthguardService] 
  },
  /****************** Doctor Route End *****************/





  /****************** Doctor Office Route Start *****************/
  /*Doctor Office Dashboard*/
  {
    path: 'doctor-office/dashboard', 
    component: DoctorOfficeDashboardComponent, 
    canActivate: [AuthguardService],
    resolve: {bookedEventList: ResolveService},
    data: {
      requestcondition: {
        source: 'google-events',
        condition: {}
      },
      endpoint: 'doctor-office-booked-list-events'
    }
  },

  /*Doctor Office Dashboard*/
  {
    path: 'doctor-office/manage-appointments', 
    component: AppoinmentsListingComponent, 
    canActivate: [AuthguardService],
    resolve: {bookedEventList: ResolveService},
    data: {
      requestcondition: {
        source: 'google-events',
        condition: {}
      },
      endpoint: 'doctor-office-booked-list-events'
    }
  },

  /* Google Sync */
  { 
    path: 'doctor-office/manage-appointments/:access_token/:refresh', 
    component: CalSyncWithGoogleComponent, 
    canActivate: [AuthguardService]
  },

  /*Doctor Office Dashboard*/
  {
    path: 'doctor-office/manage-appointments/book-appoinment-now', 
    component: BookAppoinmentNowComponent,
    canActivate: [AuthguardService],
    resolve: {eventdayarrData: CalendarService},
    data: {
      requestcondition: {
        source: 'events_eventdayarr_view',
        condition: {$or: [{event_type: 1}]}
      },
      endpoint: 'view-event-eventdayarr'
    }
  },

  /* Faq */
  {
    path: 'doctor-office/faq', 
    component: FaqViewComponent, 
    canActivate: [AuthguardService], 
    resolve: { faqData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {
          users: "doctor_office"
        }
      },
      endpoint: 'datalist'
    },
  },

  /* Account-Settings */
  { 
    path: 'doctor-office/account-settings', 
    component: AccountSettingsComponent, 
    canActivate: [AuthguardService] 
  },
  { 
    path: 'doctor-office/account-settings/change-password', 
    component: ChangePasswordComponent, 
    canActivate: [AuthguardService] 
  },
  /****************** Doctor Office Route End *****************/

  


  /****************** Sales Person *****************/
  /* Dashboard */
  {
    path: 'sales-person/dashboard', 
    component: SalesPersonDashboardComponent, 
    canActivate: [AuthguardService],
    // resolve: { dataCount: ResolveService },
    // data: {
    //   requestcondition: {
    //     source: 'data_pece',
    //     condition: {}
    //   },
    //   endpoint: 'diagnostic-admin-dashboard'
    // },
  },

  /* Faq */
  {
    path: 'sales-person/faq', 
    component: FaqViewComponent, 
    canActivate: [AuthguardService], 
    resolve: { faqData: ResolveService },
    data: {
      requestcondition: {
        source: 'data_faq',
        condition: {
          users: "sales_person"
        }
      },
      endpoint: 'datalist'
    },
  },


  /* test component route start here */
  {
    path: 'test', component: TestComponent,
    // resolve: {eventdayarrData: ResolveService},
    // data: {
    //   requestcondition: {
    //     source: 'events_eventdayarr_view',
    //     condition: {}
    //   },
    //   endpoint: 'view-event-eventdayarr'
    // }
  },



  /* Error Page Route Start */
  { 
    path: 'error/404', 
    component: NotFoundErrorComponent 
  },
  { 
    path: '**', 
    component: NotFoundErrorComponent 
  }
  /* Error Page Route End */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ResolveService]
})

export class AppRoutingModule {

  constructor() {
  }

}
