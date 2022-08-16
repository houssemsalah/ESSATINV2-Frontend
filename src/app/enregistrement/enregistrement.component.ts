import { Component, OnInit } from '@angular/core';
import { InscriService } from '../services/inscri.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModifierService } from '../services/modifier.service';


@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.css']
})
export class EnregistrementComponent implements OnInit {
nom:any;
message:any;
prenom:any;
Cin:String="";
idEtudient:String="";
numeroInscription:any;
form: any = {};
idNiveau:any;
niveaupossible = [
  { idNiveau: 0, designation: "" },
];
role:any;
roleEtat=0;

  constructor(private tokenStorage: TokenStorageService, private inscriservice: InscriService,private modalService: NgbModal,private modifierservice: ModifierService) { }

  ngOnInit(): void {
    localStorage.removeItem("Etud")
    this.role= JSON.parse(localStorage.getItem("USER_Role")!)
    if(this.role.length===1){
      if(this.role!="ROLE_SCOLARITE"){
        window.location.replace('404');
      
              }
    }
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
    this.niveaupossible.splice(0)

  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }
  getetudient(content:any){
    if(this.Cin!=""){
    this.inscriservice.GETEnregistrement(this.Cin).subscribe(
      data => {
        this.modalService.open(content, { size: 'lg' });

         console.log(data.body.idInscription.idEtudiant.idEtudiant)
         this.idEtudient=data.body.idInscription.idEtudiant.idEtudiant

         this.form.nom = data.body.idInscription.idEtudiant.idPersonne.nom
         this.form.prenom = data.body.idInscription.idEtudiant.idPersonne.prenom
         this.form.mail = data.body.idInscription.idEtudiant.idPersonne.mail
         this.form.dateNaissance =data.body.idInscription.idEtudiant.idPersonne.dateDeNaissance
         this.form.telephonne = data.body.idInscription.idEtudiant.idPersonne.tel
         this.form.adresse = data.body.idInscription.idEtudiant.idPersonne.adresse
         this.form.lieuNaissance = data.body.idInscription.idEtudiant.idPersonne.lieuDeNaissance
        this.form.sexe = data.body.idInscription.idEtudiant.idPersonne.sexe
         this.form.nationalite = data.body.idInscription.idEtudiant.idPersonne.idNationalite.libelle
         this.modifierservice.Getnieauxsuvinet(data.body.idInscription.idInscription).subscribe(data => {
          console.log(data)
          this.niveaupossible=[]
          for (const i in data) {
            this.niveaupossible.push({ idNiveau: data[i].idNiveau, designation: data[i].parcours.specialite.cycle.description + "-" + data[i].parcours.designation + "-" + data[i].designation });
          }
          console.log(this.niveaupossible)
        })
      }
    );
  }else{  
    this.inscriservice.GETEtudientbyinscrit(this.numeroInscription).subscribe( data => {

      console.log(data)
      this.modalService.open(content, { size: 'lg' });

      console.log(data.body.idInscription.idEtudiant.idPersonne.numeroIdentificateur)
      this.idEtudient=data.body.idInscription.idEtudiant.idEtudiant
      this.form.nom = data.body.idInscription.idEtudiant.idPersonne.nom
       this.form.prenom = data.body.idInscription.idEtudiant.idPersonne.prenom
       this.form.mail = data.body.idInscription.idEtudiant.idPersonne.mail
       this.form.dateNaissance =data.body.idInscription.idEtudiant.idPersonne.dateDeNaissance
       this.form.telephonne = data.body.idInscription.idEtudiant.idPersonne.tel
       this.form.adresse = data.body.idInscription.idEtudiant.idPersonne.adresse
       this.form.lieuNaissance = data.body.idInscription.idEtudiant.idPersonne.lieuDeNaissance
      this.form.sexe = data.body.idInscription.idEtudiant.idPersonne.sexe
       this.form.nationalite = data.body.idInscription.idEtudiant.idPersonne.idNationalite.libelle
        this.Cin=data.body.idInscription.idEtudiant.idPersonne.numeroIdentificateur
        this.modifierservice.Getnieauxsuvinet(data.body.idInscription.idInscription).subscribe(data => {
          console.log(data)
          for (const i in data) {
            this.niveaupossible.push({ idNiveau: data[i].idNiveau, designation: data[i].parcours.specialite.cycle.description + "-" + data[i].parcours.designation + "-" + data[i].designation });
          }
          console.log(this.niveaupossible)
        })
    })
  }
  }
  enregistrement(content10:any,content11:any){
    this.inscriservice.Enregistrementniveauxsuivant_API(this.idEtudient,this.idNiveau).subscribe(data => {
      this.message=data.body[0].message

      this.open(content10)

      console.log(data.error[0].message)
    }, err => {

      this.message=err.error.message
      this.open(content11)


    
    })
  }
  open1(content:any){
    this.inscriservice.GetallNiveaux().subscribe(data => {
      console.log(data)
    })

  }
  logout(){
    this.tokenStorage.signOut();
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

}
