import {
  Component, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CompteSummary } from '../compte.service'
import { TabComponent } from '../../shared/tab/tab.component'

@Component({
  selector: 'app-compte-tab',
  templateUrl: './compte-tab.component.html',
  styleUrls: ['./compte-tab.component.css'],
})
export class CompteTabComponent implements OnInit {
  _comptes: CompteSummary[] = []

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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (!data['comptes']) {
        throw new Error('Implémentez le resolver')
      }

      if (this.tab) {
        this.tab.data = data['comptes']
      } else {
        this._comptes = data['comptes']
      }
    })
  }

  deleteComptes(comptes: CompteSummary[]) {
    if (this.tab) {
      this.tab.deleteDatas(comptes)
    }
  }

  async _onCompteClicked(compte: CompteSummary) {
    this.compteClicked.emit(compte)
  }

  _onComptesChecked(comptesCheck: CompteSummary[]) {
    this.comptesChecked.emit(comptesCheck)
  }
}
