import { Component, OnInit } from '@angular/core';
import { InscriService } from '../services/inscri.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModifierService } from '../services/modifier.service';
import { PdfgenerateService } from '../services/pdfgenerate.service';

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
  constructor(private tokenStorage: TokenStorageService,private PdfgenerateService: PdfgenerateService, private inscriservice: InscriService,private modalService: NgbModal,private modifierservice: ModifierService) { }

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
    this.class.splice(0)

    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
    this.inscriservice.GetallNiveaux().subscribe(data=>{
      for(const i in data){
        this.class.push({ idNiveau: data[i].idNiveau, Niveau: data[i].designation , Parcours:data[i].parcours.designation,Specialite:data[i].parcours.specialite.designation, Cycle:data[i].parcours.specialite.cycle.description});
      }console.log(this.class)

    })

  }
  fichedepresnce(cm:any){
    console.log(cm.idNiveau)
    this.PdfgenerateService.getPdffichedepresnce(cm.idNiveau).subscribe(
      (pdf:any)=>{
        const blob = new Blob([pdf], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL);

    })
    console.log(this.test)

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

