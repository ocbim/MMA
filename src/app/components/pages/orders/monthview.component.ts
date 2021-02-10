import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { DateService } from 'src/app/services/date.service';
import { OrderInterfaces } from 'src/app/models/order.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  styleUrls: ['./monthview.component.scss'],
})
export class MonthviewComponent implements OnInit, OnDestroy {
  constructor(
    private dataApi: DataApiService,
    private dateService: DateService
  ) {}

  dataSource: MatTableDataSource<OrderInterfaces>;
  columnasAMostrar: string[] = [
    'No',
    'codOrder',
    'typeInstalation',
    'point',
    'dateInstalation',
  ];
  expandedElement: OrderInterfaces | null;
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
        this.totalPoint = res
          .map((r) => r.point)
          .reduce((acc, value) => acc + value, 0);
        let numeroLista = 1;
        this.dataSource.data.map((r) => (r.No = numeroLista++));
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
    this.dataSource = new MatTableDataSource<OrderInterfaces>(undefined);
  }

  ngOnDestroy() {
    this.dateService.fechaMonth.unsubscribe();
  }
}
