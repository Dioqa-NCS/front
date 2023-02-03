import { AbstractControl } from '@angular/forms'

export const matchPasswordValidator = (control: AbstractControl) => {
  const { mdp, mdpConfirmation } = control.value

  if (mdp === mdpConfirmation) {
    return null
  }
  return { passwordDontMatch: true }
}
