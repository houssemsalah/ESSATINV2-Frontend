import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { InscriService } from '../services/inscri.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-creer-compte',
  templateUrl: './creer-compte.component.html',
  styleUrls: ['./creer-compte.component.css']
})
export class CreerCompteComponent implements OnInit {

idEtu:number=0;
  idPersonne:any;
  contact: any;
  nationalite: any;
  identificateur: any;
  Cycle: any;
  Specialite: any;
  Parcours: any;
  niveaux: any;
  diplome: any;
  test: String = "";

  test1: String = "";
  null1!:String;
  null: String = "";
  idCycle: string = '';
  idSpecialite: string = '';
  idParcours: string = '';
  idNiveau: string = '';



  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  form: any = {};
  designation: string = '';
  numero: string = '';
  nom: string = '';
  contactEtudiantList = [
    { idContactEtudient: 0, designation: "", nom: "", numero: "" },

  ];
  ControleNumID: boolean = false;

  idDiplome1= 0;
  nomDiplome: string = '';
  annee: string = '';
  specialite: string = '';
  niveau: string = '';
  status: string = '';
  etablissement: string = '';
  diplomeEtudiantList = [
    { 
      idDiplome: {}, annee: "", specialite: "",
      niveau: "", status: "", etablissement: "", nomDiplome: "",idDiplomeType:0
    },

  ];
  closeResult = '';
  nomuser: any;
  prenomuser: any;
  idDiplome: string='';
  role:any;
roleEtat=0;
  constructor(private toastr: ToastrService, private modalService: NgbModal, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private inscriservice: InscriService) {

  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }


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
    this.nomuser = this.tokenStorage.getUsernom();
    this.prenomuser = this.tokenStorage.getUserprenom();
    this.contactEtudiantList.splice(0);
    this.diplomeEtudiantList.splice(0);
    this.firstFormGroup = this.formBuilder.group({
      firstName: new FormControl(
        {
          ididentif: ['', Validators.required, Validators.minLength(6)]
        }
      ),
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.inscriservice.GETNationalite().subscribe(
      data => {
        this.nationalite = data;
      }
    );
    this.inscriservice.GETTypeidentificateur().subscribe(
      data => {
        this.identificateur = data;
      }
    );
    this.inscriservice.GETCycle().subscribe(
      data => {
        this.Cycle = data;
      }
    );
    this.inscriservice.GETDiplome().subscribe(
      data => {
        console.log(data)
        this.diplome = data.body;
       
      },
    );

  }
  logout() {
    this.tokenStorage.signOut();
  }
  show(content10:any,content11:any) {
    console.log(this.idNiveau)
    if(this.idNiveau !=''&& this.diplomeEtudiantList.length !=0){
    this.form.contactEtudiantList = this.contactEtudiantList
    this.form.diplomeEtudiantList = this.diplomeEtudiantList
    this.form.niveauxInscrit = this.idNiveau;
  if(this.idEtu===0){
    this.inscriservice.inscri(this.form)
      .subscribe(
        data => {
          data;
          this.open(content10)
          this.form=[];
          this.contactEtudiantList=[]
          this.diplomeEtudiantList=[]
          window.location.replace('Etud');
      
          // console.log(data)
        }, err => {

          this.open(content11)
    
    
        
        }
      );
    }else{
      console.log(this.idNiveau,this.idEtu,this.form)
      this.form.contactEtudiantList = this.contactEtudiantList
      this.form.diplomeEtudiantList = this.diplomeEtudiantList
      this.inscriservice.InscriancienEtud(this.idNiveau,this.idPersonne,this.form).subscribe(data=>{
        console.log(data)
        this.open(content10)
        this.form=[];
        this.contactEtudiantList=[]
        this.diplomeEtudiantList=[]
      }, err => {

        this.open(content11)
  
  
      
      })
    }
  }if(this.idNiveau ===''|| this.diplomeEtudiantList.length ===0){
    console.log(this.contactEtudiantList.length,this.diplomeEtudiantList.length ,this.form.length)
    this.open(content11)

  }
  }
  addcontactEtudiantList(content1:any,content7:any) {
    
    
    this.open(content1)
    this.contactEtudiantList.push({
      
      idContactEtudient:
       0, designation: this.designation, nom: this.nom, numero: this.numero
    });
    this.designation=''
    this.nom=''
    this.numero=''
    console.log(this.contactEtudiantList)
  
  }
  addcontactEtudiantListnext(content1:any,content7:any) {
    
    
    this.open(content1)
    this.contactEtudiantList.push({
      
      idContactEtudient:
       0, designation: this.designation, nom: this.nom, numero: this.numero
    });
    this.designation=''
    this.nom=''
    this.numero=''
    console.log(this.contactEtudiantList)
  
  }
  getSpecialite() {
   this.inscriservice.GETSpecialite(this.idCycle).subscribe(
      data => {
        this.Specialite = data;
      }
    );
    this.idSpecialite = ""
    this.idParcours = "";
    this.idNiveau = "";
  }
  getParcours() {
    this.inscriservice.GETParcours(this.idSpecialite).subscribe(
      data => {
        this.Parcours = data;
      }
    );
    this.idParcours = "";
    this.idNiveau = "";
  }
  getNiveau() {
    this.inscriservice.GETNiveaux(this.idParcours).subscribe(
      data => {
        console.log(data)
        this.niveaux = data;
      }
    );
  }
  AddDiplome(content6:any) {
  
    var Diplome0 = { idDiplome: 0 }
    Diplome0.idDiplome = this.idDiplome1;
    this.nomDiplome = this.diplome[this.idDiplome1-2].nomDiplome!
    //console.log(this.idDiplome1,this.nomDiplome )
    this.diplomeEtudiantList.push({
     
      idDiplome: Diplome0,
       annee: this.annee, specialite: this.specialite, niveau: this.niveau,
      status: this.status, etablissement: this.etablissement,
       nomDiplome: this.nomDiplome
      ,idDiplomeType:0
    });
    console.log(this.diplomeEtudiantList)
    this.annee = ''
    this.specialite = ''
    this.niveau = ''
    this.status = ''
    this.etablissement = ''
    this.idDiplome1 = 0
  
  }
  AddDiplomenex(content6:any){
    console.log(this.diplomeEtudiantList.length)
    
    var Diplome0 = { idDiplome: 0 }
    Diplome0.idDiplome = this.idDiplome1;
    this.nomDiplome = this.diplome[this.idDiplome1-2].nomDiplome!
    //console.log(this.idDiplome1,this.nomDiplome )
    this.diplomeEtudiantList.push({
     
      idDiplome: Diplome0,
       annee: this.annee, specialite: this.specialite, niveau: this.niveau,
      status: this.status, etablissement: this.etablissement,
       nomDiplome: this.nomDiplome
      ,idDiplomeType:0
    });
    console.log(this.diplomeEtudiantList)
    this.annee = ''
    this.specialite = ''
    this.niveau = ''
    this.status = ''
    this.etablissement = ''
    this.idDiplome1 = 0
  
  }

  getetu(content: any,content23:any) {
    
    this.ControleNumID = false;
    if (this.form.ididentif.length < 8) {
      this.ControleNumID = true;

    }
    this.inscriservice.GETEtudient(this.form.ididentif).subscribe(
      data => {
        console.log(data)
        if (data.status === 200) {
          this.open(content)
          this.idPersonne=data.body[0].idPersonne.idPersonne
          this.idEtu=data.body[0].idEtudiant
          this.form.nom = data.body[0].idPersonne.nom
          this.form.prenom = data.body[0].idPersonne.prenom
          this.form.mail = data.body[0].idPersonne.mail
          this.form.dateNaissance = data.body[0].idPersonne.dateDeNaissance
          this.form.telephonne = data.body[0].idPersonne.tel
          this.form.adresse = data.body[0].idPersonne.adresse
          this.form.lieuNaissance = data.body[0].idPersonne.lieuDeNaissance
          this.form.sexe = data.body[0].idPersonne.sexe
          this.form.nationalite = data.body[0].idPersonne.idNationalite.id_Nationalite
          this.inscriservice.Etudestdejainscri(data.body[0].idPersonne.idPersonne).subscribe(
            async data=>{
            console.log(data)
            if(data.body.message.code===1){
              this.open(content23)
              await this.delay(1000);
              location.reload();

            }
          })
          this.inscriservice.GETAncienDiplome(data.body[0].idEtudiant).subscribe(
            data => {
              if(data.code!=204){
              for (const i in data) {
                this.diplomeEtudiantList.push({
                 idDiplomeType:data[i].idDiplome.idDiplome, idDiplome: data[i].idDiplomeEtudiant, annee: data[i].annee, specialite: data[i].specialite, niveau: data[i].niveau,
                  status: data[i].status, etablissement: data[i].etablissement, nomDiplome: data[i].idDiplome.nomDiplome
                });
              }
            }
            }
          );
            this.inscriservice.GETContactetudiant(data.body[0].idEtudiant).subscribe(
              data=> {
                console.log(data)
                if(data.code!=204){
                for (const i in data){
                  this.contactEtudiantList.push({
                    idContactEtudient:
                    data[i].idContact, designation:  data[i].designation, nom:  data[i].nom, numero:  data[i].numero
                    
                  })
                }
              }
              console.log(this.contactEtudiantList)

            }
            );
          this.test1 = "aefezl";
        } else {
          console.log("data")
        }
     }
    );
  }
  modifierContact(cm:any,content4:any){
    this.open(content4)
    this.designation=cm.designation
    this.nom=cm.nom
    this.numero=cm.numero
  }
  modifierContactEtudient(cm:any){
    if(cm.idContactEtudient!=0){
      this.inscriservice.ModifierContactetudiant(cm.idContactEtudient,this.numero,this.nom,this.designation).subscribe(
        data=> {console.log(data)});
    }
    this.contactEtudiantList.splice(this.contactEtudiantList.indexOf(cm), 1,{idContactEtudient:
    cm.idContactEtudient, designation: this.designation, nom:  this.nom, numero: this.numero})
  }
  supprimerContactParent(cm:any){
    if(confirm("Vouler vous Supprimer")){
        this.contactEtudiantList.splice(this.contactEtudiantList.indexOf(cm),1);
        if(cm.idContactEtudient!=0)
        {
          this.inscriservice.SuprimmerContactetudiant(cm.idContactEtudient).subscribe(
            data=> {console.log(data)});
          }
    }  }
    
  modifierDiplomeEtudients(content:any,item:any){
   
    this.annee = item.annee
    this.specialite = item.specialite
    this.niveau =item.niveau
    this.status = item.status
    this.etablissement = item.etablissement
    this.idDiplome1 = item.idDiplomeType
    this.open(content);
    console.log(item);
  }
  supprimerDiplomeEtudients(content:any,item5:any){
    if(confirm("Vouler vous Supprimer")){
    this.open(content)
    this.diplomeEtudiantList.splice(this.contactEtudiantList.indexOf(item5),1);
    if(item5.idDiplomeType!=0  ){
      console.log(item5.idDiplome)
      this.inscriservice.SupprimerAncienDiplome(item5.idDiplome).subscribe(
        data=> {console.log(data)});
    }
  }
  }
  modifierdiplome(item:any){
    if(item.idDiplomeType!=0 )
    {
    this.inscriservice.ModifierAncienDiplome(item.idDiplome,this.idDiplome1,this.annee,this.specialite,this.niveau,this.status,this.etablissement).subscribe(
      data=> {console.log(data)});
      this.diplomeEtudiantList.splice(this.contactEtudiantList.indexOf(item), 1, {
        idDiplomeType : item.idDiplomeType, idDiplome: item.idDiplome, annee: this.annee, specialite: this.specialite, niveau: this.niveau,
        status: this.status, etablissement: this.etablissement, nomDiplome: item.nomDiplome
      })
    }else{
      var Diplome0 = { idDiplome: 0 }
      Diplome0.idDiplome = this.idDiplome1;
      this.diplomeEtudiantList.splice(this.contactEtudiantList.indexOf(item), 1, {
        idDiplomeType : item.idDiplomeType, idDiplome: Diplome0, annee: this.annee, specialite: this.specialite, niveau: this.niveau,
        status: this.status, etablissement: this.etablissement, nomDiplome: this.diplome[this.idDiplome1-2].nomDiplome
      })
    }
  }
  enregistrediplome(){
    console.log(this.idEtu,this.idDiplome1,this.annee,this.specialite ,this.niveau,this.status,this.etablissement)

    this.inscriservice.AjouterAncienDiplome(this.idEtu,this.idDiplome1,this.annee,this.specialite ,this.niveau,this.status,this.etablissement).subscribe(
      data=> {console.log(data)});
      this.modalService.dismissAll
  }
  enregistrecontact(){
    this.inscriservice.AjouterContactetudiant(this.idEtu,this.numero,this.nom,this.designation).subscribe(
      data=> {
        this.contactEtudiantList.push({
          idContactEtudient:
          data.donneeSupplementaire.idContact, designation:  this.designation, nom:  this.nom , numero: this.numero
          
        })
        console.log(data)});
        console.log(this.contactEtudiantList)
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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


