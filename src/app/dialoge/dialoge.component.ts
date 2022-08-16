import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-dialoge',
  templateUrl: './dialoge.component.html',
  styleUrls: ['./dialoge.component.css']
})
export class DialogeComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(private _snackBar: MatSnackBar,notifierService: NotifierService) {
    this.notifier = notifierService;

   }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnInit(): void {
    this.notifier.show({
      type: 'success',
      message: 'You are awesome! I mean it!',
      id: 'THAT_NOTIFICATION_ID', // Again, this is optional
    });
    this.notifier.notify('success', 'You are awesome! I mean it!');

  }
  change(cm:any){
    if(cm=="ROLE_FINANCIER"){
      window.location.replace('homeFina');
  
    }
    if(cm=="ROLE_EXAMEN"){
      window.location.replace('Etu');
  
    }
    if(cm=="ROLE_EXAMEN"){
      window.location.replace('homeEx');
  
    }
  } 

}
