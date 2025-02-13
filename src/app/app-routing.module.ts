import { OrderTableComponent } from './tables/order-table/order-table.component';
import { MyProfileComponent } from './template/my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { DummyComponent } from './shared/dummy/dummy.component';
import { Dummy2Component } from './shared/dummy2/dummy2.component';
import { ReviewComponent } from './shared/review/review.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ProductComponent } from './pages/product/product.component';
import { TopnavComponent } from './pages/topnav/topnav.component';
import { FAQComponent } from './miscellaneous/faq/faq.component';
import { PrivacypolicyComponent } from './miscellaneous/privacypolicy/privacypolicy.component';
import { TermsofuseComponent } from './miscellaneous/termsofuse/termsofuse.component';
import { HomeComponent } from './layout/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { authGuard } from './auth/auth.guard';
import { LogoutResolver } from './auth/logout.resolver';
import { UsersTableComponent } from './tables/users-table/users-table.component';
import { MainLayoutComponent } from './tables/main-layout/main-layout.component';
import { VerficationComponent } from './auth/verfication/verfication.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ReceiptsComponent } from './components/receipts/receipts.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'verification', component: VerficationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'logout',
    component: LandingComponent, // Redirect to home after logout
    resolve: { logout: LogoutResolver }, // Call logout before navigating
  },
  // # Landing Page
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'pp', component: PrivacypolicyComponent },
  { path: 'term', component: TermsofuseComponent },

  // # dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: 'main-layout',
    component: MainLayoutComponent,
    children: [
      { path: 'review', component: ReviewComponent, canActivate: [authGuard] },
      {
        path: 'services',
        component: ProductComponent,
        canActivate: [authGuard],
      },
      { path: 'profile', component: MyProfileComponent },
      {
        path: 'receipts',
        component: ReceiptsComponent,
        canActivate: [authGuard],
      },
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    ],
  },

  // testing
  { path: 'd', component: DummyComponent },
  { path: 'dd', component: Dummy2Component },

  //store
  { path: 'checkout', component: CheckoutComponent },

  // tables
  {
    path: 'user-list',
    component: MainLayoutComponent,
    children: [
      { path: 'stat', component: UsersTableComponent },
      {
        path: 'admin',
        component: UsersTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'regular',
        component: UsersTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'feedback',
        component: UsersTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'news-letter',
        component: UsersTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'getquote',
        component: UsersTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'contact',
        component: UsersTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'order',
        component: OrderTableComponent,
        canActivate: [authGuard],
      },
    ],
  },

  //ai chatbot
  { path: 'chat', component: ChatbotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
