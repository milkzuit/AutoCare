import { MyProfileComponent } from './template/my-profile/my-profile.component';
import { RowsComponent } from './shared/rows/rows.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { SimplePageComponent } from './shared/simple-page/simple-page.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CardsComponent } from './shared/cards/cards.component';
import { StoreComponent } from './template/store/store.component';
import { DisplayComponent } from './display/display.component';
import { NearMeComponent } from './template/near-me/near-me.component';
import { HeroComponent } from './template/hero/hero.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  
  // shared
  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  { path: "navbar", component: NavbarComponent },
  { path: "rows", component: RowsComponent },
  
  // templates
  { path: "dash", component: DashboardComponent },
  { path: "prof", component: MyProfileComponent },
  {path:"near", component: NearMeComponent},


  // testing
  { path: "feedback", component: FeedbackComponent },
  {path:"cards", component: CardsComponent},
  {path:"store", component: StoreComponent},
  { path: "", component: HeroComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
