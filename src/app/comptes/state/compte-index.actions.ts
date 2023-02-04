import { createAction, props } from '@ngrx/store'
import { CompteIndexActionsTypes } from './compte-index.actions.types'
import { ComptePatched } from '../compte.service'

interface Props {
  params?: { $filter: string, $expand: string}
}

export const loadComptes = createAction(
  CompteIndexActionsTypes.LoadComptes,
  props<Props>(),
)

export const deleteComptes = createAction(
  CompteIndexActionsTypes.DeleteComptes,
  props<{ ids: number[] }>(),
)

export const updateComptes = createAction(
  CompteIndexActionsTypes.UpdateComptes,
  props<{ comptes: ComptePatched[] }>(),
)
