import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Compte, Params } from '../comptes/compte.service'

export interface SettingCompte {
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

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private http: HttpClient) { }

  getSettingCompte(params: Params | null = null) {
    return this.http.get<SettingCompte>(`${environment.apiUrl}/api/Settings/Compte`, {
      params: { ...params },
    })
  }
}
