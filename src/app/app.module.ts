import { Rating, RatingModule } from 'primeng/rating';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CommonModule } from '@angular/common';

import { CardsComponent } from './shared/cards/cards.component';
import { StoreComponent } from './template/store/store.component';
import { DisplayComponent } from './display/display.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NearMeComponent } from './template/near-me/near-me.component';
import { HeroComponent } from './template/hero/hero.component';
import { FAQComponent } from './miscellaneous/faq/faq.component';
import { TestimonialsComponent } from './miscellaneous/testimonials/testimonials.component';
import { LandingPageComponent } from './template/landing-page/landing-page.component';
import { Dummy2Component } from './shared/dummy2/dummy2.component';
import { AdvantagesComponent } from './miscellaneous/advantages/advantages.component';
import { StoreLocatorComponent } from './miscellaneous/store-locator/store-locator.component';
import { ProfileShowComponent } from './shared/profile-show/profile-show.component';
import { ProfileEditComponent } from './shared/profile-edit/profile-edit.component';
import { ReviewComponent } from './shared/review/review.component';
import { BookacallComponent } from './shared/bookacall/bookacall.component';
import { DummyComponent } from './shared/dummy/dummy.component';

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
    CardsComponent,
    StoreComponent,
    DisplayComponent,
    NearMeComponent,
    HeroComponent,
    FAQComponent,
    TestimonialsComponent,
    LandingPageComponent,
    Dummy2Component,
    AdvantagesComponent,
    StoreLocatorComponent,
    ProfileShowComponent,
    ProfileEditComponent,
    ReviewComponent,
    BookacallComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule
  ],
  providers: [provideHttpClient(withFetch())], // Enable the fetch API for HttpClient
  bootstrap: [AppComponent],
})
export class AppModule {}
