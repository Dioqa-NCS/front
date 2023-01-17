import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

export interface Params {
  $expand?: string,
  $select?: string,
  $filter?: string,
  $orderby?: string
}

export interface CompteSummary {
  id: number,
  nom: string,
  prenom: string,
  nomEntreprise: string,
  mail: string,
  tel: string,
  estValider: string,
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
  tel? : string,
  adresseFacturation?: string,
  villeFacturation?: string,
  codePostalFacturation?: string,
  telFacturation?: string,
  mailFacturation? : string,
  reductionPrix?: string
}

export enum FilterCompte {
  enable = "estValider eq '1'",
  disable = "estValider eq 'O'"
}

@Injectable({
  providedIn: 'root',
})
export class CompteService {
  rootUrl = 'https://localhost:7177/api'

  constructor(private http: HttpClient) {
  }

  getComptes(params: Params | null = null) {
    return this.http.get<CompteSummary[]>(`${this.rootUrl}/Comptes`, {
      params: { ...params },
    })
  }

  getCompte(id: number, params: Params | null = null) {
    return this.http.get<Compte>(`${this.rootUrl}/Comptes/${id}`, {
      params: { ...params },
    })
  }

  deleteComptes(ids: number[]) {
    return this.http.delete(`${this.rootUrl}/Comptes`, {
      params: {
        Ids: ids.join(','),
      },
    })
  }

  updateComptes(comptes: ComptePatched[]) {
    return this.http.patch<ComptePatched[]>(`${this.rootUrl}/Comptes`, comptes)
  }
}
