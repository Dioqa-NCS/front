import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  catchError, exhaustMap, map, tap,
} from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { signup } from '../auth.service'
import * as authApiActions from './auth-api.actions'
import * as authRequestAccountActions from './auth-request-account.actions'

@Injectable()
export class AuthEffects {
  signup$ = signup()

  signup = createEffect(() => this.actions$.pipe(
    ofType(authRequestAccountActions.signup),
    exhaustMap((action) => this.signup$(action.userSignupRequest)
      .pipe(
        map(authSignupResponse => authApiActions.signupSuccess({ authSignupResponse })),
      )),
  ))

  signupApiSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(authApiActions.signupSuccess),
      tap(async () => {
        this.toastrService.success('Demande de compte transmis avec succès. Veuillez attendre l\'activation de votre compte.')
        await this.router.navigateByUrl('/')
      }),
    ),
    { dispatch: false },
  )

  constructor(
    private actions$ : Actions,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }
}
