import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  catchError, EMPTY, exhaustMap, map, tap,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'
import { fetchComptes } from '../compte.service'
import * as compteIndexAction from './compte-index.actions'
import * as compteApiAction from './compte-api.actions'

@Injectable()
export class CompteEffects {
  fetchCompte$ = fetchComptes()

  loadComptes$ = createEffect(() => this.actions$.pipe(
    ofType(compteIndexAction.loadComptes),
    exhaustMap(action => this.fetchCompte$(action.params).pipe(
      map(comptes => (compteApiAction.fetchComptes({ comptes }))),
      catchError(() => EMPTY),
    )),
  ))

  constructor(
    private actions$: Actions,
  ) {
  }
}
