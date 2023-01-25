import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { CompteService, CompteSummary, Params } from './compte.service'

@Injectable({
  providedIn: 'root',
})
export class CompteListResolver implements Resolve<CompteSummary[]> {
  constructor(private compteService: CompteService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const params: Params = {
      $expand: 'typeentreprise($select=nom)',
      $orderby: 'nom asc',
    }

    if (route.queryParams['$filter']) {
      params.$filter = route.queryParams['$filter']
    }

    return this.compteService.getComptes(params)
  }
}
