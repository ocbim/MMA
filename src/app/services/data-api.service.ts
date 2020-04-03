import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'

import { AuthService } from './auth.service';

import { OrderInterfaces } from './../models/order.interface';
import { DateService } from './date.service';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})

export class DataApiService {

  constructor(private http: HttpClient, private authService: AuthService, public date: DateService) { }

  orders$: Observable<any>;
  order$: Observable<any>;

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.authService.getToken()
  });

  getAllOrders() {
    /**
   * http://localhost:3000/orders
   * Devuelve un Observable de una peticion GET de todas las orden
   */
    let urlApiDate = `http://localhost:3000/api/orders?filter={ "where" : {"dateInstalation": { "between": ["${this.date.fechaISO}", "${this.date.fechaISOOneDay}"] } } }`;
    return this.http.get<OrderInterfaces>(urlApiDate).pipe(map(data => data));

  }

  getOrderById(orderId: string) {
    /**
   * http://localhost:3000/orders/5
   * Devuelve un Observable de una peticion GET con una sola orde buscada por la ID
   */
    let urlApi = `http://localhost:3000/orders/${orderId}`;
    return this.order$ = this.http.get(urlApi);
  }


  saveOrder(order: OrderInterfaces) {
    /**
   * TODO: Obtener token
   * TODO: not null
   */
    let token = this.authService.getToken();
    let urlApi = `http://localhost:3000/orders/?access_token=${token}`;
    return this.http.post<OrderInterfaces>(urlApi, order, { headers: this.headers })
      .pipe(map(data => data))
  }

  updatedOrder(order: OrderInterfaces) {
    /**
   * TODO: Obtener token
   * TODO: not null
   */
    let token = this.authService.getToken();
    let urlApi = `http://localhost:3000/orders/?access_token=${token}`;
    return this.http.put<OrderInterfaces>(urlApi, order, { headers: this.headers })
      .pipe(map(data => data))
  }

  deleteOrder(id: string) {
    /**
  * TODO: Obtener token
  * TODO: not null
  */
    let token = this.authService.getToken();
    let urlApi = `http://localhost:3000/orders/?access_token=${token}`;
    return this.http.delete<OrderInterfaces>(urlApi, { headers: this.headers })
      .pipe(map(data => data))
  }

}
