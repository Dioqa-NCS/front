import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

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

  get() {
    return this.http.get<TypeEntrepriseResponse[]>(`${environment.apiUrl}/api/Typeentreprises`)
  }
}
