import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderInterfaces } from 'src/app/models/order.interface';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss'],
})
export class EditOrdersComponent implements OnInit {
  orders = <OrderInterfaces>{};
  pointInstalation: number = 0;
  pointMeter: number = 0;
  hiddenMeter: boolean = false;
  idOrder;

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idOrder = this.activeRoute.snapshot.params.id;
    this.orders.userid = this.authService.getCurrentUser().email;
    this.dataApi.getOrderById(this.idOrder).subscribe({
      next: (res) => {
        this.orders = res;
        this.orders.dateInstalation = moment(
          this.orders.dateInstalation,
          moment.ISO_8601
        ).format('YYYY-MM-DD');
        this.orders.point = 0.0;
        this.changeTypeInstalation();
        this.changeMeter();
      },
    });
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
    this.dataApi.updatedOrder(this.orders).subscribe({
      next: (res) => {
        console.log('enviado');
        this.router.navigate(['/orders/view']);
      },
    });
  }

  summit(): void {
    this.orders.updated_at = moment().toISOString();
    this.postApiData(this.orders);
  }

  exit(): void {
    this.router.navigate(['/orders/view']);
  }
}
