import { MatiereService } from './../services/matiere.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';

import { PdfgenerateService } from '../services/pdfgenerate.service';
declare  var jQuery:  any;

@Component({
  selector: 'app-ajout-note',
  templateUrl: './ajout-note.component.html',
  styleUrls: ['./ajout-note.component.css']
})
export class AjoutNoteComponent implements OnInit {
  
  check1=true;
  check2=false;
  check3=false;
  check4=false;
  check5=false;

  name = 'Angular';
 sessionunivr: any;
  sessionunivrchek:any;
  id_session: any;
  etu: any;
  searchText: any;

  long:number=0;
  role:any;
  roleEtat=0;

  id_niveaux: any ;
  ns={
    "idNiveaux":0,
    "idSession":0
  }
  nom:any;
  prenom:any;
  ds:any;
  examen:any;
  tp:any;
  orale:any;
  controle:any;
etudiant:any;
  typeNote = 2;
 
  enseignants=[
    {id:null ,prenom:"",nom:""},
  ];


  notes=[
    {
       
      note: -1,
      matiere: {
          idMatiere: -1
                  },
      etudiant: {
          idEtudiant:-1
      },
      typeDeNote: {
          "id": -1
          
      }
  },];


  constructor(private tokenStorage: TokenStorageService ,private SessionScolaireService: SessionScolaireService,private PdfgenerateService :PdfgenerateService,private matiereService : MatiereService) { }

  ngOnInit(): void {


    this.SessionScolaireService.getsessionuniv().subscribe(
      data => {
        this.sessionunivr = data;
        this.sessionunivrchek=this.sessionunivr[this.sessionunivr.length-1];
        this.id_session=this.sessionunivrchek.idSession
        console.log('this.id_session : ',this.id_session) 
        if (localStorage.getItem("idNiveaux")) {
          console.log("idNiveau = " , localStorage.getItem("idNiveaux"))
          
          this.id_niveaux = JSON.parse(localStorage.getItem("idNiveaux")!)
          
        }

        this.ns={
          "idNiveaux":this.id_niveaux ,
          "idSession":this.id_session
        }
        console.log("this.ns = ",this.ns)
      this.SessionScolaireService.getetudbyclass(this.ns).subscribe(
          data => {
   
      this.etu=data; 
      console.log('getetudbyclassssss : ',data)   ;
          }) 
        }
    );


    if (localStorage.length < 1) {
      window.location.replace('');
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

  
  form = new FormGroup({
    prenom: new FormControl(),
    nom: new FormControl(),
    ds: new FormControl(),
    etudiant: new FormControl(),
    examen: new FormControl(),
    tp: new FormControl(),
    orale: new FormControl(),
    controle: new FormControl()
  })

  onlyOneValue(e:any)
  {
    if (e.target.id == "check1id") {
        this.check1= true;
        this.check2 = false;
        this.check3 = false;
        this.check4 = false;
        this.check5 = false;
        this.typeNote=2;
      }
   else  if (e.target.id == "check2id") {
        this.check1= false;
        this.check2 = true;
        this.check3 = false;
        this.check4 = false;
        this.check5 = false;
        this.typeNote=1;
      }
      else  if (e.target.id == "check3id") {
        this.check1= false;
        this.check2 = false;
        this.check3 = true;
        this.check4 = false;
        this.check5 = false;
        this.typeNote=3;
      }
      
      else  if (e.target.id == "check4id") {
        this.check1= false;
        this.check2 = false;
        this.check3 = false;
        this.check4 = true;
        this.check5 = false;
        this.typeNote=5;
      }
      else  if (e.target.id == "check5id") {
        this.check1= false;
        this.check2 = false;
        this.check3 = false;
        this.check4 = false;
        this.check5 = true;
        this.typeNote=4;
      }
  }

  setNotes(event:any,i:any) {
  
  console.log("event : ",event.target.value," i : ",i)
     
    this.notes[i]={
      
      note: Number(event.target.value)
      ,
      matiere: {
          idMatiere: JSON.parse(localStorage.getItem("MatiereNote")!).idMatiere
                  },
      etudiant: {
          idEtudiant: this.etu[i].idInscription.idEtudiant.idEtudiant
      },
      typeDeNote: {
          "id": this.typeNote
          
      }
  };
  
console.log("notes : ", this.notes);
  
  }

 saveNotes(){
  this.matiereService.addnotes(this.notes).subscribe((notes:any) => 
    console.log("notessssss : ", notes)
  )
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
  downloadPdfpresenceSG(cm:any){
    this.PdfgenerateService.getPdfpresence(cm.idEnregistrement,false).subscribe( (pdf:any)=>{
      const blob = new Blob([pdf], { type: 'application/pdf' })
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
   
  })
}
downloadPdfpresenceDG(cm:any){
    this.PdfgenerateService.getPdfpresence(cm.idEnregistrement,true).subscribe( (pdf:any)=>{
    const blob = new Blob([pdf], { type: 'application/pdf' })
    var fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
 
})

}
downloadPdfinscriptionDG(cm:any){
  this.PdfgenerateService.getPdfinscription(cm.idEnregistrement,true).subscribe( (pdf:any)=>{
  const blob = new Blob([pdf], { type: 'application/pdf' })
  var fileURL = URL.createObjectURL(blob);
  window.open(fileURL);

})

}
downloadPdfinscriptionSG(cm:any){
  this.PdfgenerateService.getPdfinscription(cm.idEnregistrement,false).subscribe( (pdf:any)=>{
  const blob = new Blob([pdf], { type: 'application/pdf' })
  var fileURL = URL.createObjectURL(blob);
  window.open(fileURL);

})

}
downloadPdfinformation(cm:any){
  this.PdfgenerateService.getPdfinformation(cm.idEnregistrement).subscribe( (pdf:any)=>{
  const blob = new Blob([pdf], { type: 'application/pdf' })
  var fileURL = URL.createObjectURL(blob);
  window.open(fileURL);

})

}
pushEtu(cm:any){
  localStorage.setItem("Etud",JSON.stringify(cm))
  window.location.replace("detailleEtud")
}
do(){
  alert("ahhhh")
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

