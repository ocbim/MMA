import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { DateService } from 'src/app/services/date.service';
import { OrderInterfaces } from 'src/app/models/order.interface';

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.component.html',
  styleUrls: ['./monthview.component.scss'],
})
export class MonthviewComponent implements OnInit {
  orders: OrderInterfaces = [];
  totalPoint = 0.0;

  constructor(
    private dataApi: DataApiService,
    private dateService: DateService
  ) {}

  /**
   * @returns void
   * @description Inicializamos una subscricion que recibi
   * el cambio de fecha que hacemos en el monthNavBar
   */
  ngOnInit(): void {
    this.dateService.fechaMonth.subscribe({
      next: (res) => {
        this.clear();
        this.getDataMonth(res['startDate'], res['endDate']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * @description Sirve para solicitar los datos desde el
   * DataApiServer el metodo getOrdersMonth que recibe dos parametos
   * @param startDate Fecha de inicio para buscar
   * @param endDate Fecha Ficnal para la busqueda.
   * @returns void
   */
  getDataMonth(startDate, endDate): void {
    this.dataApi.getOrdersMonth(startDate, endDate).subscribe({
      next: (res) => {
        this.orders = res;
        res.map((res)=>{this.totalPoint += res.point})
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * @description Sirve para hacer un seguimiento del for
   * si hay algun cambio se le notifica a la plantilla para que aga
   * los cambios oportunos.
   * @param index indice de los item
   * @param item item a iterar por el for del template
   */
  trackById(index, item) {
    return index;
  }

  /**
   * @description Limpia cada ves que refrescamos el conteo de los puntos totales
   */
  clear(): void {
    this.totalPoint = 0.0;
  }
}
