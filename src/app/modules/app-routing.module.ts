import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../services/authguard.service';
import { from } from 'rxjs';
/* Resolve Service */
import { ResolveService } from '../services/resolve.service';

/* Auth Component */
import { LoginComponent } from '../components/auth/login/login.component';
import { ForgetpasswordComponent } from '../components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../components/auth/resetpassword/resetpassword.component';

/* All Dashboards */
import { TechDashboardComponent } from '../components/dashboard/tech-dashboard/tech-dashboard.component';
import { AdminDashboardComponent } from '../components/dashboard/admin-dashboard/admin-dashboard.component';
import { BillerDashboardComponent } from '../components/dashboard/biller-dashboard/biller-dashboard.component';
import { DoctorDashboardComponent } from '../components/dashboard/doctor-dashboard/doctor-dashboard.component';

/**patient-management under tech-dashboard**/
import { AddEditPatientComponent } from '../components/dashboard/tech-dashboard/patient-management/add-edit-patient/add-edit-patient.component';

/**bulk upload**/
import { BulkUploadComponent } from '../components/dashboard/tech-dashboard/patient-management/bulk-upload/bulk-upload.component';

/* User Mnagement */
import { UserAddEditComponent } from '../components/user-management/user-add-edit/user-add-edit.component'
import { AddEditComponent } from '../components/admin-management/add-edit/add-edit.component';
import { ManageAdminListComponent } from '../components/admin-management/manage-admin-list/manage-admin-list.component';
import { AddeditDoctorComponent } from '../components/doctor-management/addedit-doctor/addedit-doctor.component';
import { ListDoctorComponent } from '../components/doctor-management/list-doctor/list-doctor.component';

/* Biller Management */
import { AddEditBillerComponent } from '../components/biller-management/add-edit-biller/add-edit-biller.component';
import { ListingBillerComponent } from '../components/biller-management/listing-biller/listing-biller.component';

/* Tech Management */
import { AddEditTechComponent } from '../components/tech-management/add-edit-tech/add-edit-tech.component';
import { ListingTechComponent } from '../components/tech-management/listing-tech/listing-tech.component';

/* Account Settings */
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { ChangePasswordComponent } from '../components/account-settings/change-password/change-password.component';

/* Test Component */
import { TestComponent } from '../components/test/test.component';

const routes: Routes = [
  /* Auth Route */
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'sign-up', redirectTo: '/login', pathMatch: 'full' },

  /* Admin Route */
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthguardService], resolve: { dataCount: ResolveService },
    data: {
      requestcondition: {
        source: ['doctors', 'biller', 'tech'],
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  /* Account-Settings */
  { path: 'admin/account-settings', component: AccountSettingsComponent, canActivate: [AuthguardService] },
  { path: 'admin/account-settings/change-password', component: ChangePasswordComponent, canActivate: [AuthguardService] },
  /* User Management */
  { path: 'admin/user-management/add', component: UserAddEditComponent, canActivate: [AuthguardService] },
  { path: 'admin/user-management/edit/:_id', component: UserAddEditComponent, canActivate: [AuthguardService], resolve: { UserData: ResolveService },
    data: {
      requestcondition: {
        source: 'user_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  /* Admin  Management */
  { path: 'admin/admin-management/add', component: AddEditComponent, canActivate: [AuthguardService] },
  { path: 'admin/admin-management/edit/:_id', component: AddEditComponent, canActivate: [AuthguardService], resolve: { adminsingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  { path: 'admin/admin-management/list', component: ManageAdminListComponent, canActivate: [AuthguardService], resolve: { adminManagementdData: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: { 'type': 'admin' }
      },
      endpoint: 'datalist'
    },
  },
  /* Biller Management */
  { path: 'admin/biller-management/add', component: AddEditBillerComponent, canActivate: [AuthguardService] },
  { path: 'admin/biller-management/edit/:_id', component: AddEditBillerComponent, canActivate: [AuthguardService], resolve: { billersingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  { path: 'admin/biller-management/list', component: ListingBillerComponent, canActivate: [AuthguardService], resolve: { Billerdata: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: { 'type': 'biller' }
      },
      endpoint: 'datalist'
    },
  },
  /* Tech Management */
  { path: 'admin/tech-management/add', component: AddEditTechComponent, canActivate: [AuthguardService] },
  { path: 'admin/tech-management/edit/:_id', component: AddEditTechComponent, canActivate: [AuthguardService], resolve: { techData: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  { path: 'admin/tech-management/list', component: ListingTechComponent, canActivate: [AuthguardService], resolve: { techDashboardData: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: { 'type': 'tech' }
      },
      endpoint: 'datalist'
    },
  },

  /* Tech Dashboard */
  { path: 'tech/dashboard', component: TechDashboardComponent, canActivate: [AuthguardService],
    resolve: { techDashboardData: ResolveService },
    data: { 
      requestcondition: {
        source: 'user_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },
  { path: 'tech/patient-management/add', component: AddEditPatientComponent, canActivate: [AuthguardService] },
  /**bulk upload**/
  {
    path: 'tech/patient-management/bulk-upload',
    component: BulkUploadComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'biller/dashboard',
    component: BillerDashboardComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'doctor/dashboard',
    component: DoctorDashboardComponent,
    canActivate: [AuthguardService]
  },
  /**user-management**/
  


  /**test component route start here**/
  {
    path: 'test', component: TestComponent,
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'user_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
  },


  // _____________________________DOCTOR MANAGEMENT___________________________

  { path: 'admin/doctor-management/add', component: AddeditDoctorComponent },

  {
    path: 'admin/doctor-management/list', component: ListDoctorComponent,
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: { 'type': 'doctor' }
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
  },
  {
    path: 'admin/doctor-management/edit/:_id', component: AddeditDoctorComponent,
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
  },
  {
    path: 'admin/dashboard', component: AdminDashboardComponent,
    resolve: { data: ResolveService },
    data: {
      requestcondition: {
        source: 'doctors',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ResolveService]
})
export class AppRoutingModule { }
