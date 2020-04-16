import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    /**
     * Si existe el usuario devuelve true si no redirige a login y devuelve false
     * sirve para verificar las rutas
     */
    if (this.authService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }


  }
}
