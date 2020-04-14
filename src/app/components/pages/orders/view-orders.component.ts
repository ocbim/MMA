import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import * as moment from 'moment';
import { OrderInterfaces } from 'src/app/models/order.interface';
import { DateService } from 'src/app/services/date.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent implements OnInit, OnDestroy {
  orders: OrderInterfaces;
  subscritionDevolucionFecha;
  subscritionDevolucionDatos;
  totalPoints = 0.0;

  constructor(
    private dataApi: DataApiService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.subscritionDevolucionDatos = this.getApiData();
    //  Nos suscribimos al servicio para escuchar lso cambios de fechas.
    this.subscritionDevolucionFecha = this.getDevolucionFecha();
  }

  getDevolucionFecha() {
    return this.dateService.DevolucionFecha$().subscribe((date) => {
      this.clear(); // Limpiamos las variables y ponemos a cero
      this.subscritionDevolucionDatos = this.getApiData(); //  Ejecutamos Para tener los datos
    });
  }

  /**Aquiere los datos usando el servicio DataApiService
   * nos suscribimos a una funcion en DATA
   * y devuelve un json
   */
  getApiData() {
    return this.dataApi.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        data.map((res) => (this.totalPoints += res.point)); // suma los puntos y los guarda en totalPoinst
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('obtencion de datos done');
      },
    });
  }

  deleteApiData(id) {
    this.dataApi.deleteOrder(id).subscribe((data) => {
      this.totalPoints=0
      this.getApiData();
    });
  }

  trackBy(index, item: OrderInterfaces) {
    return index;
  }

  clear() {
    this.totalPoints = 0;
  }

  ngOnDestroy() {
    this.subscritionDevolucionFecha.unsubscribe();
    this.subscritionDevolucionDatos.unsubscribe();
  }
}
