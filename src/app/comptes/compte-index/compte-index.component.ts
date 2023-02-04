import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import * as fromComptes from '../state/compte.reducer'
import {
  CompteSummary, FilterCompte,
} from '../compte.service'
import { CompteTabComponent } from '../compte-tab/compte-tab.component'
import * as CompteIndexActions from '../state/compte-index.actions'
import * as compteSelectors from '../state/compte.selectors'

@Component({
  selector: 'app-user-index',
  templateUrl: './compte-index.component.html',
  styleUrls: ['./compte-index.component.css'],
})
export class CompteIndexComponent implements OnInit {
  public comptes$ = new Observable<CompteSummary[]>()

  public comptesAll$ = this.store.select(compteSelectors.selectComptes)

  public comptesDisable$ = this.store.select(compteSelectors.selectComptesDisable)

  public comptesEnable$ = this.store.select(compteSelectors.selectComptesEnable)

  public comptesCheck$ = new BehaviorSubject<CompteSummary[] | null>(null)

  comptesCheck: CompteSummary[] = []

  activeFilterCompte? : FilterCompte = undefined

  @ViewChild(CompteTabComponent) comptesTab?: CompteTabComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromComptes.StateComptes>,
  ) {
  }

  async ngOnInit() {
    this.store.dispatch(CompteIndexActions.loadComptes({ params: undefined }))
    this.comptesCheck$.subscribe(comptesCheck => {
      if (comptesCheck) {
        this.comptesCheck = comptesCheck
      }
    })

    this.route.queryParams.subscribe(queryparam => {
      this.activeFilterCompte = queryparam['$filter']
      if (!this.activeFilterCompte) {
        this.comptes$ = this.comptesAll$
      }
      if (this.filterIsDisable()) {
        this.comptes$ = this.comptesDisable$
      }
      if (this.filterIsEnable()) {
        this.comptes$ = this.comptesEnable$
      }
    })
  }

  async onToCompte(compte: CompteSummary) {
    await this.router.navigate([compte.id], {
      relativeTo: this.route,
    })
  }

  async onToComptes() {
    this.comptes$ = this.comptesAll$
    await this.router.navigate([], {
      relativeTo: this.route,
    })
  }

  async onToComptesDisabled() {
    this.comptes$ = this.comptesDisable$
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { $filter: FilterCompte.disable },
    })
  }

  async onToComptesEnabled() {
    this.comptes$ = this.comptesEnable$
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { $filter: FilterCompte.enable },
    })
  }

  hasComptesChecked() {
    return this.comptesCheck.length > 0
  }

  filterIsDisable() {
    return this.activeFilterCompte === FilterCompte.disable
  }

  filterIsEnable() {
    return this.activeFilterCompte === FilterCompte.enable
  }

  onComptesDelete() {
    this.store.dispatch(CompteIndexActions.deleteComptes({
      ids: this.comptesCheck.map(compte => compte.id),
    }))
    this.comptesCheck = []
  }

  onComptesEnable() {
    this.store.dispatch(CompteIndexActions.updateComptes({
      comptes: this.comptesCheck.map(({ id }) => ({
        id, estValider: '1',
      })),
    }))
    this.comptesCheck = []
  }
}
