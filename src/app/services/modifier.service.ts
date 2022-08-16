import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const modifierDonnePersonne_API = "http://localhost:8080/api/personne/"
const enregistrementVerif_API="http://localhost:8080/api/enregistrement/getenregistrementbyidinscription"
const Modifierdiplomecourant_API="http://localhost:8080/api/inscription/modifier"
const getautreniveauxpossiblebyidinscription_API="http://localhost:8080/api/niveausuivant/getautreniveauxpossiblebyidinscription"
const ModifierEnregistrement_API="http://localhost:8080/api/enregistrement/modiferenregistrement"
const getniveauxsuivents_API="http://localhost:8080/api/niveausuivant/getniveauxsuivantbyidinscription"
const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ModifierService {

  constructor(private http: HttpClient) { }
  modifierDonnePersonnel(form: any,numid:any, idpersonne: any): Observable<any> {
    var test = new Observable<any>();
    if(numid >0){

      test = this.http.post(modifierDonnePersonne_API + 'modifierpersonne', {
      idPersonne:idpersonne,
      nom:form.nom,
      prenom:form.prenom,
      mail:form.email,
      adresse:form.adresse,
      tel:form.tel,
      dateDeNaissance:form.dn,
      lieuDeNaissance:form.ln,
      idTypeIdentificateur:form.identificateur,
      numeroIdentificateur:numid,
      sexe:form.sexe,
      idNationalite:form.nationalite
    }, httpOptions);
  }
  if(numid ==0){
    test = this.http.post(modifierDonnePersonne_API + 'modifierpersonne', {
      idPersonne:idpersonne,
      nom:form.nom,
      prenom:form.prenom,
      mail:form.email,
      adresse:form.adresse,
      tel:form.tel,
      dateDeNaissance:form.dn,
      lieuDeNaissance:form.ln,
      idTypeIdentificateur:form.identificateur,
      //numeroIdentificateur:numid,
      sexe:form.sexe,
      idNationalite:form.nationalite
    }, httpOptions);
  }
  return test ;
  
  }
  VerifEnregistrment(id:any): Observable<any> {
    return this.http.post(enregistrementVerif_API ,{
      id: id,
    }, httpOptions);
  }
  Modifierenregistrement(idInscription:any,idNiveaux:any): Observable<any> {
    return this.http.post(Modifierdiplomecourant_API ,{
      idInscription: idInscription,
      idNiveaux:idNiveaux,
    }, httpOptions);
  }
  getautreniveauxpossiblebyidinscription(id:any): Observable<any> {
    return this.http.post(getautreniveauxpossiblebyidinscription_API ,{
      id: id,
    }, httpOptions);
  }
  Getnieauxsuvinet(id:any): Observable<any> {
    return this.http.post(getniveauxsuivents_API ,{
      id: id,
    }, httpOptions);
  }
  Modifierenregistrementancien(idEnregistrement:any,idNiveaux:any): Observable<any> {
    return this.http.post(ModifierEnregistrement_API ,{
      idEnregistrement:idEnregistrement,
      idNiveaux:idNiveaux,
    }, httpOptions);
  }
}
