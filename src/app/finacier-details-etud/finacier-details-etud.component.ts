import { Component, OnInit } from '@angular/core';
import { SessionScolaireService } from '../services/session-scolaire.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FinanceService } from '../services/finance.service';
import { EnumService } from '../services/enum.service';
import { PdfgenerateService } from '../services/pdfgenerate.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-finacier-details-etud',
  templateUrl: './finacier-details-etud.component.html',
  styleUrls: ['./finacier-details-etud.component.css']
})
export class FinacierDetailsEtudComponent implements OnInit {
  h="tt";
  h1="tt";
  k:any;
  annuler:any;
  SessionImpayer = [
    { id: "", session: "",etu : [] },
  ];
  ses:any;
  messagePayer="";
  test: any;
  text: any;
  message: any;
  test1: any;
  CHEQUE = "chèque";
  Complete = "Complete";
  Canceled = "Canceled";
  Rejected = "Rejected";
  typeModalite: any;
  status: any;
  class:String="";
  etudient: any;
  nom: any;
  prenom: any;
  role: any;
  form: any = {};
  roleEtat = 0;
  idEtu: any;
  idpersonne: any;
  Etudnationalite: any;
  Etudidentificateur: any;
  idEnregitrement: any;
  payment: any;
  restApayer: any;
  paymentPourcentage: any;
  Pourcentage: any;
  transaction = [
    { id: "", date: "", montant: 0, session: "", nbrmodalite: "", financier: "" },
  ];
  type1: string = ''
  status1: string = ''
  modalite = [
    { id: "", date: "", montant: 0, numero: 0, status: "", type: "" },
  ];
  message1: any;
  dateNeauMo: string = "";
  montantNeauMo: number | undefined;
  numeroNeauMo: number | undefined;
  statusNeauMo: string = "";
  typeNeauMo: string = "";
  CHEQUE1 = "CHEQUE";
  VIREMENT = "VIREMENT_BANCAIRE"
  modaliteNeauMo = [
    { date: "", montant: 0, numero: 0, status: "", type: "" },
  ];
  closeResult: string = '';
  Payment:any;
  AdesImpayer=false;
  constructor(private PdfgenerateService :PdfgenerateService,private modalService: NgbModal, private EnumService: EnumService, private FinanceService: FinanceService, private tokenStorage: TokenStorageService, private SessionScolaireService: SessionScolaireService) { }

