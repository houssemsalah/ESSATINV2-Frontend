import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';
import { PdfgenerateService } from '../services/pdfgenerate.service';

@Component({
  selector: 'app-etudiants-par-class',
  templateUrl: './etudiants-par-class.component.html',
  styleUrls: ['./etudiants-par-class.component.css']
})
export class EtudiantsParClassComponent implements OnInit {

 sessionunivr: any;
  sessionunivrchek:any;
  id_session: any;
  id_niveaux: any ;
  etu: any;
  searchText: any;
  nom:any;
  prenom:any;
  long:number=0;
  role:any;
  roleEtat=0;


  constructor(private tokenStorage: TokenStorageService ,private SessionScolaireService: SessionScolaireService,private PdfgenerateService :PdfgenerateService) {
  
   }

  ngOnInit(): void {
    
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

    if (localStorage.getItem("idNiveau")) {
      console.log("idNiveau = " , localStorage.getItem("idNiveau"))
      
      this.id_niveaux = JSON.parse(localStorage.getItem("idNiveau")!)
      
    }

    this.SessionScolaireService.getsessionuniv().subscribe(
      data => {
        this.sessionunivr = data;
        this.sessionunivrchek=this.sessionunivr[this.sessionunivr.length-1];
        this.id_session=this.sessionunivrchek.idSession
        console.log('this.id_session : ',this.id_session) 
      },
      err => {
      }
    );
        this.SessionScolaireService.getetudbyclass(this.id_niveaux,this.id_session).subscribe(
          data => {
   
      this.etu=data; 
      console.log('getetudbyclassssss : ',data)   
          },
          err => {
          }
        );
     
 
    console.log(" this.id_niveaux : ", this.id_niveaux)
 

 
  
   

    

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
