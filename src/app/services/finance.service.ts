import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const EnregistrementparsessionAPI = "http://localhost:8080/api/etudiantfinance/"
const Modaliter_API = "http://localhost:8080/api/modalite/"
const Payer_API="http://localhost:8080/api/pay/"
const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  constructor(private http: HttpClient) { }
  getEtudientnonpayer(id: any) {
    return this.http.get(EnregistrementparsessionAPI + "getenregistrementavecresrbyidsession/" + id, httpOptions);
  }
  getRestaPayer(id: any) {
    return this.http.get(EnregistrementparsessionAPI + "restapayer/" + id, httpOptions);
  }
  getRestaPayerEnPourcentage(id: any) {
    return this.http.get(EnregistrementparsessionAPI + "pourcentagepayer/" + id, httpOptions);
  }
  getDetaillePayment(id: any) {
    return this.http.get(EnregistrementparsessionAPI + "getdetaillepayementbyidenregistrementnew/" + id, httpOptions);
  }
  getDetailleTransaction(id: any) {
    return this.http.get(EnregistrementparsessionAPI + "getdetaillepayementbyidtransaction/" + id, httpOptions);
  }
  ValidierChechque(id: any) {
    return this.http.get(Modaliter_API + "validercheque/" + id, httpOptions);
  }
  RejeterChechque(idModaliter: any, idCompteFinancier: any, motif: any) {
    return this.http.post(Modaliter_API + "rejetecheque/", {
      idModalite: idModaliter,
      idCompteFinancier: idCompteFinancier,
      motif: motif,
    }, httpOptions);
  }
  AnnulerModaliter(idModaliter: any ,idCompteFinancier:any,motif:any) {
    return this.http.post(Modaliter_API + "annulermodalite/" , {
      idModalite: idModaliter,
      idCompteFinancier: idCompteFinancier,
      motif: motif,
    }, httpOptions);
  }
  getDetailsAnulatio(id: any) {
    return this.http.get(Modaliter_API + "detailleannulationrejet/" + id, httpOptions);
  }
  Payer(idEnregistrement: any ,modaliteTransactionSet:any,idCompteFinancier:any) {
    return this.http.post(Payer_API + "etudiant/" , {
      idEnregistrement: idEnregistrement,
      modaliteTransactionSet: modaliteTransactionSet,
      idCompteFinancier: idCompteFinancier
    }, httpOptions);
  }
  AdesImpayee(id: any) {
    return this.http.get(EnregistrementparsessionAPI + "adesimpayerdansuneautresession/" + id, httpOptions);
  }
  lesImpayer(id: any) {
    return this.http.get(EnregistrementparsessionAPI + "listdesenregistrementsavecimpayerdansautresession/" + id, httpOptions);
  }
}
