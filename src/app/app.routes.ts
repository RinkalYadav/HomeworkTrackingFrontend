import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'**',component:FileNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // imports RouterModule with routes defined
    exports: [RouterModule]                  // exports RouterModule for use in other parts of the app
  })
  export class AppRoutingModule { }