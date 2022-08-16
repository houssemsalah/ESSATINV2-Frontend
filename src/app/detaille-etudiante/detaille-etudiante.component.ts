import {Component, OnInit} from '@angular/core';
import {InscriService} from '../services/inscri.service';
import {TokenStorageService} from '../services/token-storage.service';
import {ModifierService} from '../services/modifier.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detaille-etudiante',
  templateUrl: './detaille-etudiante.component.html',
  styleUrls: ['./detaille-etudiante.component.css']
})
export class DetailleEtudianteComponent implements OnInit {
  test = "";
  verifEnr: number = 0;
  nomuser: any;
  diplomeCourent: any;
  prenomuser: any;
  idpersonne: any;
  idEtu: any;
  form: any = {};
  Etudidentificateur: any;
  identificateur: any;
  nationalite: any;
  Etudnationalite: any;
  closeResult = '';
  idDiplome1: number = 0
  nomDiplome: string = '';
  annee: string = '';
  specialite: string = '';
  niveau: string = '';
  status: string = '';
  etablissement: string = '';
  diplomeEtudiantList = [
    {
      idDiplome: "", annee: "", specialite: "",
      niveau: "", status: "", etablissement: "", nomDiplome: "", idDiplomeType: 0
    },
  ];
  designation: string = '';
  numero: string = '';
  nom: string = '';
  contactEtudiantList = [
    {idContactEtudient: 0, designation: "", nom: "", numero: ""},
  ];
  diplome: any;
  Cycle: any;
  Specialite: any;
  Parcours: any;
  niveaux: any;
  niveaupossibletest: boolean = true;
  niveaupossible = [
    {idNiveau: 0, designation: ""},
  ];
  idCycle: string = '';
  idSpecialite: string = '';
  idParcours: string = '';
  idNiveau: string = '';
  role: any;
  roleEtat = 0;

  constructor(private modalService: NgbModal, private tokenStorage: TokenStorageService, private inscriservice: InscriService, private modifierservice: ModifierService) {
  }

  etudient: any;

