import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminComponent } from './admin/admin.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ObligationHistoryComponent } from './obligation-history/obligation-history.component';
import { ObligationsComponent } from './obligations/obligations.component';
import { ProfileComponent } from './profile/profile.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { UpdateBookComponent } from './update-book/update-book.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'reader', component: ReaderComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search', component: SearchComponent},
  {path: 'book', component: BookPageComponent},
  {path: 'obligations', component: ObligationsComponent},
  {path: 'obligationHistory', component: ObligationHistoryComponent},
  {path: 'updateBook', component: UpdateBookComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
