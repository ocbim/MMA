import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import * as moment from 'moment';
import { OrderInterfaces } from 'src/app/models/order.interface';
import { DateService } from 'src/app/services/date.service';
import { map } from 'rxjs/operators';
import { PatternValidator } from '@angular/forms';

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
  /**
   *
   * @param dataApi Servicio para hacer consultas de los datos.
   * @param dateService Servicio para Consultar y manimular la fechas de las consultas.
   */
  constructor(
    private dataApi: DataApiService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.subscritionDevolucionDatos = this.getApiData();
    //  Nos suscribimos al servicio para escuchar lso cambios de fechas.
    this.subscritionDevolucionFecha = this.getDevolucionFecha();
  }
  /**
   * @description Nos suscribimos al cambio de fechas y cuando ocurra un evento
   * llamamos tambien a la subscripcion de los datos para actualizarlos.
   */
  getDevolucionFecha(): Subscription {
    return this.dateService.DevolucionFecha$().subscribe((date) => {
      this.clear(); // Limpiamos las variables y ponemos a cero
      this.subscritionDevolucionDatos = this.getApiData(); //  Ejecutamos Para tener los datos
    });
  }

  /**
   * @description Aquiere los datos usando el servicio DataApiService
   * nos suscribimos a una funcion en DATA
   * y devuelve un json
   */
  getApiData(): Subscription {
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
  /**
   * @description Eliminamos una orden usando el dataApiServices.
   * @param id Id de la orden a eliminar
   */
  deleteApiData(id): void {
    this.dataApi.deleteOrder(id).subscribe((data) => {
      this.totalPoints = 0;
      this.getApiData();
    });
  }
  /**
   * @description Hace indexa los item del for para saber si hay cambios.
   */
  trackBy(index, item: OrderInterfaces): number {
    return index;
  }
  /**
   * @description Hace una limpiesa del total de puntos cuando
   */
  clear(): void {
    this.totalPoints = 0;
  }

  comparadorCodLogo(dato: string) {
    let reYoigo = /^Y[0-9]{8}/;
    let reMasMovil = /^MYSIM_[0-9]{7}/;
    let reMarcaBlanca = /^WD_[0-9]{7}/;
    let rePepePhone = /^PP[0-9]{11}/;
    let reAveria = /^MAS-[0-9]{8}/;

    if (reYoigo.test(dato)) {
      return "Yoigo"
    }
    if (reMasMovil.test(dato))   {
      return "MasMovil"
    }
    if (reMarcaBlanca.test(dato)) {
      return "Marca Blanca"
    }
    if (reAveria.test(dato)) {
      return "Averia"
    }
    if (rePepePhone.test(dato)) {
      return "PepePhone"
    }
  }

  comparadorCodLogoColor() {

  }
  /**
   * @description Desuscribre las subscriciones que tenemos activas cuando cuando el ciclo de vida se destruye
   */
  ngOnDestroy(): void {
    this.subscritionDevolucionFecha.unsubscribe();
    this.subscritionDevolucionDatos.unsubscribe();
  }
}
