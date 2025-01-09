import { RowsComponent } from './shared/rows/rows.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  { path: "navbar", component: NavbarComponent },
  { path: "rows", component: RowsComponent },

  { path: "dash", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
