import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userLogin$= new Subject<any>()

  constructor(public http: HttpClient) {  }

  headers: HttpHeaders = new HttpHeaders({
    'Conten-Type': 'application/json',
  });

  registerUser(user : UserInterface) {
    let urlApi = 'http://localhost:3000/api/Users';
    return this.http
      .post<UserInterface>(
        urlApi,
        user,
        { headers: this.headers }
      )
      .pipe(map((data) => data));
  }

  loginUser(user: UserInterface): Observable<any> {
    let urlApi = 'http://localhost:3000/api/Users/login?include=user';
    return this.http
      .post<UserInterface>(urlApi, user, { headers: this.headers })
      .pipe(map((data) => data));
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
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

  logoutUser() {
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<UserInterface>(url_api, { headers: this.headers });
  }
}
