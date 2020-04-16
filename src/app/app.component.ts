import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MMA';
  public hideUnderNav: boolean = false;
  public hidenMonthNav: boolean = false;
  /**
   * Comprobamos la url para hacer que aparesca la opcion de Under-Navbars
   */
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //  Comprueba que la url es '/orders/view' y muestra el UnderNav
        if (event.url.match('/orders/view')) {
          this.hideUnderNav = true;
        } else {
          this.hideUnderNav = false;
        }
        if (event.url.match('/orders/monthview')) {
          this.hidenMonthNav = true;
        } else {
          this.hidenMonthNav = false;
        }
      }
    });
  }
}
