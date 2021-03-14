import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { OrderInterfaces } from 'src/app/models/order.interface';
import * as moment from 'moment';
import { DataApiService } from 'src/app/services/data-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PuntosMasMovil } from 'src/app/models/puntos-mas-movil.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss'],
})
export class NewOrdersComponent implements OnInit {
  orders = {} as OrderInterfaces;
  pointInstalation = 0;
  pointMeter = 0;
  pointRepetidores = 0;
  hiddenMeter = false;

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService,
    private Location: Location,
  ) {}

  ngOnInit(): void {
    this.orders.point = this.pointInstalation + this.pointMeter;
    this.orders.meter = 0;
    this.orders.typeInstalation = '-----';
    this.orders.dateInstalation = moment().format('YYYY-MM-DD');
    this.orders.userid = this.authService.getCurrentUser().email;
  }

  changeTypeInstalation(): void {
    if (
      this.orders.typeInstalation === 'MM_NUEVA_INTERIOR' ||
      this.orders.typeInstalation === 'MM_NEBA_AUTOINST_INT'
    ) {
      this.pointInstalation = PuntosMasMovil.NUEVA_INTERIOR;
      this.hiddenMeter = true;
    } else if (
      this.orders.typeInstalation === 'MM_NUEVA_EXTERIOR' ||
      this.orders.typeInstalation === 'MM_NEBA_AUTOINST_EXT'
    ) {
      this.pointInstalation = PuntosMasMovil.NUEVA_EXTERIOR;
      this.hiddenMeter = true;
    } else if (this.orders.typeInstalation === 'MM_REUTILIZADA') {
      this.pointInstalation = PuntosMasMovil.REUTILIZADA;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_NEBA') {
      this.pointInstalation = PuntosMasMovil.NEBA;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_AVERIA_FESTIVO') {
      this.pointInstalation = PuntosMasMovil.AVERIA_FESTIVO;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_AVERIA') {
      this.pointInstalation = PuntosMasMovil.AVERIA;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_AGILETV') {
      this.pointInstalation = PuntosMasMovil.AGILETV;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_GUARDIA_VALL/PAL') {
      this.pointInstalation = PuntosMasMovil.GUARDIA_VALL_PAL;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_RECLAMACION') {
      this.pointInstalation = PuntosMasMovil.RECLAMACION;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_INSTALACION_POSTES') {
      this.pointInstalation = PuntosMasMovil.MM_INSTALACION_POSTES;
      this.hiddenMeter = true;
    }

    this.suma();
  }

  changeMeter(): void {
    if (
      this.orders.typeInstalation in
        { MM_NUEVA_EXTERIOR: '', MM_NEBA_AUTOINST_EXT: '' } &&
      this.orders.meter >= 80
    ) {
      this.pointMeter = 0.42;
    } else if (
      this.orders.typeInstalation in
        { MM_NUEVA_INTERIOR: '', MM_NEBA_AUTOINST_INT: '' } &&
      this.orders.meter >= 80
    ) {
      this.pointMeter = 0.4;
    } else {
      this.pointMeter = 0.0;
    }

    this.suma();
  }

  cambioRepetidores(): void{
    if (this.orders.repetidores > 0) {
      this.pointRepetidores = this.orders.repetidores * PuntosMasMovil.REPETIDORES;
      this.suma();
    } else {
      this.pointRepetidores = 0;
      this.suma();
    }
  }

  suma(): void {
    if (this.hiddenMeter) {
      this.orders.point = parseFloat(
        (this.pointMeter + this.pointInstalation + this.pointRepetidores).toFixed(2)
      );
    } else {
      this.orders.point = parseFloat((this.pointInstalation + this.pointRepetidores).toFixed(2));
    }
  }

  postApiData(order: OrderInterfaces): void {
    this.dataApi.saveOrder(this.orders).subscribe({
      next: (res) => {
        this.Location.back();
      },
    });
  }

  summit(): void {
    this.orders.created_at = moment().toISOString();
    this.orders.updated_at = moment().toISOString();
    this.postApiData(this.orders);
  }
}
