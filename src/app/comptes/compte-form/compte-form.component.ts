import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Compte } from '../compte.service'
import { TypeEntrepriseResponse, TypeEntrepriseService } from '../../shared/services/type-entreprise.service'
import { NumberFormatValidator } from '../../shared/validators/number-format-validator'
import { uniqueNameValidator } from '../../auth/validators/unique-username'

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
    ], [uniqueNameValidator()]),
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
      Validators.minLength(5),
      Validators.maxLength(5),
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

  constructor(
    private typeEntrepriseService: TypeEntrepriseService,
  ) {
  }

  ngOnInit() {
    this.typeEntrepriseService.get().subscribe(typeEntreprises => {
      this.typeEntreprises = typeEntreprises
    })

    if (this.compte && this.compteForm) {
      this.compteForm.controls.nom.setValue(this.compte.nom)
      this.compteForm.controls.tel.setValue(this.compte.tel)
      this.compteForm.controls.mail.setValue(this.compte.mail)
      this.compteForm.controls.nomEntreprise.setValue(this.compte.nomEntreprise)
      this.compteForm.controls.prenom.setValue(this.compte.prenom)
      this.compteForm.controls.mailFacturation.setValue(this.compte.mailFacturation)
      this.compteForm.controls.adresseFacturation.setValue(this.compte.adresseFacturation)
      this.compteForm.controls.reductionPrix.setValue(this.compte.reductionPrix)
      this.compteForm.controls.idTypeEntreprise.setValue(this.compte.idTypeEntreprise)
      this.compteForm.controls.villeFacturation.setValue(this.compte.villeFacturation)
      this.compteForm.controls.codePostalFacturation.setValue(this.compte.codePostalFacturation)
      this.compteForm.controls.telFacturation.setValue(this.compte.telFacturation)
    }
  }

  onSubmit() {
    this.compteSubmit.emit(this.compteForm.value)
  }
}
