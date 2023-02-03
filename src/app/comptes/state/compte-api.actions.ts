import { createAction, props } from '@ngrx/store'
import { CompteApiActionsTypes } from './compte-api.actions.types'
import { CompteSummary, FilterCompte } from '../compte.service'

interface PropsFetchComptes {
  comptes: CompteSummary[],
  filter?: FilterCompte
}

export const fetchComptes = createAction(
  CompteApiActionsTypes.FetchComptes,
  props<PropsFetchComptes>(),
)
