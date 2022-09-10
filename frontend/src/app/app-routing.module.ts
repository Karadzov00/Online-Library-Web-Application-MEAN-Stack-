import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'reader', component: ReaderComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'homepage', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
