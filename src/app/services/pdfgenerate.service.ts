import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const PDF_API = "http://localhost:8080/api/etudiants/"
const PDFPayRecu_API = "http://localhost:8080/api/recu/"
const PDFDECHARGE_API = "http://localhost:8080/api/modalite/"

@Injectable({
  providedIn: 'root'
})
export class PdfgenerateService {

  constructor(private http: HttpClient) { }
  getPdfpresence(idEnregistrement:any,directeur:boolean) {
    return this.http.post(PDF_API + 'getcertifpresence', {
      idEnregistrement: idEnregistrement,
      directeur: directeur,
    }, {responseType:'arraybuffer'});
  }
  getPdfinscription(idEnregistrement:any,directeur:boolean) {
    return this.http.post(PDF_API + 'getcertifinscription', {
      idEnregistrement: idEnregistrement,
      directeur: directeur,
    }, {responseType:'arraybuffer'});
  }
  getPdfinformation(idEnregistrement:any) {
    return this.http.post(PDF_API + 'getficheinformation', {
      idEnregistrement: idEnregistrement,
      
    }, {responseType:'arraybuffer'});
  }
  getPdffichedepresnce(id:any) {
    return this.http.get(PDF_API + 'getfichepresencebyniveau/'+id
      
    , {responseType:'arraybuffer'});
  }
  getPdfrecuPayment(id:any) {
    return this.http.get(PDFPayRecu_API + 'pdfbyidtransaction/'+id
      
    , {responseType:'arraybuffer'});
  }
  getPDFdechargeEtudient(id:any,i:any) {
    return this.http.get(PDFDECHARGE_API + 'dechargeannulationetudiant/'+id+'/'+i
      
    , {responseType:'arraybuffer'});
  }
  getPDFdechargeFinancier(id:any,i:any) {
    return this.http.get(PDFDECHARGE_API + 'dechargeannulationfinancier/'+id+'/'+i
      
    , {responseType:'arraybuffer'});
  }
}
