import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-under-navbar',
  templateUrl: './under-navbar.component.html',
  styleUrls: ['./under-navbar.component.scss']
})
export class UnderNavbarComponent implements OnInit {

  constructor(public date: DateService) { }

  ngOnInit(): void {}

  clickNextButton(){
    this.date.sumarFecha();
  }

  clickBackButton(){
    this.date.restarFecha();
  }



}
