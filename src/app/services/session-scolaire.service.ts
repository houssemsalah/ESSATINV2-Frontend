import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const Sess_API = 'http://localhost:8080/api/session/';
const GETETUDSS_API = 'http://localhost:8080/api/enregistrement/';

const httpOptions = {
  headers: new HttpHeaders({ 
  'Content-Type': 'application/json'})
};
@Injectable({ 
  providedIn: 'root'
})
export class SessionScolaireService {
  

  constructor(private http: HttpClient) { }
  getsessionuniv() {
    return this.http.get(Sess_API + 'getall', httpOptions);
  }
  getetudss(login: any): Observable<any> {
    return this.http.post(GETETUDSS_API + 'getenregistrementbysession', {
      idSession: login,
    }, httpOptions);
  }

  getetudbyclass(ns:any): Observable<any> {
      return this.http.post(GETETUDSS_API + 'getbyidnss', ns , httpOptions);
}
}
