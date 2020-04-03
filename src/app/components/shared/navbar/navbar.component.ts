import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public app_name = 'MMA'.toLocaleUpperCase();
  constructor() { }

  ngOnInit(): void {
  }

}
