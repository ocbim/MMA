import { Injectable, OnDestroy, EventEmitter } from '@angular/core';

import * as moment from "moment";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DateService {


  fecha$ = new Subject<object>();
  fecha;
  fechaFormat: string;
  fechaISO: string;
  fechaISOOneDay: string;

  constructor() {
    this.DevolucionFecha$().subscribe((data) => {
      this.fecha = data;
      this.setFechaFormat()
      this.setFechaISO()
      console.log(this.fechaISO);
      console.log(this.fechaISOOneDay);
    });
    this.cambiofechaSub(moment())
  }

  cambiofechaSub(date): void {
    this.fecha$.next(date)
  }

  DevolucionFecha$(): Observable<object> {
    return this.fecha$.asObservable()
  }

  sumarFecha(): void {
    this.cambiofechaSub(this.fecha.add(1, 'days'))
  }

  restarFecha(): void {
    this.cambiofechaSub(this.fecha.subtract(1, 'days'))
  }

  setFechaFormat(): void {
    this.fechaFormat = this.fecha.format('DD/MM/YYYY')
  }

  setFechaISO(): void {
    this.fechaISO = this.fecha.startOf('day').toISOString()
    this.fechaISOOneDay = this.fecha.endOf('day').toISOString()
  }

}
