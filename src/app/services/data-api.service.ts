import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { OrderInterfaces } from './../models/order.interface';
import { DateService } from './date.service';
import { isString } from 'util';

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

  getOrdersMonth(startDate, endDate): Observable<OrderInterfaces[]> {
    // tslint:disable-next-line: variable-name
    const userid =
      this.authService.getCurrentUser().id == null
        ? ''
        : this.authService.getCurrentUser().email;
    const urlApiDate = `https://apimma.herokuapp.com/api/orders?filter={ "where": {"userid": "${userid}", "dateInstalation": { "between": ["${startDate}", "${endDate}"] } } }`;
    return this.http.get<OrderInterfaces[]>(urlApiDate).pipe(map((data) => data));
  }

  getAllOrders(): Observable<any> {
    /**
     * http://localhost:3000/api/orders
     * Devuelve un Observable de una peticion GET de todas las orden
     */
    // tslint:disable-next-line: variable-name
    const userid =
      this.authService.getCurrentUser().id == null
        ? ''
        : this.authService.getCurrentUser().email;
    const urlApiDate = `https://apimma.herokuapp.com/api/orders?filter={ "where": {"userid": "${userid}", "dateInstalation": { "between": ["${this.date.fechaISO}", "${this.date.fechaISOOneDay}"] } } }`;
    console.log(`este es el id de ususario ${userid}`)
    return this.http.get<OrderInterfaces>(urlApiDate).pipe(map((data) => data));
  }

  getOrderById(orderId: string): Observable<any> {
    /**
     * http://localhost:3000/api/orders/5
     * Devuelve un Observable de una peticion GET con una sola orde buscada por la ID
     */
    const urlApi = `https://apimma.herokuapp.com/api/orders/${orderId}`;
    return (this.order$ = this.http.get(urlApi));
  }

  saveOrder(order: OrderInterfaces): Observable<any> {
    /**
     * TODO: Obtener token
     * TODO: not null
     * http://localhost:3000/api/orders/?access_token=${token}
     */
    const token = this.authService.getToken();
    const urlApi = `https://apimma.herokuapp.com/api/orders/?access_token=${token}`;
    return this.http
      .post<OrderInterfaces>(urlApi, order, { headers: this.headers })
      .pipe(map((data) => data));
  }

  updatedOrder(order: OrderInterfaces): Observable<any> {
    /**
     * TODO: Obtener token
     * TODO: not null
     * http://localhost:3000/orders/?access_token=${token}
     */
    const token = this.authService.getToken();
    const urlApi = `https://apimma.herokuapp.com/api/orders/?access_token=${token}`;
    return this.http
      .put<OrderInterfaces>(urlApi, order, { headers: this.headers })
      .pipe(map((data) => data));
  }

  deleteOrder(id: string): Observable<any> {
    /**
     * TODO: Obtener token
     * TODO: not null
     * http://localhost:3000/api/orders/${id}?access_token=${token}
     */
    const token = this.authService.getToken();
    const urlApi = `https://apimma.herokuapp.com/api/orders/${id}?access_token=${token}`;
    return this.http.delete<OrderInterfaces>(urlApi).pipe(map((data) => data));
  }
}
