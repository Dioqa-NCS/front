import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NumberFormatValidator } from '../../shared/validators/number-format-validator'
import { TypeEntrepriseResponse, TypeEntrepriseService } from '../../shared/services/type-entreprise.service'
import { SettingCompte } from '../setting.service'

@Component({
  selector: 'app-setting-compte-form',
  templateUrl: './setting-compte-form.component.html',
  styleUrls: ['./setting-compte-form.component.css'],
})
export class SettingCompteFormComponent implements OnInit {
  @Output() settingCompteSubmitted = new EventEmitter<any>()

  @Input() disabled = false

  @Input() settingCompte: SettingCompte | null = null

  typeEntreprises?: TypeEntrepriseResponse[]

  settingCompteForm = new FormGroup({
    idTypeEntreprise: new FormControl<number>(1, [
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
      Validators.maxLength(10),
      Validators.minLength(10),
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
  })

  constructor(public typeEntrepriseService: TypeEntrepriseService) {
  }

  ngOnInit() {
    this.typeEntrepriseService.get().subscribe(typeEntreprises => {
      this.typeEntreprises = typeEntreprises
    })
    if (this.settingCompteForm && this.settingCompte) {
      const {
        nom, tel, telFacturation, villeFacturation, codePostalFacturation, adresseFacturation,
        prenom, mail, mailFacturation, nomEntreprise, idTypeEntreprise,
      } = this.settingCompte

      this.settingCompteForm.controls.nom.setValue(nom)
      this.settingCompteForm.controls.prenom.setValue(prenom)
      this.settingCompteForm.controls.tel.setValue(tel)
      this.settingCompteForm.controls.telFacturation.setValue(telFacturation)
      this.settingCompteForm.controls.villeFacturation.setValue(villeFacturation)
      this.settingCompteForm.controls.codePostalFacturation.setValue(codePostalFacturation)
      this.settingCompteForm.controls.adresseFacturation.setValue(adresseFacturation)
      this.settingCompteForm.controls.mail.setValue(mail)
      this.settingCompteForm.controls.mailFacturation.setValue(mailFacturation)
      this.settingCompteForm.controls.nomEntreprise.setValue(nomEntreprise)
      this.settingCompteForm.controls.idTypeEntreprise.setValue(idTypeEntreprise)

      if (this.disabled) {
        this.settingCompteForm.disable()
      }
    }
  }

  onSubmit() {
    this.settingCompteSubmitted.emit(this.settingCompteForm.value)
  }
}
