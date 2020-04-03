import { timer } from 'rxjs';

import { Component, OnInit} from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Alerts } from "src/app/models/alerts.interface";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit{

  menssage: Alerts[] = [];
  num = timer(10000);
  lista = [
    {type: 'alert-danger ', message: 'HOLa mundo danger', isActive: true},
    {type: 'alert-info ', message: 'HOLa mundo info', isActive: true},
    {type: 'alert-warning ', message: 'HOLa mundo warning', isActive: true}
  ]
  constructor(public alertService: AlertsService) { }

  ngOnInit(): void {
    this.alertService.alertMsg$.subscribe((data) =>{
      this.menssage.push(data);

    });

    this.lista.map((item)=>{
      this.alertService.postMsg(item);
    });
  }

  trackBy(index, item){
    return index;
  }


}
