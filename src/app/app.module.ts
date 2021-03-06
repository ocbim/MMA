import { DataApiService } from './services/data-api.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { MonthviewComponent } from './components/pages/orders/monthview.component';
import { MonthNavbarComponent } from './components/shared/month-navbar/month-navbar.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
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
    MonthviewComponent,
    MonthNavbarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
  ],
  providers: [
    AuthService,
    DataApiService,
    DateService,
    AlertsService,
    HttpClientModule,
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
