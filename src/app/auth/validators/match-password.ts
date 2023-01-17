import { AbstractControl } from '@angular/forms'

export class MatchPassword {
  static validate(control: AbstractControl) {
    const { mdp, mdpConfirmation } = control.value

    if (mdp === mdpConfirmation) {
      return null
    }
    return { passwordDontMatch: true }
  }
}
