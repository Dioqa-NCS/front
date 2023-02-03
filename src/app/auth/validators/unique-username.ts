import { AbstractControl } from '@angular/forms'
import { map } from 'rxjs'
import { usernameAvailable } from '../auth.service'

export const uniqueNameValidator = () => {
  const usernameAvailable$ = usernameAvailable()
  return (control: AbstractControl) => usernameAvailable$(control.value).pipe(
    map((value) => (value.available ? { nonUniqueUsername: true } : null)),
  )
}
