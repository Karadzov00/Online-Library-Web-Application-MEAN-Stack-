import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReaderComponent } from './reader/reader.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ObligationsComponent } from './obligations/obligations.component';
import { ObligationHistoryComponent } from './obligation-history/obligation-history.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ReaderComponent,
    ModeratorComponent,
    HomepageComponent,
    ProfileComponent,
    SearchComponent,
    BookPageComponent,
    ObligationsComponent,
    ObligationHistoryComponent,
    UpdateBookComponent,
    AddBookComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
