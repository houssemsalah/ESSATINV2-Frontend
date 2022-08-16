import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    //window.sessionStorage.setItem('auth-user',"clear");
   localStorage.clear();
   location.replace('');

  }
  public saveToken(token: string): void {
    window.localStorage.removeItem('TOKEN_KEY');
    window.localStorage.setItem('TOKEN_KEY', token);
  }

  public getToken(): string {
    return <string> localStorage.getItem('TOKEN_KEY');
  }
  public saveTokenType(tokentype: string): void {
    window.localStorage.removeItem('TOKEN_TYPE');
    window.localStorage.setItem('TOKEN_TYPE', tokentype);
  }

  public getTokenType(): string {
    return <string> localStorage.getItem('TOKEN_TYPE');
  }

 

  public saveUsernom(user: any): void {
    window.localStorage.removeItem('USER_NOM');
    window.localStorage.setItem('USER_NOM', user);
  }

  public getUsernom(): any {
    return localStorage.getItem('USER_NOM') ;
  }
  public saveUserId(user: any): void {
    window.localStorage.removeItem('USER_ID');
    window.localStorage.setItem('USER_ID', user);
  }

  public getUserId(): any {
    return localStorage.getItem('USER_ID') ;
  }
  public saveUserprenom(user: any): void {
    window.localStorage.removeItem('USER_PRENOM');
    window.localStorage.setItem('USER_PRENOM', user);
  }

  public getUserprenom(): any {
    return localStorage.getItem('USER_PRENOM') ;
  }
  public saveUserrole(user: any): void {
    var monobjet_json = JSON.stringify(user);
    window.localStorage.setItem('USER_Role', monobjet_json);


   
  
  }

  public getUserrole(): any {
    return localStorage.getItem('USER_Role') ;
  }
}
