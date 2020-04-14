import { RouterTestingModule } from '@angular/router/testing';
import { isNullOrUndefined } from 'util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertsEnum } from 'src/app/models/alerts.enum';
import { AlertsInterface } from 'src/app/models/alerts.interface';
import { interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: AlertsInterface[] = [];
  alerts$;
  time = timer(5000)
  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.alerts$ = this.alertsService.alert$.subscribe({
      next: (res) => {
        if (!isNullOrUndefined(res)) {
          this.alerts.push(res);
          this.autoDeleteAlerts()
        }
      },
    });

  }

  autoDeleteAlerts(): void {
    this.time.subscribe({
      next:(res)=>{this.alerts.shift()}
    })
  }

  ngOnDestroy(): void {
    this.alerts$.unsubscribe();
  }
}
