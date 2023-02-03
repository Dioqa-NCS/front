import { createReducer, on } from '@ngrx/store'
import * as CompteApiActions from './compte-api.actions'
import { CompteSummary, FilterCompte } from '../compte.service'

export interface State {
  comptes: CompteSummary[],
  filter?: FilterCompte,
}

export const initialState: State = {
  comptes: [],
  filter: undefined,
}

export const compteReducer = createReducer(
  initialState,
  on(CompteApiActions.fetchComptes, (state, { comptes }) => ({ ...state, comptes })),
)
