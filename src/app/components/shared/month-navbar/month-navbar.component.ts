import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataApiService } from 'src/app/services/data-api.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-month-navbar',
  templateUrl: './month-navbar.component.html',
  styleUrls: ['./month-navbar.component.scss'],
})
export class MonthNavbarComponent implements OnInit {
  dateStartForMonth = [];
  constructor(
    private dataApi: DataApiService,
    private dateService: DateService
  ) {}
  /**
   * @description Inicializamos con un for que guardara una lista con las
   * fechas enero,Febrero, Marzo, Abril ect...
   */
  ngOnInit(): void {
    for (let index = 0; index < 12; index++) {
      this.dateStartForMonth.push(
        moment().set('month', index).startOf('month').toISOString()
      );
    }
  }
  /**
   * @description Almacena las fechas inicio y final del mismo mes y año.
   * @param date  Se pasa la fecha para que pueda sacar la fecha inicio y final del mismo mes.
   */
  startEndDate(date) {
    const startDate = moment(date).startOf('month').toISOString();
    const endDate = moment(date).endOf('month').toISOString();
    this.dateService.fechaMonth.next({ startDate, endDate });
  }
}
