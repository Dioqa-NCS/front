import {
  Component, EventEmitter, Input, Output, ViewChild,
} from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { CompteSummary } from '../compte.service'
import { TabComponent } from '../../shared/tab/tab.component'

@Component({
  selector: 'app-compte-tab',
  templateUrl: './compte-tab.component.html',
  styleUrls: ['./compte-tab.component.css'],
})
export class CompteTabComponent {
  comptes$ = new Observable<CompteSummary[]>()

  comptesCheck$ = new BehaviorSubject<CompteSummary[]>([])

  @Input() set comptesCheck(comptesCheck: BehaviorSubject<CompteSummary[]>) {
    this.comptesCheck$ = comptesCheck
  }

  @Input()
  set comptes(value: Observable<CompteSummary[]>) {
    this.comptes$ = value
  }

  @Output() compteClicked = new EventEmitter<CompteSummary>()

  @Input() clickable = false

  @ViewChild(TabComponent) tab: TabComponent | null = null

  _fields = [
    {
      key: 'nom',
      label: 'Nom',
    },
    {
      key: 'prenom',
      label: 'Prenom',
    },
    {
      key: 'nomEntreprise',
      label: 'Entreprise',
    },
    {
      key: 'mail',
      label: 'Email',
    },
  ]

  async _onCompteClicked(comptesClick: CompteSummary) {
    this.compteClicked.emit(comptesClick)
  }
}
