import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const COMPTE_API = "http://localhost:8080/api/compte/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http: HttpClient) { }
  getcomptes(): Observable<any> {
    return this.http.get(COMPTE_API + 'getall', httpOptions);
  }

  getcomptebyid(id:any): Observable<any> {
    return this.http.post(COMPTE_API + 'getbyid',id, httpOptions);
  }

}
