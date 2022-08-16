import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // tslint:disable-next-line:ban-types
  nom: String = '';
  roles: string= '';
 
  
  constructor(private Login: LoginService,private tokenStorage: TokenStorageService, private modalService: NgbModal) { }

  ngOnInit(): void {
 
    if (localStorage.length > 1) {
  // window.location.replace('404');

    }
  }
  onSubmit(content10:any): void {


    this.Login.login(this.form).subscribe(
      data => {
        console.log(data)

        this.tokenStorage.saveUserprenom(data.firstname);
        this.tokenStorage.saveUsernom(data.lastname);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveTokenType(data.type);
        this.tokenStorage.saveUserrole(data.role);
        this.tokenStorage.saveUserId(data.id);
        for(var i in data.role){
        if(data.role[i]=="ROLE_EXAMEN"){
         window.location.replace('homeEx')
        }
        if(data.role[i]=="ROLE_SCOLARITE"){
         window.location.replace('Etu')
         

        }
        if(data.role[i]=="ROLE_FINANCIER"){
          window.location.replace('homeFina')

         }
      }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
       //window.location.replace('Etu');

       
     
      },
      err => {
        this.modalService.open(content10, { windowClass: 'dark-modal' });

      
      }
    );
  }

}
