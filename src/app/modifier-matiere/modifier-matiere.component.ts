import { EnseignantService } from './../services/enseignant.service';
import { MatiereService } from './../services/matiere.service';
import { ModifierService } from './../services/modifier.service';
import { InscriService } from './../services/inscri.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';

import { PdfgenerateService } from '../services/pdfgenerate.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-modifier-matiere',
  templateUrl: './modifier-matiere.component.html',
  styleUrls: ['./modifier-matiere.component.css']
})
export class ModifierMatiereComponent implements OnInit {

  SuccessMessage: boolean = false;
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

matiere={
  "nomMatiere":"",
  "description":"",
  "enseignants":[{"id":0}],
  "niveau":{"idNiveau":0},
  "coefficient":0
  }
form:any;

nomMatiere:any;
description:any;
enseignant=[{id:null},];
coefficient:any;
niveau={idNiveau:null};
idMatiere={
  "id":0
  }

enseignants=[
  {id:null ,prenom:"",nom:""},
];
  constructor(private tokenStorage: TokenStorageService, private inscriservice: InscriService,private modalService: NgbModal,private modifierservice: ModifierService,private matiereService: MatiereService,private enseignantService: EnseignantService ) { }
  ngOnInit(): void {

    if (localStorage.getItem("idMatiere")) {
      console.log("idMatiere = " , JSON.parse(localStorage.getItem("idMatiere")!))
      
      this.idMatiere ={
        "id": JSON.parse(localStorage.getItem("idMatiere")!)
      }
      console.log("this.idMatiere = " , this.idMatiere)
   
    this.matiereService.getmatierebyid(this.idMatiere).subscribe(data=> {
      console.log('getMatiere by id : ' , data)
    }
    )
 }
    
    this.enseignantService.getallenseignant().subscribe(data=>{
      for(const i in data){
        this.enseignants.push({id:data[i].id,  prenom: data[i].personne.prenom , nom:data[i].personne.nom});
      }
   })

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


  
    saveMatiere(data:any) {
  this.matiere={
    "nomMatiere":data.nomMatiere,
    "description":data.description,
    "enseignants":[{"id":data.enseignant}],
    "niveau":{"idNiveau":data.niveau},
    "coefficient":data.coefficient,
    }
  console.log("matiere : ", this.matiere )
      this.matiereService.addmatiere(this.matiere).subscribe(
        data=> {
          console.log("ajoutée :" , data);
          this.SuccessMessage= true,
          this.form.reset();

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
