import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-month-navbar',
  templateUrl: './month-navbar.component.html',
  styleUrls: ['./month-navbar.component.scss'],
})
export class MonthNavbarComponent implements OnInit {
  dateStartForMonth = [];
  ano = moment().get('year'); /* extraemos el año en el que estamos ejemplo '2021' */
  constructor(private dateService: DateService) {}
  /**
   * @description Inicializamos con un for que guardara una lista con las
   * fechas enero,Febrero, Marzo, Abril ect...
   */
  ngOnInit(): void {
    this.creamosListaMeses();
  }

  /**
   * @description Inicializamos un for que guarda una lista de fechas enero, feber, marzo abril ect...
   */
  creamosListaMeses(): void {
    this.dateStartForMonth = [];
    for (let i = 0; i < 12; i++) {
      this.dateStartForMonth.push(
        moment()
          .set({ month: i, year: this.ano })
          .startOf('month')
          .toISOString()
      );
    }
  }

  /**
   * @description restamos un año de la fecha y volvemos a crear la lista de meses
   * tambien enviamos un this.dateService.fechaMonth.next({}) vacio para que refesque la tabla
   */
  restaUnAno(): void {
    --this.ano;
    this.creamosListaMeses();
    this.dateService.fechaMonth.next({});
  }
  /**
   * @description Sumamos un año de la fecha y volvemos a crear una lista de meses
   * tambien enviamos un this.dateService.fechaMonth.next({}) vacio para que refesque la tabla
   */
  sumarUnAno(): void {
    ++this.ano;
    this.creamosListaMeses();
    this.dateService.fechaMonth.next({});
  }

  /**
   * @description Almacena las fechas inicio y final del mismo mes y año.
   * @param date  Se pasa la fecha para que pueda sacar la fecha inicio y final del mismo mes.
   * luego lo enviamos a un observable de los servicios fechas.
   */
  startEndDate(date) {
    const startDate = moment(date).startOf('month').toISOString();
    const endDate = moment(date).endOf('month').toISOString();
    this.dateService.fechaMonth.next({ startDate, endDate });
  }
}
