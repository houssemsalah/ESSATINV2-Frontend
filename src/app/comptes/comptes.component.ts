import { MatiereService } from './../services/matiere.service';
import { RoleService } from './../services/role.service';
import { InscriService } from './../services/inscri.service';
import { ModifierService } from './../services/modifier.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { CompteService } from './../services/compte.service';
import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';

import { PdfgenerateService } from '../services/pdfgenerate.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  personne:any
  test = "";
  verifEnr: number = 0;
  nomuser: any;
  diplomeCourent: any;
  prenomuser: any;
  idpersonne: any;
  idEtu: any;
  form: any = {};
  Etudidentificateur: any;
  identificateur: any;
  nationalite: any;
  Etudnationalite: any;
  closeResult = '';
  idDiplome1: number = 0
  nomDiplome: string = '';
  annee: string = '';
  specialite: string = '';
  niveau: string = '';
  status: string = '';
  etablissement: string = '';
  diplomeEtudiantList = [
    {
      idDiplome: "", annee: "", specialite: "",
      niveau: "", status: "", etablissement: "", nomDiplome: "", idDiplomeType: 0
    },
  ];
  designation: string = '';
  numero: string = '';
  nom: string = '';
  contactEtudiantList = [
    {idContactpersonne: 0, designation: "", nom: "", numero: ""},
  ];
  diplome: any;
  Cycle: any;
  Specialite: any;
  Parcours: any;
  niveaux: any;
  niveaupossibletest: boolean = true;
  niveaupossible = [
    {idNiveau: 0, designation: ""},
  ];
  idCycle: string = '';
  idSpecialite: string = '';
  idParcours: string = '';
  idNiveau: string = '';
  role: any;
  roleEtat = 0;


idCompte:any;
 sessionunivr: any;
  sessionunivrchek:any;
  id_session: any;
  etu: any;
  searchText: any;

  prenom:any;
  long:number=0;
  
comptes:any
roles: any
roless: any
  constructor(private roleService:RoleService,private inscriservice: InscriService ,private compteService:CompteService ,private tokenStorage: TokenStorageService ,private SessionScolaireService: SessionScolaireService,private PdfgenerateService :PdfgenerateService,private modalService: NgbModal, private modifierservice: ModifierService) { }

  ngOnInit(): void {
    if (localStorage.length < 1) {
      window.location.replace('');
    }
    localStorage.removeItem("Compte")
    this.role= JSON.parse(localStorage.getItem("USER_Role")!)
    if(this.role.length===1){
      if(this.role!="ROLE_SCOLARITE"){
        window.location.replace('404');
      
              }
    }
    this.roleService.getallroles().subscribe(
      (data: any) => {
     
        this.roles = data;
      
      }
    )
    this.inscriservice.GETTypeidentificateur().subscribe(
      (data: any) => {
        this.identificateur = data;
      }
    );
    this.inscriservice.GETNationalite().subscribe(
      (data: any) => {
        this.nationalite = data;
      }
    );
    if(this.role.length!=1){

    for(var i in this.role){
      if(this.role[i]!="ROLE_SCOLARITE"){
this.roleEtat=this.roleEtat+1;       
      }
  }
  if (localStorage.length < 1) {
    window.location.replace('404');
  }
  if(this.roleEtat===this.role.length){

    window.location.replace('404');
  }}

 
    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
   this.compteService.getcomptes().subscribe(comptes => this.comptes = comptes);    
   
   this.idEtu = JSON.parse(localStorage.getItem("Compte")!).idInscription.idEtudiant.idEtudiant
     


  }

  pushCompte(cm:any){

    localStorage.setItem("Compte",JSON.stringify(cm))
    console.log("cm",cm)
    this.personne = JSON.parse(localStorage.getItem("Compte")!).idPersonne;
      console.log("this.personne", this.personne)
      this.idpersonne = this.personne.idPersonne
      this.form.login=JSON.parse(localStorage.getItem("Compte")!).login
      this.form.password=JSON.parse(localStorage.getItem("Compte")!).password
      this.form.role=JSON.parse(localStorage.getItem("Compte")!).roles
      console.log("this.form.role", this.form.role)
      this.roless= this.form.role
      this.form.nom = this.personne.nom
      this.form.prenom = this.personne.prenom
      this.form.email = this.personne.mail
      this.form.adresse = this.personne.adresse
      this.form.tel = this.personne.tel
      this.form.dn = this.personne.dateDeNaissance
      this.form.ln = this.personne.lieuDeNaissance
      this.form.numid = this.personne.numeroIdentificateur
      this.form.sexe = this.personne.sexe
      this.Etudnationalite = this.personne.idNationalite.libelle!
      this.form.nationalite = this.personne.idNationalite.id_Nationalite!
      this.Etudidentificateur = this.personne.idIdentificateur.typeIdentificateur
      this.form.identificateur = this.personne.idIdentificateur.idTypeidentificateur


      this.idCompte=JSON.parse(localStorage.getItem("Compte")!).id
      localStorage.removeItem("Compte")
console.log("this.form", this.form)  
  }


  logout(){
    this.tokenStorage.signOut();
  }

  openModallg(content8: any) {
    this.modalService.open(content8, {size: 'lg'});


  }
change(cm:any){
  if(cm=="ROLE_FINANCIER"){
    window.location.replace('homeFina');

  }
  if(cm=="ROLE_SCOLARITE"){
    window.location.replace('Etu');

  }
  if(cm=="ROLE_EXAMEN"){
    window.location.replace('homeEx');

  }
  
} 
supprimerRole(idRole:any,role:any){
  
  console.log("idRole idCompte",idRole,this.idCompte)
  if(confirm("Voulez-vous supprimer  "+role+" de "+this.form.prenom+" "+this.form.nom)) {
this.roleService.supprimerrole(this.idCompte,idRole).subscribe((result:any) => 
 
  this.compteService.getcomptes().subscribe((comptes:any) => this.comptes = comptes)  

  );}
}
onSubmit(content7: any) {
  console.log(JSON.parse(localStorage.getItem("Compte")!).idInscription.idEtudiant.idPersonne.numeroIdentificateur, this.form.numid)
  if (JSON.parse(localStorage.getItem("Compte")!).idInscription.idEtudiant.idPersonne.numeroIdentificateur === this.form.numid) {
    this.modifierservice.modifierDonnePersonnel(this.form, this.test, this.idpersonne).subscribe(
      data => {
        console.log(data)
        if (data.code === 200) {
          this.Etudnationalite = this.nationalite[this.form.nationalite - 1].libelle
          this.Etudidentificateur = this.identificateur[this.form.identificateur - 1].typeIdentificateur
          this.open(content7)
        }
      }
    );
  }
  if (JSON.parse(localStorage.getItem("Compte")!).idInscription.idEtudiant.idPersonne.numeroIdentificateur != this.form.numid) {
    this.modifierservice.modifierDonnePersonnel(this.form, this.form.numid, this.idpersonne).subscribe(
      data => {
        console.log(data)
        if (data.code === 200) {
          this.Etudnationalite = this.nationalite[this.form.nationalite - 1].libelle
          this.Etudidentificateur = this.identificateur[this.form.identificateur - 1].typeIdentificateur
          this.open(content7)
        }
      }
    );
  }
}










open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
  });
}




}
