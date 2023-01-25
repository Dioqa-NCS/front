import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NumberFormatValidator } from '../../shared/validators/number-format-validator'

@Component({
  selector: 'app-setting-compte-form',
  templateUrl: './setting-compte-form.component.html',
  styleUrls: ['./setting-compte-form.component.css'],
})
export class SettingCompteFormComponent {
  settingCompteForm = new FormGroup({
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
  })
}
