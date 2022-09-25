import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';
import { InscriService } from '../services/inscri.service';

import { PdfgenerateService } from '../services/pdfgenerate.service';
@Component({
  selector: 'app-home-exam',
  templateUrl: './home-exam.component.html',
  styleUrls: ['./home-exam.component.css']
})
export class HomeExamComponent implements OnInit {
  sessionunivr: any;
  sessionunivrchek:any;
  id_session: any;
  etu: any;
  searchText: any;
  nom:any;
  prenom:any;
  role:any;
roleEtat=0;
   class = [
    { idNiveau: 0, Cycle: "",Specialite:"",Parcours:"",Niveau:"" },
  ];

  constructor( private inscriservice: InscriService,private tokenStorage: TokenStorageService ,private SessionScolaireService: SessionScolaireService,private PdfgenerateService :PdfgenerateService) { }

  ngOnInit(): void {
    localStorage.removeItem("Etud")
    this.role= JSON.parse(localStorage.getItem("USER_Role")!)
  /*   if(this.role.length===1){
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
    this.class.splice(0)
    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
    this.inscriservice.GetallNiveaux().subscribe(data=>{
      console.log(data)
      for(const i in data){
        this.class.push({ idNiveau: data[i].idNiveau, Niveau: data[i].designation , Parcours:data[i].parcours.designation,Specialite:data[i].parcours.specialite.designation, Cycle:data[i].parcours.specialite.cycle.description});
      }
      console.log(this.class)

    })
    this.SessionScolaireService.getsessionuniv().subscribe(
      data => {
        this.sessionunivr = data;
        this.sessionunivrchek=this.sessionunivr[this.sessionunivr.length-1];
        this.id_session=this.sessionunivrchek.idSession
        this.SessionScolaireService.getetudss(this.id_session).subscribe(
          data => {
console.log(data)      
      this.etu=data; 
          },
          () => {
          }
        );
      },
      err => {
      }
    );
   
  }
  logout(){
    this.tokenStorage.signOut();
  }
  changessesion(){
    this.SessionScolaireService.getetudss(this.id_session).subscribe(
      data => {
        this.etu=data;
      }
    );
  }

  pushniveau(idNiveau:any){
    localStorage.setItem("idNiveau",JSON.stringify(idNiveau))
    window.location.replace("dashbord/etudiantsParClass")
  }
  pushniveaux(idNiveaux:any){
    localStorage.setItem("idNiveaux",JSON.stringify(idNiveaux))
    window.location.replace("dashbord/matieresParClass")
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
