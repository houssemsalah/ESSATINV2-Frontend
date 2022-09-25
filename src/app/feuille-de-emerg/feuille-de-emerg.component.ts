import { Component, OnInit } from '@angular/core';
import { InscriService } from '../services/inscri.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModifierService } from '../services/modifier.service';
import { PdfgenerateService } from '../services/pdfgenerate.service';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { ExamenService } from '../services/examen.service';
@Component({
  selector: 'app-feuille-de-emerg',
  templateUrl: './feuille-de-emerg.component.html',
  styleUrls: ['./feuille-de-emerg.component.css']
})
export class FeuilleDeEmergComponent implements OnInit {
  nom:any;
  prenom:any;
  role:any;
  roleEtat=0;
  constructor(private ExamenService: ExamenService,private SessionScolaireService: SessionScolaireService,private tokenStorage: TokenStorageService,private PdfgenerateService: PdfgenerateService, private inscriservice: InscriService,private modalService: NgbModal,private modifierservice: ModifierService) { }

  ngOnInit(): void {
    localStorage.removeItem("Etud")
    this.role= JSON.parse(localStorage.getItem("USER_Role")!)
   /*  if(this.role.length===1){
      if(this.role!="ROLE_EXAMEN"){
        window.location.replace('404');
      
              }
    } */
    if(this.role.length!=1){

    for(var i in this.role){
      if(this.role[i]!="ROLE_EXAMEN"){
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
