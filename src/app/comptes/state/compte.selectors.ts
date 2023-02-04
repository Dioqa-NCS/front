import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as _ from 'lodash'
import * as fromComptes from './compte.reducer'

export const selectCompteFeature = createFeatureSelector<fromComptes.StateComptes>('comptes')

export const selectComptes = createSelector(
  selectCompteFeature,
  (state) => _.map(state.comptes),
)

export const selectComptesEnable = createSelector(
  selectComptes,
  (comptes) => _.filter(comptes, { estValider: '1' }),
)

export const selectComptesDisable = createSelector(
  selectComptes,
  (comptes) => _.filter(comptes, { estValider: 'O' }),
)
