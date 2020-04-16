import { AlertsService } from 'src/app/services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/user.interface';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsEnum } from 'src/app/models/alerts.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: UserInterface = {};
  pass: string;
  passVeryfy: string;
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.user.created_at = moment().toISOString();
    this.user.update_at = moment().toISOString();
    this.comprobarPass();
    console.log(this.user);
  }
  comprobarPass() {
    if (this.pass == this.passVeryfy) {
      this.user.password = this.pass;
      this.postRegister(this.user);
    } else {
      console.log('La pass no son iguales');
      this.user.password = '';
      this.pass = '';
      this.passVeryfy = '';
    }
  }

  postRegister(user) {
    this.authService.registerUser(user).subscribe({
      error: (err) => {
        this.alertsService.postAlert(AlertsEnum.error, err.error.error.message);
      },
      complete: () => {
        this.alertsService.postAlert(
          AlertsEnum.success,
          'Usuario registrado, inicie Seccion'
        );
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
