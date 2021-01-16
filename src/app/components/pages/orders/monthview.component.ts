import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { DateService } from 'src/app/services/date.service';
import { OrderInterfaces } from 'src/app/models/order.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.component.html',
  styleUrls: ['./monthview.component.scss'],
})
export class MonthviewComponent implements OnInit, OnDestroy  {

  constructor(
    private dataApi: DataApiService,
    private dateService: DateService
  ) {}

  dataSource: MatTableDataSource<OrderInterfaces>;
  columnasAMostrar: string[] = ['codOrder', 'typeInstalation', 'point', 'dateInstalation'];
  totalPoint = 0.0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


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

  getTotalPuntos() {
    return this.dataSource.map(t => t.point).reduce((acc, value)=> acc + value, 0)
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
        this.dataSource = new MatTableDataSource<OrderInterfaces>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
        res.map((re) => {
          this.totalPoint += re.point;
        });
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

  ngOnDestroy(){
    this.dateService.fechaMonth.unsubscribe();
  }
}
