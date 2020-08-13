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
  orders = <OrderInterfaces>{};
  pointInstalation: number = 0;
  pointMeter: number = 0;
  hiddenMeter: boolean = false;

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService,
    private router : Router
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
      this.orders.typeInstalation == 'MM_NUEVA_INTERIOR' ||
      this.orders.typeInstalation == 'MM_NEBA_AUTOINST_INT'
    ) {
      this.pointInstalation = 2.2;
      this.hiddenMeter = true;
    } else if (
      this.orders.typeInstalation == 'MM_NUEVA_EXTERIOR' ||
      this.orders.typeInstalation == 'MM_NEBA_AUTOINST_EXT'
    ) {
      this.pointInstalation = 2.3;
      this.hiddenMeter = true;
    } else if (this.orders.typeInstalation == 'MM_REUTILIZADA') {
      this.pointInstalation = 1.4;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation == 'MM_NEBA') {
      this.pointInstalation = 1.2;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation == 'MM_AVERIA_FESTIVO') {
      this.pointInstalation = 0.95;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation == 'MM_AVERIA') {
      this.pointInstalation = 0.85;
      this.hiddenMeter = false;
    } else if (this.orders.typeInstalation == 'MM_AGILETV'){
      this.pointInstalation == 0.85;
      this.hiddenMeter = false;
    }

    this.suma();
  }

  changeMeter(): void {
    if (this.orders.meter >= 80) {
      this.pointMeter = 0.3;
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
        this.router.navigate(['/orders/view'])
      },
    });
  }

  summit(): void {
    this.orders.created_at = moment().toISOString();
    this.orders.updated_at = moment().toISOString();
    this.postApiData(this.orders);
  }
}
