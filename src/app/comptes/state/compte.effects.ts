import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  catchError, EMPTY, exhaustMap, map,
} from 'rxjs'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'
import { deleteComptes, fetchComptes, updateComptes } from '../compte.service'
import * as compteIndexAction from './compte-index.actions'
import * as compteApiAction from './compte-api.actions'

@Injectable()
export class CompteEffects {
  fetchCompte$ = fetchComptes()

  deleteComptes$ = deleteComptes()

  updateComptes$ = updateComptes()

  loadComptes$ = createEffect(() => this.actions$.pipe(
    ofType(compteIndexAction.loadComptes),
    exhaustMap(action => this.fetchCompte$(action.params).pipe(
      map(comptes => (compteApiAction.fetchComptes({ comptes }))),
      catchError(() => EMPTY),
    )),
  ))

  deleteCompte$ = createEffect(() => this.actions$.pipe(
    ofType(compteIndexAction.deleteComptes),
    exhaustMap(({ ids }) => this.deleteComptes$(ids).pipe(
      map(() => compteApiAction.deleteComptes({ ids })),
    )),
  ))

  updateCompte$ = createEffect(() => this.actions$.pipe(
    ofType(compteIndexAction.updateComptes),
    exhaustMap(action => this.updateComptes$(action.comptes).pipe(
      map(comptes => compteApiAction.updateComptes({ comptes })),
    )),
  ))

  constructor(
    private actions$: Actions,
  ) {
  }
}
