import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { matchPasswordValidator } from '../validators/match-password'
import { uniqueNameValidator } from '../validators/unique-username'
import { AuthService } from '../auth.service'
import { TypeEntrepriseResponse, TypeEntrepriseService } from '../../shared/services/type-entreprise.service'
import { NumberFormatValidator } from '../../shared/validators/number-format-validator'
import { passwordFormatValidator } from '../validators/password-format-validator'
import * as AuthRequestAccountActions from '../state/auth-request-account.actions'

@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.css'],
})
export class RequestAccountComponent implements OnInit {
  typeEntreprises?: TypeEntrepriseResponse[]

  requestAccountForm = new FormGroup({
    idTypeEntreprise: new FormControl(1, [
      Validators.required,
    ]),
    nomEntreprise: new FormControl('', [
      Validators.required,
    ]),
    prenom: new FormControl('', [
      Validators.required,
    ]),
    nom: new FormControl('', [
      Validators.required,
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.email,
    ], [uniqueNameValidator()]),
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      NumberFormatValidator.validate,
    ]),
    mdp: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordFormatValidator,
    ]),
    mdpConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordFormatValidator,
    ]),
    adresseFacturation: new FormControl('', [
      Validators.required,
    ]),
    villeFacturation: new FormControl('', [
      Validators.required,
    ]),
    codePostalFacturation: new FormControl('', [
      Validators.required,
      NumberFormatValidator.validate,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    telFacturation: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
      NumberFormatValidator.validate,
    ]),
    mailFacturation: new FormControl(
      '',
      [
        Validators.email,
      ],
    ),
  }, { validators: [matchPasswordValidator] })

  constructor(
    private authService: AuthService,
    private typeentrepriseService: TypeEntrepriseService,
    private toastrService: ToastrService,
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.typeentrepriseService.get().subscribe(typeEntreprises => {
      this.typeEntreprises = typeEntreprises
    })
  }

  onSubmit() {
    this.store.dispatch(AuthRequestAccountActions.signup({
      userSignupRequest: {
        ...this.requestAccountForm.value,
        userName: this.requestAccountForm.value.mail,
        email: this.requestAccountForm.value.mail,
      },
    }))
  }
}
