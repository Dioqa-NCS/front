import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog'
import { AuthService } from '../auth.service'
import { passwordFormatValidator } from '../validators/password-format-validator'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordFormatValidator,
    ]),
  })

  constructor(
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly dialog: MatDialogRef<SigninComponent>,
  ) {
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return
    }
    this.authService.signin(this.signinForm.value).subscribe({
      next: async () => {
        this.toastrService.success('Vous êtes connecté.')
        await this.router.navigateByUrl('/dashboard')
        this.dialog.close()
      },
      error: () => {
        this.toastrService.error('Identifiants incorrectes.')
      },
    })
  }
}
