
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { MdpoblierComponent } from './mdpoblier/mdpoblier.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ChecklistModule } from 'angular-checklist';

import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { DialogeComponent } from './dialoge/dialoge.component';
import { ToastrModule } from 'ngx-toastr';
import { NotifierModule } from 'angular-notifier';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DetailleEtudianteComponent } from './detaille-etudiante/detaille-etudiante.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { FicherComponent } from './ficher/ficher.component';
import { HomeExamComponent } from './home-exam/home-exam.component';
import { FeuilleDeNotesComponent } from './feuille-de-notes/feuille-de-notes.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeFinancierComponent } from './home-financier/home-financier.component';
import { FeuilleDeEmergComponent } from './feuille-de-emerg/feuille-de-emerg.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FinacierDetailsEtudComponent } from './finacier-details-etud/finacier-details-etud.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PayeEtuFinaComponent } from './paye-etu-fina/paye-etu-fina.component';
import { ListeDesClassesComponent } from './liste-des-classes/liste-des-classes.component';
import { EtudiantsParClassComponent } from './etudiants-par-class/etudiants-par-class.component';
import { ListeDesMatieresComponent } from './liste-des-matieres/liste-des-matieres.component';
import { AjoutMatiereComponent } from './ajout-matiere/ajout-matiere.component';
import { AjoutNoteComponent } from './ajout-note/ajout-note.component';
import { ComptesComponent } from './comptes/comptes.component';
import { CreerCompteComponent } from './creer-compte/creer-compte.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantComponent,
    MdpoblierComponent,
    InscriptionComponent,

    DialogeComponent,
    DetailleEtudianteComponent,
    EnregistrementComponent,
    FicherComponent,
    HomeExamComponent,
    FeuilleDeNotesComponent,
    HomeFinancierComponent,
    FeuilleDeEmergComponent,
    FinacierDetailsEtudComponent,
    NotFoundComponent,
    PayeEtuFinaComponent,
    ListeDesClassesComponent,
    EtudiantsParClassComponent,
    ListeDesMatieresComponent,
    AjoutMatiereComponent,
    AjoutNoteComponent,
    ComptesComponent,
    CreerCompteComponent,
    DashbordComponent,
    FooterComponent
    
  ],  
  imports: [
    BrowserModule,
    [NotifierModule],
    AppRoutingModule,
    FormsModule,
        ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatStepperModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    ChecklistModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NotifierModule,
    
    
    
    

    



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
