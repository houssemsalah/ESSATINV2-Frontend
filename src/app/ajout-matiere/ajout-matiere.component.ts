import { EnseignantService } from './../services/enseignant.service';
import { MatiereService } from './../services/matiere.service';
import { Component, OnInit } from '@angular/core';
import { InscriService } from '../services/inscri.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModifierService } from '../services/modifier.service';
import { PdfgenerateService } from '../services/pdfgenerate.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-ajout-matiere',
  templateUrl: './ajout-matiere.component.html',
  styleUrls: ['./ajout-matiere.component.css']
})
export class AjoutMatiereComponent implements OnInit {

nom:any;
prenom:any;
idNiveau:any;
searchText: any;
test:any;
role:any;
roleEtat=0;
class = [
  { idNiveau: 0, Cycle: "",Specialite:"",Parcours:"",Niveau:"" },
];
form:any;

nomMatiere:any;
description:any;
enseignant:any;
coefficient:any;
niveau:any;


enseignants=[
  {prenom:"",nom:""},
];
  constructor(private tokenStorage: TokenStorageService, private inscriservice: InscriService,private modalService: NgbModal,private modifierservice: ModifierService,private matiereService: MatiereService,private enseignantService: EnseignantService ) { }

  ngOnInit(): void {
  
    this.enseignantService.getallenseignant().subscribe(data=>{
      for(const i in data){
        this.enseignants.push({  prenom: data[i].personne.prenom , nom:data[i].personne.nom});
      }
   })

  }

   getenseignant(id:any) {
    this.enseignant = this.enseignantService.getenseignant(id);
    }


    this.inscriservice.GetallNiveaux().subscribe(data=>{
      for(const i in data){
        this.class.push({ idNiveau: data[i].idNiveau, Niveau: data[i].designation , Parcours:data[i].parcours.designation,Specialite:data[i].parcours.specialite.designation, Cycle:data[i].parcours.specialite.cycle.description});
      }

    })


    this.form = new FormGroup({
      nomMatiere: new FormControl(),
      description: new FormControl(),
      enseignant: new FormControl(),
      niveau: new FormControl(),
      coefficient: new FormControl()
   });
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
    this.class.splice(0)

    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
    this.inscriservice.GetallNiveaux().subscribe(data=>{
      for(const i in data){
        this.class.push({ idNiveau: data[i].idNiveau, Niveau: data[i].designation , Parcours:data[i].parcours.designation,Specialite:data[i].parcours.specialite.designation, Cycle:data[i].parcours.specialite.cycle.description});
      }console.log(this.class)
      

    })

  }

 
    




getclass(id:any){
  this.niveau= this.inscriservice.GETNiveaux(id);
  console.log("this.niveau : " ,this.niveau)
}



  saveMatiere(data:any) {
    console.log("data22: ",data)
this.nomMatiere=data.nomMatiere;
this.description=data.description;
this.coefficient=data.coefficient;
    this.matiereService.addmatiere(this.nomMatiere,this.description,this.enseignant,this.niveau,this.coefficient)
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

