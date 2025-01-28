import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
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
import { CallBookingComponent } from './call-booking/call-booking.component';
import { CarServicesComponent } from './car-services/car-services.component';
import { HttpClientModule } from '@angular/common/http';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    RowsComponent,
    SimplePageComponent,
    MyProfileComponent,
    FeedbackComponent,
    CallBookingComponent,
    CarServicesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule,CommonModule,HttpClientModule
  ],
  providers: [provideHttpClient(withFetch())], // Enable the fetch API for HttpClient
  bootstrap: [AppComponent]
})
export class AppModule { }
