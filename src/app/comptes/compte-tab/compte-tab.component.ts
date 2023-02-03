import {
  ChangeDetectorRef,
  Component, EventEmitter, Input, Output, ViewChild,
} from '@angular/core'
import { Observable } from 'rxjs'
import { CompteSummary } from '../compte.service'
import { TabComponent } from '../../shared/tab/tab.component'

@Component({
  selector: 'app-compte-tab',
  templateUrl: './compte-tab.component.html',
  styleUrls: ['./compte-tab.component.css'],
})
export class CompteTabComponent {
  comptes$ = new Observable<CompteSummary[]>()

  @Input()
  set comptes(value: Observable<CompteSummary[]>) {
    this.comptes$ = value
    this.changeDetectorRef.detectChanges()
  }

  @Output() compteClicked = new EventEmitter<CompteSummary>()

  @Output() comptesChecked = new EventEmitter<CompteSummary[]>()

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

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  deleteComptes(comptes: CompteSummary[]) {
    if (this.tab) {
      this.tab.deleteDatas(comptes)
    }
  }

  async _onCompteClicked(comptesClick: CompteSummary) {
    this.compteClicked.emit(comptesClick)
  }

  _onComptesChecked(comptesCheck: CompteSummary[]) {
    this.comptesChecked.emit(comptesCheck)
  }
}
