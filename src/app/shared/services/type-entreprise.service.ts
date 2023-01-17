import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

export interface TypeEntrepriseResponse {
  nom: string,
  id: number
}

@Injectable({
  providedIn: 'root',
})
export class TypeEntrepriseService {
  constructor(private http: HttpClient) {
  }

  rootUrl = 'https://localhost:7177/api'

  get() {
    return this.http.get<TypeEntrepriseResponse[]>(`${this.rootUrl}/Typeentreprises`)
  }
}
