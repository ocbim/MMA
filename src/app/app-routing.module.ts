import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NewOrdersComponent } from './components/pages/orders/new-orders.component';
import { EditOrdersComponent } from './components/pages/orders/edit-orders.component';
import { ViewOrdersComponent } from './components/pages/orders/view-orders.component';
import { Page404Component } from './components/pages/page404/page404.component';

import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'orders/new',
    component: NewOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/edit/:id',
    component: EditOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/view',
    component: ViewOrdersComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
