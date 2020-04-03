import { Observable, interval, Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';


import { Alerts } from 'src/app/models/alerts.interface';


@Injectable({
  providedIn: 'root'
})

export class AlertsService {

  alertMsg$ = new Subject<Alerts>();

  constructor() { }

  postMsg(msg: Alerts) {
    this.alertMsg$.next(msg);
  }


}
