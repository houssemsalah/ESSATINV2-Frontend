import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FinanceService } from '../services/finance.service';

import { PdfgenerateService } from '../services/pdfgenerate.service';
@Component({
  selector: 'app-home-financier',
  templateUrl: './home-financier.component.html',
  styleUrls: ['./home-financier.component.css']
})
export class HomeFinancierComponent implements OnInit {
  sessionunivr: any;
  sessionunivrchek: any;
  id_session: any;
  etu: any;
  searchText: any;
  nom: any;
  prenom: any;
  long: number = 0;
  test: any;
  role:any;
roleEtat=0;
  constructor(private FinanceService: FinanceService, private tokenStorage: TokenStorageService, private SessionScolaireService: SessionScolaireService, private PdfgenerateService: PdfgenerateService) { }

  ngOnInit(): void {
    localStorage.removeItem("Etud")
    if (localStorage.length < 1) {
      window.location.replace('404');
    }
    this.role= JSON.parse(localStorage.getItem("USER_Role")!)
    console.log(this.role.length)
    if(this.role.length===1){
      if(this.role!="ROLE_FINANCIER"){
        window.location.replace('404');
      
              }
    }
    if(this.role.length!=1){

    for(var i in this.role){
      if(this.role[i]!="ROLE_FINANCIER"){
this.roleEtat=this.roleEtat+1;       
      }
  }
 
  if(this.roleEtat===this.role.length){

    window.location.replace('404');
  }}
    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
    this.SessionScolaireService.getsessionuniv().subscribe(
      data => {
        this.sessionunivr = data;
        this.sessionunivrchek = this.sessionunivr[this.sessionunivr.length - 1];
        this.id_session = this.sessionunivrchek.idSession
        this.FinanceService.getEtudientnonpayer(this.id_session).subscribe(
          data => {
            console.log(data)
            this.etu = data;
          },
          () => {
          }
        );
      },
      err => {
        console.log(err)
      }
    );
  }
  logout() {
    this.tokenStorage.signOut();
  }
  changessesion() {
    if (this.test) {
      this.SessionScolaireService.getetudss(this.id_session).subscribe(
        data => {
          this.etu = data;
        },
        () => {
        }
      );
    }
    if (!this.test) {
      this.FinanceService.getEtudientnonpayer(this.id_session).subscribe(
        data => {
          this.etu = data;
        },
        () => {
        }
      );
    }
  }
  // changer de liste d'etudient
  do() {
    if (this.test) {
      this.SessionScolaireService.getetudss(this.id_session).subscribe(
        data => {
          this.etu = data;
        },
        () => {
        }
      );
    }
    if (!this.test) {
      this.FinanceService.getEtudientnonpayer(this.id_session).subscribe(
        data => {
          this.etu = data;
        },
        () => {
        }
      );
    }
  }
  getEtu(cm:any){
    localStorage.setItem("Etud",JSON.stringify(cm))
    window.location.replace('FinDetEt');
  }
  getEtu2(cm:any){
    localStorage.setItem("Etud",JSON.stringify(cm))
  window.location.replace('PayerEtu');
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
