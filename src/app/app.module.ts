import { DataApiService } from './services/data-api.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { Page404Component } from './components/pages/page404/page404.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NewOrdersComponent } from './components/pages/orders/new-orders.component';
import { EditOrdersComponent } from './components/pages/orders/edit-orders.component';
import { ViewOrdersComponent } from './components/pages/orders/view-orders.component';
import { UnderNavbarComponent } from './components/shared/under-navbar/under-navbar.component';
import { DateService } from './services/date.service';
import { FormsModule } from '@angular/forms';
import { AlertsComponent } from './components/shared/alerts/alerts.component';
import { AlertsService } from './services/alerts.service';

const myDeclarations = [
  AppComponent,
  HomeComponent,
  NavbarComponent,
  Page404Component,
  LoginComponent,
  RegisterComponent,
  NewOrdersComponent,
  EditOrdersComponent,
  ViewOrdersComponent,
  UnderNavbarComponent,
  AlertsComponent,
];
const myImports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule
];
const myProviders = [
  AuthService,
  DataApiService,
  DateService,
  AlertsService,
  HttpClientModule,
  HttpClient
];

@NgModule({
  declarations: myDeclarations,
  imports: myImports,
  providers: myProviders,
  bootstrap: [AppComponent],
})
export class AppModule {}
