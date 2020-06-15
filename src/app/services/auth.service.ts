import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  islogged: boolean = false;

  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Conten-Type': 'application/json',
  });

  checkIsLogged() {
    if (this.getCurrentUser() !== null) {
      this.islogged = true;
    } else {
      this.islogged = false;
    }
  }

  registerUser(user: UserInterface): Observable<any> {
    let urlApi = 'https://apimma.herokuapp.com/api/Users';
    return this.http
      .post<UserInterface>(urlApi, user, { headers: this.headers })
      .pipe(map((data) => data));
  }

  loginUser(user: UserInterface): Observable<any> {
    let urlApi = 'https://apimma.herokuapp.com/api/Users/login?include=user';
    return this.http
      .post<UserInterface>(urlApi, user, { headers: this.headers })
      .pipe(map((data) => data));
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }
  /**
   * @returns void
   * @param token resive un token id que se guarda en una variablelocal
   */
  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }
  /**
   * @returns devuelve un String con el AccessToken
   */
  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser(): Observable<any> {
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `https://apimma.herokuapp.com/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<UserInterface>(url_api, { headers: this.headers });
  }
}
