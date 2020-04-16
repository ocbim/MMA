import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertsInterface } from 'src/app/models/alerts.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  alert$ = new Subject<AlertsInterface>();

  constructor() {}

  postAlert(type, menssage) {
    this.alert$.next({ type: type, message: menssage });
  }
}
