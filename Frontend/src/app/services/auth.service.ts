import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  baseUrl = API_URL + '/users';

  private isLoggedIn = new Subject<boolean>();
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  setIsLoggedIn(value: boolean)  {
    this.isLoggedIn.next(value);
  }

  register(inputdata: any) {
    return this.http.post(this.baseUrl, inputdata);
  }

  login(inputdata: any) {
    return this.http.post<any>(this.baseUrl + "/login", inputdata);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  isUserLoggedIn() : boolean {
    return localStorage.getItem("token") != null;
  }
}
