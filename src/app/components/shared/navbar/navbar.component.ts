import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public app_name = 'MMA'.toLocaleUpperCase();
  user;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getCurrentUser()) {
      this.user = this.authService.getCurrentUser();
    }
    this.authService.userLogin$.subscribe((res) => (this.user = res));
  }

  logOut() {
    this.authService.logoutUser().subscribe((res) => {
      res;
      this.authService.userLogin$.next(undefined);
      this.router.navigate(['/']);
    });
  }
}
