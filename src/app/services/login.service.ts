import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(credentials: { login: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      login: credentials.login,
      password: credentials.password
    }, httpOptions);
  }

  signup(compte:any): Observable<any> {
    return this.http.post(AUTH_API + 'signup',compte, httpOptions);
  }

}
