import {
  Component, Input,
} from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() classes = ['']

  @Input() label?: string

  @Input() control?: FormControl

  @Input() inputType?: string

  @Input() mask = ''

  @Input() suffix = ''

  showErrors() {
    if (this.control) {
      const { dirty, touched, errors } = this.control
      return dirty && touched && errors
    }
    return false
  }
}
