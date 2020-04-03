import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import * as moment from 'moment';
import { OrderInterfaces } from "../../../models/order.interface";
import { DateService } from 'src/app/services/date.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  orders: OrderInterfaces;

  constructor(private dataApi: DataApiService, private dateService: DateService) { }

  ngOnInit(): void {

    this.getApiData()

    //  Nos suscribimos al servicio para escuchar lso cambios de fechas.
    this.dateService.DevolucionFecha$().subscribe((data)=>{
      data;
      this.getApiData();  //  Ejecutamos Para tener los datos
      console.log('ejecuta getApiData');

    })
  }

  /**Aquiere los datos usando el servicio DataApiService
   * nos suscribimos a una funcion en DATA
   * y devuelve un json
   */
  getApiData() {
    this.dataApi.getAllOrders().subscribe({
      next: (data)=>{ this.orders = data},
      error: (err)=>{ console.log(err) },
      complete:()=>{ console.log('obtencion de datos done') }
    });
  }

  trackBy(index, item) {
    return index;
  }

}