  ngOnInit(): void {
    this.transaction.splice(0);
    this.modalite.splice(0);
    this.modaliteNeauMo.splice(0);
    this.statusNeauMo="COMPLETE"


 /*    this.role = JSON.parse(localStorage.getItem("USER_Role")!)
    if (this.role.length === 1) {
      if (this.role != "ROLE_FINANCIER") {
        window.location.replace('404');

      }
    } */
    if (this.role.length != 1) {

      for (var i in this.role) {
        if (this.role[i] != "ROLE_FINANCIER") {
          this.roleEtat = this.roleEtat + 1;
        }
      }
      if (localStorage.length < 1) {
        window.location.replace('404');
      }
      if (this.roleEtat === this.role.length) {

        window.location.replace('404');
      }
    }

    this.nom = this.tokenStorage.getUsernom();
    this.prenom = this.tokenStorage.getUserprenom();
    if (localStorage.getItem("Etud")) {
      this.idEnregitrement = JSON.parse(localStorage.getItem("Etud")!).idEnregistrement
      this.idEtu = JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idEtudiant
      this.etudient = JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idPersonne;
this.class=JSON.parse(localStorage.getItem("Etud")!).idNiveau.parcours.specialite.cycle.description+" "+JSON.parse(localStorage.getItem("Etud")!).idNiveau.parcours.designation+" "+JSON.parse(localStorage.getItem("Etud")!).idNiveau.designation

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
          this.restApayer = data!;
          this.payment = this.restApayer.valeur
        },
        err => {
          console.log(err)
        }
      );
      this.FinanceService.AdesImpayee(this.idEnregitrement).subscribe(
        data => {
          this.Payment=data
  this.AdesImpayer=this.Payment.valeur;
  if(this.AdesImpayer){  
    this.FinanceService.lesImpayer(this.idEnregitrement).subscribe(
      data => {
        console.log(data)

         this.ses =data ;
         for (const i in this.ses) {
         
          this.SessionImpayer.push({ id: this.ses[i].idEnregistrement, session: this.ses[i].idSession.session,etu:this.ses[i] });
         
        }
        console.log(data)
      })     
      console.log(this.AdesImpayer)
  }

        },
        err => {
          console.log(err)
        }
      );
      this.FinanceService.getRestaPayerEnPourcentage(this.idEnregitrement).subscribe(
        data => {
          this.paymentPourcentage = data
          this.Pourcentage = this.paymentPourcentage.valeur.toFixed(2)
        },
        err => {
          console.log(err)
        }
      );
    }

    this.FinanceService.getDetaillePayment(this.idEnregitrement).subscribe(
      data => {
        console.log(data)   
        this.test = data
        var somme = 0;
        var totale = "";
        for (const i in this.test) {
          for (const j in this.test[i].modaliteTransactionList) {
            //console.log(this.test[i].modaliteTransactionList[j].montant)
            somme = somme + this.test[i].modaliteTransactionList[j].montant;
            totale = totale + "+" + this.test[i].modaliteTransactionList[j].type;

          }
          totale = totale.substring(1)
          this.transaction.push({ id: this.test[i].id, date: this.test[i].datePayement, montant: somme, session: this.test[i].session.session, nbrmodalite: totale, financier: this.test[i].financier.personne.nom + " " + this.test[i].financier.personne.prenom });
          totale = "";
          somme=0;
        }



      },
      err => {
        console.log(err)
      }
    );
    this.EnumService.gettypeTransactions().subscribe(
      data2 => {
        this.typeModalite = data2
      }
    )
    this.EnumService.getStatusTransactions().subscribe(
      data2 => {
        this.status = data2;
      }
    )


  }
  logout() {
    this.tokenStorage.signOut();

  }
  plusdinfo(content: any, cm: any) {
    this.modalService.open(content, { size: 'lg',centered: true }).result.then((result) => {
    }, (reason) => {
    });
    this.modalite.splice(0, this.modalite.length)
    this.FinanceService.getDetailleTransaction(cm.id).subscribe(
      data => {
        this.test1 = data
        for (var i in this.test1) {
          for (const j in this.typeModalite) {
            if (this.test1[i].type === this.typeModalite[j].name) {
              this.type1 = this.typeModalite[j].value;
              break;
            }
          }
          for (const j in this.status) {
            if (this.test1[i].status === this.status[j].name) {
              this.status1 = this.status[j].value;
              break;
            }
          }
          this.modalite.push({ id: this.test1[i].id, date: this.test1[i].date, montant: this.test1[i].montant, numero: this.test1[i].numero, status: this.status1, type: this.type1 });

        }
      },
      err => {
        console.log(err)
      }
    );

    console.log(this.modalite)
    // 

  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
  }
  change(cm: any) {
    if (cm == "ROLE_FINANCIER") {
      window.location.replace('homeFina');

    }
    if (cm == "ROLE_SCOLARITE") {
      window.location.replace('Etu');

    }
    if (cm == "ROLE_EXAMEN") {
      window.location.replace('homeEx');

    }
  }
 
  statu(content1: any) {
    this.modalService.open(content1, { size: 'md' ,centered: true }).result.then((result) => {
    }, (reason) => {
    });


  }
  myFunction() {
    var x = document.getElementById("Demo")!;
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  test1ss(cm: any) {
    console.log(cm)

  }
  AnulerModaliter(cm: any, content11: any) {
  
        this.modalService.open(content11, { size: 'md' ,centered: true }).result.then((result) => {
        }, (reason) => {
        });
     
  }
  ValiderCheque(cm: any, content1: any, content2: any) {
    if (confirm("etes vous sure")) {
      this.FinanceService.ValidierChechque(cm.id).subscribe(data => {
        console.log(data)
        this.message1 = data
        this.message = this.message1.message
        this.modalService.open(content1, { size: 'md' }).result.then((result) => {
        }, (reason) => {
        });
      }
        ,
        err => {
          console.log(err)
          this.message = err.error.message
          this.modalService.open(content2, { size: 'md' }).result.then((result) => {
          }, (reason) => {
          });

        }
      )
      this.modalite.splice(this.modalite.indexOf(cm), 1, { id: cm.id, date: cm.date, montant: cm.montant, numero: cm.numero, status: "Complete", type: cm.type })
    }
  }
  RejeterCheque(content1: any) {
    this.open(content1)

    //this.modalite.splice(this.modalite.indexOf(cm), 1, { id : cm.id , date: cm.date,  montant:cm.montant , numero: cm.numero, status :"Rejected", type:cm.type})
  }
  Rejetr(cm: any) {
    console.log(cm.id, localStorage.getItem("USER_ID"), this.text)

    this.FinanceService.AnnulerModaliter(cm.id, localStorage.getItem("USER_ID"), this.text).subscribe(data => {
      console.log(data)
      this.modalite.splice(this.modalite.indexOf(cm), 1, { id: cm.id, date: cm.date, montant: cm.montant, numero: cm.numero, status: "Canceled", type: cm.type })

    },
      err => {
        console.log(err)
      }
    )
    this.modalService.dismissAll()
  }
  detailsCancel(cm:any,content3: any) {
    this.modalService.open(content3, { size: 'md' }).result.then((result) => {
    }, (reason) => {
    });
    this.FinanceService.getDetailsAnulatio(cm.id).subscribe(data => {
     
     this.annuler=data!
      console.log(data)
    },
      err => {
        console.log(err)
      }
    )
  }
  payer(content12: any) {
   
    this.modalService.open(content12, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
  }
  ajouterModal() {

    if(this.typeNeauMo.length!=0 && this.montantNeauMo!=0){
    this.modaliteNeauMo.push({ date: this.dateNeauMo, montant: this.montantNeauMo!, numero: this.numeroNeauMo!, status: this.statusNeauMo, type: this.typeNeauMo });
    console.log(this.modaliteNeauMo)
    this.typeNeauMo="";
     this.montantNeauMo=undefined;
   this.dateNeauMo="";
    this.numeroNeauMo=undefined;
    }
  }
  Payer(content:any,content1:any){
    if(this.typeNeauMo.length!=0 && this.montantNeauMo!=0){
    
      this.modaliteNeauMo.push({ date: this.dateNeauMo, montant: this.montantNeauMo!, numero: this.numeroNeauMo!, status: this.statusNeauMo, type: this.typeNeauMo });
    }
    if(this.modaliteNeauMo.length!=0){
      this.FinanceService.Payer(this.idEnregitrement, this.modaliteNeauMo,localStorage.getItem("USER_ID") ).subscribe(
        data => {
          this.k=data
        console.log(data)
        this.messagePayer=this.k.message;
        this.modalService.dismissAll()
        this.modalService.open(content, { size: 'md' }).result.then((result) => {
        }, (reason) => {
        });
        this.modaliteNeauMo=[];
        this.transaction=[];
        this.FinanceService.getDetaillePayment(this.idEnregitrement).subscribe(
          data => {
           
            this.test = data
            var somme = 0;
            var totale = "";
            for (const i in this.test) {
              for (const j in this.test[i].modaliteTransactionList) {
                //console.log(this.test[i].modaliteTransactionList[j].montant)
                somme = somme + this.test[i].modaliteTransactionList[j].montant;
                totale = totale + "+" + this.test[i].modaliteTransactionList[j].type;
    
              }
              totale = totale.substring(1)
              this.transaction.push({ id: this.test[i].id, date: this.test[i].datePayement, montant: somme, session: this.test[i].session.session, nbrmodalite: totale, financier: this.test[i].financier.personne.nom + " " + this.test[i].financier.personne.prenom });
              totale = "";
              somme=0;
            }
    
    
    
          },
          err => {
            console.log(err)
          }
        );
        this.FinanceService.getRestaPayer(this.idEnregitrement).subscribe(
          data => {
            this.restApayer = data!;
            this.payment = this.restApayer.valeur
          },
          err => {
            console.log(err)
          }
        );
        this.FinanceService.getRestaPayerEnPourcentage(this.idEnregitrement).subscribe(
          data => {
            this.paymentPourcentage = data
            this.Pourcentage = this.paymentPourcentage.valeur.toFixed(2)
          },
          err => {
            console.log(err)
          }
        );
      },
        err => {
          console.log(err.error.message)
          this.modalService.open(content1, { size: 'md' }).result.then((result) => {
          }, (reason) => {
          });
          this.messagePayer=err.error.message
        }
      )
  
 }
  
}
obtenirRecu(cm:any){
  console.log(cm)
 
  this.PdfgenerateService.getPdfrecuPayment(cm.id).subscribe( (pdf:any)=>{
    const blob = new Blob([pdf], { type: 'application/pdf' })
    var fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
 
})

}
DechargeEtudient(cm:any,content:any){
  this.modalService.open(content, { size: 'sm' }).result.then((result) => {
  }, (reason) => {
  });
}
DechargeEtudient1(cm:any){
  this.PdfgenerateService.getPDFdechargeEtudient(cm.id,1).subscribe( (pdf:any)=>{
    const blob = new Blob([pdf], { type: 'application/pdf' })
    var fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
 
})
}
DechargeEtudient2(cm:any){
  this.PdfgenerateService.getPDFdechargeEtudient(cm.id,0).subscribe( (pdf:any)=>{
    const blob = new Blob([pdf], { type: 'application/pdf' })
    var fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
 
})
}
DechargeFinancier(cm:any,content24:any){
  this.modalService.open(content24, { size: 'sm' }).result.then((result) => {
  }, (reason) => {
  });
 


}
DechargeFinancier1(cm:any){
  this.PdfgenerateService.getPDFdechargeFinancier(cm.id,1).subscribe( (pdf:any)=>{
    const blob = new Blob([pdf], { type: 'application/pdf' })
    var fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
 
})
}
DechargeFinancier2(cm:any){
  this.PdfgenerateService.getPDFdechargeFinancier(cm.id,0).subscribe( (pdf:any)=>{
    const blob = new Blob([pdf], { type: 'application/pdf' })
    var fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
 
})
}
modifierPay(cm:any,content26:any){
  this.modalService.open(content26, { size: 'lg' }).result.then((result) => {
  }, (reason) => {
  });
  console.log(cm)


  this.dateNeauMo=cm.date
  this.montantNeauMo=cm.montant
  this.numeroNeauMo=cm.numero
  this.statusNeauMo=cm.status
  this.typeNeauMo=cm.type

 // this.modaliteNeauMo.splice(this.modaliteNeauMo.indexOf(cm), 1,
  //{ date: this.dateNeauMo, montant: this.montantNeauMo!, numero: this.numeroNeauMo!, status: this.statusNeauMo, type: this.typeNeauMo });
}
supprimerPay(item5:any){
  this.modaliteNeauMo.splice(this.modaliteNeauMo.indexOf(item5), 1);
}
nouvellesession(item:any){
  
  localStorage.setItem("Etud",JSON.stringify(item.etu))
  window.location.replace('FinDetEt');
  console.log(item)
}
}
