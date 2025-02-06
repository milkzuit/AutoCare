import { NewsService } from './news.service';
import { IInfiniteScrollAction } from './../../node_modules/ngx-infinite-scroll/models.d';
import { RatingModule } from 'primeng/rating';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
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
import { CommonModule } from '@angular/common';

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
import { NewbookingComponent } from './shared/newbooking/newbooking.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { InfiniteScrollDirective, InfiniteScrollModule } from "ngx-infinite-scroll";
import { ProductComponent } from './pages/product/product.component';
import { TopnavComponent } from './pages/topnav/topnav.component';
import { PrivacypolicyComponent } from './miscellaneous/privacypolicy/privacypolicy.component';
import { TermsofuseComponent } from './miscellaneous/termsofuse/termsofuse.component';

import { HomeComponent } from './layout/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CarServiceService } from './services/car-service.service';
import { ServiceCarouselComponent } from './components/service-carousel/service-carousel.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { CartComponent } from './components/cart/cart.component';
import { ChatbotComponent } from './ai/chatbot/chatbot.component';



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
    DummyComponent,
    NewbookingComponent,
    LandingComponent,
    ContactComponent,
    BlogComponent,
    ProductComponent,
    TopnavComponent,
    PrivacypolicyComponent,
    TermsofuseComponent,
  
    // store
    HomeComponent,
    CheckoutComponent,
    ServiceCarouselComponent,
    ServiceCardComponent,
    CartComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    InfiniteScrollDirective,
   
    
  ],
  providers: [provideHttpClient(withFetch()), NewsService], // Enable the fetch API for HttpClient
  bootstrap: [AppComponent],
})
export class AppModule {}
