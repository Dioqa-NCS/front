import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { MatchPassword } from '../validators/match-password'
import { UniqueUsername } from '../validators/unique-username'
import { AuthService } from '../auth.service'
import { TypeEntrepriseResponse, TypeEntrepriseService } from '../../shared/services/type-entreprise.service'
import { PasswordFormatValidator } from '../validators/password-format-validator'
import { NumberFormatValidator } from '../../shared/validators/number-format-validator'

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
    ], [this.uniqueUsername.validate]),
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      NumberFormatValidator.validate,
    ]),
    mdp: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      PasswordFormatValidator.validate,
    ]),
    mdpConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
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
  }, { validators: [MatchPassword.validate] })

  constructor(
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private typeentrepriseService: TypeEntrepriseService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.typeentrepriseService.get().subscribe(typeEntreprises => {
      this.typeEntreprises = typeEntreprises
    })
  }

  onSubmit() {
    this.authService.signup({
      ...this.requestAccountForm.value,
      userName: this.requestAccountForm.value.mail,
      email: this.requestAccountForm.value.mail,
    }).subscribe({
      next: async () => {
        await this.router.navigateByUrl('/')
      },
    })
  }
}
