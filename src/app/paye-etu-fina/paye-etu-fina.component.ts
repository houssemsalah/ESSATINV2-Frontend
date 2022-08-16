import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FinanceService } from '../services/finance.service';
import { EnumService } from '../services/enum.service';

import { PdfgenerateService } from '../services/pdfgenerate.service';
@Component({
  selector: 'app-paye-etu-fina',
  templateUrl: './paye-etu-fina.component.html',
  styleUrls: ['./paye-etu-fina.component.css']
})
export class PayeEtuFinaComponent implements OnInit {
  role:any;
  roleEtat=0;
  nom:any;
  prenom:any;
  idEnregitrement:any;
  form: any = {};
  etudient: any;
  idEtu: any;
  idpersonne: any;
  Etudnationalite: any;
  Etudidentificateur: any;
  restApayer: any;
  payment: any;
  paymentPourcentage: any;
  Pourcentage: any;
  typeModalite: any;
  date :string="";
  montant :number| undefined;
  numero :number| undefined;
  status :string="";
  type :string="";
  CHEQUE="CHEQUE";
  VIREMENT="VIREMENT_BANCAIRE"
  modalite= [
    { date: "", montant: 0 ,numero: 0,status:"",type:""},
  ];
  constructor(private FinanceService: FinanceService, private tokenStorage: TokenStorageService,private EnumService: EnumService) { }

  ngOnInit(): void {
    if (localStorage.length < 1) {
      window.location.replace('404');
    }
    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
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
  this.EnumService.gettypeTransactions().subscribe(
    data2 => {
      console.log(data2)
      this.typeModalite=data2   
    }
  )

  if (localStorage.getItem("Etud")){
    this.idEnregitrement= JSON.parse(localStorage.getItem("Etud")!).idEnregistrement
    this.idEtu = JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idEtudiant
    this.etudient = JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idPersonne;
    this.idpersonne = this.etudient.idPersonne
    this.form.nom = this.etudient.nom
    this.form.prenom = this.etudient.prenom
    this.form.email = this.etudient.mail
    this.form.adresse = this.etudient.adresse
    this.form.tel = this.etudient.tel
    this.form.dn = this.etudient.dateDeNaissance
    this.form.ln = this.etudient.lieuDeNaissance
    this.form.numid = this.etudient.numeroIdentificateur
    this.form.sexe = this.etudient.sexe
    this.Etudnationalite = this.etudient.idNationalite.libelle
    this.form.nationalite = this.etudient.idNationalite.id_Nationalite
    this.Etudidentificateur = this.etudient.idIdentificateur.typeIdentificateur
    this.form.identificateur = this.etudient.idIdentificateur.idTypeidentificateur
    this.FinanceService.getRestaPayer(this.idEnregitrement).subscribe(
      data => {
        this.restApayer=data!;
        this.payment=this.restApayer.valeur
      },
      err => {
        console.log(err)
      }
    );
    this.FinanceService.getRestaPayerEnPourcentage(this.idEnregitrement).subscribe(
      data => {
        this.paymentPourcentage=data
        this.Pourcentage= this.paymentPourcentage.valeur.toFixed(2)
      },
      err => {
        console.log(err)
      }
    );
  }
  }
  logout() {
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
  test(){
    console.log(this.montant,this.type,this.status ,this.numero ,this.date)
  }

}
