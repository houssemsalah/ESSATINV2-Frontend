import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const ROLE_API = 'http://localhost:8080/api/role/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,}),
  
  
};
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}
  getallroles(): Observable<any> {
    return this.http.get(ROLE_API + 'getallroles', httpOptions);
  }
  
getrolebyidcompte(id:any): Observable<any> {
    return this.http.post( ROLE_API + 'getrolesbyidcompte' ,id,httpOptions);
  }

  supprimerrole(idCompte:any,idRole:any): Observable<any> {
    return this.http.post( ROLE_API + 'supprimerole' ,{"idCompte":idCompte, "idRole":idRole},httpOptions);

}

}
