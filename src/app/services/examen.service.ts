import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const Enregistrementniveauxsuivant_API="http://localhost:8080/api/examdocs/getfeuilledenotebyniveauetsession"
@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http: HttpClient) { }
  getPdfinformation(idNiveau:any,idSession:any,colones:any) {
    return this.http.post(Enregistrementniveauxsuivant_API , {
      idNiveau: idNiveau,
      idSession:idSession,
      colones:colones
    }, {responseType:'arraybuffer'});
  }
  
}
