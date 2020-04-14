import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MMA';
  public hideElement: boolean = false;
/**
 * Comprobamos la url para hacer que aparesca la opcion de Under-Navbars
 */
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.match('/orders/view')) {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });
  }
}
