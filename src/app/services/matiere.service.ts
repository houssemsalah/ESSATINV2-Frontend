import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const MATIERE_API = 'http://localhost:8080/api/matiere/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) { }
  getallmatieres() : Observable<any> {
    return this.http.get('http://localhost:8080/api/matiere/getallmatieres',httpOptions );
   
}
}