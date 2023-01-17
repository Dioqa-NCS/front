import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export enum AuthRole {
  Administrator = 'Administrateur',
  Customer = 'Client'
}

interface AuthCheckResponse {
  authenticated: boolean;
  username: string;
  roles: AuthRole[]
}

interface AuthAvailableUsernameRequest {
  available: boolean
}

export interface AuthSignupRequest {
  idTypeEntreprise: number | null;
  userName: string | null;
  email: string | null;
  nom: string | null;
  prenom: string | null;
  mail: string | null;
  tel: string | null;
  mdp: string | null;
  mdpConfirmation: string | null;
  nomEntreprise: string | null;
  adresseFacturation: string | null;
  villeFacturation: string | null;
  codePostalFacturation: string | null;
  telFacturation?: string | null;
  mailFacturation?: string | null;
}

interface AuthSigninRequest {
  username: string | null,
  password: string | null,
}

interface AuthSigninResponse {
  roles: AuthRole[]
}

interface AuthSignupResponse {
  userName: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  rootUrl = 'https://localhost:7177'

  signedin$ = new BehaviorSubject<boolean | null>(null)

  roles$ = new BehaviorSubject<string[] | null>(null)

  isCustomer$ = new BehaviorSubject<boolean | null>(null)

  isAdministrator$ = new BehaviorSubject<boolean | null>(null)

  usernameAvailable(username: string) {
    return this.http.post<AuthAvailableUsernameRequest>(`${this.rootUrl}/Auth/username`, {
      username,
    })
  }

  signup(userSignupRequest: Partial<AuthSignupRequest>) {
    return this.http.post<AuthSignupResponse>(`${this.rootUrl}/Auth/signup`, userSignupRequest)
  }

  signout() {
    return this.http.post(`${this.rootUrl}/Auth/signout`, {})
      .pipe(tap({
        next: () => {
          this.signedin$.next(false)
        },
      }))
  }

  signin(userSigninRequest: Partial<AuthSigninRequest>) {
    return this.http.post<AuthSigninResponse>(`${this.rootUrl}/Auth/signin`, userSigninRequest).pipe(
      tap(({ roles }) => {
        this.signedin$.next(true)
        this.roles$.next(roles)

        if (roles) {
          this.isCustomer$.next(roles.some(role => role === AuthRole.Customer))

          this.isAdministrator$.next(roles.some(role => role === AuthRole.Administrator))
        }
      }),
    )
  }

  checkAuth() {
    return this.http.get<AuthCheckResponse>(`${this.rootUrl}/Auth/checkauth`).pipe(
      tap(({ roles, authenticated }) => {
        this.signedin$.next(authenticated)
        this.roles$.next(roles)

        if (roles) {
          this.isCustomer$.next(roles.some(role => role === AuthRole.Customer))

          this.isAdministrator$.next(roles.some(role => role === AuthRole.Administrator))
        }
      }),
    )
  }
}
