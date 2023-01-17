import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Compte, CompteService } from './compte.service'

@Injectable({
  providedIn: 'root',
})
export class CompteResolverService implements Resolve<Compte> {
  constructor(private compteService: CompteService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.compteService.getCompte(route.params['id'], {
      $expand: 'typeentreprise($select=nom)',
    })
  }
}
