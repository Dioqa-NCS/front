import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  CompteService, CompteSummary, FilterCompte, Params,
} from '../compte.service'
import { CompteTabComponent } from '../compte-tab/compte-tab.component'

@Component({
  selector: 'app-user-index',
  templateUrl: './compte-index.component.html',
  styleUrls: ['./compte-index.component.css'],
})
export class CompteIndexComponent implements OnInit {
  comptesCheck: CompteSummary[] = []

  activeFilter?: Params['$filter']

  @ViewChild(CompteTabComponent) comptesTab?: CompteTabComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compteService: CompteService,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.activeFilter = params['$filter']
      this.comptesCheck = []
    })
  }

  async onToCompte(compte: CompteSummary) {
    await this.router.navigate([compte.id], { relativeTo: this.route })
  }

  async onToComptes() {
    await this.router.navigate([])
  }

  async onToComptesDisabled() {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        $filter: `${FilterCompte.disable}`,
      },
    })
  }

  async onToComptesEnabled() {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        $filter: `${FilterCompte.enable}`,
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
    this.compteService.deleteComptes(this.comptesCheck.map(compte => compte.id)).subscribe(() => {
      if (this.comptesTab?.tab) {
        this.comptesTab.deleteComptes(this.comptesCheck)
      }
    })
  }

  onComptesEnable() {
    this.compteService.updateComptes(this.comptesCheck.map(({ id }) => ({
      id, estValider: '1',
    }))).subscribe(() => {
      if (this.comptesTab?.tab) {
        this.comptesTab.deleteComptes(this.comptesCheck)
      }
    })
  }
}
