import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Auth Component */
import { LoginComponent } from '../components/auth/login/login.component';
import { ForgetpasswordComponent } from '../components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../components/auth/resetpassword/resetpassword.component';
import { TechdashboardComponent } from '../components/techdashboard/techdashboard.component';

/* Test Component */
import { TestComponent } from '../components/test/test.component';

const routes: Routes = [
  // Auth Route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'sign-up', redirectTo: '/login', pathMatch: 'full' },

  // tech dashboard
  { path: 'tech-dashboard', component: TechdashboardComponent},
  
  /**test component route start here**/
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