  ngOnInit(): void {

    this.role = JSON.parse(localStorage.getItem("USER_Role")!)
    if (this.role.length === 1) {
      if (this.role != "ROLE_SCOLARITE") {
        window.location.replace('404');

      }
    }
    if (this.role.length != 1) {

      for (var i in this.role) {
        if (this.role[i] != "ROLE_SCOLARITE") {
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
    this.contactEtudiantList.splice(0);
    this.diplomeEtudiantList.splice(0);


    this.niveaupossible.splice(0)
    if (localStorage.length < 1) {
      window.location.replace('');
    }
    this.nomuser = this.tokenStorage.getUsernom();
    this.prenomuser = this.tokenStorage.getUserprenom();
    if (localStorage.getItem("Etud")) {
      this.modifierservice.VerifEnregistrment(JSON.parse(localStorage.getItem("Etud")!).idInscription.idInscription).subscribe(data => {
        console.log(data)
        if (data.length === 1) {
          this.inscriservice.GETCycle().subscribe(
            data => {
              this.Cycle = data;
            }
          );
          this.verifEnr = 1;
        } else {
          this.modifierservice.getautreniveauxpossiblebyidinscription(JSON.parse(localStorage.getItem("Etud")!).idInscription.idInscription).subscribe(data => {
            this.niveaupossibletest = false;
            console.log(data)
            for (const i in data) {
              this.niveaupossible.push({
                idNiveau: data[i].idNiveau,
                designation: data[i].parcours.specialite.cycle.description + "-" + data[i].parcours.designation + "-" + data[i].designation
              });
            }

          })
        }
      })
      this.diplomeCourent = JSON.parse(localStorage.getItem("Etud")!).idNiveau.parcours.specialite.cycle.description + "-" + JSON.parse(localStorage.getItem("Etud")!).idNiveau.parcours.designation + "-" + JSON.parse(localStorage.getItem("Etud")!).idNiveau.designation
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
      this.Etudnationalite = this.etudient.idNationalite.libelle!
      this.form.nationalite = this.etudient.idNationalite.id_Nationalite!
      this.Etudidentificateur = this.etudient.idIdentificateur.typeIdentificateur
      this.form.identificateur = this.etudient.idIdentificateur.idTypeidentificateur
      this.inscriservice.GETAncienDiplome(JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idEtudiant).subscribe(
        data => {
          console.log(data)
          if (data.code != 204) {
            for (const i in data) {
              this.diplomeEtudiantList.push({
                idDiplomeType: data[i].idDiplome.idDiplome,
                idDiplome: data[i].idDiplomeEtudiant,
                annee: data[i].annee,
                specialite: data[i].specialite,
                niveau: data[i].niveau,
                status: data[i].status,
                etablissement: data[i].etablissement,
                nomDiplome: data[i].idDiplome.nomDiplome
              });
            }
          }
        }
      );
      this.inscriservice.GETContactetudiant(JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idEtudiant).subscribe(
        data => {
          console.log(data)

          if (data.code != 204) {
            for (const i in data) {
              this.contactEtudiantList.push({
                idContactEtudient:
                data[i].idContact, designation: data[i].designation, nom: data[i].nom, numero: data[i].numero
              })
            }
            console.log(this.contactEtudiantList)
          }
        }
      );
    }
    this.inscriservice.GETTypeidentificateur().subscribe(
      data => {
        this.identificateur = data;
      }
    );
    this.inscriservice.GETNationalite().subscribe(
      data => {
        this.nationalite = data;
      }
    );
    this.inscriservice.GETDiplome().subscribe(
      data => {
        this.diplome = data.body;
      },
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  onSubmit(content7: any) {
    console.log(JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idPersonne.numeroIdentificateur, this.form.numid)
    if (JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idPersonne.numeroIdentificateur === this.form.numid) {
      this.modifierservice.modifierDonnePersonnel(this.form, this.test, this.idpersonne).subscribe(
        data => {
          console.log(data)
          if (data.code === 200) {
            this.Etudnationalite = this.nationalite[this.form.nationalite - 1].libelle
            this.Etudidentificateur = this.identificateur[this.form.identificateur - 1].typeIdentificateur
            this.open(content7)
          }
        }
      );
    }
    if (JSON.parse(localStorage.getItem("Etud")!).idInscription.idEtudiant.idPersonne.numeroIdentificateur != this.form.numid) {
      this.modifierservice.modifierDonnePersonnel(this.form, this.form.numid, this.idpersonne).subscribe(
        data => {
          console.log(data)
          if (data.code === 200) {
            this.Etudnationalite = this.nationalite[this.form.nationalite - 1].libelle
            this.Etudidentificateur = this.identificateur[this.form.identificateur - 1].typeIdentificateur
            this.open(content7)
          }
        }
      );
    }
  }

  openModallg(content8: any) {
    this.modalService.open(content8, {size: 'lg'});


  }

  openModifierContactParentModal(content4: any, cm: any) {
    this.designation = cm.designation
    this.nom = cm.nom
    this.numero = cm.numero
    this.open(content4)

  }

  modifierContactEtudient(cm: any) {
    if (cm.idContactEtudient != 0) {

      this.inscriservice.ModifierContactetudiant(cm.idContactEtudient, this.numero, this.nom, this.designation).subscribe(
        data => {
          console.log(data)
          // this.modalService.dismissAll
        });
      this.contactEtudiantList.splice(this.contactEtudiantList.indexOf(cm), 1, {
        idContactEtudient:
        cm.idContactEtudient, designation: this.designation, nom: this.nom, numero: this.numero
      })
    }


  }

  supprimerContactParent(cm: any) {
    if (confirm("Vouler vous Supprimer")) {
      this.contactEtudiantList.splice(this.contactEtudiantList.indexOf(cm), 1);
      if (cm.idContactEtudient != 0) {
        this.inscriservice.SuprimmerContactetudiant(cm.idContactEtudient).subscribe(
          data => {
            console.log(data)
          });
      }
    }
  }

  openajouterContactparentale(content9: any) {
    this.designation = ''
    this.nom = ''
    this.numero = ''
    this.open(content9)
  }

  enregistrecontact() {
    this.inscriservice.AjouterContactetudiant(this.idEtu, this.numero, this.nom, this.designation).subscribe(
      data => {
        this.contactEtudiantList.push({
          idContactEtudient:
          data.donneeSupplementaire.idContact, designation: this.designation, nom: this.nom, numero: this.numero

        })
        console.log(data)
      });
  }

  openaModifierDiplome(content: any, item: any) {

    this.annee = item.annee
    this.specialite = item.specialite
    this.niveau = item.niveau
    this.status = item.status
    this.etablissement = item.etablissement
    this.idDiplome1 = item.idDiplomeType
    this.open(content);
    console.log(item);
  }

  supprimerDiplomeEtudients(content: any, item5: any) {
    if (confirm("Vouler vous Supprimer")) {
      this.open(content)
      this.diplomeEtudiantList.splice(this.contactEtudiantList.indexOf(item5), 1);
      if (item5.idDiplomeType != 0) {
        console.log(item5.idDiplome)
        this.inscriservice.SupprimerAncienDiplome(item5.idDiplome).subscribe(
          data => {
            console.log(data)
          });
      }
    }
  }

  modifierdiplome(item: any) {

    this.inscriservice.ModifierAncienDiplome(item.idDiplome, this.idDiplome1, this.annee, this.specialite, this.niveau, this.status, this.etablissement).subscribe(
      data => {
        console.log(data)
      });
    this.diplomeEtudiantList.splice(this.contactEtudiantList.indexOf(item), 1, {
      idDiplomeType: item.idDiplomeType,
      idDiplome: item.idDiplome,
      annee: this.annee,
      specialite: this.specialite,
      niveau: this.niveau,
      status: this.status,
      etablissement: this.etablissement,
      nomDiplome: this.diplome[this.idDiplome1 - 2].nomDiplome
    })

  }

  openajouterdiplomemodal(content7: any) {
    this.open(content7)
  }

  enregistrediplome() {
    console.log(this.idEtu, this.idDiplome1, this.annee, this.specialite, this.niveau, this.status, this.etablissement)

    this.inscriservice.AjouterAncienDiplome(this.idEtu, this.idDiplome1, this.annee, this.specialite, this.niveau, this.status, this.etablissement).subscribe(
      data => {
        this.diplomeEtudiantList.push({
          idDiplomeType: this.idDiplome1,
          idDiplome: data.body.donneeSupplementaire.idDiplomeEtudiant,
          annee: this.annee,
          specialite: this.specialite,
          niveau: this.niveau,
          status: this.status,
          etablissement: this.etablissement,
          nomDiplome: this.diplome[this.idDiplome1 - 1].nomDiplome
        });

        console.log(this.diplomeEtudiantList)
      });

  }

  openModifierdiplomecourrent(content2: any) {
    this.modalService.open(content2, {size: 'lg'});


  }

  modiferDiplomecourant() {
    if (this.verifEnr === 1) {
      this.modifierservice.Modifierenregistrement(JSON.parse(localStorage.getItem("Etud")!).idInscription.idInscription, this.idNiveau).subscribe(
        data => {
          console.log(data);
        }
      );
    } else {
      console.log(JSON.parse(localStorage.getItem("Etud")!).idEnregistrement, this.idNiveau)
      this.modifierservice.Modifierenregistrementancien(JSON.parse(localStorage.getItem("Etud")!).idEnregistrement, this.idNiveau).subscribe(data => {
        console.log(data)
      })
    }
  }

  getSpecialite() {
    if (this.verifEnr === 1) {
      this.inscriservice.GETSpecialite(this.idCycle).subscribe(
        data => {
          this.Specialite = data
        }
      );
      this.idSpecialite = ""
      this.idParcours = "";
      this.idNiveau = "";
    } else {

    }
  }

  getParcours() {
    if (this.verifEnr === 1) {
      this.inscriservice.GETParcours(this.idSpecialite).subscribe(
        data => {
          this.Parcours = data
        }
      );
      this.idParcours = "";
      this.idNiveau = "";
    }
  }

  getNiveau() {
    if (this.verifEnr === 1) {

      this.inscriservice.GETNiveaux(this.idParcours).subscribe(
        data => {
          console.log(data)
          this.niveaux = data;
        }
      );
    }
  }

  logout() {
    this.tokenStorage.signOut();
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
}
