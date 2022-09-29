import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const MATIERE_API = 'http://localhost:8080/api/matiere/';
const NOTE_API = 'http://localhost:8080/api/note/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,}),
  
  
};

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  constructor(private http: HttpClient) {}
  getallmatieres(): Observable<any> {
    return this.http.get(MATIERE_API + 'getallmatieres', httpOptions);
  }
  addmatiere(matiere:any): Observable<any> {
    return this.http.post(MATIERE_API + 'addmatiere' ,matiere,httpOptions);
  }

getmatierebyid(idMatiere:any): Observable<any> {
    return this.http.post(MATIERE_API + 'getbyidm' ,idMatiere,httpOptions);
  }
  getmatierebyniveaux(niveaux:any): Observable<any> {
    return this.http.post(MATIERE_API + 'getmatieresbyniveau' ,niveaux,httpOptions);
  }
  supprimermatiere(id:any): Observable<any> {
    return this.http.post(MATIERE_API + 'supprimermatiere' ,{"id":id} ,httpOptions);
  }


  addnotes(notes:any): Observable<any> {
    return this.http.post(MATIERE_API + 'addnotes' ,{notes},httpOptions);
  }

}
