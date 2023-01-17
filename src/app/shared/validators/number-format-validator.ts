import { AbstractControl } from '@angular/forms'

export class NumberFormatValidator {
  static validate(control: AbstractControl) {
    if (!control.value) return null

    if (!control.value.match(/^[0-9]*$/)) {
      return { numberFormat: true }
    }
    return null
  }
}
