import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import * as fromComptes from '../state/compte.reducer'

import {
  CompteSummary, deleteComptes, FilterCompte, updateComptes,
} from '../compte.service'
import { CompteTabComponent } from '../compte-tab/compte-tab.component'
import * as CompteIndexActions from '../state/compte-index.actions'
import { selectComptes, selectComptesDisable, selectComptesEnable } from '../state/compte.selectors'

@Component({
  selector: 'app-user-index',
  templateUrl: './compte-index.component.html',
  styleUrls: ['./compte-index.component.css'],
})
export class CompteIndexComponent implements OnInit {
  public comptes$ = this.store.select(selectComptes)

  public comptesDelete$ = deleteComptes()

  private comptesUpdate$ = updateComptes()

  comptesCheck: CompteSummary[] = []

  activeFilter?: FilterCompte = undefined

  @ViewChild(CompteTabComponent) comptesTab?: CompteTabComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromComptes.State>,
  ) {
  }

  async ngOnInit() {
    this.store.dispatch(CompteIndexActions.loadComptes({ params: undefined }))
    this.route.queryParams.subscribe(async params => {
      this.activeFilter = params['$filter']

      if (this.filterIsDisable()) {
        await this.onToComptesDisabled()
      }
      if (this.filterIsEnable()) {
        await this.onToComptesEnabled()
      }
    })
  }

  async onToCompte(compte: CompteSummary) {
    await this.router.navigate([compte.id], {
      relativeTo: this.route,
    })
  }

  async onToComptes() {
    this.comptes$ = this.store.select(selectComptes)
    await this.router.navigate([], {
      relativeTo: this.route,
    })
  }

  async onToComptesDisabled() {
    this.comptes$ = this.store.select(selectComptesDisable)
    this.activeFilter = FilterCompte.disable
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        $filter: FilterCompte.disable,
      },
    })
  }

  async onToComptesEnabled() {
    this.comptes$ = this.store.select(selectComptesEnable)
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        $filter: FilterCompte.enable,
      },
    })
  }

  onComptesChecked(comptes: CompteSummary[]) {
    this.comptesCheck = comptes
  }

  hasComptesChecked() {
    return this.comptesCheck.length > 0
  }

  filterIsDisable() {
    return this.activeFilter === FilterCompte.disable
  }

  filterIsEnable() {
    return this.activeFilter === FilterCompte.enable
  }

  async onComptesDelete() {
    this.comptesDelete$(this.comptesCheck.map(compte => compte.id)).subscribe(() => {
      if (this.comptesTab?.tab) {
        this.comptesTab.deleteComptes(this.comptesCheck)
      }
    })
  }

  onComptesEnable() {
    this.comptesUpdate$(this.comptesCheck.map(({ id }) => ({
      id, estValider: '1',
    }))).subscribe(() => {
      if (this.comptesTab?.tab) {
        this.comptesTab.deleteComptes(this.comptesCheck)
      }
    })
  }
}
