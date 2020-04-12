import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { OrderInterfaces } from './../models/order.interface';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public date: DateService
  ) {}

  orders$: Observable<any>;
  order$: Observable<any>;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken(),
  });

  getAllOrders() {
    /**
     * http://localhost:3000/api/orders
     * Devuelve un Observable de una peticion GET de todas las orden
     */
    let user_id =
      this.authService.getCurrentUser().id == null
        ? ''
        : this.authService.getCurrentUser();
    let urlApiDate = `http://localhost:3000/api/orders?filter={ "user_id": "${user_id}" ,"where" : {"dateInstalation": { "between": ["${this.date.fechaISO}", "${this.date.fechaISOOneDay}"] } } }`;
    return this.http.get<OrderInterfaces>(urlApiDate).pipe(map((data) => data));
  }

  getOrderById(orderId: string) {
    /**
     * http://localhost:3000/api/orders/5
     * Devuelve un Observable de una peticion GET con una sola orde buscada por la ID
     */
    let urlApi = `http://localhost:3000/api/orders/${orderId}`;
    return (this.order$ = this.http.get(urlApi));
  }

  saveOrder(order: OrderInterfaces) {
    /**
     * TODO: Obtener token
     * TODO: not null
     * http://localhost:3000/api/orders/?access_token=${token}
     */
    let token = this.authService.getToken();
    let urlApi = `http://localhost:3000/api/orders/?access_token=${token}`;
    return this.http
      .post<OrderInterfaces>(urlApi, order, { headers: this.headers })
      .pipe(map((data) => data));
  }

  updatedOrder(order: OrderInterfaces) {
    /**
     * TODO: Obtener token
     * TODO: not null
     * http://localhost:3000/orders/?access_token=${token}
     */
    let token = this.authService.getToken();
    let urlApi = `http://localhost:3000/api/orders/?access_token=${token}`;
    return this.http
      .put<OrderInterfaces>(urlApi, order, { headers: this.headers })
      .pipe(map((data) => data));
  }

  deleteOrder(id: string) {
    /**
     * TODO: Obtener token
     * TODO: not null
     * http://localhost:3000/api/orders/${id}?access_token=${token}
     */
    let token = this.authService.getToken();
    let urlApi = `http://localhost:3000/api/orders/${id}?access_token=${token}`;
    return this.http.delete<OrderInterfaces>(urlApi).pipe(map((data) => data));
  }
}
