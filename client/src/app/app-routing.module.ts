import { AuthGuard } from './guard/auth.guard';
import { ReportComponent } from './components/auth/report/admin.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/public/login/login.component';
import { NotfoundComponent } from './components/share/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/auth/dashboard/dashboard.component';
import { PublicGuard } from './guard/public.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [PublicGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '**',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'create-user',
        component: RegisterComponent,
      },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
