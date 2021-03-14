import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public app_name = 'MMA';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.checkIsLogged();
  }

  logOut(): void {
    this.authService.logoutUser().subscribe({
      complete: () => {
        this.authService.checkIsLogged();
        this.router.navigate(['/']);
      },
    });
  }
}
