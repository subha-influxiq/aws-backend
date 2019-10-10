import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Auth Component */
import { LoginComponent } from '../components/auth/login/login.component';
import { ForgetpasswordComponent } from '../components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../components/auth/resetpassword/resetpassword.component';
/**dashboards**/
import { TechDashboardComponent } from '../components/dashboard/tech-dashboard/tech-dashboard.component';
import { AdminDashboardComponent } from '../components/dashboard/admin-dashboard/admin-dashboard.component';
import { BillerDashboardComponent } from '../components/dashboard/biller-dashboard/biller-dashboard.component';
import { DoctorDashboardComponent } from '../components/dashboard/doctor-dashboard/doctor-dashboard.component';
/* Test Component */
import { TestComponent } from '../components/test/test.component';
import { from } from 'rxjs';

const routes: Routes = [
  // Auth Route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'sign-up', redirectTo: '/login', pathMatch: 'full' },

  //dashboards
  { path: 'tech-dashboard', component: TechDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'biller-dashboard', component: BillerDashboardComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },

  /**test component route start here**/
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
