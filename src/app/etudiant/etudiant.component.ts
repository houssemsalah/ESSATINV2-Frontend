import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';

import { PdfgenerateService } from '../services/pdfgenerate.service';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  sessionunivr: any;
  sessionunivrchek:any;
  id_session: any;
  etu: any;
  searchText: any;
  nom:any;
  prenom:any;
  long:number=0;
  role:any;
  roleEtat=0;


  constructor(private tokenStorage: TokenStorageService ,private SessionScolaireService: SessionScolaireService,private PdfgenerateService :PdfgenerateService) { }

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

 
    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
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
