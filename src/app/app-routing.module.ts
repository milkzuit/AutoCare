import { MyProfileComponent } from './template/my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { SimplePageComponent } from './shared/simple-page/simple-page.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CardsComponent } from './shared/cards/cards.component';
import { StoreComponent } from './template/store/store.component';
import { DisplayComponent } from './display/display.component';
import { NearMeComponent } from './template/near-me/near-me.component';
import { HeroComponent } from './template/hero/hero.component';
import { DummyComponent } from './shared/dummy/dummy.component';
import { Dummy2Component } from './shared/dummy2/dummy2.component';
import { StoreLocatorComponent } from './miscellaneous/store-locator/store-locator.component';
import { ProfileShowComponent } from './shared/profile-show/profile-show.component';
import { ProfileEditComponent } from './shared/profile-edit/profile-edit.component';
import { BookacallComponent } from './shared/bookacall/bookacall.component';
import { ReviewComponent } from './shared/review/review.component';

const routes: Routes = [
  // final
  { path: "", component: HeroComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "store-locator", component: StoreLocatorComponent },
  { path: "profile", component: MyProfileComponent },
  { path: "near", component: NearMeComponent },


  // templates
  { path: "dash", component: DashboardComponent },
  { path: "prof", component: MyProfileComponent },
  { path: "near", component: NearMeComponent },
  { path: "hero", component: HeroComponent },

  // templates

  // testing
  { path: "feedback", component: FeedbackComponent },
  {path:"cards", component: CardsComponent},
  {path:"store", component: StoreComponent},
  { path: "d", component: DummyComponent },
  { path: "dd", component: Dummy2Component },
  { path: "ps", component: ProfileShowComponent },
  { path: "pe", component: ProfileEditComponent },
  { path: "bookacall", component: BookacallComponent },
  { path: "review", component: ReviewComponent },
  { path: "d", component: DummyComponent },
  { path: "", component: Dummy2Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
