import { createReducer, on } from '@ngrx/store'
import * as _ from 'lodash'
import * as CompteApiActions from './compte-api.actions'
import { CompteSummary } from '../compte.service'

export interface InitState<T> {
  [index: string]: T,
}

export interface StateComptes {
  comptes: InitState<CompteSummary>
}

export const initialState: StateComptes = {
  comptes: {},
}

export const compteReducer = createReducer(
  initialState,
  on(CompteApiActions.fetchComptes, (state, { comptes }) => ({
    ...state,
    comptes: { ...state['comptes'], ..._.mapKeys(comptes, 'id') },
  })),
  on(CompteApiActions.deleteComptes, (state, { ids }) => ({
    ...state,
    comptes: _.omit(state['comptes'], ids),
  })),
  on(CompteApiActions.updateComptes, (state, { comptes }) => ({
    ...state,
    comptes: _.assign({}, state.comptes, _.mapKeys(comptes, 'id')),
  })),
)
