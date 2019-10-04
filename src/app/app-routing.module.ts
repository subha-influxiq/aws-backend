import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { TestComponent } from './components/test/test.component';
//  import { TestforgetPasswordComponent } from './components/';
import { TestresetPasswordComponent } from './components/testreset-password/testreset-password.component';
import { TestforgetPasswordComponent } from './components/testforget-password/testforget-password.component';
import { TestsignupComponent } from './components/testsignup/testsignup.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  /**test component route start here**/
  { path: 'test', component: TestComponent },
  { path: 'forget-password', component: TestforgetPasswordComponent },
  { path: 'reset-password', component: TestresetPasswordComponent },
  { path: 'Signup', component: TestsignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
