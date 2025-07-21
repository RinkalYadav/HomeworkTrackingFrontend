import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { TeacherpageComponent } from './teacherpage/teacherpage.component';
import { StudentComponent } from './studentpage/studentpage.component'; // if needed
import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ParentpageComponent } from './parentpage/parentpage.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teacherpage', component: TeacherpageComponent },
  { path: 'student', component: StudentComponent }, // optional
  { path: 'parent', component: ParentpageComponent },
  {
  path: 'forgot-password',
  loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
}
,
  { path: '**', component: FileNotFoundComponent }
];
