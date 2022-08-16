import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const GETNationalite_API = "http://localhost:8080/api/nationalite/";
const GETTypeidentificateur_API = "http://localhost:8080/api/typeidentificateur/";
const GETCycle_API = "http://localhost:8080/api/cycle/";
const GETSpecialite_API = "http://localhost:8080/api/specialite/";
const GETParcours_API = "http://localhost:8080/api/parcours/";
const GETniveaux_API = "http://localhost:8080/api/niveaux/"
const Inscri_API = "http://localhost:8080/api/inscription/";
const GETDiplome_API = "http://localhost:8080/api/diplome/";
const GETEtudient_API = "http://localhost:8080/api/etudiants/";
const GETAnciendiplome_API = "http://localhost:8080/api/diplomeetudiant/";
const GETContactparentalet_API = "http://localhost:8080/api/contactetudiant/";
const InscrianicienEtud_API = "http://localhost:8080/api/inscription/nouveauetudiantwithidp";
const GetEtudientbyInscrit ="http://localhost:8080/api/enregistrement/getenregistrementbynumeroinscription"
const GetEnregistrement="http://localhost:8080/api/enregistrement/getenregistrementbynumeroidentifiant"
const Enregistrementniveauxsuivant_API="http://localhost:8080/api/enregistrement/enregistrementniveauxsuivant"










const httpOptions = {
  
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InscriService {

  constructor(private http: HttpClient) { }
  GETNationalite(): Observable<any> {
    return this.http.get(GETNationalite_API + 'getall', httpOptions);
  }
  GETTypeidentificateur(): Observable<any> {
    return this.http.get(GETTypeidentificateur_API + 'getall', httpOptions);
  }
  GETCycle(): Observable<any> {
    return this.http.get(GETCycle_API + 'getall', httpOptions);
  }
  GETDiplome(): Observable<any> {
    return this.http.get(GETDiplome_API + 'getall',{observe:'response'} );
  }
  GETSpecialite(id:any): Observable<any> {
    return this.http.post(GETSpecialite_API + 'getbyid',{
      idcycle: id,
    }, httpOptions);
  }
  GETParcours(id:any): Observable<any> {
    return this.http.post(GETParcours_API + 'getbyid',{
      idspecialite: id,
    }, httpOptions);
  }
  GETNiveaux(id:any): Observable<any> {
    return this.http.post(GETniveaux_API + 'getbyid',{
      idparcours: id,
    }, httpOptions);
  }
  GetallNiveaux(): Observable<any> {
    return this.http.get(GETniveaux_API + 'getall',httpOptions );

  }
  GETEtudient(id:any): Observable<any> {
    return this.http.post(GETEtudient_API + 'getbynumid',{
      numidentificateur: id,
    }, {observe:'response'});
  }
  GETEnregistrement(id:any): Observable<any> {
    return this.http.post(GetEnregistrement ,{
      numidentificateur: id,
    }, {observe:'response'});
  }
  GETEtudientbyinscrit(id:any): Observable<any> {
    return this.http.post(GetEtudientbyInscrit ,{
      numeroInscription: id,
    }, {observe:'response'});
  }
  GETAncienDiplome(id:any): Observable<any> {
    return this.http.post(GETAnciendiplome_API + 'getbyidetudiant',{
      idEtudiant: id,
    }, httpOptions);
  }
  AjouterAncienDiplome(idEtudiant:any,idDiplome:any,anne:any,specialite:any,niveau:any,status:any,etablissement:any): Observable<any> {
    return this.http.post(GETAnciendiplome_API + 'ajouter',{
      idEtudiant: idEtudiant,
      idDiplome:idDiplome,
      annee:anne,
      specialite:specialite,
      niveau:niveau,
      status:status,
      etablissement:etablissement,

    }, {observe:'response'});
  }
  ModifierAncienDiplome(idDiplomeEtudiant:any,idDiplome:any,anne:any,specialite:any,niveau:any,status:any,etablissement:any): Observable<any> {
    return this.http.post(GETAnciendiplome_API + 'modifer',{
      idDiplomeEtudiant: idDiplomeEtudiant,
      idDiplome:idDiplome,
      annee:anne,
      specialite:specialite,
      niveau:niveau,
      status:status,
      etablissement:etablissement,

    }, {observe:'response'});
  }
  SupprimerAncienDiplome(id:any): Observable<any> {
    return this.http.post(GETAnciendiplome_API + 'supprimerbyid',{
      idDiplomeEtudiant: id,
    }, httpOptions);
  }
  GETContactetudiant(id:any): Observable<any> {
    return this.http.post(GETContactparentalet_API + 'getbyidetudiant',{
      id: id,
    }, httpOptions);
  }
  AjouterContactetudiant(idEtu:any,numero:any,nom:any,designation:any): Observable<any>{
    return this.http.post(GETContactparentalet_API + 'ajoutercontactetudiant',{
      idEtudiant: idEtu,
      numero: numero,
      nom: nom,
      designation: designation,

    }, httpOptions);

  }
  ModifierContactetudiant(idContact:any,numero:any,nom:any,designation:any): Observable<any>{
    return this.http.post(GETContactparentalet_API + 'modifiercontacteetudiant',{
      idContact: idContact,
      numero: numero,
      nom: nom,

      designation: designation,

    }, httpOptions);

  }
  SuprimmerContactetudiant(id:any): Observable<any>{
    return this.http.post(GETContactparentalet_API + 'supprimerbyid',{
      id: id,
    }, httpOptions);

  }

  inscri(form: { nom: any; prenom: any;mail: any;adresse: any;telephonne: any;
    dateNaissance: any;  lieuNaissance: any; idTypeIdentificateur: any;ididentif: any;sexe: any;nationalite: any;
    contactEtudiantList: any; diplomeEtudiantList: any;niveauxInscrit:any;}):Observable<any> {
      console.log(form)
    return this.http.post(Inscri_API + 'nouveauetudiant', {
     nom: form.nom,
     prenom: form.prenom,
      mail:form.mail,
     adresse:form.adresse,
    telephonne:form.telephonne,
     dateNaissance:form.dateNaissance,
     lieuNaissance:form.lieuNaissance,
     idTypeIdentificateur:form.idTypeIdentificateur,
      ididentif:form.ididentif,
      sexe:form.sexe,
      idNationalite:form.nationalite,
      contactEtudiantList:form.contactEtudiantList,
      diplomeEtudiantList:form.diplomeEtudiantList,
      niveauxInscrit:form.niveauxInscrit
   }, httpOptions);
  }
  Etudestdejainscri(id:any): Observable<any>{
    return this.http.post(Inscri_API + 'estdejainscritcettesessionbyidpersonne', {
    id:id
    },  {observe:'response'});

  }
  InscriancienEtud(idNiveau:any,idPersonne:any,form:any): Observable<any>{
    return this.http.post(InscrianicienEtud_API, {
      niveauxInscrit:idNiveau,
      idPersonne:idPersonne,
      mail:form.mail,
      adresse:form.adresse,
      tel:form.telephonne,
      contactEtudiantList:form.contactEtudiantList,
      diplomeEtudiantList:form.diplomeEtudiantList,
    },  {observe:'response'});

  }
  Enregistrementniveauxsuivant_API(idEtudient:any,idNiveau:any): Observable<any>{
    return this.http.post(Enregistrementniveauxsuivant_API, {
      idEtudiant:idEtudient,
    niveauxInscrit:idNiveau,
    },  {observe:'response'});

  }


 

}
