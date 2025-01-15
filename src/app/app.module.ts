import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RowsComponent } from './shared/rows/rows.component';
import { SimplePageComponent } from './shared/simple-page/simple-page.component';
import { MyProfileComponent } from './template/my-profile/my-profile.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    
    RegisterComponent,
    NavbarComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    RowsComponent,
    SimplePageComponent,
    MyProfileComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule, FormsModule,CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
