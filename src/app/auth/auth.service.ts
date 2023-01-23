import { Injectable } from '@angular/core'
import {
  BehaviorSubject, skipWhile, tap,
} from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

export enum AuthRole {
  Administrator = 'Administrateur',
  Customer = 'Client'
}

interface AuthCheckResponse {
  authenticated: boolean;
  username: string;
  roles: AuthRole[];
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

  signedin$ = new BehaviorSubject<boolean | null>(null)

  private roles: AuthRole[] = []

  hasRole(rolesToAuthorize: AuthRole[]) {
    return rolesToAuthorize.some(roleAuthorize => this.roles.includes(roleAuthorize))
  }

  isCustomer() {
    return this.roles.includes(AuthRole.Customer)
  }

  isAdministrator() {
    return this.roles.includes(AuthRole.Administrator)
  }

  usernameAvailable(username: string) {
    return this.http.post<AuthAvailableUsernameRequest>(`${environment.apiUrl}/Auth/username`, {
      username,
    })
  }

  signup(userSignupRequest: Partial<AuthSignupRequest>) {
    return this.http.post<AuthSignupResponse>(`${environment.apiUrl}/Auth/signup`, userSignupRequest)
  }

  signout() {
    return this.http.post(`${environment.apiUrl}/Auth/signout`, {})
      .pipe(tap({
        next: () => {
          this.signedin$.next(false)
        },
      }))
  }

  signin(userSigninRequest: Partial<AuthSigninRequest>) {
    return this.http.post<AuthSigninResponse>(`${environment.apiUrl}/Auth/signin`, userSigninRequest).pipe(
      skipWhile(value => value === null),
      tap(({ roles }) => {
        this.signedin$.next(true)
        this.roles = roles
      }),
    )
  }

  checkAuth() {
    return this.http.get<AuthCheckResponse>(`${environment.apiUrl}/Auth/checkauth`).pipe(
      skipWhile(value => value === null),
      tap(({ roles, authenticated }) => {
        this.signedin$.next(authenticated)
        this.roles = roles
      }),
    )
  }
}
