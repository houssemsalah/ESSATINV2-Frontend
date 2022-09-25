import { ModifierMatiereComponent } from './modifier-matiere/modifier-matiere.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CreerCompteComponent } from './creer-compte/creer-compte.component';
import { ComptesComponent } from './comptes/comptes.component';
import { AjoutNoteComponent } from './ajout-note/ajout-note.component';
import { AjoutMatiereComponent } from './ajout-matiere/ajout-matiere.component';
import { ListeDesMatieresComponent } from './liste-des-matieres/liste-des-matieres.component';
import { EtudiantsParClassComponent } from './etudiants-par-class/etudiants-par-class.component';
import { ListeDesClassesComponent } from './liste-des-classes/liste-des-classes.component';



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailleEtudianteComponent } from './detaille-etudiante/detaille-etudiante.component';
import { DialogeComponent } from './dialoge/dialoge.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { FeuilleDeEmergComponent } from './feuille-de-emerg/feuille-de-emerg.component';
import { FeuilleDeNotesComponent } from './feuille-de-notes/feuille-de-notes.component';
import { FicherComponent } from './ficher/ficher.component';
import { FinacierDetailsEtudComponent } from './finacier-details-etud/finacier-details-etud.component';
import { HomeExamComponent } from './home-exam/home-exam.component';
import { HomeFinancierComponent } from './home-financier/home-financier.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { MdpoblierComponent } from './mdpoblier/mdpoblier.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PayeEtuFinaComponent } from './paye-etu-fina/paye-etu-fina.component';

const routes: Routes = [
  {path: '', component: LoginComponent},



  {path: 'dashbord', component: DashbordComponent,children: [
    {path: 'listeDesClasses', component: ListeDesClassesComponent},
 {path: 'matieresParClass', component: ListeDesMatieresComponent},
 {path: 'ajoutMatiere', component: AjoutMatiereComponent},
 {path: 'modifierMatiere', component: ModifierMatiereComponent},
 {path: 'ajoutNote', component: AjoutNoteComponent},
 {path: 'comptes', component: ComptesComponent},
 {path: 'creerCompte', component: CreerCompteComponent},
    {path: 'etudiantsParClass', component: EtudiantsParClassComponent},
    {path: 'classes', component: HomeExamComponent},
    {path: 'feuilledenote', component: FeuilleDeNotesComponent},
    {path: 'feuilledeemerg', component: FeuilleDeEmergComponent},
    {path: 'FinDetEt', component: FinacierDetailsEtudComponent},
    {path: 'PayerEtu', component: PayeEtuFinaComponent},
      {path: 'Etu', component: EtudiantComponent},
  {path: 'mdpoblier', component: MdpoblierComponent},
  {path: 'Insc', component: InscriptionComponent},
    {path: 'detailleEtud', component: DetailleEtudianteComponent},
  {path: 'enregistrement', component: EnregistrementComponent},
    {path: 'etudiantsParClass', component: EtudiantsParClassComponent},
    {path: 'listeDesClasses', component: ListeDesClassesComponent},
    {path: 'fichier', component: FicherComponent},
    {path: 'homeFina', component: HomeFinancierComponent},]},
  {path: '404', component: NotFoundComponent},



  








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
