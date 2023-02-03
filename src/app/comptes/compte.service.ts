import { inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Params } from '@angular/router'
import {
  mergeMap,
} from 'rxjs'
import * as _ from 'lodash'
import { environment } from '../../environments/environment'

export interface CompteSummary {
  id: number,
  nom: string,
  prenom: string,
  nomEntreprise: string,
  mail: string,
  tel: string,
  estValider: '1' | 'O',
  typeentreprise: {
    nom: string
  }
}

export interface Compte {
  id: number,
  nom: string,
  prenom: string,
  nomEntreprise: string,
  mail: string,
  tel: string,
  mailFacturation: string,
  adresseFacturation: string,
  reductionPrix: string,
  idTypeEntreprise: number,
  villeFacturation: string,
  telFacturation: string,
  codePostalFacturation: string,
  typeentreprise?: {
    nom: string
  }
}

export interface ComptePatched {
  id: number,
  estValider?: string,
  idTypeEntreprise?: number,
  nomEntreprise?: string,
  prenom?: string,
  nom?: string,
  mail?: string,
  tel?: string,
  adresseFacturation?: string,
  villeFacturation?: string,
  codePostalFacturation?: string,
  telFacturation?: string,
  mailFacturation?: string,
  reductionPrix?: string
}

export enum FilterCompte {
  enable = "estValider eq '1'",
  disable = "estValider eq 'O'"
}

export const fetchComptes = () => {
  const http = inject(HttpClient)
  return (params: Params | undefined = undefined) => http.get<CompteSummary[]>(`${environment.apiUrl}/api/Comptes`, {
    params,
  })
}

export const fetchCompte = () => {
  const http = inject(HttpClient)
  const route = inject(ActivatedRoute)
  return (paramsEntries: Params | undefined = undefined) => route.params.pipe(
    mergeMap(params => http.get<Compte>(`${environment.apiUrl}/api/Comptes/${params['id']}`, {
      params: _.merge(paramsEntries, params),
    })),
  )
}

export const deleteComptes = () => {
  const http = inject(HttpClient)
  return (ids: number[]) => http.delete(`${environment.apiUrl}/api/Comptes`, {
    params: {
      Ids: ids.join(','),
    },
  })
}

export const updateComptes = () => {
  const http = inject(HttpClient)
  return (comptes: ComptePatched[]) => http.patch<Compte[]>(`${environment.apiUrl}/api/Comptes`, comptes)
}
