import { EnseignantService } from './../services/enseignant.service';
import { InscriService } from './../services/inscri.service';
import { MatiereService } from './../services/matiere.service';
import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons ,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModifierService } from '../services/modifier.service';
import { PdfgenerateService } from '../services/pdfgenerate.service';






@Component({
  selector: 'app-liste-des-matieres',
  templateUrl: './liste-des-matieres.component.html',
  styleUrls: ['./liste-des-matieres.component.css']
})
export class ListeDesMatieresComponent implements OnInit {
  SuccessMessage: boolean = false;


  closeResult = '';






matiere={
  "idMatiere" :0,
  "nomMatiere":"",
  "description":"",
  "enseignants":[{"id":0}],
  "niveau":{"idNiveau":0},
  "coefficient":0
  }
  form: any = {};

nomMatiere:any;
description:any;
enseignant=[{id:null},];


idMatiere={
  "id":0
  }

enseignants=[
  {id:null ,prenom:"",nom:""},
];
  nom:any;
  prenom:any;
  idNiveau:any;
  searchText: any;
  test:any;
  id_niveaux:any;
  roleEtat=0;


niveau:any;
coefficient: any;
matieres:any;
role:any;

niveaux={
  "idNiveau":0
  }

  classe = { idNiveau: 0, Cycle: "",Specialite:"",Parcours:"",Niveau:"" } ;

  class = [
    { idNiveau: 0, Cycle: "",Specialite:"",Parcours:"",Niveau:"" },
  ];
  constructor(private tokenStorage: TokenStorageService, private inscriservice: InscriService,private modalService: NgbModal,private modifierservice: ModifierService,private matiereService: MatiereService,private enseignantService: EnseignantService) { }

  ngOnInit(): void {

    
    this.enseignantService.getallenseignant().subscribe((data: any) => {
      for(const i in data){
        this.enseignants.push({id:data[i].id,  prenom: data[i].personne.prenom , nom:data[i].personne.nom});
      }
   })

    this.inscriservice.GetallNiveaux().subscribe(data=>{
      for(const i in data){
        this.class.push({ idNiveau: data[i].idNiveau, Niveau: data[i].designation , Parcours:data[i].parcours.designation,Specialite:data[i].parcours.specialite.designation, Cycle:data[i].parcours.specialite.cycle.description});
      }

    })


  


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







    this.class.splice(0)

    if (localStorage.getItem("idNiveaux")) {
      this.niveaux={
        "idNiveau":JSON.parse(localStorage.getItem("idNiveaux")!)
      }

      this.inscriservice.GETNiveauById(this.niveaux).subscribe(data => {  
       
        this.classe={ idNiveau: data.idNiveau, Niveau: data.designation , Parcours:data.parcours.designation,Specialite:data.parcours.specialite.designation, Cycle:data.parcours.specialite.cycle.description};
      console.log("this.classe ==",this.classe )
      })
         
        this.matiereService.getmatierebyniveaux(this.niveaux).subscribe(data=> {
          console.log('matieresss : ' , data);
          this.matieres=data;
        })
      }
      
 


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
   
}

getidmatiere(idMatiere:any){
  localStorage.setItem("idMatiere",JSON.stringify(idMatiere))
  window.location.replace("dashbord/modifierMatiere")
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

  pushNoteMatiere(m:any){
    localStorage.setItem("MatiereNote",JSON.stringify(m))
    window.location.replace('dashbord/ajoutNote');
    } 
 

  pushModifierMatiere(m:any){

    localStorage.setItem("Matiere",JSON.stringify(m))
    
 
     

      this.form.nomMatiere = m.nomMatiere
      this.form.description = m.description
     this.form.enseignants = m.enseignants[0].id    
     this.form.coefficient = m.coefficient
      
      
      this.form.classe = m.niveau.idNiveau
      // Cycle +" " + Specialite+" " + Parcours+" " + Niveau
     // this.classe.reset()
      
   
     
console.log("this.form : ", this.form)  

  }

supprimerMatiere(id:any,nomMatiere:any){
  if(confirm("Voulez-vous supprimer la matiére  "+nomMatiere)) {
  this.matiereService.supprimermatiere(id).subscribe((data:any)=> {
    console.log("supprimer :",data)
    this.matiereService.getmatierebyniveaux(this.niveaux).subscribe(data=> {
      console.log('matieresss : ' , data);
      this.matieres=data;
    })
})
} }
  saveMatiere(content7:any,content8:any) {
   
    this.matiere={

     "idMatiere" :JSON.parse(localStorage.getItem("Matiere")!).idMatiere,
      "nomMatiere":this.form.nomMatiere,
      "description":this.form.description,
      "enseignants":[{"id":this.form.enseignants}], 
      "niveau":{"idNiveau": this.form.classe},
      "coefficient": this.form.coefficient,
      }
    console.log("matieriiiiiii : ", this.matiere )
        this.matiereService.addmatiere(this.matiere).subscribe(
          data=> {
            localStorage.removeItem("form")
            console.log("ajoutée :" , data);
            this.closeModallg(content8)
            this.open(content7)
            this.matiereService.getmatierebyniveaux(this.niveaux).subscribe(data=> {
              console.log('matieresss : ' , data);
              this.matieres=data;
            })
     })
    }
  
    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
      }

    openModallg(content8: any) {
      this.modalService.open(content8, {size: 'lg'});
    }

    closeModallg(content8: any) {
      this.modalService.open(content8, {size: 'lg'}).close();
    }
 
}