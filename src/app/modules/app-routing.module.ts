import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../services/authguard.service';
import { ResolveService } from '../services/resolve.service';

/* Auth Component */
import { LoginComponent } from '../components/auth/login/login.component';
import { ForgetpasswordComponent } from '../components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../components/auth/resetpassword/resetpassword.component';

/**dashboards**/
import { TechDashboardComponent } from '../components/dashboard/tech-dashboard/tech-dashboard.component';
import { AdminDashboardComponent } from '../components/dashboard/admin-dashboard/admin-dashboard.component';
import { BillerDashboardComponent } from '../components/dashboard/biller-dashboard/biller-dashboard.component';
import { DoctorDashboardComponent } from '../components/dashboard/doctor-dashboard/doctor-dashboard.component';

/**User-Mnagement**/
import { UserAddEditComponent } from '../components/user-management/user-add-edit/user-add-edit.component'
/* Test Component */
import { TestComponent } from '../components/test/test.component';
import { from } from 'rxjs';
import { AddEditComponent } from '../components/admin-management/add-edit/add-edit.component';
import { ManageAdminListComponent } from '../components/admin-management/manage-admin-list/manage-admin-list.component';
/**biller-management**/
import { AddEditBillerComponent } from '../components/biller-management/add-edit-biller/add-edit-biller.component';
import { ListingBillerComponent } from '../components/biller-management/listing-biller/listing-biller.component';
/**tech-management**/
import { AddEditTechComponent } from '../components/tech-management/add-edit-tech/add-edit-tech.component';
import { ListingTechComponent } from '../components/tech-management/listing-tech/listing-tech.component';
const routes: Routes = [
  // Auth Route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'sign-up', redirectTo: '/login', pathMatch: 'full' },

  //dashboards
  {
    path: 'dashboard/tech',
    component: TechDashboardComponent,

    canActivate: [AuthguardService],
    resolve :{techDashboardData :ResolveService},
    data: {
      requestcondition: {
        source: 'user_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
  },


  {
    path: 'dashboard/admin',
    component: AdminDashboardComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'dashboard/biller',
    component: BillerDashboardComponent,
    canActivate: [ AuthguardService ]
   },

  {
    path: 'dashboard/doctor',
    component: DoctorDashboardComponent,
    canActivate: [AuthguardService]
  },
  /**user-management**/
  {
    path: 'user-management/add',
    component: UserAddEditComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'user-management/edit/:_id',
    component: UserAddEditComponent,
    resolve :{UserData :ResolveService},
    data: {
      requestcondition: {
        source: 'user_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
  },
  /**admin  management*/
  {
    path: 'admin-management/add',
    component : AddEditComponent,
    canActivate: [ AuthguardService ]
  },
  {
    path: 'admin-management/edit/:_id',
    component : AddEditComponent,
    resolve: { adminsingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'admin_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [ AuthguardService ]
  },
  {
    path: 'admin-management/list',
    component : ManageAdminListComponent,
    resolve: { adminManagementdData: ResolveService },
    data: {
      requestcondition: {
        source: 'admin_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [ AuthguardService ]
  },
  /**Biller Management**/
   {
     path : 'biller-management/add',
     component :  AddEditBillerComponent,
     canActivate: [AuthguardService]
   },
   {
    path : 'biller-management/edit/:_id',
    component :  AddEditBillerComponent,
    resolve: { billersingleData: ResolveService },
    data: {
      requestcondition: {
        source: 'biller_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
  },
  
   {
    path : 'biller-management/list',
    component : ListingBillerComponent,
    resolve: { Billerdata: ResolveService },
    data: {
      requestcondition: {
        source: 'biller_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
   },
  /**tech-management**/
  {
    path : 'tech-management/add',
    component :  AddEditTechComponent,
    canActivate: [AuthguardService]
  },
  {
    path : 'tech-management/edit/:_id',
    component :  AddEditTechComponent,
    resolve :{techData :ResolveService},
    data: {
      requestcondition: {
        source: 'tech_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
   
  },
  {
    path : 'tech-management/list',
    component :  ListingTechComponent,
    resolve :{techDashboardData :ResolveService},
    data: {
      requestcondition: {
        source: 'tech_management',
        condition: {}
      },
      endpoint: 'datalist'
    },
    canActivate: [AuthguardService]
  },

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ResolveService]
})
export class AppRoutingModule { }
