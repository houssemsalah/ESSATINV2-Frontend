import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const ENSEIGNANT_API = 'http://localhost:8080/api/enseignant/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http: HttpClient) {}
  getallenseignant(): Observable<any> {
    return this.http.get(ENSEIGNANT_API + 'getallenseignant', httpOptions);
  }
  getenseignant(id:any): Observable<any> {
    return this.http.post(ENSEIGNANT_API + 'getenseignant/'+ id , httpOptions);
  }

}

