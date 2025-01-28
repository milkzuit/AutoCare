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

const routes: Routes = [
  // final
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "store-locator", component: StoreLocatorComponent },
  { path: "dash", component: DashboardComponent },

  // templates
  { path: "prof", component: MyProfileComponent },
  { path: "", component: SimplePageComponent },
  { path: "feedback", component: FeedbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
