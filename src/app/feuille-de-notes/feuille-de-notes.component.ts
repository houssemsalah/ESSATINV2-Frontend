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
  selector: 'app-feuille-de-notes',
  templateUrl: './feuille-de-notes.component.html',
  styleUrls: ['./feuille-de-notes.component.css']
})
export class FeuilleDeNotesComponent implements OnInit {
  nom:any;
prenom:any;
idNiveau:any;
session:any;
ds:any;
Examen:any;
Orale:any;
Tp:any;
somme:any;
Controle:any;
ds1=0;
Examen1=0;
Orale1=0;
Tp1=0;
Controle1=0;
test :boolean =true;
sessionunivrchek:any;
role:any;
roleEtat=0;

id_session:any;
  class = [
    { idNiveau: 0, Cycle: "",Specialite:"",Parcours:"",Niveau:"" },
  ];
  constructor(private ExamenService: ExamenService,private SessionScolaireService: SessionScolaireService,private tokenStorage: TokenStorageService,private PdfgenerateService: PdfgenerateService, private inscriservice: InscriService,private modalService: NgbModal,private modifierservice: ModifierService) { }

  ngOnInit(): void {
    localStorage.removeItem("Etud")
    this.role= JSON.parse(localStorage.getItem("USER_Role")!)
    if(this.role.length===1){
      if(this.role!="ROLE_EXAMEN"){
        window.location.replace('404');
      
              }
    }
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
        this.class.push({ idNiveau: data[i].idNiveau, Niveau: data[i].parcours.specialite.cycle.description+"--"+data[i].parcours.designation +"--"+data[i].designation , Parcours:data[i].parcours.designation,Specialite:data[i].parcours.specialite.designation, Cycle:data[i].parcours.specialite.cycle.description});
      }
      console.log(this.class)

    })
    this.SessionScolaireService.getsessionuniv().subscribe(
      data => {
        this.session=data

        this.sessionunivrchek=this.session[this.session.length-1];
        this.id_session=this.sessionunivrchek.idSession

      })
  }
  show(){
    
    if(this.ds){
      this.ds1=1

    }if(this.Examen){
      this.Examen1=2
    }if(this.Tp){
      this.Tp1=4
    }
    if(this.Orale){
      this.Orale1=8
    }
    if(this.Controle){
      this.Controle1=16
      
    }
this.somme=this.ds1+this.Examen1+this.Tp1+this.Orale1+this.Controle1;
console.log(this.idNiveau,this.id_session,this.somme)
    this.ExamenService.getPdfinformation(this.idNiveau,this.id_session,this.somme).subscribe( (pdf:any)=>{
      const blob = new Blob([pdf], { type: 'application/pdf' })
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
   
  })
}
do1(){
 this.Controle=false;
}
do2(){
  this.ds=false;
  this.Examen=false;
  this.Tp=false;
  this.Orale=false;
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
