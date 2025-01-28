import { MyProfileComponent } from './template/my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { SimplePageComponent } from './shared/simple-page/simple-page.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StoreComponent } from './template/store/store.component';
import { DisplayComponent } from './display/display.component';
import { NearMeComponent } from './template/near-me/near-me.component';
import { HeroComponent } from './template/hero/hero.component';
import { DummyComponent } from './shared/dummy/dummy.component';
import { Dummy2Component } from './shared/dummy2/dummy2.component';
import { ProfileShowComponent } from './shared/profile-show/profile-show.component';
import { ProfileEditComponent } from './shared/profile-edit/profile-edit.component';
import { BookacallComponent } from './shared/bookacall/bookacall.component';
import { ReviewComponent } from './shared/review/review.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewbookingComponent } from './shared/newbooking/newbooking.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { TopnavComponent } from './pages/topnav/topnav.component';

const routes: Routes = [

  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "contact", component: ContactComponent },
  { path: "blog", component: BlogComponent },

  // profile contains - ps and pe
  { path: "profile", component: MyProfileComponent },
  { path: "ps", component: ProfileShowComponent },
  { path: "pe", component: ProfileEditComponent },

  { path: "near", component: NearMeComponent },

  // templates
  { path: "prof", component: MyProfileComponent },

  // testing
  { path: "feedback", component: FeedbackComponent },
  {path:"store", component: StoreComponent},
  { path: "d", component: DummyComponent },
  { path: "dd", component: Dummy2Component },
  { path: "tn", component: TopnavComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
