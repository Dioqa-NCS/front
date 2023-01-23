import { Component } from '@angular/core'
import { Compte } from '../compte.service'

@Component({
  selector: 'app-compte-create',
  templateUrl: './compte-create.component.html',
  styleUrls: ['./compte-create.component.css'],
})
export class CompteCreateComponent {
  public compte: Compte

  constructor() {
    this.compte = {
      id: 0,
      idTypeEntreprise: 1,
      nom: '',
      prenom: '',
      nomEntreprise: '',
      mail: '',
      tel: '',
      mailFacturation: '',
      adresseFacturation: '',
      reductionPrix: '',
      villeFacturation: '',
      codePostalFacturation: '',
      telFacturation: '',
    }
  }
}
