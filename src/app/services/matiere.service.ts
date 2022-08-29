import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const MATIERE_API = 'http://localhost:8080/api/matiere/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  constructor(private http: HttpClient) {}
  getallmatieres(): Observable<any> {
    return this.http.get(MATIERE_API + 'getallmatieres', httpOptions);
  }
  addmatiere(nomMatiere:any,description:any,enseignant:any,niveau:any,coefficient:any): Observable<any> {
    return this.http.post(MATIERE_API + 'addmatiere' ,{nomMatiere:nomMatiere,description:description,enseignant:enseignant,niveau:niveau,coefficient:coefficient},httpOptions);
  }

}
