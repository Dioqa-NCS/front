import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Compte } from '../compte.service'
import { TypeEntrepriseResponse, TypeEntrepriseService } from '../../shared/services/type-entreprise.service'
import { NumberFormatValidator } from '../../shared/validators/number-format-validator'

@Component({
  selector: 'app-compte-form',
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.css'],
})
export class CompteFormComponent implements OnInit {
  typeEntreprises?: TypeEntrepriseResponse[]

  @Output() compteSubmit = new EventEmitter()

  compteForm = new FormGroup({
    idTypeEntreprise: new FormControl<number | null>(null, [
      Validators.required,
    ]),
    nomEntreprise: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    prenom: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    nom: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    mail: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    tel: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      NumberFormatValidator.validate,
    ]),
    adresseFacturation: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    villeFacturation: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    codePostalFacturation: new FormControl<string | null>(null, [
      Validators.required,
      NumberFormatValidator.validate,
    ]),
    telFacturation: new FormControl<string | null>(null, [
      Validators.minLength(10),
      Validators.maxLength(10),
      NumberFormatValidator.validate,
    ]),
    mailFacturation: new FormControl<string | null>(null, [
      Validators.email,
    ]),
    reductionPrix: new FormControl<string | null>(null),
  })

  @Input() compte: Compte | null = null

  constructor(public typeEntrepriseService: TypeEntrepriseService) {
  }

  ngOnInit() {
    this.typeEntrepriseService.get().subscribe(typeEntreprises => {
      this.typeEntreprises = typeEntreprises
    })

    if (this.compte && this.compteForm) {
      const {
        nom, tel,
        mail, nomEntreprise,
        prenom, mailFacturation,
        adresseFacturation, reductionPrix, idTypeEntreprise,
        villeFacturation, codePostalFacturation, telFacturation,
      } = this.compte

      this.compteForm.controls.nom.setValue(nom)
      this.compteForm.controls.tel.setValue(tel)
      this.compteForm.controls.mail.setValue(mail)
      this.compteForm.controls.nomEntreprise.setValue(nomEntreprise)
      this.compteForm.controls.prenom.setValue(prenom)
      this.compteForm.controls.mailFacturation.setValue(mailFacturation)
      this.compteForm.controls.adresseFacturation.setValue(adresseFacturation)
      this.compteForm.controls.reductionPrix.setValue(reductionPrix)
      this.compteForm.controls.idTypeEntreprise.setValue(idTypeEntreprise)
      this.compteForm.controls.villeFacturation.setValue(villeFacturation)
      this.compteForm.controls.codePostalFacturation.setValue(codePostalFacturation)
      this.compteForm.controls.telFacturation.setValue(telFacturation)
    }
  }

  onSubmit() {
    this.compteSubmit.emit(this.compteForm.value)
  }
}
