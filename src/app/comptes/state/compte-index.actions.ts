import { createAction, props } from '@ngrx/store'
import { CompteIndexActionsTypes } from './compte-index.actions.types'

interface Props {
  params?: { $filter: string, $expand: string}
}

export const loadComptes = createAction(
  CompteIndexActionsTypes.LoadComptes,
  props<Props>(),
)
