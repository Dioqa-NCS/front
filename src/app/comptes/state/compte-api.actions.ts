import { createAction, props } from '@ngrx/store'
import { CompteApiActionsTypes } from './compte-api.actions.types'
import { Compte, ComptePatched, CompteSummary } from '../compte.service'

interface PropsFetchComptes {
  comptes: CompteSummary[],
}

export const fetchComptes = createAction(
  CompteApiActionsTypes.FetchComptes,
  props<PropsFetchComptes>(),
)

export const deleteComptes = createAction(
  CompteApiActionsTypes.DeleteComptes,
  props<{ ids: number[] }>(),
)

export const updateComptes = createAction(
  CompteApiActionsTypes.UpdateComptes,
  props<{comptes: Compte[]}>(),
)
