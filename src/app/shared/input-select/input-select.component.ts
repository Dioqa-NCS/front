import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

interface SelectItem {
  [key: string]: any
}
@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css'],
})
export class InputSelectComponent {
  @Input() appearance : 'fill' | 'outline' = 'fill'

  @Input() classes : string[] = ['']

  @Input() label?: string

  @Input() control?: FormControl

  @Input() options?: SelectItem[]

  @Input() propPrinting?: string

  @Input() propBinding?: string
}
