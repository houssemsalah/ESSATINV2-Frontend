import { LoginService } from './../services/login.service';
import { RoleService } from './../services/role.service';
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
  get email(){
    return this.form.get('mail')
  }

  
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



 
  SuccessMessage: boolean = false;
 login: any;
 password: any; 
 nationalite: any;
 sexe: any;
 numeroIdentificateur: any;
 typeIdentificateur: any;
 lieuDeNaissance: any;
 dateDeNaissance: any;
 adresse: any;
 tel: any;
 mail: any; 
nom: any;
prenom:any;
role: any;

roles:any;

  compte={
    "login":"",
    "password":"",
    "nom":"",
    "prenom":"",
    "mail":"",
    "tel":"",
    "adresse":"",
    "dateDeNaissance":"",
    "lieuDeNaissance":"",
    "typeIdentificateur":0 ,
    "numeroIdentificateur":"",
    "sexe":"",
    "nationalite":"",
    "role": [""]
        }
 
  designation: string = '';
  numero: string = '';
 
 
  ControleNumID: boolean = false;
 
  emailrequired: boolean = false;
  emailinvalid:boolean = false;
   passwordrequired:boolean = false;
   loginrequired:boolean = false;
   nomrequired:boolean = false;
   prenomrequired:boolean = false;
  telrequired:boolean = false;
  adresserequired:boolean = false;
  dateDeNaissancerequired:boolean = false;
  dateDeNaissancereinvalid:boolean = false;
  lieuDeNaissancerequired:boolean = false;
  typeIdentificateurrequired:boolean = false;
  nationaliterequired:boolean = false;
  rolerequired:boolean = false;
  sexerequired:boolean = false;
  numeroIdentificateurrequired:boolean = false;
  numeroIdentificateurinvalid:boolean = false;
  closeResult = '';
  nomuser: any;
  prenomuser: any;
  
  
roleEtat=0;
  constructor(private toastr: ToastrService, private modalService: NgbModal, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private inscriservice: InscriService , private roleService: RoleService,private loginService:LoginService) {

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
    
    this.roleService.getallroles().subscribe(
      data => {
     
        this.roles = data;
      
      },
    );
  }
 
  logout() {
    this.tokenStorage.signOut();
  }
 
 

  form = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
    nom: new FormControl(),
    prenom: new FormControl(),
    mail: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
        updateOn: 'blur',
      }),
    tel: new FormControl(),
    adresse: new FormControl(),
    dateDeNaissance: new FormControl(),
    lieuDeNaissance: new FormControl(),
    typeIdentificateur: new FormControl(),
    numeroIdentificateur: new FormControl(),
    sexe: new FormControl(),
    nationalite: new FormControl(),
    role: new FormControl()
 });
/* errors(form:any,emailrequired:any ){
    if(form.mail===this.null1){this.open(emailrequired)}
  } */
   signup(form:any) {
    if(form.nom===this.null1){this.nomrequired=true}
    if(form.prenom===this.null1){this.prenomrequired=true}
    if(form.login===this.null1){this.loginrequired=true}
    if(form.password===this.null1){this.passwordrequired=true}
    if(form.lieuDeNaissance===this.null1){this.lieuDeNaissancerequired=true}
    if(form.dateDeNaissance===this.null1){this.dateDeNaissancerequired=true}
    if(form.adresse===this.null1){this.adresserequired=true}
    if(form.tel===this.null1){this.telrequired=true}
    if(form.numeroIdentificateur===this.null1){this.numeroIdentificateurrequired=true}
    if(form.typeIdentificateur===this.null1){this.typeIdentificateurrequired=true}
    if(form.sexe===this.null1){this.sexerequired=true}
    if(form.role===this.null1){this.rolerequired=true}
    if(form.nationalite===this.null1){this.nationaliterequired=true}
    if(form.mail===this.null1){this.emailrequired=true}
    if(!(form.mail.includes('@') && form.mail.includes('.'))){this.emailinvalid=true}
    if (form.numeroIdentificateur.length < 8) {this.numeroIdentificateurinvalid = true;}
    
    console.log("this.form ", form);
    this.compte={
      "login":form.login,
      "password":form.password,
      "nom":form.nom,
      "prenom":form.prenom,
      "mail":form.mail,
      "tel":form.tel,
      "adresse":form.adresse,
      "dateDeNaissance":form.dateDeNaissance,
      "lieuDeNaissance":form.lieuDeNaissance,
      "typeIdentificateur":form.typeIdentificateur ,
      "numeroIdentificateur":form.numeroIdentificateur,
      "sexe":form.sexe,
      "nationalite":form.nationalite,
      "role": [form.role]
          }
        
          console.log("this.compte ", this.compte)
    this.loginService.signup(this.compte).subscribe(
      data => {
        console.log(data)
        
          this.SuccessMessage= true,
          this.form.reset();
                
              
          })
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


