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
    this.orders.user_id = this.authService.getCurrentUser().id;
    this.dataApi.getOrderById(this.idOrder).subscribe({
      next: (res) => {
        this.orders = res;
        this.orders.dateInstalation = moment(
          this.orders.dateInstalation,
          moment.ISO_8601
        ).format('YYYY-MM-DD');
        this.orders.point = 0.0
        this.changeTypeInstalation()
        this.changeMeter()
      },
    });
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
