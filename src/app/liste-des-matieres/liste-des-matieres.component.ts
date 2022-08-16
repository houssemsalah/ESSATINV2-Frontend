import { MatiereService } from './../services/matiere.service';
import { Component, OnInit } from '@angular/core';
import { InscriService } from '../services/inscri.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModifierService } from '../services/modifier.service';
import { PdfgenerateService } from '../services/pdfgenerate.service';

@Component({
  selector: 'app-liste-des-matieres',
  templateUrl: './liste-des-matieres.component.html',
  styleUrls: ['./liste-des-matieres.component.css']
})
export class ListeDesMatieresComponent implements OnInit {

  nom:any;
  prenom:any;
  idNiveau:any;
  searchText: any;
  test:any;
  
  roleEtat=0;
 nomMatiere:any;
description:any;
niveau:any;
cefficient: any;
matieres:any;
role:any;
enseignants=[];

  constructor(private tokenStorage: TokenStorageService,private matiereService: MatiereService, private inscriservice: InscriService,private modalService: NgbModal) { }

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
    this.matiereService.getallmatieres().subscribe(data=>{
     this.matieres=data;
     console.log("matieres : ",data);
    },
    () => {
    }
  );
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