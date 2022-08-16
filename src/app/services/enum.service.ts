import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const Enum_API="http://localhost:8080/api/enum/"
const httpOptions = {
  
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(private http: HttpClient) { }
  gettypeTransactions() {
    return this.http.get(Enum_API +"ETypeModaliteTransaction/", httpOptions);
  }
  getStatusTransactions() {
    return this.http.get(Enum_API +"EStatus/", httpOptions);
  }
  
}
