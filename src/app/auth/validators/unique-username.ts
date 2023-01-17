import { Injectable } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { map } from 'rxjs'
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername {
  constructor(private authService: AuthService) {
  }

  validate = (control: AbstractControl) => this.authService.usernameAvailable(control.value).pipe(
    map((value) => (value.available ? { nonUniqueUsername: true } : null)),
  )
}
