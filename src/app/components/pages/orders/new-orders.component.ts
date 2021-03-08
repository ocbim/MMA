import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { OrderInterfaces } from 'src/app/models/order.interface';
import * as moment from 'moment';
import { DataApiService } from 'src/app/services/data-api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss'],
})
export class NewOrdersComponent implements OnInit {
  orders = {} as OrderInterfaces;
  pointInstalation = 0;
  pointMeter = 0;
  hiddenMeter = false;

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService,
    private router: Router
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
      this.pointInstalation = 1.95;
      this.hiddenMeter = true;
    } else if (
      this.orders.typeInstalation === 'MM_NUEVA_EXTERIOR' ||
      this.orders.typeInstalation === 'MM_NEBA_AUTOINST_EXT'
    ) {
      this.pointInstalation = 2.18;
      this.hiddenMeter = true;
    } else if (this.orders.typeInstalation === 'MM_REUTILIZADA') {
      this.pointInstalation = 1.33;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_NEBA') {
      this.pointInstalation = 1.1;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_AVERIA_FESTIVO') {
      this.pointInstalation = 1.05;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_AVERIA') {
      this.pointInstalation = 1;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_AGILETV') {
      this.pointInstalation = 0.23;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_GUARDIA_VALL/PAL') {
      this.pointInstalation = 0.0;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation === 'MM_RECLAMACION') {
      this.pointInstalation = 0.97;
      this.hiddenMeter = false;
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

  suma(): void {
    if (this.hiddenMeter) {
      this.orders.point = parseFloat(
        (this.pointMeter + this.pointInstalation).toFixed(2)
      );
    } else {
      this.orders.point = this.pointInstalation;
    }
  }

  postApiData(order: OrderInterfaces): void {
    this.dataApi.saveOrder(this.orders).subscribe({
      next: (res) => {
        console.log('enviado');
        this.router.navigate(['/orders/view']);
      },
    });
  }

  summit(): void {
    this.orders.created_at = moment().toISOString();
    this.orders.updated_at = moment().toISOString();
    this.postApiData(this.orders);
  }
}
