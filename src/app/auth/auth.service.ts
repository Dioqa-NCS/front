import { inject, Injectable } from '@angular/core'
import {
  BehaviorSubject, map, skipWhile, take, tap,
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

export const usernameAvailable = () => {
  const http = inject(HttpClient)
  return (username: string) => http.post<AuthAvailableUsernameRequest>(`${environment.apiUrl}/Auth/username`, {
    username,
  })
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient)

  signedin$ = new BehaviorSubject<boolean | null>(null)

  roles$ = new BehaviorSubject<AuthRole[] | null>(null)

  hasRole(rolesToAuthorize: AuthRole[]) {
    return this.roles$.pipe(
      skipWhile(value => value === null),
      take(1),
      map(roles => rolesToAuthorize.some(roleAuthorize => roles?.includes(roleAuthorize))),
    )
  }

  isCustomer() {
    return this.roles$.pipe(
      skipWhile(value => value === null),
      take(1),
      map(roles => roles?.includes(AuthRole.Customer)),
    )
  }

  isAdministrator() {
    return this.roles$.pipe(
      skipWhile(value => value === null),
      take(1),
      map(roles => roles?.includes(AuthRole.Administrator)),
    )
  }

  usernameAvailable(username: string) {
    return this._http.post<AuthAvailableUsernameRequest>(`${environment.apiUrl}/Auth/username`, {
      username,
    })
  }

  signup(userSignupRequest: Partial<AuthSignupRequest>) {
    return this._http.post<AuthSignupResponse>(`${environment.apiUrl}/Auth/signup`, userSignupRequest)
  }

  signout() {
    return this._http.post(`${environment.apiUrl}/Auth/signout`, {})
      .pipe(tap({
        next: () => {
          this.signedin$.next(false)
        },
      }))
  }

  signin(userSigninRequest: Partial<AuthSigninRequest>) {
    return this._http.post<AuthSigninResponse>(`${environment.apiUrl}/Auth/signin`, userSigninRequest).pipe(
      skipWhile(value => value === null),
      tap(({ roles }) => {
        this.signedin$.next(true)
        this.roles$.next(roles)
      }),
    )
  }

  checkAuth() {
    return this._http.get<AuthCheckResponse>(`${environment.apiUrl}/Auth/checkauth`).pipe(
      tap(({ roles, authenticated }) => {
        this.signedin$.next(authenticated)
        this.roles$.next(roles)
      }),
    )
  }
}
