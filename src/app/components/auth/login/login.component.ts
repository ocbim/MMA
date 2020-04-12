import { AlertsService } from 'src/app/services/alerts.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertsEnum } from 'src/app/models/alerts.enum';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user: UserInterface = {};

  constructor(
    private authService: AuthService,
    private route: Router,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {}

  logIn() {
    if (this.user.username != null && this.user.password != null) {
      this.authService.loginUser(this.user).subscribe({
        next: (res) => {
          this.authService.setUser(res.user);
          this.authService.setToken(res.id);
          this.authService.userLogin$.next(this.authService.getCurrentUser());
        },
        error: (err) => {
          this.alertsService.postAlert(
            AlertsEnum.error,
            err.error.error.message
          );
        },
        complete: () => {
          this.route.navigate(['/orders/view']);
        },
      });
    }
  }
}
